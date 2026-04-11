import { expect, test } from 'vitest';
import { assertFormatColor } from './utils.ts';

test('formatColor', () => {
  expect.assertions(32);

  // color works the same across number sections, but not text
  assertFormatColor('0', 123, null);
  assertFormatColor('0', 0, null);
  assertFormatColor('0', -123, null);
  assertFormatColor('0', 'foo', null);
  assertFormatColor('[blue]0', 123, 'blue');
  assertFormatColor('[blue]0', 0, 'blue');
  assertFormatColor('[blue]0', -123, 'blue');
  assertFormatColor('[blue]0', 'foo', null);
  // can define separate colors per section
  assertFormatColor('[blue]0;[green]-0;[magenta]0;[cyan]@', 1, 'blue');
  assertFormatColor('[blue]0;[green]-0;[magenta]0;[cyan]@', -1, 'green');
  assertFormatColor('[blue]0;[green]-0;[magenta]0;[cyan]@', 0, 'magenta');
  assertFormatColor('[blue]0;[green]-0;[magenta]0;[cyan]@', 'foo', 'cyan');
  // color is case insensitive
  assertFormatColor('[red]0', 0, 'red');
  assertFormatColor('[Red]0', 0, 'red');
  assertFormatColor('[RED]0', 0, 'red');
  // all known primaries work
  assertFormatColor('[black]0', 0, 'black');
  assertFormatColor('[blue]0', 0, 'blue');
  assertFormatColor('[cyan]0', 0, 'cyan');
  assertFormatColor('[green]0', 0, 'green');
  assertFormatColor('[magenta]0', 0, 'magenta');
  assertFormatColor('[red]0', 0, 'red');
  assertFormatColor('[white]0', 0, 'white');
  assertFormatColor('[yellow]0', 0, 'yellow');
  // 1-based index color resolutions
  assertFormatColor('[color 0]0', 0, null);
  assertFormatColor('[color 1]0', 0, '#000000');
  assertFormatColor('[color 2]0', 0, '#FFFFFF');
  assertFormatColor('[color3]0', 0, '#FF0000');
  // numbers are returned when indexColors is off
  assertFormatColor('[color 0]0', 0, null, { indexColors: false });
  assertFormatColor('[color 1]0', 0, 1, { indexColors: false });
  assertFormatColor('[color 2]0', 0, 2, { indexColors: false });
  assertFormatColor('[color3]0', 0, 3, { indexColors: false });
  // keywords are still returned when indexColors is off
  assertFormatColor('[yellow]0', 0, 'yellow', { indexColors: false });
});
