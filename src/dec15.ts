// Excel works with 15 significant decimal digits. These helpers get those digits
// from a double using only number arithmetic, which is faster than going through
// strings for nearly all values.

/** Powers of ten that are exactly representable as doubles. */
const POW10: number[] = [];
for (let i = 0; i <= 22; i++) {
  POW10[i] = 10 ** i;
}

const CHAR_0 = 48;

/** Smallest normal double. Values below this are subnormal. */
const MIN_NORMAL = 2.2250738585072014e-308;

// Veltkamp splitter for doubles: 2^27 + 1
const SPLIT = 134217729;

/**
 * Returns 10 to the power of `n`, exact for 0 ≤ n ≤ 22.
 *
 * @internal
 * @param n The exponent.
 * @returns 10^n
 */
export function pow10 (n: number): number {
  return (n >= 0 && n <= 22) ? POW10[n] : 10 ** n;
}

// Scale `a` so its value has 15 integer digits when its decimal exponent is `e`,
// and round to an integer with a tie going toward zero. Returns NaN when that
// can't be done exactly with doubles.
function scale15 (a: number, e: number): number {
  const n = 14 - e;
  if (n >= 0 && n <= 22) {
    // Dekker's two-product: a * b === p + err, exactly
    const b = POW10[n];
    const p = a * b;
    let t = SPLIT * a;
    const ah = t - (t - a);
    const al = a - ah;
    t = SPLIT * b;
    const bh = t - (t - b);
    const bl = b - bh;
    const err = ((ah * bh - p) + ah * bl + al * bh) + al * bl;
    const fl = Math.floor(p);
    // the exact fraction is (p - fl) + err; an exact tie (d === -err) stays down
    const d = (p - fl) - 0.5;
    return (d > -err) ? fl + 1 : fl;
  }
  if (n < 0 && n >= -22) {
    const u = POW10[-n];
    // % is exact for doubles; a - r may round, but by far less than u / 2
    const r = a % u;
    const q = Math.round((a - r) / u);
    return (r > u / 2) ? q + 1 : q;
  }
  return NaN;
}

// Read up to 15 significant digits from a number in exponent notation ("1.5e-19").
// Longer digit strings are rounded, a tie going toward zero.
function fromExponential (s: string): [ number, number ] {
  const ePos = s.indexOf('e');
  const e = +s.slice(ePos + 1);
  const digits = s.charAt(0) + s.slice(2, ePos); // drop the "."
  if (digits.length <= 15) {
    return [ +digits * POW10[15 - digits.length], e ];
  }
  let N = +digits.slice(0, 15);
  const next = digits.charCodeAt(15);
  // above a half: 6-9, or 5 followed by any non-zero digit
  if (next > 53 || (next === 53 && /[1-9]/.test(digits.slice(16)))) {
    N++;
  }
  return (N >= 1e15) ? [ N / 10, e + 1 ] : [ N, e ];
}

/**
 * Round a positive finite number to 15 significant digits, as Excel does.
 *
 * The exact value is rounded, a tie going toward zero. Subnormal numbers start
 * from their shortest representation instead.
 *
 * @internal
 * @param a A positive, finite, non-zero number.
 * @returns `[ N, e ]` where `N` is an integer with exactly 15 digits and the
 *   rounded value is `N × 10^(e − 14)`.
 */
export function toDec15 (a: number): [ number, number ] {
  if (a < MIN_NORMAL) {
    // shortest round-trip representation
    return fromExponential(a.toExponential());
  }
  let e = Math.floor(Math.log10(a));
  // log10 can be off by one near powers of ten
  if (a < pow10(e)) {
    e--;
  }
  else if (a >= pow10(e + 1)) {
    e++;
  }
  let N = scale15(a, e);
  // powers of ten outside 1–1e22 are not exact, so check the digit count as well
  if (N >= 1e15) {
    e++;
    N = scale15(a, e);
  }
  else if (N < 1e14) {
    e--;
    N = scale15(a, e);
  }
  if (N !== N) { // NaN: outside the exact ranges
    // An exact tie at the 16th digit can't happen here, so the
    // correctly rounded (ties up) toExponential gives the same result.
    return fromExponential(a.toExponential(14));
  }
  // 999999999999999.6 rounds up to the next power of ten
  if (N >= 1e15) {
    return [ N / 10, e + 1 ];
  }
  return [ N, e ];
}

/**
 * Convert a decimal `q × 10^k` back to a number, the reverse of `toDec15`.
 *
 * @internal
 * @param q An integer below 2^53.
 * @param k The decimal exponent.
 * @returns The nearest double to `q × 10^k`.
 */
export function fromDec (q: number, k: number): number {
  if (k >= 0 && k <= 22) {
    return q * POW10[k];
  }
  if (k < 0 && k >= -22) {
    // q and the power of ten are both exact, so the division is correctly rounded
    return q / POW10[-k];
  }
  // outside the exact powers of ten, let the parser round correctly
  return +(q + 'e' + k);
}

/**
 * Round a 15 digit integer to `keep` significant digits, a tie going away from zero.
 *
 * @internal
 * @param N An integer with 15 digits.
 * @param keep The number of leading digits to keep. May be 0 or negative.
 * @returns The rounded integer. It equals `10^keep` when rounding carried over.
 */
export function roundDigits (N: number, keep: number): number {
  if (keep >= 15) {
    return N;
  }
  const u = pow10(15 - keep);
  const q = Math.floor(N / u);
  return ((N - q * u) * 2 >= u) ? q + 1 : q;
}

/**
 * Round a non-negative number to a number of decimal places, as Excel does:
 * first to 15 significant digits, then to the places, a tie going away from zero.
 *
 * @internal
 * @param a A non-negative, finite number.
 * @param places The number of decimals to round to. May be negative.
 * @returns `[ q, k ]` where `q` is an integer and the rounded value is `q × 10^k`.
 */
export function roundPlaces (a: number, places: number): [ number, number ] {
  if (!a) {
    return [ 0, 0 ];
  }
  if (places >= 0 && a < 1e15 && Number.isInteger(a)) {
    // a whole number with at most 15 digits is unchanged by rounding
    return [ a, 0 ];
  }
  const [ N, e ] = toDec15(a);
  const keep = e + 1 + places;
  return (keep >= 15)
    ? [ N, e - 14 ]
    : [ roundDigits(N, keep), -places ];
}

/**
 * Split a non-negative number into a significand and an exponent for exponent
 * notation, and round the significand to a number of decimal places as Excel
 * does. If rounding carries into a new digit (9.99 → 10.0), the exponent moves.
 *
 * @internal
 * @param a A non-negative, finite number.
 * @param places The number of decimals in the significand.
 * @param intMax The number of integer digits in the pattern. When above 1 the
 *   exponent is a multiple of it (engineering notation).
 * @param hasInt Whether the pattern has integer digits. Without them, the
 *   significand is below 1.
 * @returns `[ q, k, exp ]` where the significand is `q × 10^k` and the value is
 *   that times `10^exp`.
 */
export function roundSignificand (
  a: number,
  places: number,
  intMax: number,
  hasInt: boolean
): [ number, number, number ] {
  if (!a) {
    return [ 0, 0, 0 ];
  }
  let [ N, e ] = toDec15(a);
  for (;;) {
    let exp = (intMax > 1) ? Math.floor(e / intMax) * intMax : e;
    if (!hasInt) {
      exp++;
    }
    const keep = e - exp + 1 + places;
    if (keep >= 15) {
      return [ N, e - 14 - exp, exp ];
    }
    const q = roundDigits(N, keep);
    if (keep < 0 || q < pow10(keep)) {
      return [ q, -places, exp ];
    }
    // rounding carried into a new digit: redo for the next power of ten
    N = 1e14;
    e++;
  }
}

/**
 * Write a decimal `q × 10^k` as integer and fraction digits. The integer digits
 * are empty when the value is below 1, and the fraction digits have no
 * trailing zeros.
 *
 * @internal
 * @param q A non-negative integer below 2^53.
 * @param k The decimal exponent.
 * @returns The integer and fraction digits.
 */
export function decToText (q: number, k: number): [ string, string ] {
  if (!q) {
    return [ '', '' ];
  }
  // q is an integer below 2^53, so String() gives plain digits
  const s = String(q);
  if (k >= 0) {
    return [ k ? s + '0'.repeat(k) : s, '' ];
  }
  const p = s.length + k; // digits before the decimal point
  let end = s.length;
  while (end > 0 && s.charCodeAt(end - 1) === CHAR_0) {
    end--;
  }
  return [
    (p > 0) ? s.slice(0, p) : '',
    (end > p) ? (p >= 0 ? '' : '0'.repeat(-p)) + s.slice(Math.max(p, 0), end) : ''
  ];
}
