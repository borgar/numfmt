import { describe, expect, test } from 'vitest';
import { format } from '../lib/index.ts';

const MAGICDATE = 3290.1278435;

describe('-x-sysdate/-x-systime', () => {
  test('ar-SA', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'ar-SA' })).toBe('02/يناير/1909');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'ar-SA' })).toBe('03:04:06 ص');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'ar-SA' })).toBe('02/يناير/1909');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'ar-SA' })).toBe('03:04:06 ص');
  });
  test('az-AZ', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'az-AZ' })).toBe('2 yanvar 1909, şənbə');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'az-AZ' })).toBe('03:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'az-AZ' })).toBe('2 yanvar 1909, şənbə');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'az-AZ' })).toBe('03:04:06');
  });
  test('be-BY', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'be-BY' })).toBe('2 студзень 1909');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'be-BY' })).toBe('03:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'be-BY' })).toBe('2 студзень 1909');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'be-BY' })).toBe('03:04:06');
  });
  test('bg-BG', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'bg-BG' })).toBe('02 януари 1909 г.');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'bg-BG' })).toBe('3:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'bg-BG' })).toBe('02 януари 1909 г.');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'bg-BG' })).toBe('3:04:06');
  });
  test('bn-IN', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'bn-IN' })).toBe('02 জানুয়ারী 1909');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'bn-IN' })).toBe('03.04.06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'bn-IN' })).toBe('02 জানুয়ারী 1909');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'bn-IN' })).toBe('03.04.06');
  });
  test('ca-ES', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'ca-ES' })).toBe('dissabte, 2 gener de 1909');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'ca-ES' })).toBe('3:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'ca-ES' })).toBe('dissabte, 2 gener de 1909');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'ca-ES' })).toBe('3:04:06');
  });
  test('cs-CZ', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'cs-CZ' })).toBe('sobota 2. leden 1909');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'cs-CZ' })).toBe('3:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'cs-CZ' })).toBe('sobota 2. leden 1909');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'cs-CZ' })).toBe('3:04:06');
  });
  test('cy-GB', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'cy-GB' })).toBe('Dydd Sadwrn, 2 Ionawr 1909');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'cy-GB' })).toBe('03:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'cy-GB' })).toBe('Dydd Sadwrn, 2 Ionawr 1909');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'cy-GB' })).toBe('03:04:06');
  });
  test('da-DK', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'da-DK' })).toBe('2. januar 1909');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'da-DK' })).toBe('03:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'da-DK' })).toBe('2. januar 1909');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'da-DK' })).toBe('03:04:06');
  });
  test('de-CH', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'de-CH' })).toBe('Samstag, 2. Januar 1909');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'de-CH' })).toBe('03:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'de-CH' })).toBe('Samstag, 2. Januar 1909');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'de-CH' })).toBe('03:04:06');
  });
  test('de-DE', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'de-DE' })).toBe('Samstag, 2. Januar 1909');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'de-DE' })).toBe('03:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'de-DE' })).toBe('Samstag, 2. Januar 1909');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'de-DE' })).toBe('03:04:06');
  });
  test('el-GR', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'el-GR' })).toBe('Σάββατο, 2 Ιανουαρίου 1909');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'el-GR' })).toBe('3:04:06 πμ');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'el-GR' })).toBe('Σάββατο, 2 Ιανουαρίου 1909');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'el-GR' })).toBe('3:04:06 πμ');
  });
  test('en-AU', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'en-AU' })).toBe('Saturday, 2 January 1909');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'en-AU' })).toBe('3:04:06 AM');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'en-AU' })).toBe('Saturday, 2 January 1909');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'en-AU' })).toBe('3:04:06 AM');
  });
  test('en-CA', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'en-CA' })).toBe('January 2, 1909');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'en-CA' })).toBe('3:04:06 AM');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'en-CA' })).toBe('January 2, 1909');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'en-CA' })).toBe('3:04:06 AM');
  });
  test('en-GB', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'en-GB' })).toBe('02 January 1909');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'en-GB' })).toBe('03:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'en-GB' })).toBe('02 January 1909');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'en-GB' })).toBe('03:04:06');
  });
  test('en-IE', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'en-IE' })).toBe('Saturday 2 January 1909');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'en-IE' })).toBe('03:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'en-IE' })).toBe('Saturday 2 January 1909');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'en-IE' })).toBe('03:04:06');
  });
  test('en-US', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'en-US' })).toBe('Saturday, January 2, 1909');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'en-US' })).toBe('3:04:06 AM');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'en-US' })).toBe('Saturday, January 2, 1909');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'en-US' })).toBe('3:04:06 AM');
  });
  test('es-AR', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'es-AR' })).toBe('sábado, 2 de enero de 1909');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'es-AR' })).toBe('03:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'es-AR' })).toBe('sábado, 2 de enero de 1909');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'es-AR' })).toBe('03:04:06');
  });
  test('es-BO', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'es-BO' })).toBe('sábado, 2 de enero de 1909');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'es-BO' })).toBe('03:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'es-BO' })).toBe('sábado, 2 de enero de 1909');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'es-BO' })).toBe('03:04:06');
  });
  test('es-CL', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'es-CL' })).toBe('sábado, 2 de enero de 1909');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'es-CL' })).toBe('3:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'es-CL' })).toBe('sábado, 2 de enero de 1909');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'es-CL' })).toBe('3:04:06');
  });
  test('es-CO', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'es-CO' })).toBe('sábado, 2 de enero de 1909');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'es-CO' })).toBe('3:04:06 a. m.');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'es-CO' })).toBe('sábado, 2 de enero de 1909');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'es-CO' })).toBe('3:04:06 a. m.');
  });
  test('es-EC', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'es-EC' })).toBe('sábado, 2 de enero de 1909');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'es-EC' })).toBe('3:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'es-EC' })).toBe('sábado, 2 de enero de 1909');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'es-EC' })).toBe('3:04:06');
  });
  test('es-ES', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'es-ES' })).toBe('sábado, 2 de enero de 1909');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'es-ES' })).toBe('3:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'es-ES' })).toBe('sábado, 2 de enero de 1909');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'es-ES' })).toBe('3:04:06');
  });
  test('es-MX', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'es-MX' })).toBe('sábado, 2 de enero de 1909');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'es-MX' })).toBe('03:04:06 a. m.');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'es-MX' })).toBe('sábado, 2 de enero de 1909');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'es-MX' })).toBe('03:04:06 a. m.');
  });
  test('es-PY', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'es-PY' })).toBe('sábado, 2 de enero de 1909');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'es-PY' })).toBe('03:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'es-PY' })).toBe('sábado, 2 de enero de 1909');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'es-PY' })).toBe('03:04:06');
  });
  test('es-UY', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'es-UY' })).toBe('sábado, 2 de Enero de 1909');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'es-UY' })).toBe('3:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'es-UY' })).toBe('sábado, 2 de Enero de 1909');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'es-UY' })).toBe('3:04:06');
  });
  test('es-VE', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'es-VE' })).toBe('sábado, 2 de enero de 1909');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'es-VE' })).toBe('3:04:06 a. m.');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'es-VE' })).toBe('sábado, 2 de enero de 1909');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'es-VE' })).toBe('3:04:06 a. m.');
  });
  test('fi-FI', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'fi-FI' })).toBe('lauantai 2. tammikuu 1909');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'fi-FI' })).toBe('3.04.06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'fi-FI' })).toBe('lauantai 2. tammikuu 1909');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'fi-FI' })).toBe('3.04.06');
  });
  test('fil-PH', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'fil-PH' })).toBe('Sabado, Enero 2, 1909');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'fil-PH' })).toBe('3:04:06 AM');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'fil-PH' })).toBe('Sabado, Enero 2, 1909');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'fil-PH' })).toBe('3:04:06 AM');
  });
  test('fr-CA', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'fr-CA' })).toBe('2 janvier 1909');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'fr-CA' })).toBe('03:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'fr-CA' })).toBe('2 janvier 1909');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'fr-CA' })).toBe('03:04:06');
  });
  test('fr-CH', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'fr-CH' })).toBe('samedi, 2 janvier 1909');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'fr-CH' })).toBe('03:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'fr-CH' })).toBe('samedi, 2 janvier 1909');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'fr-CH' })).toBe('03:04:06');
  });
  test('fr-FR', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'fr-FR' })).toBe('samedi 2 janvier 1909');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'fr-FR' })).toBe('03:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'fr-FR' })).toBe('samedi 2 janvier 1909');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'fr-FR' })).toBe('03:04:06');
  });
  test('gu-IN', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'gu-IN' })).toBe('02 જાન્યુઆરી 1909');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'gu-IN' })).toBe('03:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'gu-IN' })).toBe('02 જાન્યુઆરી 1909');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'gu-IN' })).toBe('03:04:06');
  });
  test('he-IL', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'he-IL' })).toBe('שבת 02 ינואר 1909');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'he-IL' })).toBe('03:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'he-IL' })).toBe('שבת 02 ינואר 1909');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'he-IL' })).toBe('03:04:06');
  });
  test('hi-IN', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'hi-IN' })).toBe('02 जनवरी 1909');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'hi-IN' })).toBe('03:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'hi-IN' })).toBe('02 जनवरी 1909');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'hi-IN' })).toBe('03:04:06');
  });
  test('hr-HR', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'hr-HR' })).toBe('2. siječanj 1909.');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'hr-HR' })).toBe('3:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'hr-HR' })).toBe('2. siječanj 1909.');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'hr-HR' })).toBe('3:04:06');
  });
  test('hu-HU', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'hu-HU' })).toBe('1909. január 2., szombat');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'hu-HU' })).toBe('3:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'hu-HU' })).toBe('1909. január 2., szombat');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'hu-HU' })).toBe('3:04:06');
  });
  test('hy-AM', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'hy-AM' })).toBe('2 Հունվար, 1909');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'hy-AM' })).toBe('03:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'hy-AM' })).toBe('2 Հունվար, 1909');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'hy-AM' })).toBe('03:04:06');
  });
  test('id-ID', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'id-ID' })).toBe('Sabtu, 02 Januari 1909');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'id-ID' })).toBe('03.04.06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'id-ID' })).toBe('Sabtu, 02 Januari 1909');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'id-ID' })).toBe('03.04.06');
  });
  test('is-IS', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'is-IS' })).toBe('laugardagur, 2. janúar 1909');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'is-IS' })).toBe('03:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'is-IS' })).toBe('laugardagur, 2. janúar 1909');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'is-IS' })).toBe('03:04:06');
  });
  test('it-CH', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'it-CH' })).toBe('sabato, 2 gennaio 1909');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'it-CH' })).toBe('03:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'it-CH' })).toBe('sabato, 2 gennaio 1909');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'it-CH' })).toBe('03:04:06');
  });
  test('it-IT', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'it-IT' })).toBe('sabato 2 gennaio 1909');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'it-IT' })).toBe('03:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'it-IT' })).toBe('sabato 2 gennaio 1909');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'it-IT' })).toBe('03:04:06');
  });
  test('ja-JP', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'ja-JP' })).toBe('1909年1月2日');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'ja-JP' })).toBe('3:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'ja-JP' })).toBe('1909年1月2日');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'ja-JP' })).toBe('3:04:06');
  });
  test('ka-GE', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'ka-GE' })).toBe('შაბათი, 02 იანვარი, 1909');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'ka-GE' })).toBe('03:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'ka-GE' })).toBe('შაბათი, 02 იანვარი, 1909');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'ka-GE' })).toBe('03:04:06');
  });
  test('kk-KZ', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'kk-KZ' })).toBe('1909 ж. 2 Қаңтар, сенбі');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'kk-KZ' })).toBe('03:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'kk-KZ' })).toBe('1909 ж. 2 Қаңтар, сенбі');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'kk-KZ' })).toBe('03:04:06');
  });
  test('kn-IN', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'kn-IN' })).toBe('02 ಜನವರಿ 1909');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'kn-IN' })).toBe('03:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'kn-IN' })).toBe('02 ಜನವರಿ 1909');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'kn-IN' })).toBe('03:04:06');
  });
  test('ko-KR', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'ko-KR' })).toBe('1909년 1월 2일 토요일');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'ko-KR' })).toBe('오전 3:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'ko-KR' })).toBe('1909년 1월 2일 토요일');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'ko-KR' })).toBe('오전 3:04:06');
  });
  test('lt-LT', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'lt-LT' })).toBe('1909 m. sausis 2 d., šeštadienis');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'lt-LT' })).toBe('03:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'lt-LT' })).toBe('1909 m. sausis 2 d., šeštadienis');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'lt-LT' })).toBe('03:04:06');
  });
  test('lv-LV', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'lv-LV' })).toBe('sestdiena, 1909. gada 2. janvāris');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'lv-LV' })).toBe('03:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'lv-LV' })).toBe('sestdiena, 1909. gada 2. janvāris');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'lv-LV' })).toBe('03:04:06');
  });
  test('ml-IN', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'ml-IN' })).toBe('1909, ജനുവരി 2, ശനിയാഴ്‌ച');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'ml-IN' })).toBe('3:04:06 AM');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'ml-IN' })).toBe('1909, ജനുവരി 2, ശനിയാഴ്‌ച');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'ml-IN' })).toBe('3:04:06 AM');
  });
  test('mn-MN', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'mn-MN' })).toBe('1909 оны Нэгдүгээр сарын 2, бямба гараг');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'mn-MN' })).toBe('03:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'mn-MN' })).toBe('1909 оны Нэгдүгээр сарын 2, бямба гараг');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'mn-MN' })).toBe('03:04:06');
  });
  test('mr-IN', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'mr-IN' })).toBe('02 जानेवारी 1909');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'mr-IN' })).toBe('03:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'mr-IN' })).toBe('02 जानेवारी 1909');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'mr-IN' })).toBe('03:04:06');
  });
  test('my-MM', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'my-MM' })).toBe('1909၊ ဇန်နဝါရီ 2၊ စနေ');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'my-MM' })).toBe('3:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'my-MM' })).toBe('1909၊ ဇန်နဝါရီ 2၊ စနေ');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'my-MM' })).toBe('3:04:06');
  });
  test('nb-NO', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'nb-NO' })).toBe('lørdag 2. januar 1909');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'nb-NO' })).toBe('03:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'nb-NO' })).toBe('lørdag 2. januar 1909');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'nb-NO' })).toBe('03:04:06');
  });
  test('nl-NL', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'nl-NL' })).toBe('zaterdag 2 januari 1909');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'nl-NL' })).toBe('03:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'nl-NL' })).toBe('zaterdag 2 januari 1909');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'nl-NL' })).toBe('03:04:06');
  });
  test('pa-IN', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'pa-IN' })).toBe('02 ਜਨਵਰੀ 1909 ਸ਼ਨਿੱਚਰਵਾਰ');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'pa-IN' })).toBe('ਸਵੇਰ 03:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'pa-IN' })).toBe('02 ਜਨਵਰੀ 1909 ਸ਼ਨਿੱਚਰਵਾਰ');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'pa-IN' })).toBe('ਸਵੇਰ 03:04:06');
  });
  test('pl-PL', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'pl-PL' })).toBe('sobota, 2 styczeń 1909');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'pl-PL' })).toBe('03:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'pl-PL' })).toBe('sobota, 2 styczeń 1909');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'pl-PL' })).toBe('03:04:06');
  });
  test('pt-BR', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'pt-BR' })).toBe('sábado, 2 de janeiro de 1909');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'pt-BR' })).toBe('03:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'pt-BR' })).toBe('sábado, 2 de janeiro de 1909');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'pt-BR' })).toBe('03:04:06');
  });
  test('pt-PT', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'pt-PT' })).toBe('2 de janeiro de 1909');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'pt-PT' })).toBe('03:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'pt-PT' })).toBe('2 de janeiro de 1909');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'pt-PT' })).toBe('03:04:06');
  });
  test('ro-RO', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'ro-RO' })).toBe('sâmbătă, 2 ianuarie 1909');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'ro-RO' })).toBe('03:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'ro-RO' })).toBe('sâmbătă, 2 ianuarie 1909');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'ro-RO' })).toBe('03:04:06');
  });
  test('ru-RU', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'ru-RU' })).toBe('2 Январь 1909 г.');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'ru-RU' })).toBe('3:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'ru-RU' })).toBe('2 Январь 1909 г.');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'ru-RU' })).toBe('3:04:06');
  });
  test('sk-SK', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'sk-SK' })).toBe('sobota 2. január 1909');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'sk-SK' })).toBe('3:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'sk-SK' })).toBe('sobota 2. január 1909');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'sk-SK' })).toBe('3:04:06');
  });
  test('sl-SI', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'sl-SI' })).toBe('sobota, 2. januar 1909');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'sl-SI' })).toBe('03:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'sl-SI' })).toBe('sobota, 2. januar 1909');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'sl-SI' })).toBe('03:04:06');
  });
  test('sr-RS', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'sr-RS' })).toBe('subota, 2. januar 1909.');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'sr-RS' })).toBe('03:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'sr-RS' })).toBe('subota, 2. januar 1909.');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'sr-RS' })).toBe('03:04:06');
  });
  test('sv-SE', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'sv-SE' })).toBe('den 2 januari 1909');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'sv-SE' })).toBe('03:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'sv-SE' })).toBe('den 2 januari 1909');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'sv-SE' })).toBe('03:04:06');
  });
  test('ta-IN', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'ta-IN' })).toBe('02 ஜனவரி 1909');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'ta-IN' })).toBe('03:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'ta-IN' })).toBe('02 ஜனவரி 1909');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'ta-IN' })).toBe('03:04:06');
  });
  test('te-IN', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'te-IN' })).toBe('2, జనవరి 1909, శనివారం');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'te-IN' })).toBe('3:04:06 AM');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'te-IN' })).toBe('2, జనవరి 1909, శనివారం');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'te-IN' })).toBe('3:04:06 AM');
  });
  test('th-TH', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'th-TH' })).toBe('2 มกราคม 1909');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'th-TH' })).toBe('3:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'th-TH' })).toBe('2 มกราคม 1909');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'th-TH' })).toBe('3:04:06');
  });
  test('tr-TR', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'tr-TR' })).toBe('2 Ocak 1909 Cumartesi');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'tr-TR' })).toBe('03:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'tr-TR' })).toBe('2 Ocak 1909 Cumartesi');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'tr-TR' })).toBe('03:04:06');
  });
  test('uk-UA', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'uk-UA' })).toBe('2 січень 1909 р.');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'uk-UA' })).toBe('3:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'uk-UA' })).toBe('2 січень 1909 р.');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'uk-UA' })).toBe('3:04:06');
  });
  test('vi-VN', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'vi-VN' })).toBe('02 Tháng Giêng 1909');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'vi-VN' })).toBe('3:04:06 SA');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'vi-VN' })).toBe('02 Tháng Giêng 1909');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'vi-VN' })).toBe('3:04:06 SA');
  });
  test('zh-CN', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'zh-CN' })).toBe('1909年1月2日');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'zh-CN' })).toBe('3:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'zh-CN' })).toBe('1909年1月2日');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'zh-CN' })).toBe('3:04:06');
  });
  test('zh-HK', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'zh-HK' })).toBe('1909年1月2日');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'zh-HK' })).toBe('3:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'zh-HK' })).toBe('1909年1月2日');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'zh-HK' })).toBe('3:04:06');
  });
  test('zh-TW', () => {
    expect(format('[$-F800]yyyy-mm-dd', MAGICDATE, { locale: 'zh-TW' })).toBe('1909年1月2日');
    expect(format('[$-F400]hh:mm', MAGICDATE, { locale: 'zh-TW' })).toBe('上午 03:04:06');
    expect(format('[$-x-sysdate]yyyy-mm-dd', MAGICDATE, { locale: 'zh-TW' })).toBe('1909年1月2日');
    expect(format('[$-x-systime]hh:mm', MAGICDATE, { locale: 'zh-TW' })).toBe('上午 03:04:06');
  });
});
