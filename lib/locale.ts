import { codeToLocale } from './codeToLocale.ts';

// Locale: [language[_territory][.codeset][@modifier]]
const re_locale = /^([a-z\d]+)(?:[_-]([a-z\d]+))?(?:\.([a-z\d]+))?(?:@([a-z\d]+))?$/i;
const locales: Record<string, LocaleData> = {};

/**
 * A list of the names of the months of the year.
 */
export type MonthNames = [
  string, string, string, string, string, string, string, string, string, string, string, string
];
/**
 * A list of the names of the days of the week, starting with Sunday.
 */
export type DayNames = [ string, string, string, string, string, string, string ];

/**
 * An object of properties used by a formatter when printing a number in a certain locale.
 */
export type LocaleData = {
  /**
   * Symbol used as a grouping separator (`1,000,000` uses `,`).
   * @default "\u00a0"
   */
  group: string;
  /**
   * Symbol used to separate integers from fractions (usually `.`).
   * @default "."
   */
  decimal: string;
  /**
   * Symbol used to indicate positive numbers (usually `+`).
   * @default "+"
   */
  positive: string;
  /**
   * Symbol used to indicate positive numbers (usually `-`).
   * @default "-"
   */
  negative: string;
  /**
   * Symbol used to indicate a percentage (usually `%`).
   * @default "%"
   */
  percent: string;
  /**
   * Symbol used to indicate an exponent (usually `E`).
   * @default "E"
   */
  exponent: string;
  /**
   * Symbol used to indicate NaN values (`NaN`).
   * @default "NaN"
   */
  nan: string;
  /**
   * Symbol used to indicate infinite values (`∞`).
   * @default "∞"
   */
  infinity: string;
  /**
   * How AM and PM should be presented.
   * @default ["AM", "PM"]
   */
  ampm: [ string, string ];
  /**
   * Long month names for the Islamic calendar (`Rajab`).
   * @default ["Muharram", "Safar", "Rabiʻ I", "Rabiʻ II", "Jumada I", "Jumada II", "Rajab", "Shaʻban", "Ramadan", "Shawwal", "Dhuʻl-Qiʻdah", "Dhuʻl-Hijjah"]
   */
  mmmm6: MonthNames;
  /**
   * Short month names for the Islamic calendar (`Raj.`).
   * @default ["Muh.", "Saf.", "Rab. I", "Rab. II", "Jum. I", "Jum. II", "Raj.", "Sha.", "Ram.", "Shaw.", "Dhuʻl-Q.", "Dhuʻl-H."]
   */
  mmm6: MonthNames;
  /**
   * Long month names for the Gregorian calendar (`November`).
   * @default ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
   */
  mmmm: MonthNames;
  /**
   * Short month names for the Gregorian calendar (`Nov`).
   * @default ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
   */
  mmm: MonthNames;
  /**
   * Long day names (`Wednesday`).
   * @default ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
   */
  dddd: DayNames;
  /**
   * Shortened day names (`Wed`).
   * @default ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
   */
  ddd: DayNames;
  /**
   * How TRUE and FALSE should be presented.
   * @default ["TRUE", "FALSE"]
   */
  bool: [ string, string ];
  /**
   * Is the prefered date format month first (12/31/2025) or day first (31/12/2025).
   * @default false
   */
  preferMDY: boolean;
};

/**
 * An object of properties for a locale tag.
 *
 * ```js
 * { lang: 'zh-CN', language: 'zh', territory: 'CN' }
 * ```
 */
export type LocaleToken = {
  /** The basic tag such as `zh-CN` or `fi` */
  lang: string;
  /** The language section (`zh` for `zh-CN`) */
  language: string;
  /** The territory section (`CN` for `zh-CN`) */
  territory: string;
};

/**
 * Split a semicolon delimited string and replace instances of characters
 * @internal
 * @param str Semicolon delimited string
 * @param [tilde] String to be inserted on every instance of ~
 * @returns Array of strings
 */
const _B = (str: string, tilde = '') => str.replaceAll('~', tilde).split(';') as [ string, string ];
const _W = (str: string, tilde = '') => _B(str, tilde) as unknown as DayNames;
const _M = (str: string, tilde = '') => _B(str, tilde) as unknown as MonthNames;

/**
 * Generate mmm and ddd properties as needed for locales. Many of them
 * are straightforward abreviations of mmmm and dddd so we can save some
 * bytes by auto-generating them.
 *
 * Both rule parameters use the same system. If shortform prop is missing:
 *
 * - 0 - use long form array unchanged
 * - 1...9 - shorten to N many characters
 * - 11...19 - shorten to 1...9 characters and add periods
 *
 * @internal
 * @param o Locale object
 * @param [ml] Month list rule
 * @param [dl] Day list rule
 * @returns The same input object, but with ddd and mmm filled in.
 */
const xm = (o: Partial<LocaleData> & Pick<LocaleData, 'mmmm' | 'dddd'>, ml: number = 0, dl: number = 0): Partial<LocaleData> => {
  if (!o.mmm) {
    // @ts-ignore
    o.mmm = ml < 1
      ? o.mmmm.concat()
      : o.mmmm.map(d => {
        const s = d.slice(0, ml % 10);
        return s + (ml < 10 || d === s ? '' : '.');
      });
  }
  if (!o.ddd) {
    // @ts-ignore
    o.ddd = dl < 1
      ? o.dddd.concat()
      : o.dddd.map(d => {
        const s = d.slice(0, dl % 10);
        return s + (dl < 10 || d === s ? '' : '.');
      });
  }
  if (!o.mmm6 && o.mmmm6) {
    o.mmm6 = o.mmmm6;
  }
  return o;
};

/** @ignore */
const baseLocaleData: LocaleData = {
  group: '\u00A0',
  decimal: '.',
  positive: '+',
  negative: '-',
  percent: '%',
  exponent: 'E',
  nan: 'NaN',
  infinity: '∞',
  ampm: _B('AM;PM'),
  mmmm6: _M('Muharram;Safar;Rabiʻ I;Rabiʻ II;Jumada I;Jumada II;Rajab;Shaʻban;Ramadan;Shawwal;Dhuʻl-Qiʻdah;Dhuʻl-Hijjah'),
  mmm6: _M('Muh.;Saf.;Rab. I;Rab. II;Jum. I;Jum. II;Raj.;Sha.;Ram.;Shaw.;Dhuʻl-Q.;Dhuʻl-H.'),
  mmmm: _M('January;February;March;April;May;June;July;August;September;October;November;December'),
  mmm: _M('Jan;Feb;Mar;Apr;May;Jun;Jul;Aug;Sep;Oct;Nov;Dec'),
  dddd: _W('Sunday;Monday;Tuesday;Wednesday;Thursday;Friday;Saturday'),
  ddd: _W('Sun;Mon;Tue;Wed;Thu;Fri;Sat'),
  bool: _B('TRUE;FALSE'),
  preferMDY: false
};

/**
 * Parse a regular IETF BCP 47 locale tag (`en-US`) and emit an object of its parts.
 * Irregular tags and subtags are not supported.
 *
 * @param locale A BCP 47 string tag of the locale.
 * @returns An object describing the locale.
 * @throws If the locale tag is invalid.
 */
export function parseLocale (locale: string): LocaleToken {
  const lm = re_locale.exec(locale);
  if (!lm) {
    throw new SyntaxError(`Invalid locale: ${locale}`);
  }
  return {
    lang: lm[1] + (lm[2] ? '-' + lm[2] : ''),
    language: lm[1],
    territory: lm[2] || ''
  };
}

// MS code format is: aabbcccc [$-aabbcccc]
// aa = numerical style (optional, 00 if absent)
// bb = calendar format (optional, 00 if absent)
// cc = language code
export function resolveLocale (l4e: number | string): string | undefined {
  if (typeof l4e === 'number') {
    return codeToLocale[l4e & 0xffff] || undefined;
  }
  const wincode = parseInt(l4e, 16);
  if (isFinite(wincode) && codeToLocale[wincode & 0xffff]) {
    return codeToLocale[wincode & 0xffff] || undefined;
  }
  if (re_locale.test(l4e)) {
    return l4e;
  }
  return undefined;
}

/**
 * Used by the formatter to pull a locate from its registered locales. If
 * subtag isn't available but the base language is, the base language is used:
 * So if `en-CA` is not found, the formatter tries to find `en` else it
 * returns `undefined`.
 *
 * @param locale A BCP 47 string tag of the locale, or an Excel locale code.
 * @returns An object of locale properties if one was found.
 * @throws If the locale tag is invalid.
 */
export function getLocale (locale: string | number): LocaleData | undefined {
  const tag = resolveLocale(locale);
  let obj;
  if (tag) {
    const c = parseLocale(tag);
    obj = locales[c.lang] || locales[c.language] || undefined;
  }
  return obj;
}

// creates a new locale options object
export function createLocale (data: Partial<LocaleData>): LocaleData {
  return Object.assign({}, baseLocaleData, data);
}

/**
 * Register locale data for a language to use when formatting.
 *
 * Any partial set of properties may be provided to have the defaults used where properties are missing.
 *
 * @param localeSettings - A collection of settings for a locale.
 * @param [localeSettings.group="\u00a0"]
 *    Symbol used as a grouping separator (`1,000,000` uses `,`)
 * @param [localeSettings.decimal="."]
 *    Symbol used to separate integers from fractions (usually `.`)
 * @param [localeSettings.positive="+"]
 *    Symbol used to indicate positive numbers (usually `+`)
 * @param [localeSettings.negative="-"]
 *    Symbol used to indicate positive numbers (usually `-`)
 * @param [localeSettings.percent="%"]
 *    Symbol used to indicate a percentage (usually `%`)
 * @param [localeSettings.exponent="E"]
 *    Symbol used to indicate an exponent (usually `E`)
 * @param [localeSettings.nan="NaN"]
 *    Symbol used to indicate NaN values (`NaN`)
 * @param [localeSettings.infinity="∞"]
 *    Symbol used to indicate infinite values (`∞`)
 * @param [localeSettings.ampm=["AM","PM"]]
 *    How AM and PM should be presented.
 * @param [localeSettings.mmmm6=["Muharram", "Safar", "Rabiʻ I", "Rabiʻ II", "Jumada I", "Jumada II", "Rajab", "Shaʻban", "Ramadan", "Shawwal", "Dhuʻl-Qiʻdah", "Dhuʻl-Hijjah"]]
 *    Long month names for the Islamic calendar (e.g. `Rajab`)
 * @param [localeSettings.mmm6=["Muh.", "Saf.", "Rab. I", "Rab. II", "Jum. I", "Jum. II", "Raj.", "Sha.", "Ram.", "Shaw.", "Dhuʻl-Q.", "Dhuʻl-H."]]
 *    Short month names for the Islamic calendar (e.g. `Raj.`)
 * @param [localeSettings.mmmm=["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]]
 *    Long month names for the Gregorian calendar (e.g. `November`)
 * @param [localeSettings.mmm=["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]]
 *    Short month names for the Gregorian calendar (e.g. `Nov`)
 * @param [localeSettings.dddd=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]]
 *    Long day names (e.g. `Wednesday`)
 * @param [localeSettings.ddd=["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]]
 *    Shortened day names (e.g. `Wed`)
 * @param [localeSettings.bool=["TRUE", "FALSE"]]
 *    How TRUE and FALSE should be presented.
 * @param [localeSettings.preferMDY=false]
 *    Is the prefered date format month first (12/31/2025) or day first (31/12/2025)
 * @param l4e - A string BCP 47 tag of the locale.
 * @returns A full collection of settings for a locale
 */
export function addLocale (localeSettings: Partial<LocaleData>, l4e: string | LocaleToken): LocaleData {
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

/**
 * Get a list of locales that are registered with the formatter.
 * @returns A list of locale tags
 */
export function listLocales () {
  return Object.keys(locales);
}

export const defaultLocale: LocaleData & { isDefault?: boolean } = createLocale({ group: ',', preferMDY: true });
defaultLocale.isDefault = true;

addLocale({
  group: ',',
  ampm: _B('上午;下午'),
  mmmm: _M('一月;二月;三月;四月;五月;六月;七月;八月;九月;十月;十一月;十二月'),
  mmm: _M('1月;2月;3月;4月;5月;6月;7月;8月;9月;10月;11月;12月'),
  dddd: _W('~日;~一;~二;~三;~四;~五;~六', '星期'),
  ddd: _W('周日;周一;周二;周三;周四;周五;周六')
}, 'zh-CN');
const _zh = {
  group: ',',
  ampm: _B('上午;下午'),
  mmmm: _M('1月;2月;3月;4月;5月;6月;7月;8月;9月;10月;11月;12月'),
  mmm: _M('1月;2月;3月;4月;5月;6月;7月;8月;9月;10月;11月;12月'),
  dddd: _W('~日;~一;~二;~三;~四;~五;~六', '星期'),
  ddd: _W('周日;周一;周二;周三;周四;周五;周六')
};
addLocale({
  ..._zh,
  nan: '非數值',
  dddd: _W('~日;~一;~二;~三;~四;~五;~六', '星期')
}, 'zh-TW');
addLocale({
  ..._zh,
  dddd: _W('~日;~一;~二;~三;~四;~五;~六', '星期')
}, 'zh-HK');

addLocale({
  ..._zh,
  ampm: _B('午前;午後'),
  dddd: _W('日~;月~;火~;水~;木~;金~;土~', '曜日'),
  ddd: _W('日;月;火;水;木;金;土')
}, 'ja');

addLocale({
  group: ',',
  ampm: _B('오전;오후'),
  mmmm: _M('1월;2월;3월;4월;5월;6월;7월;8월;9월;10월;11월;12월'),
  mmm: _M('1월;2월;3월;4월;5월;6월;7월;8월;9월;10월;11월;12월'),
  dddd: _W('일요일;월요일;화요일;수요일;목요일;금요일;토요일'),
  ddd: _W('일;월;화;수;목;금;토')
}, 'ko');

addLocale({
  group: ',',
  ampm: _B('ก่อนเที่ยง;หลังเที่ยง'),
  mmmm: _M('มกร~;กุมภาพันธ์;มีน~;เมษายน;พฤษภ~;มิถุนายน;กรกฎ~;สิงห~;กันยายน;ตุล~;พฤศจิกายน;ธันว~', 'าคม'),
  mmm: _M('ม.ค.;ก.พ.;มี.ค.;เม.ย.;พ.ค.;มิ.ย.;ก.ค.;ส.ค.;ก.ย.;ต.ค.;พ.ย.;ธ.ค.'),
  dddd: _W('วันอาทิตย์;วันจันทร์;วันอังคาร;วันพุธ;วันพฤหัสบดี;วันศุกร์;วันเสาร์'),
  ddd: _W('อา.;จ.;อ.;พ.;พฤ.;ศ.;ส.')
}, 'th');

addLocale(xm({
  decimal: ',',
  ampm: _B('dop.;odp.'),
  mmmm: _M('ledna;února;března;dubna;května;června;července;srpna;září;října;listopadu;prosince'),
  mmm: _M('I;II;III;IV;V;VI;VII;VIII;IX;X;XI;XII'),
  dddd: _W('neděle;pondělí;úterý;středa;čtvrtek;pátek;sobota'),
  bool: _B('PRAVDA;NEPRAVDA')
}, -1, 2), 'cs');

addLocale(xm({
  group: '.',
  decimal: ',',
  mmmm: _M('januar;februar;marts;april;maj;juni;juli;august;september;oktober;november;december'),
  dddd: _W('søn~;man~;tirs~;ons~;tors~;fre~;lør~', 'dag'),
  bool: _B('SAND;FALSK')
}, 13, 13), 'da');

addLocale(xm({
  group: '.',
  decimal: ',',
  ampm: _B('a.m.;p.m.'),
  mmmm: _M('januari;februari;maart;april;mei;juni;juli;augustus;september;oktober;november;december'),
  mmm: _M('jan.;feb.;mrt.;apr.;mei;jun.;jul.;aug.;sep.;okt.;nov.;dec.'),
  dddd: _W('zondag;maandag;dinsdag;woensdag;donderdag;vrijdag;zaterdag'),
  bool: _B('WAAR;ONWAAR')
}, -1, 2), 'nl');

addLocale({ group: ',', preferMDY: true }, 'en');
addLocale({ group: ',', preferMDY: true }, 'en-US');
addLocale({ group: ',' }, 'en-AU');
addLocale({ group: ',' }, 'en-CA');
addLocale({ group: ',' }, 'en-GB');
addLocale({ group: ',', mmm: _M('Jan;Feb;Mar;Apr;May;Jun;Jul;Aug;Sept;Oct;Nov;Dec') }, 'en-IE');

addLocale(xm({
  decimal: ',',
  nan: 'epäluku',
  ampm: _B('ap.;ip.'),
  mmmm: _M('tammi~;helmi~;maalis~;huhti~;touko~;kesä~;heinä~;elo~;syys~;loka~;marras~;joulu~', 'kuuta'),
  mmm: _M('tammik.;helmik.;maalisk.;huhtik.;toukok.;kesäk.;heinäk.;elok.;syysk.;lokak.;marrask.;jouluk.'),
  dddd: _W('sunnun~;maanan~;tiis~;keskiviikkona;tors~;perjan~;lauan~', 'taina'),
  bool: _B('TOSI;EPÄTOSI')
}, -1, 2), 'fi');

const _fr = xm({
  group: '\u202f',
  decimal: ',',
  mmmm: _M('janvier;février;mars;avril;mai;juin;juillet;août;septembre;octobre;novembre;décembre'),
  mmm: _M('janv.;févr.;mars;avr.;mai;juin;juil.;août;sept.;oct.;nov.;déc.'),
  dddd: _W('~manche;lun~;mar~;mercre~;jeu~;vendre~;same~', 'di'),
  bool: _B('VRAI;FAUX')
}, -1, 13);
addLocale({ ..._fr }, 'fr');
addLocale({ ..._fr, mmm: _M('janv.;févr.;mars;avr.;mai;juin;juill.;août;sept.;oct.;nov.;déc.') }, 'fr-CA');
addLocale({ group: "'", decimal: '.', ..._fr }, 'fr-CH');

const _de = xm({
  mmmm: _M('Januar;Februar;März;April;Mai;Juni;Juli;August;September;Oktober;November;Dezember'),
  mmm: _M('Jan.;Feb.;März;Apr.;Mai;Juni;Juli;Aug.;Sept.;Okt.;Nov.;Dez.'),
  dddd: _W('Sonn~;Mon~;Diens~;Mittwoch;Donners~;Frei~;Sams~', 'tag'),
  bool: _B('WAHR;FALSCH')
}, -1, 12);
addLocale({ group: '.', decimal: ',', ..._de }, 'de');
addLocale({ group: "'", decimal: '.', ..._de }, 'de-CH');

addLocale(xm({
  group: '.',
  decimal: ',',
  ampm: _B('π.μ.;μ.μ.'),
  mmmm: _M('Ιανουαρ~;Φεβρουαρ~;Μαρτ~;Απριλ~;Μαΐου;Ιουν~;Ιουλ~;Αυγούστου;Σεπτεμβρ~;Οκτωβρ~;Νοεμβρ~;Δεκεμβρ~', 'ίου'),
  mmm: _M('Ιαν;Φεβ;Μαρ;Απρ;Μαΐ;Ιουν;Ιουλ;Αυγ;Σεπ;Οκτ;Νοε;Δεκ'),
  dddd: _W('Κυριακή;Δευτέρα;Τρίτη;Τετάρτη;Πέμπτη;Παρασκευή;Σάββατο')
}, -1, 3), 'el');

addLocale({
  decimal: ',',
  ampm: _B('de.;du.'),
  mmmm: _M('január;február;március;április;május;június;július;augusztus;szeptember;október;november;december'),
  mmm: _M('jan.;febr.;márc.;ápr.;máj.;jún.;júl.;aug.;szept.;okt.;nov.;dec.'),
  dddd: _W('vasárnap;hétfő;kedd;szerda;csütörtök;péntek;szombat'),
  ddd: _W('V;H;K;Sze;Cs;P;Szo'),
  bool: _B('IGAZ;HAMIS')
}, 'hu');

addLocale(xm({
  group: '.',
  decimal: ',',
  ampm: _B('f.h.;e.h.'),
  mmmm: _M('janúar;febrúar;mars;apríl;maí;júní;júlí;ágúst;september;október;nóvember;desember'),
  dddd: _W('sunnu~;mánu~;þriðju~;miðviku~;fimmtu~;föstu~;laugar~', 'dagur')
}, 13, 13), 'is');

addLocale(xm({
  group: '.',
  decimal: ',',
  mmmm: _M('Januari;Februari;Maret;April;Mei;Juni;Juli;Agustus;September;Oktober;November;Desember'),
  dddd: _W('Minggu;Senin;Selasa;Rabu;Kamis;Jumat;Sabtu')
}, 3, 3), 'id');

const _it = xm({
  mmmm: _M('gennaio;febbraio;marzo;aprile;maggio;giugno;luglio;agosto;settembre;ottobre;novembre;dicembre'),
  dddd: _W('domenica;lunedì;martedì;mercoledì;giovedì;venerdì;sabato'),
  bool: _B('VERO;FALSO')
}, 3, 3);
addLocale({ group: '.', decimal: ',', ..._it }, 'it');
addLocale({ group: "'", decimal: '.', ..._it }, 'it-CH');

const _no = {
  decimal: ',',
  ampm: _B('a.m.;p.m.'),
  mmmm: _M('januar;februar;mars;april;mai;juni;juli;august;september;oktober;november;desember'),
  mmm: _M('jan.;feb.;mar.;apr.;mai;jun.;jul.;aug.;sep.;okt.;nov.;des.'),
  dddd: _W('søn~;man~;tirs~;ons~;tors~;fre~;lør~', 'dag'),
  bool: _B('SANN;USANN')
};
addLocale(xm({ ..._no }, -1, 13), 'nb');
addLocale(xm({ ..._no }, -1, 13), 'no');

addLocale(xm({
  decimal: ',',
  mmmm: _M('stycznia;lutego;marca;kwietnia;maja;czerwca;lipca;sierpnia;września;października;listopada;grudnia'),
  dddd: _W('niedziela;poniedziałek;wtorek;środa;czwartek;piątek;sobota'),
  ddd: _W('niedz.;pon.;wt.;śr.;czw.;pt.;sob.'),
  bool: _B('PRAWDA;FAŁSZ')
}, 3, -1), 'pl');

const _pt = {
  group: '.',
  decimal: ',',
  mmmm: _M('janeiro;fevereiro;março;abril;maio;junho;julho;agosto;setembro;outubro;novembro;dezembro'),
  dddd: _W('domingo;segunda-feira;terça-feira;quarta-feira;quinta-feira;sexta-feira;sábado'),
  bool: _B('VERDADEIRO;FALSO')
};
addLocale(xm(_pt, 13, 13), 'pt');
addLocale(xm(_pt, 13, 13), 'pt-BR');

addLocale({
  decimal: ',',
  nan: 'не\u00A0число',
  mmmm: _M('января;февраля;марта;апреля;мая;июня;июля;августа;сентября;октября;ноября;декабря'),
  mmm: _M('янв.;февр.;мар.;апр.;мая;июн.;июл.;авг.;сент.;окт.;нояб.;дек.'),
  dddd: _W('воскресенье;понедельник;вторник;среда;четверг;пятница;суббота'),
  ddd: _W('вс;пн;вт;ср;чт;пт;сб'),
  mmmm6: _M('рамадан;шавваль;зуль-каада;зуль-хиджжа;мухаррам;раби-уль-авваль;раби-уль-ахир;джумад-уль-авваль;джумад-уль-ахир;раджаб;шаабан;рамадан'),
  mmm6: _M('рам.;шав.;зуль-к.;зуль-х.;мух.;раб. I;раб. II;джум. I;джум. II;радж.;шааб.;рам.'),
  bool: _B('ИСТИНА;ЛОЖЬ')
}, 'ru');

addLocale(xm({
  decimal: ',',
  mmmm: _M('januára;februára;marca;apríla;mája;júna;júla;augusta;septembra;októbra;novembra;decembra'),
  dddd: _W('nedeľa;pondelok;utorok;streda;štvrtok;piatok;sobota')
}, 3, 2), 'sk');

const _es = {
  group: '.',
  decimal: ',',
  ampm: _B('a.\u00A0m.;p.\u00A0m.'),
  mmmm: _M('enero;febrero;marzo;abril;mayo;junio;julio;agosto;septiem~;octu~;noviem~;diciem~', 'bre'),
  mmm: _M('ene;feb;mar;abr;may;jun;jul;ago;sept;oct;nov;dic'),
  dddd: _W('domingo;lunes;martes;miércoles;jueves;viernes;sábado'),
  ddd: _W('dom;lun;mar;mié;jue;vie;sáb'),
  bool: _B('VERDADERO;FALSO')
};
const _esM3 = _M('ene;feb;mar;abr;may;jun;jul;ago;sep;oct;nov;dic');
const _esM13 = _M('ene.;feb.;mar.;abr.;may.;jun.;jul.;ago.;sept.;oct.;nov.;dic.');
addLocale({ ..._es }, 'es');
addLocale({ ..._es }, 'es-AR');
addLocale({ ..._es }, 'es-BO');
addLocale({ ..._es }, 'es-CL');
addLocale({ ..._es }, 'es-CO');
addLocale({ ..._es }, 'es-EC');
addLocale({ ..._es, mmm: _esM3, ampm: _B('a.m.;p.m.') }, 'es-MX');
addLocale({ ..._es, mmm: _esM13 }, 'es-PY');
addLocale({ ..._es, mmm: _esM13 }, 'es-UY');
addLocale({ ..._es, mmm: _esM13, mmmm: _M('enero;febrero;marzo;abril;mayo;junio;julio;agosto;setiembre;octubre;noviembre;diciembre') }, 'es-VE');

addLocale({
  decimal: ',',
  ampm: _B('fm;em'),
  mmmm: _M('januari;februari;mars;april;maj;juni;juli;augusti;september;oktober;november;december'),
  mmm: _M('jan.;feb.;mars;apr.;maj;juni;juli;aug.;sep.;okt.;nov.;dec.'),
  dddd: _W('sön~;mån~;tis~;ons~;tors~;fre~;lör~', 'dag'),
  ddd: _W('sön;mån;tis;ons;tors;fre;lör')
}, 'sv');

addLocale(xm({
  group: '.',
  decimal: ',',
  ampm: _B('ÖÖ;ÖS'),
  mmmm: _M('Ocak;Şubat;Mart;Nisan;Mayıs;Haziran;Temmuz;Ağustos;Eylül;Ekim;Kasım;Aralık'),
  mmm: _M('Oca;Şub;Mar;Nis;May;Haz;Tem;Ağu;Eyl;Eki;Kas;Ara'),
  dddd: _W('Pazar;Pazartesi;Salı;Çarşamba;Perşembe;Cuma;Cumartesi'),
  ddd: _W('Paz;Pzt;Sal;Çar;Per;Cum;Cmt'),
  bool: _B('DOĞRU;YANLIŞ')
}, 3, -1), 'tr');

addLocale({
  group: ',',
  ampm: _B('yb;yh'),
  mmmm: _M('Ionawr;Chwefror;Mawrth;Ebrill;Mai;Mehefin;Gorffennaf;Awst;Medi;Hydref;Tachwedd;Rhagfyr'),
  mmm: _M('Ion;Chwef;Maw;Ebr;Mai;Meh;Gorff;Awst;Medi;Hyd;Tach;Rhag'),
  dddd: _W('Dydd Sul;Dydd Llun;Dydd Mawrth;Dydd Mercher;Dydd Iau;Dydd Gwener;Dydd Sadwrn'),
  ddd: _W('Sul;Llun;Maw;Mer;Iau;Gwen;Sad')
}, 'cy');

addLocale({
  group:  '.',
  decimal:  ',',
  mmmm: _M('yanvar;fevral;mart;aprel;may;iyun;iyul;avqust;sentyabr;oktyabr;noyabr;dekabr'),
  mmm: _M('yan;fev;mar;apr;may;iyn;iyl;avq;sen;okt;noy;dek'),
  dddd: _W('bazar;bazar ertəsi;çərşənbə axşamı;çərşənbə;cümə axşamı;cümə;şənbə'),
  ddd:  _W('B.;B.e.;Ç.a.;Ç.;C.a.;C.;Ş.')
}, 'az');

addLocale(xm({
  decimal: ',',
  mmmm: _M('студзеня;лютага;сакавіка;красавіка;мая;чэрвеня;ліпеня;жніўня;верасня;кастрычніка;лістапада;снежня'),
  dddd: _W('нядзеля;панядзелак;аўторак;серада;чацвер;пятніца;субота'),
  ddd:  _W('нд;пн;аў;ср;чц;пт;сб')
}, 3, -1), 'be');

addLocale({
  decimal: ',',
  ampm: _B('пр.об.;сл.об.'),
  mmmm: _M('януари;февруари;март;април;май;юни;юли;август;септември;октомври;ноември;декември'),
  mmm:  _M('яну;фев;март;апр;май;юни;юли;авг;сеп;окт;ное;дек'),
  dddd: _W('неделя;понеделник;вторник;сряда;четвъртък;петък;събота'),
  ddd:  _W('нд;пн;вт;ср;чт;пт;сб'),
  bool: _B('ИСТИНА;ЛОЖЬ')
}, 'bg');

addLocale({
  group:  '.',
  decimal:  ',',
  mmmm: _M('de gener;de febrer;de març;d’abril;de maig;de juny;de juliol;d’agost;de setembre;d’octubre;de novembre;de desembre'),
  mmm:  _M('de gen.;de febr.;de març;d’abr.;de maig;de juny;de jul.;d’ag.;de set.;d’oct.;de nov.;de des.'),
  dddd: _W('diumenge;dilluns;dimarts;dimecres;dijous;divendres;dissabte'),
  ddd:  _W('dg.;dl.;dt.;dc.;dj.;dv.;ds.'),
  ampm: _B('a.\u00a0m.;p.\u00a0m.')
}, 'ca');

addLocale(xm({
  group:  ',',
  decimal:  '.',
  mmmm: _M('Enero;Pebrero;Marso;Abril;Mayo;Hunyo;Hulyo;Agosto;Setyembre;Oktubre;Nobyembre;Disyembre'),
  dddd: _W('Linggo;Lunes;Martes;Miyerkules;Huwebes;Biyernes;Sabado')
}, 3, 3), 'fil');

addLocale({
  group:  ',',
  decimal:  '.',
  mmmm: _M('જાન્યુઆરી;ફેબ્રુઆરી;માર્ચ;એપ્રિલ;મે;જૂન;જુલાઈ;ઑગસ્ટ;સપ્ટેમ્બર;ઑક્ટોબર;નવેમ્બર;ડિસેમ્બર'),
  mmm: _M('જાન્યુ;ફેબ્રુ;માર્ચ;એપ્રિલ;મે;જૂન;જુલાઈ;ઑગસ્ટ;સપ્ટે;ઑક્ટો;નવે;ડિસે'),
  dddd: _W('રવિ~;સોમ~;મંગળ~;બુધ~;ગુરુ~;શુક્ર~;શનિ~', 'વાર'),
  ddd: _W('રવિ;સોમ;મંગળ;બુધ;ગુરુ;શુક્ર;શનિ')
}, 'gu');

addLocale({
  group:  ',',
  decimal:  '.',
  ampm: _B('לפנה״צ;אחה״צ'),
  dddd: _W('~ראשון;~שני;~שלישי;~רביעי;~חמישי;~שישי;~שבת', 'יום '),
  ddd: _W('~א׳;~ב׳;~ג׳;~ד׳;~ה׳;~ו׳;שבת', 'יום '),
  mmmm: _M('ינואר;פברואר;מרץ;אפריל;מאי;יוני;יולי;אוגוסט;ספטמבר;אוקטובר;נובמבר;דצמבר'),
  mmm: _M('ינו׳;פבר׳;מרץ;אפר׳;מאי;יוני;יולי;אוג׳;ספט׳;אוק׳;נוב׳;דצמ׳'),
  mmmm6: _M('רמדאן;שוואל;ד׳ו אל־קעדה;ד׳ו אל־חיג׳ה;מוחרם;רביע אל־אוול;רביע א־ת׳אני;ג׳ומאדא אל־אולא;ג׳ומאדא א־ת׳אניה;רג׳ב;שעבאן;רמדאן'),
  mmm6: _M('רמדאן;שוואל;ד׳ו אל־קעדה;ד׳ו אל־חיג׳ה;מוחרם;רביע א׳;רביע ב׳;ג׳ומאדא א׳;ג׳ומאדא ב׳;רג׳ב;שעבאן;רמדאן')
}, 'he');

addLocale(xm({
  group:  '.',
  decimal:  ',',
  mmmm: _M('siječnja;veljače;ožujka;travnja;svibnja;lipnja;srpnja;kolovoza;rujna;listopada;studenoga;prosinca'),
  mmm:  _M('sij;velj;ožu;tra;svi;lip;srp;kol;ruj;lis;stu;pro'),
  dddd: _W('nedjelja;ponedjeljak;utorak;srijeda;četvrtak;petak;subota')
}, -1, 3), 'hr');

addLocale({
  decimal: ',',
  mmmm: _M('հունվարի;փետրվարի;մարտի;ապրիլի;մայիսի;հունիսի;հուլիսի;օգոստոսի;սեպտեմբերի;հոկտեմբերի;նոյեմբերի;դեկտեմբերի'),
  mmm:  _M('հնվ;փտվ;մրտ;ապր;մյս;հնս;հլս;օգս;սեպ;հոկ;նոյ;դեկ'),
  dddd: _W('կիրակի;երկուշաբթի;երեքշաբթի;չորեքշաբթի;հինգշաբթի;ուրբաթ;շաբաթ'),
  ddd:  _W('կիր;երկ;երք;չրք;հնգ;ուր;շբթ')
}, 'hy');

addLocale(xm({
  decimal: ',',
  mmmm: _M('იანვარი;თებერვალი;მარტი;აპრილი;მაისი;ივნისი;ივლისი;აგვისტო;სექტემბერი;ოქტომბერი;ნოემბერი;დეკემბერი'),
  dddd: _W('კვირა;ორშაბათი;სამშაბათი;ოთხშაბათი;ხუთშაბათი;პარასკევი;შაბათი')
}, 3, 3), 'ka');

addLocale(xm({
  decimal: ',',
  mmmm: _M('қаңтар;ақпан;наурыз;сәуір;мамыр;маусым;шілде;тамыз;қыркүйек;қазан;қараша;желтоқсан'),
  dddd: _W('жексенбі;дүйсенбі;сейсенбі;сәрсенбі;бейсенбі;жұма;сенбі'),
  ddd:  _W('жс;дс;сс;ср;бс;жм;сб')
}, 13, -1), 'kk');

addLocale({
  group:  ',',
  mmmm: _M('ಜನವರಿ;ಫೆಬ್ರವರಿ;ಮಾರ್ಚ್;ಏಪ್ರಿಲ್;ಮೇ;ಜೂನ್;ಜುಲೈ;ಆಗಸ್ಟ್;ಸೆಪ್ಟೆಂಬರ್;ಅಕ್ಟೋಬರ್;ನವೆಂಬರ್;ಡಿಸೆಂಬರ್'),
  mmm:  _M('ಜನವರಿ;ಫೆಬ್ರವರಿ;ಮಾರ್ಚ್;ಏಪ್ರಿ;ಮೇ;ಜೂನ್;ಜುಲೈ;ಆಗಸ್ಟ್;ಸೆಪ್ಟೆಂ;ಅಕ್ಟೋ;ನವೆಂ;ಡಿಸೆಂ'),
  dddd: _W('ಭಾನು~;ಸೋಮ~;ಮಂಗಳ~;ಬುಧ~;ಗುರು~;ಶುಕ್ರ~;ಶನಿ~', 'ವಾರ'),
  ddd:  _W('ಭಾನು;ಸೋಮ;ಮಂಗಳ;ಬುಧ;ಗುರು;ಶುಕ್ರ;ಶನಿ'),
  ampm: _B('ಪೂರ್ವಾಹ್ನ;ಅಪರಾಹ್ನ')
}, 'kn');

addLocale({
  decimal:  ',',
  mmmm: _M('sausio;vasario;kovo;balandžio;gegužės;birželio;liepos;rugpjūčio;rugsėjo;spalio;lapkričio;gruodžio'),
  mmm:  _M('saus.;vas.;kov.;bal.;geg.;birž.;liep.;rugp.;rugs.;spal.;lapkr.;gruod.'),
  dddd: _W('sekmadienis;pirmadienis;antradienis;trečiadienis;ketvirtadienis;penktadienis;šeštadienis'),
  ddd:  _W('sk;pr;an;tr;kt;pn;št'),
  ampm: _B('priešpiet;popiet')
}, 'lt');

addLocale({
  decimal:  ',',
  mmmm: _M('janvāris;februāris;marts;aprīlis;maijs;jūnijs;jūlijs;augusts;septembris;oktobris;novembris;decembris'),
  mmm:  _M('janv.;febr.;marts;apr.;maijs;jūn.;jūl.;aug.;sept.;okt.;nov.;dec.'),
  dddd: _W('svētdiena;pirmdiena;otrdiena;trešdiena;ceturtdiena;piektdiena;sestdiena'),
  ddd:  _W('svētd.;pirmd.;otrd.;trešd.;ceturtd.;piektd.;sestd.'),
  ampm: _B('priekšpusdienā;pēcpusdienā')
}, 'lv');

addLocale({
  group:  ',',
  decimal:  '.',
  mmmm: _M('ജനുവരി;ഫെബ്രുവരി;മാർച്ച്;ഏപ്രിൽ;മേയ്;ജൂൺ;ജൂലൈ;ഓഗസ്റ്റ്;സെപ്റ്റംബർ;ഒക്‌ടോബർ;നവംബർ;ഡിസംബർ'),
  mmm:  _M('ജനു;ഫെബ്രു;മാർ;ഏപ്രി;മേയ്;ജൂൺ;ജൂലൈ;ഓഗ;സെപ്റ്റം;ഒക്ടോ;നവം;ഡിസം'),
  dddd: _W('ഞായറാഴ്‌ച;തിങ്കളാഴ്‌ച;ചൊവ്വാഴ്ച;ബുധനാഴ്‌ച;വ്യാഴാഴ്‌ച;വെള്ളിയാഴ്‌ച;ശനിയാഴ്‌ച'),
  ddd:  _W('ഞായർ;തിങ്കൾ;ചൊവ്വ;ബുധൻ;വ്യാഴം;വെള്ളി;ശനി')
}, 'ml');

addLocale({
  group:  ',',
  decimal:  '.',
  mmmm: _M('нэгдүгээ~;хоёрдугаа~;гуравдугаа~;дөрөвдүгээ~;тавдугаа~;зургаадугаа~;долоодугаа~;наймдугаа~;есдүгээ~;аравдугаа~;арван нэгдүгээ~;арван хоёрдугаа~', 'р сар'),
  mmm:  _M('1~;2~;3~;4~;5~;6~;7~;8~;9~;10~;11~;12~', '-р сар'),
  dddd: _W('ням;даваа;мягмар;лхагва;пүрэв;баасан;бямба'),
  ddd:  _W('Ня;Да;Мя;Лх;Пү;Ба;Бя'),
  ampm: _B('ү.ө.;ү.х.')
}, 'mn');

addLocale({
  group:  ',',
  decimal:  '.',
  mmmm: _M('जानेवारी;फेब्रुवारी;मार्च;एप्रिल;मे;जून;जुलै;ऑगस्ट;सप्टेंबर;ऑक्टोबर;नोव्हेंबर;डिसेंबर'),
  mmm:  _M('जाने;फेब्रु;मार्च;एप्रि;मे;जून;जुलै;ऑग;सप्टें;ऑक्टो;नोव्हें;डिसें'),
  dddd: _W('रविवार;सोमवार;मंगळवार;बुधवार;गुरुवार;शुक्रवार;शनिवार'),
  ddd:  _W('रवि;सोम;मंगळ;बुध;गुरु;शुक्र;शनि')
}, 'mr');

addLocale(xm({
  group:  ',',
  decimal:  '.',
  mmmm: _M('ဇန်နဝါရီ;ဖေဖော်ဝါရီ;မတ်;ဧပြီ;မေ;ဇွန်;ဇူလိုင်;ဩဂုတ်;စက်တင်ဘာ;အောက်တိုဘာ;နိုဝင်ဘာ;ဒီဇင်ဘာ'),
  mmm:  _M('ဇန်;ဖေ;မတ်;ဧ;မေ;ဇွန်;ဇူ;ဩ;စက်;အောက်;နို;ဒီ'),
  dddd: _W('တနင်္ဂနွေ;တနင်္လာ;အင်္ဂါ;ဗုဒ္ဓဟူး;ကြာသပတေး;သောကြာ;စနေ'),
  ampm: _B('နံနက်;ညနေ')
}, -1, 0), 'my');

addLocale({
  group:  ',',
  decimal:  '.',
  mmmm: _M('ਜਨਵਰੀ;ਫ਼ਰਵਰੀ;ਮਾਰਚ;ਅਪ੍ਰੈਲ;ਮਈ;ਜੂਨ;ਜੁਲਾਈ;ਅਗਸਤ;ਸਤੰਬਰ;ਅਕਤੂਬਰ;ਨਵੰਬਰ;ਦਸੰਬਰ'),
  mmm:  _M('ਜਨ;ਫ਼ਰ;ਮਾਰਚ;ਅਪ੍ਰੈ;ਮਈ;ਜੂਨ;ਜੁਲਾ;ਅਗ;ਸਤੰ;ਅਕਤੂ;ਨਵੰ;ਦਸੰ'),
  dddd: _W('ਐਤਵਾਰ;ਸੋਮਵਾਰ;ਮੰਗਲਵਾਰ;ਬੁੱਧਵਾਰ;ਵੀਰਵਾਰ;ਸ਼ੁੱਕਰਵਾਰ;ਸ਼ਨਿੱਚਰਵਾਰ'),
  ddd:  _W('ਐਤ;ਸੋਮ;ਮੰਗਲ;ਬੁੱਧ;ਵੀਰ;ਸ਼ੁੱਕਰ;ਸ਼ਨਿੱਚਰ'),
  ampm: _B('ਪੂ.ਦੁ.;ਬਾ.ਦੁ.')
}, 'pa');

addLocale({
  group:  '.',
  decimal:  ',',
  mmmm: _M('ianuarie;februarie;martie;aprilie;mai;iunie;iulie;august;septem~;octom~;noiem~;decem~', 'brie'),
  mmm:  _M('ian.;feb.;mar.;apr.;mai;iun.;iul.;aug.;sept.;oct.;nov.;dec.'),
  dddd: _W('duminică;luni;marți;miercuri;joi;vineri;sâmbătă'),
  ddd:  _W('dum.;lun.;mar.;mie.;joi;vin.;sâm.'),
  ampm: _B('a.m.;p.m.')
}, 'ro');

addLocale(xm({
  group:  '.',
  decimal:  ',',
  mmmm: _M('januar;februar;marec;april;maj;junij;julij;avgust;september;oktober;november;december'),
  mmm:  _M('jan.;feb.;mar.;apr.;maj;jun.;jul.;avg.;sep.;okt.;nov.;dec.'),
  dddd: _W('nedelja;ponedeljek;torek;sreda;četrtek;petek;sobota'),
  ampm: _B('dop.;pop.')
}, -1, 13), 'sl');

addLocale(xm({
  group:  '.',
  decimal:  ',',
  mmmm: _M('јануар;фебруар;март;април;мај;јун;јул;август;септембар;октобар;новембар;децембар'),
  dddd: _W('недеља;понедељак;уторак;среда;четвртак;петак;субота')
}, 3, 3), 'sr');

addLocale({
  group:  ',',
  decimal:  '.',
  mmmm: _M('ஜனவரி;பிப்ரவரி;மார்ச்;ஏப்ரல்;மே;ஜூன்;ஜூலை;ஆகஸ்ட்;செப்டம்பர்;அக்டோபர்;நவம்பர்;டிசம்பர்'),
  mmm:  _M('ஜன.;பிப்.;மார்.;ஏப்.;மே;ஜூன்;ஜூலை;ஆக.;செப்.;அக்.;நவ.;டிச.'),
  dddd: _W('ஞாயிறு;திங்கள்;செவ்வாய்;புதன்;வியாழன்;வெள்ளி;சனி'),
  ddd:  _W('ஞாயி.;திங்.;செவ்.;புத.;வியா.;வெள்.;சனி')
}, 'ta');

addLocale({
  group:  ',',
  decimal:  '.',
  mmmm: _M('జనవరి;ఫిబ్రవరి;మార్చి;ఏప్రిల్;మే;జూన్;జులై;ఆగస్టు;సెప్టెంబర్;అక్టోబర్;నవంబర్;డిసెంబర్'),
  mmm:  _M('జన;ఫిబ్ర;మార్చి;ఏప్రి;మే;జూన్;జులై;ఆగ;సెప్టెం;అక్టో;నవం;డిసెం'),
  dddd: _W('ఆదివారం;సోమవారం;మంగళవారం;బుధవారం;గురువారం;శుక్రవారం;శనివారం'),
  ddd:  _W('ఆది;సోమ;మంగళ;బుధ;గురు;శుక్ర;శని')
}, 'te');

addLocale({
  decimal:  ',',
  mmmm: _M('січня;лютого;березня;квітня;травня;червня;липня;серпня;вересня;жовтня;листопада;грудня'),
  mmm:  _M('січ.;лют.;бер.;квіт.;трав.;черв.;лип.;серп.;вер.;жовт.;лист.;груд.'),
  dddd: _W('неділю;понеділок;вівторок;середу;четвер;пʼятницю;суботу'),
  ddd:  _W('нд;пн;вт;ср;чт;пт;сб'),
  ampm: _B('дп;пп')
}, 'uk');

addLocale({
  group:  '.',
  decimal:  ',',
  mmmm: _M('~1;~2;~3;~4;~5;~6;~7;~8;~9;~10;~11;~12', 'tháng '),
  mmm:  _M('~1;~2;~3;~4;~5;~6;~7;~8;~9;~10;~11;~12', 'thg '),
  dddd: _W('Chủ Nhật;Thứ Hai;Thứ Ba;Thứ Tư;Thứ Năm;Thứ Sáu;Thứ Bảy'),
  ddd:  _W('CN;Th 2;Th 3;Th 4;Th 5;Th 6;Th 7'),
  ampm: _B('SA;CH')
}, 'vi');

addLocale(xm({
  group:  '٬',
  decimal:  '٫',
  ampm: _B('ص;م'),
  mmmm: _M('يناير;فبراير;مارس;أبريل;مايو;يونيو;يوليو;أغسطس;سبتمبر;أكتوبر;نوفمبر;ديسمبر'),
  dddd: _W('الأحد;الاثنين;الثلاثاء;الأربعاء;الخميس;الجمعة;السبت'),
  mmmm6: _M('رمضان;شوال;ذو القعدة;ذو الحجة;محرم;ربيع الأول;ربيع الآخرة;جمادى الأولى;جمادى الآخرة;رجب;شعبان;رمضان')
}, 0, 0), 'ar');

addLocale({
  group: ',',
  decimal: '.',
  mmmm: _M('জানুয়ারী;ফেব্রুয়ারী;মার্চ;এপ্রিল;মে;জুন;জুলাই;আগস্ট;সেপ্টেম্বর;অক্টোবর;নভেম্বর;ডিসেম্বর'),
  mmm:  _M('জানু;ফেব;মার্চ;এপ্রি;মে;জুন;জুল;আগ;সেপ্টেঃ;অক্টোঃ;নভেঃ;ডিসেঃ'),
  dddd: _W('রবিবার;সোমবার;মঙ্গলবার;বুধবার;বৃহস্পতিবার;শুক্রবার;শনিবার'),
  ddd:  _W('রবি;সোম;মঙ্গল;বুধ;বৃহস্পতি;শুক্র;শনি')
}, 'bn');

addLocale({
  group:  ',',
  decimal:  '.',
  mmmm: _M('जनवरी;फ़रवरी;मार्च;अप्रैल;मई;जून;जुलाई;अगस्त;सितंबर;अक्तूबर;नवंबर;दिसंबर'),
  mmm:  _M('जन॰;फ़र॰;मार्च;अप्रैल;मई;जून;जुल॰;अग॰;सित॰;अक्तू॰;नव॰;दिस॰'),
  dddd: _W('रविवार;सोमवार;मंगलवार;बुधवार;गुरुवार;शुक्रवार;शनिवार'),
  ddd:  _W('रवि;सोम;मंगल;बुध;गुरु;शुक्र;शनि'),
  ampm: _B('am;pm')
}, 'hi');
