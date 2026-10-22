import { describe, expect, test } from 'vitest';
import { LRUCache } from '../src/lruCache.ts';

describe('LRUCache', () => {
  test('returns stored values and undefined for missing keys', () => {
    const cache = new LRUCache<string, number>(2);
    cache.set('a', 1);
    expect(cache.get('a')).toBe(1);
    expect(cache.get('b')).toBe(undefined);
  });

  test('evicts the least recently used entry when full', () => {
    const cache = new LRUCache<string, number>(2);
    cache.set('a', 1);
    cache.set('b', 2);
    cache.get('a'); // "a" is now more recent than "b"
    cache.set('c', 3);
    expect(cache.get('a')).toBe(1);
    expect(cache.get('b')).toBe(undefined);
    expect(cache.get('c')).toBe(3);
  });

  test('getOrSet calls the callback only when the key is missing', () => {
    const cache = new LRUCache<string, string>(2);
    const calls: string[] = [];
    const make = (key: string) => {
      calls.push(key);
      return key.toUpperCase();
    };
    expect(cache.getOrSet('a', make)).toBe('A');
    expect(cache.getOrSet('a', make)).toBe('A');
    expect(cache.get('a')).toBe('A');
    expect(calls).toEqual([ 'a' ]);
  });

  test('getOrSet caches falsy values', () => {
    for (const falsy of [ 0, '', false, null, undefined ]) {
      const cache = new LRUCache<string, unknown>(2);
      let calls = 0;
      const make = () => {
        calls++;
        return falsy;
      };
      expect(cache.getOrSet('a', make), String(falsy)).toBe(falsy);
      expect(cache.getOrSet('a', make), String(falsy)).toBe(falsy);
      expect(calls, `callback calls for ${String(falsy)}`).toBe(1);
    }
  });

  test('getOrSet counts as a use and evicts like set', () => {
    const cache = new LRUCache<string, string>(2);
    const make = (key: string) => key.toUpperCase();
    cache.getOrSet('a', make);
    cache.getOrSet('b', make);
    cache.getOrSet('a', make); // "a" is now more recent than "b"
    cache.getOrSet('c', make);
    expect(cache.get('a')).toBe('A');
    expect(cache.get('b')).toBe(undefined);
    expect(cache.get('c')).toBe('C');
  });

  test('setting an existing key updates it without evicting', () => {
    const cache = new LRUCache<string, number>(2);
    cache.set('a', 1);
    cache.set('b', 2);
    cache.set('a', 10);
    expect(cache.get('a')).toBe(10);
    expect(cache.get('b')).toBe(2);
  });
});
