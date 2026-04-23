import { format } from '../lib/index.ts';
import { test, expect } from 'vitest';
import { assertFormat } from './utils.ts';

test('Errors', () => {
  expect.assertions(1);
  // no more than a single text section
  expect(() => format('@;@', '')).toThrow();
});

test('Repeated @ in same pattern', () => {
  expect.assertions(4);
  assertFormat('@@', 1, '1');
  assertFormat('@@', -1, '-1');
  assertFormat('@@', 0, '0');
  assertFormat('@@', 'text', 'texttext');
});

test('Text in combination with other things', () => {
  expect.assertions(8);
  assertFormat('@ "foo"', 1, '1');
  assertFormat('@ "foo"', -1, '-1');
  assertFormat('@ "foo"', 0, '0');
  assertFormat('@ "foo"', 'text', 'text foo');

  assertFormat('"bar" @ "foo"', 1, '1');
  assertFormat('"bar" @ "foo"', -1, '-1');
  assertFormat('"bar" @ "foo"', 0, '0');
  assertFormat('"bar" @ "foo"', 'text', 'bar text foo');
});
