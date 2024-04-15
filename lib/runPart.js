import { round } from './round.js';
import { clamp } from './clamp.js';
import { dec2frac } from './dec2frac.js';
import { general } from './general.js';
import { toYMD } from './toYMD.js';
import { defaultLocale } from './locale.js';
import {
  u_DSEC, u_CSEC, u_MSEC,
  EPOCH_1317,
  MIN_S_DATE, MAX_S_DATE,
  MIN_L_DATE, MAX_L_DATE,
  _numchars
} from './constants.js';

const DAYSIZE = 86400;

// FIXME: get rid of numchars and use nbsp options

const getExponent = (num, int_max = 0) => {
  const exp = Math.floor(Math.log10(num));
  return (int_max > 1)
    ? Math.floor(exp / int_max) * int_max
    : exp;
};

const dateOverflows = (inputValue, roundedValue, bigRange) => {
  if (bigRange) {
    return (inputValue < MIN_L_DATE || roundedValue >= MAX_L_DATE);
  }
  return (inputValue < MIN_S_DATE || roundedValue >= MAX_S_DATE);
};

export function runPart (value, part, opts, l10n_) {
  let mantissa = '';
  let mantissa_sign = '';
  let numerator = '';
  let denominator = '';
  let fraction = '';
  let integer = '';
  let exp = 0;

  let date = value | 0;
  let time = 0;
  let year = 0;
  let month = 1;
  let day = 0;
  let weekday = 0;
  let hour = 0;
  let minute = 0;
  let second = 0;
  let subsec = 0;

  const l10n = l10n_ || defaultLocale;

  // scale number
  if (!part.text && isFinite(part.scale) && part.scale !== 1) {
    value = clamp(value * part.scale);
  }

  // calc exponent
  if (part.exponential) {
    let v = Math.abs(value);
    if (v) {
      const scale = 10 ** -getExponent(v, part.int_max);
      const tempValue = round(v * scale, part.frac_max) / scale;
      exp = getExponent(tempValue, part.int_max);
    }
    v = v * (10 ** -exp);
    value = (value < 0) ? -v : v;
    mantissa += Math.abs(exp);
  }

  // integer to text
  if (part.integer) {
    const i = Math.abs(round(value, part.fractions ? 1 : part.frac_max));
    integer += (i < 1) ? '' : Math.floor(i);
  }
  // integer padding
  if (part.int_padding) {
    integer = (part.int_padding.length === 1)
      ? integer || part.int_padding
      : part.int_padding.substring(0, part.int_padding.length - integer.length) + integer;
  }
  // integer grouping
  if (part.grouping) {
    let gtmp = '';
    let ipos = integer.length;
    if (ipos > part.group_pri) {
      ipos -= part.group_pri;
      gtmp = l10n.group + integer.slice(ipos, ipos + part.group_pri) + gtmp;
    }
    while (ipos > part.group_sec) {
      ipos -= part.group_sec;
      gtmp = l10n.group + integer.slice(ipos, ipos + part.group_sec) + gtmp;
    }
    integer = ipos ? integer.slice(0, ipos) + gtmp : gtmp;
  }

  // fraction to text
  if (part.dec_fractions) {
    fraction = String(round(value, part.frac_max)).split('.')[1] || '';
  }

  // using vulgar fractions
  let have_fraction = part.fixed_slash;
  if (part.fractions) {
    have_fraction = part.fixed_slash || !!(value % 1);
    const _dec = Math.abs(part.integer ? value % 1 : value);
    if (_dec) {
      have_fraction = true;
      if (part.denominator && isFinite(part.denominator)) {
        // predefined denominator
        denominator += part.denominator;
        numerator += round(_dec * part.denominator);
        if (numerator === '0') {
          numerator = '';
          denominator = '';
          have_fraction = part.fixed_slash;
        }
      }
      else {
        // const nmax = part.integer ? part.num_max : Infinity;
        const nmax = Infinity;
        const frt = dec2frac(_dec, nmax, part.den_max);
        numerator += frt[0];
        denominator += frt[1];
        if (part.integer && numerator === '0') {
          numerator = '';
          denominator = '';
          have_fraction = part.fixed_slash;
        }
      }
    }
    else if (!value && !part.integer) {
      have_fraction = true;
      numerator = '0';
      denominator = '1';
    }
    if (part.integer && !have_fraction && !Math.trunc(value)) {
      integer = '0';
    }
  }

  // using date/time
  if (part.date) {
    date = Math.trunc(value);
    const t = DAYSIZE * (value - date);
    time = Math.floor(t); // in seconds
    // "epsilon" correction
    subsec = t - time;
    if (Math.abs(subsec) < 1e-6) { // 0.000001
      subsec = 0;
    }
    else if (subsec > 0.9999) {
      subsec = 0;
      time += 1;
      if (time === DAYSIZE) {
        time = 0;
        date += 1;
      }
    }
    if (subsec) {
      // round time based on smallest used unit
      const minU = part.date & u_MSEC || part.date & u_CSEC || part.date & u_DSEC;
      if (
        (minU === u_MSEC && subsec > 0.9995) ||
        (minU === u_CSEC && subsec > 0.995) ||
        (minU === u_DSEC && subsec > 0.95) ||
        (!minU && subsec >= 0.5)
      ) {
        time++;
        subsec = 0;
      }
    }
    // serial date/time to gregorian calendar
    if (date || part.date_system) {
      const dout = toYMD(value, part.date_system, opts.leap1900);
      year = dout[0];
      month = dout[1];
      day = dout[2];
    }
    if (time) {
      const x = (time < 0) ? DAYSIZE + time : time;
      second = Math.floor(x) % 60;
      minute = Math.floor(x / 60) % 60;
      hour = Math.floor((x / 60) / 60) % 60;
    }
    weekday = (6 + date) % 7;
    if (part.date_eval && dateOverflows(value, date + (time / DAYSIZE), opts.dateSpanLarge)) {
      // if value is out of bounds and formatting is date Excel emits a
      // stream of "######" that fills the cell width.
      // This doesn't happen, if the only date tokens are "elapsed time" tokens.
      // Code instead follows the TEXT function which emits a #VALUE! error.
      if (opts.dateErrorThrows) {
        throw new Error('Date out of bounds');
      }
      if (opts.dateErrorNumber) {
        const _ret = value < 0 ? [ l10n.negative ] : [];
        return general(_ret, {}, value, l10n).join('');
      }
      return opts.overflow;
    }
  }

  // numerator padding
  if (part.num_padding) {
    numerator = (part.num_padding.length === 1)
      ? numerator || part.num_padding
      : part.num_padding.substring(0, part.num_padding.length - numerator.length) + numerator;
  }
  // denominator padding
  if (part.den_padding) {
    denominator = (part.den_padding.length === 1)
      ? denominator || part.den_padding
      : denominator + part.den_padding.slice(denominator.length);
  }
  // mantissa padding
  if (part.man_padding) {
    mantissa = part.man_padding.length === 1
      ? mantissa || part.man_padding
      : part.man_padding.slice(0, part.man_padding.length - mantissa.length) + mantissa;
  }
  // mantissa sign
  if (exp < 0) {
    mantissa_sign = '-';
  }
  else if (part.exp_plus) {
    mantissa_sign = '+';
  }

  const ret = [];
  const counter = { int: 0, frac: 0, man: 0, num: 0, den: 0 };
  for (let ti = 0, tl = part.tokens.length; ti < tl; ti++) {
    const tok = part.tokens[ti];
    const tokenType = tok.type;
    const len = tok.num ? tok.num.length : 0;

    if (tokenType === 'string') {
      // special rules may apply if next or prev is numerator or denominator
      if (tok.rule) {
        if (tok.rule === 'num') {
          if (have_fraction) {
            ret.push(tok.value);
          }
          else if (part.num_min > 0 || part.den_min > 0) {
            // FIXME: ret.push(''.repeat(tok.value.length))
            ret.push(tok.value.replace(/./g, _numchars['?']));
          }
        }
        else if (tok.rule === 'num+int') {
          if (have_fraction && integer) {
            ret.push(tok.value);
          }
          else if ((part.den_min > 0) && (integer || part.num_min)) {
            ret.push(tok.value.replace(/./g, _numchars['?']));
          }
        }
        else if (tok.rule === 'den') {
          if (have_fraction) {
            ret.push(tok.value);
          }
          else if (part.den_min > 0 || part.den_min > 0) {
            ret.push(tok.value.replace(/./g, _numchars['?']));
          }
        }
      }
      else {
        ret.push(tok.value);
      }
    }
    else if (tokenType === 'space') {
      if (tok.rule) {
        if (tok.rule === 'num+int' &&
          (have_fraction || part.num_min || part.den_min) &&
          (integer || part.num_min)
        ) {
          ret.push(_numchars['?']);
        }
      }
      else {
        ret.push(_numchars['?']);
      }
    }
    else if (tokenType === 'error') {
      // token used to define invalid pattern
      ret.push(opts.invalid);
    }
    else if (tokenType === 'point') {
      // Excel always emits a period: TEXT(0, "#.#") => "."
      ret.push(part.date ? tok.value : l10n.decimal);
    }
    else if (tokenType === 'general') {
      general(ret, part, value, l10n);
    }
    else if (tokenType === 'exp') {
      ret.push(l10n.exponent);
    }
    else if (tokenType === 'minus') {
      if (tok.volatile && part.date) {
        // don't emit the prepended minus if this is a date
      }
      else if (tok.volatile && (value >= 0 || typeof value !== 'number')) {
        // don't emit volatile minus for positive numbers
      }
      else if (tok.volatile && !part.fractions && (part.integer || part.dec_fractions)) {
        // minus is only shown if there is a non-zero digit present
        if (value < 0 && (integer && integer !== '0') || fraction) {
          ret.push(l10n.negative);
        }
      }
      else {
        ret.push(l10n.negative);
      }
    }
    else if (tokenType === 'plus') {
      ret.push(l10n.positive);
    }
    else if (tokenType === 'text') {
      ret.push(value);
    }
    else if (tokenType === 'div') {
      if (have_fraction) {
        ret.push('/');
      }
      else if (part.num_min > 0 || part.den_min > 0) {
        ret.push(_numchars['?']);
      }
      else {
        ret.push(_numchars['#']);
      }
    }
    else if (tokenType === 'int') {
      if (part.int_pattern.length === 1) {
        // number isn't fragmented
        ret.push(integer);
      }
      else {
        // XXX: clean this up
        const int_len = integer.length;
        const curr_len = tok.num.length;
        const patt_len = part.int_pattern.join('').length;
        let len = curr_len;
        let o = counter.int;
        if (!counter.int && int_len > patt_len) {
          len += int_len - patt_len;
        }
        if (int_len < patt_len) {
          o += int_len - patt_len;
        }
        for (let i = 0; i < len; i++) {
          ret.push(integer[i + o] || _numchars[tok.num[i]]);
        }
        counter.int += len;
      }
    }
    else if (tokenType === 'frac') {
      const o = counter.frac;
      for (let i = 0; i < len; i++) {
        ret.push(fraction[i + o] || _numchars[tok.num[i]]);
      }
      counter.frac += len;
    }
    else if (tokenType === 'man' || tokenType === 'num' || tokenType === 'den') {
      let numstr;
      let y = 0;
      if (tokenType === 'man') {
        numstr = mantissa;
        // mantissa sign is attached to the first digit, not the exponent symbol
        // "0E+ 0" will print as "1E +12"
        if (!counter[tokenType]) {
          ret.push(mantissa_sign);
        }
        if (mantissa.length < part.man_pattern.join('').length) {
          y -= part.man_pattern.join('').length - mantissa.length;
        }
      }
      else if (tokenType === 'num') {
        numstr = numerator;
      }
      else if (tokenType === 'den') {
        numstr = denominator;
      }
      if (part[tokenType + '_pattern'].length === 1) {
        ret.push(numstr);
      }
      else {
        const o = counter[tokenType] + y;
        for (let i = 0; i < len; i++) {
          ret.push(numstr[i + o] || _numchars[tok.num[i]]);
        }
        counter[tokenType] += len;
      }
    }
    else if (tokenType === 'year') {
      if (year < 0) { ret.push(l10n.negative); }
      ret.push(String(Math.abs(year)).padStart(4, '0'));
    }
    else if (tokenType === 'year-short') {
      const y = year % 100;
      ret.push(y < 10 ? '0' : '', y);
    }
    else if (tokenType === 'month') {
      ret.push((tok.pad && month < 10 ? '0' : ''), month);
    }
    else if (tokenType === 'monthname-single') {
      // This is what Excel does.
      // The Vietnamese list goes:
      //  from ["Tháng 1", "Tháng 2", ... ] to [ "T", "T", ... ]
      // Simplified Chinese goes:
      //  from [ 1月, ... 9月, 10月, 11月, 12月 ] to [ 1, ... 9, 1, 1, 1 ]
      if (part.date_system === EPOCH_1317) {
        ret.push(l10n.mmmm6[month - 1].charAt(0));
      }
      else {
        ret.push(l10n.mmmm[month - 1].charAt(0));
      }
    }
    else if (tokenType === 'monthname-short') {
      if (part.date_system === EPOCH_1317) {
        ret.push(l10n.mmm6[month - 1]);
      }
      else {
        ret.push(l10n.mmm[month - 1]);
      }
    }
    else if (tokenType === 'monthname') {
      if (part.date_system === EPOCH_1317) {
        ret.push(l10n.mmmm6[month - 1]);
      }
      else {
        ret.push(l10n.mmmm[month - 1]);
      }
    }
    else if (tok.type === 'weekday-short') {
      ret.push(l10n.ddd[weekday]);
    }
    else if (tokenType === 'weekday') {
      ret.push(l10n.dddd[weekday]);
    }
    else if (tokenType === 'day') {
      ret.push((tok.pad && day < 10 ? '0' : ''), day);
    }
    else if (tokenType === 'hour') {
      const h = hour % part.clock || (part.clock < 24 ? part.clock : 0);
      ret.push((tok.pad && h < 10 ? '0' : ''), h);
    }
    else if (tokenType === 'min') {
      ret.push((tok.pad && minute < 10 ? '0' : ''), minute);
    }
    else if (tokenType === 'sec') {
      ret.push((tok.pad && second < 10 ? '0' : ''), second);
    }
    else if (tokenType === 'subsec') {
      ret.push(l10n.decimal);
      // decimals is pre-determined by longest subsec token
      // but the number emitted is per-token
      const f = subsec.toFixed(part.sec_decimals);
      ret.push(f.slice(2, 2 + tok.decimals));
    }
    else if (tokenType === 'ampm') {
      const idx = hour < 12 ? 0 : 1;
      if (tok.short && !l10n_) {
        ret.push('AP'[idx]);
      }
      else {
        ret.push(l10n.ampm[idx]);
      }
    }
    else if (tokenType === 'hour-elap') {
      if (value < 0) { ret.push(l10n.negative); }
      const hh = (date * 24) + Math.floor(Math.abs(time) / (60 * 60));
      ret.push(String(Math.abs(hh)).padStart(tok.pad, '0'));
    }
    else if (tokenType === 'min-elap') {
      if (value < 0) { ret.push(l10n.negative); }
      const mm = (date * 1440) + Math.floor(Math.abs(time) / 60);
      ret.push(String(Math.abs(mm)).padStart(tok.pad, '0'));
    }
    else if (tokenType === 'sec-elap') {
      if (value < 0) { ret.push(l10n.negative); }
      const ss = (date * DAYSIZE) + Math.abs(time);
      ret.push(String(Math.abs(ss)).padStart(tok.pad, '0'));
    }
    else if (tokenType === 'b-year') {
      ret.push(year + 543);
    }
    else if (tokenType === 'b-year-short') {
      const y = (year + 543) % 100;
      ret.push(y < 10 ? '0' : '', y);
    }
  }
  if (opts.nbsp) {
    // can we detect ? or string tokens and only do this if needed?
    return ret.join('');
  }
  return ret.join('').replace(/\u00a0/g, ' ');
}
