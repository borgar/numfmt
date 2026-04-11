import { test, expect } from 'vitest';
import { assertFormat } from './utils.ts';
import { addLocale } from '../lib/index.ts';

const date = 3290.1278435; // 1909-01-02 03:04:05.678

test('locale options', () => {
  expect.assertions(74);
  // default locale
  assertFormat('dddd, dd. mmmm yyy', date, 'Saturday, 02. January 1909');

  // General is localized
  addLocale({
    decimal: '·',
    positive: 'ᐩ',
    negative: '÷',
    percent: '٪',
    exponent: 'X'
  }, 'xx');
  assertFormat('General', 123456700000000, '1·23457Xᐩ14', { locale: 'xx' });
  assertFormat('General', 10000000000, '10000000000', { locale: 'xx' });
  assertFormat('General', 0.000000001, '0·000000001', { locale: 'xx' });
  assertFormat('General', 1234.56, '1234·56', { locale: 'xx' });
  assertFormat('General', 0.1, '0·1', { locale: 'xx' });

  // general should respect locale in all cases
  assertFormat('General', 0.0001, '0,0001', { locale: 'de' });
  assertFormat('General', 10000000000, '10000000000', { locale: 'de' });
  assertFormat('General', 1.1, '1,1', { locale: 'de' });
  assertFormat('General', 1.1, '1,1', { locale: 'de' });
  assertFormat('General', 1000000000.1, '1000000000', { locale: 'de' });
  assertFormat('General', 1.1111111111, '1,111111111', { locale: 'de' });
  assertFormat('General', 1.1e-9, '1,1E-09', { locale: 'de' });
  assertFormat('General', 1.1e-10, '1,1E-10', { locale: 'de' });
  assertFormat('General', 1.1e-10, '1,1E-10', { locale: 'de' });

  // #59
  assertFormat('General', 111.1111111, '111,1111111', { locale: 'de' });
  assertFormat('General', 111.11111111, '111,1111111', { locale: 'de' });
  assertFormat('General', 111.111111111, '111,1111111', { locale: 'de' });

  // different locale address modes (both is-IS and is_IS are supported)
  assertFormat('[$-is]dddd, dd. mmmm yyy', date, 'laugardagur, 02. janúar 1909');
  assertFormat('[$-is_IS]dddd, dd. mmmm yyy', date, 'laugardagur, 02. janúar 1909');
  assertFormat('[$-is_IS]dddd, dd. mmmm yyy', date, 'laugardagur, 02. janúar 1909');
  assertFormat('[$-is_IS]dddd, dd. mmmm yyy', date, 'laugardagur, 02. janúar 1909');
  assertFormat('[$-is-IS]dddd, dd. mmmm yyy', date, 'laugardagur, 02. janúar 1909');
  assertFormat('[$-040F]dddd, dd. mmmm yyy', date, 'laugardagur, 02. janúar 1909');
  assertFormat('[$-01040F]dddd, dd. mmmm yyy', date, 'laugardagur, 02. janúar 1909');
  assertFormat('[$-00040F]dddd, dd. mmmm yyy', date, 'laugardagur, 02. janúar 1909');
  assertFormat('[$-0000040F]dddd, dd. mmmm yyy', date, 'laugardagur, 02. janúar 1909');
  assertFormat('[$-0101040F]dddd, dd. mmmm yyy', date, 'laugardagur, 02. janúar 1909');
  assertFormat('dddd, dd. mmmm yyy', date, 'laugardagur, 02. janúar 1909', { locale: 'is' });
  // setting a locale does not overwrite the format locale
  assertFormat('[$-040F]dddd, dd. mmmm yyy', date, 'laugardagur, 02. janúar 1909', { locale: 'fr' });

  // all types are present
  assertFormat('d dd ddd dddd ddddd', date, '2 02 lau. laugardagur laugardagur', { locale: 'is' });
  assertFormat('m mm mmm mmmm mmmmm', date, '1 01 jan. janúar j', { locale: 'is' });
  assertFormat('#,##0.000', date, '3.290,128', { locale: 'is' });
  assertFormat('h AM/PM', date, '3 f.h.', { locale: 'is' });

  assertFormat('d dd ddd dddd ddddd', date, '2 02 周六 星期六 星期六', { locale: 'zh-CH' });
  assertFormat('m mm mmm mmmm mmmmm', date, '1 01 1月 一月 一', { locale: 'zh-CH' });
  assertFormat('#,##0.000', date, '3,290.128', { locale: 'zh-CH' });
  assertFormat('h AM/PM', date, '3 上午', { locale: 'zh-CH' });

  assertFormat('d dd ddd dddd ddddd', date, '2 02 сб суббота суббота', { locale: 0x0419 });
  assertFormat('m mm mmm mmmm mmmmm', date, '1 01 янв. января я', { locale: 0x0419 });
  assertFormat('#,##0.000', date, '3\u00a0290,128', { locale: 0x0419 });
  assertFormat('h AM/PM', date, '3 AM', { locale: 0x0419 });

  // Currency
  assertFormat('[$$-409]#,##0', 1234, '$1,234');
  assertFormat('#,##0\\ [$kr-438]', 1234, '1,234 kr');
  assertFormat('[$ISK] #,##0', 1234, 'ISK 1,234');
  assertFormat('[$ISK-] #,##0', 1234, 'ISK 1,234');
  assertFormat('[$NZ$-481]#,##0', 1234, 'NZ$1,234');
  assertFormat('[$whatever is here just gets through] #,##0', 1234, 'whatever is here just gets through 1,234');

  // Hijri month names are emitted
  assertFormat('[$-060409]mmmm', 42999, 'Muharram');
  assertFormat('[$-060409]mmmm', 43029, 'Safar');
  assertFormat('[$-060409]mmmm', 43058, 'Rabiʻ I');
  assertFormat('[$-060409]mmmm', 43088, 'Rabiʻ II');
  assertFormat('[$-060409]mmmm', 43118, 'Jumada I');
  assertFormat('[$-060409]mmmm', 43148, 'Jumada II');
  assertFormat('[$-060409]mmmm', 43177, 'Rajab');
  assertFormat('[$-060409]mmmm', 43207, 'Shaʻban');
  assertFormat('[$-060409]mmmm', 43237, 'Ramadan');
  assertFormat('[$-060409]mmmm', 43266, 'Shawwal');
  assertFormat('[$-060409]mmmm', 43295, 'Dhuʻl-Qiʻdah');
  assertFormat('[$-060409]mmmm', 43324, 'Dhuʻl-Hijjah');

  assertFormat('[$Fr.-807] #,##0.00', 12345.67, 'Fr. 12\'345.67');

  // TODO: names for hijri months
  // Next test is known to be incorrect, Excel emits "1439 محرم 1"
  assertFormat('B2yyyy mmmm d', 42999, '1439 Muharram 1');

  assertFormat('[$-060409]yyyy mmmm d', 42999, '1439 Muharram 1');
  assertFormat('[$-060C01]yyyy mmmm d', 42999, '1439 رمضان 1');
  assertFormat('[$-010C01]yyyy mmmm d', 42999, '2017 سبتمبر 21');

  assertFormat('[$-0409]B2yyyy mmmm d', 42999, '2017 September 21');

  assertFormat('General', true, 'TRUE', { locale: 'en' });
  assertFormat('General', false, 'FALSE', { locale: 'en' });
  assertFormat('General', true, 'VRAI', { locale: 'fr' });
  assertFormat('General', false, 'FAUX', { locale: 'fr' });
  assertFormat('General', true, 'TRUE', { locale: 'is' });
  assertFormat('General', false, 'FALSE', { locale: 'is' });
  assertFormat('General', true, 'WAAR', { locale: 'nl' });
  assertFormat('General', false, 'ONWAAR', { locale: 'nl' });
});
