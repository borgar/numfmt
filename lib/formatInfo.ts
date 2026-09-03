import { u_YEAR, u_MONTH, u_DAY, u_HOUR, u_MIN, u_SEC, reCurrencySymbols, TOKEN_STRING, T_TYPE_YEAR, T_TYPE_YEAR_S, T_TYPE_B_YEAR, T_TYPE_B_YEAR_S, T_TYPE_MON, T_TYPE_MNAME, T_TYPE_MNAME_S, T_TYPE_MNAME_1, T_TYPE_WEEKDAY, T_TYPE_WEEKDAY_S, T_TYPE_DAY, T_TYPE_HOUR, T_TYPE_MIN, T_TYPE_SEC, TOKEN_AMPM } from './constants.ts';
import type { FormatDateInfo, FormatInfo, Partition } from './types.ts';

export function isPercent (partitions: Partition[]): boolean {
  return !!(
    (partitions[0]?.percent) ||
    (partitions[1]?.percent) ||
    (partitions[2]?.percent) ||
    (partitions[3]?.percent)
  );
}

export function isDate (partitions: Partition[]): boolean {
  return !!(
    (partitions[0]?.date) ||
    (partitions[1]?.date) ||
    (partitions[2]?.date) ||
    (partitions[3]?.date)
  );
}

export function isText (partitions: Partition[]): boolean {
  const [ part1, part2, part3, part4 ] = partitions;
  return !!(
    (!part1 || part1.generated) &&
    (!part2 || part2.generated) &&
    (!part3 || part3.generated) &&
    part4?.text && !part4.generated
  );
}

const level = {
  text: 15,
  datetime: 10.8,
  date: 10.8,
  time: 10.8,
  percent: 10.6,
  currency: 10.4,
  grouped: 10.2,
  scientific: 6,
  number: 4,
  fraction: 2,
  general: 0,
  error: 0
};

const dateCodes: [ string, number ][] = [
  [ 'DMY', 1 ],
  [ 'DM', 2 ],
  [ 'MY', 3 ],
  [ 'MDY', 4 ],
  [ 'MD', 5 ],
  [ 'hmsa', 6 ],
  [ 'hma', 7 ],
  [ 'hms', 8 ],
  [ 'hm', 9 ]
];

export function info (partitions: Partition[], currencyId?: string): FormatInfo {
  const [ partPos, partNeg ] = partitions;
  const frac_max = partPos.frac_max;
  const output: FormatInfo = {
    type: 'general',
    isDate: isDate(partitions),
    isText: isText(partitions),
    isPercent: isPercent(partitions),
    maxDecimals: partPos.general ? 9 : frac_max,
    scale: partPos.scale ?? 1,
    color: 0,
    parentheses: 0,
    grouped: partPos.grouping ? 1 : 0,
    code: '',
    level: 0
  };

  // currency identifier may be passed in, but otherwise we report
  // if we find any known glyph in the tokens
  const isCurrency = (!output.isDate && !output.isText && !partPos.error) && partPos.tokens.some(tok => (
    tok.type === TOKEN_STRING &&
    (currencyId
      ? tok.value === currencyId
      : reCurrencySymbols.test(tok.value))
  ));

  let codeType = 'G';
  let codeNum = (frac_max >= 0) ? Math.min(15, frac_max) : 0;
  let codeParens = '';
  let codeDash = '';

  if (partNeg?.color) {
    codeDash = '-';
    output.color = 1;
  }
  if (partPos.parens) {
    codeParens = '()';
    output.parentheses = 1;
  }

  if (isCurrency) {
    codeType = 'C';
    output.type = 'currency';
  }
  else if (partPos.error) {
    output.type = 'error';
    output.maxDecimals = 0;
  }
  else if (output.isDate) {
    let haveTime = 0;
    let haveDate = 0;
    let order = '';
    // This is equivalent to how Excel does this.
    // It has to get the order right but then ignores any trailing tokens.
    // So:  "mmm dd yyyy" matches "mdy" = D4
    // But: "mmm dd dd yyyy" matches "md" = D5
    partPos.tokens.forEach(tok => {
      const type = tok.type;
      if (type === T_TYPE_YEAR || type === T_TYPE_YEAR_S || type === T_TYPE_B_YEAR || type === T_TYPE_B_YEAR_S) {
        order += 'Y';
        haveDate++;
      }
      else if (type === T_TYPE_MON || type === T_TYPE_MNAME || type === T_TYPE_MNAME_S || type === T_TYPE_MNAME_1) {
        order += 'M';
        haveDate++;
      }
      else if (type === T_TYPE_WEEKDAY || type === T_TYPE_WEEKDAY_S || type === T_TYPE_DAY) {
        order += 'D';
        haveDate++;
      }
      else if (type === T_TYPE_HOUR) {
        order += 'h';
        haveTime++;
      }
      else if (type === T_TYPE_MIN) {
        order += 'm';
        haveTime++;
      }
      else if (type === T_TYPE_SEC) {
        order += 's';
        haveTime++;
      }
      else if (type === TOKEN_AMPM) {
        order += 'a';
        haveTime++;
      }
    });
    output.type = 'date';
    if (haveDate && haveTime) {
      output.type = 'datetime';
    }
    else if (!haveDate && haveTime) {
      output.type = 'time';
    }
    const code = dateCodes.find(d => order.startsWith(d[0]));
    codeType = code ? 'D' : 'G';
    codeNum = code ? code[1] : 0;
  }
  else if (output.isText) {
    codeType = 'G';
    output.type = 'text';
    output.maxDecimals = 0;
  }
  else if (partPos.general) {
    codeType = 'G';
    output.type = 'general';
  }
  else if (partPos.fractions) {
    codeType = 'G';
    output.type = 'fraction';
  }
  else if (partPos.exponential) {
    codeType = 'S';
    output.type = 'scientific';
  }
  else if (output.isPercent) {
    codeType = 'P';
    output.type = 'percent';
  }
  else if (partPos.grouping) {
    codeType = ',';
    output.type = 'grouped';
  }
  else if (partPos.int_max || frac_max) {
    codeType = 'F';
    output.type = 'number';
  }

  output.code = codeType + (codeType === 'G' ? '' : codeNum) + codeDash + codeParens;

  // Excel can combine some codes, but not all.
  // When integer value of two is equal and it can't combine,
  // the "first" one wins out.
  output.level = level[output.type];

  return output;
}

export function dateInfo (partitions: Partition[]): FormatDateInfo {
  const [ partPos ] = partitions;
  const r: FormatDateInfo = {
    year: !!(partPos.date & u_YEAR),
    month: !!(partPos.date & u_MONTH),
    day: !!(partPos.date & u_DAY),
    hours: !!(partPos.date & u_HOUR),
    minutes: !!(partPos.date & u_MIN),
    seconds: !!(partPos.date & u_SEC),
    clockType: partPos.clock === 12 ? 12 : 24
  };
  return r;
}
