import { test, expect } from 'vitest';
import { assertInfo, assertDateInfo } from './utils.ts';
import { getFormatInfo } from '../lib/index.ts';

test('numfmt.info', () => {
  expect.assertions(5);
  const i1 = { ...getFormatInfo('0') };
  expect(typeof i1).toBe('object');
  expect(i1).toEqual({
    type: 'number',
    isDate: false,
    isText: false,
    isPercent: false,
    maxDecimals: 0,
    color: 0,
    scale: 1,
    parentheses: 0,
    grouped: 0,
    code: 'F0',
    level: 4
  });

  const i2 = { ...getFormatInfo('0') };
  expect(typeof i2).toBe('object');
  expect(i2).toEqual({
    type: 'number',
    isDate: false,
    isText: false,
    isPercent: false,
    maxDecimals: 0,
    scale: 1,
    color: 0,
    parentheses: 0,
    grouped: 0,
    code: 'F0',
    level: 4
  });

  const borked = { ...getFormatInfo('y 0') };
  expect(borked).toEqual({
    type: 'error',
    isDate: false,
    isText: false,
    isPercent: false,
    maxDecimals: 0,
    scale: 1,
    color: 0,
    parentheses: 0,
    grouped: 0,
    code: 'G',
    level: 0
  });
});

test('General', () => {
  expect.assertions(3);
  assertInfo('General', {
    type: 'general',
    maxDecimals: 9,
    code: 'G'
  });
  assertInfo('General;-General', {
    type: 'general',
    maxDecimals: 9,
    code: 'G'
  });
  assertInfo('(General);[blue](-General);0;@', {
    type: 'general',
    maxDecimals: 9,
    code: 'G-()',
    color: 1,
    parentheses: 1
  });
});

test('Numbers', () => {
  expect.assertions(10);
  assertInfo('0', {
    type: 'number',
    maxDecimals: 0,
    code: 'F0',
    level: 4
  });
  assertInfo('0.0', {
    type: 'number',
    maxDecimals: 1,
    code: 'F1',
    level: 4
  });
  assertInfo('0.000', {
    type: 'number',
    maxDecimals: 3,
    code: 'F3',
    level: 4
  });
  assertInfo('0.000000000000000', {
    type: 'number',
    maxDecimals: 15,
    code: 'F15',
    level: 4
  });
  assertInfo('0.0000000000000000', {
    type: 'number',
    maxDecimals: 16,
    code: 'F15',
    level: 4
  });

  assertInfo('#,##0', {
    type: 'grouped',
    maxDecimals: 0,
    code: ',0',
    grouped: 1,
    level: 10.2
  });
  assertInfo('#,##0.00', {
    type: 'grouped',
    maxDecimals: 2,
    code: ',2',
    grouped: 1,
    level: 10.2
  });
  assertInfo('(#,##0.00)', {
    type: 'grouped',
    maxDecimals: 2,
    code: ',2()',
    parentheses: 1,
    grouped: 1,
    level: 10.2
  });

  assertInfo('0.00,"K"', {
    type: 'number',
    maxDecimals: 2,
    code: 'F2',
    scale: 0.001,
    level: 4
  });
  assertInfo('0.00,,"K"', {
    type: 'number',
    maxDecimals: 2,
    code: 'F2',
    scale: 0.000001,
    level: 4
  });
});

test('Parentheses', () => {
  expect.assertions(6);
  assertInfo('(0)', {
    type: 'number',
    parentheses: 1,
    code: 'F0()',
    level: 4
  });
  assertInfo('0;(0)', {
    type: 'number',
    code: 'F0',
    level: 4
  });
  assertInfo('0;0;(0)', {
    type: 'number',
    code: 'F0',
    level: 4
  });
  assertInfo('(General)', {
    type: 'general',
    parentheses: 1,
    code: 'G()',
    maxDecimals: 9
  });
  assertInfo('(0', {
    type: 'number',
    parentheses: 1,
    code: 'F0()',
    level: 4
  });
  assertInfo('0)', {
    type: 'number',
    code: 'F0',
    level: 4
  });
});

test('Fractions', () => {
  expect.assertions(2);
  assertInfo('# ?/?', {
    type: 'fraction',
    maxDecimals: 0,
    code: 'G',
    level: 2
  });
  assertInfo('0 ??/??', {
    type: 'fraction',
    maxDecimals: 0,
    code: 'G',
    level: 2
  });
});

test('Text', () => {
  expect.assertions(2);
  assertInfo('@', {
    type: 'text',
    isText: true,
    code: 'G',
    level: 15
  });
  assertInfo('(@)', {
    type: 'text',
    isText: true,
    code: 'G',
    level: 15
  });
});

test('Text', () => {
  expect.assertions(2);
  assertInfo('@', {
    type: 'text',
    isText: true,
    code: 'G',
    level: 15
  });
  assertInfo('(@)', {
    type: 'text',
    isText: true,
    code: 'G',
    level: 15
  });
});

test('Currency', () => {
  expect.assertions(11);
  assertInfo('$#,##0;($#,##0)', {
    type: 'currency',
    code: 'C0',
    grouped: 1,
    level: 10.4
  });
  assertInfo('#,##0.00 €', {
    type: 'currency',
    code: 'C2',
    maxDecimals: 2,
    grouped: 1,
    level: 10.4
  });
  assertInfo('₿ 0.0000', {
    type: 'currency',
    code: 'C4',
    maxDecimals: 4,
    level: 10.4
  });

  // can pass in own currency
  const testCurrency = (str: string, identifier: string, code: string) => {
    const info = getFormatInfo(str, { currency: identifier });
    expect(info.code).toBe(code);
  };
  // Excel doesn't really have a great solution to this:
  // It just contorts the string to ensure that the current
  // currency identifier is a separate token when parsed.
  testCurrency('#,##0.00 "ISK"', 'ISK', 'C2');
  testCurrency('#,##0\\ "fiskur"', 'ISK', ',0');
  testCurrency('#,##0\\ "fISKur"', 'ISK', ',0');
  testCurrency('#,##0\\ "f ISK ur"', 'ISK', ',0');
  testCurrency('#,##0\\ \\f"ISK"\\u\\r', 'ISK', 'C0');
  testCurrency('#,##0\\ "ISK"', 'ISK', 'C0');
  testCurrency('#,##0\\a"ISK"\\a', 'ISK', 'C0');
  testCurrency('#,##0"aISKa"', 'ISK', ',0');
});

test('Percentages', () => {
  expect.assertions(2);
  assertInfo('0%', {
    type: 'percent',
    isPercent: true,
    scale: 100,
    code: 'P0',
    level: 10.6
  });
  assertInfo('0.00%;[red]0.00%', {
    type: 'percent',
    isPercent: true,
    scale: 100,
    code: 'P2-',
    color: 1,
    maxDecimals: 2,
    level: 10.6
  });
});

test('Scientific', () => {
  expect.assertions(3);
  assertInfo('0E+0', {
    type: 'scientific',
    code: 'S0',
    level: 6
  });
  assertInfo('0.00E+00', {
    type: 'scientific',
    code: 'S2',
    maxDecimals: 2,
    level: 6
  });
  assertInfo('0.0E+0;[red]0.0E+0', {
    type: 'scientific',
    code: 'S1-',
    color: 1,
    maxDecimals: 1,
    level: 6
  });
});

test('Dates', () => {
  expect.assertions(56);
  const dt = { type: 'date', isDate: true, level: 10.8 };
  const tm = { type: 'time', isDate: true, level: 10.8 };
  // D1
  assertInfo('dd-mmm-yyyy h:mm:ss A/P', { ...dt, code: 'D1', type: 'datetime' });
  assertInfo('dd-mmm-yyyy h:mm:ss', { ...dt, code: 'D1', type: 'datetime' });
  assertInfo('dd-mmm-yyyy', { ...dt, code: 'D1' });
  assertInfo('d-mmm-yyyy', { ...dt, code: 'D1' });
  assertInfo('d-mm-yyyy', { ...dt, code: 'D1' });
  assertInfo('d-m-yyyy', { ...dt, code: 'D1' });
  assertInfo('d-m-yy', { ...dt, code: 'D1' });
  assertInfo('d-m-b', { ...dt, code: 'D1' });
  // D2
  assertInfo('dd-mmmm h:mm A/P', { ...dt, code: 'D2', type: 'datetime' });
  assertInfo('dd-mmm h:mm:ss', { ...dt, code: 'D2', type: 'datetime' });
  assertInfo('dd-mmm', { ...dt, code: 'D2' });
  assertInfo('d-mmm', { ...dt, code: 'D2' });
  assertInfo('d-mm', { ...dt, code: 'D2' });
  assertInfo('d-m', { ...dt, code: 'D2' });
  assertInfo('d-m-m', { ...dt, code: 'D2' });
  assertInfo('d-m-d', { ...dt, code: 'D2' });
  // D3
  assertInfo('mmmm-yyyy h:mm A/P', { ...dt, code: 'D3', type: 'datetime' });
  assertInfo('mmmm-yyyy', { ...dt, code: 'D3' });
  assertInfo('m-y', { ...dt, code: 'D3' });
  assertInfo('m-y-m', { ...dt, code: 'D3' });
  assertInfo('m-y-d', { ...dt, code: 'D3' });
  assertInfo('m-b', { ...dt, code: 'D3' });
  // D4 (same as D1 but month first)
  assertInfo('mmm-dd-yyyy h:mm:ss A/P', { ...dt, code: 'D4', type: 'datetime' });
  assertInfo('mmm-dd-yyyy h:mm:ss', { ...dt, code: 'D4', type: 'datetime' });
  assertInfo('mmm-dd-yyyy', { ...dt, code: 'D4' });
  assertInfo('mmm-d-yyyy', { ...dt, code: 'D4' });
  assertInfo('mm-d-yyyy', { ...dt, code: 'D4' });
  assertInfo('m-d-yyyy', { ...dt, code: 'D4' });
  assertInfo('m-d-yy', { ...dt, code: 'D4' });
  assertInfo('m-d-y-m', { ...dt, code: 'D4' });
  assertInfo('m-d-b', { ...dt, code: 'D4' });
  // D5 (same as D2 but month first)
  assertInfo('mmmm-dd h:mm A/P', { ...dt, code: 'D5', type: 'datetime' });
  assertInfo('mmm-dd h:mm:ss', { ...dt, code: 'D5', type: 'datetime' });
  assertInfo('mmm-dd', { ...dt, code: 'D5' });
  assertInfo('mmm-d', { ...dt, code: 'D5' });
  assertInfo('mm-d', { ...dt, code: 'D5' });
  assertInfo('m-d', { ...dt, code: 'D5' });
  assertInfo('m-d-d', { ...dt, code: 'D5' });
  assertInfo('m-d-m', { ...dt, code: 'D5' });
  assertInfo('m-d-d-y', { ...dt, code: 'D5' });
  // D6
  assertInfo('h:mm:ss AM/PM', { ...tm, code: 'D6' });
  assertInfo('h:mm:ss "foo" AM/PM', { ...tm, code: 'D6' });
  assertInfo('h:m:s A/P', { ...tm, code: 'D6' });
  // D7
  assertInfo('h:mm AM/PM', { ...tm, code: 'D7' });
  assertInfo('h:mm "foo" AM/PM', { ...tm, code: 'D7' });
  assertInfo('h:m A/P', { ...tm, code: 'D7' });
  // D8
  assertInfo('h:mm:ss', { ...tm, code: 'D8' });
  assertInfo('"foo" h:mm:ss "bar"', { ...tm, code: 'D8' });
  assertInfo('h:m:s', { ...tm, code: 'D8' });
  // D9
  assertInfo('h:mm', { ...tm, code: 'D9' });
  assertInfo('"foo" h:mm "bar"', { ...tm, code: 'D9' });
  assertInfo('h:m', { ...tm, code: 'D9' });
  // Non coded dates
  assertInfo('yyyy', { ...dt, code: 'G' });
  assertInfo('yyyy-mm-dd', { ...dt, code: 'G' });
  assertInfo('yyyy-mm-dd"T"hh:mm:ss', { ...dt, code: 'G', type: 'datetime' });
  assertInfo('dddd h:mm:ss', { ...dt, code: 'G', type: 'datetime' });
});

test('dateInfo', () => {
  expect.assertions(33);
  // numfmt.getDateInfo returns "all off" for non dates
  assertDateInfo('0', {});

  // dateInfo makes sense even when pattern is bogus
  assertDateInfo('y 0', {});

  assertDateInfo('yyyy', { year: true });
  assertDateInfo('yyy', { year: true });
  assertDateInfo('yy', { year: true });
  assertDateInfo('y', { year: true });
  assertDateInfo('mmmm', { month: true });
  assertDateInfo('mmm', { month: true });
  assertDateInfo('mm', { month: true });
  assertDateInfo('m', { month: true });
  assertDateInfo('dddd', { day: true });
  assertDateInfo('ddd', { day: true });
  assertDateInfo('dd', { day: true });
  assertDateInfo('d', { day: true });
  assertDateInfo('hh', { hours: true });
  assertDateInfo('h', { hours: true });
  assertDateInfo('h:mm', { hours: true, minutes: true });
  assertDateInfo('h:m', { hours: true, minutes: true });
  assertDateInfo('ss', { seconds: true });
  assertDateInfo('s', { seconds: true });
  assertDateInfo('hh am/pm', { hours: true, clockType: 12 });
  assertDateInfo('hh A/P', { hours: true, clockType: 12 });

  assertDateInfo('yyyy-mm', { year: true, month: true });
  assertDateInfo('yyyy-mm-dd', { year: true, month: true, day: true });
  assertDateInfo('yyyy-mm-ddThh', { year: true, month: true, day: true, hours: true });
  assertDateInfo('yyyy-mm-ddThh:mm', { year: true, month: true, day: true, hours: true, minutes: true });
  assertDateInfo('yyyy-mm-ddThh:mm:ss', { year: true, month: true, day: true, hours: true, minutes: true, seconds: true });
  assertDateInfo('yyyy-mm-ddThh:mm:ss AM/PM', { year: true, month: true, day: true, hours: true, minutes: true, seconds: true, clockType: 12 });

  assertDateInfo('yy dd mm:ss', { year: true, day: true, month: true, seconds: true });

  assertDateInfo('dd', { year: false, month: false, day: true });

  assertDateInfo('yyyy-mm-dd', { year: true, month: true, day: true });
  assertDateInfo('dd-mm-yyyy', { year: true, month: true, day: true });
  assertDateInfo('dd yyyy', { year: true, day: true });
});
