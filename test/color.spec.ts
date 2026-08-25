import test from './utils.js';

test('formatColor', t => {
  // color works the same across number sections, but not text
  t.formatColor('0', 123, null);
  t.formatColor('0', 0, null);
  t.formatColor('0', -123, null);
  t.formatColor('0', 'foo', null);
  t.formatColor('[blue]0', 123, 'blue');
  t.formatColor('[blue]0', 0, 'blue');
  t.formatColor('[blue]0', -123, 'blue');
  t.formatColor('[blue]0', 'foo', null);
  // can define separate colors per section
  t.formatColor('[blue]0;[green]-0;[magenta]0;[cyan]@', 1, 'blue');
  t.formatColor('[blue]0;[green]-0;[magenta]0;[cyan]@', -1, 'green');
  t.formatColor('[blue]0;[green]-0;[magenta]0;[cyan]@', 0, 'magenta');
  t.formatColor('[blue]0;[green]-0;[magenta]0;[cyan]@', 'foo', 'cyan');
  // color is case insensitive
  t.formatColor('[red]0', 0, 'red');
  t.formatColor('[Red]0', 0, 'red');
  t.formatColor('[RED]0', 0, 'red');
  // all known primaries work
  t.formatColor('[black]0', 0, 'black');
  t.formatColor('[blue]0', 0, 'blue');
  t.formatColor('[cyan]0', 0, 'cyan');
  t.formatColor('[green]0', 0, 'green');
  t.formatColor('[magenta]0', 0, 'magenta');
  t.formatColor('[red]0', 0, 'red');
  t.formatColor('[white]0', 0, 'white');
  t.formatColor('[yellow]0', 0, 'yellow');
  // 1-based index color resolutions
  t.formatColor('[color 0]0', 0, null);
  t.formatColor('[color 1]0', 0, '#000000');
  t.formatColor('[color 2]0', 0, '#FFFFFF');
  t.formatColor('[color3]0', 0, '#FF0000');
  // numbers are returned when indexColors is off
  t.formatColor('[color 0]0', 0, null, { indexColors: false });
  t.formatColor('[color 1]0', 0, 1, { indexColors: false });
  t.formatColor('[color 2]0', 0, 2, { indexColors: false });
  t.formatColor('[color3]0', 0, 3, { indexColors: false });
  // keywords are still returned when indexColors is off
  t.formatColor('[yellow]0', 0, 'yellow', { indexColors: false });
  t.end();
});
