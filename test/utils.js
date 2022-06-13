// tests converted from SSF
import test from 'tape';
import numfmt from '../lib/index.js';
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import { URL, fileURLToPath } from 'url';

const VALUE_ERROR = '#VALUE!';

export function runTable (pathToTable) {
  const filename = fileURLToPath(new URL(pathToTable, import.meta.url));
  // eslint-disable-next-line
  if (process.env.SKIPTABLES) { return; }
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
    const _f = numfmt(code, {
      dateSpanLarge: false,
      dateErrorNumber: false,
      dateErrorThrows: true
    });
    test('Times: ' + code, t => {
      let failCount = 0;
      for (let i = startPos; i < endPos; i++) {
        const d = table[i];
        if (!d[0]) { break; }
        let exp = d[hi + 1].replace(/ /g, ' ');
        if (exp === '######') {
          // some tables use #VALUE!, others '######'
          exp = VALUE_ERROR;
        }
        let res;
        try {
          res = _f(parseFloat(d[0]));
        }
        catch (err) {
          res = VALUE_ERROR;
        }
        if (res !== exp) {
          failCount++;
          t.fail(`${i - 1}: numfmt('${code}', ${d[0]}) => ${res} !== ${exp}`);
        }
      }
      if (!failCount) {
        t.pass('OK');
      }
      t.end();
    });
  });
}
