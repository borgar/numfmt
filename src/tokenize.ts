import { TOKEN_GROUP, TOKEN_SCALE, TOKEN_COMMA, TOKEN_CHAR, TOKEN_POINT } from './constants.ts';
import { defaultLocale } from './locale.ts';
import { getTokenHandlers } from './tokenHandlers.ts';
import type { Token, TokenType } from './types.ts';

const CODE_QMRK = 63;
const CODE_HASH = 35;
const CODE_ZERO = 48;
const CODE_NINE = 57;
const isNumOp = (char: string) => {
  const c = (char || '\0').charCodeAt(0);
  return (c === CODE_QMRK || c === CODE_HASH || (c >= CODE_ZERO && c <= CODE_NINE));
};

export function lexer (pattern: string, handlers: [ TokenType, RegExp, number ][]): Token[] {
  let i = 0;
  const tokens: Token[] = [];
  const unresolvedCommas = [];
  const pointCommas: Token[] = [];
  let inPointRun = false;
  let seenPoint = false;
  while (i < pattern.length) {
    const curr = pattern.slice(i);
    let step = 0;
    // A comma is context sensitive and needs to be handled as a special case.
    // This needs to happen in the tokenizer because to be able to re-localize
    // the pattern we'll need to know what each comma means.
    const mComma = /^(,+)(.)?/.exec(curr);
    if (mComma) {
      // comma depends on what it follows
      const raw = mComma[1];
      step = raw.length;
      const lookBehind = pattern[i - 1] || '';
      let maybeGROUP = false;
      let maybeSCALE = false;
      if (isNumOp(lookBehind)) { // 0-9, '#', or '?': may be GROUP or SCALE
        maybeGROUP = true;
        maybeSCALE = true;
      }
      else if (lookBehind === '.') { // '.': may be SCALE only
        maybeSCALE = true;
      }
      // if at the end of the pattern or section, then this can't be a GROUP op
      const lookAhead = mComma[2] || '';
      if (maybeGROUP && (!lookAhead || lookAhead === ';')) {
        maybeGROUP = false;
      }
      // if next char is a num token, then this cannot be a SCALE op
      if (maybeSCALE && isNumOp(lookAhead)) {
        maybeSCALE = false;
      }
      if (maybeGROUP && !maybeSCALE) {
        tokens.push({ type: TOKEN_GROUP, value: ',', raw });
      }
      else if (!maybeGROUP && maybeSCALE) {
        tokens.push({ type: TOKEN_SCALE, value: ',', raw });
      }
      else if (maybeGROUP && maybeSCALE) {
        // this token will be set to scale, but switched to group if we hit a
        // num token later on in the pattern...
        const t: Token = { type: TOKEN_SCALE, value: ',', raw };
        tokens.push(t);
        unresolvedCommas.push(t);
      }
      else {
        tokens.push({ type: TOKEN_COMMA, value: ',', raw });
      }
    }
    // all other symbols are matched using
    else {
      let token: Token | undefined;
      for (const [ type, expr, group ] of handlers) {
        const m = expr.exec(curr);
        if (m) {
          token = { type, value: m[group || 0], raw: m[0] };
          tokens.push(token);
          step = m[0].length;
          break;
        }
      }
      // if we just matched a break, then deal with any unresolved commas
      if (token?.raw === ';') {
        unresolvedCommas.length = 0;
        pointCommas.length = 0;
        seenPoint = false;
      }
      // the commas before a decimal point only scale the number if no digits
      // or points follow the decimal digits: "0,.0x0" does not scale, "0,.0x" does
      const isNum = !!token && isNumOp(token.raw);
      if (!inPointRun || !isNum) {
        if (pointCommas.length && (isNum || token?.type === TOKEN_POINT)) {
          pointCommas.forEach(d => (d.type = TOKEN_GROUP));
          pointCommas.length = 0;
        }
        inPointRun = false;
      }
      // commas right before a decimal point followed by digits scale the
      // number: Excel reads "#,##0,.00" as "#,##0.00,"
      if (token?.type === TOKEN_POINT) {
        const prev = tokens[tokens.length - 2];
        if (!seenPoint && unresolvedCommas.length && prev === unresolvedCommas[unresolvedCommas.length - 1] &&
            isNumOp(pattern[i + 1])) {
          pointCommas.push(...unresolvedCommas);
          unresolvedCommas.length = 0;
          inPointRun = true;
        }
        seenPoint = true;
      }
      // if we just matched a num operator, then deal with any unresolved commas
      if (token && unresolvedCommas.length && isNumOp(token.raw)) {
        unresolvedCommas.forEach(d => (d.type = TOKEN_GROUP));
        unresolvedCommas.length = 0;
      }
    }
    if (!step) {
      const raw = curr[0];
      step = 1;
      tokens.push({ type: TOKEN_CHAR, value: raw, raw });
    }
    i += step;
  }
  return tokens;
}

/**
 * Breaks a format pattern string into a list of tokens.
 *
 * The returned output will be an array of objects representing the tokens:
 *
 * ```js
 * [
 *   { type: TOKEN_ZERO, value: '0', raw: '0' },
 *   { type: TOKEN_POINT, value: '.', raw: '.' },
 *   { type: TOKEN_ZERO, value: '0', raw: '0' },
 *   { type: TOKEN_PERCENT, value: '%', raw: '%' }
 * ]
 * ```
 *
 * @param pattern The format pattern
 * @returns A list of tokens
 */
export function tokenize (pattern: string): Token[] {
  return lexer(pattern, getTokenHandlers(defaultLocale));
}
