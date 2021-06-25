import test from 'tape';
import fmt from '../lib';

const date = 3290.1278435; // 1909-01-02 03:04:05.678

test(t => {
  // default locale
  t.is(fmt('dddd, dd. mmmm yyy')(date), 'Saturday, 02. January 1909');

  // General is localized
  fmt.addLocale({
    decimal: '·',
    positive: 'ᐩ',
    negative: '÷',
    percent: '٪',
    exponent: 'X'
  }, 'xx');
  t.is(fmt('General', { locale: 'xx' })(123456700000000), '1·23457Xᐩ14');
  t.is(fmt('General', { locale: 'xx' })(10000000000), '10000000000');
  t.is(fmt('General', { locale: 'xx' })(0.000000001), '0·000000001');
  t.is(fmt('General', { locale: 'xx' })(1234.56), '1234·56');
  t.is(fmt('General', { locale: 'xx' })(0.1), '0·1');

  // different locale address modes (is-IS is not supported)
  t.is(fmt('[$-is]dddd, dd. mmmm yyy')(date), 'laugardagur, 02. janúar 1909');
  t.is(fmt('[$-is_IS]dddd, dd. mmmm yyy')(date), 'laugardagur, 02. janúar 1909');
  t.is(fmt('[$-is_IS]dddd, dd. mmmm yyy')(date), 'laugardagur, 02. janúar 1909');
  t.is(fmt('[$-is_IS]dddd, dd. mmmm yyy')(date), 'laugardagur, 02. janúar 1909');
  t.is(fmt('[$-040F]dddd, dd. mmmm yyy')(date), 'laugardagur, 02. janúar 1909');
  t.is(fmt('[$-01040F]dddd, dd. mmmm yyy')(date), 'laugardagur, 02. janúar 1909');
  t.is(fmt('[$-00040F]dddd, dd. mmmm yyy')(date), 'laugardagur, 02. janúar 1909');
  t.is(fmt('[$-0000040F]dddd, dd. mmmm yyy')(date), 'laugardagur, 02. janúar 1909');
  t.is(fmt('[$-0101040F]dddd, dd. mmmm yyy')(date), 'laugardagur, 02. janúar 1909');
  t.is(fmt('dddd, dd. mmmm yyy', { locale: 'is' })(date), 'laugardagur, 02. janúar 1909');
  t.is(fmt.format('dddd, dd. mmmm yyy', date, 'is'), 'laugardagur, 02. janúar 1909');
  // setting a locale does not overwrite the format locale
  t.is(fmt('[$-040F]dddd, dd. mmmm yyy', { locale: 'fr' })(date), 'laugardagur, 02. janúar 1909');

  // all types are present
  t.is(fmt('d dd ddd dddd ddddd', { locale: 'is' })(date), '2 02 lau. laugardagur laugardagur');
  t.is(fmt('m mm mmm mmmm mmmmm', { locale: 'is' })(date), '1 01 jan. janúar j');
  t.is(fmt('#,##0.000', { locale: 'is' })(date), '3.290,128');
  t.is(fmt('h AM/PM', { locale: 'is' })(date), '3 f.h.');

  t.is(fmt('d dd ddd dddd ddddd', { locale: 'zh-CH' })(date), '2 02 周六 星期六 星期六');
  t.is(fmt('m mm mmm mmmm mmmmm', { locale: 'zh-CH' })(date), '1 01 1月 一月 一');
  t.is(fmt('#,##0.000', { locale: 'zh-CH' })(date), '3,290.128');
  t.is(fmt('h AM/PM', { locale: 'zh-CH' })(date), '3 上午');

  t.is(fmt('d dd ddd dddd ddddd', { locale: 0x0419 })(date), '2 02 сб суббота суббота');
  t.is(fmt('m mm mmm mmmm mmmmm', { locale: 0x0419 })(date), '1 01 янв. января я');
  t.is(fmt('#,##0.000', { locale: 0x0419 })(date), '3 290,128');
  t.is(fmt('h AM/PM', { locale: 0x0419 })(date), '3 AM');

  // Currency
  t.is(fmt('[$$-409]#,##0')(1234), '$1,234');
  t.is(fmt('#,##0\\ [$kr-438]')(1234), '1,234 kr');
  t.is(fmt('[$ISK] #,##0')(1234), 'ISK 1,234');
  t.is(fmt('[$ISK-] #,##0')(1234), 'ISK 1,234');
  t.is(fmt('[$NZ$-481]#,##0')(1234), 'NZ$1,234');
  t.is(fmt('[$whatever is here just gets through] #,##0')(1234), 'whatever is here just gets through 1,234');

  // Hijri month names are emitted
  t.is(fmt('[$-060409]mmmm')(42999), 'Muharram', '[$-060409]mmmm');
  t.is(fmt('[$-060409]mmmm')(43029), 'Safar', '[$-060409]mmmm');
  t.is(fmt('[$-060409]mmmm')(43058), 'Rabiʻ I', '[$-060409]mmmm');
  t.is(fmt('[$-060409]mmmm')(43088), 'Rabiʻ II', '[$-060409]mmmm');
  t.is(fmt('[$-060409]mmmm')(43118), 'Jumada I', '[$-060409]mmmm');
  t.is(fmt('[$-060409]mmmm')(43148), 'Jumada II', '[$-060409]mmmm');
  t.is(fmt('[$-060409]mmmm')(43177), 'Rajab', '[$-060409]mmmm');
  t.is(fmt('[$-060409]mmmm')(43207), 'Shaʻban', '[$-060409]mmmm');
  t.is(fmt('[$-060409]mmmm')(43237), 'Ramadan', '[$-060409]mmmm');
  t.is(fmt('[$-060409]mmmm')(43266), 'Shawwal', '[$-060409]mmmm');
  t.is(fmt('[$-060409]mmmm')(43295), 'Dhuʻl-Qiʻdah', '[$-060409]mmmm');
  t.is(fmt('[$-060409]mmmm')(43324), 'Dhuʻl-Hijjah', '[$-060409]mmmm');

  // TODO: names for hijri months
  // Next test is incorrect, excel actually shows "1439 محرم 1"
  t.is(fmt('B2yyyy mmmm d')(42999), '1439 Muharram 1', 'B2yyyy mmmm d');
  t.is(fmt('[$-060409]yyyy mmmm d')(42999), '1439 Muharram 1', '[$-060409]yyyy mmmm d');
  t.is(fmt('[$-0409]B2yyyy mmmm d')(42999), '2017 September 21', '[$-0409]yyyy mmmm d');

  t.end();
});

