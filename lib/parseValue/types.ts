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
   * - 0: Excel - Permits the same things Excel's `Range.Value` assignments.
   * - 1: Numfmt - Permits a curated set of strings, omitting many of Excel's stranger allowances.
   *
   * By default the parser uses mode 0.
   *
   * For modern GUI, mode 1 is reccommended. Mode 1 is more permissive when it comes to accepting
   * some fairly obvious things like dates that include weekdays (which mode 0 rejects) and is less
   * accepting of strange formats like undelimited ("sep10") or mixed delimited ("1984/07-4").
   */
  mode?: number;
};
