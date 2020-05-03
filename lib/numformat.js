import { getLocale } from './locale';
import { parse_part } from './parsePart';
import { runPart } from './runPart';

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
  return undefined;
}

const default_text = parse_part('@');
const default_color = 'black';

function color (value, parts) {
  if (typeof value !== 'number' || !isFinite(value)) {
    const nan_color = parts[3] ? parts[3].color : default_text.color;
    return nan_color || default_color;
  }
  const part = getPart(value, parts);
  return part ? part.color || default_color : default_color;
}


function formatNumber (value, parts, l10n) {
  // not a number?
  const text_part = parts[3] ? parts[3] : default_text;
  if (typeof value === 'boolean') {
    value = value ? 'TRUE' : 'FALSE';
  }
  if (typeof value !== 'number') {
    return runPart(value, text_part, l10n);
  }
  // guard against non-finite numbers:
  // Excel outputs "#######" here, we try to be slightly more informative.
  if (!isFinite(value)) {
    if (isNaN(value)) {
      return l10n.nan_symbol;
    }
    return (value === -Infinity ? l10n.negative_sign : '') + l10n.infinity_symbol;
  }
  // find and run the pattern part that applies to this number
  const part = getPart(value, parts);
  return part ? runPart(value, part, l10n) : '';
}


function parsePattern (pattern, l10n) {
  const partitions = [];
  let conditional = false;
  let l10n_override;
  let text_partition = null;

  // try {
  let p = pattern;
  let more = 0;
  let part = false;
  let i = 0;
  let conditions = 0;
  do {
    part = parse_part(p);
    if (part.condition) {
      conditions++;
      conditional = true;
    }
    if (part.text) {
      text_partition = part;
    }
    if (part.locale) {
      l10n_override = getLocale(part.locale);
    }
    partitions.push(part);
    more = (p.charAt(part.pattern.length) === ';') ? 1 : 0;
    p = p.slice(part.pattern.length + more);
    i++;
  }
  while (more && i < 4 && conditions < 3);

  // No more than 4 sections and only 2 conditional statements: "1;2;else;txt"
  if (conditions > 2) {
    throw new Error('Unexpected condition');
  }
  if (more) {
    throw new Error('Unexpected partition');
  }

  // if this is not a conditional, then we ensure we have all 4 partitions
  if (!conditional) {
    // if we have less than 4 partitions - and one of them is .text, use it as the text one
    if (partitions.length < 4 && text_partition) {
      for (let pi = 0, pl = partitions.length; pi < pl; pi++) {
        if (partitions[pi] === text_partition) {
          partitions.splice(pi, 1);
        }
      }
    }
    // missing positive
    if (partitions.length < 1 && text_partition) {
      partitions[0] = parse_part('General');
    }
    // missing negative
    if (partitions.length < 2) {
      partitions.push(parse_part('-' + partitions[0].pattern));
    }
    // missing zero
    if (partitions.length < 3) {
      partitions.push(
        parse_part(partitions[0].pattern)
      );
    }
    if (partitions.length < 4) { // missing text
      partitions.push(text_partition || parse_part('@'));
    }

    partitions[0].condition = [ '>', 0 ];
    partitions[1].condition = [ '<', 0 ];
    partitions[2].condition = null;
  }

  const formatter = value => {
    return formatNumber(value, partitions, l10n_override || l10n);
  };
  formatter.color = value => color(value, partitions);
  formatter.isDate = () => !!(
    (partitions[0] && partitions[0].date) ||
    (partitions[1] && partitions[1].date) ||
    (partitions[2] && partitions[2].date) ||
    (partitions[3] && partitions[3].date)
  );
  formatter.pattern = pattern;
  formatter.locale = l10n;

  return formatter;
}

export default parsePattern;
