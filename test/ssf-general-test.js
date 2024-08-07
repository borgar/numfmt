// tests converted from SSF
import test from './utils.js';

test('General format', t => {
  t.format('General', 1.234567e-14, '1.23457E-14');
  t.format('General', 1.234567e-13, '1.23457E-13');
  t.format('General', 1.234567e-12, '1.23457E-12');
  t.format('General', 1.234567e-11, '1.23457E-11');
  t.format('General', 1.234567e-10, '1.23457E-10');
  t.format('General', 1.234567e-9, '1.23457E-09');
  t.format('General', 1.234567e-8, '1.23457E-08');
  t.format('General', 1.234567e-7, '1.23457E-07');
  t.format('General', 0.000001234567, '1.23457E-06');
  t.format('General', 0.00001234567, '1.23457E-05');
  t.format('General', 0.0001234567, '0.000123457');
  t.format('General', 0.001234567, '0.001234567');
  t.format('General', 0.01234567, '0.01234567');
  t.format('General', 0.1234567, '0.1234567');
  t.format('General', 1.234567, '1.234567');
  t.format('General', 12.34567, '12.34567');
  t.format('General', 123.4567, '123.4567');
  t.format('General', 1234.567, '1234.567');
  t.format('General', 12345.67, '12345.67');
  t.format('General', 123456.7, '123456.7');
  t.format('General', 1234567, '1234567');
  t.format('General', 12345670, '12345670');
  t.format('General', 123456700, '123456700');
  t.format('General', 1234567000, '1234567000');
  t.format('General', 12345670000, '12345670000');
  t.format('General', 123456700000, '1.23457E+11');
  t.format('General', 1234567000000, '1.23457E+12');
  t.format('General', 12345670000000, '1.23457E+13');
  t.format('General', 123456700000000, '1.23457E+14');
  t.format('General', 1e-14, '1E-14');
  t.format('General', 1e-13, '1E-13');
  t.format('General', 1e-12, '1E-12');
  t.format('General', 1e-11, '1E-11');
  t.format('General', 1e-10, '1E-10');
  t.format('General', 1e-9, '0.000000001');
  t.format('General', 1e-8, '0.00000001');
  t.format('General', 1e-7, '0.0000001');
  t.format('General', 0.000001, '0.000001');
  t.format('General', 0.00001, '0.00001');
  t.format('General', 0.0001, '0.0001');
  t.format('General', 0.001, '0.001');
  t.format('General', 0.01, '0.01');
  t.format('General', 0.1, '0.1');
  t.format('General', 1, '1');
  t.format('General', 10, '10');
  t.format('General', 100, '100');
  t.format('General', 1000, '1000');
  t.format('General', 10000, '10000');
  t.format('General', 100000, '100000');
  t.format('General', 1000000, '1000000');
  t.format('General', 10000000, '10000000');
  t.format('General', 100000000, '100000000');
  t.format('General', 1000000000, '1000000000');
  t.format('General', 10000000000, '10000000000');
  t.format('General', 100000000000, '1E+11');
  t.format('General', 1000000000000, '1E+12');
  t.format('General', 10000000000000, '1E+13');
  t.format('General', 100000000000000, '1E+14');
  t.format('General', 1.2e-14, '1.2E-14');
  t.format('General', 1.2e-13, '1.2E-13');
  t.format('General', 1.2e-12, '1.2E-12');
  t.format('General', 1.2e-11, '1.2E-11');
  t.format('General', 1.2e-10, '1.2E-10');
  t.format('General', 1.2e-9, '1.2E-09');
  t.format('General', 1.2e-8, '0.000000012');
  t.format('General', 1.2e-7, '0.00000012');
  t.format('General', 0.0000012, '0.0000012');
  t.format('General', 0.000012, '0.000012');
  t.format('General', 0.00012, '0.00012');
  t.format('General', 0.0012, '0.0012');
  t.format('General', 0.012, '0.012');
  t.format('General', 0.12, '0.12');
  t.format('General', 1.2, '1.2');
  t.format('General', 12, '12');
  t.format('General', 120, '120');
  t.format('General', 1200, '1200');
  t.format('General', 12000, '12000');
  t.format('General', 120000, '120000');
  t.format('General', 1200000, '1200000');
  t.format('General', 12000000, '12000000');
  t.format('General', 120000000, '120000000');
  t.format('General', 1200000000, '1200000000');
  t.format('General', 12000000000, '12000000000');
  t.format('General', 120000000000, '1.2E+11');
  t.format('General', 1200000000000, '1.2E+12');
  t.format('General', 12000000000000, '1.2E+13');
  t.format('General', 120000000000000, '1.2E+14');
  t.format('General', 1.23e-14, '1.23E-14');
  t.format('General', 1.23e-13, '1.23E-13');
  t.format('General', 1.23e-12, '1.23E-12');
  t.format('General', 1.23e-11, '1.23E-11');
  t.format('General', 1.23e-10, '1.23E-10');
  t.format('General', 1.23e-9, '1.23E-09');
  t.format('General', 1.23e-8, '1.23E-08');
  t.format('General', 1.23e-7, '0.000000123');
  t.format('General', 0.00000123, '0.00000123');
  t.format('General', 0.0000123, '0.0000123');
  t.format('General', 0.000123, '0.000123');
  t.format('General', 0.00123, '0.00123');
  t.format('General', 0.0123, '0.0123');
  t.format('General', 0.123, '0.123');
  t.format('General', 1.23, '1.23');
  t.format('General', 12.3, '12.3');
  t.format('General', 123, '123');
  t.format('General', 1230, '1230');
  t.format('General', 12300, '12300');
  t.format('General', 123000, '123000');
  t.format('General', 1230000, '1230000');
  t.format('General', 12300000, '12300000');
  t.format('General', 123000000, '123000000');
  t.format('General', 1230000000, '1230000000');
  t.format('General', 12300000000, '12300000000');
  t.format('General', 123000000000, '1.23E+11');
  t.format('General', 1230000000000, '1.23E+12');
  t.format('General', 12300000000000, '1.23E+13');
  t.format('General', 123000000000000, '1.23E+14');
  t.format('General', 1.234e-14, '1.234E-14');
  t.format('General', 1.234e-13, '1.234E-13');
  t.format('General', 1.234e-12, '1.234E-12');
  t.format('General', 1.234e-11, '1.234E-11');
  t.format('General', 1.234e-10, '1.234E-10');
  t.format('General', 1.234e-9, '1.234E-09');
  t.format('General', 1.234e-8, '1.234E-08');
  t.format('General', 1.234e-7, '1.234E-07');
  t.format('General', 0.000001234, '0.000001234');
  t.format('General', 0.00001234, '0.00001234');
  t.format('General', 0.0001234, '0.0001234');
  t.format('General', 0.001234, '0.001234');
  t.format('General', 0.01234, '0.01234');
  t.format('General', 0.1234, '0.1234');
  t.format('General', 1.234, '1.234');
  t.format('General', 12.34, '12.34');
  t.format('General', 123.4, '123.4');
  t.format('General', 1234, '1234');
  t.format('General', 12340, '12340');
  t.format('General', 123400, '123400');
  t.format('General', 1234000, '1234000');
  t.format('General', 12340000, '12340000');
  t.format('General', 123400000, '123400000');
  t.format('General', 1234000000, '1234000000');
  t.format('General', 12340000000, '12340000000');
  t.format('General', 123400000000, '1.234E+11');
  t.format('General', 1234000000000, '1.234E+12');
  t.format('General', 12340000000000, '1.234E+13');
  t.format('General', 123400000000000, '1.234E+14');
  t.format('General', 1.2345e-14, '1.2345E-14');
  t.format('General', 1.2345e-13, '1.2345E-13');
  t.format('General', 1.2345e-12, '1.2345E-12');
  t.format('General', 1.2345e-11, '1.2345E-11');
  t.format('General', 1.2345e-10, '1.2345E-10');
  t.format('General', 1.2345e-9, '1.2345E-09');
  t.format('General', 1.2345e-8, '1.2345E-08');
  t.format('General', 1.2345e-7, '1.2345E-07');
  t.format('General', 0.0000012345, '1.2345E-06');
  t.format('General', 0.000012345, '0.000012345');
  t.format('General', 0.00012345, '0.00012345');
  t.format('General', 0.0012345, '0.0012345');
  t.format('General', 0.012345, '0.012345');
  t.format('General', 0.12345, '0.12345');
  t.format('General', 1.2345, '1.2345');
  t.format('General', 12.345, '12.345');
  t.format('General', 123.45, '123.45');
  t.format('General', 1234.5, '1234.5');
  t.format('General', 12345, '12345');
  t.format('General', 123450, '123450');
  t.format('General', 1234500, '1234500');
  t.format('General', 12345000, '12345000');
  t.format('General', 123450000, '123450000');
  t.format('General', 1234500000, '1234500000');
  t.format('General', 12345000000, '12345000000');
  t.format('General', 123450000000, '1.2345E+11');
  t.format('General', 1234500000000, '1.2345E+12');
  t.format('General', 12345000000000, '1.2345E+13');
  t.format('General', 123450000000000, '1.2345E+14');
  t.format('General', 1.23456e-14, '1.23456E-14');
  t.format('General', 1.23456e-13, '1.23456E-13');
  t.format('General', 1.23456e-12, '1.23456E-12');
  t.format('General', 1.23456e-11, '1.23456E-11');
  t.format('General', 1.23456e-10, '1.23456E-10');
  t.format('General', 1.23456e-9, '1.23456E-09');
  t.format('General', 1.23456e-8, '1.23456E-08');
  t.format('General', 1.23456e-7, '1.23456E-07');
  t.format('General', 0.00000123456, '1.23456E-06');
  t.format('General', 0.0000123456, '1.23456E-05');
  t.format('General', 0.000123456, '0.000123456');
  t.format('General', 0.00123456, '0.00123456');
  t.format('General', 0.0123456, '0.0123456');
  t.format('General', 0.123456, '0.123456');
  t.format('General', 1.23456, '1.23456');
  t.format('General', 12.3456, '12.3456');
  t.format('General', 123.456, '123.456');
  t.format('General', 1234.56, '1234.56');
  t.format('General', 12345.6, '12345.6');
  t.format('General', 123456, '123456');
  t.format('General', 1234560, '1234560');
  t.format('General', 12345600, '12345600');
  t.format('General', 123456000, '123456000');
  t.format('General', 1234560000, '1234560000');
  t.format('General', 12345600000, '12345600000');
  t.format('General', 123456000000, '1.23456E+11');
  t.format('General', 1234560000000, '1.23456E+12');
  t.format('General', 12345600000000, '1.23456E+13');
  t.format('General', 123456000000000, '1.23456E+14');
  t.format('General', 1.234567e-14, '1.23457E-14');
  t.format('General', 1.234567e-13, '1.23457E-13');
  t.format('General', 1.234567e-12, '1.23457E-12');
  t.format('General', 1.234567e-11, '1.23457E-11');
  t.format('General', 1.234567e-10, '1.23457E-10');
  t.format('General', 1.234567e-9, '1.23457E-09');
  t.format('General', 1.234567e-8, '1.23457E-08');
  t.format('General', 1.234567e-7, '1.23457E-07');
  t.format('General', 0.000001234567, '1.23457E-06');
  t.format('General', 0.00001234567, '1.23457E-05');
  t.format('General', 0.0001234567, '0.000123457');
  t.format('General', 0.001234567, '0.001234567');
  t.format('General', 0.01234567, '0.01234567');
  t.format('General', 0.1234567, '0.1234567');
  t.format('General', 1.234567, '1.234567');
  t.format('General', 12.34567, '12.34567');
  t.format('General', 123.4567, '123.4567');
  t.format('General', 1234.567, '1234.567');
  t.format('General', 12345.67, '12345.67');
  t.format('General', 123456.7, '123456.7');
  t.format('General', 1234567, '1234567');
  t.format('General', 12345670, '12345670');
  t.format('General', 123456700, '123456700');
  t.format('General', 1234567000, '1234567000');
  t.format('General', 12345670000, '12345670000');
  t.format('General', 123456700000, '1.23457E+11');
  t.format('General', 1234567000000, '1.23457E+12');
  t.format('General', 12345670000000, '1.23457E+13');
  t.format('General', 123456700000000, '1.23457E+14');
  t.format('General', 1.2345678e-14, '1.23457E-14');
  t.format('General', 1.2345678e-13, '1.23457E-13');
  t.format('General', 1.2345678e-12, '1.23457E-12');
  t.format('General', 1.2345678e-11, '1.23457E-11');
  t.format('General', 1.2345678e-10, '1.23457E-10');
  t.format('General', 1.2345678e-9, '1.23457E-09');
  t.format('General', 1.2345678e-8, '1.23457E-08');
  t.format('General', 1.2345678e-7, '1.23457E-07');
  t.format('General', 0.0000012345678, '1.23457E-06');
  t.format('General', 0.000012345678, '1.23457E-05');
  t.format('General', 0.00012345678, '0.000123457');
  t.format('General', 0.0012345678, '0.001234568');
  t.format('General', 0.012345678, '0.012345678');
  t.format('General', 0.12345678, '0.12345678');
  t.format('General', 1.2345678, '1.2345678');
  t.format('General', 12.345678, '12.345678');
  t.format('General', 123.45678, '123.45678');
  t.format('General', 1234.5678, '1234.5678');
  t.format('General', 12345.678, '12345.678');
  t.format('General', 123456.78, '123456.78');
  t.format('General', 1234567.8, '1234567.8');
  t.format('General', 12345678, '12345678');
  t.format('General', 123456780, '123456780');
  t.format('General', 1234567800, '1234567800');
  t.format('General', 12345678000, '12345678000');
  t.format('General', 123456780000, '1.23457E+11');
  t.format('General', 1234567800000, '1.23457E+12');
  t.format('General', 12345678000000, '1.23457E+13');
  t.format('General', 123456780000000, '1.23457E+14');
  t.format('General', 1.23456789e-14, '1.23457E-14');
  t.format('General', 1.23456789e-13, '1.23457E-13');
  t.format('General', 1.23456789e-12, '1.23457E-12');
  t.format('General', 1.23456789e-11, '1.23457E-11');
  t.format('General', 1.23456789e-10, '1.23457E-10');
  t.format('General', 1.23456789e-9, '1.23457E-09');
  t.format('General', 1.23456789e-8, '1.23457E-08');
  t.format('General', 1.23456789e-7, '1.23457E-07');
  t.format('General', 0.00000123456789, '1.23457E-06');
  t.format('General', 0.0000123456789, '1.23457E-05');
  t.format('General', 0.000123456789, '0.000123457');
  t.format('General', 0.00123456789, '0.001234568');
  t.format('General', 0.0123456789, '0.012345679');
  t.format('General', 0.123456789, '0.123456789');
  t.format('General', 1.23456789, '1.23456789');
  t.format('General', 12.3456789, '12.3456789');
  t.format('General', 123.456789, '123.456789');
  t.format('General', 1234.56789, '1234.56789');
  t.format('General', 12345.6789, '12345.6789');
  t.format('General', 123456.789, '123456.789');
  t.format('General', 1234567.89, '1234567.89');
  t.format('General', 12345678.9, '12345678.9');
  t.format('General', 123456789, '123456789');
  t.format('General', 1234567890, '1234567890');
  t.format('General', 12345678900, '12345678900');
  t.format('General', 123456789000, '1.23457E+11');
  t.format('General', 1234567890000, '1.23457E+12');
  t.format('General', 12345678900000, '1.23457E+13');
  t.format('General', 123456789000000, '1.23457E+14');
  t.format('General', 1.234567891e-14, '1.23457E-14');
  t.format('General', 1.234567891e-13, '1.23457E-13');
  t.format('General', 1.234567891e-12, '1.23457E-12');
  t.format('General', 1.234567891e-11, '1.23457E-11');
  t.format('General', 1.234567891e-10, '1.23457E-10');
  t.format('General', 1.234567891e-9, '1.23457E-09');
  t.format('General', 1.234567891e-8, '1.23457E-08');
  t.format('General', 1.234567891e-7, '1.23457E-07');
  t.format('General', 0.000001234567891, '1.23457E-06');
  t.format('General', 0.00001234567891, '1.23457E-05');
  t.format('General', 0.0001234567891, '0.000123457');
  t.format('General', 0.001234567891, '0.001234568');
  t.format('General', 0.01234567891, '0.012345679');
  t.format('General', 0.1234567891, '0.123456789');
  t.format('General', 1.234567891, '1.234567891');
  t.format('General', 12.34567891, '12.34567891');
  t.format('General', 123.4567891, '123.4567891');
  t.format('General', 1234.567891, '1234.567891');
  t.format('General', 12345.67891, '12345.67891');
  t.format('General', 123456.7891, '123456.7891');
  t.format('General', 1234567.891, '1234567.891');
  t.format('General', 12345678.91, '12345678.91');
  t.format('General', 123456789.1, '123456789.1');
  t.format('General', 1234567891, '1234567891');
  t.format('General', 12345678910, '12345678910');
  t.format('General', 123456789100, '1.23457E+11');
  t.format('General', 1234567891000, '1.23457E+12');
  t.format('General', 12345678910000, '1.23457E+13');
  t.format('General', 123456789100000, '1.23457E+14');
  t.format('General', 1.2345678912e-14, '1.23457E-14');
  t.format('General', 1.2345678912e-13, '1.23457E-13');
  t.format('General', 1.2345678912e-12, '1.23457E-12');
  t.format('General', 1.2345678912e-11, '1.23457E-11');
  t.format('General', 1.2345678912e-10, '1.23457E-10');
  t.format('General', 1.2345678912e-9, '1.23457E-09');
  t.format('General', 1.2345678912e-8, '1.23457E-08');
  t.format('General', 1.2345678912e-7, '1.23457E-07');
  t.format('General', 0.0000012345678912, '1.23457E-06');
  t.format('General', 0.000012345678912, '1.23457E-05');
  t.format('General', 0.00012345678912, '0.000123457');
  t.format('General', 0.0012345678912, '0.001234568');
  t.format('General', 0.012345678912, '0.012345679');
  t.format('General', 0.12345678912, '0.123456789');
  t.format('General', 1.2345678912, '1.234567891');
  t.format('General', 12.345678912, '12.34567891');
  t.format('General', 123.45678912, '123.4567891');
  t.format('General', 1234.5678912, '1234.567891');
  t.format('General', 12345.678912, '12345.67891');
  t.format('General', 123456.78912, '123456.7891');
  t.format('General', 1234567.8912, '1234567.891');
  t.format('General', 12345678.912, '12345678.91');
  t.format('General', 123456789.12, '123456789.1');
  t.format('General', 1234567891.2, '1234567891');
  t.format('General', 12345678912, '12345678912');
  t.format('General', 123456789120, '1.23457E+11');
  t.format('General', 1234567891200, '1.23457E+12');
  t.format('General', 12345678912000, '1.23457E+13');
  t.format('General', 123456789120000, '1.23457E+14');
  t.format('General', 1.23456789123e-14, '1.23457E-14');
  t.format('General', 1.23456789123e-13, '1.23457E-13');
  t.format('General', 1.23456789123e-12, '1.23457E-12');
  t.format('General', 1.23456789123e-11, '1.23457E-11');
  t.format('General', 1.23456789123e-10, '1.23457E-10');
  t.format('General', 1.23456789123e-9, '1.23457E-09');
  t.format('General', 1.23456789123e-8, '1.23457E-08');
  t.format('General', 1.23456789123e-7, '1.23457E-07');
  t.format('General', 0.00000123456789123, '1.23457E-06');
  t.format('General', 0.0000123456789123, '1.23457E-05');
  t.format('General', 0.000123456789123, '0.000123457');
  t.format('General', 0.00123456789123, '0.001234568');
  t.format('General', 0.0123456789123, '0.012345679');
  t.format('General', 0.123456789123, '0.123456789');
  t.format('General', 1.23456789123, '1.234567891');
  t.format('General', 12.3456789123, '12.34567891');
  t.format('General', 123.456789123, '123.4567891');
  t.format('General', 1234.56789123, '1234.567891');
  t.format('General', 12345.6789123, '12345.67891');
  t.format('General', 123456.789123, '123456.7891');
  t.format('General', 1234567.89123, '1234567.891');
  t.format('General', 12345678.9123, '12345678.91');
  t.format('General', 123456789.123, '123456789.1');
  t.format('General', 1234567891.23, '1234567891');
  t.format('General', 12345678912.3, '12345678912');
  t.format('General', 123456789123, '1.23457E+11');
  t.format('General', 1234567891230, '1.23457E+12');
  t.format('General', 12345678912300, '1.23457E+13');
  t.format('General', 123456789123000, '1.23457E+14');
  t.format('General', 1.234567891234e-14, '1.23457E-14');
  t.format('General', 1.234567891234e-13, '1.23457E-13');
  t.format('General', 1.234567891234e-12, '1.23457E-12');
  t.format('General', 1.234567891234e-11, '1.23457E-11');
  t.format('General', 1.234567891234e-10, '1.23457E-10');
  t.format('General', 1.234567891234e-9, '1.23457E-09');
  t.format('General', 1.234567891234e-8, '1.23457E-08');
  t.format('General', 1.234567891234e-7, '1.23457E-07');
  t.format('General', 0.000001234567891234, '1.23457E-06');
  t.format('General', 0.00001234567891234, '1.23457E-05');
  t.format('General', 0.0001234567891234, '0.000123457');
  t.format('General', 0.001234567891234, '0.001234568');
  t.format('General', 0.01234567891234, '0.012345679');
  t.format('General', 0.1234567891234, '0.123456789');
  t.format('General', 1.234567891234, '1.234567891');
  t.format('General', 12.34567891234, '12.34567891');
  t.format('General', 123.4567891234, '123.4567891');
  t.format('General', 1234.567891234, '1234.567891');
  t.format('General', 12345.67891234, '12345.67891');
  t.format('General', 123456.7891234, '123456.7891');
  t.format('General', 1234567.891234, '1234567.891');
  t.format('General', 12345678.91234, '12345678.91');
  t.format('General', 123456789.1234, '123456789.1');
  t.format('General', 1234567891.234, '1234567891');
  t.format('General', 12345678912.34, '12345678912');
  t.format('General', 123456789123.4, '1.23457E+11');
  t.format('General', 1234567891234, '1.23457E+12');
  t.format('General', 12345678912340, '1.23457E+13');
  t.format('General', 123456789123400, '1.23457E+14');
  t.format('General', 1.2345678912345e-14, '1.23457E-14');
  t.format('General', 1.2345678912345e-13, '1.23457E-13');
  t.format('General', 1.2345678912345e-12, '1.23457E-12');
  t.format('General', 1.2345678912345e-11, '1.23457E-11');
  t.format('General', 1.2345678912345e-10, '1.23457E-10');
  t.format('General', 1.2345678912345e-9, '1.23457E-09');
  t.format('General', 1.2345678912345e-8, '1.23457E-08');
  t.format('General', 1.2345678912345e-7, '1.23457E-07');
  t.format('General', 0.0000012345678912345, '1.23457E-06');
  t.format('General', 0.000012345678912345, '1.23457E-05');
  t.format('General', 0.00012345678912345, '0.000123457');
  t.format('General', 0.0012345678912345, '0.001234568');
  t.format('General', 0.012345678912345, '0.012345679');
  t.format('General', 0.12345678912345, '0.123456789');
  t.format('General', 1.2345678912345, '1.234567891');
  t.format('General', 12.345678912345, '12.34567891');
  t.format('General', 123.45678912345, '123.4567891');
  t.format('General', 1234.5678912345, '1234.567891');
  t.format('General', 12345.678912345, '12345.67891');
  t.format('General', 123456.78912345, '123456.7891');
  t.format('General', 1234567.8912345, '1234567.891');
  t.format('General', 12345678.912345, '12345678.91');
  t.format('General', 123456789.12345, '123456789.1');
  t.format('General', 1234567891.2345, '1234567891');
  t.format('General', 12345678912.345, '12345678912');
  t.format('General', 123456789123.45, '1.23457E+11');
  t.format('General', 1234567891234.5, '1.23457E+12');
  t.format('General', 12345678912345, '1.23457E+13');
  t.format('General', 123456789123450, '1.23457E+14');
  t.format('General', 1.23456789123456e-14, '1.23457E-14');
  t.format('General', 1.23456789123456e-13, '1.23457E-13');
  t.format('General', 1.23456789123456e-12, '1.23457E-12');
  t.format('General', 1.23456789123456e-11, '1.23457E-11');
  t.format('General', 1.23456789123456e-10, '1.23457E-10');
  t.format('General', 1.23456789123456e-9, '1.23457E-09');
  t.format('General', 1.23456789123456e-8, '1.23457E-08');
  t.format('General', 1.23456789123456e-7, '1.23457E-07');
  t.format('General', 0.00000123456789123456, '1.23457E-06');
  t.format('General', 0.0000123456789123456, '1.23457E-05');
  t.format('General', 0.000123456789123456, '0.000123457');
  t.format('General', 0.00123456789123456, '0.001234568');
  t.format('General', 0.0123456789123456, '0.012345679');
  t.format('General', 0.123456789123456, '0.123456789');
  t.format('General', 1.23456789123456, '1.234567891');
  t.format('General', 12.3456789123456, '12.34567891');
  t.format('General', 123.456789123456, '123.4567891');
  t.format('General', 1234.56789123456, '1234.567891');
  t.format('General', 12345.6789123456, '12345.67891');
  t.format('General', 123456.789123456, '123456.7891');
  t.format('General', 1234567.89123456, '1234567.891');
  t.format('General', 12345678.9123456, '12345678.91');
  t.format('General', 123456789.123456, '123456789.1');
  t.format('General', 1234567891.23456, '1234567891');
  t.format('General', 12345678912.3456, '12345678912');
  t.format('General', 123456789123.456, '1.23457E+11');
  t.format('General', 1234567891234.56, '1.23457E+12');
  t.format('General', 12345678912345.6, '1.23457E+13');
  t.format('General', 123456789123456, '1.23457E+14');
  t.format('General', -1.234567e-14, '-1.23457E-14');
  t.format('General', -1.234567e-13, '-1.23457E-13');
  t.format('General', -1.234567e-12, '-1.23457E-12');
  t.format('General', -1.234567e-11, '-1.23457E-11');
  t.format('General', -1.234567e-10, '-1.23457E-10');
  t.format('General', -1.234567e-9, '-1.23457E-09');
  t.format('General', -1.234567e-8, '-1.23457E-08');
  t.format('General', -1.234567e-7, '-1.23457E-07');
  t.format('General', -0.000001234567, '-1.23457E-06');
  t.format('General', -0.00001234567, '-1.23457E-05');
  t.format('General', -0.0001234567, '-0.000123457');
  t.format('General', -0.001234567, '-0.001234567');
  t.format('General', -0.01234567, '-0.01234567');
  t.format('General', -0.1234567, '-0.1234567');
  t.format('General', -1.234567, '-1.234567');
  t.format('General', -12.34567, '-12.34567');
  t.format('General', -123.4567, '-123.4567');
  t.format('General', -1234.567, '-1234.567');
  t.format('General', -12345.67, '-12345.67');
  t.format('General', -123456.7, '-123456.7');
  t.format('General', -1234567, '-1234567');
  t.format('General', -12345670, '-12345670');
  t.format('General', -123456700, '-123456700');
  t.format('General', -1234567000, '-1234567000');
  t.format('General', -12345670000, '-12345670000');
  t.format('General', -123456700000, '-1.23457E+11');
  t.format('General', -1234567000000, '-1.23457E+12');
  t.format('General', -12345670000000, '-1.23457E+13');
  t.format('General', -123456700000000, '-1.23457E+14');
  t.format('General', true, 'TRUE');
  t.format('General', false, 'FALSE');
  t.format('General', 'sheetjs', 'sheetjs');
  // eslint-disable-next-line no-undefined
  t.format('General', undefined, '');
  t.format('General', null, '');
  t.end();
});

test('No decimal point', t => {
  t.format('General', 0.9999999999999999, '1');
  t.format('General', 0.999999999999999, '1');
  t.format('General', 0.99999999999999, '1');
  t.format('General', 0.9999999999999, '1');
  t.format('General', 0.999999999999, '1');
  t.format('General', 0.99999999999, '1');
  t.format('General', 0.9999999999, '1'); // Sheets emits "0.9999999999" here which is not by spec
  t.format('General', 0.999999999, '0.999999999'); // Excel yeilds a "1" here, but this is not by spec
  t.format('General', 0.99999999, '0.99999999');
  t.format('General', 0.9999999, '0.9999999');
  t.format('General', 0.999999, '0.999999');
  t.end();
});
