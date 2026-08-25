import { expect, test } from 'vitest';
import { format, isDateFormat, isPercentFormat, isTextFormat } from '../lib/index.js';

const excelOpts = { dateSpanLarge: false, dateErrorNumber: false };

test('Various format restrictions', () => {
  // no more than 4 sections
  expect(() => format('a;b;c;d;', '')).toThrow();
  expect(() => format('#;#;#;#;#', '')).toThrow();

  // no more than 2 conditional sections
  expect(() => format('[<-2]a;[<-1]b;[>2]c;d;', '')).toThrow();

  // can't mix dates and numbers (within a segment)
  expect(() => format('y 0', '')).toThrow();
  expect(() => format('yyyy 0', '')).toThrow();
  expect(() => format('m 0', '')).toThrow();
  expect(() => format('mmmm 0', '')).toThrow();
  expect(() => format('d 0', '')).toThrow();
  expect(() => format('dddd 0', '')).toThrow();
  expect(() => format('s 0', '')).toThrow();
  expect(() => format('h 0', '')).toThrow();
  expect(() => format('AM/PM 0', '')).toThrow();
  expect(() => format('[h] 0', '')).toThrow();
  expect(() => format('[m] 0', '')).toThrow();
  expect(() => format('[s] 0', '')).toThrow();
  expect(() => format('y #', '')).toThrow();
  expect(() => format('yyyy #', '')).toThrow();
  expect(() => format('m #', '')).toThrow();
  expect(() => format('mmmm #', '')).toThrow();
  expect(() => format('d #', '')).toThrow();
  expect(() => format('dddd #', '')).toThrow();
  expect(() => format('s #', '')).toThrow();
  expect(() => format('h #', '')).toThrow();
  expect(() => format('AM/PM #', '')).toThrow();
  expect(() => format('[h] #', '')).toThrow();
  expect(() => format('[m] #', '')).toThrow();
  expect(() => format('[s] #', '')).toThrow();
  expect(() => format('y ?', '')).toThrow();
  expect(() => format('yyyy ?', '')).toThrow();
  expect(() => format('m ?', '')).toThrow();
  expect(() => format('mmmm ?', '')).toThrow();
  expect(() => format('d ?', '')).toThrow();
  expect(() => format('dddd ?', '')).toThrow();
  expect(() => format('s ?', '')).toThrow();
  expect(() => format('h ?', '')).toThrow();
  expect(() => format('AM/PM ?', '')).toThrow();
  expect(() => format('[h] ?', '')).toThrow();
  expect(() => format('[m] ?', '')).toThrow();
  expect(() => format('[s] ?', '')).toThrow();

  expect(() => format('d .#', '')).toThrow();
  expect(() => format('mm%', '')).toThrow();
  expect(() => format('mm@', '')).toThrow();

  // no out of bounds dates
  expect(format('dddd, dd. mmmm yyy', -1, excelOpts)).toBe('######');
  expect(format('dddd, dd. mmmm yyy', 2958470, excelOpts)).toBe('######');

  // isDate should not throw on malformed input
  expect(isDateFormat('dddd, dd. mmmm yyy'), "isDateFormat('dddd, dd. mmmm yyy')").toBe(true);
  expect(isDateFormat('0.0M'), "isDateFormat('0.0M')").toBe(false);

  // utility functions exist and work on error formatters
  expect(isDateFormat('y 0'), "isDateFormat('y 0')").toBe(false);
  expect(isPercentFormat('y 0'), "isPercentFormat('y 0')").toBe(false);
  expect(isTextFormat('y 0'), "isTextFormat('y 0')").toBe(false);
});

test('Single characters', () => {
  expect(format(' ', 1)).toBe(' ');
  expect(format('!', 1)).toBe('!');
  expect(() => format('"', '')).toThrow();
  expect(format('#', 1)).toBe('1');
  expect(format('$', 1)).toBe('$');
  expect(format('%', 1)).toBe('%');
  expect(format('&', 1)).toBe('&');
  expect(format('\'', 1)).toBe('\'');
  expect(format('(', 1)).toBe('(');
  expect(format(')', 1)).toBe(')');
  expect(() => format('*', '')).toThrow();
  expect(format('+', 1)).toBe('+');
  expect(format(',', 1)).toBe(',');
  expect(format('-', 1)).toBe('-');
  expect(format('.', 1)).toBe('.');
  // slash is allowed in date formats
  expect(format('d/', 1)).toBe('1/');
  // slash otherwise means vulgar fractions
  expect(format('0/0', 0)).toBe('0/1');
  expect(format('0/0', 1)).toBe('1/1');
  expect(() => format('0/', '')).toThrow();
  expect(() => format('/0', '')).toThrow();
  expect(() => format('/', '')).toThrow();
  expect(format('0', 1)).toBe('1');
  expect(format('1', 1)).toBe('1');
  expect(format('2', 1)).toBe('2');
  expect(format('3', 1)).toBe('3');
  expect(format('4', 1)).toBe('4');
  expect(format('5', 1)).toBe('5');
  expect(format('6', 1)).toBe('6');
  expect(format('7', 1)).toBe('7');
  expect(format('8', 1)).toBe('8');
  expect(format('9', 1)).toBe('9');
  expect(format(':', 1)).toBe(':');
  expect(format(';', 1)).toBe('');
  expect(format('<', 1)).toBe('<');
  expect(format('=', 1)).toBe('=');
  expect(format('>', 1)).toBe('>');
  expect(format('?', 1)).toBe('1');
  expect(format('@', 1)).toBe('1');
  expect(format('A', 1)).toBe('A');
  // B is not allowed at the end of the pattern
  expect(() => format('B', '')).toThrow();
  expect(format('B ', 1)).toBe('43 ');
  expect(format('B;', 1)).toBe('43');
  expect(format('C', 1)).toBe('C');
  expect(format('D', 1)).toBe('1');
  // E is stricter than e, for whatever reason (see E tests below)
  expect(() => format('E', '')).toThrow();
  expect(format('F', 1)).toBe('F');
  expect(format('G', 1)).toBe('');
  expect(format('H', 1)).toBe('0');
  expect(format('I', 1)).toBe('I');
  expect(format('J', 1)).toBe('J');
  expect(format('K', 1)).toBe('K');
  expect(format('L', 1)).toBe('L');
  expect(format('M', 1)).toBe('1');
  expect(() => format('N', '')).toThrow();
  expect(format('O', 1)).toBe('O');
  expect(format('P', 1)).toBe('P');
  expect(format('Q', 1)).toBe('Q');
  expect(format('R', 1)).toBe('R');
  expect(format('S', 1)).toBe('0');
  expect(format('T', 1)).toBe('T');
  expect(format('U', 1)).toBe('U');
  expect(format('V', 1)).toBe('V');
  expect(format('W', 1)).toBe('W');
  expect(format('X', 1)).toBe('X');
  expect(format('Y', 1)).toBe('00');
  expect(format('Z', 1)).toBe('Z');
  expect(() => format('[', '')).toThrow();
  expect(() => format('\\', '')).toThrow();
  expect(format(']', 1)).toBe(']');
  expect(format('^', 1)).toBe('^');
  expect(() => format('_', '')).toThrow();
  expect(format('`', 1)).toBe('`');
  expect(format('a', 1)).toBe('a');
  expect(format('b', 1)).toBe('43');
  expect(format('c', 1)).toBe('c');
  expect(format('d', 1)).toBe('1');
  expect(format('e', 1)).toBe('1900');
  expect(format('f', 1)).toBe('f');
  expect(format('g', 1)).toBe('');
  expect(format('h', 1)).toBe('0');
  expect(format('i', 1)).toBe('i');
  expect(format('j', 1)).toBe('j');
  expect(format('k', 1)).toBe('k');
  expect(format('l', 1)).toBe('l');
  expect(format('m', 1)).toBe('1');
  expect(() => format('n', '')).toThrow();
  expect(format('o', 1)).toBe('o');
  expect(format('p', 1)).toBe('p');
  expect(format('q', 1)).toBe('q');
  expect(format('r', 1)).toBe('r');
  expect(format('s', 1)).toBe('0');
  expect(format('t', 1)).toBe('t');
  expect(format('u', 1)).toBe('u');
  expect(format('v', 1)).toBe('v');
  expect(format('w', 1)).toBe('w');
  expect(format('x', 1)).toBe('x');
  expect(format('y', 1)).toBe('00');
  expect(format('z', 1)).toBe('z');
  expect(format('{', 1)).toBe('{');
  expect(format('|', 1)).toBe('|');
  expect(format('}', 1)).toBe('}');
  expect(format('~', 1)).toBe('~');
  expect(format('\x7f', 1)).toBe('\x7f');
  expect(format('Ä', 1)).toBe('Ä');
  expect(format('Å', 1)).toBe('Å');
  expect(format('Ç', 1)).toBe('Ç');
  expect(() => format('É', '')).toThrow();
  expect(() => format('Ñ', '')).toThrow();
  expect(format('Ö', 1)).toBe('Ö');
  expect(format('Ü', 1)).toBe('Ü');
  expect(format('á', 1)).toBe('á');
  expect(format('à', 1)).toBe('à');
  expect(format('â', 1)).toBe('â');
  expect(format('ä', 1)).toBe('ä');
  expect(format('ã', 1)).toBe('ã');
  expect(format('å', 1)).toBe('å');
  expect(format('ç', 1)).toBe('ç');
  expect(() => format('é', '')).toThrow();
  expect(() => format('è', '')).toThrow();
  expect(() => format('ê', '')).toThrow();
  expect(() => format('ë', '')).toThrow();
  expect(format('í', 1)).toBe('í');
  expect(format('ì', 1)).toBe('ì');
  expect(format('î', 1)).toBe('î');
  expect(format('ï', 1)).toBe('ï');
  expect(() => format('ñ', '')).toThrow();
  expect(format('ó', 1)).toBe('ó');
  expect(format('ò', 1)).toBe('ò');
  expect(format('ô', 1)).toBe('ô');
  expect(format('ö', 1)).toBe('ö');
  expect(format('õ', 1)).toBe('õ');
  expect(format('ú', 1)).toBe('ú');
  expect(format('ù', 1)).toBe('ù');
  expect(format('û', 1)).toBe('û');
  expect(format('ü', 1)).toBe('ü');
  expect(format('†', 1)).toBe('†');
  expect(format('°', 1)).toBe('°');
  expect(format('¢', 1)).toBe('¢');
  expect(format('£', 1)).toBe('£');
  expect(format('§', 1)).toBe('§');
  expect(format('•', 1)).toBe('•');
  expect(format('¶', 1)).toBe('¶');
  expect(format('ß', 1)).toBe('ß');
  expect(format('®', 1)).toBe('®');
  expect(format('©', 1)).toBe('©');
  expect(format('™', 1)).toBe('™');
  expect(format('´', 1)).toBe('´');
  expect(format('¨', 1)).toBe('¨');
  expect(format('≠', 1)).toBe('≠');
  expect(format('Æ', 1)).toBe('Æ');
  expect(format('Ø', 1)).toBe('Ø');
  expect(format('∞', 1)).toBe('∞');
  expect(format('±', 1)).toBe('±');
  expect(format('≤', 1)).toBe('≤');
  expect(format('≥', 1)).toBe('≥');
  expect(format('¥', 1)).toBe('¥');
  expect(format('µ', 1)).toBe('µ');
  expect(format('∂', 1)).toBe('∂');
  expect(format('∑', 1)).toBe('∑');
  expect(format('∏', 1)).toBe('∏');
  expect(format('π', 1)).toBe('π');
  expect(format('∫', 1)).toBe('∫');
  expect(format('ª', 1)).toBe('ª');
  expect(format('º', 1)).toBe('º');
  expect(format('Ω', 1)).toBe('Ω');
  expect(format('æ', 1)).toBe('æ');
  expect(format('ø', 1)).toBe('ø');
  expect(format('¿', 1)).toBe('¿');
  expect(format('¡', 1)).toBe('¡');
  expect(format('¬', 1)).toBe('¬');
});

test('The "E" and "e" operators', () => {
  expect(format('e', 1)).toBe('1900');
  expect(() => format('0e', '')).toThrow();
  expect(() => format('e0', '')).toThrow();
  expect(() => format('0e0', '')).toThrow();
  expect(format('e+', 1)).toBe('1900+'); // Sheets does not allow this
  expect(() => format('0e+', '')).toThrow();
  expect(() => format('e+0', '')).toThrow();
  expect(() => format('0e+0', '')).toThrow();    // Sheets emits "1e+0"
  expect(format('e-', 1)).toBe('1900-'); // Sheets emits "1e+0"
  expect(() => format('0e-', '')).toThrow();
  expect(() => format('e-0', '')).toThrow();
  expect(() => format('0e-0', '')).toThrow();    // Sheets emits "1e0"
  expect(() => format('E', '')).toThrow();
  expect(() => format('0E', '')).toThrow();
  expect(() => format('E0', '')).toThrow();
  expect(() => format('0E0', '')).toThrow();
  expect(() => format('E+', '')).toThrow();
  expect(() => format('0E+', '')).toThrow();
  expect(() => format('E+0', '')).toThrow();
  expect(format('0E+0', 1)).toBe('1E+0');
  expect(() => format('E-', '')).toThrow();
  expect(() => format('0E-', '')).toThrow();
  expect(() => format('E-0', '')).toThrow();
  expect(format('0E-0', 1)).toBe('1E0');

  expect(() => format('0 e 0', '')).toThrow();
  expect(() => format('0 e + 0', '')).toThrow();
  expect(() => format('0 e +0', '')).toThrow();
  expect(() => format('0 e+ 0', '')).toThrow();   // Sheets emits "1 e +4"

  expect(() => format('0 E 0', '')).toThrow();
  expect(() => format('0 E + 0', '')).toThrow();
  expect(() => format('0 E +0', '')).toThrow();
  expect(format('0 E+ 0', 1)).toBe('1 E +0');

  expect(format('e-m', 1)).toBe('1900-1');
});
