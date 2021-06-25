import { getLocale, parseLocale, addLocale } from './locale';
import round from './round';
import dec2frac from './dec2frac';
import options from './options';
import codeToLocale from './codeToLocale';
import { parsePattern, parseCatch } from './parsePattern';
import { color, isDate, isPercent, formatNumber } from './formatNumber';

const _cache = {};

function getFormatter (parseData, initOpts) {
  const { pattern, partitions, locale } = parseData;

  const getRuntimeOptions = opts => {
    const runOpts = Object.assign({}, options(), initOpts, opts);
    if (locale) {
      runOpts.locale = locale;
    }
    return runOpts;
  };

  const formatter = (value, opts) => {
    const o = getRuntimeOptions(opts);
    return formatNumber(value, partitions, o);
  };
  formatter.color = value => color(value, partitions);
  formatter.isPercent = () => isPercent(partitions);
  formatter.isDate = () => isDate(partitions);
  formatter.pattern = pattern;
  if (parseData.error) {
    formatter.error = parseData.error;
  }
  formatter.options = getRuntimeOptions;
  formatter.locale = locale || (initOpts && initOpts.locale) || '';
  return Object.freeze(formatter);
}

function numfmt (pattern, opts) {
  if (!pattern) {
    pattern = 'General';
  }
  let parseData = null;
  if (_cache[pattern]) {
    parseData = _cache[pattern];
  }
  else {
    const constructOpts = Object.assign({}, options(), opts);
    parseData = constructOpts.throws
      ? parsePattern(pattern)
      : parseCatch(pattern);
    if (!parseData.error) {
      _cache[pattern] = parseData;
    }
  }
  return getFormatter(parseData, opts);
}

numfmt.isDate = d => {
  // run parser in robust mode: malformed format code is not a date
  return numfmt(d, { throws: false }).isDate();
};

numfmt.isPercent = d => {
  // run parser in robust mode: malformed format code is not a percent
  return numfmt(d, { throws: false }).isPercent();
};

numfmt.options = options;
numfmt.dec2frac = dec2frac;
numfmt.round = round;

numfmt.codeToLocale = codeToLocale;
numfmt.parseLocale = parseLocale;
numfmt.getLocale = getLocale;
numfmt.addLocale = (options, l4e) => {
  const c = parseLocale(l4e);
  // when locale is changed, expire all cached patterns
  delete _cache[c.lang];
  delete _cache[c.language];
  return addLocale(options, c);
};

// SSF interface compatibility
function format (pattern, value, l4e, noThrows = false) {
  const opts = (l4e && typeof l4e === 'object') ? l4e : { locale: l4e, throws: !noThrows };
  return numfmt(pattern, opts)(value, opts);
}
numfmt.format = format;
numfmt.is_date = numfmt.isDate;

export default numfmt;
