import type { EPOCH_1317, EPOCH_1900, EPOCH_1904 } from './constants.ts';

/**
 * An object of information properties based on a format pattern.
 */
export type FormatInfo = {
  /** A string identifier for the type of the number formatter. */
  type: (
    'currency' | 'date' | 'datetime' |
    'error' | 'fraction' | 'general' |
    'grouped' | 'number' | 'percent' |
    'scientific' | 'text' | 'time'
  );
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
export type FormatDateInfo = {
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

/**
 * An object of properties used by a formatter when printing a number in a certain locale.
 */
export type LocaleData = {
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
  /** Is the prefered date format month first ("12/31/2025") or day first ("31/12/2025") */
  preferMDY: boolean;
};

/**
 * An object of properties for a locale tag.
 */
export type LocaleToken = {
  /** The basic tag such as `zh_CN` or `fi` */
  lang: string;
  /** The language section (`zh` for `zh_CN`) */
  language: string;
  /** The territory section (`CN` for `zh_CN`) */
  territory: string;
};

/**
 *
 */
export type FormatToken = {
  /** Token type. */
  type: string;
  /** The value of the token, cleaned of extra characters. */
  value: any;
  /** Raw token source. */
  raw: string;
};

export type RunToken = {
  type: string;
  value?: any;
  raw?: string;
  pad?: number;
  date?: number;
  size?: number;
  decimals?: number;
  indeterminate?: boolean;
  used?: boolean;
  short?: boolean;
  plus?: boolean;
  num?: string;
  volatile?: boolean;
  rule?: 'num' | 'den' | 'num+int';
};

export type PatternPart = {
  clock: 24 | 12,
  color?: string | number,
  condition?: [ string, number ],
  date: number,
  date_eval: boolean,
  date_system: typeof EPOCH_1900 | typeof EPOCH_1904 | typeof EPOCH_1317,
  dec_fractions?: boolean;
  den_max?: number;
  den_min?: number;
  den_p?: string;
  den_pattern: string[],
  denominator?: number,
  error?: string;
  exp_plus?: boolean;
  exponential?: boolean;
  // frac_min?: number;
  frac_max?: number;
  frac_pattern: string[],
  fractions?: boolean;
  general: boolean,
  generated?: boolean;
  grouping?: boolean,
  int_max?: number;
  int_min?: number,
  int_p?: string;
  int_pattern: string[],
  integer?: boolean,
  locale?: string,
  // man_max?: string;
  // man_min?: string;
  man_p?: string;
  man_pattern: string[],
  // num_max?: number;
  num_min?: number;
  num_p?: string;
  num_pattern: string[],
  parens?: boolean;
  pattern: string;
  percent: boolean,
  scale: number,
  sec_decimals: number,
  text: boolean,
  tokens: RunToken[],
  tokensUsed?: number;
};

export type ParseData = {
  /** Value */
  v: number | boolean;
  /** Number format pattern */
  z?: string;
};

/**
 * Behavior options for the formatter.
 */
export type FormatOptions = {
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
  // XXX: Are there tests for this?
  grouping?: [ number, number ],
};

export type FormatColorOptions = {
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
