// tests converted from SSF
import test from './utils.js';

test('Exponential: #0.0E+0', t => {
  t.format('#0.0E+0', 1.23457E-13, '12.3E-14');
  t.format('#0.0E+0', 1.23457E-12, '1.2E-12');
  t.format('#0.0E+0', 1.23457E-11, '12.3E-12');
  t.format('#0.0E+0', 1.23457E-10, '1.2E-10');
  t.format('#0.0E+0', 1.23457E-09, '12.3E-10');
  t.format('#0.0E+0', 1.23457E-08, '1.2E-8');
  t.format('#0.0E+0', 0.000000123457, '12.3E-8');
  t.format('#0.0E+0', 0.00000123457, '1.2E-6');
  t.format('#0.0E+0', 0.0000123457, '12.3E-6');
  t.format('#0.0E+0', 0.000123457, '1.2E-4');
  t.format('#0.0E+0', 0.001234568, '12.3E-4');
  t.format('#0.0E+0', 0.012345679, '1.2E-2');
  t.format('#0.0E+0', 0.123456789, '12.3E-2');
  t.format('#0.0E+0', 1.23456789, '1.2E+0');
  t.format('#0.0E+0', 12.3456789, '12.3E+0');
  t.format('#0.0E+0', 123.456789, '1.2E+2');
  t.format('#0.0E+0', 1234.56789, '12.3E+2');
  t.format('#0.0E+0', 12345.6789, '1.2E+4');
  t.format('#0.0E+0', 123456.789, '12.3E+4');
  t.format('#0.0E+0', 1234567.89, '1.2E+6');
  t.format('#0.0E+0', 12345678.9, '12.3E+6');
  t.format('#0.0E+0', 123456789, '1.2E+8');
  t.format('#0.0E+0', 1234567890, '12.3E+8');
  t.format('#0.0E+0', 12345678900, '1.2E+10');
  t.format('#0.0E+0', 123456789000, '12.3E+10');
  t.format('#0.0E+0', 1234567890000, '1.2E+12');
  t.format('#0.0E+0', 12345678900000, '12.3E+12');
  t.format('#0.0E+0', 123456789000000, '1.2E+14');
  t.format('#0.0E+0', 1234567890000000, '12.3E+14');
  t.format('#0.0E+0', 12345678900000000, '1.2E+16');
  t.format('#0.0E+0', 123456789000000000, '12.3E+16');
  t.format('#0.0E+0', 1234567890000000000, '1.2E+18');
  t.format('#0.0E+0', 12345678900000000000, '12.3E+18');
  t.format('#0.0E+0', 123456789000000000000, '1.2E+20');
  t.format('#0.0E+0', 1234567890000000000000, '12.3E+20');
  t.format('#0.0E+0', 12345678900000000000000, '1.2E+22');
  t.format('#0.0E+0', 123456789000000000000000, '12.3E+22');
  t.format('#0.0E+0', 1234567890000000000000000, '1.2E+24');
  t.format('#0.0E+0', 12345678900000000000000000, '12.3E+24');
  t.format('#0.0E+0', 123456789000000000000000000, '1.2E+26');
  t.format('#0.0E+0', 1234567890000000000000000000, '12.3E+26');
  t.format('#0.0E+0', 12345678900000000000000000000, '1.2E+28');
  t.format('#0.0E+0', 123456789000000000000000000000, '12.3E+28');
  t.format('#0.0E+0', 1234567890000000000000000000000, '1.2E+30');
  t.format('#0.0E+0', 12345678900000000000000000000000, '12.3E+30');
  t.end();
});

test('Exponential: ##0.0E+0', t => {
  t.format('##0.0E+0', 1.23457E-13, '123.5E-15');
  t.format('##0.0E+0', 1.23457E-12, '1.2E-12');
  t.format('##0.0E+0', 1.23457E-11, '12.3E-12');
  t.format('##0.0E+0', 1.23457E-10, '123.5E-12');
  t.format('##0.0E+0', 1.23457E-09, '1.2E-9');
  t.format('##0.0E+0', 1.23457E-08, '12.3E-9');
  t.format('##0.0E+0', 0.000000123457, '123.5E-9');
  t.format('##0.0E+0', 0.00000123457, '1.2E-6');
  t.format('##0.0E+0', 0.0000123457, '12.3E-6');
  t.format('##0.0E+0', 0.000123457, '123.5E-6');
  t.format('##0.0E+0', 0.001234568, '1.2E-3');
  t.format('##0.0E+0', 0.012345679, '12.3E-3');
  t.format('##0.0E+0', 0.123456789, '123.5E-3');
  t.format('##0.0E+0', 1.23456789, '1.2E+0');
  t.format('##0.0E+0', 12.3456789, '12.3E+0');
  t.format('##0.0E+0', 123.456789, '123.5E+0');
  t.format('##0.0E+0', 1234.56789, '1.2E+3');
  t.format('##0.0E+0', 12345.6789, '12.3E+3');
  t.format('##0.0E+0', 123456.789, '123.5E+3');
  t.format('##0.0E+0', 1234567.89, '1.2E+6');
  t.format('##0.0E+0', 12345678.9, '12.3E+6');
  t.format('##0.0E+0', 123456789, '123.5E+6');
  t.format('##0.0E+0', 1234567890, '1.2E+9');
  t.format('##0.0E+0', 12345678900, '12.3E+9');
  t.format('##0.0E+0', 123456789000, '123.5E+9');
  t.format('##0.0E+0', 1234567890000, '1.2E+12');
  t.format('##0.0E+0', 12345678900000, '12.3E+12');
  t.format('##0.0E+0', 123456789000000, '123.5E+12');
  t.format('##0.0E+0', 1234567890000000, '1.2E+15');
  t.format('##0.0E+0', 12345678900000000, '12.3E+15');
  t.format('##0.0E+0', 123456789000000000, '123.5E+15');
  t.format('##0.0E+0', 1234567890000000000, '1.2E+18');
  t.format('##0.0E+0', 12345678900000000000, '12.3E+18');
  t.format('##0.0E+0', 123456789000000000000, '123.5E+18');
  t.format('##0.0E+0', 1234567890000000000000, '1.2E+21');
  t.format('##0.0E+0', 12345678900000000000000, '12.3E+21');
  t.format('##0.0E+0', 123456789000000000000000, '123.5E+21');
  t.format('##0.0E+0', 1234567890000000000000000, '1.2E+24');
  t.format('##0.0E+0', 12345678900000000000000000, '12.3E+24');
  t.format('##0.0E+0', 123456789000000000000000000, '123.5E+24');
  t.format('##0.0E+0', 1234567890000000000000000000, '1.2E+27');
  t.format('##0.0E+0', 12345678900000000000000000000, '12.3E+27');
  t.format('##0.0E+0', 123456789000000000000000000000, '123.5E+27');
  t.format('##0.0E+0', 1234567890000000000000000000000, '1.2E+30');
  t.format('##0.0E+0', 12345678900000000000000000000000, '12.3E+30');
  t.end();
});

test('Exponential: ###0.0E+0', t => {
  t.format('###0.0E+0', 1.23457E-13, '1234.6E-16');
  t.format('###0.0E+0', 1.23457E-12, '1.2E-12');
  t.format('###0.0E+0', 1.23457E-11, '12.3E-12');
  t.format('###0.0E+0', 1.23457E-10, '123.5E-12');
  t.format('###0.0E+0', 1.23457E-09, '1234.6E-12');
  t.format('###0.0E+0', 1.23457E-08, '1.2E-8');
  t.format('###0.0E+0', 0.000000123457, '12.3E-8');
  t.format('###0.0E+0', 0.00000123457, '123.5E-8');
  t.format('###0.0E+0', 0.0000123457, '1234.6E-8');
  t.format('###0.0E+0', 0.000123457, '1.2E-4');
  t.format('###0.0E+0', 0.001234568, '12.3E-4');
  t.format('###0.0E+0', 0.012345679, '123.5E-4');
  t.format('###0.0E+0', 0.123456789, '1234.6E-4');
  t.format('###0.0E+0', 1.23456789, '1.2E+0');
  t.format('###0.0E+0', 12.3456789, '12.3E+0');
  t.format('###0.0E+0', 123.456789, '123.5E+0');
  t.format('###0.0E+0', 1234.56789, '1234.6E+0');
  t.format('###0.0E+0', 12345.6789, '1.2E+4');
  t.format('###0.0E+0', 123456.789, '12.3E+4');
  t.format('###0.0E+0', 1234567.89, '123.5E+4');
  t.format('###0.0E+0', 12345678.9, '1234.6E+4');
  t.format('###0.0E+0', 123456789, '1.2E+8');
  t.format('###0.0E+0', 1234567890, '12.3E+8');
  t.format('###0.0E+0', 12345678900, '123.5E+8');
  t.format('###0.0E+0', 123456789000, '1234.6E+8');
  t.format('###0.0E+0', 1234567890000, '1.2E+12');
  t.format('###0.0E+0', 12345678900000, '12.3E+12');
  t.format('###0.0E+0', 123456789000000, '123.5E+12');
  t.format('###0.0E+0', 1234567890000000, '1234.6E+12');
  t.format('###0.0E+0', 12345678900000000, '1.2E+16');
  t.format('###0.0E+0', 123456789000000000, '12.3E+16');
  t.format('###0.0E+0', 1234567890000000000, '123.5E+16');
  t.format('###0.0E+0', 12345678900000000000, '1234.6E+16');
  t.format('###0.0E+0', 123456789000000000000, '1.2E+20');
  t.format('###0.0E+0', 1234567890000000000000, '12.3E+20');
  t.format('###0.0E+0', 12345678900000000000000, '123.5E+20');
  t.format('###0.0E+0', 123456789000000000000000, '1234.6E+20');
  t.format('###0.0E+0', 1234567890000000000000000, '1.2E+24');
  t.format('###0.0E+0', 12345678900000000000000000, '12.3E+24');
  t.format('###0.0E+0', 123456789000000000000000000, '123.5E+24');
  t.format('###0.0E+0', 1234567890000000000000000000, '1234.6E+24');
  t.format('###0.0E+0', 12345678900000000000000000000, '1.2E+28');
  t.format('###0.0E+0', 123456789000000000000000000000, '12.3E+28');
  t.format('###0.0E+0', 1234567890000000000000000000000, '123.5E+28');
  t.format('###0.0E+0', 12345678900000000000000000000000, '1234.6E+28');
  t.end();
});

test('Exponential: ####0.0E+0', t => {
  t.format('####0.0E+0', 1.23457E-13, '123.5E-15');
  t.format('####0.0E+0', 1.23457E-12, '1234.6E-15');
  t.format('####0.0E+0', 1.23457E-11, '12345.7E-15');
  t.format('####0.0E+0', 1.23457E-10, '1.2E-10');
  t.format('####0.0E+0', 1.23457E-09, '12.3E-10');
  t.format('####0.0E+0', 1.23457E-08, '123.5E-10');
  t.format('####0.0E+0', 0.000000123457, '1234.6E-10');
  t.format('####0.0E+0', 0.00000123457, '12345.7E-10');
  t.format('####0.0E+0', 0.0000123457, '1.2E-5');
  t.format('####0.0E+0', 0.000123457, '12.3E-5');
  t.format('####0.0E+0', 0.001234568, '123.5E-5');
  t.format('####0.0E+0', 0.012345679, '1234.6E-5');
  t.format('####0.0E+0', 0.123456789, '12345.7E-5');
  t.format('####0.0E+0', 1.23456789, '1.2E+0');
  t.format('####0.0E+0', 12.3456789, '12.3E+0');
  t.format('####0.0E+0', 123.456789, '123.5E+0');
  t.format('####0.0E+0', 1234.56789, '1234.6E+0');
  t.format('####0.0E+0', 12345.6789, '12345.7E+0');
  t.format('####0.0E+0', 123456.789, '1.2E+5');
  t.format('####0.0E+0', 1234567.89, '12.3E+5');
  t.format('####0.0E+0', 12345678.9, '123.5E+5');
  t.format('####0.0E+0', 123456789, '1234.6E+5');
  t.format('####0.0E+0', 1234567890, '12345.7E+5');
  t.format('####0.0E+0', 12345678900, '1.2E+10');
  t.format('####0.0E+0', 123456789000, '12.3E+10');
  t.format('####0.0E+0', 1234567890000, '123.5E+10');
  t.format('####0.0E+0', 12345678900000, '1234.6E+10');
  t.format('####0.0E+0', 123456789000000, '12345.7E+10');
  t.format('####0.0E+0', 1234567890000000, '1.2E+15');
  t.format('####0.0E+0', 12345678900000000, '12.3E+15');
  t.format('####0.0E+0', 123456789000000000, '123.5E+15');
  t.format('####0.0E+0', 1234567890000000000, '1234.6E+15');
  t.format('####0.0E+0', 12345678900000000000, '12345.7E+15');
  t.format('####0.0E+0', 123456789000000000000, '1.2E+20');
  t.format('####0.0E+0', 1234567890000000000000, '12.3E+20');
  t.format('####0.0E+0', 12345678900000000000000, '123.5E+20');
  t.format('####0.0E+0', 123456789000000000000000, '1234.6E+20');
  t.format('####0.0E+0', 1234567890000000000000000, '12345.7E+20');
  t.format('####0.0E+0', 12345678900000000000000000, '1.2E+25');
  t.format('####0.0E+0', 123456789000000000000000000, '12.3E+25');
  t.format('####0.0E+0', 1234567890000000000000000000, '123.5E+25');
  t.format('####0.0E+0', 12345678900000000000000000000, '1234.6E+25');
  t.format('####0.0E+0', 123456789000000000000000000000, '12345.7E+25');
  t.format('####0.0E+0', 1234567890000000000000000000000, '1.2E+30');
  t.format('####0.0E+0', 12345678900000000000000000000000, '12.3E+30');
  t.end();
});
