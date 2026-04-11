import { test, expect } from 'vitest';
import { assertFormat, assertFormatInvalid } from './utils.ts';
import { isDateFormat, isPercentFormat, isTextFormat } from '../lib/index.ts';

const excelOpts = { dateSpanLarge: false, dateErrorNumber: false };

test('Various format restrictions', () => {
  expect.assertions(49);
  // no more than 4 sections
  assertFormatInvalid('a;b;c;d;');
  assertFormatInvalid('#;#;#;#;#');

  // no more than 2 conditional sections
  assertFormatInvalid('[<-2]a;[<-1]b;[>2]c;d;');

  // can't mix dates and numbers (within a segment)
  assertFormatInvalid('y 0');
  assertFormatInvalid('yyyy 0');
  assertFormatInvalid('m 0');
  assertFormatInvalid('mmmm 0');
  assertFormatInvalid('d 0');
  assertFormatInvalid('dddd 0');
  assertFormatInvalid('s 0');
  assertFormatInvalid('h 0');
  assertFormatInvalid('AM/PM 0');
  assertFormatInvalid('[h] 0');
  assertFormatInvalid('[m] 0');
  assertFormatInvalid('[s] 0');
  assertFormatInvalid('y #');
  assertFormatInvalid('yyyy #');
  assertFormatInvalid('m #');
  assertFormatInvalid('mmmm #');
  assertFormatInvalid('d #');
  assertFormatInvalid('dddd #');
  assertFormatInvalid('s #');
  assertFormatInvalid('h #');
  assertFormatInvalid('AM/PM #');
  assertFormatInvalid('[h] #');
  assertFormatInvalid('[m] #');
  assertFormatInvalid('[s] #');
  assertFormatInvalid('y ?');
  assertFormatInvalid('yyyy ?');
  assertFormatInvalid('m ?');
  assertFormatInvalid('mmmm ?');
  assertFormatInvalid('d ?');
  assertFormatInvalid('dddd ?');
  assertFormatInvalid('s ?');
  assertFormatInvalid('h ?');
  assertFormatInvalid('AM/PM ?');
  assertFormatInvalid('[h] ?');
  assertFormatInvalid('[m] ?');
  assertFormatInvalid('[s] ?');

  assertFormatInvalid('d .#');
  assertFormatInvalid('mm%');
  assertFormatInvalid('mm@');

  // no out of bounds dates
  assertFormat('dddd, dd. mmmm yyy', -1, '######', excelOpts);
  assertFormat('dddd, dd. mmmm yyy', 2958470, '######', excelOpts);

  // isDate should not throw on malformed input
  expect(isDateFormat('dddd, dd. mmmm yyy')).toBe(true);
  expect(isDateFormat('0.0M')).toBe(false);

  // utility functions exist and work on error formatters
  expect(isDateFormat('y 0')).toBe(false);
  expect(isPercentFormat('y 0')).toBe(false);
  expect(isTextFormat('y 0')).toBe(false);
});

test('Single characters', () => {
  expect.assertions(170);
  assertFormat(' ', 1, ' ');
  assertFormat('!', 1, '!');
  assertFormatInvalid('"');
  assertFormat('#', 1, '1');
  assertFormat('$', 1, '$');
  assertFormat('%', 1, '%');
  assertFormat('&', 1, '&');
  assertFormat('\'', 1, '\'');
  assertFormat('(', 1, '(');
  assertFormat(')', 1, ')');
  assertFormatInvalid('*');
  assertFormat('+', 1, '+');
  assertFormat(',', 1, ',');
  assertFormat('-', 1, '-');
  assertFormat('.', 1, '.');
  // slash is allowed in date formats
  assertFormat('d/', 1, '1/');
  // slash otherwise means vulgar fractions
  assertFormat('0/0', 0, '0/1');
  assertFormat('0/0', 1, '1/1');
  assertFormatInvalid('0/');
  assertFormatInvalid('/0');
  assertFormatInvalid('/');
  assertFormat('0', 1, '1');
  assertFormat('1', 1, '1');
  assertFormat('2', 1, '2');
  assertFormat('3', 1, '3');
  assertFormat('4', 1, '4');
  assertFormat('5', 1, '5');
  assertFormat('6', 1, '6');
  assertFormat('7', 1, '7');
  assertFormat('8', 1, '8');
  assertFormat('9', 1, '9');
  assertFormat(':', 1, ':');
  assertFormat(';', 1, '');
  assertFormat('<', 1, '<');
  assertFormat('=', 1, '=');
  assertFormat('>', 1, '>');
  assertFormat('?', 1, '1');
  assertFormat('@', 1, '1');
  assertFormat('A', 1, 'A');
  // B is not allowed at the end of the pattern
  assertFormatInvalid('B');
  assertFormat('B ', 1, '43 ');
  assertFormat('B;', 1, '43');
  assertFormat('C', 1, 'C');
  assertFormat('D', 1, '1');
  // E is stricter than e, for whatever reason (see E tests below)
  assertFormatInvalid('E');
  assertFormat('F', 1, 'F');
  assertFormat('G', 1, '');
  assertFormat('H', 1, '0');
  assertFormat('I', 1, 'I');
  assertFormat('J', 1, 'J');
  assertFormat('K', 1, 'K');
  assertFormat('L', 1, 'L');
  assertFormat('M', 1, '1');
  assertFormatInvalid('N');
  assertFormat('O', 1, 'O');
  assertFormat('P', 1, 'P');
  assertFormat('Q', 1, 'Q');
  assertFormat('R', 1, 'R');
  assertFormat('S', 1, '0');
  assertFormat('T', 1, 'T');
  assertFormat('U', 1, 'U');
  assertFormat('V', 1, 'V');
  assertFormat('W', 1, 'W');
  assertFormat('X', 1, 'X');
  assertFormat('Y', 1, '00');
  assertFormat('Z', 1, 'Z');
  assertFormatInvalid('[');
  assertFormatInvalid('\\');
  assertFormat(']', 1, ']');
  assertFormat('^', 1, '^');
  assertFormatInvalid('_');
  assertFormat('`', 1, '`');
  assertFormat('a', 1, 'a');
  assertFormat('b', 1, '43');
  assertFormat('c', 1, 'c');
  assertFormat('d', 1, '1');
  assertFormat('e', 1, '1900');
  assertFormat('f', 1, 'f');
  assertFormat('g', 1, '');
  assertFormat('h', 1, '0');
  assertFormat('i', 1, 'i');
  assertFormat('j', 1, 'j');
  assertFormat('k', 1, 'k');
  assertFormat('l', 1, 'l');
  assertFormat('m', 1, '1');
  assertFormatInvalid('n');
  assertFormat('o', 1, 'o');
  assertFormat('p', 1, 'p');
  assertFormat('q', 1, 'q');
  assertFormat('r', 1, 'r');
  assertFormat('s', 1, '0');
  assertFormat('t', 1, 't');
  assertFormat('u', 1, 'u');
  assertFormat('v', 1, 'v');
  assertFormat('w', 1, 'w');
  assertFormat('x', 1, 'x');
  assertFormat('y', 1, '00');
  assertFormat('z', 1, 'z');
  assertFormat('{', 1, '{');
  assertFormat('|', 1, '|');
  assertFormat('}', 1, '}');
  assertFormat('~', 1, '~');
  assertFormat('', 1, '1');
  assertFormat('Ä', 1, 'Ä');
  assertFormat('Å', 1, 'Å');
  assertFormat('Ç', 1, 'Ç');
  assertFormatInvalid('É');
  assertFormatInvalid('Ñ');
  assertFormat('Ö', 1, 'Ö');
  assertFormat('Ü', 1, 'Ü');
  assertFormat('á', 1, 'á');
  assertFormat('à', 1, 'à');
  assertFormat('â', 1, 'â');
  assertFormat('ä', 1, 'ä');
  assertFormat('ã', 1, 'ã');
  assertFormat('å', 1, 'å');
  assertFormat('ç', 1, 'ç');
  assertFormatInvalid('é');
  assertFormatInvalid('è');
  assertFormatInvalid('ê');
  assertFormatInvalid('ë');
  assertFormat('í', 1, 'í');
  assertFormat('ì', 1, 'ì');
  assertFormat('î', 1, 'î');
  assertFormat('ï', 1, 'ï');
  assertFormatInvalid('ñ');
  assertFormat('ó', 1, 'ó');
  assertFormat('ò', 1, 'ò');
  assertFormat('ô', 1, 'ô');
  assertFormat('ö', 1, 'ö');
  assertFormat('õ', 1, 'õ');
  assertFormat('ú', 1, 'ú');
  assertFormat('ù', 1, 'ù');
  assertFormat('û', 1, 'û');
  assertFormat('ü', 1, 'ü');
  assertFormat('†', 1, '†');
  assertFormat('°', 1, '°');
  assertFormat('¢', 1, '¢');
  assertFormat('£', 1, '£');
  assertFormat('§', 1, '§');
  assertFormat('•', 1, '•');
  assertFormat('¶', 1, '¶');
  assertFormat('ß', 1, 'ß');
  assertFormat('®', 1, '®');
  assertFormat('©', 1, '©');
  assertFormat('™', 1, '™');
  assertFormat('´', 1, '´');
  assertFormat('¨', 1, '¨');
  assertFormat('≠', 1, '≠');
  assertFormat('Æ', 1, 'Æ');
  assertFormat('Ø', 1, 'Ø');
  assertFormat('∞', 1, '∞');
  assertFormat('±', 1, '±');
  assertFormat('≤', 1, '≤');
  assertFormat('≥', 1, '≥');
  assertFormat('¥', 1, '¥');
  assertFormat('µ', 1, 'µ');
  assertFormat('∂', 1, '∂');
  assertFormat('∑', 1, '∑');
  assertFormat('∏', 1, '∏');
  assertFormat('π', 1, 'π');
  assertFormat('∫', 1, '∫');
  assertFormat('ª', 1, 'ª');
  assertFormat('º', 1, 'º');
  assertFormat('Ω', 1, 'Ω');
  assertFormat('æ', 1, 'æ');
  assertFormat('ø', 1, 'ø');
  assertFormat('¿', 1, '¿');
  assertFormat('¡', 1, '¡');
  assertFormat('¬', 1, '¬');
});

test('The "E" and "e" operators', () => {
  expect.assertions(33);
  assertFormat('e', 1, '1900');
  assertFormatInvalid('0e');
  assertFormatInvalid('e0');
  assertFormatInvalid('0e0');
  assertFormat('e+', 1, '1900+'); // Sheets does not allow this
  assertFormatInvalid('0e+');
  assertFormatInvalid('e+0');
  assertFormatInvalid('0e+0');    // Sheets emits "1e+0"
  assertFormat('e-', 1, '1900-'); // Sheets emits "1e+0"
  assertFormatInvalid('0e-');
  assertFormatInvalid('e-0');
  assertFormatInvalid('0e-0');    // Sheets emits "1e0"
  assertFormatInvalid('E');
  assertFormatInvalid('0E');
  assertFormatInvalid('E0');
  assertFormatInvalid('0E0');
  assertFormatInvalid('E+');
  assertFormatInvalid('0E+');
  assertFormatInvalid('E+0');
  assertFormat('0E+0', 1, '1E+0');
  assertFormatInvalid('E-');
  assertFormatInvalid('0E-');
  assertFormatInvalid('E-0');
  assertFormat('0E-0', 1, '1E0');

  assertFormatInvalid('0 e 0');
  assertFormatInvalid('0 e + 0');
  assertFormatInvalid('0 e +0');
  assertFormatInvalid('0 e+ 0');   // Sheets emits "1 e +4"

  assertFormatInvalid('0 E 0');
  assertFormatInvalid('0 E + 0');
  assertFormatInvalid('0 E +0');
  assertFormat('0 E+ 0', 1, '1 E +0');

  assertFormat('e-m', 1, '1900-1');
});
