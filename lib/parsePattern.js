import { resolveLocale } from './locale';
import { parsePart } from './parsePart';

export function parsePattern (pattern, l10n) {
  const partitions = [];
  let conditional = false;
  let l10n_override;
  let text_partition = null;

  // try {
  let p = pattern;
  let more = 0;
  let part = false;
  let i = 0;
  let conditions = 0;
  do {
    part = parsePart(p);
    if (part.condition) {
      conditions++;
      conditional = true;
    }
    if (part.text) {
      text_partition = part;
    }
    if (part.locale) {
      l10n_override = resolveLocale(part.locale);
      // l10n_override = getLocale(part.locale);
    }
    partitions.push(part);
    more = (p.charAt(part.pattern.length) === ';') ? 1 : 0;
    p = p.slice(part.pattern.length + more);
    i++;
  }
  while (more && i < 4 && conditions < 3);

  // No more than 4 sections and only 2 conditional statements: "1;2;else;txt"
  if (conditions > 2) {
    throw new Error('Unexpected condition');
  }
  if (more) {
    throw new Error('Unexpected partition');
  }

  // if this is not a conditional, then we ensure we have all 4 partitions
  if (!conditional) {
    // if we have less than 4 partitions - and one of them is .text, use it as the text one
    if (partitions.length < 4 && text_partition) {
      for (let pi = 0, pl = partitions.length; pi < pl; pi++) {
        if (partitions[pi] === text_partition) {
          partitions.splice(pi, 1);
        }
      }
    }
    // missing positive
    if (partitions.length < 1 && text_partition) {
      partitions[0] = parsePart('General');
    }
    // missing negative
    if (partitions.length < 2) {
      const part = parsePart(partitions[0].pattern);
      // the volatile minus only happens if there is a single pattern
      part.tokens.unshift({ type: 'minus', volatile: true });
      partitions.push(part);
    }
    // missing zero
    if (partitions.length < 3) {
      partitions.push(
        parsePart(partitions[0].pattern)
      );
    }
    if (partitions.length < 4) { // missing text
      partitions.push(text_partition || parsePart('@'));
    }

    partitions[0].condition = [ '>', 0 ];
    partitions[1].condition = [ '<', 0 ];
    partitions[2].condition = null;
  }

  return {
    pattern: pattern,
    partitions: partitions,
    locale: l10n_override
  };
}

export function parseCatch (pattern) {
  try {
    return parsePattern(pattern);
  }
  catch (err) {
    const errPart = { tokens: [ { type: 'error' } ] };
    return {
      pattern: pattern,
      partitions: [ errPart, errPart, errPart, errPart ],
      error: err.message,
      locale: null
    };
  }
}
