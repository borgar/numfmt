import { daysInMonth, isValidDate } from '../isValidDate.ts';
import { parseTimeXl } from './parseTimeXl.ts';
import type { LocaleData } from '../locale.ts';
import type { ParseDataNum } from './types.ts';
import { getFormatFromId } from '../getFormatFromId.ts';

const currentYear = new Date().getUTCFullYear();

const normDateStr = (s: string) => (
  s.trim().replace(/\s+/g, ' ')
    .replace(/’/, "'")
    .replace(/\.$/, '')
    .toLowerCase()
);

const isNum = (d: string) => /^\d+$/.test(d);

const getLookups2 = (l10n: { mmm: string[], mmmm: string[], ddd: string[], dddd: string[] }) => {
  const l: Record<string, [ string, number ]> = {};
  // days
  l10n.dddd.forEach(d => {
    if (!isNum(d)) {
      const k = normDateStr(d);
      for (let j = 3; j <= k.length; j++) {
        l[k.slice(0, j)] = [ 'dddd', 0 ];
      }
    }
  });
  for (const d of l10n.ddd) {
    if (!isNum(d)) {
      const k = normDateStr(d);
      l[k] = [ 'ddd', 0 ];
    }
  }
  // months
  l10n.mmmm.forEach((d, i) => {
    if (!isNum(d)) {
      const k = normDateStr(d);
      for (let j = 3; j <= k.length; j++) {
        l[k.slice(0, j)] = [ 'mmmm', i + 1 ];
      }
    }
  });
  l10n.mmm.forEach((d, i) => {
    if (!isNum(d)) {
      const k = normDateStr(d);
      l[k] = [ 'mmm', i + 1 ];
    }
  });
  return l;
};

function toSerialDate (year: number, month: number, day: number) {
  if (isValidDate(year, month, day)) {
    let epoch = -Infinity;
    if (year < 1900) {
      return null;
    }
    else if (year <= 1900 && month <= 2) {
      epoch = 25568;
    }
    else if (year < 10000) {
      epoch = 25569;
    }
    const dateValue = (Date.UTC(year, month - 1, day) / 864e5) + epoch;
    if (dateValue >= 0 && dateValue <= 2958465) {
      return dateValue;
    }
  }
  return null;
}

const C_ZERO = 48;
const C_NINE = 57;
const C_SPACE = 32;
const C_COMMA = 44;
const C_SLASH = 47;
const T_NUM = 1;
const T_SEP = 2;
const T_ELSE = 3;
function charClass (code: number): typeof T_NUM | typeof T_SEP | typeof T_ELSE {
  if (code >= C_ZERO && code <= C_NINE) { // 0-9
    return T_NUM;
  }
  if (code === C_SPACE || code >= C_COMMA && code <= C_SLASH) { // " " | ,-/
    return T_SEP;
  }
  return T_ELSE;
}
function tokenize (value: string): string[] {
  const tokens: string[] = [];
  let last = -1;
  let currToken = '';
  for (let i = 0; i < value.length; i++) {
    const curr = value.charCodeAt(i);
    const l0 = charClass(last);
    const c0 = charClass(curr);
    if (l0 !== c0) {
      if (currToken) {
        tokens.push(currToken);
      }
      currToken = '';
    }
    currToken += value[i];
    last = curr;
  }
  if (currToken) {
    tokens.push(currToken);
  }

  return tokens;
}

const isMM = (s: string) => {
  const v = Number(s);
  return (s.length <= 2 && isFinite(v) && v > 0 && v <= 12);
};
const isDD = (s: string, month?: number, year?: number) => {
  const v = Number(s);
  return (s.length <= 2 && isFinite(v) && v > 0 && v <= daysInMonth(year ?? currentYear, month ?? 1));
};
const isYYYY = (s: string) => s.length > 3 && isFinite(Number(s));
const isYY = (s: string) => s.length <= 2 && isFinite(Number(s));

const toYY = (s: string) => {
  let v = +s;
  v += (v >= 30) ? 1900 : 2000;
  return v;
};

const DATE_FULL = 14;
const DATE_SHORT = 15;
const DATE_DM = 16;
const DATE_MY = 17;

const SEP = {
  // en-US, en-GB
  0: {
    isSep: (s: string) => s.trim() === '/' || s.trim() === '-' || s === ' ',
    isSep2: (s: string) => s.trim() === '/' || s.trim() === '-',
    isSep3: (s: string) => /^, +/.test(s),
    isSep4: (s: string) => /^,? +/.test(s)
  },
  // is-IS
  1: {
    isSep: (s: string) => s.trim() === '-' || s === ' ',
    isSep2: (s: string) => s.trim() === '-',
    isSep3: (_: string) => false,
    isSep4: (s: string) => /^, +/.test(s)
  },
  // ja-JP
  2: {
    isSep: (s: string) => s.trim() === '/' || s === ' ',
    isSep2: (_: string) => false,
    isSep3: (_: string) => false,
    isSep4: (s: string) => /^, +/.test(s)
  }
};

export function parseDateXl (value: string, l10n: LocaleData): ParseDataNum | undefined {
  const lang = getLookups2(l10n);
  const isMMM = (s: string) => !!lang[s] && lang[s][0] === 'mmm'; // normDateStr
  const isMMMM = (s: string) => !!lang[s] && lang[s][0] === 'mmmm'; // normDateStr
  const parseWord = (s: string): number => (lang[s] ? lang[s][1] : 0);
  const bits = tokenize(value.toLowerCase());

  let serialDate: number | null = null;
  let fmt: number | undefined;
  const year = currentYear;
  const day = 1;

  let timePart = '';
  if (bits.length > 5 && /^ +$/.test(bits[5])) {
    timePart = bits.slice(6).join('');
    bits.length = 5;
  }
  // console.log(bits);
  const dateOrder = l10n.format?.dateOrder ?? 0;
  const isMDY = !dateOrder;

  const { isSep, isSep2, isSep3, isSep4 } = SEP[dateOrder];

  if (bits.length === 5) {
    const [ a, b, c, d, e ] = bits;
    const [ nMon, nDay ] = isMDY ? [ a, c ] : [ c, a ];
    if ((isMMMM(a) || isMMM(a)) && isSep4(b) && isDD(c) && isSep3(d) && isYYYY(e)) {
      serialDate = toSerialDate(+e, parseWord(a), +c);
      fmt = DATE_SHORT;
    }
    else if ((isMMMM(a) || isMMM(a)) && isSep3(b) && isDD(c) && isSep3(d) && isYY(e)) {
      serialDate = toSerialDate(toYY(e), parseWord(a), +c);
      fmt = DATE_SHORT;
    }

    else if (isDD(a, parseWord(c), toYY(e)) && isSep(b) && (isMMMM(c) || isMMM(c)) && isSep(d) && isYY(e)) {
      serialDate = toSerialDate(toYY(e), parseWord(c), +a);
      fmt = DATE_SHORT;
    }
    //
    else if (isDD(a, parseWord(c), +e) && isSep(b) && (isMMMM(c) || isMMM(c)) && isSep(d) && isYYYY(e)) {
      serialDate = toSerialDate(+e, parseWord(c), +a);
      fmt = DATE_SHORT;
    }

    else if (isMM(nMon) && isSep2(b) && isDD(nDay, +nMon, +e) && isSep2(d) && isYYYY(e)) {
      serialDate = toSerialDate(+e, +nMon, +nDay);
      fmt = DATE_FULL;
    }
    else if (isMM(nMon) && isSep2(b) && isDD(nDay, +nMon, toYY(e)) && isSep2(d) && isYY(e)) {
      serialDate = toSerialDate(toYY(e), +nMon, +nDay);
      fmt = DATE_FULL;
    }

    // a leading 4-digit year is year-month-day in every locale
    else if (isYYYY(a) && isSep2(b) && isMM(c) && isSep2(d) && isDD(e, +c, +a)) {
      serialDate = toSerialDate(+a, +c, +e);
      fmt = DATE_FULL;
    }
  }
  else if (bits.length === 3) {
    const [ a, b, c ] = bits;
    const [ nMon, nDay ] = isMDY ? [ a, c ] : [ c, a ];
    // note reversed order
    if (isMMM(c) && isDD(a, parseWord(c)) && isSep(b)) {
      serialDate = toSerialDate(year, parseWord(c), +a);
      fmt = DATE_DM;
    }
    else if (isMMMM(c) && isDD(a, parseWord(c)) && isSep(b)) {
      serialDate = toSerialDate(year, parseWord(c), +a);
      fmt = DATE_DM;
    }

    // LTR down order
    else if (isMM(nMon) && isSep2(b) && isDD(nDay, +nMon)) {
      serialDate = toSerialDate(year, +nMon, +nDay);
      fmt = DATE_DM;
    }
    else if (isMM(a) && isSep2(b) && isYY(c)) {
      serialDate = toSerialDate(toYY(c), +a, day);
      fmt = DATE_MY;
    }
    else if (isMM(a) && isSep2(b) && isYYYY(c)) {
      serialDate = toSerialDate(+c, +a, day);
      fmt = DATE_MY;
    }

    else if ((isMMM(a) || isMMMM(a)) && isSep(b) && isDD(c, parseWord(a))) {
      serialDate = toSerialDate(year, parseWord(a), +c);
      fmt = DATE_DM;
    }
    else if ((isMMM(a) || isMMMM(a)) && isSep(b) && isYYYY(c)) {
      serialDate = toSerialDate(+c, parseWord(a), day);
      fmt = DATE_MY;
    }
    else if ((isMMM(a) || isMMMM(a)) && isSep(b) && isYY(c)) {
      serialDate = toSerialDate(toYY(c), parseWord(a), day);
      fmt = DATE_MY;
    }

    else if (isDD(a, parseWord(b), toYY(c)) && (isMMMM(b) || isMMM(b)) && isYY(c)) {
      serialDate = toSerialDate(toYY(c), parseWord(b), +a);
      fmt = DATE_SHORT;
    }
    else if (isDD(a, parseWord(b), +c) && (isMMMM(b) || isMMM(b)) && isYYYY(c)) {
      serialDate = toSerialDate(+c, parseWord(b), +a);
      fmt = DATE_SHORT;
    }
  }
  else if (bits.length === 2) {
    const [ a, b ] = bits;
    if ((isMMM(a) || isMMMM(a)) && isDD(b, parseWord(a))) {
      serialDate = toSerialDate(year, parseWord(a), +b);
      fmt = DATE_DM;
    }
    else if (isDD(a, parseWord(b)) && (isMMM(b) || isMMMM(b))) {
      serialDate = toSerialDate(year, parseWord(b), +a);
      fmt = DATE_DM;
    }
    else if ((isMMM(a) || isMMMM(a)) && isYYYY(b)) {
      serialDate = toSerialDate(+b, parseWord(a), 1);
      fmt = DATE_MY;
    }
    else if ((isMMM(a) || isMMMM(a)) && isYY(b)) {
      serialDate = toSerialDate(toYY(b), parseWord(a), 1);
      fmt = DATE_MY;
    }
  }

  if (serialDate != null && timePart) {
    const t = parseTimeXl(timePart, l10n);
    if (t) {
      serialDate += t.v;
      if (t.i) {
        if (fmt === DATE_FULL && (t.i === 20 || t.i === 18)) {
          fmt = 22;
        }
        else {
          fmt = t.i;
        }
      }
    }
    else {
      serialDate = null;
    }
  }

  if (serialDate != null) {
    return {
      v: serialDate,
      // z: format,
      z: fmt ? getFormatFromId(fmt, l10n) : undefined
    };
  }
}
