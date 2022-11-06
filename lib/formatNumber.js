import { defaultLocale, getLocale } from './locale.js';
import { parsePart } from './parsePart.js';
import { runPart } from './runPart.js';

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

const default_text = parsePart('@');
const default_color = 'black';

export function color (value, parts) {
  if (typeof value !== 'number' || !isFinite(value)) {
    const nan_color = parts[3] ? parts[3].color : default_text.color;
    return nan_color || default_color;
  }
  const part = getPart(value, parts);
  return part ? part.color || default_color : default_color;
}

export function formatNumber (value, parts, opts) {
  const l10n = getLocale(opts.locale);
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
