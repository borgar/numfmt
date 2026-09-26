import { describe, expect, test } from 'vitest';
import { format } from '../lib/index.ts';

// Expected values are TEXT(value, pattern) in Excel for Mac 16.114 on an en-US system,
// the locale coming from the pattern's [$-xxx] tag.
const date = 45296; // 2024-01-05

describe('format with a locale tag matches Excel', () => {
  test('French abbreviations keep their period', () => {
    expect(format('[$-40C]d/mmm/yyyy', date)).toBe('5/janv./2024');
    expect(format('[$-140C]dddd ddd mmmm yyyy', date)).toBe('vendredi ven. janvier 2024');
  });

  test('Tamil and Marathi AM/PM stay AM/PM', () => {
    expect(format('[$-449]hh:mm:ss AM/PM', 0)).toBe('12:00:00 AM');
    expect(format('[$-44E]hh:mm:ss AM/PM', 0)).toBe('12:00:00 AM');
  });

  test('booleans are not translated under a Swedish tag', () => {
    for (const pattern of [
      '[$-41D]General',
      '[$-41D]0',
      '[$-41D]0.00',
      '[$-41D]@',
      '[$-41D]0;-0;0;@',
      '[$-41D]d mmmm yyyy'
    ]) {
      expect(format(pattern, true), pattern).toBe('TRUE');
      expect(format(pattern, false), pattern).toBe('FALSE');
    }
    expect(format('[$-41D]"x"@', true)).toBe('xTRUE');
    expect(format('[$-41D]"x"@', false)).toBe('xFALSE');
  });

  test('Vietnamese, Armenian and Hindi', () => {
    expect(format('[$-101042A]d mmmm yyyy', date)).toBe('5 Tháng 1 2024');
    expect(format('[$-42B]dddd, d mmmm yyyy', date)).toBe('Ուրբաթ, 5 հունվար 2024');
    expect(format('[$-4000439]h:mm:ss AM/PM', 0)).toBe('१२:००:०० पू');
  });
});
