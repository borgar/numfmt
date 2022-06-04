import tape from 'tape';
import numfmt from '../lib/index.js';

const tests = [
  // general
  [ '1234', 1234, null ],
  [ '12.34', 12.34, null ],
  [ '12.34 ', 12.34, null ],
  [ ' 12.34', 12.34, null ],
  [ '+12.34 ', 12.34, null ],
  [ '-12.34 ', -12.34, null ],
  [ '- 12.34 ', -12.34, null ],
  [ '-     12.34 ', -12.34, null ],
  [ '(12.34) ', -12.34, null ],
  [ '((12.34)) ', null, null ],
  [ '( 12.34 ) ', -12.34, null ],
  [ '(-12.34) ', null, null ],
  [ '1,234,443', 1234443, '#,##0' ],
  [ '1,234,4434', 12344434, '#,##0' ], // Same as Sheets

  // percent (a)
  [ '%12', 0.12, '0%' ],
  [ '%-12', -0.12, '0%' ],
  [ '-%12', -0.12, '0%' ],
  [ '-%-12', null, null ], // this is what Sheets does
  [ '12%', 0.12, '0%' ],
  [ '(12)%', -0.12, '0%' ],
  [ '(12%)', -0.12, '0%' ],
  [ '-12%', -0.12, '0%' ],
  [ '% 12', 0.12, '0%' ], // Excel allows, Sheets does not
  [ '12 %', 0.12, '0%' ], // Excel allows, Sheets does not

  // "number"
  [ '1,234', 1234, '#,##0' ],
  [ '1,234.', 1234, '#,##0.00' ],
  [ '1,234.00', 1234, '#,##0.00' ],
  [ '1,234.12', 1234.12, '#,##0.00' ],
  [ '1,234.56', 1234.56, '#,##0.00' ],

  // percent (b)
  [ '12.34%', 0.1234, '0.00%' ],
  [ ' 12.34%', 0.1234, '0.00%' ],
  [ '12.34% ', 0.1234, '0.00%' ],
  [ '10.0% ', 0.1, '0.00%' ],
  [ '10.% ', 0.1, '0.00%' ],
  [ '12.50% ', 0.125, '0.00%' ],
  [ '12.345% ', 0.12345, '0.00%' ],
  [ '.12% ', 0.0012, '0.00%' ],
  [ '(.12)% ', -0.0012, '0.00%' ],
  [ '(.12%) ', -0.0012, '0.00%' ],
  [ '.(12)% ', null, null ],
  [ '0.12% ', 0.0012, '0.00%' ],

  // scientific
  [ '1.23e+2', 123, '0.00E+00' ],
  [ '12e0', 12, '0.00E+00' ],
  [ '12e-0', 12, '0.00E+00' ],
  [ '12e+0', 12, '0.00E+00' ],
  [ '1e5', 100000, '0.00E+00' ],
  [ '1e+5', 100000, '0.00E+00' ],
  [ '-1e+5', -100000, '0.00E+00' ],
  [ '- 1e+5', -100000, '0.00E+00' ],
  [ '(1e+5)', -100000, '0.00E+00' ],
  [ '1e-05', 0.00001, '0.00E+00' ],
  [ '-1e-05', -0.00001, '0.00E+00' ],

  // dollar (a)
  [ '$1234', 1234, '$#,##0' ],
  [ '$1,234', 1234, '$#,##0' ],
  [ '$ 1234', 1234, '$#,##0' ],
  [ '$   1234', 1234, '$#,##0' ],
  [ '-$1234', -1234, '$#,##0' ],
  [ '-  $  1234', -1234, '$#,##0' ],
  [ '$-1234', -1234, '$#,##0' ],
  [ '-$-1234', null, null ], // Sheets allows this
  [ '($1234)', -1234, '$#,##0' ],
  [ '$(1234)', -1234, '$#,##0' ],
  // dollar (b)
  [ '$.1234', 0.1234, '$#,##0.00' ],
  [ '$1.1234', 1.1234, '$#,##0.00' ],
  [ '$1.0', 1, '$#,##0.00' ],
  [ '$1,234.', 1234, '$#,##0.00' ],
  [ '$1234.', 1234, '$#,##0.00' ],
  [ '$1234.00', 1234, '$#,##0.00' ],
  [ '$1234.56', 1234.56, '$#,##0.00' ],
  [ '$-1234.56', -1234.56, '$#,##0.00' ],
  [ '-$-1234.56', null, null ], // Sheets allows this
  [ '-$1234.56', -1234.56, '$#,##0.00' ],
  [ '$(1234.56)', -1234.56, '$#,##0.00' ],
  [ ' $ ( 1234.56 ) ', -1234.56, '$#,##0.00' ],
  [ '($1234.56)', -1234.56, '$#,##0.00' ],
  [ '(($1234.56))', null, null ],
  // dollar (c)
  [ '1234$', 1234, '#,##0$' ],
  [ '1,234$', 1234, '#,##0$' ],
  [ '-1234$', -1234, '#,##0$' ],
  [ '- 1234 $', -1234, '#,##0$' ],
  [ '(1234$)', -1234, '#,##0$' ],
  [ '( 1234 $ )', -1234, '#,##0$' ],
  [ '(1234)$', -1234, '#,##0$' ],
  [ '( 1234 ) $', -1234, '#,##0$' ],
  // dollar (d)
  [ '.1234$', 0.1234, '#,##0.00$' ],
  [ '1.1234$', 1.1234, '#,##0.00$' ],
  [ '1.0$', 1, '#,##0.00$' ],
  [ '1,234.$', 1234, '#,##0.00$' ],
  [ '1234.$', 1234, '#,##0.00$' ],
  [ '1234.00$', 1234, '#,##0.00$' ],
  [ '1234.56$', 1234.56, '#,##0.00$' ],
  [ '-1234.56$', -1234.56, '#,##0.00$' ],
  [ '- 1234.56 $', -1234.56, '#,##0.00$' ],
  [ '(1234.56)$', -1234.56, '#,##0.00$' ],
  [ ' ( 1234.56 ) $ ', -1234.56, '#,##0.00$' ],
  [ '(1234.56$)', -1234.56, '#,##0.00$' ],
  [ '( 1234.56 $ )', -1234.56, '#,##0.00$' ],
  [ '((1234.56$))', null, null ],

  // some rejects
  [ '%12e+1', null, null ],
  [ '$12e+1', null, null ],
  [ '0x12', null, null ],
  [ '&h12', null, null ],

  // dates
  [ '07/05/82', 30137, 'mm/dd/yy' ],
  [ '07/05/1984', 30868, 'mm/dd/yyyy' ],
  [ '07/4/82', 30136, 'mm/dd/yy' ],
  [ '07/4/1984', 30867, 'mm/dd/yyyy' ],
  [ '07/October/82', 30231, 'dd/mmmm/yy' ],
  [ '07/October/1984', 30962, 'dd/mmmm/yyyy' ],
  [ '07/Nov/82', 30262, 'dd/mmm/yy' ],
  [ '07/Nov/1984', 30993, 'dd/mmm/yyyy' ],
  [ '6/05/82', 30107, 'mm/dd/yy' ],
  [ '6/05/1984', 30838, 'mm/dd/yyyy' ],
  [ '6/4/82', 30106, 'm/d/yy' ],
  [ '6/4/1984', 30837, 'm/d/yyyy' ],
  [ '6/October/82', 30230, 'd/mmmm/yy' ],
  [ '6/October/1984', 30961, 'd/mmmm/yyyy' ],
  [ '6/Nov/82', 30261, 'd/mmm/yy' ],
  [ '6/Nov/1984', 30992, 'd/mmm/yyyy' ],
  [ '05/07/82', 30078, 'mm/dd/yy' ],
  [ '05/07/1984', 30809, 'mm/dd/yyyy' ],
  [ '4/07/82', 30048, 'mm/dd/yy' ],
  [ '4/07/1984', 30779, 'mm/dd/yyyy' ],
  [ 'October/07/82', 30231, 'mmmm/dd/yy' ],
  [ 'October/07/1984', 30962, 'mmmm/dd/yyyy' ],
  [ 'Nov/07/82', 30262, 'mmm/dd/yy' ],
  [ 'Nov/07/1984', 30993, 'mmm/dd/yyyy' ],
  [ '05/6/82', 30077, 'mm/dd/yy' ],
  [ '05/6/1984', 30808, 'mm/dd/yyyy' ],
  [ '4/6/82', 30047, 'm/d/yy' ],
  [ '4/6/1984', 30778, 'm/d/yyyy' ],
  [ 'October/6/82', 30230, 'mmmm/d/yy' ],
  [ 'October/6/1984', 30961, 'mmmm/d/yyyy' ],
  [ 'Nov/6/82', 30261, 'mmm/d/yy' ],
  [ 'Nov/6/1984', 30992, 'mmm/d/yyyy' ],
  [ '82/07/05', null, null ],
  [ '1984/07/05', 30868, 'yyyy/mm/dd' ],
  [ '82/07/4', null, null ],
  [ '1984/07/4', 30867, 'yyyy/mm/dd' ],
  [ '82/07/October', null, null ],
  [ '1984/07/October', null, null ],
  [ '82/07/Nov', null, null ],
  [ '1984/07/Nov', null, null ],
  [ '82/6/05', null, null ],
  [ '1984/6/05', 30838, 'yyyy/mm/dd' ],
  [ '82/6/4', null, null ],
  [ '1984/6/4', 30837, 'yyyy/m/d' ],
  [ '82/6/October', null, null ],
  [ '1984/6/October', null, null ],
  [ '82/6/Nov', null, null ],
  [ '1984/6/Nov', null, null ],
  [ '07/82/05', null, null ],
  [ '07/1984/05', null, null ],
  [ '07/82/4', null, null ],
  [ '07/1984/4', null, null ],
  [ '07/82/October', null, null ],
  [ '07/1984/October', null, null ],
  [ '07/82/Nov', null, null ],
  [ '07/1984/Nov', null, null ],
  [ '6/82/05', null, null ],
  [ '6/1984/05', null, null ],
  [ '6/82/4', null, null ],
  [ '6/1984/4', null, null ],
  [ '6/82/October', null, null ],
  [ '6/1984/October', null, null ],
  [ '6/82/Nov', null, null ],
  [ '6/1984/Nov', null, null ],
  [ '05/82/07', null, null ],
  [ '05/1984/07', null, null ],
  [ '4/82/07', null, null ],
  [ '4/1984/07', null, null ],
  [ 'October/82/07', null, null ],
  [ 'October/1984/07', null, null ],
  [ 'Nov/82/07', null, null ],
  [ 'Nov/1984/07', null, null ],
  [ '05/82/6', null, null ],
  [ '05/1984/6', null, null ],
  [ '4/82/6', null, null ],
  [ '4/1984/6', null, null ],
  [ 'October/82/6', null, null ],
  [ 'October/1984/6', null, null ],
  [ 'Nov/82/6', null, null ],
  [ 'Nov/1984/6', null, null ],
  [ '82/05/07', null, null ],
  [ '1984/05/07', 30809, 'yyyy/mm/dd' ],
  [ '82/4/07', null, null ],
  [ '1984/4/07', 30779, 'yyyy/mm/dd' ],
  [ '82/October/07', 30231, 'yy/mmmm/dd' ],
  [ '1984/October/07', 30962, 'yyyy/mmmm/dd' ],
  [ '82/Nov/07', 30262, 'yy/mmm/dd' ],
  [ '1984/Nov/07', 30993, 'yyyy/mmm/dd' ],
  [ '82/05/6', null, null ],
  [ '1984/05/6', 30808, 'yyyy/mm/dd' ],
  [ '82/4/6', null, null ],
  [ '1984/4/6', 30778, 'yyyy/m/d' ],
  [ '82/October/6', 30230, 'yy/mmmm/d' ],
  [ '1984/October/6', 30961, 'yyyy/mmmm/d' ],
  [ '82/Nov/6', 30261, 'yy/mmm/d' ],
  [ '1984/Nov/6', 30992, 'yyyy/mmm/d' ],
  [ '07/05', 44747, 'mm/dd' ],
  [ '07/4', 44746, 'mm/dd' ],
  [ '07/October', 44841, 'dd/mmmm' ],
  [ '07/Nov', 44872, 'dd/mmm' ],
  [ '6/05', 44717, 'mm/dd' ],
  [ '6/4', 44716, 'm/d' ],
  [ '6/October', 44840, 'd/mmmm' ],
  [ '6/Nov', 44871, 'd/mmm' ],
  [ '07/82', null, null ],
  [ '07/1984', 30864, 'mm/yyyy' ],
  [ '6/82', null, null ],
  [ '6/1984', 30834, 'm/yyyy' ],
  [ '05/07', 44688, 'mm/dd' ],
  [ '4/07', 44658, 'mm/dd' ],
  [ 'October/07', 44841, 'mmmm/dd' ],
  [ 'Nov/07', 44872, 'mmm/dd' ],
  [ '05/6', 44687, 'mm/dd' ],
  [ '4/6', 44657, 'm/d' ],
  [ 'October/6', 44840, 'mmmm/d' ],
  [ 'Nov/6', 44871, 'mmm/d' ],
  [ '05/82', null, null ],
  [ '05/1984', 30803, 'mm/yyyy' ],
  [ '4/82', null, null ],
  [ '4/1984', 30773, 'm/yyyy' ],
  [ 'October/82', null, null ],
  [ 'October/1984', 30956, 'mmmm/yyyy' ],
  [ 'Nov/82', null, null ],
  [ 'Nov/1984', 30987, 'mmm/yyyy' ],
  [ '82/07', null, null ],
  [ '1984/07', 30864, 'yyyy/mm' ],
  [ '82/6', null, null ],
  [ '1984/6', 30834, 'yyyy/m' ],
  [ '82/05', null, null ],
  [ '1984/05', 30803, 'yyyy/mm' ],
  [ '82/4', null, null ],
  [ '1984/4', 30773, 'yyyy/m' ],
  [ '82/October', null, null ],
  [ '1984/October', 30956, 'yyyy/mmmm' ],
  [ '82/Nov', null, null ],
  [ '1984/Nov', 30987, 'yyyy/mmm' ],
  // date leading zeros & date separators
  [ '2000-1-1', 36526, 'yyyy-m-d' ],
  [ '2000-1-01', 36526, 'yyyy-mm-dd' ],
  [ '2000-01-1', 36526, 'yyyy-mm-dd' ],
  [ '2000-01-01', 36526, 'yyyy-mm-dd' ],
  [ '2000-10-10', 36809, 'yyyy-mm-dd' ],
  [ '2000-11-11', 36841, 'yyyy-mm-dd' ],
  [ '2000-11-1', 36831, 'yyyy-m-d' ],
  [ '2000-1-11', 36536, 'yyyy-m-d' ],
  [ '01 oct 1975', 27668, 'dd mmm yyyy' ],
  [ '1 oct 1975', 27668, 'd mmm yyyy' ],
  [ '10 oct 1975', 27677, 'd mmm yyyy' ],
  [ '11 oct 1975', 27678, 'd mmm yyyy' ],
  // cannot mix and match date separators
  [ '11-oct 1975', null, null ],
  [ '11/oct 1975', null, null ],
  [ '11-oct/1975', null, null ],
  [ '11 oct-1975', null, null ],
  // invalid dates
  [ '29 feb 1975', null, null ], // not a leap year
  [ '29 feb 2004', 38046, 'd mmm yyyy' ], // actual leap year
  [ '31 apr 2000', null, null ], // apr has 30 days
  [ '2000-13-01', null, null ], // 13th month
  [ '2000-00-01', null, null ], // zero month
  [ '10 oct 0000', null, null ], // Google treats this as year 2000
  [ '10 oct 00', 36809, 'd mmm yy' ], // year 2000
  // year boundaries: Excel 1900-9999, Sheets 0-99999
  [ '31 dec 1899', null, null ], // 0 jan 1900 => 0 Excel date
  [ '1 jan 1900', 1, 'd mmm yyyy' ],
  [ '2 jan 1900', 2, 'd mmm yyyy' ],
  [ '1899-12-31', null, null ],
  [ '1900-01-01', 1, 'yyyy-mm-dd' ],
  [ '1900-01-02', 2, 'yyyy-mm-dd' ],
  [ '1 jan 9999', 2958101, 'd mmm yyyy' ],
  [ '31 dec 9999', 2958465, 'd mmm yyyy' ],
  [ '1 jan 10000', null, null ],
  [ '9999-01-01', 2958101, 'yyyy-mm-dd' ],
  [ '9999-12-31', 2958465, 'yyyy-mm-dd' ],
  [ '10000-01-01', null, null ],
  // 1900 leap year bug.
  [ '27 Feb 1900', 58, 'd mmm yyyy' ],
  [ '28 Feb 1900', 59, 'd mmm yyyy' ],
  [ '29 Feb 1900', 60, 'd mmm yyyy' ],
  [ '1 Mar 1900', 61, 'd mmm yyyy' ],
  [ '2 Mar 1900', 62, 'd mmm yyyy' ],

  // weekdays
  [ 'Sunday 12 April 1984', 30784, 'dddd d mmmm yyyy' ],
  [ 'Monday 12 April 1984', 30784, 'dddd d mmmm yyyy' ],
  [ 'Tuesday 12 April 1984', 30784, 'dddd d mmmm yyyy' ],
  [ 'Wednesday 12 April 1984', 30784, 'dddd d mmmm yyyy' ],
  [ 'Thursday 12 April 1984', 30784, 'dddd d mmmm yyyy' ],
  [ 'Friday 12 April 1984', 30784, 'dddd d mmmm yyyy' ],
  [ 'Saturday 12 April 1984', 30784, 'dddd d mmmm yyyy' ],
  [ 'Sun 12 April 1984', 30784, 'ddd d mmmm yyyy' ],
  [ 'Mon 12 April 1984', 30784, 'ddd d mmmm yyyy' ],
  [ 'Tue 12 April 1984', 30784, 'ddd d mmmm yyyy' ],
  [ 'Wed 12 April 1984', 30784, 'ddd d mmmm yyyy' ],
  [ 'Thu 12 April 1984', 30784, 'ddd d mmmm yyyy' ],
  [ 'Fri 12 April 1984', 30784, 'ddd d mmmm yyyy' ],
  [ 'Sat 12 April 1984', 30784, 'ddd d mmmm yyyy' ],
  [ 'Sunday 12 April 1984', 30784, 'dddd d mmmm yyyy' ],
  [ '12 Sunday April 1984', null, null ],
  [ '12 April Sunday 1984', null, null ],
  [ '12 April 1984 Sunday', 30784, 'd mmmm yyyy dddd' ],
  [ 'Thursday 12 April 1984', 30784, 'dddd d mmmm yyyy' ],
  [ '12 Thursday April 1984', null, null ],
  [ '12 April Thursday 1984', null, null ],
  [ '12 April 1984 Thursday', 30784, 'd mmmm yyyy dddd' ],
  [ 'Sun 12 April 1984', 30784, 'ddd d mmmm yyyy' ],
  [ '12 Sun April 1984', null, null ],
  [ '12 April Sun 1984', null, null ],
  [ '12 April 1984 Sun', 30784, 'd mmmm yyyy ddd' ],
  [ 'Thu 12 April 1984', 30784, 'ddd d mmmm yyyy' ],
  [ '12 Thu April 1984', null, null ],
  [ '12 April Thu 1984', null, null ],
  [ '12 April 1984 Thu', 30784, 'd mmmm yyyy ddd' ],
  [ 'Sun 82/October/6', 30230, 'ddd yy/mmmm/d' ],
  [ 'Sun/82/October/6', null, null ],
  [ '82/October/6 Sun', 30230, 'yy/mmmm/d ddd' ],
  [ '82/Sun/October/6', null, null ],
  [ 'Sunday, 12 April 1984', 30784, 'dddd, d mmmm yyyy' ],
  [ '12. April, 1984, Sunday', 30784, 'd. mmmm, yyyy, dddd' ],
  [ '12. April, 1984 Sunday', 30784, 'd. mmmm, yyyy dddd' ],
  [ 'Sunday, 12 April 1984 10:45', 30784.447916666668, 'dddd, d mmmm yyyy hh:mm' ],
  [ '12 April 1984 Sunday 10:45', 30784.447916666668, 'd mmmm yyyy dddd hh:mm' ],
  [ '12 April 1984, Sunday 10:45', 30784.447916666668, 'd mmmm yyyy, dddd hh:mm' ],
  [ '12. April 1984', 30784, 'd. mmmm yyyy' ],
  [ '12. Apr. 1984', 30784, 'd. mmm. yyyy' ],
  [ '12, Apr, 1984', 30784, 'd, mmm, yyyy' ],
  [ '12- Apr- 1984', 30784, 'd- mmm- yyyy' ],
  [ '12 - Apr - 1984', 30784, 'd - mmm - yyyy' ],
  [ '12  -  Apr  -  1984', 30784, 'd - mmm - yyyy' ],

  // period as seprator
  [ '12.Apr.1984', 30784, 'd.mmm.yyyy' ],
  [ '12.4.1984', 31020, 'm.d.yyyy' ],
  [ '12. 1984', 31017, 'm. yyyy' ],
  [ '12.1984', 12.1984, null ], // value parsing has priority (see text below)

  // comma is not a "real" seprator, it demands a space following it
  [ '12,Apr,1984', null, null ],
  [ '12,4,1984', 1241984, '#,##0' ], // value parsing has priority
  [ '12, 1984', 31017, 'm, yyyy' ],
  [ '12,1984', 121984, '#,##0' ], // value parsing has priority

  // time
  [ '1 AM', 0.041666666666666664, 'h:mm AM/PM' ],
  [ '01 AM', 0.041666666666666664, 'hh:mm AM/PM' ],
  [ '10 AM', 0.4166666666666667, 'hh:mm AM/PM' ],
  [ '10:11 AM', 0.42430555555555555, 'hh:mm AM/PM' ],
  [ '1:2 AM', 0.043055555555555555, 'h:mm AM/PM' ],
  [ '01:02 AM', 0.043055555555555555, 'hh:mm AM/PM' ],
  [ '10:11:12 AM', 0.42444444444444446, 'hh:mm:ss AM/PM' ],
  [ '01:02:03 AM', 0.043090277777777776, 'hh:mm:ss AM/PM' ],
  [ '1:2:3 AM', 0.043090277777777776, 'h:mm:ss AM/PM' ],
  [ '24:11', 1.007638888888889, 'hh:mm' ],
  [ '24:11:12', 1.0077777777777779, 'hh:mm:ss' ],
  [ '1:2', 0.043055555555555555, 'h:mm' ],
  [ '1:2 A', 0.043055555555555555, 'h:mm AM/PM' ],
  [ '1:2 P', 0.5430555555555555, 'h:mm AM/PM' ],
  [ '1 A', 0.041666666666666664, 'h:mm AM/PM' ],
  [ '1 P', 0.5416666666666666, 'h:mm AM/PM' ],
  [ '10:11:12.123', 0.42444586805555556, 'hh:mm:ss' ],
  [ '10:11:12.12', 0.42444583333333336, 'hh:mm:ss' ],
  [ '10:11:12.1', 0.4244456018518518, 'hh:mm:ss' ],
  [ 'AM 12:11', null, null ],
  [ 'AM 12', null, null ],
  [ '1:2AM', 0.043055555555555555, 'h:mm AM/PM' ],
  [ '01:02AM', 0.043055555555555555, 'hh:mm AM/PM' ],
  [ '24:11:12 AM', null, null ],
  [ '10.456 AM', null, null ],
  [ '10:12.456', null, null ],
  [ '10:12:13.456', 0.4251557407407407, 'hh:mm:ss' ],
  [ '10:12:13.0123456789', 0.42515060585276504, 'hh:mm:ss' ],
  [ '00:00:00.0123456789', 0.00000014288980208333333, 'hh:mm:ss' ],

  [ '00:00 AM', 0, 'hh:mm AM/PM' ],
  [ '01:00 AM', 0.041666666666666664, 'hh:mm AM/PM' ],
  [ '02:00 AM', 0.08333333333333333, 'hh:mm AM/PM' ],
  [ '03:00 AM', 0.125, 'hh:mm AM/PM' ],
  [ '04:00 AM', 0.16666666666666666, 'hh:mm AM/PM' ],
  [ '05:00 AM', 0.20833333333333334, 'hh:mm AM/PM' ],
  [ '06:00 AM', 0.25, 'hh:mm AM/PM' ],
  [ '07:00 AM', 0.2916666666666667, 'hh:mm AM/PM' ],
  [ '08:00 AM', 0.3333333333333333, 'hh:mm AM/PM' ],
  [ '09:00 AM', 0.375, 'hh:mm AM/PM' ],
  [ '10:00 AM', 0.4166666666666667, 'hh:mm AM/PM' ],
  [ '11:00 AM', 0.4583333333333333, 'hh:mm AM/PM' ],
  [ '12:00 AM', 0.5, 'hh:mm AM/PM' ],
  [ '12:59 AM', 0.5409722222222222, 'hh:mm AM/PM' ],
  [ '12:60 AM', null, null ],
  [ '12:61 AM', null, null ],
  [ '12:99 AM', null, null ],
  [ '13:00 AM', null, null ],
  [ '14:00 AM', null, null ],
  [ '15:00 AM', null, null ],
  [ '16:00 AM', null, null ],
  [ '17:00 AM', null, null ],
  [ '18:00 AM', null, null ],
  [ '19:00 AM', null, null ],
  [ '20:00 AM', null, null ],
  [ '21:00 AM', null, null ],
  [ '22:00 AM', null, null ],
  [ '23:00 AM', null, null ],
  [ '24:00 AM', null, null ],
  [ '00:00 PM', 0.5, 'hh:mm AM/PM' ],
  [ '01:00 PM', 0.5416666666666666, 'hh:mm AM/PM' ],
  [ '02:00 PM', 0.5833333333333334, 'hh:mm AM/PM' ],
  [ '03:00 PM', 0.625, 'hh:mm AM/PM' ],
  [ '04:00 PM', 0.6666666666666666, 'hh:mm AM/PM' ],
  [ '05:00 PM', 0.7083333333333334, 'hh:mm AM/PM' ],
  [ '06:00 PM', 0.75, 'hh:mm AM/PM' ],
  [ '07:00 PM', 0.7916666666666666, 'hh:mm AM/PM' ],
  [ '08:00 PM', 0.8333333333333334, 'hh:mm AM/PM' ],
  [ '09:00 PM', 0.875, 'hh:mm AM/PM' ],
  [ '10:00 PM', 0.9166666666666666, 'hh:mm AM/PM' ],
  [ '11:00 PM', 0.9583333333333334, 'hh:mm AM/PM' ],
  [ '12:00 PM', 1, 'hh:mm AM/PM' ],
  [ '12:59 PM', 1.0409722222222222, 'hh:mm AM/PM' ],
  [ '12:60 PM', null, null ],
  [ '12:61 PM', null, null ],
  [ '12:99 PM', null, null ],
  [ '13:00 PM', null, null ],
  [ '14:00 PM', null, null ],
  [ '15:00 PM', null, null ],
  [ '16:00 PM', null, null ],
  [ '17:00 PM', null, null ],
  [ '18:00 PM', null, null ],
  [ '19:00 PM', null, null ],
  [ '20:00 PM', null, null ],
  [ '21:00 PM', null, null ],
  [ '22:00 PM', null, null ],
  [ '23:00 PM', null, null ],
  [ '24:00 PM', null, null ],

  // date + time - composed of parsers above so testing needs are limited
  [ '1984-09-10 11:12:13.1234', 30935.46681855787, 'yyyy-mm-dd hh:mm:ss' ],
  [ '07/05/1984 07:00 AM', 30868.291666666668, 'mm/dd/yyyy hh:mm AM/PM' ],

  // whitespace
  [ ' -12.34 ', -12.34, null ],
  [ ' 07/05/1984 ', 30868, 'mm/dd/yyyy' ],
  [ ' 07/05/1984 07:00 AM ', 30868.291666666668, 'mm/dd/yyyy hh:mm AM/PM' ],
  [ ' 07:00 AM ', 0.2916666666666667, 'hh:mm AM/PM' ],

  // booleans
  [ 'TRUE', true, null ],
  [ 'true', true, null ],
  [ 'tRuE', true, null ],
  [ ' TRUE ', true, null ],
  [ 'FALSE', false, null ],
  [ 'false', false, null ],
  [ 'faLsE', false, null ],
  [ ' FALSE ', false, null ]
];

tape(t => {
  t.deepLooseEqual(
    numfmt.parseNumber('-123'),
    { v: -123 },
    'numfmt.parseNumber parses numbers'
  );
  t.deepLooseEqual(
    numfmt.parseNumber('1999.10.01'),
    null,
    'numfmt.parseNumber does not parse invalid numbers'
  );
  t.deepLooseEqual(
    numfmt.parseNumber('1999-10-01'),
    null,
    'numfmt.parseNumber does not parse non-numbers'
  );

  t.deepLooseEqual(
    numfmt.parseDate('1999-10-01 12:00:00'),
    { v: 36434.5, z: 'yyyy-mm-dd hh:mm:ss' },
    'numfmt.parseDate parses dates'
  );
  t.deepLooseEqual(
    numfmt.parseDate('-123'),
    null,
    'numfmt.parseDate does not parse non-dates'
  );
  t.deepLooseEqual(
    numfmt.parseDate('1999-10-01 12:00:00', { nativeDate: true }),
    { v: new Date(1999, 9, 1, 17, 30), z: 'yyyy-mm-dd hh:mm:ss' },
    'numfmt.parseDate parses and emits native dates'
  );

  t.deepLooseEqual(
    numfmt.parseTime('09:18 PM'),
    { v: 0.8875, z: 'hh:mm AM/PM' },
    'numfmt.parseTime parses time'
  );
  t.deepLooseEqual(
    numfmt.parseTime('-123'),
    null,
    'numfmt.parseTime does not parse non-time'
  );

  t.deepLooseEqual(
    numfmt.parseBool('False'),
    { v: false },
    'numfmt.parseBool parses booleans'
  );
  t.deepLooseEqual(
    numfmt.parseBool('-123'),
    null,
    'numfmt.parseBool does not parse non-booleans'
  );

  t.deepLooseEqual(
    numfmt.parseBool('False'),
    { v: false },
    'numfmt.parseBool parses booleans'
  );
  t.deepLooseEqual(
    numfmt.parseBool('-123'),
    null,
    'numfmt.parseBool does not parse non-booleans'
  );

  t.deepLooseEqual(
    numfmt.parseDate('5.2022'),
    null,
    'numfmt.parseDate does not parse "decimals"'
  );

  t.deepLooseEqual(
    numfmt.parseValue('1999-10-01 12:00:00', { nativeDate: true }),
    { v: new Date(1999, 9, 1, 17, 30), z: 'yyyy-mm-dd hh:mm:ss' },
    'numfmt.parseValue parses and emits native dates'
  );

  // test value parsing
  tests.forEach(ts => {
    const [ input, value ] = ts;
    const p = numfmt.parseValue(input);
    if (p == null) {
      t.equal(null, value, input);
    }
    else {
      t.equal(p.v, value, `valueOf("${input}")`);
    }
  });

  // test format selection
  tests.forEach(ts => {
    const [ input, value, format ] = ts;
    const p = numfmt.parseValue(input);
    if (p == null) {
      t.equal(null, value, input);
    }
    else {
      t.equal(p.z ?? null, format, `formatOf("${input}")`);
    }
  });

  t.end();
});

