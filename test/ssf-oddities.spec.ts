// Tests originally converted from SSF but have been reviewed
// and corrected and conformed to Excel for Mac version 16.35
import { expect, test } from 'vitest';
import { format } from '../lib/index.ts';

test('Oddity: "foo";"bar";"baz";"qux"', () => {
  expect(format('"foo";"bar";"baz";"qux"', 1)).toBe('foo');
  expect(format('"foo";"bar";"baz";"qux"', -1)).toBe('bar');
  expect(format('"foo";"bar";"baz";"qux"', 0)).toBe('baz');
  expect(format('"foo";"bar";"baz";"qux"', 'text')).toBe('qux');
});

test('Oddity: "foo";"bar";"baz"', () => {
  expect(format('"foo";"bar";"baz"', 1)).toBe('foo');
  expect(format('"foo";"bar";"baz"', -1)).toBe('bar');
  expect(format('"foo";"bar";"baz"', 0)).toBe('baz');
  expect(format('"foo";"bar";"baz"', 'text')).toBe('text');
});

test('Oddity: "foo";"bar";@', () => {
  expect(format('"foo";"bar";@', 1)).toBe('foo');
  expect(format('"foo";"bar";@', -1)).toBe('bar');
  expect(format('"foo";"bar";@', 0)).toBe('foo');
  expect(format('"foo";"bar";@', 'text')).toBe('text');
});

test('Oddity: "foo";"bar"', () => {
  expect(format('"foo";"bar"', 1)).toBe('foo');
  expect(format('"foo";"bar"', -1)).toBe('bar');
  expect(format('"foo";"bar"', 0)).toBe('foo');
  expect(format('"foo";"bar"', 'text')).toBe('text');
});

test('Oddity: @@', () => {
  expect(format('@@', 1)).toBe('1');
  expect(format('@@', -1)).toBe('-1');
  expect(format('@@', 0)).toBe('0');
  expect(format('@@', 'text')).toBe('texttext');
});

test('Oddity: [Blue]General', () => {
  expect(format('[Blue]General', 1)).toBe('1');
  expect(format('[Blue]General', -1)).toBe('-1');
  expect(format('[Blue]General', 0)).toBe('0');
  expect(format('[Blue]General', 'text')).toBe('text');
});

test('Oddity: [Blue]G3neral', () => {
  expect(() => format('[Blue]G3neral', '')).toThrow();
});

test('Oddity: A"TODO"', () => {
  expect(format('A"TODO"', 1)).toBe('ATODO');
  expect(format('A"TODO"', -1)).toBe('-ATODO');
  expect(format('A"TODO"', 0)).toBe('ATODO');
  expect(format('A"TODO"', 'text')).toBe('text');
});

test('Oddity: r', () => {
  expect(format('r', 1)).toBe('r');
  expect(format('r', -1)).toBe('-r');
  expect(format('r', 0)).toBe('r');
  expect(format('r', 'text')).toBe('text');
});

test('Oddity: ((;@', () => {
  expect(format('((;@', 1)).toBe('((');
  expect(format('((;@', 0)).toBe('((');
  expect(format('((;@', 'text')).toBe('text');
});

test('Oddity: \\r', () => {
  expect(format('\\r', 1)).toBe('r');
  expect(format('\\r', -1)).toBe('-r');
  expect(format('\\r', 0)).toBe('r');
  expect(format('\\r', 'text')).toBe('text');
});

test('Oddity: _($* #,##0_);_($* (#,##0);_($* "-"_);_(@_)', () => {
  expect(format('_($* #,##0_);_($* (#,##0);_($* "-"_);_(@_)', (1))).toBe(' $1 ');
  expect(format('_($* #,##0_);_($* (#,##0);_($* "-"_);_(@_)', (-1))).toBe(' $(1)');
  expect(format('_($* #,##0_);_($* (#,##0);_($* "-"_);_(@_)', (0))).toBe(' $- ');
  expect(format('_($* #,##0_);_($* (#,##0);_($* "-"_);_(@_)', ('text'))).toBe(' text ');
  // expect(format('_($* #,##0_);_($* (#,##0);_($* "-"_);_(@_)', (null))).toBe(' $- ');
  // expect(format('_($* #,##0_);_($* (#,##0);_($* "-"_);_(@_)', (''))).toBe('');
});

test('Oddity: #0.#', () => {
  expect(format('#0.#', 0)).toBe('0.');
  expect(format('#0.#', 1)).toBe('1.');
  expect(format('#0.#', 12)).toBe('12.');
  expect(format('#0.#', 12.34)).toBe('12.3');
  expect(format('#0.#', -1.23)).toBe('-1.2');
});

test('Oddity: #,##0.0', () => {
  expect(format('#,##0.0', 1)).toBe('1.0');
  expect(format('#,##0.0', -1)).toBe('-1.0');
  expect(format('#,##0.0', 0)).toBe('0.0');
  expect(format('#,##0.0', 'text')).toBe('text');
});

test('Oddity: #,##0.00', () => {
  expect(format('#,##0.00', 1)).toBe('1.00');
  expect(format('#,##0.00', -1)).toBe('-1.00');
  expect(format('#,##0.00', 0)).toBe('0.00');
  expect(format('#,##0.00', 'text')).toBe('text');
});

test('Oddity: #,##0.000', () => {
  expect(format('#,##0.000', 1)).toBe('1.000');
  expect(format('#,##0.000', -1)).toBe('-1.000');
  expect(format('#,##0.000', 0)).toBe('0.000');
  expect(format('#,##0.000', 'text')).toBe('text');
});

test('Oddity: #,##0.0000', () => {
  expect(format('#,##0.0000', 1)).toBe('1.0000');
  expect(format('#,##0.0000', -1)).toBe('-1.0000');
  expect(format('#,##0.0000', 0)).toBe('0.0000');
  expect(format('#,##0.0000', 'text')).toBe('text');
});

test('Oddity: #,##0.00000', () => {
  expect(format('#,##0.00000', 1000000)).toBe('1,000,000.00000');
});

test('Oddity: #,##0.000000', () => {
  expect(format('#,##0.000000', 1000000)).toBe('1,000,000.000000');
});

test('Oddity: #,##0.0000000', () => {
  expect(format('#,##0.0000000', 1000000)).toBe('1,000,000.0000000');
});

test('Oddity: #,##0.00000000', () => {
  expect(format('#,##0.00000000', 1000000)).toBe('1,000,000.00000000');
});

test('Oddity: #,##0.000000000', () => {
  expect(format('#,##0.000000000', 1000000)).toBe('1,000,000.000000000');
});

test('Oddity: #,###', () => {
  expect(format('#,###', 1)).toBe('1');
  expect(format('#,###', -1)).toBe('-1');
  expect(format('#,###', 0)).toBe('');
  expect(format('#,###', 12345.6789)).toBe('12,346');
  expect(format('#,###', 'TODO')).toBe('TODO');
});

test('Oddity: #.##', () => {
  expect(format('#.##', 1)).toBe('1.');
  expect(format('#.##', -1)).toBe('-1.');
  expect(format('#.##', 0)).toBe('.');
  expect(format('#.##', 'text')).toBe('text');
});

test('Oddity: 0;0', () => {
  expect(format('0;0', 1.1)).toBe('1');
  expect(format('0;0', -1.1)).toBe('1');
  expect(format('0;0', 0)).toBe('0');
  expect(format('0;0', 'text')).toBe('text');
});

test('Oddity: 0.0', () => {
  expect(format('0.0', 1)).toBe('1.0');
  expect(format('0.0', -1)).toBe('-1.0');
  expect(format('0.0', 0)).toBe('0.0');
  expect(format('0.0', 'text')).toBe('text');
});

test('Oddity: 0.00', () => {
  expect(format('0.00', 1.0001)).toBe('1.00');
  expect(format('0.00', -1)).toBe('-1.00');
  expect(format('0.00', 0)).toBe('0.00');
  expect(format('0.00', 'text')).toBe('text');
});

test('Oddity: 0.000', () => {
  expect(format('0.000', 1)).toBe('1.000');
  expect(format('0.000', -1)).toBe('-1.000');
  expect(format('0.000', 0)).toBe('0.000');
  expect(format('0.000', 'text')).toBe('text');
});

test('Oddity: 0.0000', () => {
  expect(format('0.0000', 1)).toBe('1.0000');
  expect(format('0.0000', -1)).toBe('-1.0000');
  expect(format('0.0000', 0)).toBe('0.0000');
  expect(format('0.0000', 'text')).toBe('text');
});

test('Oddity: hh:mm AM/PM', () => {
  expect(format('hh:mm AM/PM', 0.7)).toBe('04:48 PM');
});

test('Oddity: hhh:mm AM/PM', () => {
  expect(format('hhh:mm AM/PM', 0.7)).toBe('04:48 PM');
});

test('Oddity: hhh:mmm:sss', () => {
  expect(format('hhh:mmm:sss', 0.7)).toBe('16:Jan:00');
});

test('Oddity: hh:mmm:sss', () => {
  expect(format('hhh:mmm:sss', 0.7)).toBe('16:Jan:00');
});

test('Oddity: hh:mm:sss', () => {
  expect(format('hh:mm:sss', 0.7)).toBe('16:48:00');
});

test('Oddity: hh:mm:ss.000', () => {
  expect(format('hh:mm:ss.000', 0.7)).toBe('16:48:00.000');
  expect(format('hh:mm:ss.000', 0.70707)).toBe('16:58:10.848');
});

test('Oddity: hh.000', () => {
  expect(format('hh.000', 0.70707)).toBe('16.848');
});

test('Oddity: hh .00', () => {
  expect(format('hh .00', 0.70707)).toBe('16 .85');
});

test('Oddity: hh  .0', () => {
  expect(format('hh  .0', 0.70707)).toBe('16  .8');
});

test('Oddity: hh .00 .000', () => {
  expect(format('hh .00 .000', 0.70707)).toBe('16 .84 .848');
});

test('Oddity: [hhh]', () => {
  expect(format('[hhh]', 1)).toBe('024');
  expect(format('[hhh]', -1)).toBe('-024');
  expect(format('[hhh]', 0)).toBe('000');
  expect(format('[hhh]', 'text')).toBe('text');
});

test('Oddity: [', () => {
  expect(() => format('[', 0), '[').toThrow();
});

test('Oddity: A/P', () => {
  expect(format('A/P', 0.7)).toBe('P');
});

test('Oddity: e', () => {
  expect(format('e', 0.7)).toBe('1900');
});

test('Oddity: 123', () => {
  expect(format('123', 0.7)).toBe('123');
  expect(format('123', 0)).toBe('123');
  expect(format('123', 'text')).toBe('text');
});

test('Oddity: 0.##', () => {
  expect(format('0.##', 1)).toBe('1.');
  expect(format('0.##', -1)).toBe('-1.');
  expect(format('0.##', 0)).toBe('0.');
  expect(format('0.##', 1.1)).toBe('1.1');
  expect(format('0.##', -1.2)).toBe('-1.2');
  expect(format('0.##', 1000000000000.01)).toBe('1000000000000.01');
  expect(format('0.##', -1000.01)).toBe('-1000.01');
  expect(format('0.##', 0.1)).toBe('0.1');
  expect(format('0.##', 1.007)).toBe('1.01');
  expect(format('0.##', -1.008)).toBe('-1.01');
});

test('Oddity: ** #,###,#00,000.00,**', () => {
  expect(format('** #,###,#00,000.00,**', 1.2345)).toBe(' 00,000.00');
  expect(format('** #,###,#00,000.00,**', 12.345)).toBe(' 00,000.01');
  expect(format('** #,###,#00,000.00,**', 123.45)).toBe(' 00,000.12');
  expect(format('** #,###,#00,000.00,**', 1234.56)).toBe(' 00,001.23');
  expect(format('** #,###,#00,000.00,**', 12345.67)).toBe(' 00,012.35');
  expect(format('** #,###,#00,000.00,**', 123456.78)).toBe(' 00,123.46');
  expect(format('** #,###,#00,000.00,**', 1234567.89)).toBe(' 01,234.57');
  expect(format('** #,###,#00,000.00,**', 12345681.9)).toBe(' 12,345.68');
  expect(format('** #,###,#00,000.00,**', 123456822)).toBe(' 123,456.82');
  expect(format('** #,###,#00,000.00,**', 1234568223)).toBe(' 1,234,568.22');
  expect(format('** #,###,#00,000.00,**', 12345682233)).toBe(' 12,345,682.23');
  expect(format('** #,###,#00,000.00,**', 123456822333)).toBe(' 123,456,822.33');
  expect(format('** #,###,#00,000.00,**', 1234568223333)).toBe(' 1,234,568,223.33');
  expect(format('** #,###,#00,000.00,**', 12345682233333)).toBe(' 12,345,682,233.33');
  expect(format('** #,###,#00,000.00,**', 123456822333333)).toBe(' 123,456,822,333.33');
  expect(format('** #,###,#00,000.00,**', 1234568223333330)).toBe(' 1,234,568,223,333.33');
  expect(format('** #,###,#00,000.00,**', 12345682233333300)).toBe(' 12,345,682,233,333.30');
  expect(format('** #,###,#00,000.00,**', 123456822333333000)).toBe(' 123,456,822,333,333.00');
  expect(format('** #,###,#00,000.00,**', 1234568223333330000)).toBe(' 1,234,568,223,333,330.00');
  expect(format('** #,###,#00,000.00,**', 12345682233333300000)).toBe(' 12,345,682,233,333,300.00');
  expect(format('** #,###,#00,000.00,**', 123456822333333000000)).toBe(' 123,456,822,333,333,000.00');
  expect(format('** #,###,#00,000.00,**', 1.23456822333333e+21)).toBe(' 1,234,568,223,333,330,000.00');
});

test('Oddity: 00,000.00,', () => {
  expect(format('00,000.00,', 12345)).toBe('00,012.35');
});

test('Oddity: 00,000.00', () => {
  expect(format('00,000.00', 12345)).toBe('12,345.00');
});

test('Oddity: ##0.0E+0', () => {
  expect(format('##0.0E+0', 1)).toBe('1.0E+0');
  expect(format('##0.0E+0', 12)).toBe('12.0E+0');
  expect(format('##0.0E+0', 123)).toBe('123.0E+0');
  expect(format('##0.0E+0', 1234)).toBe('1.2E+3');
  expect(format('##0.0E+0', 12345)).toBe('12.3E+3');
  expect(format('##0.0E+0', 123456)).toBe('123.5E+3');
  expect(format('##0.0E+0', 1234567)).toBe('1.2E+6');
  expect(format('##0.0E+0', 12345678)).toBe('12.3E+6');
  expect(format('##0.0E+0', 123456789)).toBe('123.5E+6');
});

test.skip('Oddity: 000#0#0#0##00##00##0#########', () => {
  // 000#0#0#0##00##00##0#########
  // 000 0 0 0  00  00  0 12345  (12345)
  // 000 0 0 0  00  00  0     1  (1)
  expect(format('000#0#0#0##00##00##0#########', 12345)).toBe('0000000000012345');
});

test.skip('Oddity: 0#######0.##0##0######00######0', () => {
  expect(format('0#######0.##0##0######00######0', 12.3456789)).toBe('012.3456789000');
  expect(format('0#######0.##0##0######00######0', 123456789)).toBe('123456789.00000');
});

test('Oddity: ###\\###\\##0.00', () => {
  expect(format('###\\###\\##0.00', 0.00101)).toBe('##0.00');
  expect(format('###\\###\\##0.00', 0.0101)).toBe('##0.01');
  expect(format('###\\###\\##0.00', 0.101)).toBe('##0.10');
  expect(format('###\\###\\##0.00', 1.01)).toBe('##1.01');
  expect(format('###\\###\\##0.00', 10.1)).toBe('##10.10');
  expect(format('###\\###\\##0.00', 101)).toBe('#1#01.00');
  expect(format('###\\###\\##0.00', 1010)).toBe('#10#10.00');
  expect(format('###\\###\\##0.00', 10100)).toBe('1#01#00.00');
  expect(format('###\\###\\##0.00', 101000)).toBe('10#10#00.00');
  expect(format('###\\###\\##0.00', 1010000)).toBe('101#00#00.00');
  expect(format('###\\###\\##0.00', 10100000)).toBe('1010#00#00.00');
  expect(format('###\\###\\##0.00', 101000000)).toBe('10100#00#00.00');
  expect(format('###\\###\\##0.00', 123456789.01)).toBe('12345#67#89.01');
});

test('Oddity: ###\\\\###\\\\##\\0.00', () => {
  expect(format('###\\\\###\\\\##\\0.00', 0.00101)).toBe('\\\\0.00');
  expect(format('###\\\\###\\\\##\\0.00', 0.0101)).toBe('\\\\0.01');
  expect(format('###\\\\###\\\\##\\0.00', 0.101)).toBe('\\\\0.10');
  expect(format('###\\\\###\\\\##\\0.00', 1.01)).toBe('\\\\10.01');
  expect(format('###\\\\###\\\\##\\0.00', 10.1)).toBe('\\\\100.10');
  expect(format('###\\\\###\\\\##\\0.00', 101)).toBe('\\1\\010.00');
  expect(format('###\\\\###\\\\##\\0.00', 1010)).toBe('\\10\\100.00');
  expect(format('###\\\\###\\\\##\\0.00', 10100)).toBe('\\101\\000.00');
  expect(format('###\\\\###\\\\##\\0.00', 101000)).toBe('1\\010\\000.00');
  expect(format('###\\\\###\\\\##\\0.00', 1010000)).toBe('10\\100\\000.00');
  expect(format('###\\\\###\\\\##\\0.00', 10100000)).toBe('101\\000\\000.00');
  expect(format('###\\\\###\\\\##\\0.00', 101000000)).toBe('1010\\000\\000.00');
  expect(format('###\\\\###\\\\##\\0.00', 123456789.01)).toBe('1234\\567\\890.01');
});

test('Oddity: 0.0#', () => {
  expect(format('0.0#', 12345)).toBe('12345.0');
  expect(format('0.0#', 1234.5)).toBe('1234.5');
  expect(format('0.0#', 123.45)).toBe('123.45');
  expect(format('0.0#', 12.345)).toBe('12.35');
  expect(format('0.0#', 1.2345)).toBe('1.23');
  expect(format('0.0#', 0.12345)).toBe('0.12');
  expect(format('0.0#', 0.012345)).toBe('0.01');
  expect(format('0.0#', 0.0012345)).toBe('0.0');
  expect(format('0.0#', 0.00012345)).toBe('0.0');
  expect(format('0.0#', 15.04)).toBe('15.04');
  expect(format('0.0#', 15.06)).toBe('15.06');
});

test('Oddity: ###\\\\###\\\\##\\0', () => {
  expect(format('###\\\\###\\\\##\\0', 12345.6789)).toBe('\\123\\460');
});

test('Oddity: 00000-0000', () => {
  expect(format('00000-0000', 941051630)).toBe('94105-1630');
  expect(format('00000-0000', 12345.6789)).toBe('00001-2346');
});

test('Oddity: 000-00-0000', () => {
  expect(format('000-00-0000', 123456789)).toBe('123-45-6789');
});

test('Oddity: 00000\\-0000', () => {
  expect(format('00000\\-0000', 941051630)).toBe('94105-1630');
});

test('Oddity: 000\\-00\\-0000', () => {
  expect(format('000\\-00\\-0000', 123456789)).toBe('123-45-6789');
});

test('Oddity: ??/??', () => {
  expect(format('??/??', 12.3456789)).toBe('1000/81');
  expect(format('??/??', 0.00001)).toBe(' 0/1 ');
});

test('Oddity: # ??/??', () => {
  expect(format('# ??/??', 12.3456789)).toBe('12 28/81');
});

test('Oddity: #??/??', () => {
  expect(format('#??/??', 12.3456789)).toBe('1000/81');
});

test('Oddity: #0#00??/??', () => {
  expect(format('#0#00??/??', 12.3456789)).toBe('01000/81');
});

test('Oddity: [<=9999999]###-####;(###) ###-####', () => {
  expect(format('[<=9999999]###-####;(###) ###-####', 8675309)).toBe('867-5309');
  expect(format('[<=9999999]###-####;(###) ###-####', 2813308004)).toBe('(281) 330-8004');
  expect(format('[<=9999999]###-####;(###) ###-####', 2018675309)).toBe('(201) 867-5309');
});

test('Oddity: [<=9999999]###\\-####;(###) ###\\-####', () => {
  expect(format('[<=9999999]###\\-####;(###) ###\\-####', 8675309)).toBe('867-5309');
  expect(format('[<=9999999]###\\-####;(###) ###\\-####', 2813308004)).toBe('(281) 330-8004');
});

test('Oddity: [Red][<-25]General;[Blue][>25]General;[Green]General;[Yellow]General', () => {
  const z = '[Red][<-25]General;[Blue][>25]General;[Green]General;[Yellow]General';
  expect(format(z, 50)).toBe('50');
  expect(format(z, 26)).toBe('26');
  expect(format(z, 25)).toBe('25');
  expect(format(z, 1)).toBe('1');
  expect(format(z, 0)).toBe('0');
  expect(format(z, -1)).toBe('-1');
  expect(format(z, -25)).toBe('-25');
  expect(format(z, -26)).toBe('26');
  expect(format(z, -50.1)).toBe('50.1');
  expect(format(z, 'foo')).toBe('foo');
  expect(format(z, 'bar')).toBe('bar');
});

test('Oddity: [Red][<=-25]General;[Blue][>=25]General;[Green]General;[Yellow]General', () => {
  const z = '[Red][<=-25]General;[Blue][>=25]General;[Green]General;[Yellow]General';
  expect(format(z, 50)).toBe('50');
  expect(format(z, 26)).toBe('26');
  expect(format(z, 25)).toBe('25');
  expect(format(z, 1)).toBe('1');
  expect(format(z, 0)).toBe('0');
  expect(format(z, -1)).toBe('-1');
  expect(format(z, -25)).toBe('25');
  expect(format(z, -26.1)).toBe('26.1');
  expect(format(z, -50)).toBe('50');
  expect(format(z, 'foo')).toBe('foo');
  expect(format(z, 'bar')).toBe('bar');
});

test("Oddity: [Red]General ;[Blue]General\\ ;[Green]Generalp;[Yellow]General'", () => {
  const z = "[Red]General ;[Blue]General\\ ;[Green]Generalp;[Yellow]General'";
  expect(format(z, 50)).toBe('50 ');
  expect(format(z, 0)).toBe('0p');
  expect(format(z, -25)).toBe('25 ');
  expect(format(z, 'foo')).toBe('foo\'');
});

test('Oddity: [Red][=50]General;[Blue]000', () => {
  expect(format('[Red][=50]General;[Blue]000', 50)).toBe('50');
  expect(format('[Red][=50]General;[Blue]000', 51)).toBe('051');
  expect(format('[Red][=50]General;[Blue]000', 49)).toBe('049');
});

test('Oddity: [Red][<>50]General;[Blue]000', () => {
  expect(format('[Red][<>50]General;[Blue]000', 50)).toBe('050');
  expect(format('[Red][<>50]General;[Blue]000', 51)).toBe('51');
  expect(format('[Red][<>50]General;[Blue]000', 49)).toBe('49');
});

test('Oddity: b', () => {
  expect(format('b', 1)).toBe('43');
  expect(format('b', 1000)).toBe('45');
  expect(format('b', 10000)).toBe('70');
});

test('Oddity: B2yyyy-mm-dd', () => {
  expect(format('B2yyyy-mm-dd', 0)).toBe('1317-08-29');
  expect(format('B2yyyy-mm-dd', 59)).toBe('1317-10-28');
  expect(() => format('B2yyyy-mm-dd', 60)).toThrow();
  expect(format('B2yyyy-mm-dd', 61)).toBe('1317-10-29');
  expect(format('B2yyyy-mm-dd', 1000)).toBe('1320-06-23');
  expect(format('B2yyyy-mm-dd', 10000)).toBe('1345-11-17');
});

test('Oddity: ☃', () => {
  expect(format('☃', 0)).toBe('☃');
  expect(format('☃', 1)).toBe('☃');
  expect(format('☃', -1)).toBe('-☃');
  expect(format('☃', 'foo')).toBe('foo');
});

test.skip('Oddity: #0#######', () => {
  expect(format('#0#######', 12345)).toBe('012345');
  expect(format('#0#######', 12345.4321)).toBe('012345');
  expect(format('#0#######', 12345.6789)).toBe('012346');
});

test.skip('Oddity: ##,##', () => {
  expect(format('##,##', 0)).toBe('');
  expect(format('##,##', 1)).toBe('1');
  expect(format('##,##', 1234)).toBe('1,234');
  expect(format('##,##', 12345)).toBe('12,345');
  expect(format('##,##', 1234567)).toBe('1,234,567');
});

test('Oddity: 0', () => {
  expect(format('0', 12345)).toBe('12345');
  expect(format('0', 4294967296.5)).toBe('4294967297');
});

test('Oddity: "Rs."#,##0.00', () => {
  expect(format('"Rs."#,##0.00', -51968287)).toBe('-Rs.51,968,287.00');
  expect(format('"Rs."#,##0.00', 2000000)).toBe('Rs.2,000,000.00');
});

test('Oddity: $#.00', () => {
  expect(format('$#.00', 3.14159)).toBe('$3.14');
  expect(format('$#.00', -3.14159)).toBe('-$3.14');
});

test.skip('Oddity: "This is a ".00"test"000', () => {
  expect(format('"This is a ".00"test"000', -3.14159)).toBe('-This is a 3.14test159');
  expect(format('"This is a ".00"test"000', 3.14159)).toBe('This is a 3.14test159');
});

test('Oddity: [$INR]\\ #,##0.00', () => {
  expect(format('[$INR]\\ #,##0.00', 3.14159)).toBe('INR 3.14');
  expect(format('[$INR]\\ #,##0.00', -3.14159)).toBe('-INR 3.14');
});

test('Oddity: [$₹-4009]\\ #,##0.00', () => {
  expect(format('[$₹-4009]\\ #,##0.00', 3.14159)).toBe('₹ 3.14');
  expect(format('[$₹-4009]\\ #,##0.00', -3.14159)).toBe('-₹ 3.14');
});

test('Oddity: [$£-809]#,##0.0000;\\-[$£-809]#,##0.0000', () => {
  expect(format('[$£-809]#,##0.0000;\\-[$£-809]#,##0.0000', 3.14159)).toBe('£3.1416');
  expect(format('[$£-809]#,##0.0000;\\-[$£-809]#,##0.0000', -3.14159)).toBe('-£3.1416');
});

test('Oddity: "-"0.00', () => {
  expect(format('"-"0.00', 3.14159)).toBe('-3.14');
  expect(format('"-"0.00', -3.14159)).toBe('--3.14');
});

test('Oddity: [$-409]mmm\\-yy', () => {
  expect(format('[$-409]mmm\\-yy', 12345)).toBe('Oct-33');
});

test('Oddity: \\,##.??;\\(#,###.??\\);0', () => {
  expect(format('\\,##.??;\\(#,###.??\\);0', 15)).toBe(',15.  ');
  expect(format('\\,##.??;\\(#,###.??\\);0', 14.3453453)).toBe(',14.35');
  expect(format('\\,##.??;\\(#,###.??\\);0', 12.1)).toBe(',12.1 ');
  expect(format('\\,##.??;\\(#,###.??\\);0', 0)).toBe('0');
  expect(format('\\,##.??;\\(#,###.??\\);0', -15)).toBe('(15.  )');
  expect(format('\\,##.??;\\(#,###.??\\);0', -14.3453453)).toBe('(14.35)');
  expect(format('\\,##.??;\\(#,###.??\\);0', -12.1)).toBe('(12.1 )');
  expect(format('\\,##.??;\\(#,###.??\\);0', 1)).toBe(',1.  ');
});

test('Oddity: "£"#.####;-"£"#.####', () => {
  expect(format('"£"#.####;-"£"#.####', 3.141592654)).toBe('£3.1416');
  expect(format('"£"#.####;-"£"#.####', -3.141592654)).toBe('-£3.1416');
});

test('Oddity: [h]:mm:ss;@', () => {
  expect(format('[h]:mm:ss;@', 2.9999999999999996)).toBe('72:00:00');
});

test('Oddity: hh:mm:ss AM/PM', () => {
  expect(format('hh:mm:ss AM/PM', 0.5)).toBe('12:00:00 PM');
});

test('Oddity: hh:mm:ss am/pm', () => {
  expect(format('hh:mm:ss am/pm', 0.5)).toBe('12:00:00 PM');
});

test('Oddity: hh:mm:ss AM/P', () => {
  expect(format('hh:mm:ss AM/P', 0.5)).toBe('12:00:00 A1/P');
});

test('Oddity: hh:mm:ss am/p', () => {
  expect(format('hh:mm:ss am/p', 0.5)).toBe('12:00:00 a1/p');
});

test('Oddity: "foo";"bar";"baz";"qux";"foobar"', () => {
  expect(() => format('"foo";"bar";"baz";"qux";"foobar"', 0), '"foo";"bar";"baz";"qux";"foobar"').toThrow();
});
