import { expect, test } from 'vitest';
import { MAX_CACHED_PATTERNS, prepareFormatterData } from '../lib/prepareFormatterData.ts';

test('Parsed patterns are cached', () => {
  const pattern = '0.00 "cached"';
  expect(prepareFormatterData(pattern)).toBe(prepareFormatterData(pattern));
});

test('The pattern cache drops the oldest pattern when full', () => {
  const first = prepareFormatterData('0.00 "first"');
  for (let i = 0; i < MAX_CACHED_PATTERNS; i++) {
    prepareFormatterData(`0.00 "p${i}"`);
  }
  const last = prepareFormatterData(`0.00 "p${MAX_CACHED_PATTERNS - 1}"`);
  expect(prepareFormatterData(`0.00 "p${MAX_CACHED_PATTERNS - 1}"`)).toBe(last);
  expect(prepareFormatterData('0.00 "first"')).not.toBe(first);
  expect(prepareFormatterData('0.00 "first"')).toEqual(first);
});
