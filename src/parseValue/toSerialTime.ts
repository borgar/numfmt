export type AmPm = 'a' | 'p' | '';

export function toSerialTime (h: string, m: string, s: string, f: string, ampm: AmPm): number {
  const min = +(m || 0);
  const sec = +(s || 0);
  const mss = f ? Number('.' + (f.slice(0, 3) || '0')) : 0;

  // AM/PM part must align with hours
  let hrs = +(h || 0) * 1;
  if (ampm) {
    if (hrs >= 13 || sec >= 60 || min >= 60) {
      return NaN;
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

  let overflow = 0;
  if (min >= 60) { overflow++; }
  if (sec >= 60) { overflow++; }
  if (hrs >= 24) { overflow++; }
  if (overflow > 1) {
    return NaN;
  }
  return ((hrs * 60 * 60) + (min * 60) + sec + mss) / (60 * 60 * 24);
}
