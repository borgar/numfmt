const defaultOptions = {
  // Overflow error string
  overflow: '######', // dateErrorThrow needs to be off! [prev in locale]
  // Should it throw when there is an overflow error?
  dateErrorThrows: false,
  // Should it emit a number is an overflow error? (Sheets does this)
  dateErrorNumber: false, // dateErrorThrow needs to be off!
  // Sheets mode (see #3)
  dateSpanLarge: false,
  // Simulate the Lotus 1-2-3 leap year bug
  leap1900: true,
  // Emit regular vs. non-breaking spaces
  nbsp: true,
  // Robust/throw mode (currently an argument)
  throws: true,
  // What is emitted when robust mode fails to parse (###### currently)
  invalid: '######',
  // Locale (currently an argument)
  locale: ''
};

const globalOptions = Object.assign({}, defaultOptions);

export default function options (opts) {
  // passing in a null will reset to defaults
  if (opts === null) {
    opts = defaultOptions;
  }
  if (opts) {
    for (const key in opts) {
      if (key in defaultOptions) {
        const value = opts[key];
        if (value == null) { // set back to default
          globalOptions[key] = defaultOptions[key];
        }
        else {
          globalOptions[key] = value;
        }
      }
    }
  }
  return { ...globalOptions };
}
