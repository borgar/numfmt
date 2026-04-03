//#region lib/types.d.ts
/**
 * An object of information properties based on a format pattern.
 */
type FormatInfo = {
  /** A string identifier for the type of the number formatter. */type: ('currency' | 'date' | 'datetime' | 'error' | 'fraction' | 'general' | 'grouped' | 'number' | 'percent' | 'scientific' | 'text' | 'time');
  /**
   * Corresponds to the output from isDateFormat.
   */
  isDate: boolean;
  /**
   * Corresponds to the output from isTextFormat.
   */
  isText: boolean;
  /**
   * Corresponds to the output from isPercentFormat.
   */
  isPercent: boolean;
  /**
   * The maximum number of decimals this format will emit.
   */
  maxDecimals: number;
  /**
   * 1 if the format uses color on the negative portion of the string, else a 0.
   * This replicates Excel's `CELL("color")` functionality.
   */
  color: 0 | 1;
  /**
   * 1 if the positive portion of the number format contains an open parenthesis, else a 0.
   * This is replicates Excel's `CELL("parentheses")` functionality.
   */
  parentheses: 0 | 1;
  /**
   * 1 if the positive portion of the format uses a thousands separator, else a 0.
   */
  grouped: 0 | 1;
  /**
   * Corresponds to Excel's `CELL("format")` functionality.
   * It should match Excel's esoteric behaviour fairly well.
   * [See Microsoft's documentation.](https://support.microsoft.com/en-us/office/cell-function-51bd39a5-f338-4dbe-a33f-955d67c2b2cf)
   */
  code: string;
  /**
   * The multiplier used when formatting the number (100 for percentages).
   */
  scale: number;
  /**
   * An arbirarty number that represents the format's specificity if you want
   * to compare one to another. Integer comparisons roughly match Excel's
   * resolutions when it determines which format wins out.
   */
  level: number;
};
/**
 * An object detailing which date specifiers are used in a format pattern.
 */
type FormatDateInfo = {
  /** true if the pattern uses years else false. */year: boolean; /** true if the pattern uses months else false. */
  month: boolean; /** true if the pattern uses day of the month else false. */
  day: boolean; /** true if the pattern uses hours else false. */
  hours: boolean; /** true if the pattern uses minutes else false. */
  minutes: boolean; /** true if the pattern uses seconds else false. */
  seconds: boolean; /** 12 if the pattern uses AM/PM clock else 24. */
  clockType: 12 | 24;
};
/**
 * An object of properties used by a formatter when printing a number in a certain locale.
 */
type LocaleData = {
  /** Symbol used as a grouping separator (`1,000,000` uses `,`) */group: string; /** Symbol used to separate integers from fractions (usually `.`) */
  decimal: string; /** Symbol used to indicate positive numbers (usually `+`) */
  positive: string; /** Symbol used to indicate positive numbers (usually `-`) */
  negative: string; /** Symbol used to indicate a percentage (usually `%`) */
  percent: string; /** Symbol used to indicate an exponent (usually `E`) */
  exponent: string; /** Symbol used to indicate NaN values (`NaN`) */
  nan: string; /** Symbol used to indicate infinite values (`∞`) */
  infinity: string; /** How AM and PM should be presented */
  ampm: string[]; /** Long month names for the Islamic calendar (`Rajab`) */
  mmmm6: string[]; /** Short month names for the Islamic calendar (`Raj.`) */
  mmm6: string[]; /** Long month names for the Gregorian calendar (`November`) */
  mmmm: string[]; /** Short month names for the Gregorian calendar (`Nov`) */
  mmm: string[]; /** Long day names (`Wednesday`) */
  dddd: string[]; /** Shortened day names (`Wed`) */
  ddd: string[]; /** How TRUE and FALSE should be presented */
  bool: string[]; /** Is the prefered date format month first ("12/31/2025") or day first ("31/12/2025") */
  preferMDY: boolean;
};
/**
 * An object of properties for a locale tag.
 */
type LocaleToken = {
  /** The basic tag such as `zh_CN` or `fi` */lang: string; /** The language section (`zh` for `zh_CN`) */
  language: string; /** The territory section (`CN` for `zh_CN`) */
  territory: string;
};
/**
 *
 */
type FormatToken = {
  /** Token type. */type: string; /** The value of the token, cleaned of extra characters. */
  value: any; /** Raw token source. */
  raw: string;
};
type ParseData = {
  /** Value */v: number | boolean; /** Number format pattern */
  z?: string;
};
/**
 * Behavior options for the formatter.
 */
type FormatOptions = {
  /**
   * A BCP 47 string tag. Locale default is english with a `\u00a0`
   * grouping symbol (see [addLocale](#addLocale))
   */
  locale?: string;
  /**
   * The string emitted when a formatter fails to format a date that is out of bounds.
   * @default "######"
   */
  overflow?: string;
  /**
   * The string emitted when no-throw mode fails to parse a pattern.
   */
  invalid?: string;
  /**
   * Should the formatter throw an error if a provided pattern is invalid.
   * If false, a formatter will be constructed which instead outputs an error string (see _invalid_ in this type).
   */
  throws?: boolean;
  /**
   * By default the output will use a regular space, but in many cases you may desire a non-breaking-space instead.
   */
  nbsp?: boolean;
  /**
  * Simulate the Lotus 1-2-3 [1900 leap year bug](https://docs.microsoft.com/en-us/office/troubleshoot/excel/wrongly-assumes-1900-is-leap-year).
  * It is a requirement in the Ecma OOXML specification so it is on by default.
   */
  leap1900?: boolean;
  /**
   * Should the formatter throw an error when trying to format a date that is out of bounds?
   * @default false
   */
  dateErrorThrows?: boolean;
  /**
   * Should the formatter switch to a General number format when trying to format a date that is out of bounds?
   * @default true
   */
  dateErrorNumber?: boolean;
  /**
   * Should the formatter switch to a plain string number format when trying to format a bigint that is out of bounds?
   * @default false
   */
  bigintErrorNumber?: boolean;
  /**
   * Extends the allowed range of dates from Excel bounds (1900–9999) to Google Sheet bounds (0–99999).
   * @default true
   */
  dateSpanLarge?: boolean;
  /**
   * Normally when date objects are used with the formatter, time zone is taken into account.
   * This makes the formatter ignore the timezone offset.
   * @default false
   */
  ignoreTimezone?: boolean;
  /**
   * When the formatter encounters `_` it normally emits a single space instead of the `_` and the next
   * character (like Excel TEXT function does). Setting this to a character will make the formatter emit
   * that followed by the next one.
   */
  skipChar?: string;
  /**
   * When the formatter encounters `*` it normally emits nothing instead of the `*` and the next
   * character (like Excel TEXT function does). Setting this to a character will make the formatter emit
   * that followed by the next one.
   */
  fillChar?: string;
  /**
   * Allows adjusting primary and secondary integer digit grouping sizes.
   *
   * The formatter usually prints grouped integer digits in 3's: `1.000.000` but for some number systems,
   * such as India's, you may want to print `10,00,000`.
   * @default [ 3, 3 ]
   */
  grouping?: [number, number];
};
type FormatColorOptions = {
  /**
   * Should the formatter throw an error if a provided pattern is invalid.
   */
  throws?: boolean;
  /**
   * Normally when date objects are used with the formatter, time zone is taken into account.
   * This makes the formatter ignore the timezone offset.
   * @default false
   */
  ignoreTimezone?: boolean;
  /**
   * When indexed color modifiers are used (`[Color 1]`) the formatter will convert the index into the
   * corresponding hex color of the default palette. When this option is set to false, the number will
   * instead by emitted allowing you to index against a custom color palette.
   * @default true
   */
  indexColors?: boolean;
};
//#endregion
//#region lib/locale.d.ts
/**
 * Parse a regular IETF BCP 47 locale tag and emit an object of its parts.
 * Irregular tags and subtags are not supported.
 *
 * @param locale - A BCP 47 string tag of the locale.
 * @returns - An object describing the locale.
 */
declare function parseLocale(locale: string): LocaleToken;
/**
 * Used by the formatter to pull a locate from its registered locales. If
 * subtag isn't available but the base language is, the base language is used.
 * So if `en-CA` is not found, the formatter tries to find `en` else it
 * returns a `null`.
 *
 * @param locale - A BCP 47 string tag of the locale, or an Excel locale code.
 * @returns - An object of format date properties.
 */
declare function getLocale(locale: string): LocaleData | null;
/**
 * Register {@link LocaleData} for a language so for use when formatting.
 *
 * Any partial set of properties may be returned to have the defaults used where properties are missing.
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
 * @returns {LocaleData} - A full collection of settings for a locale
 */
declare function addLocale(localeSettings: {
  group?: string;
  decimal?: string;
  positive?: string;
  negative?: string;
  percent?: string;
  exponent?: string;
  nan?: string;
  infinity?: string;
  ampm?: string[];
  mmmm6?: string[];
  mmm6?: string[];
  mmmm?: string[];
  mmm?: string[];
  dddd?: string[];
  ddd?: string[];
  bool?: string[];
  preferMDY?: boolean;
}, l4e: string): LocaleData;
//#endregion
//#region lib/round.d.ts
/**
 * Return a number rounded to the specified amount of places. This is the
 * rounding function used internally by the formatter (symmetric arithmetic
 * rounding).
 *
 * @param number - The number to round.
 * @param [places=0] - The number of decimals to round to.
 * @returns A rounded number.
 */
declare function round(number: number, places?: number): number;
//#endregion
//#region lib/dec2frac.d.ts
/**
 * Split a fractional number into a numerator and denominator for display as
 * vulgar fractions.
 *
 * @ignore
 * @param number The value to split
 * @param [numeratorMaxDigits=2] The maxdigits number
 * @param [denominatorMaxDigits=2] The maxdigits de
 * @returns Array of two numbers, numerator and denominator.
 */
declare function dec2frac(number: number, numeratorMaxDigits?: number, denominatorMaxDigits?: number): [number, number];
//#endregion
//#region lib/serialDate.d.ts
/**
 * Convert a native JavaScript Date, or array to an spreadsheet serial date.
 *
 * Returns a serial date number if input was a Date object or an array of
 * numbers, a null.
 *
 * ```js
 * // input as Date
 * dateToSerial(new Date(1978, 5, 17)); // 28627
 * // input as [ Y, M, D, h, m, s ]
 * dateToSerial([ 1978, 5, 17 ]); // 28627
 * // other input
 * dateToSerial("something else"); // null
 * ````
 *
 * @param date The date
 * @param [options.ignoreTimezone=false]
 *   Normally time zone will be taken into account. This makes the conversion to
 *   serial date ignore the timezone offset.
 * @returns The date as a spreadsheet serial date, or null.
 */
declare function dateToSerial(date: Date | number[], options?: {
  ignoreTimezone?: boolean;
}): number | null;
/**
 * Convert a spreadsheet serial date to an array of date parts.
 * Accurate to a second.
 *
 * ```js
 * // output as [ Y, M, D, h, m, s ]
 * dateFromSerial(28627); // [ 1978, 5, 17, 0, 0, 0 ]
 * ````
 *
 * @param serialDate The date
 * @param [options={}] The options
 * @param [options.leap1900=true]
 *   Simulate the Lotus 1-2-3 [1900 leap year bug](https://docs.microsoft.com/en-us/office/troubleshoot/excel/wrongly-assumes-1900-is-leap-year).
 * @returns returns an array of date parts
 */
declare function dateFromSerial(serialDate: number, options?: {
  leap1900?: boolean;
}): number[];
//#endregion
//#region lib/parseValue.d.ts
/**
 * Parse a numeric string input and return its value and format. If the input
 * was not recognized or valid, the function returns a `null`, for valid input
 * it returns an object with two properties:
 *
 * * `v`: the parsed value.
 * * `z`: the number format of the input (if applicable).
 *
 * @see parseValue
 * @param value The number to parse
 * @param [options.locale=""]
 *    A BCP 47 string tag. Locale default is english with a `\u00a0`
 *    grouping symbol (see [addLocale](#addLocale))
 * @returns An object of the parsed value and a corresponding format string
 */
declare function parseNumber(value: string, options?: {
  locale?: string;
}): ParseData | null;
/**
 * Parse a date or datetime string input and return its value and format. If
 * the input was not recognized or valid, the function returns a `null`, for
 * valid input it returns an object with two properties:
 *
 * - `v`: the parsed value.
 * - `z`: the number format of the input (if applicable).
 *
 * @see parseValue
 * @param value The date to parse
 * @param [options.locale=""]
 *    A BCP 47 string tag. Locale default is english with a `\u00a0`
 *    grouping symbol (see [addLocale](#addLocale))
 * @returns An object of the parsed value and a corresponding format string
 */
declare function parseDate(value: string, options?: {
  locale?: string;
}): ParseData | null;
/**
 * Parse a time string input and return its value and format. If the input was
 * not recognized or valid, the function returns a `null`, for valid input it
 * returns an object with two properties:
 *
 * - `v`: the parsed value.
 * - `z`: the number format of the input (if applicable).
 *
 * @see parseValue
 * @param value The date to parse
 * @param [options={}]  Options
 * @param [options.locale=""]
 *    A BCP 47 string tag. Locale default is english with a `\u00a0`
 *    grouping symbol (see [addLocale](#addLocale))
 * @returns An object of the parsed value and a corresponding format string
 */
declare function parseTime(value: string, options?: {
  locale?: string;
}): ParseData | null;
/**
 * Parse a string input and return its boolean value. If the input was not
 * recognized or valid, the function returns a `null`, for valid input it
 * returns an object with one property:
 *
 * - `v`: the parsed value.
 *
 * @see parseValue
 * @param value The supposed boolean to parse
 * @param [options.locale=""]
 *    A BCP 47 string tag. Locale default is english with a `\u00a0`
 *    grouping symbol (see [addLocale](#addLocale))
 * @returns An object of the parsed value and a corresponding format string
 */
declare function parseBool(value: string, options?: {
  locale?: string;
}): ParseData | null;
/**
 * Attempt to parse a "spreadsheet input" string input and return its value and
 * format. If the input was not recognized or valid, the function returns a
 * `null`, for valid input it returns an object with two properties:
 *
 * - `v`: The parsed value. For dates, this will be an Excel style serial date.
 * - `z`: (Optionally) the number format string of the input. This property will
 *        not be present if it amounts to the `General` format.
 *
 * `parseValue()` recognizes a wide range of dates and date-times, times,
 * numbers, and booleans. Some examples:
 *
 * ```js
 * // basic number
 * parseValue("-123");// { v: -123 }
 * // formatted number
 * parseValue("$1,234"); // { v: 1234, z: "$#,##0" }
 * // a percent
 * parseValue("12.3%"); // { v: 0.123, z: "0.00%" }
 * // a date
 * parseValue("07 October 1984"); // { v: 30962, z: 'dd mmmm yyyy' }
 * // an ISO formatted date-time
 * parseValue("1984-09-10 11:12:13.1234"); // { v: 30935.46681855787, z: "yyyy-mm-dd hh:mm:ss" }
 * // a boolean
 * parseValue("false"); // { v: false }
 * ```
 *
 * The formatting string outputted may not correspond exactly to the input.
 * Rather, is it composed of certain elements which the input controls. This is
 * comparable to how Microsoft Excel and Google Sheets parse pasted input. Some
 * things you may expect:
 *
 * - Whitespace is ignored.
 * - Decimal fractions are always represented by `.00` regardless of how many
 *   digits were shown in the input.
 * - Negatives denoted by parentheses [`(1,234)`] will not include the
 *   parentheses in the format string (the value will still by negative.)
 * - All "scientific notation" returns the same format: `0.00E+00`.
 *
 * Internally the parser calls, `parseNumber`, `parseDate`,
 * `parseTime` and `parseBool`. They work in the same way except
 * with a more limited scope. You may want those function if you are limiting
 * input to a smaller scope.
 *
 * Be warned that the parser do not (yet) take locale into account so all input
 * is assumed to be in "en-US". This means that `1,234.5` will parse, but
 * `1.234,5` will not. Similarly, the order of date parts will be US centric.
 * This may change in the future so be careful what options you pass the
 * functions.
 *
 * @param value The value to parse
 * @param [options.locale=""]
 *    A BCP 47 string tag. Locale default is english with a `\u00a0`
 *    grouping symbol (see [addLocale](#addLocale))
 * @returns An object of the parsed value and a corresponding format string
 */
declare function parseValue(value: string, options?: {
  locale?: string;
}): ParseData | null;
//#endregion
//#region lib/tokenize.d.ts
/**
 * Breaks a format pattern string into a list of tokens.
 *
 * The returned output will be an array of objects representing the tokens:
 *
 * ```js
 * [
 *   { type: 'zero', value: '0', raw: '0' },
 *   { type: 'point', value: '.', raw: '.' },
 *   { type: 'zero', value: '0', raw: '0' },
 *   { type: 'percent', value: '%', raw: '%' }
 * ]
 * ```
 *
 * Token types may be found as an Object as the
 * [`tokenTypes` export]{@link tokenTypes} of the package.
 *
 * @param pattern The format pattern
 * @returns a list of tokens
 */
declare function tokenize(pattern: string): FormatToken[];
//#endregion
//#region lib/index.d.ts
/**
 * Formats a value as a string and returns the result.
 *
 * - Dates are normalized to spreadsheet style serial dates and then formatted.
 * - Booleans are emitted as uppercase "TRUE" or "FALSE".
 * - Null and Undefined will return an empty string "".
 * - Any non number values will be stringified and passed through the text section of the format pattern.
 * - NaNs and infinites will use the corresponding strings from the active locale.
 *
 * @param pattern - A format pattern in the ECMA-376 number format.
 * @param value - The value to format.
 * @param [options] - Formatter options
 * @returns A formatted value
 */
declare function format(pattern: string, value: any, options?: FormatOptions): string;
/**
 * Find the color appropriate to a value as dictated by a format pattern.
 *
 * If the pattern defines colors, this function will emit the color appropriate
 * to the value. If no colors were specified this function returns `undefined`.
 *
 * ```js
 * const color = formatColor("[green]#,##0;[red]-#,##0", -10);
 * console.log(color); // "red"
 * const color = formatColor("[green]#,##0;-#,##0", -10);
 * console.log(color); // null
 * ```
 *
 * @param pattern - A format pattern in the ECMA-376 number format.
 * @param value - The value to format.
 * @param [options] - Formatter options
 * @returns
 *    A string color value as described by the pattern or a number if the
 *    indexColors option has been set to false.
 */
declare function formatColor(pattern: string, value: any, options?: FormatColorOptions): string | number | null;
/**
 * Determine if a given format pattern is a date pattern.
 *
 * The pattern is considered a date pattern if any of its sections contain a
 * date symbol (such as `Y` or `H`). Each section is restricted to be
 * _either_ a number or date format.
 *
 * @param pattern - A format pattern in the ECMA-376 number format.
 * @returns True if the specified pattern is date pattern, False otherwise.
 */
declare function isDateFormat(pattern: string): boolean;
/**
 * Determine if a given format pattern is a percentage pattern.
 *
 * The pattern is considered a percentage pattern if any of its sections
 * contains an unescaped percentage symbol.
 *
 * @param pattern - A format pattern in the ECMA-376 number format.
 * @returns True if the specified pattern is date pattern, False otherwise.
 */
declare function isPercentFormat(pattern: string): boolean;
/**
 * Determine if a given format pattern is a text only pattern.
 *
 * The pattern is considered text only if its definition is composed of a single
 * section that includes that text symbol (`@`).
 *
 * For example `@` or `@" USD"` are text patterns but `#;@` is not.
 *
 * @param pattern - A format pattern in the ECMA-376 number format.
 * @returns True if the specified pattern is date pattern, False otherwise.
 */
declare function isTextFormat(pattern: string): boolean;
/**
 * Determine if a given format pattern is valid.
 *
 * @param pattern - A format pattern in the ECMA-376 number format.
 * @returns True if the specified pattern is valid, False otherwise.
 */
declare function isValidFormat(pattern: string): boolean;
/**
 * Returns an object detailing the properties and internals of a format parsed
 * format pattern.
 *
 * @param pattern - A format pattern in the ECMA-376 number format.
 * @param [options.currency]
 *   Limit the patterns identified as currency to those that use the give string.
 *   If nothing is provided, patterns will be tagged as currency if one of the
 *   following currency symbols is used: ¤$£¥֏؋৳฿៛₡₦₩₪₫€₭₮₱₲₴₸₹₺₼₽₾₿
 * @returns An object of format properties.
 */
declare function getFormatInfo(pattern: string, options?: {
  currency?: string;
}): FormatInfo;
/**
 * Gets information about date codes use in a format string.
 *
 * @param pattern - A format pattern in the ECMA-376 number format.
 * @returns An object of format date properties.
 */
declare function getFormatDateInfo(pattern: string): FormatDateInfo;
/**
 * A dictionary of the types used to identify token variants.
 *
 * @readonly
 * @constant {Object<string>} tokenTypes
 * @property {string} AMPM - AM/PM operator (`AM/PM`, `A/P`)
 * @property {string} BREAK - Semicolon operator indicating a break between format sections (`;`)
 * @property {string} CALENDAR - Calendar modifier (`B2`)
 * @property {string} CHAR - Single non-operator character (`m`)
 * @property {string} COLOR - Color modifier (`[Black]`, `[color 5]`)
 * @property {string} COMMA - Plain non-operator comma (`,`)
 * @property {string} CONDITION - Condition modifier for a section (`[>=10]`)
 * @property {string} DATETIME - Date-time operator (`mmmm`, `YY`)
 * @property {string} DBNUM - Number display modifier (`[DBNum23]`)
 * @property {string} DIGIT - A digit between 1 and 9 (`3`)
 * @property {string} DURATION - Time duration (`[ss]`)
 * @property {string} ERROR - Unidentifiable or illegal character (`Ň`)
 * @property {string} ESCAPED - Escaped character (`\E`)
 * @property {string} EXP - Exponent operator (`E+`)
 * @property {string} FILL - Fill with char operator and operand (`*_`)
 * @property {string} GENERAL - General format operator (`General`)
 * @property {string} GROUP - Number grouping operator (`,`)
 * @property {string} HASH - Hash operator (digit if available) (`#`)
 * @property {string} LOCALE - Locale modifier (`[$-1E020404]`)
 * @property {string} MINUS - Minus sign (`-`)
 * @property {string} MODIFIER - An unidentified modifier (`[Schwarz]`)
 * @property {string} NATNUM - Number display modifier (`[NatNum3]`)
 * @property {string} PAREN - Parenthesis character (`)`)
 * @property {string} PERCENT - Percent operator (`%`)
 * @property {string} PLUS - Plus sign (`+`)
 * @property {string} POINT - Decimal point operator (`.`)
 * @property {string} QMARK - Question mark operator (digit or space if not available) (`?`)
 * @property {string} SCALE - Scaling operator (`,`)
 * @property {string} SKIP - Skip with char operator and operand (`*_`)
 * @property {string} SLASH - Slash operator (`/`)
 * @property {string} SPACE - Space (` `)
 * @property {string} STRING - Quoted string (`"days"`)
 * @property {string} TEXT - Text output operator (`@`)
 * @property {string} ZERO - Zero operator (digit or zero if not available) (`0`)
 * @see tokenize
 */
declare const tokenTypes: Readonly<{
  AMPM: "ampm";
  BREAK: "break";
  CALENDAR: "calendar";
  CHAR: "char";
  COLOR: "color";
  COMMA: "comma";
  CONDITION: "condition";
  DATETIME: "datetime";
  DBNUM: "dbnum";
  DIGIT: "digit";
  DURATION: "duration";
  ERROR: "error";
  ESCAPED: "escaped";
  EXP: "exp";
  FILL: "fill";
  GENERAL: "general";
  GROUP: "group";
  HASH: "hash";
  LOCALE: "locale";
  MINUS: "minus";
  MODIFIER: "modifier";
  NATNUM: "natnum";
  PAREN: "paren";
  PERCENT: "percent";
  PLUS: "plus";
  POINT: "point";
  QMARK: "qmark";
  SCALE: "scale";
  SKIP: "skip";
  SLASH: "slash";
  SPACE: "space";
  STRING: "string";
  TEXT: "text";
  ZERO: "zero";
}>;
//#endregion
export { addLocale, dateFromSerial, dateToSerial, dec2frac, format, formatColor, getFormatDateInfo, getFormatInfo, getLocale, isDateFormat, isPercentFormat, isTextFormat, isValidFormat, parseBool, parseDate, parseLocale, parseNumber, parseTime, parseValue, round, tokenTypes, tokenize };
//# sourceMappingURL=index.d.cts.map