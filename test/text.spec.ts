import { expect, test } from 'vitest';
import { format } from '../lib/index.ts';

test('Errors', () => {
  // no more than a single text section
  expect(() => format('@;@'), '@;@').toThrow();
});

test('Repeated @ in same pattern', () => {
  expect(format('@@', 1)).toBe('1');
  expect(format('@@', -1)).toBe('-1');
  expect(format('@@', 0)).toBe('0');
  expect(format('@@', 'text')).toBe('texttext');
});

test('Text in combination with other things', () => {
  expect(format('@ "foo"', 1)).toBe('1');
  expect(format('@ "foo"', -1)).toBe('-1');
  expect(format('@ "foo"', 0)).toBe('0');
  expect(format('@ "foo"', 'text')).toBe('text foo');

  expect(format('"bar" @ "foo"', 1)).toBe('1');
  expect(format('"bar" @ "foo"', -1)).toBe('-1');
  expect(format('"bar" @ "foo"', 0)).toBe('0');
  expect(format('"bar" @ "foo"', 'text')).toBe('bar text foo');
});
