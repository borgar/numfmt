export function clamp (num: number): number {
  if (num === 0) {
    return num;
  }
  const d = Math.ceil(Math.log10(num < 0 ? -num : num));
  const mag = 10 ** (16 - Math.floor(d));
  return isFinite(mag) ? Math.round(num * mag) / mag : 0;
}
