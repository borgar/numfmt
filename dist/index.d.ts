//#region lib/locale.d.ts
/**
 * An object of properties used by a formatter when printing a number in a certain locale.
 */
type LocaleData = {
  /** Symbol used as a grouping separator (`1,000,000` uses `,`) */
  group: string;
  /** Symbol used to separate integers from fractions (usually `.`) */
  decimal: string;
  /** Symbol used to indicate positive numbers (usually `+`) */
  positive: string;
  /** Symbol used to indicate positive numbers (usually `-`) */
  negative: string;
  /** Symbol used to indicate a percentage (usually `%`) */
  percent: string;
  /** Symbol used to indicate an exponent (usually `E`) */
  exponent: string;
  /** Symbol used to indicate NaN values (`NaN`) */
  nan: string;
  /** Symbol used to indicate infinite values (`∞`) */
  infinity: string;
  /** How AM and PM should be presented */
  ampm: string[];
  /** Long month names for the Islamic calendar (`Rajab`) */
  mmmm6: string[];
  /** Short month names for the Islamic calendar (`Raj.`) */
  mmm6: string[];
  /** Long month names for the Gregorian calendar (`November`) */
  mmmm: string[];
  /** Short month names for the Gregorian calendar (`Nov`) */
  mmm: string[];
  /** Long day names (`Wednesday`) */
  dddd: string[];
  /** Shortened day names (`Wed`) */
  ddd: string[];
  /** How TRUE and FALSE should be presented */
  bool: string[];
  /** Is the prefered date format month first (12/31/2025) or day first (31/12/2025) */
  preferMDY: boolean;
};
/**
 * An object of properties for a locale tag.
 *
 * ```js
 * { lang: 'zh-CN', language: 'zh', territory: 'CN' }
 * ```
 */
type LocaleToken = {
  /** The basic tag such as `zh-CN` or `fi` */
  lang: string;
  /** The language section (`zh` for `zh-CN`) */
  language: string;
  /** The territory section (`CN` for `zh-CN`) */
  territory: string;
};
/**
 * Parse a regular IETF BCP 47 locale tag (`en-US`) and emit an object of its parts.
 * Irregular tags and subtags are not supported.
 *
 * @param locale A BCP 47 string tag of the locale.
 * @returns An object describing the locale.
 */
declare function parseLocale(locale: string): LocaleToken;
/**
 * Used by the formatter to pull a locate from its registered locales. If
 * subtag isn't available but the base language is, the base language is used:
 * So if `en-CA` is not found, the formatter tries to find `en` else it
 * returns `undefined`.
 *
 * @param locale A BCP 47 string tag of the locale, or an Excel locale code.
 * @returns An object of format date properties if one was found.
 */
declare function getLocale(locale: string | number): LocaleData | undefined;
/**
 * Register locale data for a language to use when formatting.
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
 * @param {boolean} [localeSettings.preferMDY=false]
 *    Is the prefered date format month first (12/31/2025) or day first (31/12/2025)
 * @param l4e - A string BCP 47 tag of the locale.
 * @returns A full collection of settings for a locale
 */
declare function addLocale(localeSettings: Partial<LocaleData>, l4e: string): LocaleData;
//#endregion
//#region lib/options.d.ts
/** Options that control the behavior of the formatter. */
type FormatOptions = {
  /**
   * The string emitted when a formatter fails to format a date that is out of bounds.
   * Both `dateErrorThrows` and `dateErrorNumber` override this setting.
   * @default '######'
   */
  overflow: string;
  /**
   * Should the formatter throw an error when trying to format a date that is out of bounds?
   * @default false
   */
  dateErrorThrows: boolean;
  /**
   * Should the formatter emit a number when trying to format a date that is out of bounds?
   * This is default behaviour by Google Sheets. `dateErrorThrows` overrides this setting.
   * @default true
   */
  dateErrorNumber: boolean;
  /**
   * Should the formatter switch to a plain string number format when trying to
   * format a bigint that is out of bounds of regular JS numbers?
   * @default false
   */
  bigintErrorNumber: boolean;
  /**
   * Extends the allowed range of dates from Excel bounds (1900–9999) to Google Sheet bounds (0–99999).
   * @default true
   */
  dateSpanLarge: boolean;
  /**
   * Simulate the Lotus 1-2-3 [1900 leap year bug](https://docs.microsoft.com/en-us/office/troubleshoot/excel/wrongly-assumes-1900-is-leap-year).
   * It is a requirement in the Ecma OOXML specification so it is on by default.
   * @default true
   */
  leap1900: boolean;
  /**
   * Emit regular vs. non-breaking spaces. By default the output will use a regular
   * space, but in many cases you may desire a non-breaking-space instead.
   * @default false
   */
  nbsp: boolean;
  /**
   * Should the formatter throw an error if a provided pattern is invalid.
   * If false, a formatter will be constructed which instead outputs an error
   * string (see _invalid_ in this table).
   * @default true
   */
  throws: boolean;
  /**
   * The string emitted when formatter fails to parse a pattern and has been instructed
   * not to throw an error.
   * @default '######'
   */
  invalid: string;
  /**
   * A BCP 47 string tag or Excel [MsoLanguageID](https://docs.microsoft.com/en-us/office/vba/api/office.msolanguageid). Locale default is english with a `\u00a0`
   * grouping symbol (see [addLocale](#addLocale))
   * @default ''
   */
  locale: string | number;
  /**
   * Normally when date objects are used with the formatter, time zone is taken
   * into account and the date is adjusted into UTC. This option makes the formatter
   * ignore the timezone offset.
   * @default false
   */
  ignoreTimezone: boolean;
  /**
   * Integer grouping sizes. You may desire to emit numbers in standards other than the common 3 digits
   * per group (e.g. "123,456,789"). The first grouping size is used for the least significant integer
   * group, and the second grouping size is used for more significant groups (e.g. `[3, 2]` => "12,34,56,789").
   * @default [ 3 ]
   */
  grouping: [number, number] | [number];
  /**
   * Automatically resolve indexed colors to hex when outputting colors (red => #f00);
   * When indexed color modifiers are used (`[Color 1]`) the formatter will convert the index
   * into the corresponding hex color of the default palette. When this option is set to false,
   * the number will instead by emitted allowing you to index against a custom palette.
   * @default true
   */
  indexColors: boolean;
  /**
   * When the formatter encounters `_` it normally emits a single space instead
   * of the `_` and the next character (like Excel TEXT function does). Setting
   * this to a character will make the formatter emit that followed by the next
   * one.
   * @default ''
   */
  skipChar: string;
  /**
   * When the formatter encounters `*` it normally emits nothing instead of the
   * `*` and the next character (like Excel TEXT function does). Setting this
   * to a character will make the formatter emit that followed by the next one.
   * @default ''
   */
  fillChar: string;
};
//#endregion
//#region lib/round.d.ts
/**
 * Return a number rounded to the specified amount of places. This is the
 * rounding function used internally by the formatter (symmetric arithmetic
 * rounding). It rounds the same way Excel does.
 *
 * @param number The number to round.
 * @param [places] The number of decimals to round to.
 * @returns A rounded number.
 */
declare function round(number: number, places?: number): number;
//#endregion
//#region lib/parseValue.d.ts
/**
 * Output from a number or date value parser.
 */
type ParseDataNum = {
  /** A number value */
  v: number;
  /** A number format pattern */
  z?: string;
};
/**
 * Output from the boolean value parser.
 */
type ParseDataBool = {
  /** A boolean value */
  v: boolean;
  /** A number format pattern */
  z?: string;
};
/**
 * Parse a numeric string input and return its value and format. If the input
 * was not recognized or valid, the function returns a `undefined`, for valid input
 * it returns an object with two properties:
 *
 * * `v`: the parsed value.
 * * `z`: the number format of the input (if applicable).
 *
 * @param value The number to parse
 * @param [options]  Options for the parser
 * @param [options.locale]
 *    A BCP 47 string tag. Locale default is english with a `\u00a0`
 *    grouping symbol (see [addLocale](#addLocale))
 * @returns An object of the parsed value and a corresponding format string
 */
declare function parseNumber(value: string, options?: {
  locale?: string;
}): ParseDataNum | undefined;
/**
 * Parse a date or datetime string input and return its value and format. If
 * the input was not recognized or valid, the function returns an `undefined`, for
 * valid input it returns an object with two properties:
 *
 * - `v`: the parsed value.
 * - `z`: the number format of the input (if applicable).
 *
 * @param value The string to parse
 * @param [options={}]  Options for the parser
 * @param [options.locale=""]
 *    A BCP 47 string tag. Locale default is english with a `\u00a0`
 *    grouping symbol (see [addLocale](#addLocale))
 * @returns An object of the parsed value and a corresponding format string
 */
declare function parseDate(value: string, options?: {
  locale?: string;
}): ParseDataNum | undefined;
/**
 * Parse a time string input and return its value and format. If the input was
 * not recognized or valid, the function returns a `undefined`, for valid input it
 * returns an object with two properties:
 *
 * - `v`: the parsed value.
 * - `z`: the number format of the input (if applicable).
 *
 * @param value The date to parse
 * @param [options]  Options for the parser
 * @param [options.locale]
 *    A BCP 47 string tag. Locale default is english with a `\u00a0`
 *    grouping symbol (see [addLocale](#addLocale))
 * @returns An object of the parsed value and a corresponding format string
 */
declare function parseTime(value: string, options?: {
  locale?: string;
}): ParseDataNum | undefined;
/**
 * Parse a string input and return its equivalent boolean value. If the input was not
 * recognized or valid, the function returns an `undefined`, for valid input it
 * returns an object with a single property:
 *
 * - `v`: the parsed value.
 *
 * @param value The supposed boolean to parse
 * @param [options] Options for the parser
 * @param [options.locale]
 *    A BCP 47 string tag. Locale default is english with a `\u00a0`
 *    grouping symbol (see [addLocale](#addLocale))
 * @returns An object of the parsed value and a corresponding format string
 */
declare function parseBool(value: string, options?: {
  locale?: string;
}): ParseDataBool | undefined;
/**
 * Attempt to parse a "spreadsheet input" string input and return its value and
 * format. If the input was not recognized or valid, the function returns an
 * `undefined`, for valid input it returns an object with two properties:
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
 *   parentheses in the format string (the value will still be negative.)
 * - All "scientific notation" returns the same format: `0.00E+00`.
 *
 * Internally the parser calls, `parseNumber`, `parseDate`,
 * `parseTime` and `parseBool`. They work in the same way except
 * with a more limited scope. You may prefer those functions if you are limiting
 * input to a smaller scope.
 *
 * @param value The value to parse
 * @param [options] Options for the parser
 * @param [options.locale]
 *    A BCP 47 string tag. Locale default is english with a `\u00a0`
 *    grouping symbol (see {@link addLocale})
 * @returns An object of the parsed value and a corresponding format string
 */
declare function parseValue(value: string, options?: {
  locale?: string;
}): ParseDataNum | ParseDataBool | undefined;
//#endregion
//#region lib/constants.d.ts
declare const TOKEN_GENERAL = "GENERAL";
declare const TOKEN_HASH = "HASH";
declare const TOKEN_ZERO = "ZERO";
declare const TOKEN_QMARK = "QMARK";
declare const TOKEN_SLASH = "SLASH";
declare const TOKEN_GROUP = "GROUP";
declare const TOKEN_SCALE = "SCALE";
declare const TOKEN_COMMA = "COMMA";
declare const TOKEN_BREAK = "BREAK";
declare const TOKEN_TEXT = "TEXT";
declare const TOKEN_PLUS = "PLUS";
declare const TOKEN_MINUS = "MINUS";
declare const TOKEN_POINT = "POINT";
declare const TOKEN_SPACE = "SPACE";
declare const TOKEN_PERCENT = "PERCENT";
declare const TOKEN_DIGIT = "DIGIT";
declare const TOKEN_CALENDAR = "CALENDAR";
declare const TOKEN_ERROR = "ERROR";
declare const TOKEN_DATETIME = "DATETIME";
declare const TOKEN_DURATION = "DURATION";
declare const TOKEN_CONDITION = "CONDITION";
declare const TOKEN_DBNUM = "DBNUM";
declare const TOKEN_NATNUM = "NATNUM";
declare const TOKEN_LOCALE = "LOCALE";
declare const TOKEN_COLOR = "COLOR";
declare const TOKEN_MODIFIER = "MODIFIER";
declare const TOKEN_AMPM = "AMPM";
declare const TOKEN_ESCAPED = "ESCAPED";
declare const TOKEN_STRING = "STRING";
declare const TOKEN_SKIP = "SKIP";
declare const TOKEN_EXP = "EXP";
declare const TOKEN_FILL = "FILL";
declare const TOKEN_PAREN = "PAREN";
declare const TOKEN_CHAR = "CHAR";
//#endregion
//#region lib/types.d.ts
/**
 * A valid token type.
 *
 * | Token type      | Description
 * |---------------- |----------------
 * | TOKEN_AMPM      | AM/PM operator (`AM/PM`, `A/P`)
 * | TOKEN_BREAK     | Semicolon operator indicating a break between format sections (`;`)
 * | TOKEN_CALENDAR  | Calendar modifier (`B2`)
 * | TOKEN_CHAR      | Single non-operator character (`m`)
 * | TOKEN_COLOR     | Color modifier (`[Black]`, `[color 5]`)
 * | TOKEN_COMMA     | Plain non-operator comma (`,`)
 * | TOKEN_CONDITION | Condition modifier for a section (`[>=10]`)
 * | TOKEN_DATETIME  | Date-time operator (`mmmm`, `YY`)
 * | TOKEN_DBNUM     | Number display modifier (`[DBNum23]`)
 * | TOKEN_DIGIT     | A digit between 1 and 9 (`3`)
 * | TOKEN_DURATION  | Time duration (`[ss]`)
 * | TOKEN_ERROR     | Unidentifiable or illegal character (`Ň`)
 * | TOKEN_ESCAPED   | Escaped character (`\E`)
 * | TOKEN_EXP       | Exponent operator (`E+`)
 * | TOKEN_FILL      | Fill with char operator and operand (`*_`)
 * | TOKEN_GENERAL   | General format operator (`General`)
 * | TOKEN_GROUP     | Number grouping operator (`,`)
 * | TOKEN_HASH      | Hash operator (digit if available) (`#`)
 * | TOKEN_LOCALE    | Locale modifier (`[$-1E020404]`)
 * | TOKEN_MINUS     | Minus sign (`-`)
 * | TOKEN_MODIFIER  | An unidentified modifier (`[Lorem]`)
 * | TOKEN_NATNUM    | Number display modifier (`[NatNum3]`)
 * | TOKEN_PAREN     | Parenthesis character (`)`)
 * | TOKEN_PERCENT   | Percent operator (`%`)
 * | TOKEN_PLUS      | Plus sign (`+`)
 * | TOKEN_POINT     | Decimal point operator (`.`)
 * | TOKEN_QMARK     | Question mark operator (digit or space if not available) (`?`)
 * | TOKEN_SCALE     | Scaling operator (`,`)
 * | TOKEN_SKIP      | Skip with char operator and operand (`*_`)
 * | TOKEN_SLASH     | Slash operator (`/`)
 * | TOKEN_SPACE     | Space (` `)
 * | TOKEN_STRING    | Quoted string (`"days"`)
 * | TOKEN_TEXT      | Text output operator (`@`)
 * | TOKEN_ZERO      | Zero operator (digit or zero if not available) (`0`) *
 */
type TokenType = (typeof TOKEN_GENERAL | typeof TOKEN_HASH | typeof TOKEN_ZERO | typeof TOKEN_QMARK | typeof TOKEN_SLASH | typeof TOKEN_GROUP | typeof TOKEN_SCALE | typeof TOKEN_COMMA | typeof TOKEN_BREAK | typeof TOKEN_TEXT | typeof TOKEN_PLUS | typeof TOKEN_MINUS | typeof TOKEN_POINT | typeof TOKEN_SPACE | typeof TOKEN_PERCENT | typeof TOKEN_DIGIT | typeof TOKEN_CALENDAR | typeof TOKEN_ERROR | typeof TOKEN_DATETIME | typeof TOKEN_DURATION | typeof TOKEN_CONDITION | typeof TOKEN_DBNUM | typeof TOKEN_NATNUM | typeof TOKEN_LOCALE | typeof TOKEN_COLOR | typeof TOKEN_MODIFIER | typeof TOKEN_AMPM | typeof TOKEN_ESCAPED | typeof TOKEN_STRING | typeof TOKEN_SKIP | typeof TOKEN_EXP | typeof TOKEN_FILL | typeof TOKEN_PAREN | typeof TOKEN_CHAR);
/**
 * A token emitted by the tokenizer.
 */
type Token = {
  /** Token type. */
  type: TokenType;
  /** The value of the token, cleaned of extra characters. */
  value: any;
  /** Raw token source. */
  raw: string;
};
/**
 * An object of information properties based on a format pattern.
 * See the {@link getFormatInfo} method.
 */
type FormatInfo = {
  /** A string identifier for the type of the number formatter. */
  type: ('currency' | 'date' | 'datetime' | 'error' | 'fraction' | 'general' | 'grouped' | 'number' | 'percent' | 'scientific' | 'text' | 'time');
  /** Corresponds to the output from isDateFormat. */
  isDate: boolean;
  /** Corresponds to the output from isTextFormat. */
  isText: boolean;
  /** Corresponds to the output from isPercentFormat. */
  isPercent: boolean;
  /** The maximum number of decimals this format will emit. */
  maxDecimals: number;
  /**
   * 1 if the format uses color on the negative portion of the string, else
   * a 0. This replicates Excel's `CELL("color")` functionality.
   */
  color: 0 | 1;
  /**
   * 1 if the positive portion of the number format contains an open
   * parenthesis, else a 0. This is replicates Excel's `CELL("parentheses")`
   * functionality.
   */
  parentheses: 0 | 1;
  /** 1 if the positive portion of the format uses a thousands separator, else a 0. */
  grouped: 0 | 1;
  /**
   * Corresponds to Excel's `CELL("format")` functionality. It should match Excel's esoteric behaviour fairly well.
   * [See Microsoft's documentation.](https://support.microsoft.com/en-us/office/cell-function-51bd39a5-f338-4dbe-a33f-955d67c2b2cf)
   */
  code: string;
  /** The multiplier used when formatting the number (100 for percentages). */
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
 * See the {@link getFormatDateInfo} method.
 */
type FormatDateInfo = {
  /** true if the pattern uses years else false. */
  year: boolean;
  /** true if the pattern uses months else false. */
  month: boolean;
  /** true if the pattern uses day of the month else false. */
  day: boolean;
  /** true if the pattern uses hours else false. */
  hours: boolean;
  /** true if the pattern uses minutes else false. */
  minutes: boolean;
  /** true if the pattern uses seconds else false. */
  seconds: boolean;
  /** 12 if the pattern uses AM/PM clock else 24. */
  clockType: 12 | 24;
};
//#endregion
//#region lib/serialDate.d.ts
/**
 * Convert a native JavaScript Date, or an array of date parts to an spreadsheet serial date.
 *
 * Returns a serial date number if input was a Date object or an array of
 * numbers, else a null.
 *
 * ```js
 * // input as Date
 * dateToSerial(new Date(1978, 5, 17)); // 28627
 * // input as [ Y, M, D, h, m, s ]
 * dateToSerial([ 1978, 5, 17 ]); // 28627
 * // other input
 * dateToSerial("something else"); // null
 * ```
 *
 * @param date A Date instance or an array of date parts in descending order.
 * @param [options={}]  Options for this method
 * @param [options.ignoreTimezone]
 *   Normally time zone will be taken into account. This makes the conversion to
 *   serial date ignore the timezone offset.
 * @returns The date as a spreadsheet serial date, or undefined.
 */
declare function dateToSerial(date: Date | number[], options?: {
  ignoreTimezone?: boolean;
}): number | undefined;
/**
 * Convert a spreadsheet serial date to an array of date parts.
 * Accurate to a second.
 *
 * ```js
 * // output as [ Y, M, D, h, m, s ]
 * dateFromSerial(28627); // [ 1978, 5, 17, 0, 0, 0 ]
 * ```
 *
 * @param serialDate The date
 * @param [options] Options for this method
 * @param [options.leap1900]
 *   Simulate the Lotus 1-2-3 [1900 leap year bug](https://docs.microsoft.com/en-us/office/troubleshoot/excel/wrongly-assumes-1900-is-leap-year).
 *   True by default.
 * @returns returns an array of date parts with parts in descending order: [ year, month, day, hour, minute, second ]
 */
declare function dateFromSerial(serialDate: number, options?: {
  leap1900?: boolean;
}): [number, number, number, number, number, number];
//#endregion
//#region lib/tokenize.d.ts
/**
 * Breaks a format pattern string into a list of tokens.
 *
 * The returned output will be an array of objects representing the tokens:
 *
 * ```js
 * [
 *   { type: TOKEN_ZERO, value: '0', raw: '0' },
 *   { type: TOKEN_POINT, value: '.', raw: '.' },
 *   { type: TOKEN_ZERO, value: '0', raw: '0' },
 *   { type: TOKEN_PERCENT, value: '%', raw: '%' }
 * ]
 * ```
 *
 * @param pattern The format pattern
 * @returns A list of tokens
 */
declare function tokenize(pattern: string): Token[];
//#endregion
//#region lib/index.d.ts
/**
 * Formats a value as a string and returns the result.
 *
 * - Dates are normalized to spreadsheet style serial dates and then formatted.
 * - Booleans are emitted as uppercase `TRUE` or `FALSE`.
 * - `null` and `undefined` will return an empty string `""`.
 * - Any non number values will be stringified and passed through the text section of the format pattern.
 * - `NaN`s and `Infinite`s will use the corresponding strings from the active locale.
 *
 * @param pattern - A format pattern in the ECMA-376 number format.
 * @param value - The value to format.
 * @param [options={}]  Formatter options
 * @returns A formatted value
 */
declare function format(pattern: string, value: any, options?: Partial<FormatOptions>): string;
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
 * console.log(color); // undefined
 * ```
 *
 * @param pattern - A format pattern in the ECMA-376 number format.
 * @param value - The value to format.
 * @param [options={}] Formatter options
 * @param [options.throws=true]
 *    Should the formatter throw an error if a provided pattern is invalid.
 *    If false, a formatter will be constructed which instead outputs an error
 *    string (see _invalid_ in this table).
 *    `true` by default.
 * @param [options.ignoreTimezone=false]
 *    Normally when date objects are used with the formatter, time zone is taken
 *    into account. This makes the formatter ignore the timezone offset.
 *    `false` by default.
 * @param [options.indexColors=true]
 *    When indexed color modifiers are used (`[Color 1]`) the formatter will
 *    convert the index into the corresponding hex color of the default palette.
 *    When this option is set to false, the number will instead by emitted
 *    allowing you to index against a custom palette.
 *    `true` by default.
 * @returns
 *    A string color value as described by the pattern or a number if the
 *    indexColors option has been set to false.
 */
declare function formatColor(pattern: string, value: any, options?: {
  throws?: boolean;
  ignoreTimezone?: boolean;
  indexColors?: boolean;
}): string | number | undefined;
/**
 * Determine if a given format pattern is a date pattern.
 *
 * The pattern is considered a date pattern if any of its sections (`"a;b;c;d"`)
 * contains a date operator (such as `Y` or `H`). Each section is restricted to be
 * _either_ a number or date format.
 *
 * @param pattern A format pattern in the ECMA-376 number format.
 * @returns True if the specified pattern is date pattern, False otherwise.
 */
declare function isDateFormat(pattern: string): boolean;
/**
 * Determine if a given format pattern is a percentage pattern.
 *
 * The pattern is considered a percentage pattern if any of its sections (`"a;b;c;d"`)
 * contains an unescaped percentage symbol.
 *
 * @param pattern A format pattern in the ECMA-376 number format.
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
 * @param pattern A format pattern in the ECMA-376 number format.
 * @returns True if the specified pattern is date pattern, False otherwise.
 */
declare function isTextFormat(pattern: string): boolean;
/**
 * Determine if a given format pattern is valid.
 *
 * @param pattern A format pattern in the ECMA-376 number format.
 * @returns True if the specified pattern is valid, False otherwise.
 */
declare function isValidFormat(pattern: string): boolean;
/**
 * Returns an object detailing the properties and internals of a format parsed
 * format pattern.
 *
 * @param pattern A format pattern in the ECMA-376 number format.
 * @param [options={}]  Options for the method
 * @param [options.currency]
 *   Limit the patterns identified as currency to those that use the give string.
 *   If nothing is provided, patterns will be tagged as currency if one of the
 *   following currency symbols is used: `¤$£¥֏؋৳฿៛₡₦₩₪₫€₭₮₱₲₴₸₹₺₼₽₾₿`
 * @returns An object of format properties.
 */
declare function getFormatInfo(pattern: string, options?: {
  currency?: string;
}): FormatInfo;
/**
 * Gets information about how date codes are used in a format string.
 *
 * @param pattern A format pattern in the ECMA-376 number format.
 * @returns An object of format date properties.
 */
declare function getFormatDateInfo(pattern: string): FormatDateInfo;
//#endregion
export { type FormatDateInfo, type FormatInfo, type FormatOptions, type LocaleData, type LocaleToken, type ParseDataBool, type ParseDataNum, type TOKEN_AMPM, type TOKEN_BREAK, type TOKEN_CALENDAR, type TOKEN_CHAR, type TOKEN_COLOR, type TOKEN_COMMA, type TOKEN_CONDITION, type TOKEN_DATETIME, type TOKEN_DBNUM, type TOKEN_DIGIT, type TOKEN_DURATION, type TOKEN_ERROR, type TOKEN_ESCAPED, type TOKEN_EXP, type TOKEN_FILL, type TOKEN_GENERAL, type TOKEN_GROUP, type TOKEN_HASH, type TOKEN_LOCALE, type TOKEN_MINUS, type TOKEN_MODIFIER, type TOKEN_NATNUM, type TOKEN_PAREN, type TOKEN_PERCENT, type TOKEN_PLUS, type TOKEN_POINT, type TOKEN_QMARK, type TOKEN_SCALE, type TOKEN_SKIP, type TOKEN_SLASH, type TOKEN_SPACE, type TOKEN_STRING, type TOKEN_TEXT, type TOKEN_ZERO, type Token, type TokenType, addLocale, dateFromSerial, dateToSerial, format, formatColor, getFormatDateInfo, getFormatInfo, getLocale, isDateFormat, isPercentFormat, isTextFormat, isValidFormat, parseBool, parseDate, parseLocale, parseNumber, parseTime, parseValue, round, tokenize };
//# sourceMappingURL=index.d.ts.map