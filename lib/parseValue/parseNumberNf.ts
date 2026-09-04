import { currencySymbols, reCurrencySymbols } from '../constants.ts';
import type { LocaleData } from '../locale.ts';
import type { ParseDataNum } from './types.ts';

const PT = '.';
const CM = ',';
const SP = ' ';
const NS = ' ';
const NN = ' ';
const AP = "'";
const AG = '٬';
const dec2group: Record<string, [ string, string, string, string, string ]> = {
  '.': [ CM, NS, NN, AP, AG ],
  ',': [ PT, NS, NN, AP, AG ],
  '٫': [ PT, NS, NN, AP, AG ]
};
const isDigit = (d: string) => d?.length === 1 && d >= '0' && d <= '9';

export function parseNumberNf (value: string, l10n: LocaleData): ParseDataNum | undefined {
  // we base everything on the decimal separator
  const dec = l10n.decimal;
  // base allowed grouping chars on decimal
  const grp = [ ...(dec2group[dec] || [ AP, AG ]) ];
  if (!grp.includes(l10n.group) && l10n.group !== SP && l10n.group !== dec) {
    grp.push(l10n.group);
  }
  let num = '';
  let exp = '';
  let sign = 1;
  let format = '';
  let minus = false;
  let openParen = false;
  let closeParen = false;
  let percent = false;
  let currency = false;
  let currencySymbol = null;
  let currencyTrailing = false;
  let i = 0;
  // prefix
  const prefixChars = [ SP, NS, NN, '+', '%', '(', '-' ].concat(currencySymbols);
  while (prefixChars.includes(value[i])) {
    const char = value[i];
    if (char === '-') {
      if (minus || openParen) {
        return undefined;
      }
      minus = true;
      sign = -1;
    }
    else if (reCurrencySymbols.test(char)) {
      if (currency) {
        return undefined;
      }
      currency = true;
      currencySymbol = char;
    }
    else if (char === '(') {
      if (openParen || minus) {
        return undefined;
      }
      openParen = true;
      sign = -1;
    }
    else if (char === '%') {
      if (percent) {
        return undefined;
      }
      percent = true;
    }
    i++;
  }
  // number
  let haveDecimal = false;
  let g;
  if (value[i] === dec || isDigit(value[i])) {
    while (i < value.length) {
      const ch = value[i];
      // can maybe allow space as the grouping operator if we find that it is
      // immediately followed by a digit or decimal?
      if (!g && grp.includes(ch)) {
        g = ch;
        // skip
      }
      else if (g && g === ch) {
        // skip
      }
      else if (ch === dec) {
        if (haveDecimal) {
          break;
        }
        num += '.';
        haveDecimal = true;
      }
      else if (isDigit(ch)) {
        num += ch;
      }
      else {
        break;
      }
      i++;
    }
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
      return undefined;
    }
  }
  // suffix
  const suffixChars = [ SP, NS, NN, '%', '$', ')' ].concat(currencySymbols);
  while (suffixChars.includes(value[i])) {
    const char = value[i];
    // only 1 occurance of these is allowed
    if (reCurrencySymbols.test(char)) {
      if (currency) {
        return undefined;
      }
      currency = true;
      currencySymbol = char;
      currencyTrailing = true;
    }
    else if (char === ')') {
      if (closeParen || !openParen) {
        return undefined;
      }
      closeParen = true;
    }
    else if (char === '%') {
      if (percent) {
        return undefined;
      }
      percent = true;
    }
    i++;
  }

  if (i !== value.length) {
    return undefined;
  }

  // is number ok?
  let numberValue = parseFloat(num + exp);
  if (!isFinite(numberValue)) {
    return undefined;
  }

  if (exp) {
    if (percent || currency) {
      return undefined;
    }
    // allow parens and minus, but not %$
    format = '0.00E+00';
  }
  else if (percent) {
    if (currency) {
      // Sheets allows this: $123% => $1.23 (Excel does not)
      return undefined;
    }
    // numpart dictates how "deep" the format is: "0" vs "0.00"
    format = num.includes('.')
      ? '0.00%'
      : '0%';
    numberValue *= 0.01;
  }
  else if (currency) {
    // numpart dictates how "deep" the format is: "0" vs "0.00"
    const currencyFormat = num.includes('.')
      ? '#,##0.00'
      : '#,##0';
    if (currencyTrailing) {
      format = currencyFormat + currencySymbol;
    }
    else {
      format = currencySymbol + currencyFormat;
    }
  }
  else if (g) {
    format = num.includes('.')
      ? '#,##0.00'
      : '#,##0';
  }
  // we may want to lower the fidelity of the number: +num.toFixed(13)
  const ret: ParseDataNum = { v: numberValue * sign };
  if (format) {
    ret.z = format;
  }
  return ret;
}
