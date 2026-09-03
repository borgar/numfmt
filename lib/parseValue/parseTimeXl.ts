import type { LocaleData } from '../locale.ts';
import { splitString, timeSplitter, type TokenS } from './splitString.ts';
import { toSerialTime, type AmPm } from './toSerialTime.ts';
import type { ParseDataNum } from './types.ts';

const normAMPMStr = (s: string) => s.replace(/\s+/g, '').toLowerCase();

const TAILS: Record<string, 'a' | 'p'> = {
  'a': 'a',
  'a.': 'a',
  'a:': 'a',
  'am': 'a',
  'p': 'p',
  'p.': 'p',
  'p:': 'p',
  'pm': 'p'
};

function isDigits (str: string): boolean {
  return /^\d\d?$/.test(str);
}
function isFrac (str: string): boolean {
  return /^\d{0,10}$/.test(str);
}

type TimeBits = { h: string, m: string, s: string, f: string, ap: string, z: string };

function hms1 (p: TokenS[]): TimeBits | null {
  if (p[1]?.value !== ':') {
    return null;
  }
  return {
    h: p[0].value,
    m: p[2]?.value ?? '0',
    s: p[4]?.value ?? '0',
    f: '0',
    ap: '',
    z: +p[0].value > 23 ? '[h]:mm:ss' : (p[4] ? 'h:mm:ss' : 'h:mm')
  };
}

function h_ (p: TokenS[]): TimeBits | null {
  return {
    h: p[0].value,
    m: '0',
    s: '0',
    f: '0',
    ap: normAMPMStr(p[2].value),
    z: 'h:mm AM/PM'
  };
}

function hm_ (p: TokenS[]): TimeBits | null {
  return {
    h: p[0].value,
    m: p[2].value,
    s: '0',
    f: '0',
    ap: normAMPMStr(p[4].value),
    z: 'h:mm AM/PM'
  };
}

const allowedPatterns: Record<string, (p: TokenS[]) => TimeBits | null> = {
  '0:': hms1,
  '0:0': hms1,
  '0:0:': hms1,
  '0:0:0': hms1,
  '0:0.0': p => ({ h: '0', m: p[0].value, s: p[2].value, f: p[4].value, ap: '', z: 'mm:ss.0' }),
  '0:0:0.0': p => ({ h: p[0].value, m: p[2].value, s: p[4].value, f: p[6].value, ap: '', z: 'mm:ss.0' }),
  '0_?': h_,
  '0_?:': h_,
  '0:0_?': hm_,
  '0:0_?:': hm_,
  '0:0:0_?': p => ({ h: p[0].value, m: p[2].value, s: p[4].value, f: '0', ap: normAMPMStr(p[6].value), z: +p[0].value > 23 ? '[h]:mm:ss AM/PM' : 'h:mm:ss AM/PM' })
};

export function parseTimeXl (value: string, l10n: LocaleData): ParseDataNum | undefined {
  const parts = splitString(value, timeSplitter);

  const lastType = parts.at(-1)?.type;
  if (lastType === '~' || lastType === '.') {
    parts.pop();
  }

  const pattern = parts.reduce((a, c) => a + c.type, '');
  if (!(pattern in allowedPatterns)) {
    return;
  }
  const sss = allowedPatterns[pattern](parts);
  if (!sss) {
    return;
  }
  const { h, m, s, f, ap, z } = sss;

  if (isDigits(h) && isDigits(m) && isDigits(s) && isFrac(f)) {
    let ampm: AmPm = '';
    if (ap === normAMPMStr(l10n.ampm[0]) || TAILS[ap] === 'a') {
      ampm = 'a';
    }
    else if (ap === normAMPMStr(l10n.ampm[1]) || TAILS[ap] === 'p') {
      ampm = 'p';
    }
    else if (ap) {
      return;
    }

    const v = toSerialTime(h, m, s, f, ampm);
    if (isFinite(v)) {
      const out: ParseDataNum = { v, z };
      if (+m > 59 || +s > 59) {
        delete out.z;
      }
      return out;
    }
  }

  return;
}
