/* eslint-disable no-irregular-whitespace */
import { format } from '../lib/index.js';
import test from './utils.js';

test('Errors', t => {
  // no more than a single text section
  t.throws(() => format('@;@'), '@;@');
  t.end();
});

test('Repeated @ in same pattern', t => {
  t.format('@@', 1, '1');
  t.format('@@', -1, '-1');
  t.format('@@', 0, '0');
  t.format('@@', 'text', 'texttext');
  t.end();
});

test('Text in combination with other things', t => {
  t.format('@ "foo"', 1, '1');
  t.format('@ "foo"', -1, '-1');
  t.format('@ "foo"', 0, '0');
  t.format('@ "foo"', 'text', 'text foo');

  t.format('"bar" @ "foo"', 1, '1');
  t.format('"bar" @ "foo"', -1, '-1');
  t.format('"bar" @ "foo"', 0, '0');
  t.format('"bar" @ "foo"', 'text', 'bar text foo');
  t.end();
});

