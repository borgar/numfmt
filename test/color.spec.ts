import { expect, test } from 'vitest';
import { formatColor } from '../lib/index.ts';

test('formatColor', () => {
  // color works the same across number sections, but not text
  expect(formatColor('0', 123)).toBe(null);
  expect(formatColor('0', 0)).toBe(null);
  expect(formatColor('0', -123)).toBe(null);
  expect(formatColor('0', 'foo')).toBe(null);
  expect(formatColor('[blue]0', 123)).toBe('blue');
  expect(formatColor('[blue]0', 0)).toBe('blue');
  expect(formatColor('[blue]0', -123)).toBe('blue');
  expect(formatColor('[blue]0', 'foo')).toBe(null);
  // can define separate colors per section
  expect(formatColor('[blue]0;[green]-0;[magenta]0;[cyan]@', 1)).toBe('blue');
  expect(formatColor('[blue]0;[green]-0;[magenta]0;[cyan]@', -1)).toBe('green');
  expect(formatColor('[blue]0;[green]-0;[magenta]0;[cyan]@', 0)).toBe('magenta');
  expect(formatColor('[blue]0;[green]-0;[magenta]0;[cyan]@', 'foo')).toBe('cyan');
  // color is case insensitive
  expect(formatColor('[red]0', 0)).toBe('red');
  expect(formatColor('[Red]0', 0)).toBe('red');
  expect(formatColor('[RED]0', 0)).toBe('red');
  // all known primaries work
  expect(formatColor('[black]0', 0)).toBe('black');
  expect(formatColor('[blue]0', 0)).toBe('blue');
  expect(formatColor('[cyan]0', 0)).toBe('cyan');
  expect(formatColor('[green]0', 0)).toBe('green');
  expect(formatColor('[magenta]0', 0)).toBe('magenta');
  expect(formatColor('[red]0', 0)).toBe('red');
  expect(formatColor('[white]0', 0)).toBe('white');
  expect(formatColor('[yellow]0', 0)).toBe('yellow');
  // 1-based index color resolutions
  expect(formatColor('[color 0]0', 0)).toBe(null);
  expect(formatColor('[color 1]0', 0)).toBe('#000000');
  expect(formatColor('[color 2]0', 0)).toBe('#FFFFFF');
  expect(formatColor('[color3]0', 0)).toBe('#FF0000');
  // numbers are returned when indexColors is off
  expect(formatColor('[color 0]0', 0, { indexColors: false })).toBe(null);
  expect(formatColor('[color 1]0', 0, { indexColors: false })).toBe(1);
  expect(formatColor('[color 2]0', 0, { indexColors: false })).toBe(2);
  expect(formatColor('[color3]0', 0, { indexColors: false })).toBe(3);
  // keywords are still returned when indexColors is off
  expect(formatColor('[yellow]0', 0, { indexColors: false })).toBe('yellow');
});
