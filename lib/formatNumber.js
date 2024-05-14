import { TOKEN_TEXT } from './constants.js';
import { defaultLocale, getLocale } from './locale.js';
import { parseFormatSection } from './parseFormatSection.js';
import { runPart } from './runPart.js';

const default_text = parseFormatSection([
  { type: TOKEN_TEXT, value: '@', raw: '@' }
]);

function getPart (value, parts) {
  for (let pi = 0; pi < 3; pi++) {
    const part = parts[pi];
    if (part) {
      let cond;
      if (part.condition) {
        const operator = part.condition[0];
        const operand = part.condition[1];
        if (operator === '=') { cond = (value === operand); }
        else if (operator === '>') { cond = (value > operand); }
        else if (operator === '<') { cond = (value < operand); }
        else if (operator === '>=') { cond = (value >= operand); }
        else if (operator === '<=') { cond = (value <= operand); }
        else if (operator === '<>') { cond = (value !== operand); }
      }
      else {
        cond = true;
      }
      if (cond) {
        return part;
      }
    }
  }
  // eslint-disable-next-line
  return undefined;
}

export function formatColor (value, parseData) {
  const parts = parseData.partitions;
  if (typeof value !== 'number' || !isFinite(value)) {
    const nan_color = parts[3] ? parts[3].color : null;
    return nan_color || null;
  }
  return getPart(value, parts)?.color ?? null;
}

export function formatValue (value, parseData, opts) {
  const parts = parseData.partitions;
  const l10n = getLocale(parseData.locale || opts.locale);
  // not a number?
  const text_part = parts[3] ? parts[3] : default_text;
  if (typeof value === 'boolean') {
    value = value ? 'TRUE' : 'FALSE';
  }
  if (value == null) {
    return '';
  }
  if (typeof value !== 'number') {
    return runPart(value, text_part, opts, l10n);
  }
  // guard against non-finite numbers:
  if (!isFinite(value)) {
    const loc = l10n || defaultLocale;
    if (isNaN(value)) { return loc.nan; }
    return (value < 0 ? loc.negative : '') + loc.infinity;
  }
  // find and run the pattern part that applies to this number
  const part = getPart(value, parts);
  return part ? runPart(value, part, opts, l10n) : opts.overflow;
}
