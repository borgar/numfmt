/**
 * Output from a number or date value parser.
 */
export type ParseDataNum = {
  /** A number value */
  value: number;
  /** Built in format id number, use with getFormatFromId() */
  formatId?: number;
};

/**
 * Output from the boolean value parser.
 */
export type ParseDataBool = {
  /** A boolean value */
  value: boolean;
  /** Built in format id number, use with getFormatFromId() */
  formatId?: never;
};

/**
 * Options for a value parser function.
 */
export type ParseValueOptions = {
  /**
   * A BCP 47 string tag. Defaults to `en` (see [addLocale](#addLocale))
   *
   * @default 'en'
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
   *
   * @default 0
   */
  mode?: number;
};
