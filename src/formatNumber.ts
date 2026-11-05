import { TOKEN_TEXT, indexColors } from './constants.ts';
import { readsAsZero } from './dec15.ts';
import { defaultLocale, getLocale } from './locale.ts';
import type { FormatOptions } from './options.ts';
import { parseFormatSection } from './parseFormatSection.ts';
import { prepareFormatterData } from './prepareFormatterData.ts';
import { runPart } from './runPart.ts';
import type { Partition, PatternParseData } from './types.ts';

const default_text = parseFormatSection([
  { type: TOKEN_TEXT, value: '@', raw: '@' }
]);

function getPart (value: string | number | bigint, parts: Partition[]): Partition | undefined {
  for (let pi = 0; pi < 3; pi++) {
    const part = parts[pi];
    if (part) {
      let cond = false;
      if (part.condition) {
        const operator = part.condition[0];
        const operand = part.condition[1];
        if (operator === '=') { cond = (value === operand); }
        else if (operator === '<>') { cond = (value !== operand); }
        else if (typeof value === 'string') { cond = false; }
        else if (operator === '>') { cond = (value > operand); }
        else if (operator === '<') { cond = (value < operand); }
        else if (operator === '>=') { cond = (value >= operand); }
        else if (operator === '<=') { cond = (value <= operand); }
      }
      else {
        cond = true;
      }
      if (cond) {
        return part;
      }
    }
  }
  return undefined;
}

/**
 * Get the value that a number is formatted as, and the section that applies to it. Excel formats a
 * positive number below 2^-1026 as 0.
 *
 * @param value The value to format.
 * @param parts The pattern's sections.
 * @returns The value to format, and its section.
 */
function selectPart<T extends string | number | bigint> (
  value: T,
  parts: Partition[]
): [ T | number, Partition | undefined ] {
  const v = typeof value === 'number' && readsAsZero(value) ? 0 : value;
  return [ v, getPart(v, parts) ];
}

export function formatColor (
  value: unknown,
  parseData: PatternParseData,
  opts: Pick<FormatOptions, 'indexColors'>
): string | number | undefined {
  const parts = parseData.partitions;
  let part: Partition | undefined = parts[3];
  let color: string | number | undefined;
  if ((typeof value === 'number' || typeof value === 'bigint') && Number.isFinite(value)) {
    part = selectPart(value, parts)[1];
  }
  if (part?.color) {
    color = part.color;
  }
  if (color && typeof color === 'number' && opts.indexColors) {
    color = indexColors[color - 1] || '#000';
  }
  return color;
}

export function formatValue (
  value: unknown,
  parseData: PatternParseData,
  opts: FormatOptions
): string {
  const parts = parseData.partitions;
  const l10n = getLocale(parseData.locale || opts.locale) ?? defaultLocale;
  const text_part = parts[3] ? parts[3] : default_text;
  // booleans get converted to string
  if (typeof value === 'boolean') {
    value = l10n.bool[value ? 0 : 1];
  }
  // null | undefined => ''
  if (value == null) {
    return '';
  }
  // anything other than (number | bigint) we'll format as text
  const n = typeof value === 'bigint';
  if (typeof value !== 'number' && !n) {
    return runPart(String(value), text_part, opts, l10n);
  }
  // guard against non-finite numbers:
  if (!n && !Number.isFinite(value)) {
    if (Number.isNaN(value)) {
      return l10n.nan;
    }
    return ((value as number) < 0 ? l10n.negative : '') + l10n.infinity;
  }
  // find and run the pattern part that applies to this number
  const selected = selectPart(value as number | string | bigint, parts);
  const v = selected[0];
  let part = selected[1];
  if (part?.sysdate) {
    const syspattern = l10n.sysdate ?? 'dd mmmm yyyy';
    part = prepareFormatterData(syspattern, false).partitions[0];
  }
  if (part?.systime) {
    const syspattern = l10n.systime ?? 'hh:mm:ss';
    part = prepareFormatterData(syspattern, false).partitions[0];
  }
  return part ? runPart(v, part, opts, l10n) : opts.overflow;
}
