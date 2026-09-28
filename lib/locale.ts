import { codeToLocale } from './codeToLocale.ts';
import { initLocales } from './locales.ts';

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
   * How the "Color" keyword is written in the language.
   * @default "Color"
   */
  color?: string,
  /**
   * How the "General" keyword is written in the language.
   * @default "General"
   */
  general?: string,
  /**
   * A map for the color keywords in the language, into US English.
   * The keys should be the lower-case localized versions (`bianco`) and the values
   * should be title-cased English equivalents (`Black`).
   * @default {black:"Black", white:"White", red:"Red", green:"Green", blue:"Blue", yellow:"Yellow", magenta:"Magenta", cyan:"Cyan"}
   */
  colors?: Record<string, string>,
  /**
   * Operator symbol map.This is a record of characters, one for each operator. The value should
   * be single character lower case strings. Keys are as follows:
   *
   * - `dy`: Year of a date, defaults to `y`.
   * - `dm`: Month of a date, defaults to `m`.
   * - `dd`: Day of a date, defaults to `d`.
   * - `th`: Hours of time, defaults to `h`.
   * - `tm`: Minutes of time, defaults to `m`.
   * - `ts`: Seconds of time, defaults to `s`.
   * - `wd`: Weekday (alt.), defaults to `a`.
   * - `en`: Era name, defaults to `g`.
   */
  opcodes?: {
    dy?: string,
    dm?: string,
    dd?: string,
    th?: string,
    tm?: string,
    ts?: string,
    wd?: string,
    en?: string,
  },
  /**
   * The currency symbol used by the Locale.
   * @default "$"
   */
  currency: string,
  /**
   * Is the prefered date format month first (12/31/2025) or day first (31/12/2025).
   * @default false
   */
  preferMDY: boolean;
  // dateOrder?: number,
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
  ampm: [ 'AM', 'PM' ],
  mmmm6: [ 'Muharram', 'Safar', 'Rabiʻ I', 'Rabiʻ II', 'Jumada I', 'Jumada II', 'Rajab', 'Shaʻban', 'Ramadan', 'Shawwal', 'Dhuʻl-Qiʻdah', 'Dhuʻl-Hijjah' ],
  mmm6: [ 'Muh.', 'Saf.', 'Rab. I', 'Rab. II', 'Jum. I', 'Jum. II', 'Raj.', 'Sha.', 'Ram.', 'Shaw.', 'Dhuʻl-Q.', 'Dhuʻl-H.' ],
  mmmm: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
  mmm: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
  dddd: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
  ddd: [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
  bool: [ 'TRUE', 'FALSE' ],
  general: 'General',
  currency: '$',
  color: 'Color',
  colors: {
    black: 'Black',
    white: 'White',
    red: 'Red',
    green: 'Green',
    blue: 'Blue',
    yellow: 'Yellow',
    magenta: 'Magenta',
    cyan: 'Cyan'
  },
  // dateOrder: 0,
  preferMDY: false
  // lcid: -1,
  // code: '',
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

// XXX: FIXME --- needs more docs
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
  s.add(locales[c.lang].decimal);
  return locales[c.lang];
}

const s = new Set();

/**
 * Get a list of locales that are registered with the formatter.
 * @returns A list of locale tags
 */
export function listLocales () {
  return Object.keys(locales);
}

export const defaultLocale: LocaleData & { isDefault?: boolean } = createLocale({ group: ',', preferMDY: true });
defaultLocale.isDefault = true;

initLocales();
