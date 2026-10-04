import { getLocale, type LocaleData, type LocalFormat } from './locale.ts';

function getFx (params: LocalFormat, symbol: string) {
  if (!symbol) {
    return [ '', '' ];
  }
  const qt = /[a-z.]/i.test(symbol);
  const x = qt ? `"${symbol}"` : symbol;
  if (params.currencyPos === 1) {
    return [ '', x ];
  }
  else if (params.currencyPos === 2) {
    return [ x + ' ', '' ];
  }
  else if (params.currencyPos === 3) {
    return [ '', ' ' + x ];
  }
  return [ x, '' ];
}

function getNum (params: LocalFormat, color: boolean, frac: boolean, cur = '$') {
  const { sign, minus } = params;
  const red = color ? '[Red]' : '';
  const dec = frac ? '.00' : '';
  const c = getFx(params, cur);
  const s = sign ? [ '', '-' ] : [ '-', '' ];
  return !minus
    ? `${c[0]}#,##0${dec}${c[1]}_);${red}(${c[0]}#,##0${dec}${c[1]})`
    : `${c[0]}#,##0${dec}${c[1]};${red}${s[0]}${c[0]}${s[1]}#,##0${dec}${c[1]}`;
}

function getNum2 (params: LocalFormat, frac: boolean, cur = '$') {
  const { sign, minus } = params;
  const dec = frac ? '.00' : '';
  const c = getFx(params, cur);
  if (!minus) {
    if (sign) {
      return (
        `_ ${c[0]}* #,##0${dec}_)${c[1]}_ ;` +
        `_ ${c[0]}* (#,##0${dec})${c[1]}_ ;` +
        `_ ${c[0]}* "-"${frac ? '??' : ''}_)${c[1]}_ ;` +
        '_ @_ '
      );
    }
    return (
      `_(${c[0]}* #,##0${dec}${c[1]}_);` +
      `_(${c[0]}* (#,##0${dec}${c[1]});` +
      `_(${c[0]}* "-"${frac ? '??' : ''}${c[1]}_);` +
      '_(@_)'
    );
  }
  if (sign) {
    return (
      `_ ${c[0]}* #,##0${dec}${c[1]}_ ;` +
      `_ ${c[0]}* -#,##0${dec}${c[1]}_ ;` +
      `_ ${c[0]}* "-"${frac ? '??' : ''}${c[1]}_ ;` +
      '_ @_ '
    );
  }
  return (
    `_-${c[0]}* #,##0${dec}${c[1]}_-;` +
     `-${c[0]}* #,##0${dec}${c[1]}_-;` +
    `_-${c[0]}* "-"${frac ? '??' : ''}${c[1]}_-;` +
    '_-@_-'
  );
}

function getPer (params: LocalFormat, frac: boolean) {
  return `0${frac ? '.00' : ''}${params.spacePercent ? ' ' : ''}%`;
}

function getDate (params: LocalFormat) {
  const s = params.dateSep ?? '/';
  const d = params.padDd ? 'dd' : 'd';
  const m = params.padMm ? 'mm' : 'm';
  const y = params.shortYear ? 'yy' : 'yyyy';
  if (params.dateOrder === 2) {
    return `${y}${s}${m}${s}${d}`;
  }
  if (params.dateOrder === 1) {
    return `${d}${s}${m}${s}${y}`;
  }
  return `${m}${s}${d}${s}${y}`;
}

function getDate2 (params: LocalFormat, dx: boolean, yx: boolean) {
  const parts = [
    dx ? (params.padDd ? 'dd' : 'd') : '',
    dx ? params.shortDateSep ?? '-' : '',
    'mmm',
    yx ? (params.shortDateSep === '. ' ? ' ' : params.shortDateSep) ?? '-' : '',
    yx ? 'yy' : ''
  ];
  return parts.filter(Boolean).join('');
}

function getTime (params: LocalFormat, sec = false, ampm = false) {
  const am = ampm ? ' AM/PM' : '';
  const s = params.timeSep ?? ':';
  return `${params.padHh ? 'hh' : 'h'}${s}mm${sec ? s + 'ss' : ''}${am}`;
}

function getTime2 (params: LocalFormat, sec = false, ampm = false) {
  const am = ampm ? ' AM/PM' : '';
  const s = params.timeSep ?? ':';
  return `${params.padHhAlt ? 'hh' : 'h'}${s}mm${sec ? s + 'ss' : ''}${am}`;
}

/**
 * Return the correct format for a given built-in ID in a locale.
 *
 * @param fmtId The format ID
 * @param l10n The locale to use as either a BCP 47 string tag of the locale, an Excel locale code, or a locale data record.
 * @returns The format pattern
 */
export function getFormatFromId (fmtId: number, l10n?: LocaleData | string | number) {
  if (typeof l10n === 'string' || typeof l10n === 'number') {
    l10n = getLocale(l10n);
  }
  const currency = l10n?.currency || '$';
  const params = l10n?.format || {};

  // ID numbers go: 0,1,2,3...56,57,58,1,2,3,4
  fmtId = fmtId > 0 ? 1 + ((fmtId - 1) % 58) : 0;

  switch (fmtId) {
    case 0: return 'General'; // General
    case 1: return '0'; // NoComFixed0
    case 2: return '0.00'; // NoComFixed
    case 3: return '#,##0'; // Fixed0
    case 4: return '#,##0.00'; // Fixed

    case 5: return getNum(params, false, false, currency); // Currency
    case 6: return getNum(params, true, false, currency); // CoCurrency
    case 7: return getNum(params, false, true, currency); // CurrencyDec
    case 8: return getNum(params, true, true, currency); // CoCurrencyDec

    case 9: return getPer(params, false); // Pct0
    case 10: return getPer(params, true); // Pct

    case 11: return '0.00E+00'; // Exp

    case 12: return '# ?/?'; // Fract
    case 13: return '# ??/??'; // FractBond

    case 14: return getDate(params); // MMDDYY
    case 15: return getDate2(params, true, true); // DDMMMYY
    case 16: return getDate2(params, true, false); // DDMMM
    case 17: return getDate2(params, false, true); // MMMYY

    case 18: return getTime2(params, false, true); // HHMMAP
    case 19: return getTime2(params, true, true); // HHMMSSAP
    case 20: return getTime(params); // HHMM
    case 21: return getTime(params, true); // HHMMSS

    case 22: return getDate(params) + ' ' + getTime(params); // MDYHMS

    case 27: case 28: case 29: case 30: case 31:
      return getDate(params);

    case 32: case 33: case 34: case 35:
      return getTime(params, true);

    case 36: return getDate(params);

    case 37: return getNum(params, false, false, ''); // Currency2
    case 38: return getNum(params, true, false, ''); // CoCurrency2
    case 39: return getNum(params, false, true, ''); // CurrencyDec2
    case 40: return getNum(params, true, true, ''); // CoCurrencyDec2

    case 41: return getNum2(params, false, ''); // Acct
    case 42: return getNum2(params, false, currency); // AcctCur
    case 43: return getNum2(params, true, ''); // AcctDec
    case 44: return getNum2(params, true, currency); // AcctDecCur

    case 45: return `mm${params.timeSep ?? ':'}ss`; // MMSS
    case 46: return `[h]${params.timeSep ?? ':'}mm${params.timeSep ?? ':'}ss`; // AbsHMMSS
    case 47: return `mm${params.timeSep ?? ':'}ss.0`; // SS0
    case 48: return '##0.0E+0'; // Eng

    case 49: return '@'; // Text

    case 50: case 51: case 52: case 53: case 54: case 55: case 56: case 57: case 58:
      return getDate(params);
  }
  return 'General';
}
