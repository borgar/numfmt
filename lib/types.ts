import {
  EPOCH_1900, EPOCH_1317,
  TOKEN_AMPM, TOKEN_ERROR, TOKEN_EXP, TOKEN_FILL, TOKEN_GENERAL, TOKEN_MINUS, TOKEN_PLUS, TOKEN_POINT, TOKEN_SKIP,
  TOKEN_SPACE, TOKEN_STRING, TOKEN_TEXT, TOKEN_HASH, TOKEN_QMARK, TOKEN_COMMA, TOKEN_SCALE, TOKEN_ZERO, TOKEN_SLASH,
  TOKEN_GROUP, TOKEN_PERCENT, TOKEN_DIGIT, TOKEN_DURATION, TOKEN_BREAK, TOKEN_CALENDAR, TOKEN_CONDITION, TOKEN_COLOR,
  TOKEN_PAREN, TOKEN_CHAR, TOKEN_MODIFIER, TOKEN_DBNUM, TOKEN_NATNUM, TOKEN_DATETIME, TOKEN_LOCALE, TOKEN_ESCAPED,
  T_TYPE_INT, T_TYPE_NUM, T_TYPE_DEN, T_TYPE_DIV, T_TYPE_FRAC, T_TYPE_MAN, T_TYPE_SUBSEC, T_TYPE_YEAR_S, T_TYPE_YEAR,
  T_TYPE_B_YEAR_S, T_TYPE_B_YEAR, T_TYPE_DAY, T_TYPE_WEEKDAY_S, T_TYPE_WEEKDAY, T_TYPE_HOUR, T_TYPE_MNAME_S,
  T_TYPE_MNAME_1, T_TYPE_MNAME, T_TYPE_MIN, T_TYPE_MON, T_TYPE_HOUR_E, T_TYPE_MIN_E, T_TYPE_SEC_E, T_TYPE_SEC

} from './constants.ts';

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
export type TokenType = (
  typeof TOKEN_GENERAL | typeof TOKEN_HASH | typeof TOKEN_ZERO | typeof TOKEN_QMARK |
  typeof TOKEN_SLASH | typeof TOKEN_GROUP | typeof TOKEN_SCALE | typeof TOKEN_COMMA |
  typeof TOKEN_BREAK | typeof TOKEN_TEXT | typeof TOKEN_PLUS | typeof TOKEN_MINUS |
  typeof TOKEN_POINT | typeof TOKEN_SPACE | typeof TOKEN_PERCENT | typeof TOKEN_DIGIT |
  typeof TOKEN_CALENDAR | typeof TOKEN_ERROR | typeof TOKEN_DATETIME | typeof TOKEN_DURATION |
  typeof TOKEN_CONDITION | typeof TOKEN_DBNUM | typeof TOKEN_NATNUM | typeof TOKEN_LOCALE |
  typeof TOKEN_COLOR | typeof TOKEN_MODIFIER | typeof TOKEN_AMPM | typeof TOKEN_ESCAPED |
  typeof TOKEN_STRING | typeof TOKEN_SKIP | typeof TOKEN_EXP | typeof TOKEN_FILL |
  typeof TOKEN_PAREN | typeof TOKEN_CHAR
);

/**
 * A token emitted by the tokenizer.
 */
export type Token = {
  /** Token type. */
  type: TokenType,
  /** The value of the token, cleaned of extra characters. */
  value: string,
  /** Raw token source. */
  raw: string,
};

export type RenderRule = 'num+int' | 'num' | 'den';

export type DateRenderToken =
  { type: (typeof T_TYPE_HOUR | typeof T_TYPE_DAY | typeof T_TYPE_MIN | typeof T_TYPE_SEC | typeof T_TYPE_MON),
    pad?: boolean,
    size: number,
    indeterminate?: boolean,
    used?: boolean } |
  { type: (typeof T_TYPE_HOUR_E | typeof T_TYPE_MIN_E | typeof T_TYPE_SEC_E),
    pad: number,
    size: number,
    used?: boolean } |
  { type: typeof T_TYPE_SUBSEC, decimals: number, size: number, used?: boolean } |
  { type: (
    typeof T_TYPE_YEAR | typeof T_TYPE_YEAR_S | typeof T_TYPE_B_YEAR | typeof T_TYPE_B_YEAR_S |
    typeof T_TYPE_WEEKDAY_S | typeof T_TYPE_WEEKDAY |
    typeof T_TYPE_MNAME | typeof T_TYPE_MNAME_1 | typeof T_TYPE_MNAME_S
  ),
  used?: boolean,
  size: number };

export type RenderToken =
  DateRenderToken |
  { type: typeof TOKEN_TEXT, value: string } |
  { type: typeof TOKEN_POINT, value: string } |
  { type: typeof TOKEN_STRING, value: string, rule?: RenderRule } |
  { type: typeof TOKEN_SPACE, rule?: RenderRule } |
  { type: typeof TOKEN_FILL, value: string } |
  { type: typeof TOKEN_SKIP, value: string } |
  { type: typeof TOKEN_AMPM, short?: boolean } |
  { type: typeof T_TYPE_DIV } |
  { type: typeof T_TYPE_FRAC, num: string } |
  { type: typeof T_TYPE_INT, num: string } |
  { type: typeof T_TYPE_MAN, num: string } |
  { type: typeof T_TYPE_NUM, num: string } |
  { type: typeof T_TYPE_DEN, num: string } |
  { type: typeof TOKEN_EXP, plus: boolean } |
  { type: typeof TOKEN_ERROR } |
  { type: typeof TOKEN_PLUS } |
  { type: typeof TOKEN_MINUS, volatile?: boolean } |
  { type: typeof TOKEN_GENERAL };

export type SectionType =
  typeof T_TYPE_INT |
  typeof T_TYPE_DEN |
  typeof T_TYPE_FRAC |
  typeof T_TYPE_MAN |
  typeof T_TYPE_NUM;

export type Partition = {
  generated?: boolean,
  clock: 12 | 24,
  color?: number | string,
  condition?: [ string, number ],
  date: number,
  den_min: number,
  num_min: number,
  int_max: number,
  den_max: number,
  frac_max: number,
  date_eval: boolean,
  date_system: typeof EPOCH_1900 | typeof EPOCH_1317,
  dec_fractions?: boolean;
  den_p: string,
  den_pattern: string[],
  denominator: number,
  exp_plus?: boolean;
  error?: boolean;
  exponential: boolean;
  frac_pattern: string[],
  fractions: boolean,
  general: boolean,
  grouping: boolean,
  int_p: string,
  int_pattern: string[],
  integer: boolean,
  locale: string,
  man_p: string,
  man_pattern: string[],
  num_p: string,
  num_pattern: string[],
  parens: boolean,
  pattern: string,
  percent: boolean,
  scale: number,
  int_min: number,
  sec_decimals: number,
  text: boolean,
  tokensUsed: number,
  tokens: RenderToken[]
};

export type PatternParseData = {
  pattern: string,
  partitions: Partition[],
  locale?: string,
  error?: string
};

/**
 * An object of information properties based on a format pattern.
 * See the {@link getFormatInfo} method.
 */
export type FormatInfo = {
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
