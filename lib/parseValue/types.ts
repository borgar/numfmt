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
