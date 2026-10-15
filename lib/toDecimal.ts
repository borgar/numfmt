/**
 * A non-negative decimal number: significant `digits` without leading or
 * trailing zeros, and the position of the decimal point relative to the first
 * of them. 1234.5 is `{ digits: '12345', point: 4 }`, 0.012 is
 * `{ digits: '12', point: -1 }` and zero is `{ digits: '', point: 0 }`.
 */
export type Decimal = { digits: string, point: number };

const CHAR_0 = 48;
const CHAR_5 = 53;
const CHAR_9 = 57;

// read a non-negative number written by String() or toPrecision()
function parseDecimal (str: string): Decimal {
  let exp = 0;
  const e = str.indexOf('e');
  if (e >= 0) {
    exp = +str.slice(e + 1);
    str = str.slice(0, e);
  }
  const dot = str.indexOf('.');
  const digits = dot >= 0 ? str.slice(0, dot) + str.slice(dot + 1) : str;
  let start = 0;
  while (digits.charCodeAt(start) === CHAR_0) {
    start++;
  }
  let end = digits.length;
  while (end > start && digits.charCodeAt(end - 1) === CHAR_0) {
    end--;
  }
  if (start === end) {
    return { digits: '', point: 0 };
  }
  return {
    digits: digits.slice(start, end),
    point: (dot >= 0 ? dot : digits.length) + exp - start
  };
}

// Is the (non-negative) number exactly halfway between two decimals of 15
// significant digits, when it has `point` integer digits?
function isTie (num: number, point: number): boolean {
  if (point >= 15) {
    // A tie is an odd multiple of 5 * 10 ** (point - 16), so a multiple of
    // 5 ** (point - 15). Beyond 5 ** 22 that won't fit in a double's mantissa.
    if (point > 37) {
      return false;
    }
    const unit = 10 ** (point - 15);
    return num % unit === unit / 2;
  }
  // Below that, a tie has a fraction. A fraction of k binary digits is
  // exactly k decimal digits, ending in 5, so a tie has 16 - point of them.
  return (
    Number.isInteger(num * 2 ** (16 - point)) &&
    !Number.isInteger(num * 2 ** (15 - point))
  );
}

/**
 * Return the magnitude of a finite number as Excel sees it: its exact value
 * rounded to 15 significant digits, a tie going toward zero.
 *
 * @param num The number to convert.
 * @returns The decimal.
 */
export function toDecimal (num: number): Decimal {
  const v = Math.abs(num);
  // toPrecision rounds the exact value, but rounds a tie away from zero
  const dec = parseDecimal(v.toPrecision(15));
  if (
    isTie(v, dec.point) ||
    // rounding up to a power of 10 adds an integer digit
    (dec.digits === '1' && isTie(v, dec.point - 1))
  ) {
    // a tie has 16 digits, and its shortest representation is exact
    const exact = parseDecimal(String(v));
    return parseDecimal(exact.digits.slice(0, 15) + 'e' + (exact.point - 15));
  }
  return dec;
}

/**
 * Round a decimal to a number of decimal places, a tie going away from zero,
 * and return its integer and fraction digits. The integer digits are empty
 * when the rounded number is below 1, and the fraction digits have no trailing
 * zeros.
 *
 * @param dec The decimal to round.
 * @param places The number of decimals to round to.
 * @returns The integer and fraction digits.
 */
export function roundDecimal (dec: Decimal, places: number): [ string, string ] {
  let digits = dec.digits;
  let point = dec.point;
  const keep = point + places;
  if (keep < digits.length) {
    if (keep < 0) {
      return [ '', '' ];
    }
    const roundUp = digits.charCodeAt(keep) >= CHAR_5;
    let end = keep;
    if (roundUp) {
      // drop trailing nines, they carry into the digit before them
      while (end > 0 && digits.charCodeAt(end - 1) === CHAR_9) {
        end--;
      }
      if (end) {
        digits = digits.slice(0, end - 1) + (+digits[end - 1] + 1);
      }
      else {
        digits = '1';
        point++;
      }
    }
    else {
      while (end > 0 && digits.charCodeAt(end - 1) === CHAR_0) {
        end--;
      }
      digits = digits.slice(0, end);
    }
  }
  if (!digits) {
    return [ '', '' ];
  }
  return [
    point > 0 ? digits.slice(0, point).padEnd(point, '0') : '',
    point >= 0 ? digits.slice(point) : '0'.repeat(-point) + digits
  ];
}
