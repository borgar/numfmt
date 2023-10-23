import numdec from './numdec.js';
import round from './round.js';

const fixLocale = (s, l10n) => {
  return s.replace(/\./, l10n.decimal);
};

export default function general (ret, part, value, l10n) {
  const int = value | 0;

  if (typeof value === 'string') {
    // special case
    // [<-25]General;[>25]General;General;General
    ret.push(value);
  }
  else if (value === int) {
    ret.push(Math.abs(int));
  }
  else {
    const v = Math.abs(value);
    // FIXME: it is best if numdec returns all of these
    let exp = v
      ? Math.floor(Math.log10(v))
      : 0;
    let n = (exp < 0)
      ? v * (10 ** -exp)
      : v / (10 ** exp);
    if (n === 10) {
      n = 1;
      exp++;
    }

    // The application shall attempt to display the full number
    // up to 11 digits (inc. decimal point).
    const num_dig = numdec(v);

    const getExp = () => {
      const x = Math.abs(exp);
      let m;
      if (n === 1) {
        m = n;
      }
      else {
        m = round(n, 5);
      }
      ret.push(
        fixLocale(m + '', l10n),
        l10n.exponent, (exp < 0 ? l10n.negative : l10n.positive),
        x < 10 ? '0' : '', x
      );
    };

    if (exp >= -4 && exp <= -1) {
      const o = v.toPrecision(10 + exp).replace(/\.?0+$/, '');
      ret.push(fixLocale(o, l10n));
    }
    else if (exp === 10) {
      const o = v.toFixed(10)
        .slice(0, 12)
        .replace(/\.$/, '');
      ret.push(fixLocale(o, l10n));
    }
    else if (Math.abs(exp) <= 9) {
      if (num_dig.total <= 11) {
        const o = round(v, 9).toFixed(num_dig.frac);
        ret.push(fixLocale(o, l10n));
      }
      else if (exp === 9) {
        ret.push(Math.floor(v));
      }
      else if (exp >= 0 && exp < 9) {
        ret.push(round(v, 9 - exp));
      }
      else {
        getExp();
      }
    }
    else if (num_dig.total >= 12) {
      getExp();
    }
    else if (Math.floor(v) === v) {
      ret.push(Math.floor(v));
    }
    else {
      ret.push(fixLocale(round(v, 9).toFixed(num_dig.frac), l10n));
    }
  }
  return ret;
}
