/* eslint-disable no-irregular-whitespace */
import test from 'tape';
import fmt from '../lib';

test('Errors', t => {
  // no more than a single text section
  t.throws(() => fmt('@;@'), '@;@');
  t.end();
});

test('Repeated @ in same pattern', t => {
  const _f = fmt('@@');
  t.equal(_f(1), '1');
  t.equal(_f(-1), '-1');
  t.equal(_f(0), '0');
  t.equal(_f('text'), 'texttext');
  t.end();
});

test('Text in combination with other things', t => {
  const _f = fmt('@ "foo"');
  t.equal(_f(1), '1');
  t.equal(_f(-1), '-1');
  t.equal(_f(0), '0');
  t.equal(_f('text'), 'text foo');
  const _f2 = fmt('"bar" @ "foo"');
  t.equal(_f2(1), '1');
  t.equal(_f2(-1), '-1');
  t.equal(_f2(0), '0');
  t.equal(_f2('text'), 'bar text foo');
  t.end();
});

