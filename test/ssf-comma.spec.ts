// tests converted from SSF
import { test, expect } from 'vitest';
import { assertFormat } from './utils.ts';

test('Exponential: #.0000,,,', () => {
  expect.assertions(15);
  assertFormat('#.0000,,,', 0.99, '.0000');
  assertFormat('#.0000,,,', 1.2345, '.0000');
  assertFormat('#.0000,,,', 12.345, '.0000');
  assertFormat('#.0000,,,', 123.456, '.0000');
  assertFormat('#.0000,,,', 1234, '.0000');
  assertFormat('#.0000,,,', 12345, '.0000');
  assertFormat('#.0000,,,', 123456, '.0001');
  assertFormat('#.0000,,,', 1234567, '.0012');
  assertFormat('#.0000,,,', 12345678, '.0123');
  assertFormat('#.0000,,,', 123456789, '.1235');
  assertFormat('#.0000,,,', 1234567890, '1.2346');
  assertFormat('#.0000,,,', 12345678901, '12.3457');
  assertFormat('#.0000,,,', 123456789012, '123.4568');
  assertFormat('#.0000,,,', 4321, '.0000');
  assertFormat('#.0000,,,', 4321234, '.0043');
});

test('Exponential: #.0000,,', () => {
  expect.assertions(15);
  assertFormat('#.0000,,', 0.99, '.0000');
  assertFormat('#.0000,,', 1.2345, '.0000');
  assertFormat('#.0000,,', 12.345, '.0000');
  assertFormat('#.0000,,', 123.456, '.0001');
  assertFormat('#.0000,,', 1234, '.0012');
  assertFormat('#.0000,,', 12345, '.0123');
  assertFormat('#.0000,,', 123456, '.1235');
  assertFormat('#.0000,,', 1234567, '1.2346');
  assertFormat('#.0000,,', 12345678, '12.3457');
  assertFormat('#.0000,,', 123456789, '123.4568');
  assertFormat('#.0000,,', 1234567890, '1234.5679');
  assertFormat('#.0000,,', 12345678901, '12345.6789');
  assertFormat('#.0000,,', 123456789012, '123456.7890');
  assertFormat('#.0000,,', 4321, '.0043');
  assertFormat('#.0000,,', 4321234, '4.3212');
});

test('Exponential: #.0000,', () => {
  expect.assertions(15);
  assertFormat('#.0000,', 0.99, '.0010');
  assertFormat('#.0000,', 1.2345, '.0012');
  assertFormat('#.0000,', 12.345, '.0123');
  assertFormat('#.0000,', 123.456, '.1235');
  assertFormat('#.0000,', 1234, '1.2340');
  assertFormat('#.0000,', 12345, '12.3450');
  assertFormat('#.0000,', 123456, '123.4560');
  assertFormat('#.0000,', 1234567, '1234.5670');
  assertFormat('#.0000,', 12345678, '12345.6780');
  assertFormat('#.0000,', 123456789, '123456.7890');
  assertFormat('#.0000,', 1234567890, '1234567.8900');
  assertFormat('#.0000,', 12345678901, '12345678.9010');
  assertFormat('#.0000,', 123456789012, '123456789.0120');
  assertFormat('#.0000,', 4321, '4.3210');
  assertFormat('#.0000,', 4321234, '4321.2340');
});

test('Exponential: #,##0.0', () => {
  expect.assertions(15);
  assertFormat('#,##0.0', 0.99, '1.0');
  assertFormat('#,##0.0', 1.2345, '1.2');
  assertFormat('#,##0.0', 12.345, '12.3');
  assertFormat('#,##0.0', 123.456, '123.5');
  assertFormat('#,##0.0', 1234, '1,234.0');
  assertFormat('#,##0.0', 12345, '12,345.0');
  assertFormat('#,##0.0', 123456, '123,456.0');
  assertFormat('#,##0.0', 1234567, '1,234,567.0');
  assertFormat('#,##0.0', 12345678, '12,345,678.0');
  assertFormat('#,##0.0', 123456789, '123,456,789.0');
  assertFormat('#,##0.0', 1234567890, '1,234,567,890.0');
  assertFormat('#,##0.0', 12345678901, '12,345,678,901.0');
  assertFormat('#,##0.0', 123456789012, '123,456,789,012.0');
  assertFormat('#,##0.0', 4321, '4,321.0');
  assertFormat('#,##0.0', 4321234, '4,321,234.0');
});

test('Exponential: ###,##0', () => {
  expect.assertions(15);
  assertFormat('###,##0', 0.99, '1');
  assertFormat('###,##0', 1.2345, '1');
  assertFormat('###,##0', 12.345, '12');
  assertFormat('###,##0', 123.456, '123');
  assertFormat('###,##0', 1234, '1,234');
  assertFormat('###,##0', 12345, '12,345');
  assertFormat('###,##0', 123456, '123,456');
  assertFormat('###,##0', 1234567, '1,234,567');
  assertFormat('###,##0', 12345678, '12,345,678');
  assertFormat('###,##0', 123456789, '123,456,789');
  assertFormat('###,##0', 1234567890, '1,234,567,890');
  assertFormat('###,##0', 12345678901, '12,345,678,901');
  assertFormat('###,##0', 123456789012, '123,456,789,012');
  assertFormat('###,##0', 4321, '4,321');
  assertFormat('###,##0', 4321234, '4,321,234');
});

test('Exponential: ###,###', () => {
  expect.assertions(15);
  assertFormat('###,###', 0.99, '1');
  assertFormat('###,###', 1.2345, '1');
  assertFormat('###,###', 12.345, '12');
  assertFormat('###,###', 123.456, '123');
  assertFormat('###,###', 1234, '1,234');
  assertFormat('###,###', 12345, '12,345');
  assertFormat('###,###', 123456, '123,456');
  assertFormat('###,###', 1234567, '1,234,567');
  assertFormat('###,###', 12345678, '12,345,678');
  assertFormat('###,###', 123456789, '123,456,789');
  assertFormat('###,###', 1234567890, '1,234,567,890');
  assertFormat('###,###', 12345678901, '12,345,678,901');
  assertFormat('###,###', 123456789012, '123,456,789,012');
  assertFormat('###,###', 4321, '4,321');
  assertFormat('###,###', 4321234, '4,321,234');
});

test('Exponential: #,###.00', () => {
  expect.assertions(15);
  assertFormat('#,###.00', 0.99, '.99');
  assertFormat('#,###.00', 1.2345, '1.23');
  assertFormat('#,###.00', 12.345, '12.35');
  assertFormat('#,###.00', 123.456, '123.46');
  assertFormat('#,###.00', 1234, '1,234.00');
  assertFormat('#,###.00', 12345, '12,345.00');
  assertFormat('#,###.00', 123456, '123,456.00');
  assertFormat('#,###.00', 1234567, '1,234,567.00');
  assertFormat('#,###.00', 12345678, '12,345,678.00');
  assertFormat('#,###.00', 123456789, '123,456,789.00');
  assertFormat('#,###.00', 1234567890, '1,234,567,890.00');
  assertFormat('#,###.00', 12345678901, '12,345,678,901.00');
  assertFormat('#,###.00', 123456789012, '123,456,789,012.00');
  assertFormat('#,###.00', 4321, '4,321.00');
  assertFormat('#,###.00', 4321234, '4,321,234.00');
});
