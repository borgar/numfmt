import { getLocale, parseLocale, addLocale, resolveLocale } from './locale';
import round from './round';
import dec2frac from './dec2frac';
import codeToLocale from './codeToLocale';
import parsePattern from './numformat';

const _cache = {};

function parseCatch (pattern, l10n) {
  try {
    return parsePattern(pattern, l10n);
  }
  catch (err) {
    const fmt = () => '######';
    fmt.color = () => 'black';
    fmt.isDate = () => false;
    fmt.isPercent = () => false;
    fmt.pattern = pattern;
    fmt.locale = l10n;
    fmt.error = err.message;
    return fmt;
  }
}

function numfmt (pattern, l4e, noThrows = false) {
  if (!pattern) {
    pattern = 'General';
  }
  const _l4e = l4e ? resolveLocale(l4e) || l4e : '';
  if (!_cache[_l4e]) {
    _cache[_l4e] = {};
  }
  if (!_cache[_l4e][pattern]) {
    // find the locale settings
    const l10n = getLocale(_l4e);
    // create a new formatter
    const formatter = noThrows
      ? parseCatch(pattern, l10n)
      : parsePattern(pattern, l10n);
    _cache[_l4e][pattern] = formatter;
  }
  return _cache[_l4e][pattern];
}

numfmt.isDate = d => {
  // run parser in robust mode: malformed format code is not a date
  return numfmt(d, null, true).isDate();
};

numfmt.isPercent = d => {
  // run parser in robust mode: malformed format code is not a percent
  return numfmt(d, null, true).isPercent();
};

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
  return numfmt(pattern, l4e, noThrows)(value);
}
numfmt.format = format;
numfmt.is_date = numfmt.isDate;



export default numfmt;
