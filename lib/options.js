export const defaultOptions = {
  // Overflow error string
  overflow: '######', // dateErrorThrow needs to be off! [prev in locale]
  // Should it throw when there is an overflow error?
  dateErrorThrows: false,
  // Should it emit a number is an overflow error? (Sheets does this)
  dateErrorNumber: true, // dateErrorThrow needs to be off!
  // Sheets mode (see #3)
  dateSpanLarge: true,
  // Simulate the Lotus 1-2-3 leap year bug
  leap1900: true,
  // Emit regular vs. non-breaking spaces
  nbsp: false,
  // Robust/throw mode
  throws: true,
  // What is emitted when robust mode fails to parse (###### currently)
  invalid: '######',
  // Locale
  locale: '',
  // Don't adjust dates to UTC when converting them to serial time
  ignoreTimezone: false,
  // integer digit grouping
  grouping: [ 3, 3 ],
  // resolve indexed colors to hex
  indexColors: true
};
