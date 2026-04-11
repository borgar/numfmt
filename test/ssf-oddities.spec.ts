// Tests originally converted from SSF but have been reviewed
// and corrected and conformed to Excel for Mac version 16.35
import { test, expect } from 'vitest';
import { assertFormat, assertFormatInvalid, assertFormatThrows } from './utils.ts';
import { format } from '../lib/index.ts';

test('Oddity: "foo";"bar";"baz";"qux"', () => {
  expect.assertions(4);
  assertFormat('"foo";"bar";"baz";"qux"', 1, 'foo');
  assertFormat('"foo";"bar";"baz";"qux"', -1, 'bar');
  assertFormat('"foo";"bar";"baz";"qux"', 0, 'baz');
  assertFormat('"foo";"bar";"baz";"qux"', 'text', 'qux');
});

test('Oddity: "foo";"bar";"baz"', () => {
  expect.assertions(4);
  assertFormat('"foo";"bar";"baz"', 1, 'foo');
  assertFormat('"foo";"bar";"baz"', -1, 'bar');
  assertFormat('"foo";"bar";"baz"', 0, 'baz');
  assertFormat('"foo";"bar";"baz"', 'text', 'text');
});

test('Oddity: "foo";"bar";@', () => {
  expect.assertions(4);
  assertFormat('"foo";"bar";@', 1, 'foo');
  assertFormat('"foo";"bar";@', -1, 'bar');
  assertFormat('"foo";"bar";@', 0, 'foo');
  assertFormat('"foo";"bar";@', 'text', 'text');
});

test('Oddity: "foo";"bar"', () => {
  expect.assertions(4);
  assertFormat('"foo";"bar"', 1, 'foo');
  assertFormat('"foo";"bar"', -1, 'bar');
  assertFormat('"foo";"bar"', 0, 'foo');
  assertFormat('"foo";"bar"', 'text', 'text');
});

test('Oddity: @@', () => {
  expect.assertions(4);
  assertFormat('@@', 1, '1');
  assertFormat('@@', -1, '-1');
  assertFormat('@@', 0, '0');
  assertFormat('@@', 'text', 'texttext');
});

test('Oddity: [Blue]General', () => {
  expect.assertions(4);
  assertFormat('[Blue]General', 1, '1');
  assertFormat('[Blue]General', -1, '-1');
  assertFormat('[Blue]General', 0, '0');
  assertFormat('[Blue]General', 'text', 'text');
});

test('Oddity: [Blue]G3neral', () => {
  expect.assertions(1);
  assertFormatInvalid('[Blue]G3neral');
});

test('Oddity: A"TODO"', () => {
  expect.assertions(4);
  assertFormat('A"TODO"', 1, 'ATODO');
  assertFormat('A"TODO"', -1, '-ATODO');
  assertFormat('A"TODO"', 0, 'ATODO');
  assertFormat('A"TODO"', 'text', 'text');
});

test('Oddity: r', () => {
  expect.assertions(4);
  assertFormat('r', 1, 'r');
  assertFormat('r', -1, '-r');
  assertFormat('r', 0, 'r');
  assertFormat('r', 'text', 'text');
});

test('Oddity: ((;@', () => {
  expect.assertions(3);
  assertFormat('((;@', 1, '((');
  assertFormat('((;@', 0, '((');
  assertFormat('((;@', 'text', 'text');
});

test('Oddity: \\r', () => {
  expect.assertions(4);
  assertFormat('\\r', 1, 'r');
  assertFormat('\\r', -1, '-r');
  assertFormat('\\r', 0, 'r');
  assertFormat('\\r', 'text', 'text');
});

test('Oddity: _($* #,##0_);_($* (#,##0);_($* "-"_);_(@_)', () => {
  expect.assertions(4);
  assertFormat('_($* #,##0_);_($* (#,##0);_($* "-"_);_(@_)', (1), ' $1 ');
  assertFormat('_($* #,##0_);_($* (#,##0);_($* "-"_);_(@_)', (-1), ' $(1)');
  assertFormat('_($* #,##0_);_($* (#,##0);_($* "-"_);_(@_)', (0), ' $- ');
  assertFormat('_($* #,##0_);_($* (#,##0);_($* "-"_);_(@_)', ('text'), ' text ');
  // t.format('_($* #,##0_);_($* (#,##0);_($* "-"_);_(@_)', (null), ' $- ');
  // t.format('_($* #,##0_);_($* (#,##0);_($* "-"_);_(@_)', (''), '');
});

test('Oddity: #0.#', () => {
  expect.assertions(5);
  assertFormat('#0.#', 0, '0.');
  assertFormat('#0.#', 1, '1.');
  assertFormat('#0.#', 12, '12.');
  assertFormat('#0.#', 12.34, '12.3');
  assertFormat('#0.#', -1.23, '-1.2');
});

test('Oddity: #,##0.0', () => {
  expect.assertions(4);
  assertFormat('#,##0.0', 1, '1.0');
  assertFormat('#,##0.0', -1, '-1.0');
  assertFormat('#,##0.0', 0, '0.0');
  assertFormat('#,##0.0', 'text', 'text');
});

test('Oddity: #,##0.00', () => {
  expect.assertions(4);
  assertFormat('#,##0.00', 1, '1.00');
  assertFormat('#,##0.00', -1, '-1.00');
  assertFormat('#,##0.00', 0, '0.00');
  assertFormat('#,##0.00', 'text', 'text');
});

test('Oddity: #,##0.000', () => {
  expect.assertions(4);
  assertFormat('#,##0.000', 1, '1.000');
  assertFormat('#,##0.000', -1, '-1.000');
  assertFormat('#,##0.000', 0, '0.000');
  assertFormat('#,##0.000', 'text', 'text');
});

test('Oddity: #,##0.0000', () => {
  expect.assertions(4);
  assertFormat('#,##0.0000', 1, '1.0000');
  assertFormat('#,##0.0000', -1, '-1.0000');
  assertFormat('#,##0.0000', 0, '0.0000');
  assertFormat('#,##0.0000', 'text', 'text');
});

test('Oddity: #,##0.00000', () => {
  expect.assertions(1);
  assertFormat('#,##0.00000', 1000000, '1,000,000.00000');
});

test('Oddity: #,##0.000000', () => {
  expect.assertions(1);
  assertFormat('#,##0.000000', 1000000, '1,000,000.000000');
});

test('Oddity: #,##0.0000000', () => {
  expect.assertions(1);
  assertFormat('#,##0.0000000', 1000000, '1,000,000.0000000');
});

test('Oddity: #,##0.00000000', () => {
  expect.assertions(1);
  assertFormat('#,##0.00000000', 1000000, '1,000,000.00000000');
});

test('Oddity: #,##0.000000000', () => {
  expect.assertions(1);
  assertFormat('#,##0.000000000', 1000000, '1,000,000.000000000');
});

test('Oddity: #,###', () => {
  expect.assertions(5);
  assertFormat('#,###', 1, '1');
  assertFormat('#,###', -1, '-1');
  assertFormat('#,###', 0, '');
  assertFormat('#,###', 12345.6789, '12,346');
  assertFormat('#,###', 'TODO', 'TODO');
});

test('Oddity: #.##', () => {
  expect.assertions(4);
  assertFormat('#.##', 1, '1.');
  assertFormat('#.##', -1, '-1.');
  assertFormat('#.##', 0, '.');
  assertFormat('#.##', 'text', 'text');
});

test('Oddity: 0;0', () => {
  expect.assertions(4);
  assertFormat('0;0', 1.1, '1');
  assertFormat('0;0', -1.1, '1');
  assertFormat('0;0', 0, '0');
  assertFormat('0;0', 'text', 'text');
});

test('Oddity: 0.0', () => {
  expect.assertions(4);
  assertFormat('0.0', 1, '1.0');
  assertFormat('0.0', -1, '-1.0');
  assertFormat('0.0', 0, '0.0');
  assertFormat('0.0', 'text', 'text');
});

test('Oddity: 0.00', () => {
  expect.assertions(4);
  assertFormat('0.00', 1.0001, '1.00');
  assertFormat('0.00', -1, '-1.00');
  assertFormat('0.00', 0, '0.00');
  assertFormat('0.00', 'text', 'text');
});

test('Oddity: 0.000', () => {
  expect.assertions(4);
  assertFormat('0.000', 1, '1.000');
  assertFormat('0.000', -1, '-1.000');
  assertFormat('0.000', 0, '0.000');
  assertFormat('0.000', 'text', 'text');
});

test('Oddity: 0.0000', () => {
  expect.assertions(4);
  assertFormat('0.0000', 1, '1.0000');
  assertFormat('0.0000', -1, '-1.0000');
  assertFormat('0.0000', 0, '0.0000');
  assertFormat('0.0000', 'text', 'text');
});

test('Oddity: hh:mm AM/PM', () => {
  expect.assertions(1);
  assertFormat('hh:mm AM/PM', 0.7, '04:48 PM');
});

test('Oddity: hhh:mm AM/PM', () => {
  expect.assertions(1);
  assertFormat('hhh:mm AM/PM', 0.7, '04:48 PM');
});

test('Oddity: hhh:mmm:sss', () => {
  expect.assertions(1);
  assertFormat('hhh:mmm:sss', 0.7, '16:Jan:00');
});

test('Oddity: hh:mmm:sss', () => {
  expect.assertions(1);
  assertFormat('hhh:mmm:sss', 0.7, '16:Jan:00');
});

test('Oddity: hh:mm:sss', () => {
  expect.assertions(1);
  assertFormat('hh:mm:sss', 0.7, '16:48:00');
});

test('Oddity: hh:mm:ss.000', () => {
  expect.assertions(2);
  assertFormat('hh:mm:ss.000', 0.7, '16:48:00.000');
  assertFormat('hh:mm:ss.000', 0.70707, '16:58:10.848');
});

test('Oddity: hh.000', () => {
  expect.assertions(1);
  assertFormat('hh.000', 0.70707, '16.848');
});

test('Oddity: hh .00', () => {
  expect.assertions(1);
  assertFormat('hh .00', 0.70707, '16 .85');
});

test('Oddity: hh  .0', () => {
  expect.assertions(1);
  assertFormat('hh  .0', 0.70707, '16  .8');
});

test('Oddity: hh .00 .000', () => {
  expect.assertions(1);
  assertFormat('hh .00 .000', 0.70707, '16 .84 .848');
});

test('Oddity: [hhh]', () => {
  expect.assertions(4);
  assertFormat('[hhh]', 1, '024');
  assertFormat('[hhh]', -1, '-024');
  assertFormat('[hhh]', 0, '000');
  assertFormat('[hhh]', 'text', 'text');
});

test('Oddity: [', () => {
  expect.assertions(1);
  expect(() => format('[', 0)).toThrow();
});

test('Oddity: A/P', () => {
  expect.assertions(1);
  assertFormat('A/P', 0.7, 'P');
});

test('Oddity: e', () => {
  expect.assertions(1);
  assertFormat('e', 0.7, '1900');
});

test('Oddity: 123', () => {
  expect.assertions(3);
  assertFormat('123', 0.7, '123');
  assertFormat('123', 0, '123');
  assertFormat('123', 'text', 'text');
});

test('Oddity: 0.##', () => {
  expect.assertions(10);
  assertFormat('0.##', 1, '1.');
  assertFormat('0.##', -1, '-1.');
  assertFormat('0.##', 0, '0.');
  assertFormat('0.##', 1.1, '1.1');
  assertFormat('0.##', -1.2, '-1.2');
  assertFormat('0.##', 1000000000000.01, '1000000000000.01');
  assertFormat('0.##', -1000.01, '-1000.01');
  assertFormat('0.##', 0.1, '0.1');
  assertFormat('0.##', 1.007, '1.01');
  assertFormat('0.##', -1.008, '-1.01');
});

test('Oddity: ** #,###,#00,000.00,**', () => {
  expect.assertions(22);
  assertFormat('** #,###,#00,000.00,**', 1.2345, ' 00,000.00');
  assertFormat('** #,###,#00,000.00,**', 12.345, ' 00,000.01');
  assertFormat('** #,###,#00,000.00,**', 123.45, ' 00,000.12');
  assertFormat('** #,###,#00,000.00,**', 1234.56, ' 00,001.23');
  assertFormat('** #,###,#00,000.00,**', 12345.67, ' 00,012.35');
  assertFormat('** #,###,#00,000.00,**', 123456.78, ' 00,123.46');
  assertFormat('** #,###,#00,000.00,**', 1234567.89, ' 01,234.57');
  assertFormat('** #,###,#00,000.00,**', 12345681.9, ' 12,345.68');
  assertFormat('** #,###,#00,000.00,**', 123456822, ' 123,456.82');
  assertFormat('** #,###,#00,000.00,**', 1234568223, ' 1,234,568.22');
  assertFormat('** #,###,#00,000.00,**', 12345682233, ' 12,345,682.23');
  assertFormat('** #,###,#00,000.00,**', 123456822333, ' 123,456,822.33');
  assertFormat('** #,###,#00,000.00,**', 1234568223333, ' 1,234,568,223.33');
  assertFormat('** #,###,#00,000.00,**', 12345682233333, ' 12,345,682,233.33');
  assertFormat('** #,###,#00,000.00,**', 123456822333333, ' 123,456,822,333.33');
  assertFormat('** #,###,#00,000.00,**', 1234568223333330, ' 1,234,568,223,333.33');
  assertFormat('** #,###,#00,000.00,**', 12345682233333300, ' 12,345,682,233,333.30');
  assertFormat('** #,###,#00,000.00,**', 123456822333333000, ' 123,456,822,333,333.00');
  assertFormat('** #,###,#00,000.00,**', 1234568223333330000, ' 1,234,568,223,333,330.00');
  assertFormat('** #,###,#00,000.00,**', 12345682233333300000, ' 12,345,682,233,333,300.00');
  assertFormat('** #,###,#00,000.00,**', 123456822333333000000, ' 123,456,822,333,333,000.00');
  assertFormat('** #,###,#00,000.00,**', 1.23456822333333e+21, ' 1,234,568,223,333,330,000.00');
});

test('Oddity: 00,000.00,', () => {
  expect.assertions(1);
  assertFormat('00,000.00,', 12345, '00,012.35');
});

test('Oddity: 00,000.00', () => {
  expect.assertions(1);
  assertFormat('00,000.00', 12345, '12,345.00');
});

test('Oddity: ##0.0E+0', () => {
  expect.assertions(9);
  assertFormat('##0.0E+0', 1, '1.0E+0');
  assertFormat('##0.0E+0', 12, '12.0E+0');
  assertFormat('##0.0E+0', 123, '123.0E+0');
  assertFormat('##0.0E+0', 1234, '1.2E+3');
  assertFormat('##0.0E+0', 12345, '12.3E+3');
  assertFormat('##0.0E+0', 123456, '123.5E+3');
  assertFormat('##0.0E+0', 1234567, '1.2E+6');
  assertFormat('##0.0E+0', 12345678, '12.3E+6');
  assertFormat('##0.0E+0', 123456789, '123.5E+6');
});

test.skip('Oddity: 000#0#0#0##00##00##0#########', () => {
  expect.assertions(1);
  // 000#0#0#0##00##00##0#########
  // 000 0 0 0  00  00  0 12345  (12345)
  // 000 0 0 0  00  00  0     1  (1)
  assertFormat('000#0#0#0##00##00##0#########', 12345, '0000000000012345');
});

test.skip('Oddity: 0#######0.##0##0######00######0', () => {
  expect.assertions(2);
  assertFormat('0#######0.##0##0######00######0', 12.3456789, '012.3456789000');
  assertFormat('0#######0.##0##0######00######0', 123456789, '123456789.00000');
});

test('Oddity: ###\\###\\##0.00', () => {
  expect.assertions(13);
  assertFormat('###\\###\\##0.00', 0.00101, '##0.00');
  assertFormat('###\\###\\##0.00', 0.0101, '##0.01');
  assertFormat('###\\###\\##0.00', 0.101, '##0.10');
  assertFormat('###\\###\\##0.00', 1.01, '##1.01');
  assertFormat('###\\###\\##0.00', 10.1, '##10.10');
  assertFormat('###\\###\\##0.00', 101, '#1#01.00');
  assertFormat('###\\###\\##0.00', 1010, '#10#10.00');
  assertFormat('###\\###\\##0.00', 10100, '1#01#00.00');
  assertFormat('###\\###\\##0.00', 101000, '10#10#00.00');
  assertFormat('###\\###\\##0.00', 1010000, '101#00#00.00');
  assertFormat('###\\###\\##0.00', 10100000, '1010#00#00.00');
  assertFormat('###\\###\\##0.00', 101000000, '10100#00#00.00');
  assertFormat('###\\###\\##0.00', 123456789.01, '12345#67#89.01');
});

test('Oddity: ###\\\\###\\\\##\\0.00', () => {
  expect.assertions(13);
  assertFormat('###\\\\###\\\\##\\0.00', 0.00101, '\\\\0.00');
  assertFormat('###\\\\###\\\\##\\0.00', 0.0101, '\\\\0.01');
  assertFormat('###\\\\###\\\\##\\0.00', 0.101, '\\\\0.10');
  assertFormat('###\\\\###\\\\##\\0.00', 1.01, '\\\\10.01');
  assertFormat('###\\\\###\\\\##\\0.00', 10.1, '\\\\100.10');
  assertFormat('###\\\\###\\\\##\\0.00', 101, '\\1\\010.00');
  assertFormat('###\\\\###\\\\##\\0.00', 1010, '\\10\\100.00');
  assertFormat('###\\\\###\\\\##\\0.00', 10100, '\\101\\000.00');
  assertFormat('###\\\\###\\\\##\\0.00', 101000, '1\\010\\000.00');
  assertFormat('###\\\\###\\\\##\\0.00', 1010000, '10\\100\\000.00');
  assertFormat('###\\\\###\\\\##\\0.00', 10100000, '101\\000\\000.00');
  assertFormat('###\\\\###\\\\##\\0.00', 101000000, '1010\\000\\000.00');
  assertFormat('###\\\\###\\\\##\\0.00', 123456789.01, '1234\\567\\890.01');
});

test('Oddity: 0.0#', () => {
  expect.assertions(11);
  assertFormat('0.0#', 12345, '12345.0');
  assertFormat('0.0#', 1234.5, '1234.5');
  assertFormat('0.0#', 123.45, '123.45');
  assertFormat('0.0#', 12.345, '12.35');
  assertFormat('0.0#', 1.2345, '1.23');
  assertFormat('0.0#', 0.12345, '0.12');
  assertFormat('0.0#', 0.012345, '0.01');
  assertFormat('0.0#', 0.0012345, '0.0');
  assertFormat('0.0#', 0.00012345, '0.0');
  assertFormat('0.0#', 15.04, '15.04');
  assertFormat('0.0#', 15.06, '15.06');
});

test('Oddity: ###\\\\###\\\\##\\0', () => {
  expect.assertions(1);
  assertFormat('###\\\\###\\\\##\\0', 12345.6789, '\\123\\460');
});

test('Oddity: 00000-0000', () => {
  expect.assertions(2);
  assertFormat('00000-0000', 941051630, '94105-1630');
  assertFormat('00000-0000', 12345.6789, '00001-2346');
});

test('Oddity: 000-00-0000', () => {
  expect.assertions(1);
  assertFormat('000-00-0000', 123456789, '123-45-6789');
});

test('Oddity: 00000\\-0000', () => {
  expect.assertions(1);
  assertFormat('00000\\-0000', 941051630, '94105-1630');
});

test('Oddity: 000\\-00\\-0000', () => {
  expect.assertions(1);
  assertFormat('000\\-00\\-0000', 123456789, '123-45-6789');
});

test('Oddity: ??/??', () => {
  expect.assertions(2);
  assertFormat('??/??', 12.3456789, '1000/81');
  assertFormat('??/??', 0.00001, ' 0/1 ');
});

test('Oddity: # ??/??', () => {
  expect.assertions(1);
  assertFormat('# ??/??', 12.3456789, '12 28/81');
});

test('Oddity: #??/??', () => {
  expect.assertions(1);
  assertFormat('#??/??', 12.3456789, '1000/81');
});

test('Oddity: #0#00??/??', () => {
  expect.assertions(1);
  assertFormat('#0#00??/??', 12.3456789, '01000/81');
});

test('Oddity: [<=9999999]###-####;(###) ###-####', () => {
  expect.assertions(3);
  assertFormat('[<=9999999]###-####;(###) ###-####', 8675309, '867-5309');
  assertFormat('[<=9999999]###-####;(###) ###-####', 2813308004, '(281) 330-8004');
  assertFormat('[<=9999999]###-####;(###) ###-####', 2018675309, '(201) 867-5309');
});

test('Oddity: [<=9999999]###\\-####;(###) ###\\-####', () => {
  expect.assertions(2);
  assertFormat('[<=9999999]###\\-####;(###) ###\\-####', 8675309, '867-5309');
  assertFormat('[<=9999999]###\\-####;(###) ###\\-####', 2813308004, '(281) 330-8004');
});

test('Oddity: [Red][<-25]General;[Blue][>25]General;[Green]General;[Yellow]General', () => {
  expect.assertions(11);
  const z = '[Red][<-25]General;[Blue][>25]General;[Green]General;[Yellow]General';
  assertFormat(z, 50, '50');
  assertFormat(z, 26, '26');
  assertFormat(z, 25, '25');
  assertFormat(z, 1, '1');
  assertFormat(z, 0, '0');
  assertFormat(z, -1, '-1');
  assertFormat(z, -25, '-25');
  assertFormat(z, -26, '26');
  assertFormat(z, -50.1, '50.1');
  assertFormat(z, 'foo', 'foo');
  assertFormat(z, 'bar', 'bar');
});

test('Oddity: [Red][<=-25]General;[Blue][>=25]General;[Green]General;[Yellow]General', () => {
  expect.assertions(11);
  const z = '[Red][<=-25]General;[Blue][>=25]General;[Green]General;[Yellow]General';
  assertFormat(z, 50, '50');
  assertFormat(z, 26, '26');
  assertFormat(z, 25, '25');
  assertFormat(z, 1, '1');
  assertFormat(z, 0, '0');
  assertFormat(z, -1, '-1');
  assertFormat(z, -25, '25');
  assertFormat(z, -26.1, '26.1');
  assertFormat(z, -50, '50');
  assertFormat(z, 'foo', 'foo');
  assertFormat(z, 'bar', 'bar');
});

test("Oddity: [Red]General ;[Blue]General\\ ;[Green]Generalp;[Yellow]General'", () => {
  expect.assertions(4);
  const z = "[Red]General ;[Blue]General\\ ;[Green]Generalp;[Yellow]General'";
  assertFormat(z, 50, '50 ');
  assertFormat(z, 0, '0p');
  assertFormat(z, -25, '25 ');
  assertFormat(z, 'foo', 'foo\'');
});

test('Oddity: [Red][=50]General;[Blue]000', () => {
  expect.assertions(3);
  assertFormat('[Red][=50]General;[Blue]000', 50, '50');
  assertFormat('[Red][=50]General;[Blue]000', 51, '051');
  assertFormat('[Red][=50]General;[Blue]000', 49, '049');
});

test('Oddity: [Red][<>50]General;[Blue]000', () => {
  expect.assertions(3);
  assertFormat('[Red][<>50]General;[Blue]000', 50, '050');
  assertFormat('[Red][<>50]General;[Blue]000', 51, '51');
  assertFormat('[Red][<>50]General;[Blue]000', 49, '49');
});

test('Oddity: b', () => {
  expect.assertions(3);
  assertFormat('b', 1, '43');
  assertFormat('b', 1000, '45');
  assertFormat('b', 10000, '70');
});

test('Oddity: B2yyyy-mm-dd', () => {
  expect.assertions(6);
  assertFormat('B2yyyy-mm-dd', 0, '1317-08-29');
  assertFormat('B2yyyy-mm-dd', 59, '1317-10-28');
  assertFormatThrows('B2yyyy-mm-dd', 60);
  assertFormat('B2yyyy-mm-dd', 61, '1317-10-29');
  assertFormat('B2yyyy-mm-dd', 1000, '1320-06-23');
  assertFormat('B2yyyy-mm-dd', 10000, '1345-11-17');
});

test('Oddity: ☃', () => {
  expect.assertions(4);
  assertFormat('☃', 0, '☃');
  assertFormat('☃', 1, '☃');
  assertFormat('☃', -1, '-☃');
  assertFormat('☃', 'foo', 'foo');
});

test.skip('Oddity: #0#######', () => {
  expect.assertions(3);
  assertFormat('#0#######', 12345, '012345');
  assertFormat('#0#######', 12345.4321, '012345');
  assertFormat('#0#######', 12345.6789, '012346');
});

test.skip('Oddity: ##,##', () => {
  expect.assertions(5);
  assertFormat('##,##', 0, '');
  assertFormat('##,##', 1, '1');
  assertFormat('##,##', 1234, '1,234');
  assertFormat('##,##', 12345, '12,345');
  assertFormat('##,##', 1234567, '1,234,567');
});

test('Oddity: 0', () => {
  expect.assertions(2);
  assertFormat('0', 12345, '12345');
  assertFormat('0', 4294967296.5, '4294967297');
});

test('Oddity: "Rs."#,##0.00', () => {
  expect.assertions(2);
  assertFormat('"Rs."#,##0.00', -51968287, '-Rs.51,968,287.00');
  assertFormat('"Rs."#,##0.00', 2000000, 'Rs.2,000,000.00');
});

test('Oddity: $#.00', () => {
  expect.assertions(2);
  assertFormat('$#.00', 3.14159, '$3.14');
  assertFormat('$#.00', -3.14159, '-$3.14');
});

test.skip('Oddity: "This is a ".00"test"000', () => {
  expect.assertions(2);
  assertFormat('"This is a ".00"test"000', -3.14159, '-This is a 3.14test159');
  assertFormat('"This is a ".00"test"000', 3.14159, 'This is a 3.14test159');
});

test('Oddity: [$INR]\\ #,##0.00', () => {
  expect.assertions(2);
  assertFormat('[$INR]\\ #,##0.00', 3.14159, 'INR 3.14');
  assertFormat('[$INR]\\ #,##0.00', -3.14159, '-INR 3.14');
});

test('Oddity: [$₹-4009]\\ #,##0.00', () => {
  expect.assertions(2);
  assertFormat('[$₹-4009]\\ #,##0.00', 3.14159, '₹ 3.14');
  assertFormat('[$₹-4009]\\ #,##0.00', -3.14159, '-₹ 3.14');
});

test('Oddity: [$£-809]#,##0.0000;\\-[$£-809]#,##0.0000', () => {
  expect.assertions(2);
  assertFormat('[$£-809]#,##0.0000;\\-[$£-809]#,##0.0000', 3.14159, '£3.1416');
  assertFormat('[$£-809]#,##0.0000;\\-[$£-809]#,##0.0000', -3.14159, '-£3.1416');
});

test('Oddity: "-"0.00', () => {
  expect.assertions(2);
  assertFormat('"-"0.00', 3.14159, '-3.14');
  assertFormat('"-"0.00', -3.14159, '--3.14');
});

test('Oddity: [$-409]mmm\\-yy', () => {
  expect.assertions(1);
  assertFormat('[$-409]mmm\\-yy', 12345, 'Oct-33');
});

test('Oddity: \\,##.??;\\(#,###.??\\);0', () => {
  expect.assertions(8);
  assertFormat('\\,##.??;\\(#,###.??\\);0', 15, ',15.  ');
  assertFormat('\\,##.??;\\(#,###.??\\);0', 14.3453453, ',14.35');
  assertFormat('\\,##.??;\\(#,###.??\\);0', 12.1, ',12.1 ');
  assertFormat('\\,##.??;\\(#,###.??\\);0', 0, '0');
  assertFormat('\\,##.??;\\(#,###.??\\);0', -15, '(15.  )');
  assertFormat('\\,##.??;\\(#,###.??\\);0', -14.3453453, '(14.35)');
  assertFormat('\\,##.??;\\(#,###.??\\);0', -12.1, '(12.1 )');
  assertFormat('\\,##.??;\\(#,###.??\\);0', 1, ',1.  ');
});

test('Oddity: "£"#.####;-"£"#.####', () => {
  expect.assertions(2);
  assertFormat('"£"#.####;-"£"#.####', 3.141592654, '£3.1416');
  assertFormat('"£"#.####;-"£"#.####', -3.141592654, '-£3.1416');
});

test('Oddity: [h]:mm:ss;@', () => {
  expect.assertions(1);
  assertFormat('[h]:mm:ss;@', 2.9999999999999996, '72:00:00');
});

test('Oddity: hh:mm:ss AM/PM', () => {
  expect.assertions(1);
  assertFormat('hh:mm:ss AM/PM', 0.5, '12:00:00 PM');
});

test('Oddity: hh:mm:ss am/pm', () => {
  expect.assertions(1);
  assertFormat('hh:mm:ss am/pm', 0.5, '12:00:00 PM');
});

test('Oddity: hh:mm:ss AM/P', () => {
  expect.assertions(1);
  assertFormat('hh:mm:ss AM/P', 0.5, '12:00:00 A1/P');
});

test('Oddity: hh:mm:ss am/p', () => {
  expect.assertions(1);
  assertFormat('hh:mm:ss am/p', 0.5, '12:00:00 a1/p');
});

test('Oddity: "foo";"bar";"baz";"qux";"foobar"', () => {
  expect.assertions(1);
  expect(() => format('"foo";"bar";"baz";"qux";"foobar"', 0)).toThrow();
});
