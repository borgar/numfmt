/**
 * Output from a number or date value parser.
 */
export type ParseDataNum = {
  /** A number value */
  v: number;
  /** A number format pattern */
  z?: string;
};

/**
 * Output from the boolean value parser.
 */
export type ParseDataBool = {
  /** A boolean value */
  v: boolean;
  /** A number format pattern */
  z?: never;
};

/**
 * Options for a value parser function.
 */
export type ParseValueOptions = {
  /**
   * A BCP 47 string tag. Locale default is english with a `\u00a0`
   * grouping symbol (see [addLocale](#addLocale))
   */
  locale?: string;
  /**
   * Parsing mode:
   *
   * - PARSE_EXCEL: Common Excel - Permits the same things as pasting data into Excel cells.
   * - PARSE_EXCEL_STRICT: Strict Excel - Permits the same things Excel's `Range.Value` assignments.
   * - PARSE_NUMFMT: Numfmt - Permits a curated set of strings, omitting many of Excel's stranger allowances.
   *
   * By default the parser uses mode 0.
   *
   * If you are using this to emulate Excel, you should keep in mind that it's behavior varies across
   * its interfaces. Excel mode here does not trim the value before parsing but pasting values into
   * Excel cells, and evaluating them in formulas does. You should
   *
   * For modern GUI, mode 1 is reccommended. Mode 1 is more permissive when it comes to accepting
   * some fairly obvious things like dates that include weekdays (which mode 0 rejects) and is less
   * accepting of strange formats like undelimited ("sep10") or mixed delimited ("1984/07-4").
   */
  mode?: typeof PARSE_EXCEL | typeof PARSE_EXCEL_STRICT | typeof PARSE_NUMFMT;
};

export const PARSE_EXCEL = 0;
export const PARSE_EXCEL_STRICT = 1;
export const PARSE_NUMFMT = 2;
