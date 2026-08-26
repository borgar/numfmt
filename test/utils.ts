import fs from 'node:fs';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';
import { expect, test } from 'vitest';
import { format } from '../lib/index.ts';

const VALUE_ERROR = '#VALUE!';

export function getTimeZoneName (): string {
  const ds = new Date().toString();
  return ds.replace(/^.*GMT\+\d{4} \((.*?)\)$/, '$1');
}

export function getTimeZoneOffset (d: Date): number {
  const temp = new Date();
  temp.setUTCFullYear(
    d.getFullYear(),
    d.getMonth(),
    d.getDate()
  );
  temp.setUTCHours(
    d.getHours(),
    d.getMinutes(),
    d.getSeconds(),
    d.getMilliseconds()
  );
  return (d.getTime() - temp.getTime()) / 60000;
}

export function isLeapYear (year: number): boolean {
  return !!(!(year % 4) && year % 100) || !(year % 400);
}

export function runTable (pathToTable: string): void {
  if (process.env.SKIPTABLES) {
    test.skip('Table: ' + pathToTable);
    return;
  }
  const filename = fileURLToPath(new URL(pathToTable, import.meta.url));
  const tableFN = filename + '.gz';
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
          // some tables use #VALUE!, others '######'
          exp = VALUE_ERROR;
        }
        let res;
        try {
          res = format(code, parseFloat(d[0]), {
            dateSpanLarge: false,
            dateErrorNumber: false,
            dateErrorThrows: true
          });
        }
        catch {
          res = VALUE_ERROR;
        }
        if (res !== exp) {
          failures.push(`${i - 1}: numfmt('${code}', ${d[0]}) => ${res} !== ${exp}`);
        }
      }
      expect(failures, failures.join('\n')).toEqual([]);
    });
  });
}
