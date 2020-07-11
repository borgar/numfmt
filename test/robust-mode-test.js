import test from 'tape';
import fmt from '../lib';

test(t => {

  t.equal(fmt('dddd, dd. mmmm yyy')(-1), '#VALUE!');

  // these things should throw
  t.throws(() => fmt('a;b;c;d;'), 'a;b;c;d;');
  t.throws(() => fmt('y 0'), 'y 0');

  // ...but not in robust mode
  const errf1 = fmt('a;b;c;d;', 'en', true);
  t.equal(typeof errf1, 'function');
  t.equal(typeof errf1.isDate, 'function');
  t.equal(errf1.isDate(), false);
  t.equal(errf1.color(), 'black');
  t.equal(errf1.error, 'Unexpected partition');
  t.equal(errf1(1), '######');
  t.equal(fmt('y 0', 'en', true)(1), '######');
  t.equal(fmt('dddd, dd. mmmm yyy', 'en', true)(-1), '#VALUE!');

  t.equal(fmt.format('y 0', 1, 'en', true), '######');
  t.equal(fmt.format('dddd, dd. mmmm yyy', -1, 'en', true), '#VALUE!');

  t.end();
});

