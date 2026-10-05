import { describe, expect, test } from 'vitest';
import { parseLocaleInstr } from '../lib/parseLocaleInstr.ts';

describe('parseLocaleInstr', () => {
  describe('LCID style', () => {
    test('[$INR]', () => {
      expect(parseLocaleInstr('INR')).toEqual({
        currency: 'INR'
      });
    });
  });

  describe('LCID style', () => {
    test('[$-409]', () => {
      expect(parseLocaleInstr('-409')).toEqual({
        locale: 'en-US'
      });
    });
    test('[$-0409]', () => {
      expect(parseLocaleInstr('-0409')).toEqual({
        locale: 'en-US'
      });
    });
    test('[$$-409]', () => {
      expect(parseLocaleInstr('$-409')).toEqual({
        locale: 'en-US',
        currency: '$'
      });
    });
    test('[$USD-409]', () => {
      expect(parseLocaleInstr('USD-409')).toEqual({
        locale: 'en-US',
        currency: 'USD'
      });
    });
    test('[$-060409]', () => {
      expect(parseLocaleInstr('-060409')).toEqual({
        calendar: 6,
        locale: 'en-US'
      });
    });
    test('[$-010409]', () => {
      expect(parseLocaleInstr('-010409')).toEqual({
        calendar: 1,
        locale: 'en-US'
      });
    });

    test('[$€-407]', () => {
      expect(parseLocaleInstr('€-407')).toEqual({
        locale: 'de-DE',
        currency: '€'
      });
    });

    test('[$-0809]', () => {
      expect(parseLocaleInstr('-0809')).toEqual({
        locale: 'en-GB'
      });
    });
    test('[$-00080409]', () => {
      expect(parseLocaleInstr('-00080409')).toEqual({
        calendar: 8,
        locale: 'en-US'
      });
    });

    test('[$-1E020404]', () => {
      expect(parseLocaleInstr('-1E020404')).toEqual({
        calendar: 2,
        locale: 'zh-TW',
        numberStyle: 30
      });
    });
    test('[$-00130000]', () => {
      expect(parseLocaleInstr('-00130000')).toEqual({
        calendar: 19
      });
    });
    test('[$-0200040F]', () => {
      expect(parseLocaleInstr('-0200040F')).toEqual({
        locale: 'is',
        numberStyle: 2
      });
    });
  });

  describe('BCP 47 style', () => {
    test('[$-en-US]', () => {
      expect(parseLocaleInstr('-en-US')).toEqual({
        locale: 'en-US'
      });
    });
    test('[$-en-US,6]', () => {
      expect(parseLocaleInstr('-en-US,6')).toEqual({
        calendar: 6,
        locale: 'en-US'
      });
    });
    test('[$€-de-DE]', () => {
      expect(parseLocaleInstr('€-de-DE')).toEqual({
        currency: '€',
        locale: 'de-DE'
      });
    });
    test('[$€-en-US,6]', () => {
      expect(parseLocaleInstr('€-en-US,6')).toEqual({
        calendar: 6,
        currency: '€',
        locale: 'en-US'
      });
    });
    test('[$€-en-US,6]', () => {
      expect(parseLocaleInstr('€-en-US,1E02')).toEqual({
        calendar: 2,
        numberStyle: 30,
        currency: '€',
        locale: 'en-US'
      });
    });
    test('[$-ja-JP]', () => {
      expect(parseLocaleInstr('-ja-JP')).toEqual({
        locale: 'ja-JP'
      });
    });
    test('[$-ja-JP-x-gannen]', () => {
      expect(parseLocaleInstr('-ja-JP-x-gannen')).toEqual({
        locale: 'ja-JP'
      });
    });
    test('[$-,1]', () => {
      expect(parseLocaleInstr('-,1')).toEqual({
        calendar: 1
      });
    });
    test('[$-,6]', () => {
      expect(parseLocaleInstr('-,6')).toEqual({
        calendar: 6
      });
    });
    test('[$-,6]', () => {
      expect(parseLocaleInstr('-,6')).toEqual({
        calendar: 6
      });
    });
    test('[$USD-,6]', () => {
      expect(parseLocaleInstr('USD-,6')).toEqual({
        currency: 'USD',
        calendar: 6
      });
    });
  });

  describe('sysdate / systime', () => {
    test('[$-x-sysdate]', () => {
      expect(parseLocaleInstr('-x-sysdate')).toEqual({
        sysdate: true
      });
    });
    test('[$-x-sysdate,BE3C]', () => {
      expect(parseLocaleInstr('-x-sysdate,BE3C')).toEqual({
        sysdate: true
      });
    });
    test('[$€-x-sysdate,BE3C]', () => {
      expect(parseLocaleInstr('€-x-sysdate,BE3C')).toEqual({
        sysdate: true
      });
    });
    test('[$€-x-sysdate]', () => {
      expect(parseLocaleInstr('€-x-sysdate')).toEqual({
        sysdate: true
      });
    });

    test('[$-F800]', () => {
      expect(parseLocaleInstr('-F800')).toEqual({
        sysdate: true
      });
    });
    test('[$-02F800]', () => {
      expect(parseLocaleInstr('-02F800')).toEqual({
        sysdate: true
      });
    });
    test('[$-1E02F800]', () => {
      expect(parseLocaleInstr('-1E02F800')).toEqual({
        sysdate: true
      });
    });
    test('[$€-1E02F800]', () => {
      expect(parseLocaleInstr('€-1E02F800')).toEqual({
        sysdate: true
      });
    });
    test('[$€-F800]', () => {
      expect(parseLocaleInstr('€-F800')).toEqual({
        sysdate: true
      });
    });

    test('[$-x-systime]', () => {
      expect(parseLocaleInstr('-x-systime')).toEqual({
        systime: true
      });
    });
    test('[$-x-systime,BE3C]', () => {
      expect(parseLocaleInstr('-x-systime,BE3C')).toEqual({
        systime: true
      });
    });
    test('[$€-x-systime,BE3C]', () => {
      expect(parseLocaleInstr('€-x-systime,BE3C')).toEqual({
        systime: true
      });
    });
    test('[$€-x-systime]', () => {
      expect(parseLocaleInstr('€-x-systime')).toEqual({
        systime: true
      });
    });

    test('[$-F400]', () => {
      expect(parseLocaleInstr('-F400')).toEqual({
        systime: true
      });
    });
    test('[$-02F400]', () => {
      expect(parseLocaleInstr('-02F400')).toEqual({
        systime: true
      });
    });
    test('[$-1E02F400]', () => {
      expect(parseLocaleInstr('-1E02F400')).toEqual({
        systime: true
      });
    });
    test('[$€-1E02F400]', () => {
      expect(parseLocaleInstr('€-1E02F400')).toEqual({
        systime: true
      });
    });
    test('[$€-F400]', () => {
      expect(parseLocaleInstr('€-F400')).toEqual({
        systime: true
      });
    });
  });
});
