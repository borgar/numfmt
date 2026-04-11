import { TOKEN_BREAK } from './constants.ts';
import { resolveLocale } from './locale.ts';
import { getEmptyPatternPart, parseFormatSection } from './parseFormatSection.ts';
import { tokenize } from './tokenize.ts';
import type { PatternPart, RunToken } from './types.ts';

export type ParseData = {
  pattern: string;
  partitions: PatternPart[],
  error?: string,
  locale: string | null
};

const maybeAddMinus = (part: PatternPart) => {
  const [ op, val ] = part.condition ?? [ '', 0 ];
  const exception = (
    (val < 0 && (op === '<' || op === '<=' || op === '=')) ||
    (val === 0 && (op === '<'))
  );
  if (!exception) {
    part.tokens.unshift({
      type: 'minus',
      volatile: true
    });
  }
};

const clonePart = (part: PatternPart, prefixToken?: RunToken): PatternPart => {
  const r: PatternPart = {
    ...part,
    den_pattern: [ ...part.den_pattern ],
    frac_pattern: [ ...part.frac_pattern ],
    int_pattern: [ ...part.int_pattern ],
    man_pattern: [ ...part.man_pattern ],
    num_pattern: [ ...part.num_pattern ],
    tokens: [ ...part.tokens ],
    generated: true
  };
  if (prefixToken) {
    r.tokens.unshift(prefixToken);
  }
  return r;
};

export function parsePattern (pattern: string): ParseData {
  const partitions = [];
  let conditional = false;
  let l10n_override: string | null = null;
  let text_partition = null;
  let more = 0;
  let part: PatternPart;
  let i = 0;
  let conditions = 0;
  let tokens = tokenize(pattern);
  do {
    part = parseFormatSection(tokens);
    // Dates cannot blend with non-date tokens
    // General cannot blend with non-date tokens
    // -- This is does not match Excel 100% which
    //    seems to allow "," as a text token with General
    // -- Excel also does something strange when mixing
    //    General with dates (but that can hardly be expected to work)
    if (
      (part.date || part.general) &&
      (part.int_pattern.length || part.frac_pattern.length || part.scale !== 1 || part.text)
    ) {
      throw new Error('Illegal format');
    }
    if (part.condition) {
      conditions++;
      conditional = true;
    }
    if (part.text) {
      // only one text partition is allowed per pattern
      if (text_partition) {
        throw new Error('Unexpected partition');
      }
      text_partition = part;
    }
    if (part.locale) {
      l10n_override = resolveLocale(part.locale);
    }
    partitions.push(part);

    const used = part.tokensUsed ?? 0;
    more = tokens[used]?.type === TOKEN_BREAK ? 1 : 0;
    tokens = tokens.slice(used + more);
    i++;
  }
  while (more && i < 4 && conditions < 3);

  // No more than 4 sections are allowed
  if (more) {
    throw new Error('Unexpected partition');
  }
  // Only 2 conditional statements are allowed: "1;2;else;txt"
  if (conditions > 2) {
    throw new Error('Unexpected condition');
  }
  // 3rd part must be text of neutral if it is present
  const part3 = partitions[3];
  if (part3 && (part3.int_pattern.length || part3.frac_pattern.length || part3.date)) {
    throw new Error('Unexpected partition');
  }

  if (conditional) {
    // When a pattern has a single partition which exists in the second
    // partition, We must also set the first partition to `[>0]`.
    if (!partitions[0].condition) {
      partitions[0].condition = [ '>', 0 ];
    }

    // conditional patterns get a volatile minus on the "else" partitions
    const numParts = partitions.length;
    if (numParts === 1) {
      // provide a fallback pattern if there isn't one
      partitions[1] = parseFormatSection(tokenize('General'));
      partitions[1].generated = true;
    }
    if (numParts <= 2) {
      // what happens when [<10]0;[>10]0 <=> 3 or -3?
      // => pattern is "valid" but won't match anything runtime, so errors
    }
    // 1 and 2 part conditionals
    if (numParts < 3) {
      const part1 = partitions[0];
      const part2 = partitions[1];
      // first part follows standard < <= = rules
      maybeAddMinus(part1);
      // second part uses standard as well *if it has conditions*
      if (part2.condition) {
        maybeAddMinus(part2);
      }
      else {
        // ...else it *seems* to follow logic based on first condition
        const cond = part1.condition!;
        if (
          cond[0] === '=' ||
          (cond[1] >= 0 && (cond[0] === '>' || cond[0] === '>='))
        ) {
          part2.tokens.unshift({
            type: 'minus',
            volatile: true
          });
        }
      }
    }
    else {
      // 3 and 4 part patterns
      partitions.forEach(maybeAddMinus);
    }
  }
  // if this is not a conditional, then we ensure we have all 4 partitions
  else {
    // if we have less than 4 partitions and one of them is .text,
    // we need to use it as the text one
    if (partitions.length < 4 && text_partition) {
      for (let pi = 0, pl = partitions.length; pi < pl; pi++) {
        if (partitions[pi] === text_partition) {
          partitions.splice(pi, 1);
        }
      }
    }
    // missing positive
    if (partitions.length < 1 && text_partition) {
      partitions[0] = parseFormatSection(tokenize('General'));
      partitions[0].generated = true;
    }
    // missing negative
    if (partitions.length < 2) {
      // the volatile minus only happens if there is a single pattern
      const volMinus = { type: 'minus', volatile: true };
      partitions.push(clonePart(partitions[0], volMinus));
    }
    // missing zero
    if (partitions.length < 3) {
      partitions.push(clonePart(partitions[0]));
    }
    // missing text
    if (partitions.length < 4) {
      if (text_partition) {
        partitions.push(text_partition);
      }
      else {
        const p = parseFormatSection(tokenize('@'));
        p.generated = true;
        partitions.push(p);
      }
    }

    partitions[0].condition = [ '>', 0 ];
    partitions[1].condition = [ '<', 0 ];
    delete partitions[2].condition;
  }

  return {
    pattern: pattern,
    partitions: partitions,
    locale: l10n_override
  };
}

export function parseCatch (pattern: string): ParseData {
  try {
    return parsePattern(pattern);
  }
  catch (err) {
    const message = (err as Error)?.message;
    const errPart = {
      ...getEmptyPatternPart(),
      tokens: [ { type: 'error' } ],
      error: message
    };
    return {
      pattern: pattern,
      partitions: [ errPart, errPart, errPart, errPart ],
      error: message,
      locale: null
    };
  }
}
