import test from 'tape';
import fmt from '../lib';

const excelOpts = { dateSpanLarge: false, dateErrorNumber: false };

test(t => {
  t.equal(fmt('dddd, dd. mmmm yyy', excelOpts)(-1), '######');

  // // these things should throw
  t.throws(() => fmt('a;b;c;d;', excelOpts), 'a;b;c;d;');
  t.throws(() => fmt('y 0', excelOpts), 'y 0');

  // // ...but not in robust mode
  const opts = { locale: 'en', throws: false, ...excelOpts };
  const errf1 = fmt('a;b;c;d;', opts);
  t.equal(typeof errf1, 'function');
  t.equal(typeof errf1.isDate, 'function');
  t.equal(errf1.isDate(), false);
  t.equal(errf1.color(), 'black');
  t.equal(errf1.error, 'Unexpected partition');
  t.equal(errf1(1), '######');
  t.equal(fmt('y 0', opts)(1), '######');

  t.equal(fmt('dddd, dd. mmmm yyy', opts)(-1), '######');

  t.equal(fmt.format('y 0', 1, 'en', true), '######');
  t.equal(fmt.format('y 0', 1, opts), '######');

  t.end();
});
