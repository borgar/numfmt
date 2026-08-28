import { resolveLocale } from './locale.ts';
import {
  u_YEAR, u_MONTH, u_DAY, u_HOUR, u_MIN, u_SEC, u_DSEC, u_CSEC, u_MSEC,
  EPOCH_1900, EPOCH_1317,
  TOKEN_AMPM, TOKEN_BREAK, TOKEN_CALENDAR, TOKEN_CHAR, TOKEN_COLOR, TOKEN_COMMA, TOKEN_CONDITION,
  TOKEN_DATETIME, TOKEN_DBNUM, TOKEN_DIGIT, TOKEN_DURATION, TOKEN_ERROR, TOKEN_ESCAPED, TOKEN_EXP,
  TOKEN_FILL, TOKEN_GENERAL, TOKEN_GROUP, TOKEN_HASH, TOKEN_LOCALE, TOKEN_MINUS, TOKEN_NATNUM,
  TOKEN_PAREN, TOKEN_PERCENT, TOKEN_PLUS, TOKEN_POINT, TOKEN_QMARK, TOKEN_SCALE, TOKEN_SKIP,
  TOKEN_SLASH, TOKEN_SPACE, TOKEN_STRING, TOKEN_TEXT, TOKEN_ZERO, TOKEN_MODIFIER,
  T_TYPE_INT, T_TYPE_NUM, T_TYPE_DEN, T_TYPE_DIV, T_TYPE_FRAC, T_TYPE_MAN, T_TYPE_SUBSEC, T_TYPE_YEAR_S,
  T_TYPE_YEAR, T_TYPE_B_YEAR_S, T_TYPE_B_YEAR, T_TYPE_DAY, T_TYPE_WEEKDAY_S, T_TYPE_WEEKDAY, T_TYPE_HOUR,
  T_TYPE_MNAME_S, T_TYPE_MNAME_1, T_TYPE_MNAME, T_TYPE_MIN, T_TYPE_MON, T_TYPE_HOUR_E, T_TYPE_MIN_E,
  T_TYPE_SEC_E, T_TYPE_SEC
} from './constants.ts';
import type { DateRenderToken, Token, RenderToken, SectionType } from './types.ts';
import { createPartition } from './createPartition.ts';

function add (s: string | RenderToken, tokens: RenderToken[]): void {
  // allow adding string tokens without wrapping
  if (typeof s === 'string') {
    tokens.push({ type: TOKEN_STRING, value: s });
  }
  else {
    tokens.push(s);
  }
}

const countNonHash = (s: string): number => {
  let n = 0;
  for (let i = 0; i < s.length; i++) {
    if (s.charCodeAt(i) !== 35) {
      n++;
    }
  }
  return n;
};

function isNumOp (token: Token | RenderToken, activePattern: SectionType) {
  const type = token?.type;
  return (
    (type === TOKEN_HASH || type === TOKEN_ZERO || type === TOKEN_QMARK) ||
    (type === TOKEN_DIGIT && activePattern === T_TYPE_DEN)
  );
}

export function parseFormatSection (inputTokens: Token[]) {
  const outputTokens: RenderToken[] = [];
  const part = createPartition(outputTokens);

  let currentPattern: SectionType = T_TYPE_INT; // 'num' is unused here?
  let lastNumberChunk: RenderToken | undefined;
  const dateChunks: DateRenderToken[] = [];
  let last: Token | undefined;
  let haveLocale = false;

  let index = -1;
  let partOver = false;
  let patternSource = '';
  let haveSlash = false;

  const getPattern = (p: SectionType) => {
    if (p === T_TYPE_DEN) { return part.den_pattern; }
    if (p === T_TYPE_INT) { return part.int_pattern; }
    if (p === T_TYPE_FRAC) { return part.frac_pattern; }
    if (p === T_TYPE_MAN) { return part.man_pattern; }
    return [];
  };

  while (++index < inputTokens.length && !partOver) {
    const token = inputTokens[index];
    const type = token.type || TOKEN_ERROR;
    patternSource += token.raw;

    if (type === TOKEN_GENERAL) {
      part.general = true;
      add({ type }, outputTokens);
    }

    // new partition
    else if (isNumOp(token, currentPattern)) {
      const pt = getPattern(currentPattern);
      if (last && (isNumOp(last, currentPattern) || last.type === TOKEN_GROUP)) {
        // append to current
        pt.push((pt.pop() || '') + token.value);
        if (lastNumberChunk && 'num' in lastNumberChunk) {
          lastNumberChunk.num += token.value;
        }
      }
      else {
        // new number section
        pt.push(token.value);
        lastNumberChunk = { type: currentPattern, num: token.value };
        add(lastNumberChunk!, outputTokens);
      }
    }

    else if (type === TOKEN_PAREN) {
      if (token.value === '(') {
        part.parens = true;
      }
      add(token.value, outputTokens);
    }
    else if (type === TOKEN_DIGIT) {
      // just print it
      add(token.value, outputTokens);
    }

    // vulgar fractions
    else if (type === TOKEN_SLASH) {
      haveSlash = true;
      const pt = getPattern(currentPattern);
      if (pt.length) {
        if (!lastNumberChunk) { // need to have a numerator present
          throw new SyntaxError('Format pattern is missing a numerator');
        }
        part.fractions = true;
        // ... we just passed the numerator - correct that item
        const xx = pt.pop()!;
        part.num_pattern.push(xx);
        lastNumberChunk.type = T_TYPE_NUM;
        // next up... the denominator
        currentPattern = T_TYPE_DEN;
        add({ type: T_TYPE_DIV }, outputTokens);
      }
      else {
        add(token.value, outputTokens);
      }
    }

    else if (type === TOKEN_COMMA) {
      add(',', outputTokens);
    }
    else if (type === TOKEN_SCALE) {
      part.scale = 0.001 ** token.raw.length;
    }
    else if (type === TOKEN_GROUP) {
      if (currentPattern === T_TYPE_INT) {
        part.grouping = true;
      }
      if (currentPattern === T_TYPE_DEN) {
        throw new SyntaxError('Cannot group denominator digits');
      }
      // else we just ignore it!
    }

    else if (type === TOKEN_SPACE) {
      add({ type }, outputTokens);
    }

    else if (type === TOKEN_BREAK) {
      partOver = true;
      break; // leave the ";" hanging
    }

    else if (type === TOKEN_TEXT) { // @
      part.text = true;
      add({ type, value: token.value }, outputTokens);
    }
    else if (type === TOKEN_PLUS || type === TOKEN_MINUS) {
      add({ type }, outputTokens);
    }

    // [h] [m] [s]
    // else if ((m = /^(?:\[(h+|m+|s+)\])/i.exec(s))) {
    else if (type === TOKEN_DURATION) {
      const tokenValue = token.value.toLowerCase(); // deal with in tokenizer
      const startsWith = tokenValue[0];
      let bit: RenderToken;
      if (startsWith === 'h') {
        bit = { type: T_TYPE_HOUR_E, size: u_HOUR, pad: tokenValue.length };
      }
      else if (startsWith === 'm') {
        bit = { type: T_TYPE_MIN_E, size: u_MIN, pad: tokenValue.length };
      }
      else {
        bit = { type: T_TYPE_SEC_E, size: u_SEC, pad: tokenValue.length };
      }
      // signal date calc and track smallest needed unit
      part.date = part.date | bit.size;
      dateChunks.push(bit);
      add(bit, outputTokens);
    }
    // Note: In locales where decimal symbol is set to "," Excel will expect
    //       "," rather than a ".". This must be solved by re-localizing the
    //       pattern before using it.
    // .0 .00 .000
    else if (part.date && type === TOKEN_POINT && inputTokens[index + 1]?.type === TOKEN_ZERO) {
      let dec = 1;
      index++;
      let raw = '0';
      if (inputTokens[index + 1]?.type === TOKEN_ZERO) {
        raw += '0';
        dec = 2;
        index++;
      }
      if (inputTokens[index + 1]?.type === TOKEN_ZERO) {
        raw += '0';
        dec = 3;
        index++;
      }
      patternSource += raw;
      const size = [ u_SEC, u_DSEC, u_CSEC, u_MSEC ][dec];
      part.date = part.date | size;
      part.date_eval = true;
      part.sec_decimals = Math.max(part.sec_decimals, dec);
      add({ type: T_TYPE_SUBSEC, size: size, decimals: dec }, outputTokens);
    }

    else if (type === TOKEN_CALENDAR) {
      // signal date system (ignored if defined with [$-xxx])
      if (!haveLocale) {
        // Use Hijri calendar system
        if (token.value === 'B2' || token.value === 'b2') {
          // TODO: B2 does more than this
          // it switches locale to [$-060401] (ar) which affects display (RTL)
          part.date_system = EPOCH_1317;
        }
        // Use Gregorian calendar system
        else { // B1 | b1
          // signal date system (ignored if defined with [$-xxx])
          part.date_system = EPOCH_1900;
        }
      }
    }

    // hh:mm:ss YYYY-MM-DD
    else if (type === TOKEN_DATETIME) {
      // Excel is "mostly" case insensitive here except it checks the last used
      // date token. Which, if it was s or h, minutes is used. The same is true
      // if we hit m or s, and last is m.
      // m and mm are spurious, mmm is always month
      let bit: DateRenderToken | undefined;
      const value = token.value.toLowerCase(); // deal with in tokenizer?
      const startsWith = value[0];
      if (value === 'y' || value === 'yy') {
        bit = { type: T_TYPE_YEAR_S, size: u_YEAR };
      }
      else if (startsWith === 'y' || startsWith === 'e') {
        bit = { type: T_TYPE_YEAR, size: u_YEAR };
      }
      else if (value === 'b' || value === 'bb') {
        bit = { type: T_TYPE_B_YEAR_S, size: u_YEAR };
      }
      else if (startsWith === 'b') {
        bit = { type: T_TYPE_B_YEAR, size: u_YEAR };
      }
      else if (value === 'd' || value === 'dd') {
        bit = { type: T_TYPE_DAY, size: u_DAY, pad: value === 'dd' };
      }
      else if (value === 'ddd' || value === 'aaa') {
        bit = { type: T_TYPE_WEEKDAY_S, size: u_DAY };
      }
      else if (startsWith === 'd' || startsWith === 'a') {
        bit = { type: T_TYPE_WEEKDAY, size: u_DAY };
      }
      else if (startsWith === 'h') {
        bit = { type: T_TYPE_HOUR, size: u_HOUR, pad: value.length > 1 };
      }
      else if (startsWith === 'm') {
        if (value.length === 3) {
          bit = { type: T_TYPE_MNAME_S, size: u_MONTH };
        }
        else if (value.length === 5) {
          bit = { type: T_TYPE_MNAME_1, size: u_MONTH };
        }
        else if (value.length >= 4) {
          bit = { type: T_TYPE_MNAME, size: u_MONTH };
        }
        // m or mm can be either minute or month based on context
        const last_date_chunk = dateChunks[dateChunks.length - 1];
        if (!bit && last_date_chunk && !last_date_chunk.used && (last_date_chunk.size & (u_HOUR | u_SEC))) {
          // if this value follows hour or second, it is a minute
          last_date_chunk.used = true;
          bit = { type: T_TYPE_MIN, size: u_MIN, pad: value.length > 1 };
        }
        // if we still don't know, we treat as a month and defer, a later 'sec' value may switch it
        if (!bit) {
          bit = { type: T_TYPE_MON, size: u_MONTH, pad: value.length > 1, indeterminate: true };
        }
      }
      else if (startsWith === 's') {
        bit = { type: T_TYPE_SEC, size: u_SEC, pad: value.length > 1 };
        // if last date chunk was m, flag this used
        const last_date_chunk = dateChunks[dateChunks.length - 1];
        if (last_date_chunk && last_date_chunk.size & u_MIN) {
          bit.used = true;
        }
        // if last date chunk is undecided, we know that it is a minute
        else if (last_date_chunk && 'indeterminate' in last_date_chunk) {
          delete last_date_chunk.indeterminate;
          last_date_chunk.size = u_MIN;
          last_date_chunk.type = T_TYPE_MIN;
          bit.used = true;
        }
      }
      else if (startsWith === 'g') {
        // TODO: Don't know what this does? (yet!)
      }
      if (bit) {
        // signal date calc and track smallest needed unit
        part.date = part.date | bit.size;
        part.date_eval = true;
        dateChunks.push(bit);
        add(bit, outputTokens);
      }
    }

    // AM/PM
    // See: https://github.com/SheetJS/sheetjs/issues/676
    else if (type === TOKEN_AMPM) {
      part.clock = 12;
      part.date = part.date | u_HOUR;
      part.date_eval = true;
      add({ type, short: token.value === 'A/P' }, outputTokens);
    }

    // escaped character, string
    else if (type === TOKEN_STRING || type === TOKEN_ESCAPED || type === TOKEN_CHAR) {
      add(token.value, outputTokens);
    }

    // condition
    else if (type === TOKEN_CONDITION) {
      const parts = /^(<[=>]?|>=?|=)\s*(-?[.\d]+)$/.exec(token.value);
      if (parts) {
        part.condition = [
          parts[1], // operator
          parseFloat(parts[2]) // operand
        ];
      }
      else {
        throw new Error('Invalid condition: ' + token.value);
      }
    }

    // locale code -- we extend to allow std. "en-US" style codes
    // https://stackoverflow.com/questions/54134729/what-does-the-130000-in-excel-locale-code-130000-mean/54540455#54540455
    else if (type === TOKEN_LOCALE) {
      const bits = token.value.split('-');
      const code = bits.length < 2 ? '' : bits.slice(1).join('-');

      const currency = bits[0];
      if (currency) {
        add(currency, outputTokens);
      }

      const l4e = resolveLocale(code);
      if (l4e) { part.locale = l4e; }
      const wincode = parseInt(code, 16);
      if (isFinite(wincode) && (wincode & 0xff0000)) {
        const cal = (wincode >> 16) & 0xff;
        // only Hijri is supported atm.
        if (cal === 6) {
          part.date_system = EPOCH_1317;
        }
      }

      haveLocale = true; // ignore any B2 & B1 tokens
    }

    // color
    else if (type === TOKEN_COLOR) {
      let cm: RegExpExecArray | null;
      const v = token.value.toLowerCase();
      if ((cm = /^color\s*(\d+)$/i.exec(v))) {
        part.color = parseInt(cm[1], 10);
      }
      else {
        part.color = v;
      }
    }

    // percentage
    else if (type === TOKEN_PERCENT) {
      part.scale = 100;
      part.percent = true;
      add('%', outputTokens);
    }

    // decimal fraction
    else if (type === TOKEN_POINT) {
      add({ type, value: token.value }, outputTokens);
      if (!part.date) {
        part.dec_fractions = true;
        currentPattern = T_TYPE_FRAC;
      }
    }

    // exponent
    else if (type === TOKEN_EXP) {
      // Exponent pattern requires symbol to directly follow "E" but the
      // signature symbol, however, prefixes the first digit of the mantissa
      part.exponential = true;
      const plus = token.value.includes('+');
      part.exp_plus = plus;
      currentPattern = T_TYPE_MAN;
      add({ type: TOKEN_EXP, plus }, outputTokens);
    }

    // skip width
    else if (type === TOKEN_SKIP) {
      add({ type, value: token.value }, outputTokens);
    }

    // fill space with next char
    else if (type === TOKEN_FILL) {
      add({ type, value: token.value }, outputTokens);
    }

    else if (type === TOKEN_DBNUM) {
      // UNSUPPORTED:
      // - DBNum1 = NatNum4
      // - DBNum2 = NatNum5
      // - DBNum3 = either NatNum6 or NatNum3?
      // - DBNum3 = NatNum10
      const n = parseInt(token.value.slice(5));
      if (n < 1 || n > 4) {
        throw new SyntaxError('Unknown modifier: ' + token.value);
      }
    }

    else if (type === TOKEN_NATNUM) {
      // NatNum: https://www.openoffice.org/api/docs/common/ref/com/sun/star/i18n/NativeNumberMode.html
      throw new SyntaxError('Unknown modifier: ' + token.value);
    }

    else if (type === TOKEN_MODIFIER) {
      throw new SyntaxError('Unknown modifier: ' + token.value);
    }

    else if (type === TOKEN_ERROR) {
      throw new SyntaxError(`Illegal character: ${patternSource}`);
    }

    else {
      throw new SyntaxError(`Unknown token ${type} in ${patternSource}`);
    }

    // advance parser
    last = token;
  }
  part.tokensUsed = index;
  part.pattern = patternSource;

  // Make sure we don't have an illegal pattern. We could support some of this
  // but we side with Excel and don't because they make no sense.
  if (
    (part.fractions && part.dec_fractions) ||
    (part.grouping && !part.int_pattern.length) ||
    (part.fractions && part.exponential) ||
    (part.fractions && (part.den_pattern.length * part.num_pattern.length) === 0) ||
    (haveSlash && !part.fractions && !part.date) ||
    (part.exponential && ((part.int_pattern.length || part.frac_pattern.length) * part.man_pattern.length) === 0)
  ) {
    throw new SyntaxError(`Invalid pattern: ${patternSource}`);
  }

  const intPattern = part.int_pattern.join('');
  const manPattern = part.man_pattern.join('');
  const fracPattern = part.frac_pattern.join('');
  part.int_max = intPattern.length;
  part.int_min = countNonHash(intPattern);

  let min = 0;
  for (let i = 0; i < intPattern.length; i++) {
    const ch = intPattern[intPattern.length - 1 - i];
    if (/^[0-9?]/.test(ch)) {
      min = i + 1;
    }
  }
  part.int_min = min;
  part.frac_max = fracPattern.length;

  let num_pat = part.num_pattern.join('');
  // let den_pat = part.den_pattern.join('');
  let den_pat = part.den_pattern[0] || '';
  const enforce_padded = den_pat.includes('?') || num_pat.includes('?');
  // numerical denominator padding type is inherited from numerator padding type
  if (enforce_padded) {
    den_pat = den_pat.replace(/\d/g, '?');
    den_pat = den_pat.replace(/#$/g, '?');
    part.num_min = countNonHash(num_pat);
    part.den_max = den_pat.length;
    part.den_min = countNonHash(den_pat);
    num_pat = num_pat.replace(/#$/g, '?');
  }
  else {
    part.num_min = countNonHash(num_pat);
    part.den_max = den_pat.length;
    part.den_min = countNonHash(den_pat);
  }

  part.int_p = intPattern;
  part.man_p = manPattern;
  part.num_p = num_pat;
  part.den_p = den_pat;

  if (part.den_pattern.length) {
    // detect and set rounding factor for denominator
    part.denominator = parseInt(part.den_pattern.join('').replace(/\D/g, ''), 10);
  }

  part.integer = !!intPattern.length;

  if (!part.integer && !part.exponential && fracPattern.length) {
    // if no integer has been found, we inject one
    const pointIdx = part.tokens.findIndex(d => d.type === TOKEN_POINT);
    part.tokens.splice(pointIdx, 0, { type: T_TYPE_INT, num: '#' });
    part.integer = true;
    part.int_pattern = [ '#' ];
    part.int_p = '#';
  }

  // empty token list means that this is likely a directive only pattern (`[black]`)
  // in which case we need to inject a general token
  if (!part.tokens.length && /^\[(?!\$)/.test(part.pattern)) {
    part.general = true;
    add({ type: TOKEN_GENERAL }, outputTokens);
  }

  // extra whitespace rules for vulgar fractions
  if (part.fractions) {
    // fragment bits affect surrounding whitespace
    // if either bit is "#", the whitespace around it, and
    // the div symbol, is removed if the bit is not shown
    for (let i = 0; i < outputTokens.length - 1; i++) {
      const tok = outputTokens[i];
      if (tok.type !== TOKEN_STRING && tok.type !== TOKEN_SPACE) {
        continue;
      }
      const nextType = outputTokens[i + 1].type;
      if (nextType === T_TYPE_NUM) {
        tok.rule = 'num+int';
      }
      else if (nextType === T_TYPE_DIV) {
        tok.rule = 'num';
      }
      else if (nextType === T_TYPE_DEN) {
        tok.rule = 'den';
      }
    }
  }

  // if the number is fragmented, grouping should not be applied
  if (part.grouping) {
    if (part.int_pattern.length > 1) {
      part.grouping = false;
    }
  }

  return part;
}
