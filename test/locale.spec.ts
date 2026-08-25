import { expect, test } from 'vitest';
import { addLocale, format } from '../lib/index.js';

const date = 3290.1278435; // 1909-01-02 03:04:05.678

test('locale options', () => {
  // default locale
  expect(format('dddd, dd. mmmm yyy', date)).toBe('Saturday, 02. January 1909');

  // General is localized
  addLocale({
    decimal: '·',
    positive: 'ᐩ',
    negative: '÷',
    percent: '٪',
    exponent: 'X'
  }, 'xx');
  expect(format('General', 123456700000000, { locale: 'xx' })).toBe('1·23457Xᐩ14');
  expect(format('General', 10000000000, { locale: 'xx' })).toBe('10000000000');
  expect(format('General', 0.000000001, { locale: 'xx' })).toBe('0·000000001');
  expect(format('General', 1234.56, { locale: 'xx' })).toBe('1234·56');
  expect(format('General', 0.1, { locale: 'xx' })).toBe('0·1');

  // general should respect locale in all cases
  expect(format('General', 0.0001, { locale: 'de' })).toBe('0,0001');
  expect(format('General', 10000000000, { locale: 'de' })).toBe('10000000000');
  expect(format('General', 1.1, { locale: 'de' })).toBe('1,1');
  expect(format('General', 1.1, { locale: 'de' })).toBe('1,1');
  expect(format('General', 1000000000.1, { locale: 'de' })).toBe('1000000000');
  expect(format('General', 1.1111111111, { locale: 'de' })).toBe('1,111111111');
  expect(format('General', 1.1e-9, { locale: 'de' })).toBe('1,1E-09');
  expect(format('General', 1.1e-10, { locale: 'de' })).toBe('1,1E-10');
  expect(format('General', 1.1e-10, { locale: 'de' })).toBe('1,1E-10');

  // #59
  expect(format('General', 111.1111111, { locale: 'de' })).toBe('111,1111111');
  expect(format('General', 111.11111111, { locale: 'de' })).toBe('111,1111111');
  expect(format('General', 111.111111111, { locale: 'de' })).toBe('111,1111111');

  // different locale address modes (both is-IS and is_IS are supported)
  expect(format('[$-is]dddd, dd. mmmm yyy', date)).toBe('laugardagur, 02. janúar 1909');
  expect(format('[$-is_IS]dddd, dd. mmmm yyy', date)).toBe('laugardagur, 02. janúar 1909');
  expect(format('[$-is_IS]dddd, dd. mmmm yyy', date)).toBe('laugardagur, 02. janúar 1909');
  expect(format('[$-is_IS]dddd, dd. mmmm yyy', date)).toBe('laugardagur, 02. janúar 1909');
  expect(format('[$-is-IS]dddd, dd. mmmm yyy', date)).toBe('laugardagur, 02. janúar 1909');
  expect(format('[$-040F]dddd, dd. mmmm yyy', date)).toBe('laugardagur, 02. janúar 1909');
  expect(format('[$-01040F]dddd, dd. mmmm yyy', date)).toBe('laugardagur, 02. janúar 1909');
  expect(format('[$-00040F]dddd, dd. mmmm yyy', date)).toBe('laugardagur, 02. janúar 1909');
  expect(format('[$-0000040F]dddd, dd. mmmm yyy', date)).toBe('laugardagur, 02. janúar 1909');
  expect(format('[$-0101040F]dddd, dd. mmmm yyy', date)).toBe('laugardagur, 02. janúar 1909');
  expect(format('dddd, dd. mmmm yyy', date, { locale: 'is' })).toBe('laugardagur, 02. janúar 1909');
  // setting a locale does not overwrite the format locale
  expect(format('[$-040F]dddd, dd. mmmm yyy', date, { locale: 'fr' })).toBe('laugardagur, 02. janúar 1909');

  // all types are present
  expect(format('d dd ddd dddd ddddd', date, { locale: 'is' })).toBe('2 02 lau. laugardagur laugardagur');
  expect(format('m mm mmm mmmm mmmmm', date, { locale: 'is' })).toBe('1 01 jan. janúar j');
  expect(format('#,##0.000', date, { locale: 'is' })).toBe('3.290,128');
  expect(format('h AM/PM', date, { locale: 'is' })).toBe('3 f.h.');

  expect(format('d dd ddd dddd ddddd', date, { locale: 'zh-CH' })).toBe('2 02 周六 星期六 星期六');
  expect(format('m mm mmm mmmm mmmmm', date, { locale: 'zh-CH' })).toBe('1 01 1月 一月 一');
  expect(format('#,##0.000', date, { locale: 'zh-CH' })).toBe('3,290.128');
  expect(format('h AM/PM', date, { locale: 'zh-CH' })).toBe('3 上午');

  expect(format('d dd ddd dddd ddddd', date, { locale: 0x0419 })).toBe('2 02 сб суббота суббота');
  expect(format('m mm mmm mmmm mmmmm', date, { locale: 0x0419 })).toBe('1 01 янв. января я');
  expect(format('#,##0.000', date, { locale: 0x0419 })).toBe('3\u00a0290,128');
  expect(format('h AM/PM', date, { locale: 0x0419 })).toBe('3 AM');

  // Currency
  expect(format('[$$-409]#,##0', 1234)).toBe('$1,234');
  expect(format('#,##0\\ [$kr-438]', 1234)).toBe('1,234 kr');
  expect(format('[$ISK] #,##0', 1234)).toBe('ISK 1,234');
  expect(format('[$ISK-] #,##0', 1234)).toBe('ISK 1,234');
  expect(format('[$NZ$-481]#,##0', 1234)).toBe('NZ$1,234');
  expect(format('[$whatever is here just gets through] #,##0', 1234)).toBe('whatever is here just gets through 1,234');

  // Hijri month names are emitted
  expect(format('[$-060409]mmmm', 42999)).toBe('Muharram');
  expect(format('[$-060409]mmmm', 43029)).toBe('Safar');
  expect(format('[$-060409]mmmm', 43058)).toBe('Rabiʻ I');
  expect(format('[$-060409]mmmm', 43088)).toBe('Rabiʻ II');
  expect(format('[$-060409]mmmm', 43118)).toBe('Jumada I');
  expect(format('[$-060409]mmmm', 43148)).toBe('Jumada II');
  expect(format('[$-060409]mmmm', 43177)).toBe('Rajab');
  expect(format('[$-060409]mmmm', 43207)).toBe('Shaʻban');
  expect(format('[$-060409]mmmm', 43237)).toBe('Ramadan');
  expect(format('[$-060409]mmmm', 43266)).toBe('Shawwal');
  expect(format('[$-060409]mmmm', 43295)).toBe('Dhuʻl-Qiʻdah');
  expect(format('[$-060409]mmmm', 43324)).toBe('Dhuʻl-Hijjah');

  expect(format('[$Fr.-807] #,##0.00', 12345.67)).toBe('Fr. 12\'345.67');

  // TODO: names for hijri months
  // Next test is known to be incorrect, Excel emits "1439 محرم 1"
  expect(format('B2yyyy mmmm d', 42999), 'B2yyyy mmmm d').toBe('1439 Muharram 1');

  expect(format('[$-060409]yyyy mmmm d', 42999), '[$-060409]yyyy mmmm d').toBe('1439 Muharram 1');
  expect(format('[$-060C01]yyyy mmmm d', 42999), '[$-060C01]yyyy mmmm d').toBe('1439 رمضان 1');
  expect(format('[$-010C01]yyyy mmmm d', 42999), '[$-010C01]yyyy mmmm d').toBe('2017 سبتمبر 21');

  expect(format('[$-0409]B2yyyy mmmm d', 42999), '[$-0409]yyyy mmmm d').toBe('2017 September 21');

  expect(format('General', true, { locale: 'en' })).toBe('TRUE');
  expect(format('General', false, { locale: 'en' })).toBe('FALSE');
  expect(format('General', true, { locale: 'fr' })).toBe('VRAI');
  expect(format('General', false, { locale: 'fr' })).toBe('FAUX');
  expect(format('General', true, { locale: 'is' })).toBe('TRUE');
  expect(format('General', false, { locale: 'is' })).toBe('FALSE');
  expect(format('General', true, { locale: 'nl' })).toBe('WAAR');
  expect(format('General', false, { locale: 'nl' })).toBe('ONWAAR');
});

