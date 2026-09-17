import type { LocaleData } from '../locale.ts';
import type { ParseDataNum } from './types.ts';

const normAMPMStr = (s: string): string => (
  s.replace(/\s+/g, '').trim()
    .replace(/\./g, '')
    .toLowerCase()
);

export function parseTimeNf (value: string, l10n: LocaleData): ParseDataNum | undefined {
  const parts = /^\s*([10]?\d|2[0-4])(?::([0-5]\d|\d))?(?::([0-5]\d|\d))?(\.\d{1,10})?(?=\s*[^\s\d]|$)/.exec(value);
  let ampm = '';
  if (parts) {
    const tail = normAMPMStr(value.slice(parts[0].length));
    if (tail === normAMPMStr(l10n.ampm[0]) || tail === 'a' || tail === 'am') {
      ampm = 'a';
    }
    else if (tail === normAMPMStr(l10n.ampm[1]) || tail === 'p' || tail === 'pm') {
      ampm = 'p';
    }
    else if (tail === ':') {
      if (!parts[3]) {
        parts[3] = '0';
      }
      if (!parts[2]) {
        parts[2] = '0';
      }
    }
    else if (tail) {
      return undefined;
    }
  }
  if (parts) {
    const [ , h, m, s, f ] = parts;
    // don't allow milliseconds without seconds
    if (f && !s) {
      return undefined;
    }
    // single number must also include AM/PM part
    if (!ampm && !m && !s) {
      return undefined;
    }
    // AM/PM part must align with hours
    let hrs = +(h || 0) * 1;
    if (ampm) {
      if (hrs >= 13) {
        return undefined;
      }
      // 00:00 AM - 12:00 AM
      if (ampm === 'a') {
        if (hrs === 12) {
          hrs = 0;
        } // midnight
      }
      else if (ampm === 'p') {
        if (hrs !== 12) {
          hrs += 12;
        } // afternoon
      }
    }
    const min = +(m || 0) * 1;
    const sec = +(s || 0) * 1;
    const mss = +(f || 0) * 1;

    return {
      v: ((hrs * 60 * 60) + (min * 60) + sec + mss) / (60 * 60 * 24),
      z: (
        (h.length === 2 ? 'hh' : 'h') +
        ':mm' +
        (s ? ':ss' : '') +
        (ampm ? ' AM/PM' : '')
      )
    };
  }
  return undefined;
}
