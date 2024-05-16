import test from './utils.js';
import { format, formatColor, isDateFormat } from '../lib/index.js';

const excelOpts = { dateSpanLarge: false, dateErrorNumber: false };

test('Robust mode', t => {
  t.equal(format('dddd, dd. mmmm yyy', -1, excelOpts), '######');

  // these things should throw
  t.throws(() => format('a;b;c;d;', 0, excelOpts), 'a;b;c;d;');
  t.throws(() => format('y 0', 0, excelOpts), 'y 0');

  // ...but not in robust mode
  const opts = { locale: 'en', throws: false, ...excelOpts };
  t.equal(format('a;b;c;d;', 0, opts), '######', 'format does not throw with "a;b;c;d;"');
  t.equal(format('y 0', 1, opts), '######', 'format does not throw with "y 0"');
  t.equal(format('dddd, dd. mmmm yyy', -1, opts), '######', 'format does not throw with "dddd, dd. mmmm yyy"');
  t.equal(format('y 0', 1, opts), '######', 'format does not throw with "dddd, dd. mmmm yyy"');

  t.equal(formatColor('a;b;c;d;', 0, opts), null, 'formatColor does not throw');
  t.equal(isDateFormat('a;b;c;d;', opts), false, 'isDateFormat does not throw');

  t.end();
});
