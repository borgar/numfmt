export function parseFloat15 (s: string): number {
  let num = '';
  let digits = 0;
  let minus = '';
  let exp = false;
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    if (c >= 48 && c <= 57) { // "0"-"9"
      num += digits >= 15 ? '0' : s[i];
      digits++;
    }
    else if (c === 46) { // "."
      num += '.';
    }
    else if (c === 45) { // "-"
      if (exp) {
        num += '-';
      }
      else {
        minus = '-';
      }
    }
    else if (c === 101 || c === 69) { // eE
      num += 'e';
      exp = true;
      digits = 0; // reset digit count so exponent doesn't get truncated
    }
  }
  if (!num) {
    return NaN;
  }
  return Number(minus + num);
}
