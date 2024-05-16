/* eslint-disable no-irregular-whitespace */
// Tests originally converted from SSF but have been reviewed
// and corrected and conformed to Excel for Mac version 16.35
import test from './utils.js';
import { format } from '../lib/index.js';

test('Oddity: "foo";"bar";"baz";"qux"', t => {
  t.format('"foo";"bar";"baz";"qux"', 1, 'foo');
  t.format('"foo";"bar";"baz";"qux"', -1, 'bar');
  t.format('"foo";"bar";"baz";"qux"', 0, 'baz');
  t.format('"foo";"bar";"baz";"qux"', 'text', 'qux');
  t.end();
});

test('Oddity: "foo";"bar";"baz"', t => {
  t.format('"foo";"bar";"baz"', 1, 'foo');
  t.format('"foo";"bar";"baz"', -1, 'bar');
  t.format('"foo";"bar";"baz"', 0, 'baz');
  t.format('"foo";"bar";"baz"', 'text', 'text');
  t.end();
});

test('Oddity: "foo";"bar";@', t => {
  t.format('"foo";"bar";@', 1, 'foo');
  t.format('"foo";"bar";@', -1, 'bar');
  t.format('"foo";"bar";@', 0, 'foo');
  t.format('"foo";"bar";@', 'text', 'text');
  t.end();
});

test('Oddity: "foo";"bar"', t => {
  t.format('"foo";"bar"', 1, 'foo');
  t.format('"foo";"bar"', -1, 'bar');
  t.format('"foo";"bar"', 0, 'foo');
  t.format('"foo";"bar"', 'text', 'text');
  t.end();
});

test('Oddity: @@', t => {
  t.format('@@', 1, '1');
  t.format('@@', -1, '-1');
  t.format('@@', 0, '0');
  t.format('@@', 'text', 'texttext');
  t.end();
});

test('Oddity: [Blue]General', t => {
  t.format('[Blue]General', 1, '1');
  t.format('[Blue]General', -1, '-1');
  t.format('[Blue]General', 0, '0');
  t.format('[Blue]General', 'text', 'text');
  t.end();
});

test('Oddity: [Blue]G3neral', t => {
  t.formatInvalid('[Blue]G3neral', 0);
  t.end();
});

test('Oddity: A"TODO"', t => {
  t.format('A"TODO"', 1, 'ATODO');
  t.format('A"TODO"', -1, '-ATODO');
  t.format('A"TODO"', 0, 'ATODO');
  t.format('A"TODO"', 'text', 'text');
  t.end();
});

test('Oddity: r', t => {
  t.format('r', 1, 'r');
  t.format('r', -1, '-r');
  t.format('r', 0, 'r');
  t.format('r', 'text', 'text');
  t.end();
});

test('Oddity: ((;@', t => {
  t.format('((;@', 1, '((');
  t.format('((;@', 0, '((');
  t.format('((;@', 'text', 'text');
  t.end();
});

test('Oddity: \\r', t => {
  t.format('\\r', 1, 'r');
  t.format('\\r', -1, '-r');
  t.format('\\r', 0, 'r');
  t.format('\\r', 'text', 'text');
  t.end();
});

test('Oddity: _($* #,##0_);_($* (#,##0);_($* "-"_);_(@_)', t => {
  t.format('_($* #,##0_);_($* (#,##0);_($* "-"_);_(@_)', (1), ' $1 ');
  t.format('_($* #,##0_);_($* (#,##0);_($* "-"_);_(@_)', (-1), ' $(1)');
  t.format('_($* #,##0_);_($* (#,##0);_($* "-"_);_(@_)', (0), ' $- ');
  t.format('_($* #,##0_);_($* (#,##0);_($* "-"_);_(@_)', ('text'), ' text ');
  // t.format('_($* #,##0_);_($* (#,##0);_($* "-"_);_(@_)', (null), ' $- ');
  // t.format('_($* #,##0_);_($* (#,##0);_($* "-"_);_(@_)', (''), '');
  t.end();
});

test('Oddity: #0.#', t => {
  t.format('#0.#', 0, '0.');
  t.format('#0.#', 1, '1.');
  t.format('#0.#', 12, '12.');
  t.format('#0.#', 12.34, '12.3');
  t.format('#0.#', -1.23, '-1.2');
  t.end();
});

test('Oddity: #,##0.0', t => {
  t.format('#,##0.0', 1, '1.0');
  t.format('#,##0.0', -1, '-1.0');
  t.format('#,##0.0', 0, '0.0');
  t.format('#,##0.0', 'text', 'text');
  t.end();
});

test('Oddity: #,##0.00', t => {
  t.format('#,##0.00', 1, '1.00');
  t.format('#,##0.00', -1, '-1.00');
  t.format('#,##0.00', 0, '0.00');
  t.format('#,##0.00', 'text', 'text');
  t.end();
});

test('Oddity: #,##0.000', t => {
  t.format('#,##0.000', 1, '1.000');
  t.format('#,##0.000', -1, '-1.000');
  t.format('#,##0.000', 0, '0.000');
  t.format('#,##0.000', 'text', 'text');
  t.end();
});

test('Oddity: #,##0.0000', t => {
  t.format('#,##0.0000', 1, '1.0000');
  t.format('#,##0.0000', -1, '-1.0000');
  t.format('#,##0.0000', 0, '0.0000');
  t.format('#,##0.0000', 'text', 'text');
  t.end();
});

test('Oddity: #,##0.00000', t => {
  t.format('#,##0.00000', 1000000, '1,000,000.00000');
  t.end();
});

test('Oddity: #,##0.000000', t => {
  t.format('#,##0.000000', 1000000, '1,000,000.000000');
  t.end();
});

test('Oddity: #,##0.0000000', t => {
  t.format('#,##0.0000000', 1000000, '1,000,000.0000000');
  t.end();
});

test('Oddity: #,##0.00000000', t => {
  t.format('#,##0.00000000', 1000000, '1,000,000.00000000');
  t.end();
});

test('Oddity: #,##0.000000000', t => {
  t.format('#,##0.000000000', 1000000, '1,000,000.000000000');
  t.end();
});

test('Oddity: #,###', t => {
  t.format('#,###', 1, '1');
  t.format('#,###', -1, '-1');
  t.format('#,###', 0, '');
  t.format('#,###', 12345.6789, '12,346');
  t.format('#,###', 'TODO', 'TODO');
  t.end();
});

test('Oddity: #.##', t => {
  t.format('#.##', 1, '1.');
  t.format('#.##', -1, '-1.');
  t.format('#.##', 0, '.');
  t.format('#.##', 'text', 'text');
  t.end();
});

test('Oddity: 0;0', t => {
  t.format('0;0', 1.1, '1');
  t.format('0;0', -1.1, '1');
  t.format('0;0', 0, '0');
  t.format('0;0', 'text', 'text');
  t.end();
});

test('Oddity: 0.0', t => {
  t.format('0.0', 1, '1.0');
  t.format('0.0', -1, '-1.0');
  t.format('0.0', 0, '0.0');
  t.format('0.0', 'text', 'text');
  t.end();
});

test('Oddity: 0.00', t => {
  t.format('0.00', 1.0001, '1.00');
  t.format('0.00', -1, '-1.00');
  t.format('0.00', 0, '0.00');
  t.format('0.00', 'text', 'text');
  t.end();
});

test('Oddity: 0.000', t => {
  t.format('0.000', 1, '1.000');
  t.format('0.000', -1, '-1.000');
  t.format('0.000', 0, '0.000');
  t.format('0.000', 'text', 'text');
  t.end();
});

test('Oddity: 0.0000', t => {
  t.format('0.0000', 1, '1.0000');
  t.format('0.0000', -1, '-1.0000');
  t.format('0.0000', 0, '0.0000');
  t.format('0.0000', 'text', 'text');
  t.end();
});

test('Oddity: hh:mm AM/PM', t => {
  t.format('hh:mm AM/PM', 0.7, '04:48 PM');
  t.end();
});

test('Oddity: hhh:mm AM/PM', t => {
  t.format('hhh:mm AM/PM', 0.7, '04:48 PM');
  t.end();
});

test('Oddity: hhh:mmm:sss', t => {
  t.format('hhh:mmm:sss', 0.7, '16:Jan:00');
  t.end();
});

test('Oddity: hh:mmm:sss', t => {
  t.format('hhh:mmm:sss', 0.7, '16:Jan:00');
  t.end();
});

test('Oddity: hh:mm:sss', t => {
  t.format('hh:mm:sss', 0.7, '16:48:00');
  t.end();
});

test('Oddity: hh:mm:ss.000', t => {
  t.format('hh:mm:ss.000', 0.7, '16:48:00.000');
  t.format('hh:mm:ss.000', 0.70707, '16:58:10.848');
  t.end();
});

test('Oddity: hh.000', t => {
  t.format('hh.000', 0.70707, '16.848');
  t.end();
});

test('Oddity: hh .00', t => {
  t.format('hh .00', 0.70707, '16 .85');
  t.end();
});

test('Oddity: hh  .0', t => {
  t.format('hh  .0', 0.70707, '16  .8');
  t.end();
});

test('Oddity: hh .00 .000', t => {
  t.format('hh .00 .000', 0.70707, '16 .84 .848');
  t.end();
});

test('Oddity: [hhh]', t => {
  t.format('[hhh]', 1, '024');
  t.format('[hhh]', -1, '-024');
  t.format('[hhh]', 0, '000');
  t.format('[hhh]', 'text', 'text');
  t.end();
});

test('Oddity: [', t => {
  t.throws(() => format('['), '[');
  t.end();
});

test('Oddity: A/P', t => {
  t.format('A/P', 0.7, 'P');
  t.end();
});

test('Oddity: e', t => {
  t.format('e', 0.7, '1900');
  t.end();
});

test('Oddity: 123', t => {
  t.format('123', 0.7, '123');
  t.format('123', 0, '123');
  t.format('123', 'text', 'text');
  t.end();
});

test('Oddity: 0.##', t => {
  t.format('0.##', 1, '1.');
  t.format('0.##', -1, '-1.');
  t.format('0.##', 0, '0.');
  t.format('0.##', 1.1, '1.1');
  t.format('0.##', -1.2, '-1.2');
  t.format('0.##', 1000000000000.01, '1000000000000.01');
  t.format('0.##', -1000.01, '-1000.01');
  t.format('0.##', 0.1, '0.1');
  t.format('0.##', 1.007, '1.01');
  t.format('0.##', -1.008, '-1.01');
  t.end();
});

test('Oddity: ** #,###,#00,000.00,**', t => {
  t.format('** #,###,#00,000.00,**', 1.2345, ' 00,000.00');
  t.format('** #,###,#00,000.00,**', 12.345, ' 00,000.01');
  t.format('** #,###,#00,000.00,**', 123.45, ' 00,000.12');
  t.format('** #,###,#00,000.00,**', 1234.56, ' 00,001.23');
  t.format('** #,###,#00,000.00,**', 12345.67, ' 00,012.35');
  t.format('** #,###,#00,000.00,**', 123456.78, ' 00,123.46');
  t.format('** #,###,#00,000.00,**', 1234567.89, ' 01,234.57');
  t.format('** #,###,#00,000.00,**', 12345681.9, ' 12,345.68');
  t.format('** #,###,#00,000.00,**', 123456822, ' 123,456.82');
  t.format('** #,###,#00,000.00,**', 1234568223, ' 1,234,568.22');
  t.format('** #,###,#00,000.00,**', 12345682233, ' 12,345,682.23');
  t.format('** #,###,#00,000.00,**', 123456822333, ' 123,456,822.33');
  t.format('** #,###,#00,000.00,**', 1234568223333, ' 1,234,568,223.33');
  t.format('** #,###,#00,000.00,**', 12345682233333, ' 12,345,682,233.33');
  t.format('** #,###,#00,000.00,**', 123456822333333, ' 123,456,822,333.33');
  t.format('** #,###,#00,000.00,**', 1234568223333330, ' 1,234,568,223,333.33');
  t.format('** #,###,#00,000.00,**', 12345682233333300, ' 12,345,682,233,333.30');
  t.format('** #,###,#00,000.00,**', 123456822333333000, ' 123,456,822,333,333.00');
  t.format('** #,###,#00,000.00,**', 1234568223333330000, ' 1,234,568,223,333,330.00');
  t.format('** #,###,#00,000.00,**', 12345682233333300000, ' 12,345,682,233,333,300.00');
  t.format('** #,###,#00,000.00,**', 123456822333333000000, ' 123,456,822,333,333,000.00');
  t.format('** #,###,#00,000.00,**', 1.23456822333333e+21, ' 1,234,568,223,333,330,000.00');
  t.end();
});

test('Oddity: 00,000.00,', t => {
  t.format('00,000.00,', 12345, '00,012.35');
  t.end();
});

test('Oddity: 00,000.00', t => {
  t.format('00,000.00', 12345, '12,345.00');
  t.end();
});

test('Oddity: ##0.0E+0', t => {
  t.format('##0.0E+0', 1, '1.0E+0');
  t.format('##0.0E+0', 12, '12.0E+0');
  t.format('##0.0E+0', 123, '123.0E+0');
  t.format('##0.0E+0', 1234, '1.2E+3');
  t.format('##0.0E+0', 12345, '12.3E+3');
  t.format('##0.0E+0', 123456, '123.5E+3');
  t.format('##0.0E+0', 1234567, '1.2E+6');
  t.format('##0.0E+0', 12345678, '12.3E+6');
  t.format('##0.0E+0', 123456789, '123.5E+6');
  t.end();
});

test.skip('Oddity: 000#0#0#0##00##00##0#########', t => {
  // 000#0#0#0##00##00##0#########
  // 000 0 0 0  00  00  0 12345  (12345)
  // 000 0 0 0  00  00  0     1  (1)
  t.format('000#0#0#0##00##00##0#########', 12345, '0000000000012345');
  t.end();
});

test.skip('Oddity: 0#######0.##0##0######00######0', t => {
  t.format('0#######0.##0##0######00######0', 12.3456789, '012.3456789000');
  t.format('0#######0.##0##0######00######0', 123456789, '123456789.00000');
  t.end();
});

test('Oddity: ###\\###\\##0.00', t => {
  t.format('###\\###\\##0.00', 0.00101, '##0.00');
  t.format('###\\###\\##0.00', 0.0101, '##0.01');
  t.format('###\\###\\##0.00', 0.101, '##0.10');
  t.format('###\\###\\##0.00', 1.01, '##1.01');
  t.format('###\\###\\##0.00', 10.1, '##10.10');
  t.format('###\\###\\##0.00', 101, '#1#01.00');
  t.format('###\\###\\##0.00', 1010, '#10#10.00');
  t.format('###\\###\\##0.00', 10100, '1#01#00.00');
  t.format('###\\###\\##0.00', 101000, '10#10#00.00');
  t.format('###\\###\\##0.00', 1010000, '101#00#00.00');
  t.format('###\\###\\##0.00', 10100000, '1010#00#00.00');
  t.format('###\\###\\##0.00', 101000000, '10100#00#00.00');
  t.format('###\\###\\##0.00', 123456789.01, '12345#67#89.01');
  t.end();
});

test('Oddity: ###\\\\###\\\\##\\0.00', t => {
  t.format('###\\\\###\\\\##\\0.00', 0.00101, '\\\\0.00');
  t.format('###\\\\###\\\\##\\0.00', 0.0101, '\\\\0.01');
  t.format('###\\\\###\\\\##\\0.00', 0.101, '\\\\0.10');
  t.format('###\\\\###\\\\##\\0.00', 1.01, '\\\\10.01');
  t.format('###\\\\###\\\\##\\0.00', 10.1, '\\\\100.10');
  t.format('###\\\\###\\\\##\\0.00', 101, '\\1\\010.00');
  t.format('###\\\\###\\\\##\\0.00', 1010, '\\10\\100.00');
  t.format('###\\\\###\\\\##\\0.00', 10100, '\\101\\000.00');
  t.format('###\\\\###\\\\##\\0.00', 101000, '1\\010\\000.00');
  t.format('###\\\\###\\\\##\\0.00', 1010000, '10\\100\\000.00');
  t.format('###\\\\###\\\\##\\0.00', 10100000, '101\\000\\000.00');
  t.format('###\\\\###\\\\##\\0.00', 101000000, '1010\\000\\000.00');
  t.format('###\\\\###\\\\##\\0.00', 123456789.01, '1234\\567\\890.01');
  t.end();
});

test('Oddity: 0.0#', t => {
  t.format('0.0#', 12345, '12345.0');
  t.format('0.0#', 1234.5, '1234.5');
  t.format('0.0#', 123.45, '123.45');
  t.format('0.0#', 12.345, '12.35');
  t.format('0.0#', 1.2345, '1.23');
  t.format('0.0#', 0.12345, '0.12');
  t.format('0.0#', 0.012345, '0.01');
  t.format('0.0#', 0.0012345, '0.0');
  t.format('0.0#', 0.00012345, '0.0');
  t.format('0.0#', 15.04, '15.04');
  t.format('0.0#', 15.06, '15.06');
  t.end();
});

test('Oddity: ###\\\\###\\\\##\\0', t => {
  t.format('###\\\\###\\\\##\\0', 12345.6789, '\\123\\460');
  t.end();
});

test('Oddity: 00000-0000', t => {
  t.format('00000-0000', 941051630, '94105-1630');
  t.format('00000-0000', 12345.6789, '00001-2346');
  t.end();
});

test('Oddity: 000-00-0000', t => {
  t.format('000-00-0000', 123456789, '123-45-6789');
  t.end();
});

test('Oddity: 00000\\-0000', t => {
  t.format('00000\\-0000', 941051630, '94105-1630');
  t.end();
});

test('Oddity: 000\\-00\\-0000', t => {
  t.format('000\\-00\\-0000', 123456789, '123-45-6789');
  t.end();
});

test('Oddity: ??/??', t => {
  t.format('??/??', 12.3456789, '1000/81');
  t.format('??/??', 0.00001, ' 0/1 ');
  t.end();
});

test('Oddity: # ??/??', t => {
  t.format('# ??/??', 12.3456789, '12 28/81');
  t.end();
});

test('Oddity: #??/??', t => {
  t.format('#??/??', 12.3456789, '1000/81');
  t.end();
});

test('Oddity: #0#00??/??', t => {
  t.format('#0#00??/??', 12.3456789, '01000/81');
  t.end();
});

test('Oddity: [<=9999999]###-####;(###) ###-####', t => {
  t.format('[<=9999999]###-####;(###) ###-####', 8675309, '867-5309');
  t.format('[<=9999999]###-####;(###) ###-####', 2813308004, '(281) 330-8004');
  t.format('[<=9999999]###-####;(###) ###-####', 2018675309, '(201) 867-5309');
  t.end();
});

test('Oddity: [<=9999999]###\\-####;(###) ###\\-####', t => {
  t.format('[<=9999999]###\\-####;(###) ###\\-####', 8675309, '867-5309');
  t.format('[<=9999999]###\\-####;(###) ###\\-####', 2813308004, '(281) 330-8004');
  t.end();
});

test('Oddity: [Red][<-25]General;[Blue][>25]General;[Green]General;[Yellow]General', t => {
  const z = '[Red][<-25]General;[Blue][>25]General;[Green]General;[Yellow]General';
  t.format(z, 50, '50');
  t.format(z, 26, '26');
  t.format(z, 25, '25');
  t.format(z, 1, '1');
  t.format(z, 0, '0');
  t.format(z, -1, '-1');
  t.format(z, -25, '-25');
  t.format(z, -26, '26');
  t.format(z, -50.1, '50.1');
  t.format(z, 'foo', 'foo');
  t.format(z, 'bar', 'bar');
  t.end();
});

test('Oddity: [Red][<=-25]General;[Blue][>=25]General;[Green]General;[Yellow]General', t => {
  const z = '[Red][<=-25]General;[Blue][>=25]General;[Green]General;[Yellow]General';
  t.format(z, 50, '50');
  t.format(z, 26, '26');
  t.format(z, 25, '25');
  t.format(z, 1, '1');
  t.format(z, 0, '0');
  t.format(z, -1, '-1');
  t.format(z, -25, '25');
  t.format(z, -26.1, '26.1');
  t.format(z, -50, '50');
  t.format(z, 'foo', 'foo');
  t.format(z, 'bar', 'bar');
  t.end();
});

test("Oddity: [Red]General ;[Blue]General\\ ;[Green]Generalp;[Yellow]General'", t => {
  const z = "[Red]General ;[Blue]General\\ ;[Green]Generalp;[Yellow]General'";
  t.format(z, 50, '50 ');
  t.format(z, 0, '0p');
  t.format(z, -25, '25 ');
  t.format(z, 'foo', 'foo\'');
  t.end();
});

test('Oddity: [Red][=50]General;[Blue]000', t => {
  t.format('[Red][=50]General;[Blue]000', 50, '50');
  t.format('[Red][=50]General;[Blue]000', 51, '051');
  t.format('[Red][=50]General;[Blue]000', 49, '049');
  t.end();
});

test('Oddity: [Red][<>50]General;[Blue]000', t => {
  t.format('[Red][<>50]General;[Blue]000', 50, '050');
  t.format('[Red][<>50]General;[Blue]000', 51, '51');
  t.format('[Red][<>50]General;[Blue]000', 49, '49');
  t.end();
});

test('Oddity: b', t => {
  t.format('b', 1, '43');
  t.format('b', 1000, '45');
  t.format('b', 10000, '70');
  t.end();
});

test('Oddity: B2yyyy-mm-dd', t => {
  t.format('B2yyyy-mm-dd', 0, '1317-08-29');
  t.format('B2yyyy-mm-dd', 59, '1317-10-28');
  t.formatThrows('B2yyyy-mm-dd', 60);
  t.format('B2yyyy-mm-dd', 61, '1317-10-29');
  t.format('B2yyyy-mm-dd', 1000, '1320-06-23');
  t.format('B2yyyy-mm-dd', 10000, '1345-11-17');
  t.end();
});

test('Oddity: ☃', t => {
  t.format('☃', 0, '☃');
  t.format('☃', 1, '☃');
  t.format('☃', -1, '-☃');
  t.format('☃', 'foo', 'foo');
  t.end();
});

test.skip('Oddity: #0#######', t => {
  t.format('#0#######', 12345, '012345');
  t.format('#0#######', 12345.4321, '012345');
  t.format('#0#######', 12345.6789, '012346');
  t.end();
});

test.skip('Oddity: ##,##', t => {
  t.format('##,##', 0, '');
  t.format('##,##', 1, '1');
  t.format('##,##', 1234, '1,234');
  t.format('##,##', 12345, '12,345');
  t.format('##,##', 1234567, '1,234,567');
  t.end();
});

test('Oddity: 0', t => {
  t.format('0', 12345, '12345');
  t.format('0', 4294967296.5, '4294967297');
  t.end();
});

test('Oddity: "Rs."#,##0.00', t => {
  t.format('"Rs."#,##0.00', -51968287, '-Rs.51,968,287.00');
  t.format('"Rs."#,##0.00', 2000000, 'Rs.2,000,000.00');
  t.end();
});

test('Oddity: $#.00', t => {
  t.format('$#.00', 3.14159, '$3.14');
  t.format('$#.00', -3.14159, '-$3.14');
  t.end();
});

test.skip('Oddity: "This is a ".00"test"000', t => {
  t.format('"This is a ".00"test"000', -3.14159, '-This is a 3.14test159');
  t.format('"This is a ".00"test"000', 3.14159, 'This is a 3.14test159');
  t.end();
});

test('Oddity: [$INR]\\ #,##0.00', t => {
  t.format('[$INR]\\ #,##0.00', 3.14159, 'INR 3.14');
  t.format('[$INR]\\ #,##0.00', -3.14159, '-INR 3.14');
  t.end();
});

test('Oddity: [$₹-4009]\\ #,##0.00', t => {
  t.format('[$₹-4009]\\ #,##0.00', 3.14159, '₹ 3.14');
  t.format('[$₹-4009]\\ #,##0.00', -3.14159, '-₹ 3.14');
  t.end();
});

test('Oddity: [$£-809]#,##0.0000;\\-[$£-809]#,##0.0000', t => {
  t.format('[$£-809]#,##0.0000;\\-[$£-809]#,##0.0000', 3.14159, '£3.1416');
  t.format('[$£-809]#,##0.0000;\\-[$£-809]#,##0.0000', -3.14159, '-£3.1416');
  t.end();
});

test('Oddity: "-"0.00', t => {
  t.format('"-"0.00', 3.14159, '-3.14');
  t.format('"-"0.00', -3.14159, '--3.14');
  t.end();
});

test('Oddity: [$-409]mmm\\-yy', t => {
  t.format('[$-409]mmm\\-yy', 12345, 'Oct-33');
  t.end();
});

test('Oddity: \\,##.??;\\(#,###.??\\);0', t => {
  t.format('\\,##.??;\\(#,###.??\\);0', 15, ',15.  ');
  t.format('\\,##.??;\\(#,###.??\\);0', 14.3453453, ',14.35');
  t.format('\\,##.??;\\(#,###.??\\);0', 12.1, ',12.1 ');
  t.format('\\,##.??;\\(#,###.??\\);0', 0, '0');
  t.format('\\,##.??;\\(#,###.??\\);0', -15, '(15.  )');
  t.format('\\,##.??;\\(#,###.??\\);0', -14.3453453, '(14.35)');
  t.format('\\,##.??;\\(#,###.??\\);0', -12.1, '(12.1 )');
  t.format('\\,##.??;\\(#,###.??\\);0', 1, ',1.  ');
  t.end();
});

test('Oddity: "£"#.####;-"£"#.####', t => {
  t.format('"£"#.####;-"£"#.####', 3.141592654, '£3.1416');
  t.format('"£"#.####;-"£"#.####', -3.141592654, '-£3.1416');
  t.end();
});

test('Oddity: [h]:mm:ss;@', t => {
  t.format('[h]:mm:ss;@', 2.9999999999999996, '72:00:00');
  t.end();
});

test('Oddity: hh:mm:ss AM/PM', t => {
  t.format('hh:mm:ss AM/PM', 0.5, '12:00:00 PM');
  t.end();
});

test('Oddity: hh:mm:ss am/pm', t => {
  t.format('hh:mm:ss am/pm', 0.5, '12:00:00 PM');
  t.end();
});

test('Oddity: hh:mm:ss AM/P', t => {
  t.format('hh:mm:ss AM/P', 0.5, '12:00:00 A1/P');
  t.end();
});

test('Oddity: hh:mm:ss am/p', t => {
  t.format('hh:mm:ss am/p', 0.5, '12:00:00 a1/p');
  t.end();
});

test('Oddity: "foo";"bar";"baz";"qux";"foobar"', t => {
  t.throws(() => format('"foo";"bar";"baz";"qux";"foobar"'), '"foo";"bar";"baz";"qux";"foobar"');
  t.end();
});
