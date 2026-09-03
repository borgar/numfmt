import { parseTime } from '../index.ts';
import { isValidDate } from '../isValidDate.ts';
import { defaultLocale, getLocale } from '../locale.ts';
import type { ParseDataNum } from './types.ts';

type LData = {
  mon: [ string, number, string ][],
  mp: boolean,
  day: [ string, number, string ][],
  dp: boolean,
  locale?: string,
};

/*
This is a list of the allowed date formats. The test file contains
the full list of permuations and the resulting values and formats.

Legend:
  "-" - Date separator (any of "/" | "-" | " " | "."⁽¹⁾ | ", "⁽²⁾)
  " " - Whitespace
  "j" - Day without leading zero (1-31)
  "d" - Day with leading zero (00-31)
  "D" - Abbreviated day name ("Sun"-"Sat")
  "l" - Full day name ("Sunday"-"Saturday")
  "n" - Month without leading zero (1-12)
  "m" - Month with leading zero (01-12)
  "F" - Full month name ("January"-"December")
  "M" - Abbreviated month name ("Jan"-"Dec")
  "y" - Year without century (00-99)
  "Y" - Year of our lord (1900-9999)
  "x" - Time of day (all formats: "10 PM", "10:11:12", ...)
  "!" - Only use in "date-first" locales: 4.2.2000 = 4 feb.
  "?" - Only use in "month-first" locales: 2.4.2000 = 4 feb.

¹ Only considered valid if there are three or more sections to the date.
² Comma is only allowed if followed by a space.

Time is appended to each of these as they are inserted into the
collection of valid dates below.
*/
const okDateFormats = [
  // day-month-year
  '!d-m-y', '!d-m-Y', '!j-m-y', '!j-m-Y',
  '!d-n-y', '!d-n-Y', '!j-n-y', '!j-n-Y',
  // month-day-year
  '?m-d-y', '?m-d-Y', '?m-j-y', '?m-j-Y',
  '?n-d-y', '?n-d-Y', '?n-j-y', '?n-j-Y',
  // unab
  'd-M-y', 'd-M-Y', 'j-M-y', 'j-M-Y',
  'M-d-y', 'M-d-Y', 'M-j-y', 'M-j-Y',
  'd-F-y', 'd-F-Y', 'F-d-y', 'F-d-Y',
  'F-j-y', 'F-j-Y', 'j-F-y', 'j-F-Y',
  'y-F-d', 'y-F-j', 'y-M-d', 'y-M-j',
  'Y-F-d', 'Y-F-j', 'Y-M-d', 'Y-m-d',
  'Y-M-j', 'Y-m-j', 'Y-n-d', 'Y-n-j',
  'j-F', // 2-April
  'j-M', // 2-Apr
  'd-F', // 02-April
  'd-M', // 02-Apr
  'n-d', // 4-02
  'n-j', // 4-2
  'n-Y', // 4-1908
  'm-d', // 04-02
  'm-j', // 04-2
  'm-Y', // 04-1908
  'M-Y', // Apr-1908
  'M-y', // Apr-08
  'F-y', // April-08
  'F-Y', // April-1908
  'Y-M', // 1908-Apr
  'Y-n', // 1908-4
  'Y-m', // 1908-04
  'Y-F', // 1908-April
  'Y-M'  // 1908-Apr
];

// letter to excel
const tx0: Record<string, string> = { j: 'd', d: 'd', D: 'ddd', l: 'dddd', n: 'm', m: 'm', M: 'mmm', F: 'mmmm', y: 'yy', Y: 'yyyy' };
const tx00: Record<string, string> = { j: 'dd', d: 'dd', D: 'ddd', l: 'dddd', n: 'mm', m: 'mm', M: 'mmm', F: 'mmmm', y: 'yy', Y: 'yyyy' };

// date formats are stored as a token-tree in a trie
// for minimal looping and branching while parsing
type DateTrieNode = { $?: number } & { [token: string]: DateTrieNode };
const dateTrieDM: DateTrieNode = {};
const dateTrieMD: DateTrieNode = {};
function packDate (f: string, node: DateTrieNode, allowType = 1) {
  if (f) {
    const char = f[0];
    const next = f.slice(1);
    if (char === '!') {
      packDate(next, node, 4);
    }
    else if (char === '?') {
      packDate(next, node, 2);
    }
    else {
      node[char] = node[char] || {};
      packDate(next, node[char], allowType);
    }
  }
  else {
    node.$ = allowType;
  }
}
function addFormatToTrie (fmt: string, trie: DateTrieNode) {
  // add date to token tree
  packDate(fmt, trie);
  // add a variant of the date with time suffixed
  // Excel allows time first, but Sheets and GRID do not
  packDate(fmt + ' x', trie);
  // add a variant of the date with weekdays pre-/suffixed
  packDate(fmt + ' l', trie);
  packDate(fmt + ' l x', trie);
  packDate('l ' + fmt, trie);
  packDate('l ' + fmt + ' x', trie);
  packDate(fmt + ' D', trie);
  packDate(fmt + ' D x', trie);
  packDate('D ' + fmt, trie);
  packDate('D ' + fmt + ' x', trie);
}
okDateFormats.forEach(fmt => {
  if (!fmt.startsWith('?')) addFormatToTrie(fmt, dateTrieDM);
  if (!fmt.startsWith('!')) addFormatToTrie(fmt, dateTrieMD);
});

const currentYear = new Date().getUTCFullYear();

// should really match { ’' } and all whitespace
const matchRec = (
  str: string,
  data: [ string, number, string ][],
  skipPeriod = false
): [ string, [ string, number, string ] | null ] => {
  for (const item of data) {
    if (str.startsWith(item[0])) {
      // if the match is followed by a "." we'll skip it if the abbr. is by
      // convention abbreviated in the locale.
      let l = item[0].length;
      if (skipPeriod && (item[2] === 'D' || item[2] === 'M') && str[l] === '.') {
        l++;
      }
      return [ str.slice(0, l), item ];
    }
  }
  return [ '', null ];
};

type DtData = {
  path?: string,
  sep?: string,
  day?: string,
  tf?: string,
  _mon?: string,
  month?: number,
  year?: number,
  time?: number,
};

const nextToken = (str: string, node: DateTrieNode, data: DtData, lData: LData): DtData | undefined => {
  const path = data.path || '';
  const matchOrder = Object.keys(node);
  for (const t of matchOrder) {
    let r: DtData | undefined;
    if (!node[t]) {
      continue;
    }
    if (t === '$' || t === '€') {
      // if string is done, then we can return
      if (!str) {
        r = data;
      }
    }
    else if (t === '-') {
      const m = /^(\s*([./-]|,\s)\s*|\s+)/.exec(str);
      if (m) {
        const sep = (m[1] === '-' || m[1] === '/' || m[1] === '.') ? m[1] : ' ';
        // don't allow mixing date separators
        if (!data.sep || data.sep === sep) {
          const s = m[0].replace(/\s+/g, ' ');
          r = nextToken(str.slice(m[0].length), node[t], { ...data, sep, path: path + s }, lData);
        }
      }
    }
    else if (t === ' ') {
      const m = /^[,.]?\s+/.exec(str);
      if (m) {
        const s = m[0].replace(/\s+/g, ' ');
        r = nextToken(str.slice(m[0].length), node[t], { ...data, path: path + s }, lData);
      }
    }
    else if (t === 'j' || t === 'd') {
      const m = /^(0?[1-9]|1\d|2\d|3[01])\b/.exec(str);
      if (m) {
        r = nextToken(str.slice(m[0].length), node[t], { ...data, day: m[0], path: path + t }, lData);
      }
    }
    else if (t === 'n' || t === 'm') {
      const m = /^(0?[1-9]|1[012])\b/.exec(str);
      if (m) {
        r = nextToken(str.slice(m[0].length), node[t], { ...data, month: +m[0], _mon: m[0], path: path + t }, lData);
      }
    }
    else if (t === 'F' || t === 'M') {
      const [ m, match ] = matchRec(str, lData.mon, lData.mp);
      if (match?.[2] === t) {
        r = nextToken(str.slice(m.length), node[t],
          { ...data, month: match[1], _mon: m, path: path + t }, lData);
      }
    }
    else if (t === 'l' || t === 'D') {
      const [ m, match ] = matchRec(str, lData.day, lData.dp);
      if (match?.[2] === t) {
        // the value is ignored
        r = nextToken(str.slice(m.length), node[t], { ...data, path: path + t }, lData);
      }
    }
    else if (t === 'y') {
      const m = /^\d\d\b/.exec(str);
      if (m) {
        const y = (+m[0] >= 30) ? +m[0] + 1900 : +m[0] + 2000;
        r = nextToken(str.slice(m[0].length), node[t], { ...data, year: y, path: path + t }, lData);
      }
    }
    else if (t === 'Y') {
      const m = /^\d\d\d\d\b/.exec(str);
      if (m) {
        r = nextToken(str.slice(m[0].length), node[t], { ...data, year: +m[0], path: path + t }, lData);
      }
    }
    else if (t === 'x') {
      const time = parseTime(str, { locale: lData.locale });
      if (time) {
        r = nextToken('', node[t], { ...data, time: time.v, tf: time.z, path: path + t }, lData);
      }
    }
    else {
      throw new Error(`Unknown date token "${t}"`);
    }
    if (r) {
      // reject invalid dates so we continue traversing the tree
      if (isValidDate(data.year || 1916, data.month || 1, data.day ? +data.day : 1)) {
        return r;
      }
    }
  }
};

const normDateStr = (s: string): string => (
  s.replace(/\s+/g, ' ').trim()
    .replace(/’/, "'")
    .replace(/\.$/, '')
    .toLowerCase()
);

const getLookups = (arr: string[], sym: string) => {
  const s: [ string, number, string ][] = arr.map((d, i) => [ normDateStr(d), i + 1, sym ]);
  s.sort((a, b) => b[0].length - a[0].length);
  return s;
};

/**
 * Parse a date or datetime string input and return its value and format. If
 * the input was not recognized or valid, the function returns an `undefined`, for
 * valid input it returns an object with two properties:
 *
 * - `v`: the parsed value.
 * - `z`: the number format of the input (if applicable).
 *
 * @param value The string to parse
 * @param [options={}]  Options for the parser
 * @param [options.locale=""]
 *    A BCP 47 string tag. Locale default is english with a `\u00a0`
 *    grouping symbol (see [addLocale](#addLocale))
 * @returns An object of the parsed value and a corresponding format string
 */
export function parseDate (value: string, options: { locale?: string; } = {}): ParseDataNum | undefined {
  const l10n = getLocale(options.locale || '') || defaultLocale;
  const lData: LData = {
    mon: getLookups(l10n.mmmm, 'F').concat(getLookups(l10n.mmm, 'M')),
    mp: l10n.mmm[0].at(-1) === '.',
    day: getLookups(l10n.dddd, 'l').concat(getLookups(l10n.ddd, 'D')),
    dp: l10n.ddd[0].at(-1) === '.',
    locale: options.locale
  };
  // possible shortcut: quickly dismiss if there isn't a number?
  const date = nextToken(
    normDateStr(value),
    l10n.preferMDY ? dateTrieMD : dateTrieDM,
    { path: '' },
    lData
  );
  if (date) {
    // disallow matches where two tokens are separated by a period
    if (date.sep === '.' && date.path?.length === 3) {
      return undefined;
    }
    const year = +(date.year ?? currentYear);
    if (!date.day) {
      date.day = '1';
    }
    let epoch = -Infinity;
    if (year < 1900) {
      return undefined;
    }
    else if (year <= 1900 && (date.month ?? 0) <= 2) {
      epoch = 25568;
    }
    else if (year < 10000) {
      epoch = 25569;
    }
    const dateValue = (Date.UTC(year, (date.month ?? 1) - 1, +date.day) / 864e5) + epoch + (date.time || 0);
    if (dateValue >= 0 && dateValue <= 2958465) {
      const lead0 = (
        // either has a leading zero
        ((date._mon?.startsWith('0')) || date.day?.startsWith('0')) ||
        // both are 2-digits long
        (date._mon?.length === 2 && date.day.length === 2)
      );
      const format = (date.path ?? '').replace(/[jdlDnmMFyYx]/g, (a: string) => {
        if (a === 'x') {
          return date.tf || '';
        }
        return (lead0 ? tx00[a] : tx0[a]) || a;
      });
      return { v: dateValue, z: format };
    }
  }
  return undefined;
}
