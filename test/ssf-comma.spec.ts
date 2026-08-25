// tests converted from SSF
import { expect, test } from 'vitest';
import { format } from '../lib/index.js';

test('Exponential: #.0000,,,', () => {
  expect(format('#.0000,,,', 0.99)).toBe('.0000');
  expect(format('#.0000,,,', 1.2345)).toBe('.0000');
  expect(format('#.0000,,,', 12.345)).toBe('.0000');
  expect(format('#.0000,,,', 123.456)).toBe('.0000');
  expect(format('#.0000,,,', 1234)).toBe('.0000');
  expect(format('#.0000,,,', 12345)).toBe('.0000');
  expect(format('#.0000,,,', 123456)).toBe('.0001');
  expect(format('#.0000,,,', 1234567)).toBe('.0012');
  expect(format('#.0000,,,', 12345678)).toBe('.0123');
  expect(format('#.0000,,,', 123456789)).toBe('.1235');
  expect(format('#.0000,,,', 1234567890)).toBe('1.2346');
  expect(format('#.0000,,,', 12345678901)).toBe('12.3457');
  expect(format('#.0000,,,', 123456789012)).toBe('123.4568');
  expect(format('#.0000,,,', 4321)).toBe('.0000');
  expect(format('#.0000,,,', 4321234)).toBe('.0043');
});

test('Exponential: #.0000,,', () => {
  expect(format('#.0000,,', 0.99)).toBe('.0000');
  expect(format('#.0000,,', 1.2345)).toBe('.0000');
  expect(format('#.0000,,', 12.345)).toBe('.0000');
  expect(format('#.0000,,', 123.456)).toBe('.0001');
  expect(format('#.0000,,', 1234)).toBe('.0012');
  expect(format('#.0000,,', 12345)).toBe('.0123');
  expect(format('#.0000,,', 123456)).toBe('.1235');
  expect(format('#.0000,,', 1234567)).toBe('1.2346');
  expect(format('#.0000,,', 12345678)).toBe('12.3457');
  expect(format('#.0000,,', 123456789)).toBe('123.4568');
  expect(format('#.0000,,', 1234567890)).toBe('1234.5679');
  expect(format('#.0000,,', 12345678901)).toBe('12345.6789');
  expect(format('#.0000,,', 123456789012)).toBe('123456.7890');
  expect(format('#.0000,,', 4321)).toBe('.0043');
  expect(format('#.0000,,', 4321234)).toBe('4.3212');
});

test('Exponential: #.0000,', () => {
  expect(format('#.0000,', 0.99)).toBe('.0010');
  expect(format('#.0000,', 1.2345)).toBe('.0012');
  expect(format('#.0000,', 12.345)).toBe('.0123');
  expect(format('#.0000,', 123.456)).toBe('.1235');
  expect(format('#.0000,', 1234)).toBe('1.2340');
  expect(format('#.0000,', 12345)).toBe('12.3450');
  expect(format('#.0000,', 123456)).toBe('123.4560');
  expect(format('#.0000,', 1234567)).toBe('1234.5670');
  expect(format('#.0000,', 12345678)).toBe('12345.6780');
  expect(format('#.0000,', 123456789)).toBe('123456.7890');
  expect(format('#.0000,', 1234567890)).toBe('1234567.8900');
  expect(format('#.0000,', 12345678901)).toBe('12345678.9010');
  expect(format('#.0000,', 123456789012)).toBe('123456789.0120');
  expect(format('#.0000,', 4321)).toBe('4.3210');
  expect(format('#.0000,', 4321234)).toBe('4321.2340');
});

test('Exponential: #,##0.0', () => {
  expect(format('#,##0.0', 0.99)).toBe('1.0');
  expect(format('#,##0.0', 1.2345)).toBe('1.2');
  expect(format('#,##0.0', 12.345)).toBe('12.3');
  expect(format('#,##0.0', 123.456)).toBe('123.5');
  expect(format('#,##0.0', 1234)).toBe('1,234.0');
  expect(format('#,##0.0', 12345)).toBe('12,345.0');
  expect(format('#,##0.0', 123456)).toBe('123,456.0');
  expect(format('#,##0.0', 1234567)).toBe('1,234,567.0');
  expect(format('#,##0.0', 12345678)).toBe('12,345,678.0');
  expect(format('#,##0.0', 123456789)).toBe('123,456,789.0');
  expect(format('#,##0.0', 1234567890)).toBe('1,234,567,890.0');
  expect(format('#,##0.0', 12345678901)).toBe('12,345,678,901.0');
  expect(format('#,##0.0', 123456789012)).toBe('123,456,789,012.0');
  expect(format('#,##0.0', 4321)).toBe('4,321.0');
  expect(format('#,##0.0', 4321234)).toBe('4,321,234.0');
});

test('Exponential: ###,##0', () => {
  expect(format('###,##0', 0.99)).toBe('1');
  expect(format('###,##0', 1.2345)).toBe('1');
  expect(format('###,##0', 12.345)).toBe('12');
  expect(format('###,##0', 123.456)).toBe('123');
  expect(format('###,##0', 1234)).toBe('1,234');
  expect(format('###,##0', 12345)).toBe('12,345');
  expect(format('###,##0', 123456)).toBe('123,456');
  expect(format('###,##0', 1234567)).toBe('1,234,567');
  expect(format('###,##0', 12345678)).toBe('12,345,678');
  expect(format('###,##0', 123456789)).toBe('123,456,789');
  expect(format('###,##0', 1234567890)).toBe('1,234,567,890');
  expect(format('###,##0', 12345678901)).toBe('12,345,678,901');
  expect(format('###,##0', 123456789012)).toBe('123,456,789,012');
  expect(format('###,##0', 4321)).toBe('4,321');
  expect(format('###,##0', 4321234)).toBe('4,321,234');
});

test('Exponential: ###,###', () => {
  expect(format('###,###', 0.99)).toBe('1');
  expect(format('###,###', 1.2345)).toBe('1');
  expect(format('###,###', 12.345)).toBe('12');
  expect(format('###,###', 123.456)).toBe('123');
  expect(format('###,###', 1234)).toBe('1,234');
  expect(format('###,###', 12345)).toBe('12,345');
  expect(format('###,###', 123456)).toBe('123,456');
  expect(format('###,###', 1234567)).toBe('1,234,567');
  expect(format('###,###', 12345678)).toBe('12,345,678');
  expect(format('###,###', 123456789)).toBe('123,456,789');
  expect(format('###,###', 1234567890)).toBe('1,234,567,890');
  expect(format('###,###', 12345678901)).toBe('12,345,678,901');
  expect(format('###,###', 123456789012)).toBe('123,456,789,012');
  expect(format('###,###', 4321)).toBe('4,321');
  expect(format('###,###', 4321234)).toBe('4,321,234');
});

test('Exponential: #,###.00', () => {
  expect(format('#,###.00', 0.99)).toBe('.99');
  expect(format('#,###.00', 1.2345)).toBe('1.23');
  expect(format('#,###.00', 12.345)).toBe('12.35');
  expect(format('#,###.00', 123.456)).toBe('123.46');
  expect(format('#,###.00', 1234)).toBe('1,234.00');
  expect(format('#,###.00', 12345)).toBe('12,345.00');
  expect(format('#,###.00', 123456)).toBe('123,456.00');
  expect(format('#,###.00', 1234567)).toBe('1,234,567.00');
  expect(format('#,###.00', 12345678)).toBe('12,345,678.00');
  expect(format('#,###.00', 123456789)).toBe('123,456,789.00');
  expect(format('#,###.00', 1234567890)).toBe('1,234,567,890.00');
  expect(format('#,###.00', 12345678901)).toBe('12,345,678,901.00');
  expect(format('#,###.00', 123456789012)).toBe('123,456,789,012.00');
  expect(format('#,###.00', 4321)).toBe('4,321.00');
  expect(format('#,###.00', 4321234)).toBe('4,321,234.00');
});
