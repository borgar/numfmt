import { parseFloat15 } from './parseFloat15.ts';
import type { LocaleData } from '../locale.ts';
import type { ParseDataNum } from './types.ts';

// const CM = ',';
const SP = ' ';
const NS = ' ';
const NN = ' ';

const isDigit = (d: string) => d?.length === 1 && d >= '0' && d <= '9';
const isAltspace = (c: string) => (c === NS || c === NN);

/**
 * Parse a numeric string input and return its value and format. If the input
 * was not recognized or valid, the function returns a `null`, for valid input
 * it returns an object with two properties:
 *
 * * `v`: the parsed value.
 * * `z`: the number format of the input (if applicable).
 *
 * @see parseValue
 * @param value The number to parse
 * @param [options] Options for the parsing behavior.
 * @returns An object of the parsed value and a corresponding format string
 */
export function parseNumberXl (value: string, l10n: LocaleData): ParseDataNum | undefined {
  // we base everything on the decimal separator
  const dec = l10n.decimal;
  const grp = l10n.group !== SP && l10n.group !== dec ? l10n.group : '';
  const currencyPos = l10n.format?.currencyPos ?? 0;

  let num = '';
  let exp = '';
  let sign = 1;
  let minus = false;
  let plus = false;
  let openParen = false;
  let closeParen = false;
  let percent = false;
  let currency = false;
  let currencySymbol = null;
  let i = 0;

  // don't allow staring with a alternative-whitespace
  if (isAltspace(value[i])) {
    return;
  }

  // prefix: [ SP, NN, '+', '%', '(', '-', '€' ] + currency
  const cSymb = l10n.currency ?? '$';
  let char = '';
  do {
    char = value[i];
    if (char === '-') {
      if (minus || openParen || plus) {
        return;
      }
      minus = true;
      sign = -1;
    }
    else if (char === '+') {
      if (minus || plus) {
        return;
      }
      plus = true;
    }
    else if ((currencyPos === 0 || currencyPos === 2) && value.slice(i).startsWith(cSymb)) {
      if (currency) {
        return;
      }
      i += Math.max(0, cSymb.length - 1);
      currency = true;
      currencySymbol = char;
    }
    else if (char === '€') {
      if (currency) {
        return;
      }
      currency = true;
      currencySymbol = char;
    }
    else if (char === '(') {
      if (openParen || minus) {
        return;
      }
      openParen = true;
      sign = -1;
    }
    else if (char === '%') {
      if (percent) {
        return;
      }
      percent = true;
    }
    else if (char === SP || char === NN) {
      // no-op
    }
    else {
      break;
    }
    i++;
  }
  while (i < value.length);

  // number
  let haveDecimal = false;
  let groupSize = 0;
  let groups = 0;
  if (value[i] === dec || isDigit(value[i])) {
    while (i < value.length) {
      const ch = value[i];
      if (ch === grp) {
        if (haveDecimal) {
          return;
        }
        if (!groups && (!num || !+num)) {
          // banned: ",123"
          // banned: "0,123"
          // banned: "00,123"
          // banned: "000,123"
          return;
        }
        if (groups && groupSize < 3) {
          return;
        }
        groupSize = 0;
        groups++;
      }
      else if (ch === dec) {
        if (haveDecimal) {
          return;
        }
        if (groups && groupSize < 3) {
          return;
        }
        groupSize = 0;
        num += '.';
        haveDecimal = true;
      }
      else if (isDigit(ch)) {
        groupSize++;
        num += ch;
      }
      else {
        break;
      }
      i++;
    }
  }
  if (!haveDecimal && groups && groupSize < 3) {
    return;
  }

  // fractions
  let haveFraction = false;
  let fraction = 0;
  let denominator = '';
  const fm = !haveDecimal && /^ +(\d+)\/(\d+)/.exec(value.slice(i));
  if (fm) {
    fraction = +fm[1] / +fm[2];
    haveFraction = true;
    denominator = fm[2];
    i += fm[0].length;
  }

  // exponent
  if (value[i] === 'e' || value[i] === 'E') {
    exp += value[i];
    i++;
    if (value[i] === '+' || value[i] === '-') {
      exp += value[i];
      i++;
    }
    const d = i;
    while (isDigit(value[i])) {
      exp += value[i];
      i++;
    }
    if (d === i) {
      // contains no digits
      return;
    }
  }

  // suffix: [ SP, NN, '%', ')', '€' ] + currency;
  let lastSuffix = '';
  while (i < value.length) {
    char = value[i];
    lastSuffix = char;
    // only 1 occurance of these is allowed
    if ((currencyPos === 1 || currencyPos === 3) && value.slice(i).startsWith(cSymb)) {
      if (currency) {
        return;
      }
      i += Math.max(0, cSymb.length - 1);
      currency = true;
      currencySymbol = char;
    }
    else if (char === '€') {
      if (currency) {
        return;
      }
      currency = true;
      currencySymbol = char;
    }
    else if (char === ')') {
      if (closeParen || !openParen) {
        return;
      }
      closeParen = true;
    }
    else if (char === '%') {
      if (percent) {
        return;
      }
      percent = true;
    }
    else if (char === SP || char === NN) {
      // no-op
    }
    else {
      break;
    }
    i++;
  }

  // don't allow ending with a whitespace
  if (isAltspace(lastSuffix)) {
    return;
  }

  if (i !== value.length) {
    return;
  }

  if ((currency && percent) || (closeParen !== openParen) || (closeParen && plus)) {
    return;
  }

  // is number ok?
  let numberValue = parseFloat15(num + exp);
  if (haveFraction) {
    numberValue += fraction;
  }
  if (percent) {
    numberValue = +(numberValue * 0.01).toPrecision(15);
  }
  if (!isFinite(numberValue)) {
    return;
  }

  let fmt: number | undefined;
  if (exp) {
    fmt = 11;
  }
  else if (haveFraction) {
    fmt = denominator.length > 1 ? 13 : 12;
  }
  else if (percent) {
    fmt = haveDecimal ? 10 : 9;
  }
  else if (currency && currencySymbol !== '€') {
    fmt = haveDecimal ? 8 : 6;
  }
  else if (groups && currencySymbol !== '€') {
    fmt = haveDecimal ? 4 : 3;
  }
  const ret: ParseDataNum = { value: numberValue ? numberValue * sign : 0 };
  if (fmt) {
    ret.formatId = fmt;
  }
  return ret;
}
