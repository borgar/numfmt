/**
 * @ignore
 * @param c Instruction character (['#', '?', '0'])
 * @param [nbsp=false] Use nonbreaking space or not?
 * @returns Padding character
 */
export function pad (c: string, nbsp: boolean = false): string {
  if (c === '0') {
    return '0';
  }
  else if (c === '?') {
    return nbsp ? '\u00a0' : ' ';
  }
  // if (c === '#')
  return '';
}
