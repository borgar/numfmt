// tests converted from SSF
import test from 'tape';
import fmt from '../lib';
import fs from 'fs';
import path from 'path';

export function runTable (filename) {
  // eslint-disable-next-line
  if (process.env.SKIPTABLES) { return; }
  const tableFN = path.join(filename);

  const table = fs.readFileSync(tableFN, 'utf8')
    .replace(/\r/g, '').split('\n')
    .map(d => d.replace(/#{255}/g, '').split('\t'));

  const headers = table[0];
  const startPos = 1;
  const endPos = table.length;

  headers.slice(1).forEach((code, hi) => {
    const _f = fmt(code);
    test('Times: ' + code, t => {
      let failCount = 0;
      for (let i = startPos; i < endPos; i++) {
        const d = table[i];
        if (!d[0]) { break; }
        let res;
        try {
          res = _f(parseFloat(d[0]));
        }
        catch (err) {
          res = '#VALUE!';
        }
        const exp = d[hi + 1].replace(/ /g, ' ');
        if (res !== exp) {
          failCount++;
          t.fail(`${i - 1}: fmt('${code}', ${d[0]}) => ${res} !== ${exp}`);
        }
      }
      if (!failCount) {
        t.pass('OK');
      }
      t.end();
    });
  });
}
