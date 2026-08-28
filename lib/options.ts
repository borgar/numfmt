/** Options that control the behavior of the formatter. */
export type FormatOptions = {
  /**
   * The string emitted when a formatter fails to format a date that is out of bounds.
   * Both `dateErrorThrows` and `dateErrorNumber` override this setting.
   * @default '######'
   */
  overflow: string,

  /**
   * Should the formatter throw an error when trying to format a date that is out of bounds?
   * @default false
   */
  dateErrorThrows: boolean,

  /**
   * Should the formatter emit a number when trying to format a date that is out of bounds?
   * This is default behaviour by Google Sheets. `dateErrorThrows` overrides this setting.
   * @default true
   */
  dateErrorNumber: boolean,

  /**
   * Should the formatter switch to a plain string number format when trying to
   * format a bigint that is out of bounds of regular JS numbers?
   * @default false
   */
  bigintErrorNumber: boolean,

  /**
   * Extends the allowed range of dates from Excel bounds (1900–9999) to Google Sheet bounds (0–99999).
   * @default true
   */
  dateSpanLarge: boolean,

  /**
   * Simulate the Lotus 1-2-3 [1900 leap year bug](https://docs.microsoft.com/en-us/office/troubleshoot/excel/wrongly-assumes-1900-is-leap-year).
   * It is a requirement in the Ecma OOXML specification so it is on by default.
   * @default true
   */
  leap1900: boolean,

  /**
   * Emit regular vs. non-breaking spaces. By default the output will use a regular
   * space, but in many cases you may desire a non-breaking-space instead.
   * @default false
   */
  nbsp: boolean,

  /**
   * Should the formatter throw an error if a provided pattern is invalid.
   * If false, a formatter will be constructed which instead outputs an error
   * string (see _invalid_ in this type).
   * @default true
   */
  throws: boolean,

  /**
   * The string emitted when formatter fails to parse a pattern and has been instructed
   * not to throw an error.
   * @default '######'
   */
  invalid: string,

  /**
   * A BCP 47 string tag or Excel [MsoLanguageID](https://docs.microsoft.com/en-us/office/vba/api/office.msolanguageid). Locale default is english with a `\u00a0`
   * grouping symbol (see [addLocale](#addLocale))
   * @default ''
   */
  locale: string | number,

  /**
   * Normally when date objects are used with the formatter, time zone is taken
   * into account and the date is adjusted into UTC. This option makes the formatter
   * ignore the timezone offset.
   * @default false
   */
  ignoreTimezone: boolean,

  /**
   * Integer grouping sizes. You may desire to emit numbers in standards other than the common 3 digits
   * per group (e.g. "123,456,789"). The first grouping size is used for the least significant integer
   * group, and the second grouping size is used for more significant groups (e.g. `[3, 2]` => "12,34,56,789").
   * @default [ 3, 3 ]
   */
  grouping: [ number, number ] | [ number ],

  /**
   * Automatically resolve indexed colors to hex when outputting colors (red => #f00);
   * When indexed color modifiers are used (`[Color 1]`) the formatter will convert the index
   * into the corresponding hex color of the default palette. When this option is set to false,
   * the number will instead by emitted allowing you to index against a custom palette.
   * @default true
   */
  indexColors: boolean,

  /**
   * When the formatter encounters `_` it normally emits a single space instead
   * of the `_` and the next character (like Excel TEXT function does). Setting
   * this to a character will make the formatter emit that followed by the next
   * one.
   * @default ''
   */
  skipChar: string,

  /**
   * When the formatter encounters `*` it normally emits nothing instead of the
   * `*` and the next character (like Excel TEXT function does). Setting this
   * to a character will make the formatter emit that followed by the next one.
   * @default ''
   */
  fillChar: string,
};

export const defaultOptions: FormatOptions = {
  overflow: '######',
  dateErrorThrows: false,
  dateErrorNumber: true,
  bigintErrorNumber: false,
  dateSpanLarge: true,
  leap1900: true,
  nbsp: false,
  throws: true,
  invalid: '######',
  locale: '',
  ignoreTimezone: false,
  grouping: [ 3, 3 ],
  indexColors: true,
  skipChar: '',
  fillChar: ''
};
