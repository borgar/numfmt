import { TOKEN_CHAR, TOKEN_COLOR, TOKEN_COMMA, TOKEN_CURRENCY, TOKEN_DATETIME, TOKEN_DURATION, TOKEN_ESCAPED, TOKEN_GENERAL, TOKEN_GROUP, TOKEN_HASH, TOKEN_MODIFIER, TOKEN_POINT, TOKEN_QMARK, TOKEN_SPACE, TOKEN_STRING, TOKEN_ZERO } from './constants.ts';
import { defaultLocale, getLocale, parseLocale, resolveLocale } from './locale.ts';
import { getTokenHandlers } from './tokenHandlers.ts';
import { lexer } from './tokenize.ts';
import type { Token } from './types.ts';

const COLORS: Record<string, string> = {
  black: 'Black',
  white: 'White',
  red: 'Red',
  green: 'Green',
  blue: 'Blue',
  yellow: 'Yellow',
  magenta: 'Magenta',
  cyan: 'Cyan'
};

function isNumOp (token?: Token): boolean {
  const type = token?.type;
  return (type === TOKEN_HASH || type === TOKEN_ZERO || type === TOKEN_QMARK);
}

function eq (a: string, b: string): boolean {
  if (a === b) {
    return true;
  }
  // lax group
  if (a === '’' && b === "'" || b === '’' && a === "'") {
    return true;
  }
  if (a === ',' && b === '٬' || b === '٬' && a === ',') {
    return true;
  }
  // lax decimal
  if (a === '.' && b === '٫' || b === '٫' && a === '.') {
    return true;
  }
  // lax whitespace
  if (/^\s$/.test(a) && /^\s$/.test(b)) {
    return true;
  }
  return false;
}

/**
 * Translate a number format pattern from a locale into the default `en-US` variant.
 *
 * Group and decimal symbols will be flipped as needed, alternative operators letters
 * will be changed to the default letters, color names will be translated.
 *
 * Additionally, non-operator characters as well as escaped characters and quoted strings
 * will be collapsed to quoted strings as possible.
 *
 * @param pattern A format pattern in the ECMA-376 number format.
 * @param fromLocale A BCP 47 string tag or Excel [MsoLanguageID](https://docs.microsoft.com/en-us/office/vba/api/office.msolanguageid).
 * @returns The default equivalent of the input pattern.
 */
export function delocalize (pattern: string, fromLocale: string | number): string {
  const l = parseLocale(resolveLocale(fromLocale) ?? 'en-US');
  const l10n = getLocale(l.lang) ?? defaultLocale;

  const flipNum = l10n?.decimal !== '.';
  const wsGroup = /^\s$/.test(l10n.group);
  // Translate tokens
  const handlers = getTokenHandlers(l10n);
  const tokens = lexer(pattern, handlers);

  // setup
  const colorTag = (l10n.color ?? 'Color').toLowerCase();
  const colorNames = l10n.colors ?? COLORS;
  const opcodes = l10n.opcodes;

  // pass 1:
  const out: Token[] = [];
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    const type = t.type;
    if (type === TOKEN_COLOR || type === TOKEN_MODIFIER) {
      const v = t.value.toLowerCase();
      const isLC = v === t.value;
      if (v.startsWith(colorTag)) {
        const o = `[${isLC ? 'color' : 'Color'}${t.value.slice(colorTag.length)}]`;
        out.push({ type: TOKEN_COLOR, value: o, raw: o });
      }
      else if (v in colorNames) {
        const o = `[${isLC ? colorNames[v].toLowerCase() : colorNames[v]}]`;
        out.push({ type: TOKEN_COLOR, value: o, raw: o });
      }
      else {
        out.push(t);
      }
    }
    else if (opcodes && type === TOKEN_DATETIME) {
      const lc1 = t.value.charAt(0).toLowerCase();
      if (opcodes.dy && lc1 === opcodes.dy) {
        out.push({ type: TOKEN_DATETIME, value: '', raw: 'Y'.repeat(t.value.length) });
      }
      else if (opcodes.dm && lc1 === opcodes.dm || opcodes.tm && lc1 === opcodes.tm) {
        out.push({ type: TOKEN_DATETIME, value: '', raw: 'M'.repeat(t.value.length) });
      }
      else if (opcodes.dd && lc1 === opcodes.dd) {
        out.push({ type: TOKEN_DATETIME, value: '', raw: 'D'.repeat(t.value.length) });
      }
      else if (opcodes.th && lc1 === opcodes.th) {
        out.push({ type: TOKEN_DATETIME, value: '', raw: 'H'.repeat(t.value.length) });
      }
      else if (opcodes.ts && lc1 === opcodes.ts) {
        out.push({ type: TOKEN_DATETIME, value: '', raw: 'S'.repeat(t.value.length) });
      }
      else {
        out.push(t);
      }
    }
    else if (opcodes && type === TOKEN_DURATION) {
      const lc1 = t.value.charAt(0).toLowerCase();
      if (opcodes.th && lc1 === opcodes.th) {
        out.push({ type: TOKEN_DURATION, value: '', raw: '[H]' });
      }
      else if (opcodes.tm && lc1 === opcodes.tm) {
        out.push({ type: TOKEN_DURATION, value: '', raw: '[M]' });
      }
      else if (opcodes.ts && lc1 === opcodes.ts) {
        out.push({ type: TOKEN_DURATION, value: '', raw: '[S]' });
      }
      else {
        out.push(t);
      }
    }
    else if (wsGroup && type === TOKEN_SPACE && isNumOp(tokens[i - 1]) && isNumOp(tokens[i + 1])) {
      out.push({ type: TOKEN_GROUP, value: ',', raw: ',' });
    }
    else if (flipNum && type === TOKEN_POINT && isNumOp(tokens[i - 1]) && isNumOp(tokens[i + 1])) {
      out.push({ type: TOKEN_GROUP, value: ',', raw: ',' });
    }
    else if (type === TOKEN_CHAR && eq(t.value, l10n.group)) {
      out.push({ type: TOKEN_GROUP, value: ',', raw: ',' });
    }
    else if (flipNum && (type === TOKEN_COMMA || type === TOKEN_GROUP)) {
      out.push({ type: TOKEN_POINT, value: '.', raw: '.' });
    }
    else {
      out.push(t);
    }
  }

  // Emit a "cleaned" string of tokens where chars/strings/escapes have been collapsed
  let s = '';
  let inStr = false;
  for (const t of out) {
    if (t.type === TOKEN_POINT && inStr) {
      s += t.raw;
    }
    else if (t.type === TOKEN_CURRENCY) {
      const as_str = /[a-z]/i.test(t.raw);
      if (inStr && !as_str) {
        s += '"';
        inStr = false;
      }
      else if (!inStr && as_str) {
        s += '"';
        inStr = true;
      }
      s += t.raw;
    }
    else if (t.type === TOKEN_ESCAPED && t.value === '"') {
      if (inStr) {
        s += '"';
        inStr = false;
      }
      s += t.raw;
    }
    else if (t.type === TOKEN_ESCAPED || t.type === TOKEN_STRING) {
      if (!inStr) {
        s += '"';
        inStr = true;
      }
      s += t.value;
    }
    else if (t.type === TOKEN_GENERAL) {
      s += 'General';
    }
    else if (t.type === TOKEN_CHAR) {
      if (!inStr && t.value !== ':') {
        s += '"';
        inStr = true;
      }
      s += t.raw;
    }
    else {
      if (inStr) {
        s += '"';
        inStr = false;
      }
      s += t.raw;
    }
  }
  if (inStr) {
    s += '"';
  }
  return s;
}
