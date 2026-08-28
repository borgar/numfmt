import { round } from './round.ts';
import { clamp } from './clamp.ts';
import { dec2frac } from './dec2frac.ts';
import { general } from './general.ts';
import { toYMD } from './toYMD.ts';
import { defaultLocale, type LocaleData } from './locale.ts';
import {
  u_DSEC, u_CSEC, u_MSEC,
  EPOCH_1317,
  MIN_S_DATE, MAX_S_DATE,
  MIN_L_DATE, MAX_L_DATE,
  TOKEN_STRING,
  TOKEN_SPACE,
  TOKEN_POINT,
  TOKEN_ERROR,
  TOKEN_GENERAL,
  TOKEN_EXP,
  TOKEN_MINUS,
  TOKEN_PLUS,
  TOKEN_SKIP,
  TOKEN_FILL,
  TOKEN_TEXT,
  T_TYPE_DIV,
  T_TYPE_INT,
  T_TYPE_FRAC,
  T_TYPE_NUM,
  T_TYPE_DEN,
  T_TYPE_MAN,
  TOKEN_AMPM,
  T_TYPE_YEAR,
  T_TYPE_YEAR_S,
  T_TYPE_MON,
  T_TYPE_MNAME_1,
  T_TYPE_MNAME_S,
  T_TYPE_MNAME,
  T_TYPE_WEEKDAY_S,
  T_TYPE_WEEKDAY,
  T_TYPE_DAY,
  T_TYPE_HOUR,
  T_TYPE_MIN,
  T_TYPE_SEC,
  T_TYPE_SUBSEC,
  T_TYPE_HOUR_E,
  T_TYPE_MIN_E,
  T_TYPE_SEC_E,
  T_TYPE_B_YEAR,
  T_TYPE_B_YEAR_S
} from './constants.ts';
import { pad } from './pad.ts';
import { getExponent, getSignificand } from './numberProps.ts';
import type { Partition } from './types.ts';
import type { FormatOptions } from './options.ts';

const DAYSIZE = 86400;
const CHAR_0 = 48;
const CHAR_9 = 57;

const dateOverflows = (inputValue: number, roundedValue: number, bigRange: boolean) => {
  if (bigRange) {
    return (inputValue < MIN_L_DATE || roundedValue >= MAX_L_DATE);
  }
  return (inputValue < MIN_S_DATE || roundedValue >= MAX_S_DATE);
};

export function runPart (value: number | string | bigint, part: Partition, opts: FormatOptions, l10n_?: LocaleData) {
  let mantissa = '';
  let mantissa_sign = '';
  let numerator = '';
  let denominator = '';
  let fraction = '';
  let integer = '';
  let exp = 0;

  let date = 0;
  if (typeof value === 'bigint') {
    if (value <= Number.MAX_SAFE_INTEGER && value >= Number.MIN_SAFE_INTEGER) {
      value = Number(value);
    }
    else {
      return opts.bigintErrorNumber
        ? String(value)
        : opts.overflow;
    }
    date = value;
  }
  else if (typeof value === 'number') {
    date = Math.trunc(value);
  }
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
  if (!part.text && isFinite(part.scale) && part.scale !== 1 && typeof value === 'number') {
    value = clamp(value * part.scale);
  }

  // calc exponent
  if (part.exponential && typeof value === 'number') {
    let v = Math.abs(value);
    if (v) {
      exp = getExponent(v, part.int_max);
    }
    if (value && !part.integer) {
      // when there isn't an integer part, the exp gets shifted by 1
      exp++;
    }
    v = getSignificand(v, exp);
    if (part.int_max === 1 && round(v, part.frac_max) === 10) {
      v = 1;
      exp++;
    }
    value = (value < 0) ? -v : v;
    mantissa += Math.abs(exp);
  }

  // integer to text
  if (part.integer && typeof value === 'number') {
    const i = Math.abs(round(value, part.fractions ? 1 : part.frac_max));
    integer += (i < 1) ? '' : Math.floor(i);
  }
  // integer grouping
  const group_pri = opts.grouping[0] ?? 3;
  const group_sec = opts.grouping[1] ?? group_pri;

  // fraction to text
  if (part.dec_fractions && typeof value === 'number') {
    fraction = String(round(value, part.frac_max)).split('.')[1] || '';
  }

  // using vulgar fractions
  const fixed_slash = !part.error && (part.num_p.includes('0') || part.den_p.includes('0'));

  let have_fraction = fixed_slash;
  if (part.fractions && typeof value === 'number') {
    have_fraction = fixed_slash || !!(value % 1);
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
          have_fraction = fixed_slash;
        }
      }
      else {
        const frt = dec2frac(_dec, Infinity, part.den_max);
        numerator += frt[0];
        denominator += frt[1];
        if (part.integer && numerator === '0') {
          numerator = '';
          denominator = '';
          have_fraction = fixed_slash;
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
  if (part.date && typeof value === 'number') {
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
        return general(_ret, value, l10n).join('');
      }
      return opts.overflow;
    }
  }

  const padQ = pad('?', opts.nbsp);

  // mantissa sign
  if (exp < 0) {
    mantissa_sign = '-';
  }
  else if (part.exp_plus) {
    mantissa_sign = '+';
  }

  const ret = [];

  const digitsStart = (numstr: string, pattern: string, prt: string, offset: number) => {
    const l = (!offset && numstr.length > pattern.length)
      ? prt.length + numstr.length - pattern.length
      : prt.length;
    if (numstr.length < pattern.length) {
      offset += numstr.length - pattern.length;
    }
    for (let i = 0; i < l; i++) {
      ret.push(numstr[i + offset] || pad(prt[i], opts.nbsp));
    }
    return l;
  };

  let denominator_fixed = false;
  const counter = { int: 0, frac: 0, man: 0, num: 0, den: 0 };
  for (let ti = 0, tl = part.tokens.length; ti < tl; ti++) {
    const tok = part.tokens[ti];
    const tokenType = tok.type;
    const len = 'num' in tok ? tok.num.length : 0;
    if (tokenType === TOKEN_STRING) {
      // special rules may apply if next or prev is numerator or denominator
      const rule = tok.rule;
      if (rule) {
        if (
          (rule === 'num' && have_fraction) ||
          (rule === 'num+int' && have_fraction && integer) ||
          (rule === 'den' && have_fraction)
        ) {
          ret.push(tok.value.replaceAll(' ', padQ));
        }
        else if (
          (rule === 'num' && part.num_min > 0 || part.den_min > 0) ||
          (rule === 'num+int' && part.den_min > 0 && (integer || part.num_min)) ||
          (rule === 'den' && part.den_min > 0 || part.den_min > 0)
        ) {
          ret.push(padQ.repeat(tok.value.length));
        }
      }
      else {
        ret.push(tok.value.replaceAll(' ', padQ));
      }
    }
    else if (tokenType === TOKEN_SPACE) {
      if (tok.rule === 'num+int') {
        if (
          (have_fraction || part.num_min || part.den_min) &&
          (integer || part.num_min)
        ) {
          ret.push(padQ);
        }
      }
      else {
        ret.push(padQ);
      }
    }
    else if (tokenType === TOKEN_ERROR) {
      // token used to define invalid pattern
      ret.push(opts.invalid);
    }
    else if (tokenType === TOKEN_POINT) {
      // Excel always emits a period: TEXT(0, "#.#") => "."
      ret.push(part.date ? tok.value : l10n.decimal);
    }
    else if (tokenType === TOKEN_GENERAL) {
      general(ret, value, l10n);
    }
    else if (tokenType === TOKEN_EXP) {
      ret.push(l10n.exponent);
    }
    else if (tokenType === TOKEN_MINUS) {
      if (tok.volatile && part.date) {
        // don't emit the prepended minus if this is a date
      }
      else if (tok.volatile && (typeof value !== 'number' || value >= 0)) {
        // don't emit volatile minus for positive numbers
      }
      else if (tok.volatile && !part.fractions && (part.integer || part.dec_fractions)) {
        // minus is only shown if there is a non-zero digit present
        if (typeof value === 'number' && value < 0 && (integer && integer !== '0') || fraction) {
          ret.push(l10n.negative);
        }
      }
      else {
        ret.push(l10n.negative);
      }
    }
    else if (tokenType === TOKEN_PLUS) {
      ret.push(l10n.positive);
    }
    else if (tokenType === TOKEN_TEXT) {
      ret.push(value);
    }
    else if (tokenType === TOKEN_FILL) {
      // If user has provided a token to signal that next char is a fill char,
      // then emit the that plus the fill char. By default this does what the
      // TEXT function does in this case: Emits nothing.
      if (opts.fillChar) {
        ret.push(opts.fillChar, tok.value);
      }
    }
    else if (tokenType === TOKEN_SKIP) {
      // If user has provided a token to signal that next char is a fill char,
      // then emit the that plus the fill char. By default this does what the
      // TEXT function does in this case: Emits a space.
      if (opts.skipChar) {
        ret.push(opts.skipChar, tok.value);
      }
      else {
        ret.push(opts.nbsp ? '\u00a0' : ' ');
      }
    }
    else if (tokenType === T_TYPE_DIV) {
      if (have_fraction) {
        ret.push('/');
      }
      else if (part.num_min > 0 || part.den_min > 0) {
        ret.push(padQ);
      }
      else {
        ret.push(pad('#', opts.nbsp));
      }
    }
    else if (tokenType === T_TYPE_INT) {
      // number isn't fragmented
      if (part.int_pattern.length === 1) {
        const pt = part.int_p;
        const l = Math.max(part.int_min, integer.length);
        let digits = '';
        for (let i = l; i > 0; i--) {
          const d = integer.charAt(integer.length - i);
          const p = d ? '' : pt.charAt(pt.length - i) || pt[0];
          let sep = '';
          if (part.grouping) {
            const n = (i - 1) - group_pri;
            if (n >= 0 && !(n % group_sec)) {
              sep = (d || p === '0')
                ? l10n.group
                : pad('?', opts.nbsp);
            }
          }
          digits += (d || pad(p, opts.nbsp)) + sep;
        }
        ret.push(digits);
      }
      else {
        counter.int += digitsStart(integer, part.int_p, tok.num, counter.int);
      }
    }
    else if (tokenType === T_TYPE_FRAC) {
      const o = counter.frac;
      for (let i = 0; i < len; i++) {
        ret.push(fraction[i + o] || pad(tok.num[i], opts.nbsp));
      }
      counter.frac += len;
    }
    else if (tokenType === T_TYPE_MAN) {
      // mantissa sign is attached to the first digit, not the exponent symbol
      // "0E+ 0" will print as "1E +12"
      if (!counter.man) {
        ret.push(mantissa_sign);
      }
      counter.man += digitsStart(mantissa, part.man_p, tok.num, counter.man);
    }
    else if (tokenType === T_TYPE_NUM) {
      counter.num += digitsStart(numerator, part.num_p, tok.num, counter.num);
    }
    else if (tokenType === T_TYPE_DEN) {
      const o = counter.den;
      for (let i = 0; i < len; i++) {
        let digit = denominator[i + o];
        if (!digit) {
          const c = tok.num.charCodeAt(i);
          if ((c > CHAR_0 && c <= CHAR_9) || (denominator_fixed && c === CHAR_0)) {
            denominator_fixed = true;
            digit = opts.nbsp ? '\u00a0' : ' ';
          }
          else if (
            !denominator_fixed &&
            (i === len - 1) &&
            c === CHAR_0 &&
            !denominator
          ) {
            digit = '1';
          }
          else {
            digit = pad(tok.num[i], opts.nbsp);
          }
        }
        ret.push(digit);
      }
      counter.den += len;
    }
    else if (tokenType === T_TYPE_YEAR) {
      if (year < 0) { ret.push(l10n.negative); }
      ret.push(String(Math.abs(year)).padStart(4, '0'));
    }
    else if (tokenType === T_TYPE_YEAR_S) {
      const y = year % 100;
      ret.push(y < 10 ? '0' : '', y);
    }
    else if (tokenType === T_TYPE_MON) {
      ret.push((tok.pad && month < 10 ? '0' : ''), month);
    }
    else if (tokenType === T_TYPE_MNAME_1) {
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
    else if (tokenType === T_TYPE_MNAME_S) {
      if (part.date_system === EPOCH_1317) {
        ret.push(l10n.mmm6[month - 1]);
      }
      else {
        ret.push(l10n.mmm[month - 1]);
      }
    }
    else if (tokenType === T_TYPE_MNAME) {
      if (part.date_system === EPOCH_1317) {
        ret.push(l10n.mmmm6[month - 1]);
      }
      else {
        ret.push(l10n.mmmm[month - 1]);
      }
    }
    else if (tok.type === T_TYPE_WEEKDAY_S) {
      ret.push(l10n.ddd[weekday]);
    }
    else if (tokenType === T_TYPE_WEEKDAY) {
      ret.push(l10n.dddd[weekday]);
    }
    else if (tokenType === T_TYPE_DAY) {
      ret.push((tok.pad && day < 10 ? '0' : ''), day);
    }
    else if (tokenType === T_TYPE_HOUR) {
      const h = hour % part.clock || (part.clock < 24 ? part.clock : 0);
      ret.push((tok.pad && h < 10 ? '0' : ''), h);
    }
    else if (tokenType === T_TYPE_MIN) {
      ret.push((tok.pad && minute < 10 ? '0' : ''), minute);
    }
    else if (tokenType === T_TYPE_SEC) {
      ret.push((tok.pad && second < 10 ? '0' : ''), second);
    }
    else if (tokenType === T_TYPE_SUBSEC) {
      ret.push(l10n.decimal);
      // decimals is pre-determined by longest subsec token
      // but the number emitted is per-token
      const f = subsec.toFixed(part.sec_decimals);
      ret.push(f.slice(2, 2 + tok.decimals));
    }
    else if (tokenType === TOKEN_AMPM) {
      const idx = hour < 12 ? 0 : 1;
      if (tok.short && !l10n_) {
        ret.push('AP'[idx]);
      }
      else {
        ret.push(l10n.ampm[idx]);
      }
    }
    else if (tokenType === T_TYPE_HOUR_E && typeof value === 'number') {
      if (value < 0) {
        ret.push(l10n.negative);
      }
      const hh = (date * 24) + Math.floor(Math.abs(time) / (60 * 60));
      ret.push(String(Math.abs(hh)).padStart(tok.pad, '0'));
    }
    else if (tokenType === T_TYPE_MIN_E && typeof value === 'number') {
      if (value < 0) {
        ret.push(l10n.negative);
      }
      const mm = (date * 1440) + Math.floor(Math.abs(time) / 60);
      ret.push(String(Math.abs(mm)).padStart(tok.pad, '0'));
    }
    else if (tokenType === T_TYPE_SEC_E && typeof value === 'number') {
      if (value < 0) {
        ret.push(l10n.negative);
      }
      const ss = (date * DAYSIZE) + Math.abs(time);
      ret.push(String(Math.abs(ss)).padStart(tok.pad, '0'));
    }
    else if (tokenType === T_TYPE_B_YEAR) {
      ret.push(year + 543);
    }
    else if (tokenType === T_TYPE_B_YEAR_S) {
      const y = (year + 543) % 100;
      ret.push(y < 10 ? '0' : '', y);
    }
  }
  return ret.join('');
}
