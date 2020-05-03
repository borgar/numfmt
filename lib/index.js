import { getLocale, parseLocale, addLocale, resolveLocale } from './locale';
import round from './round';
import dec2frac from './dec2frac';
import codeToLocale from './codeToLocale';
import parsePattern from './numformat';

const _cache = {};

function numfmt (pattern, l4e) {
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
    const formatter = parsePattern(pattern, l10n);
    _cache[_l4e][pattern] = formatter;
  }
  return _cache[_l4e][pattern];
}

numfmt.isDate = d => numfmt(d).isDate();
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
function format (pattern, value, l4e) {
  return numfmt(pattern, l4e)(value);
}
numfmt.format = format;
numfmt.is_date = numfmt.isDate;



export default numfmt;
