export function dateToSerial (value, opts) {
  // dates are changed to serial
  if (value instanceof Date) {
    let val = value * 1;
    if (!opts || !opts.ignoreTimezone) {
      val -= (value.getTimezoneOffset() * 60 * 1000);
    }
    const d = (val / 864e5);
    return d - (d <= -25509 ? -25568 : -25569);
  }
  // everything else is passed through
  return value;
}
