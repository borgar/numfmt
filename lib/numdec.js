import round from './round';

const zero = {
  total: 1,
  sign: 0,
  period: 0,
  int: 1,
  frac: 0
};

// returns the count of digits (including - and .) need to represent the number
export default function numdec (value, incl_sign = true) {
  const v = Math.abs(value);

  // shortcut zero
  if (!v) { return zero; }

  const signSize = (incl_sign && value < 0) ? 1 : 0;
  const intPart = Math.floor(v);
  const intSize = Math.floor(Math.log10(v) + 1);
  let periodSize = 0;
  let fracSize = 0;

  // is not an integer
  if (intPart !== v) {
    periodSize = 1;

    // this has turned out to be much faster than any pure math solution
    const n = String(
      round(
        (intSize < 0)
          ? v * (10 ** -intSize)
          : v / (10 ** intSize),
        15
      )
    );
    let f = n.length;
    let z = true;
    let i = 0;
    while (i <= n.length) {
      if (n[i] === '.') {
        // discount period
        f--;
        break;
      }
      else if (n[i] === '0' && z) {
        // leading zeros before period are discounted
        f--;
      }
      else {
        // non-zero digit
        z = false;
      }
      i++;
    }
    fracSize = f - intSize;
  }

  return {
    total: signSize + Math.max(intSize, 1) + periodSize + fracSize,
    digits: Math.max(intSize, 0) + fracSize,
    sign: signSize,
    period: periodSize,
    int: Math.max(intSize, 1),
    frac: fracSize
  };
}
