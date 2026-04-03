export function getExponent (num: number, int_max: number = 0): number {
  const exp = Math.floor(Math.log10(num));
  return (int_max > 1)
    ? Math.floor(exp / int_max) * int_max
    : exp;
}

export function getSignificand (n: number, exp = 1): number {
  if (exp < -300) {
    return parseFloat(n.toExponential().split('e')[0]);
  }
  return n * (10 ** -exp);
}
