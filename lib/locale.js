import codeToLocale from './codeToLocale.js';

// Locale: [language[_territory][.codeset][@modifier]]
const re_locale = /^([a-z\d]+)(?:[_-]([a-z\d]+))?(?:\.([a-z\d]+))?(?:@([a-z\d]+))?$/i;
const locales = {};

/**
 * @typedef {object} LocaleData
 *   An object of properties used by a formatter when printing a number in a certain locale.
 * @property {string} group - Symbol used as a grouping separator (`1,000,000` uses `,`)
 * @property {string} decimal - Symbol used to separate integers from fractions (usually `.`)
 * @property {string} positive - Symbol used to indicate positive numbers (usually `+`)
 * @property {string} negative - Symbol used to indicate positive numbers (usually `-`)
 * @property {string} percent - Symbol used to indicate a percentage (usually `%`)
 * @property {string} exponent - Symbol used to indicate an exponent (usually `E`)
 * @property {string} nan - Symbol used to indicate NaN values (`NaN`)
 * @property {string} infinity - Symbol used to indicate infinite values (`∞`)
 * @property {Array<string>} ampm - How AM and PM should be presented
 * @property {Array<string>} mmmm6 - Long month names for the Islamic calendar (`Rajab`)
 * @property {Array<string>} mmm6 - Short month names for the Islamic calendar (`Raj.`)
 * @property {Array<string>} mmmm - Long month names for the Gregorian calendar (`November`)
 * @property {Array<string>} mmm - Short month names for the Gregorian calendar (`Nov`)
 * @property {Array<string>} dddd - Long day names (`Wednesday`)
 * @property {Array<string>} ddd - Shortened day names (`Wed`)
 */

const defaultData = {
  group: ' ',
  decimal: '.',
  positive: '+',
  negative: '-',
  percent: '%',
  exponent: 'E',
  nan: 'NaN',
  infinity: '∞',
  ampm: [ 'AM', 'PM' ],
  mmmm6: [ 'Muharram', 'Safar', 'Rabiʻ I', 'Rabiʻ II', 'Jumada I', 'Jumada II', 'Rajab', 'Shaʻban', 'Ramadan', 'Shawwal', 'Dhuʻl-Qiʻdah', 'Dhuʻl-Hijjah' ],
  mmm6: [ 'Muh.', 'Saf.', 'Rab. I', 'Rab. II', 'Jum. I', 'Jum. II', 'Raj.', 'Sha.', 'Ram.', 'Shaw.', 'Dhuʻl-Q.', 'Dhuʻl-H.' ],
  mmmm: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
  mmm: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
  dddd: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
  ddd: [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ]
};

/**
 * @typedef {object} LocaleToken - An object of properties for a locale tag.
 * @property {string} lang - The basic tag such as `zh_CN` or `fi`
 * @property {string} language - The language section (`zh` for `zh_CN`)
 * @property {string} territory - The territory section (`CN` for `zh_CN`)
 */

/**
 * Parse a regular IETF BCP 47 locale tag and emit an object of its parts.
 * Irregular tags and subtags are not supported.
 *
 * @param {string} locale - A BCP 47 string tag of the locale.
 * @returns {LocaleToken} - An object describing the locale.
 */
export function parseLocale (locale) {
  const lm = re_locale.exec(locale);
  if (!lm) {
    throw new SyntaxError(`Malformed locale: ${locale}`);
  }
  return {
    lang: lm[1] + (lm[2] ? '_' + lm[2] : ''),
    language: lm[1],
    territory: lm[2] || ''
  };
}

// MS code format is: aabbcccc [$-aabbcccc]
// aa = numerical style (optional, 00 if absent)
// bb = calendar format (optional, 00 if absent)
// cc = language code
export function resolveLocale (l4e) {
  if (typeof l4e === 'number') {
    return codeToLocale[l4e & 0xffff] || null;
  }
  const wincode = parseInt(l4e, 16);
  if (isFinite(wincode) && codeToLocale[wincode & 0xffff]) {
    return codeToLocale[wincode & 0xffff] || null;
  }
  if (re_locale.test(l4e)) {
    return l4e;
  }
  return null;
}

/**
 * Used by the formatter to pull a locate from its registered locales. If
 * subtag isn't available but the base language is, the base language is used.
 * So if `en-CA` is not found, the formatter tries to find `en` else it
 * returns a `null`.
 *
 * @param {string} locale - A BCP 47 string tag of the locale, or an Excel locale code.
 * @returns {LocaleData | null} - An object of format date properties.
 */
export function getLocale (locale) {
  const tag = resolveLocale(locale);
  let obj = null;
  if (tag) {
    const c = parseLocale(tag);
    obj = locales[c.lang] || locales[c.language] || null;
  }
  return obj;
}

// creates a new locale options object
export function createLocale (data) {
  return Object.assign({}, defaultData, data);
}

/**
 * Register locale data for a language so for use when formatting.
 *
 * Any partial set of properties may be returned to have the defaults used where properties are missing.
 *
 * @see {LocaleData}
 * @param {object} localeSettings - A collection of settings for a locale.
 * @param {string} [localeSettings.group="\u00a0"]
 *    Symbol used as a grouping separator (`1,000,000` uses `,`)
 * @param {string} [localeSettings.decimal="."]
 *    Symbol used to separate integers from fractions (usually `.`)
 * @param {string} [localeSettings.positive="+"]
 *    Symbol used to indicate positive numbers (usually `+`)
 * @param {string} [localeSettings.negative="-"]
 *    Symbol used to indicate positive numbers (usually `-`)
 * @param {string} [localeSettings.percent="%"]
 *    Symbol used to indicate a percentage (usually `%`)
 * @param {string} [localeSettings.exponent="E"]
 *    Symbol used to indicate an exponent (usually `E`)
 * @param {string} [localeSettings.nan="NaN"]
 *    Symbol used to indicate NaN values (`NaN`)
 * @param {string} [localeSettings.infinity="∞"]
 *    Symbol used to indicate infinite values (`∞`)
 * @param {Array<string>} [localeSettings.ampm=["AM","PM"]]
 *    How AM and PM should be presented.
 * @param {Array<string>} [localeSettings.mmmm6=["Muharram", "Safar", "Rabiʻ I", "Rabiʻ II", "Jumada I", "Jumada II", "Rajab", "Shaʻban", "Ramadan", "Shawwal", "Dhuʻl-Qiʻdah", "Dhuʻl-Hijjah"]]
 *    Long month names for the Islamic calendar (e.g. `Rajab`)
 * @param {Array<string>} [localeSettings.mmm6=["Muh.", "Saf.", "Rab. I", "Rab. II", "Jum. I", "Jum. II", "Raj.", "Sha.", "Ram.", "Shaw.", "Dhuʻl-Q.", "Dhuʻl-H."]]
 *    Short month names for the Islamic calendar (e.g. `Raj.`)
 * @param {Array<string>} [localeSettings.mmmm=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]]
 *    Long month names for the Gregorian calendar (e.g. `November`)
 * @param {Array<string>} [localeSettings.mmm=["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]]
 *    Short month names for the Gregorian calendar (e.g. `Nov`)
 * @param {Array<string>} [localeSettings.dddd=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]]
 *    Long day names (e.g. `Wednesday`)
 * @param {Array<string>} [localeSettings.ddd=["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]]
 *    Shortened day names (e.g. `Wed`)
 * @param {string} l4e - A string BCP 47 tag of the locale.
 * @returns {LocaleData} - A full collection of settings for a locale
 */
export function addLocale (localeSettings, l4e) {
  // parse language tag
  const c = typeof l4e === 'object' ? l4e : parseLocale(l4e);
  // add the language
  locales[c.lang] = createLocale(localeSettings);
  // if "xx_YY" is added also create "xx" if it is missing
  if (c.language !== c.lang && !locales[c.language]) {
    locales[c.language] = createLocale(localeSettings);
  }
  return locales[c.lang];
}

export const defaultLocale = createLocale({ group: ',' });
defaultLocale.isDefault = true;

addLocale({
  group: ',',
  ampm: [ '上午', '下午' ],
  mmmm: [ '一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月' ],
  mmm: [ '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月' ],
  dddd: [ '星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六' ],
  ddd: [ '周日', '周一', '周二', '周三', '周四', '周五', '周六' ]
}, 'zh_CN');
addLocale({
  group: ',',
  nan: '非數值',
  ampm: [ '上午', '下午' ],
  mmmm: [ '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月' ],
  mmm: [ '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月' ],
  dddd: [ '星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六' ],
  ddd: [ '週日', '週一', '週二', '週三', '週四', '週五', '週六' ]
}, 'zh_TW');
addLocale({
  group: ',',
  ampm: [ '午前', '午後' ],
  mmmm: [ '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月' ],
  mmm: [ '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月' ],
  dddd: [ '日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日' ],
  ddd: [ '日', '月', '火', '水', '木', '金', '土' ]
}, 'ja');
addLocale({
  group: ',',
  ampm: [ '오전', '오후' ],
  mmmm: [ '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월' ],
  mmm: [ '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월' ],
  dddd: [ '일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일' ],
  ddd: [ '일', '월', '화', '수', '목', '금', '토' ]
}, 'ko');
addLocale({
  group: ',',
  ampm: [ 'ก่อนเที่ยง', 'หลังเที่ยง' ],
  mmmm: [ 'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน', 'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม' ],
  mmm: [ 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.' ],
  dddd: [ 'วันอาทิตย์', 'วันจันทร์', 'วันอังคาร', 'วันพุธ', 'วันพฤหัสบดี', 'วันศุกร์', 'วันเสาร์' ],
  ddd: [ 'อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.' ]
}, 'th');
addLocale({
  decimal: ',',
  ampm: [ 'dop.', 'odp.' ],
  mmmm: [ 'ledna', 'února', 'března', 'dubna', 'května', 'června', 'července', 'srpna', 'září', 'října', 'listopadu', 'prosince' ],
  mmm: [ 'led', 'úno', 'bře', 'dub', 'kvě', 'čvn', 'čvc', 'srp', 'zář', 'říj', 'lis', 'pro' ],
  dddd: [ 'neděle', 'pondělí', 'úterý', 'středa', 'čtvrtek', 'pátek', 'sobota' ],
  ddd: [ 'ne', 'po', 'út', 'st', 'čt', 'pá', 'so' ]
}, 'cs');
addLocale({
  group: '.',
  decimal: ',',
  mmmm: [ 'januar', 'februar', 'marts', 'april', 'maj', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'december' ],
  mmm: [ 'jan.', 'feb.', 'mar.', 'apr.', 'maj', 'jun.', 'jul.', 'aug.', 'sep.', 'okt.', 'nov.', 'dec.' ],
  dddd: [ 'søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag' ],
  ddd: [ 'søn.', 'man.', 'tir.', 'ons.', 'tor.', 'fre.', 'lør.' ]
}, 'da');
addLocale({
  group: '.',
  decimal: ',',
  ampm: [ 'a.m.', 'p.m.' ],
  mmmm: [ 'januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december' ],
  mmm: [ 'jan.', 'feb.', 'mrt.', 'apr.', 'mei', 'jun.', 'jul.', 'aug.', 'sep.', 'okt.', 'nov.', 'dec.' ],
  dddd: [ 'zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag' ],
  ddd: [ 'zo', 'ma', 'di', 'wo', 'do', 'vr', 'za' ]
}, 'nl');
addLocale({ group: ',' }, 'en');
addLocale({
  decimal: ',',
  nan: 'epäluku',
  ampm: [ 'ap.', 'ip.' ],
  mmmm: [ 'tammikuuta', 'helmikuuta', 'maaliskuuta', 'huhtikuuta', 'toukokuuta', 'kesäkuuta', 'heinäkuuta', 'elokuuta', 'syyskuuta', 'lokakuuta', 'marraskuuta', 'joulukuuta' ],
  mmm: [ 'tammik.', 'helmik.', 'maalisk.', 'huhtik.', 'toukok.', 'kesäk.', 'heinäk.', 'elok.', 'syysk.', 'lokak.', 'marrask.', 'jouluk.' ],
  dddd: [ 'sunnuntaina', 'maanantaina', 'tiistaina', 'keskiviikkona', 'torstaina', 'perjantaina', 'lauantaina' ],
  ddd: [ 'su', 'ma', 'ti', 'ke', 'to', 'pe', 'la' ]
}, 'fi');
addLocale({
  group: ' ',
  decimal: ',',
  mmmm: [ 'janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre' ],
  mmm: [ 'janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.' ],
  dddd: [ 'dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi' ],
  ddd: [ 'dim.', 'lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.' ]
}, 'fr');
addLocale({
  group: '.',
  decimal: ',',
  mmmm: [ 'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember' ],
  mmm: [ 'Jan.', 'Feb.', 'März', 'Apr.', 'Mai', 'Juni', 'Juli', 'Aug.', 'Sept.', 'Okt.', 'Nov.', 'Dez.' ],
  dddd: [ 'Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag' ],
  ddd: [ 'So.', 'Mo.', 'Di.', 'Mi.', 'Do.', 'Fr.', 'Sa.' ]
}, 'de');
addLocale({
  group: '.',
  decimal: ',',
  ampm: [ 'π.μ.', 'μ.μ.' ],
  mmmm: [ 'Ιανουαρίου', 'Φεβρουαρίου', 'Μαρτίου', 'Απριλίου', 'Μαΐου', 'Ιουνίου', 'Ιουλίου', 'Αυγούστου', 'Σεπτεμβρίου', 'Οκτωβρίου', 'Νοεμβρίου', 'Δεκεμβρίου' ],
  mmm: [ 'Ιαν', 'Φεβ', 'Μαρ', 'Απρ', 'Μαΐ', 'Ιουν', 'Ιουλ', 'Αυγ', 'Σεπ', 'Οκτ', 'Νοε', 'Δεκ' ],
  dddd: [ 'Κυριακή', 'Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο' ],
  ddd: [ 'Κυρ', 'Δευ', 'Τρί', 'Τετ', 'Πέμ', 'Παρ', 'Σάβ' ]
}, 'el');
addLocale({
  decimal: ',',
  ampm: [ 'de.', 'du.' ],
  mmmm: [ 'január', 'február', 'március', 'április', 'május', 'június', 'július', 'augusztus', 'szeptember', 'október', 'november', 'december' ],
  mmm: [ 'jan.', 'febr.', 'márc.', 'ápr.', 'máj.', 'jún.', 'júl.', 'aug.', 'szept.', 'okt.', 'nov.', 'dec.' ],
  dddd: [ 'vasárnap', 'hétfő', 'kedd', 'szerda', 'csütörtök', 'péntek', 'szombat' ],
  ddd: [ 'V', 'H', 'K', 'Sze', 'Cs', 'P', 'Szo' ]
}, 'hu');
addLocale({
  group: '.',
  decimal: ',',
  ampm: [ 'f.h.', 'e.h.' ],
  mmmm: [ 'janúar', 'febrúar', 'mars', 'apríl', 'maí', 'júní', 'júlí', 'ágúst', 'september', 'október', 'nóvember', 'desember' ],
  mmm: [ 'jan.', 'feb.', 'mar.', 'apr.', 'maí', 'jún.', 'júl.', 'ágú.', 'sep.', 'okt.', 'nóv.', 'des.' ],
  dddd: [ 'sunnudagur', 'mánudagur', 'þriðjudagur', 'miðvikudagur', 'fimmtudagur', 'föstudagur', 'laugardagur' ],
  ddd: [ 'sun.', 'mán.', 'þri.', 'mið.', 'fim.', 'fös.', 'lau.' ]
}, 'is');
addLocale({
  group: '.',
  decimal: ',',
  mmmm: [ 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember' ],
  mmm: [ 'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des' ],
  dddd: [ 'Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu' ],
  ddd: [ 'Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab' ]
}, 'id');
addLocale({
  group: '.',
  decimal: ',',
  mmmm: [ 'gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre' ],
  mmm: [ 'gen', 'feb', 'mar', 'apr', 'mag', 'giu', 'lug', 'ago', 'set', 'ott', 'nov', 'dic' ],
  dddd: [ 'domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato' ],
  ddd: [ 'dom', 'lun', 'mar', 'mer', 'gio', 'ven', 'sab' ]
}, 'it');
addLocale({
  decimal: ',',
  ampm: [ 'a.m.', 'p.m.' ],
  mmmm: [ 'januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember' ],
  mmm: [ 'jan.', 'feb.', 'mar.', 'apr.', 'mai', 'jun.', 'jul.', 'aug.', 'sep.', 'okt.', 'nov.', 'des.' ],
  dddd: [ 'søndag', 'mandag', 'tirsdag', 'onsdag', 'torsdag', 'fredag', 'lørdag' ],
  ddd: [ 'søn.', 'man.', 'tir.', 'ons.', 'tor.', 'fre.', 'lør.' ]
}, 'nb');
addLocale({
  decimal: ',',
  mmmm: [ 'stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia' ],
  mmm: [ 'sty', 'lut', 'mar', 'kwi', 'maj', 'cze', 'lip', 'sie', 'wrz', 'paź', 'lis', 'gru' ],
  dddd: [ 'niedziela', 'poniedziałek', 'wtorek', 'środa', 'czwartek', 'piątek', 'sobota' ],
  ddd: [ 'niedz.', 'pon.', 'wt.', 'śr.', 'czw.', 'pt.', 'sob.' ]
}, 'pl');
addLocale({
  group: '.',
  decimal: ',',
  mmmm: [ 'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro' ],
  mmm: [ 'jan.', 'fev.', 'mar.', 'abr.', 'mai.', 'jun.', 'jul.', 'ago.', 'set.', 'out.', 'nov.', 'dez.' ],
  dddd: [ 'domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado' ],
  ddd: [ 'dom.', 'seg.', 'ter.', 'qua.', 'qui.', 'sex.', 'sáb.' ]
}, 'pt');
addLocale({
  decimal: ',',
  nan: 'не число',
  mmmm: [ 'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря' ],
  mmm: [ 'янв.', 'февр.', 'мар.', 'апр.', 'мая', 'июн.', 'июл.', 'авг.', 'сент.', 'окт.', 'нояб.', 'дек.' ],
  dddd: [ 'воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота' ],
  ddd: [ 'вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб' ]
}, 'ru');
addLocale({
  decimal: ',',
  mmmm: [ 'januára', 'februára', 'marca', 'apríla', 'mája', 'júna', 'júla', 'augusta', 'septembra', 'októbra', 'novembra', 'decembra' ],
  mmm: [ 'jan', 'feb', 'mar', 'apr', 'máj', 'jún', 'júl', 'aug', 'sep', 'okt', 'nov', 'dec' ],
  dddd: [ 'nedeľa', 'pondelok', 'utorok', 'streda', 'štvrtok', 'piatok', 'sobota' ],
  ddd: [ 'ne', 'po', 'ut', 'st', 'št', 'pi', 'so' ]
}, 'sk');
addLocale({
  group: '.',
  decimal: ',',
  ampm: [ 'a. m.', 'p. m.' ],
  mmmm: [ 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre' ],
  mmm: [ 'ene.', 'feb.', 'mar.', 'abr.', 'may.', 'jun.', 'jul.', 'ago.', 'sept.', 'oct.', 'nov.', 'dic.' ],
  dddd: [ 'domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado' ],
  ddd: [ 'dom.', 'lun.', 'mar.', 'mié.', 'jue.', 'vie.', 'sáb.' ]
}, 'es');
addLocale({
  decimal: ',',
  ampm: [ 'fm', 'em' ],
  mmmm: [ 'januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december' ],
  mmm: [ 'jan.', 'feb.', 'mars', 'apr.', 'maj', 'juni', 'juli', 'aug.', 'sep.', 'okt.', 'nov.', 'dec.' ],
  dddd: [ 'söndag', 'måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'lördag' ],
  ddd: [ 'sön', 'mån', 'tis', 'ons', 'tors', 'fre', 'lör' ]
}, 'sv');
addLocale({
  group: '.',
  decimal: ',',
  ampm: [ 'ÖÖ', 'ÖS' ],
  mmmm: [ 'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık' ],
  mmm: [ 'Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara' ],
  dddd: [ 'Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi' ],
  ddd: [ 'Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt' ]
}, 'tr');

