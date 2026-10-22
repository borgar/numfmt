import { describe, expect, test } from 'vitest';
import { getTimeZoneName, isLeapYear } from './utils.ts';
import { addLocale, dateToSerial, format, parseBool, parseDate, parseNumber, parseTime, parseValue } from '../src/index.ts';
import { getLocale, listLocales } from '../src/locale.ts';

const currentYear = dateToSerial([ new Date().getUTCFullYear(), 1, 1 ]) || 0;
const leapDay = isLeapYear(new Date().getUTCFullYear()) ? 1 : 0;

const tests: [ string, number | boolean | null, number | null ][] = [
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
  [ '1,234,443', 1234443, 3 ],
  [ '1,234,4434', 12344434, 3 ], // Same as Sheets

  // percent (a)
  [ '%12', 0.12, 9 ],
  [ '%-12', -0.12, 9 ],
  [ '-%12', -0.12, 9 ],
  [ '-%-12', null, null ], // this is what Sheets does
  [ '12%', 0.12, 9 ],
  [ '(12)%', -0.12, 9 ],
  [ '(12%)', -0.12, 9 ],
  [ '-12%', -0.12, 9 ],
  [ '% 12', 0.12, 9 ], // Excel allows, Sheets does not
  [ '12 %', 0.12, 9 ], // Excel allows, Sheets does not

  // "number"
  [ '1,234', 1234, 3 ],
  [ '1,234.', 1234, 4 ],
  [ '1,234.00', 1234, 4 ],
  [ '1,234.12', 1234.12, 4 ],
  [ '1,234.56', 1234.56, 4 ],

  // percent (b)
  [ '12.34%', 0.1234, 10 ],
  [ ' 12.34%', 0.1234, 10 ],
  [ '12.34% ', 0.1234, 10 ],
  [ '10.0% ', 0.1, 10 ],
  [ '10.% ', 0.1, 10 ],
  [ '12.50% ', 0.125, 10 ],
  [ '12.345% ', 0.12345, 10 ],
  [ '.12% ', 0.0012, 10 ],
  [ '(.12)% ', -0.0012, 10 ],
  [ '(.12%) ', -0.0012, 10 ],
  [ '.(12)% ', null, null ],
  [ '0.12% ', 0.0012, 10 ],

  // scientific
  [ '1.23e+2', 123, 11 ],
  [ '12e0', 12, 11 ],
  [ '12e-0', 12, 11 ],
  [ '12e+0', 12, 11 ],
  [ '1e5', 100000, 11 ],
  [ '1e+5', 100000, 11 ],
  [ '-1e+5', -100000, 11 ],
  [ '- 1e+5', -100000, 11 ],
  [ '(1e+5)', -100000, 11 ],
  [ '1e-05', 0.00001, 11 ],
  [ '-1e-05', -0.00001, 11 ],

  // euro (a)
  [ '€1234', 1234, 5 ],
  [ '€1,234', 1234, 5 ],
  [ '€ 1234', 1234, 5 ],
  [ '€   1234', 1234, 5 ],
  [ '-€1234', -1234, 5 ],
  [ '-  €  1234', -1234, 5 ],
  [ '€-1234', -1234, 5 ],
  [ '-€-1234', null, null ], // Sheets allows this
  [ '(€1234)', -1234, 5 ],
  [ '€(1234)', -1234, 5 ],
  // euro (b)
  [ '€.1234', 0.1234, 7 ],
  [ '€1.1234', 1.1234, 7 ],
  [ '€1.0', 1, 7 ],
  [ '€1,234.', 1234, 7 ],
  [ '€1234.', 1234, 7 ],
  [ '€1234.00', 1234, 7 ],
  [ '€1234.56', 1234.56, 7 ],
  [ '€-1234.56', -1234.56, 7 ],
  [ '-€-1234.56', null, null ], // Sheets allows this
  [ '-€1234.56', -1234.56, 7 ],
  [ '€(1234.56)', -1234.56, 7 ],
  [ ' € ( 1234.56 ) ', -1234.56, 7 ],
  [ '(€1234.56)', -1234.56, 7 ],
  [ '((€1234.56))', null, null ],
  // euro (c)
  [ '1234€', 1234, 5 ],
  [ '1,234€', 1234, 5 ],
  [ '-1234€', -1234, 5 ],
  [ '- 1234 €', -1234, 5 ],
  [ '(1234€)', -1234, 5 ],
  [ '( 1234 € )', -1234, 5 ],
  [ '(1234)€', -1234, 5 ],
  [ '( 1234 ) €', -1234, 5 ],
  // euro (d)
  [ '.1234€', 0.1234, 7 ],
  [ '1.1234€', 1.1234, 7 ],
  [ '1.0€', 1, 7 ],
  [ '1,234.€', 1234, 7 ],
  [ '1234.€', 1234, 7 ],
  [ '1234.00€', 1234, 7 ],
  [ '1234.56€', 1234.56, 7 ],
  [ '-1234.56€', -1234.56, 7 ],
  [ '- 1234.56 €', -1234.56, 7 ],
  [ '(1234.56)€', -1234.56, 7 ],
  [ ' ( 1234.56 ) € ', -1234.56, 7 ],
  [ '(1234.56€)', -1234.56, 7 ],
  [ '( 1234.56 € )', -1234.56, 7 ],
  [ '((1234.56€))', null, null ],

  // dollar (a)
  [ '$1234', 1234, 5 ],
  [ '$1,234', 1234, 5 ],
  [ '$ 1234', 1234, 5 ],
  [ '$   1234', 1234, 5 ],
  [ '-$1234', -1234, 5 ],
  [ '-  $  1234', -1234, 5 ],
  [ '$-1234', -1234, 5 ],
  [ '-$-1234', null, null ], // Sheets allows this
  [ '($1234)', -1234, 5 ],
  [ '$(1234)', -1234, 5 ],
  // dollar (b)
  [ '$.1234', 0.1234, 7 ],
  [ '$1.1234', 1.1234, 7 ],
  [ '$1.0', 1, 7 ],
  [ '$1,234.', 1234, 7 ],
  [ '$1234.', 1234, 7 ],
  [ '$1234.00', 1234, 7 ],
  [ '$1234.56', 1234.56, 7 ],
  [ '$-1234.56', -1234.56, 7 ],
  [ '-$-1234.56', null, null ], // Sheets allows this
  [ '-$1234.56', -1234.56, 7 ],
  [ '$(1234.56)', -1234.56, 7 ],
  [ ' $ ( 1234.56 ) ', -1234.56, 7 ],
  [ '($1234.56)', -1234.56, 7 ],
  [ '(($1234.56))', null, null ],
  // dollar (c)
  [ '1234$', 1234, 5 ],
  [ '1,234$', 1234, 5 ],
  [ '-1234$', -1234, 5 ],
  [ '- 1234 $', -1234, 5 ],
  [ '(1234$)', -1234, 5 ],
  [ '( 1234 $ )', -1234, 5 ],
  [ '(1234)$', -1234, 5 ],
  [ '( 1234 ) $', -1234, 5 ],
  // dollar (d)
  [ '.1234$', 0.1234, 7 ],
  [ '1.1234$', 1.1234, 7 ],
  [ '1.0$', 1, 7 ],
  [ '1,234.$', 1234, 7 ],
  [ '1234.$', 1234, 7 ],
  [ '1234.00$', 1234, 7 ],
  [ '1234.56$', 1234.56, 7 ],
  [ '-1234.56$', -1234.56, 7 ],
  [ '- 1234.56 $', -1234.56, 7 ],
  [ '(1234.56)$', -1234.56, 7 ],
  [ ' ( 1234.56 ) $ ', -1234.56, 7 ],
  [ '(1234.56$)', -1234.56, 7 ],
  [ '( 1234.56 $ )', -1234.56, 7 ],
  [ '((1234.56$))', null, null ],

  // multiple currency symbols in input
  [ '$$1234', null, null ],
  [ '$€1234', null, null ],
  [ '€$1234', null, null ],

  // some rejects
  [ '%12e+1', null, null ],
  [ '$12e+1', null, null ],
  [ '0x12', null, null ],
  [ '&h12', null, null ],

  // dates
  [ '07/05/82', 30137, 14 ],
  [ '07/05/1984', 30868, 14 ],
  [ '07/4/82', 30136, 14 ],
  [ '07/4/1984', 30867, 14 ],
  [ '07/October/82', 30231, 14 ],
  [ '07/October/1984', 30962, 14 ],
  [ '07/Nov/82', 30262, 14 ],
  [ '07/Nov/1984', 30993, 14 ],
  [ '6/05/82', 30107, 14 ],
  [ '6/05/1984', 30838, 14 ],
  [ '6/4/82', 30106, 14 ],
  [ '6/4/1984', 30837, 14 ],
  [ '6/October/82', 30230, 14 ],
  [ '6/October/1984', 30961, 14 ],
  [ '6/Nov/82', 30261, 14 ],
  [ '6/Nov/1984', 30992, 14 ],
  [ '05/07/82', 30078, 14 ],
  [ '05/07/1984', 30809, 14 ],
  [ '4/07/82', 30048, 14 ],
  [ '4/07/1984', 30779, 14 ],
  [ 'October/07/82', 30231, 14 ],
  [ 'October/07/1984', 30962, 14 ],
  [ 'Nov/07/82', 30262, 14 ],
  [ 'Nov/07/1984', 30993, 14 ],
  [ '05/6/82', 30077, 14 ],
  [ '05/6/1984', 30808, 14 ],
  [ '4/6/82', 30047, 14 ],
  [ '4/6/1984', 30778, 14 ],
  [ 'October/6/82', 30230, 14 ],
  [ 'October/6/1984', 30961, 14 ],
  [ 'Nov/6/82', 30261, 14 ],
  [ 'Nov/6/1984', 30992, 14 ],
  [ '82/07/05', null, null ],
  [ '1984/07/05', 30868, 14 ],
  [ '82/07/4', null, null ],
  [ '1984/07/4', 30867, 14 ],
  [ '82/07/October', null, null ],
  [ '1984/07/October', null, null ],
  [ '82/07/Nov', null, null ],
  [ '1984/07/Nov', null, null ],
  [ '82/6/05', null, null ],
  [ '1984/6/05', 30838, 14 ],
  [ '82/6/4', null, null ],
  [ '1984/6/4', 30837, 14 ],
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
  [ '1984/05/07', 30809, 14 ],
  [ '82/4/07', null, null ],
  [ '1984/4/07', 30779, 14 ],
  [ '82/October/07', 30231, 14 ],
  [ '1984/October/07', 30962, 14 ],
  [ '82/Nov/07', 30262, 14 ],
  [ '1984/Nov/07', 30993, 14 ],
  [ '82/05/6', null, null ],
  [ '1984/05/6', 30808, 14 ],
  [ '82/4/6', null, null ],
  [ '1984/4/6', 30778, 14 ],
  [ '82/October/6', 30230, 14 ],
  [ '1984/October/6', 30961, 14 ],
  [ '82/Nov/6', 30261, 14 ],
  [ '1984/Nov/6', 30992, 14 ],
  [ '07/05', currentYear + leapDay + 185, 16 ],
  [ '07/4', currentYear + leapDay + 184, 16 ],
  [ '07/October', currentYear + leapDay + 279, 16 ],
  [ '07/Nov', currentYear + leapDay + 310, 16 ],
  [ '6/05', currentYear + leapDay + 155, 16 ],
  [ '6/4', currentYear + leapDay + 154, 16 ],
  [ '6/October', currentYear + leapDay + 278, 16 ],
  [ '6/Nov', currentYear + leapDay + 309, 16 ],
  [ '07/82', null, null ],
  [ '07/1984', 30864, 17 ],
  [ '6/82', null, null ],
  [ '6/1984', 30834, 17 ],
  [ '05/07', currentYear + leapDay + 126, 16 ],
  [ '4/07', currentYear + leapDay + 96, 16 ],
  [ 'October/07', 39356, 17 ],
  [ 'Nov/07', 39387, 17 ],
  [ '05/6', currentYear + leapDay + 125, 16 ],
  [ '4/6', currentYear + leapDay + 95, 16 ],
  [ 'October/6', null, null ],
  [ 'Nov/6', null, null ],
  [ '05/82', null, null ],
  [ '05/1984', 30803, 17 ],
  [ '4/82', null, null ],
  [ '4/1984', 30773, 17 ],
  [ 'October/82', 30225, 17 ],
  [ 'October/1984', 30956, 17 ],
  [ 'Nov/82', 30256, 17 ],
  [ 'Nov/1984', 30987, 17 ],
  [ '82/07', null, null ],
  [ '1984/07', 30864, 17 ],
  [ '82/6', null, null ],
  [ '1984/6', 30834, 17 ],
  [ '82/05', null, null ],
  [ '1984/05', 30803, 17 ],
  [ '82/4', null, null ],
  [ '1984/4', 30773, 17 ],
  [ '82/October', null, null ],
  [ '1984/October', 30956, 17 ],
  [ '82/Nov', null, null ],
  [ '1984/Nov', 30987, 17 ],
  // date leading zeros & date separators
  [ '2000-1-1', 36526, 14 ],
  [ '2000-1-01', 36526, 14 ],
  [ '2000-01-1', 36526, 14 ],
  [ '2000-01-01', 36526, 14 ],
  [ '2000-10-10', 36809, 14 ],
  [ '2000-11-11', 36841, 14 ],
  [ '2000-11-1', 36831, 14 ],
  [ '2000-1-11', 36536, 14 ],
  [ '01 oct 1975', 27668, 14 ],
  [ '1 oct 1975', 27668, 14 ],
  [ '10 oct 1975', 27677, 14 ],
  [ '11 oct 1975', 27678, 14 ],
  // cannot mix and match date separators
  [ '11-oct 1975', null, null ],
  [ '11/oct 1975', null, null ],
  [ '11-oct/1975', null, null ],
  [ '11 oct-1975', null, null ],
  // invalid dates
  [ '29 feb 1975', null, null ], // not a leap year
  [ '29 feb 2004', 38046, 14 ], // actual leap year
  [ '31 apr 2000', null, null ], // apr has 30 days
  [ '2000-13-01', null, null ], // 13th month
  [ '2000-00-01', null, null ], // zero month
  [ '10 oct 0000', null, null ], // Google treats this as year 2000
  [ '10 oct 00', 36809, 14 ], // year 2000
  // year boundaries: Excel 1900-9999, Sheets 0-99999
  [ '31 dec 1899', null, null ], // 0 jan 1900 => 0 Excel date
  [ '1 jan 1900', 1, 14 ],
  [ '2 jan 1900', 2, 14 ],
  [ '1899-12-31', null, null ],
  [ '1900-01-01', 1, 14 ],
  [ '1900-01-02', 2, 14 ],
  [ '1 jan 9999', 2958101, 14 ],
  [ '31 dec 9999', 2958465, 14 ],
  [ '1 jan 10000', null, null ],
  [ '9999-01-01', 2958101, 14 ],
  [ '9999-12-31', 2958465, 14 ],
  [ '10000-01-01', null, null ],
  // 1900 leap year bug.
  [ '27 Feb 1900', 58, 14 ],
  [ '28 Feb 1900', 59, 14 ],
  [ '29 Feb 1900', 60, 14 ],
  [ '1 Mar 1900', 61, 14 ],
  [ '2 Mar 1900', 62, 14 ],

  // weekdays
  [ 'Sunday 12 April 1984', 30784, 14 ],
  [ 'Monday 12 April 1984', 30784, 14 ],
  [ 'Tuesday 12 April 1984', 30784, 14 ],
  [ 'Wednesday 12 April 1984', 30784, 14 ],
  [ 'Thursday 12 April 1984', 30784, 14 ],
  [ 'Friday 12 April 1984', 30784, 14 ],
  [ 'Saturday 12 April 1984', 30784, 14 ],
  [ 'Sun 12 April 1984', 30784, 14 ],
  [ 'Mon 12 April 1984', 30784, 14 ],
  [ 'Tue 12 April 1984', 30784, 14 ],
  [ 'Wed 12 April 1984', 30784, 14 ],
  [ 'Thu 12 April 1984', 30784, 14 ],
  [ 'Fri 12 April 1984', 30784, 14 ],
  [ 'Sat 12 April 1984', 30784, 14 ],
  [ 'Sunday 12 April 1984', 30784, 14 ],
  [ '12 Sunday April 1984', null, null ],
  [ '12 April Sunday 1984', null, null ],
  [ '12 April 1984 Sunday', 30784, 14 ],
  [ 'Thursday 12 April 1984', 30784, 14 ],
  [ '12 Thursday April 1984', null, null ],
  [ '12 April Thursday 1984', null, null ],
  [ '12 April 1984 Thursday', 30784, 14 ],
  [ 'Sun 12 April 1984', 30784, 14 ],
  [ '12 Sun April 1984', null, null ],
  [ '12 April Sun 1984', null, null ],
  [ '12 April 1984 Sun', 30784, 14 ],
  [ 'Thu 12 April 1984', 30784, 14 ],
  [ '12 Thu April 1984', null, null ],
  [ '12 April Thu 1984', null, null ],
  [ '12 April 1984 Thu', 30784, 14 ],
  [ 'Sun 82/October/6', 30230, 14 ],
  [ 'Sun/82/October/6', null, null ],
  [ '82/October/6 Sun', 30230, 14 ],
  [ '82/Sun/October/6', null, null ],
  [ 'Sunday, 12 April 1984', 30784, 14 ],
  [ '12. April, 1984, Sunday', 30784, 14 ],
  [ '12. April, 1984 Sunday', 30784, 14 ],
  [ 'Sunday, 12 April 1984 10:45', 30784.447916666668, 22 ],
  [ '12 April 1984 Sunday 10:45', 30784.447916666668, 22 ],
  [ '12 April 1984, Sunday 10:45', 30784.447916666668, 22 ],
  [ '12. April 1984', 30784, 14 ],
  [ '12. Apr. 1984', 30784, 14 ],
  [ '12, Apr, 1984', 30784, 14 ],
  [ '12- Apr- 1984', 30784, 14 ],
  [ '12 - Apr - 1984', 30784, 14 ],
  [ '12  -  Apr  -  1984', 30784, 14 ],

  // period as seprator
  [ '12.Apr.1984', 30784, 14 ],
  [ '12.4.1984', 31020, 14 ],
  [ '12. 1984', 31017, 17 ],
  [ '12.1984', 12.1984, null ], // value parsing has priority (see text below)

  // comma is not a "real" seprator, it demands a space following it
  [ '12,Apr,1984', null, null ],
  [ '12,4,1984', 1241984, 3 ], // value parsing has priority
  [ '12, 1984', 31017, 17 ],
  [ '12,1984', 121984, 3 ], // value parsing has priority

  // time
  [ '1 AM', 0.041666666666666664, 18 ],
  [ '01 AM', 0.041666666666666664, 18 ],
  [ '10 AM', 0.4166666666666667, 18 ],
  [ '10:11 AM', 0.42430555555555555, 18 ],
  [ '1:2 AM', 0.043055555555555555, 18 ],
  [ '01:02 AM', 0.043055555555555555, 18 ],
  [ '10:11:12 AM', 0.42444444444444446, 19 ],
  [ '01:02:03 AM', 0.043090277777777776, 19 ],
  [ '1:2:3 AM', 0.043090277777777776, 19 ],
  [ '24:11', 1.007638888888889, 20 ],
  [ '24:11:12', 1.0077777777777779, 21 ],
  [ '1:2', 0.043055555555555555, 20 ],
  [ '1:2 A', 0.043055555555555555, 18 ],
  [ '1:2 P', 0.5430555555555555, 18 ],
  [ '1 A', 0.041666666666666664, 18 ],
  [ '1 P', 0.5416666666666666, 18 ],
  [ '10:11:12.123', 0.42444586805555556, 21 ],
  [ '10:11:12.12', 0.42444583333333336, 21 ],
  [ '10:11:12.1', 0.4244456018518518, 21 ],
  [ 'AM 12:11', null, null ],
  [ 'AM 12', null, null ],
  [ '1:2AM', 0.043055555555555555, 18 ],
  [ '01:02AM', 0.043055555555555555, 18 ],
  [ '24:11:12 AM', null, null ],
  [ '10.456 AM', null, null ],
  [ '10:12.456', null, null ],
  [ '10:12:13.456', 0.4251557407407407, 21 ],
  [ '10:12:13.0123456789', 0.42515060585276504, 21 ],
  [ '00:00:00.0123456789', 0.00000014288980208333333, 21 ],
  [ '01:02:03', 0.043090277777777776, 21 ],
  [ '01:02:0', 0.043055555555555555, 21 ],
  [ '01:02:', 0.043055555555555555, 21 ],
  [ '01:02', 0.043055555555555555, 20 ],
  [ '01:0', 0.041666666666666664, 20 ],
  [ '01:', 0.041666666666666664, 21 ],

  [ '00:00 AM', 0, 18 ],
  [ '01:00 AM', 0.041666666666666664, 18 ],
  [ '02:00 AM', 0.08333333333333333, 18 ],
  [ '03:00 AM', 0.125, 18 ],
  [ '04:00 AM', 0.16666666666666666, 18 ],
  [ '05:00 AM', 0.20833333333333334, 18 ],
  [ '06:00 AM', 0.25, 18 ],
  [ '07:00 AM', 0.2916666666666667, 18 ],
  [ '08:00 AM', 0.3333333333333333, 18 ],
  [ '09:00 AM', 0.375, 18 ],
  [ '10:00 AM', 0.4166666666666667, 18 ],
  [ '11:00 AM', 0.4583333333333333, 18 ],
  [ '12:00 AM', 0, 18 ],
  [ '12:59 AM', 0.04097222222222222, 18 ],
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
  [ '00:00 PM', 0.5, 18 ],
  [ '01:00 PM', 0.5416666666666666, 18 ],
  [ '02:00 PM', 0.5833333333333334, 18 ],
  [ '03:00 PM', 0.625, 18 ],
  [ '04:00 PM', 0.6666666666666666, 18 ],
  [ '05:00 PM', 0.7083333333333334, 18 ],
  [ '06:00 PM', 0.75, 18 ],
  [ '07:00 PM', 0.7916666666666666, 18 ],
  [ '08:00 PM', 0.8333333333333334, 18 ],
  [ '09:00 PM', 0.875, 18 ],
  [ '10:00 PM', 0.9166666666666666, 18 ],
  [ '11:00 PM', 0.9583333333333334, 18 ],
  [ '12:00 PM', 0.5, 18 ],
  [ '12:59 PM', 0.5409722222222222, 18 ],
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
  [ '1984-09-10 11:12:13.1234', 30935.46681855787, 22 ],
  [ '07/05/1984 07:00 AM', 30868.291666666668, 22 ],

  // whitespace
  [ ' -12.34 ', -12.34, null ],
  [ ' 07/05/1984 ', 30868, 14 ],
  [ ' 07/05/1984 07:00 AM ', 30868.291666666668, 22 ],
  [ ' 07:00 AM ', 0.2916666666666667, 18 ],

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

describe('parseValue: NUMFMT mode', () => {
  describe('parseValue functions correctly', () => {
    process.env.TZ = 'Asia/Calcutta';
    expect(getTimeZoneName(), 'Timezone is IST').toBe('India Standard Time');

    expect(
      parseNumber('-123', { mode: 1 }),
      'parseNumber parses numbers'
    ).toEqual({ value: -123 });
    expect(
      parseNumber('1999.10.01', { mode: 1 }),
      'parseNumber does not parse invalid numbers'
    ).toEqual(undefined);
    expect(
      parseNumber('1999-10-01', { mode: 1 }),
      'parseNumber does not parse non-numbers'
    ).toEqual(undefined);

    expect(
      parseDate('1999-10-01 12:00:00', { mode: 1 }),
      'parseDate parses dates'
    ).toEqual({ value: 36434.5, formatId: 22 });
    expect(
      parseDate('-123', { mode: 1 }),
      'parseDate does not parse non-dates'
    ).toEqual(undefined);

    expect(
      parseTime('09:18 PM', { mode: 1 }),
      'parseTime parses time'
    ).toEqual({ value: 0.8875, formatId: 18 });
    expect(
      parseTime('-123', { mode: 1 }),
      'parseTime does not parse non-time'
    ).toEqual(undefined);

    expect(
      parseBool('False', { mode: 1 }),
      'parseBool parses booleans'
    ).toEqual({ value: false });
    expect(
      parseBool('-123', { mode: 1 }),
      'parseBool does not parse non-booleans'
    ).toEqual(undefined);

    expect(
      parseBool('False', { mode: 1 }),
      'parseBool parses booleans'
    ).toEqual({ value: false });
    expect(
      parseBool('-123', { mode: 1 }),
      'parseBool does not parse non-booleans'
    ).toEqual(undefined);

    expect(
      parseDate('5.2022', { mode: 1 }),
      'parseDate does not parse "decimals"'
    ).toEqual(undefined);

    // test value parsing
    for (const ts of tests) {
      const [ input, value ] = ts;
      test(`value parses: ${JSON.stringify(input)}`, () => {
        const p = parseValue(input, { mode: 1 });
        if (p == null) {
          expect(null, input).toBe(value);
        }
        else {
          expect(p.value, `valueOf("${input}")`).toBe(value);
        }
      });
    }

    // test format selection
    for (const ts of tests) {
      const [ input, , expectedZ ] = ts;
      test(`format parses: ${JSON.stringify(input)}`, () => {
        const p = parseValue(input, { mode: 1 });
        if (p == null) {
          expect(null, input).toBe(expectedZ);
        }
        else {
          expect(p.formatId ?? null, `formatOf("${input}")`).toBe(expectedZ);
        }
      });
    }
  });

  test('parseNumber locale support', () => {
    // can parse numbers in any language
    expect(parseNumber('1,234,567.89', { locale: 'en', mode: 1 })).toEqual({ value: 1234567.89, formatId: 4 });
    expect(parseNumber('1.234.567,89', { locale: 'en', mode: 1 })).toEqual(undefined);

    expect(parseNumber('1,234,567.89', { locale: 'de', mode: 1 })).toEqual(undefined);
    expect(parseNumber('1.234.567,89', { locale: 'de', mode: 1 })).toEqual({ value: 1234567.89, formatId: 4 });

    expect(parseNumber('1,234,567.89', { locale: 'de', mode: 1 })).toEqual(undefined);
    expect(parseNumber('1.234.567,89', { locale: 'de', mode: 1 })).toEqual({ value: 1234567.89, formatId: 4 });

    addLocale({
      decimal: '·',
      group: '~',
      positive: 'ᐩ',
      negative: '÷',
      percent: '٪',
      exponent: 'X'
    }, 'xy');
    // expect(format(4, 1234567.89, { locale: 'xy', mode: 1 })).toBe('1~234~567·89');
    expect(parseNumber('1~234~567·89', { locale: 'xy', mode: 1 })).toEqual({ value: 1234567.89, formatId: 4 });
    expect(parseNumber('1\u202f234\u202f567,89', { locale: 'fr', mode: 1 })).toEqual({ value: 1234567.89, formatId: 4 });
    expect(parseNumber('1٬234٬567٫89', { locale: 'ar', mode: 1 })).toEqual({ value: 1234567.89, formatId: 4 });
  });

  test('parseDate locale support', () => {
    // can parse dates in any language
    expect(parseDate('Wednesday, 13. march 1989', { locale: 'en', mode: 1 })).toEqual({ value: 32580, formatId: 14 });
    expect(parseDate('sreda, 13. marec 1989', { locale: 'sl', mode: 1 })).toEqual({ value: 32580, formatId: 14 });
    expect(parseDate('miðvikudagur, 13. mars 1989', { locale: 'is', mode: 1 })).toEqual({ value: 32580, formatId: 14 });

    expect(parseDate('Fri, 23 Dec 1988', { locale: 'en', mode: 1 })).toEqual({ value: 32500, formatId: 14 });
    expect(parseDate('Fös, 23 DES 1988', { locale: 'is', mode: 1 })).toEqual({ value: 32500, formatId: 14 });
    expect(parseDate('vin, 23 dec 1988', { locale: 'ro', mode: 1 })).toEqual({ value: 32500, formatId: 14 });

    expect(parseDate('31/febrero/27', { locale: 'es_UY', mode: 1 })).toEqual({ value: 11381, formatId: 14 });

    expect(parseDate('kedd 29 február 1916', { locale: 'hu', mode: 1 })).toEqual({ value: 5904, formatId: 14 });
    expect(parseDate('01 oct 1975', { locale: 'eb', mode: 1 })).toEqual({ value: 27668, formatId: 14 });

    const fm = [
      'dddd d mmmm yyyy',
      'ddd d mmmm yyyy',
      'd mmmm yyyy ddd',
      'dddd, d mmmm yyyy',
      'd mmmm yyyy, dddd hh:mm',
      'd - mmm - yyyy',
      'd.mmm.yyyy',
      'm.d.yyyy',
      'm. yyyy',
      'yyyy/mmmm',
      'mmmm/yy',
      'yy/mmmm/d'
    ];
    const loc = listLocales().filter(l => l !== 'xx' && l !== 'xy');
    for (const l of loc) {
      const opt = { locale: l, mode: 1 };
      for (const f of fm) {
        const o = format(f, 3290.1278435, opt);
        const parsed = parseDate(o, opt);
        expect(!!parsed, `Locale: "${f}" in ${l} (${o})`).toBeTruthy();
      }
      // locales with preferMDY should allow dates that fit, else only allow DMY
      const MDY = !getLocale(l)?.format?.dateOrder;
      if (MDY) {
        expect(parseDate('07/05/82', opt), `${l} prefers MDY (07/05/82)`).toEqual({ value: 30137, formatId: 14 });
        expect(parseDate('31/05/82', opt), `${l} prefers MDY (31/05/82)`).toEqual(undefined);
        expect(parseDate('05/31/82', opt), `${l} prefers MDY (05/31/82)`).toEqual({ value: 30102, formatId: 14 });
      }
      else {
        expect(parseDate('07/05/82', opt), `${l} prefers DMY (07/05/82)`).toEqual({ value: 30078, formatId: 14 });
        expect(parseDate('07/31/82', opt), `${l} prefers DMY (07/31/82)`).toEqual(undefined);
        expect(parseDate('31/05/82', opt), `${l} prefers MDY (31/05/82)`).toEqual({ value: 30102, formatId: 14 });
      }
    }
  });

  test('parseTime locale support', () => {
    expect(parseTime('01:31 a', { locale: 'fi', mode: 1 }), 'fi: 01:31 a').toEqual({ value: 0.06319444444444444, formatId: 18 });
    expect(parseTime('01:31 am', { locale: 'fi', mode: 1 }), 'fi: 01:31 am').toEqual({ value: 0.06319444444444444, formatId: 18 });
    expect(parseTime('01:31 ap.', { locale: 'fi', mode: 1 }), 'fi: 01:31 ap.').toEqual({ value: 0.06319444444444444, formatId: 18 });
    expect(parseTime('01:31 ap', { locale: 'fi', mode: 1 }), 'fi: 01:31 ap').toEqual({ value: 0.06319444444444444, formatId: 18 });
    expect(parseTime('01:31 a', { locale: 'is', mode: 1 }), 'is: 01:31 a').toEqual({ value: 0.06319444444444444, formatId: 18 });
    expect(parseTime('01:31 am', { locale: 'is', mode: 1 }), 'is: 01:31 am').toEqual({ value: 0.06319444444444444, formatId: 18 });
    expect(parseTime('01:31 fh', { locale: 'is', mode: 1 }), 'is: 01:31 fh').toEqual({ value: 0.06319444444444444, formatId: 18 });
    expect(parseTime('01:31 fh.', { locale: 'is', mode: 1 }), 'is: 01:31 fh.').toEqual({ value: 0.06319444444444444, formatId: 18 });
    expect(parseTime('01:31 f.h.', { locale: 'is', mode: 1 }), 'is: 01:31 f.h.').toEqual({ value: 0.06319444444444444, formatId: 18 });
    expect(parseTime('01:31 f. h.', { locale: 'is', mode: 1 }), 'is: 01:31 f. h.').toEqual({ value: 0.06319444444444444, formatId: 18 });
  });

  test('parseBool locale support', () => {
    expect(parseBool('TRUE', { locale: 'en', mode: 1 }), 'en: TRUE').toEqual({ value: true });
    expect(parseBool('FALSE', { locale: 'en', mode: 1 }), 'en: FALSE').toEqual({ value: false });
    expect(parseBool('TRUE', { locale: 'jn', mode: 1 }), 'jn: TRUE').toEqual({ value: true });
    expect(parseBool('FALSE', { locale: 'jn', mode: 1 }), 'jn: FALSE').toEqual({ value: false });
    expect(parseBool('TRUE', { locale: 'hu', mode: 1 }), 'hu: TRUE').toEqual({ value: true });
    expect(parseBool('FALSE', { locale: 'hu', mode: 1 }), 'hu: FALSE').toEqual({ value: false });
    expect(parseBool('IGAZ', { locale: 'hu', mode: 1 }), 'hu: IGAZ').toEqual({ value: true });
    expect(parseBool('HAMIS', { locale: 'hu', mode: 1 }), 'hu: HAMIS').toEqual({ value: false });
  });

  test('all parsers default to en-US when no locale is given', () => {
    const mode1 = { mode: 1 };
    expect(parseDate('07/05/82', mode1), 'parseDate: 07/05/82').toEqual({ value: 30137, formatId: 14 });
    expect(parseValue('07/05/82', mode1), 'parseValue: 07/05/82').toEqual({ value: 30137, formatId: 14 });
    expect(parseDate('05/31/82', mode1), 'parseDate: 05/31/82').toEqual({ value: 30102, formatId: 14 });
    expect(parseDate('31/05/82', mode1), 'parseDate: 31/05/82').toBe(undefined);

    const enUS = { locale: 'en-US', mode: 1 };
    const inputs = [
      '07/05/82', '31/05/82', '5/15', 'Apr 23', 'Apr 23, 2021', '12/31/2024 14:30',
      '1,234.5', '1.234,5', '$5', '10%', '9:30 PM', '13:30', 'TRUE', 'FALSE'
    ];
    for (const input of inputs) {
      expect(parseValue(input, mode1), `parseValue: ${input}`).toEqual(parseValue(input, enUS));
      expect(parseNumber(input, mode1), `parseNumber: ${input}`).toEqual(parseNumber(input, enUS));
      expect(parseDate(input, mode1), `parseDate: ${input}`).toEqual(parseDate(input, enUS));
      expect(parseTime(input, mode1), `parseTime: ${input}`).toEqual(parseTime(input, enUS));
      expect(parseBool(input, mode1), `parseBool: ${input}`).toEqual(parseBool(input, enUS));
    }
  });
});
