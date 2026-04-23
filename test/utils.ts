import { test, expect } from 'vitest';
import { format, formatColor, getFormatDateInfo, getFormatInfo } from '../lib/index.ts';
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { fileURLToPath } from 'url';

const VALUE_ERROR = '#VALUE!';

export function getTimeZoneName () {
  const ds = new Date().toString();
  return ds.replace(/^.*GMT\+\d{4} \((.*?)\)$/, '$1');
}

export function getTimeZoneOffset (d: Date) {
  const temp = new Date();
  temp.setUTCFullYear(d.getFullYear(), d.getMonth(), d.getDate());
  temp.setUTCHours(d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds());
  return (d.valueOf() - temp.valueOf()) / 60000;
}

export function isLeapYear (year: number) {
  return !!(!(year % 4) && year % 100) || !(year % 400);
}

function formatMessage (pattern: string, value: unknown, options: object) {
  let message = '\x1b[0m' + pattern;
  const suffix = (typeof value === 'bigint') ? 'n' : '';
  message += '\x1b[36m <=> ' + String(value) + suffix;
  const o = JSON.stringify(options);
  if (o !== '{}') {
    message += '\x1b[2m\x1b[33m [ OPTIONS=' + o + ' ]';
  }
  message += '\x1b[0m';
  return message;
}

export function assertFormat (pattern: string, value: unknown, expected: string, options: object = {}) {
  expect(format(pattern, value, options), formatMessage(pattern, value, options)).toBe(expected);
}

export function assertFormatColor (
  pattern: string,
  value: unknown,
  expected: string | number | null,
  options: object = {}
) {
  expect(formatColor(pattern, value, options), formatMessage(pattern, value, options)).toBe(expected);
}

export function assertValidFormat (pattern: string, options: object = {}) {
  expect(() => format(pattern, 1, options), formatMessage(pattern, 1, options)).not.toThrow();
}

export function assertFormatInvalid (pattern: string, options: object = {}) {
  expect(() => format(pattern, '', options), formatMessage(pattern, '', options)).toThrow();
}

export function assertFormatThrows (pattern: string, value: unknown, expected?: string | RegExp, options: object = {}) {
  const matcher = expected instanceof RegExp ? expected : undefined;
  expect(() => format(pattern, value, options), formatMessage(pattern, value, options)).toThrow(matcher);
}

const commonProps = {
  isDate: false,
  isText: false,
  isPercent: false,
  maxDecimals: 0,
  grouped: 0,
  parentheses: 0,
  color: 0,
  scale: 1,
  level: 0
};

function alphabetizeProps (obj: Record<string, unknown>) {
  return Object.fromEntries(Object.keys(obj).sort().map(k => [ k, obj[k] ]));
}

export function assertInfo (fmtString: string, expectProps: object) {
  const output = { ...getFormatInfo(fmtString) };
  expect(alphabetizeProps(output as Record<string, unknown>)).toEqual(
    alphabetizeProps({ ...commonProps, ...expectProps })
  );
}

const commonDateProps = {
  year: false,
  month: false,
  day: false,
  hours: false,
  minutes: false,
  seconds: false,
  clockType: 24
};

export function assertDateInfo (fmtString: string, expectProps: object) {
  const output = getFormatDateInfo(fmtString);
  expect(alphabetizeProps(output as Record<string, unknown>)).toEqual(
    alphabetizeProps({ ...commonDateProps, ...expectProps })
  );
}

export function runTable (pathToTable: string) {
  if (process.env.SKIPTABLES) { return; }
  const filename = fileURLToPath(new URL(pathToTable, import.meta.url));
  const tableFN = path.join(filename) + '.gz';
  const table = zlib.gunzipSync(fs.readFileSync(tableFN))
    .toString('utf8')
    .replace(/\r/g, '')
    .split('\n')
    .map(d => d.replace(/#{255}/g, '').split('\t'));
  const headers = table[0];
  const startPos = 1;
  const endPos = table.length;
  headers.slice(1).forEach((code, hi) => {
    test('Pattern: ' + code, () => {
      const failures: string[] = [];
      for (let i = startPos; i < endPos; i++) {
        const d = table[i];
        if (!d[0]) { break; }
        let exp = d[hi + 1];
        if (exp === '######') {
          exp = VALUE_ERROR;
        }
        let res: string;
        try {
          res = format(code, parseFloat(d[0]), {
            dateSpanLarge: false,
            dateErrorNumber: false,
            dateErrorThrows: true
          });
        }
        catch (err) {
          res = VALUE_ERROR;
        }
        if (res !== exp) {
          failures.push(`${i - 1}: numfmt('${code}', ${d[0]}) => ${JSON.stringify(res)} !== ${JSON.stringify(exp)}`);
        }
      }
      expect(failures).toEqual([]);
    });
  });
}
