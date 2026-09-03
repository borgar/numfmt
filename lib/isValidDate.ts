export function isValidDate (y: number, m: number, d: number) {
  // day can't be 0
  if (d < 1) {
    return false;
  }
  // month must be 1-12
  if (m < 1 || m > 12) {
    return false;
  }
  // february
  if (m === 2) {
    const isLeapYear = (((y % 4 === 0) && (y % 100 !== 0)) || (y % 400 === 0));
    // 1900 is a leap year in Excel
    const febDays = (isLeapYear || y === 1900) ? 29 : 28;
    if (d > febDays) {
      return false;
    }
  }
  // test any other month
  else if (
    ((m === 4 || m === 6 || m === 9 || m === 11) && d > 30) ||
    ((m === 1 || m === 3 || m === 5 || m === 7 || m === 8 || m === 10 || m === 12) && d > 31)) {
    return false;
  }
  return true;
}
