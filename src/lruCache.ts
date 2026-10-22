/**
 * A minimal least-recently-used cache.
 *
 * A `Map` keeps keys in insertion order, so re-inserting an entry on access moves it to
 * the end, and the first key is always the least recently used one.
 *
 * @internal
 */
export class LRUCache<K, V> {
  private readonly maxSize: number;
  private readonly entries = new Map<K, V>();

  /**
   * @param maxSize The number of entries to keep before evicting the least recently used.
   */
  constructor (maxSize: number) {
    this.maxSize = maxSize;
  }

  get (key: K): V | undefined {
    const value = this.entries.get(key);
    if (value !== undefined) {
      this.entries.delete(key);
      this.entries.set(key, value);
    }
    return value;
  }

  set (key: K, value: V): void {
    this.entries.delete(key);
    this.entries.set(key, value);
    if (this.entries.size > this.maxSize) {
      this.entries.delete(this.entries.keys().next().value as K);
    }
  }

  getOrSet (key: K, callback: (key: K) => V): V {
    const value = this.entries.has(key)
      ? this.entries.get(key)!
      : callback(key);
    this.set(key, value);
    return value;
  }
}
