export const daysInMonth = (y: number, m: number): number => {
  // february
  if (m === 2) {
    const isLeapYear = (((y % 4 === 0) && (y % 100 !== 0)) || (y % 400 === 0));
    // 1900 is a leap year in Excel
    return (isLeapYear || y === 1900) ? 29 : 28;
  }
  // any other month
  else if (m === 4 || m === 6 || m === 9 || m === 11) {
    return 30;
  }
  return 31;
};

export function isValidDate (y: number, m: number, d: number) {
  // day can't be 0
  if (d < 1) {
    return false;
  }
  // month must be 1-12
  if (m < 1 || m > 12) {
    return false;
  }
  return d <= daysInMonth(y, m);
}
