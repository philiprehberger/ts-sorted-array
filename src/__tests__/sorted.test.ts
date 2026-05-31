import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { sortedArray } from '../../dist/index.js';

describe('sortedArray', () => {
  it('should maintain sorted order on insert', () => {
    const arr = sortedArray<number>();
    arr.insert(3);
    arr.insert(1);
    arr.insert(2);
    assert.deepStrictEqual(arr.toArray(), [1, 2, 3]);
  });

  it('should insert duplicates in order', () => {
    const arr = sortedArray<number>();
    arr.insert(2);
    arr.insert(1);
    arr.insert(2);
    assert.deepStrictEqual(arr.toArray(), [1, 2, 2]);
  });

  it('should return true for has() when value exists', () => {
    const arr = sortedArray<number>();
    arr.insert(5);
    arr.insert(10);
    assert.strictEqual(arr.has(5), true);
    assert.strictEqual(arr.has(10), true);
  });

  it('should return false for has() when value does not exist', () => {
    const arr = sortedArray<number>();
    arr.insert(5);
    assert.strictEqual(arr.has(3), false);
    assert.strictEqual(arr.has(7), false);
  });

  it('should return correct indexOf', () => {
    const arr = sortedArray<number>();
    arr.insert(10);
    arr.insert(20);
    arr.insert(30);
    assert.strictEqual(arr.indexOf(20), 1);
    assert.strictEqual(arr.indexOf(99), -1);
  });

  it('should remove existing value and return true', () => {
    const arr = sortedArray<number>();
    arr.insert(1);
    arr.insert(2);
    arr.insert(3);
    assert.strictEqual(arr.remove(2), true);
    assert.deepStrictEqual(arr.toArray(), [1, 3]);
  });

  it('should return false when removing non-existent value', () => {
    const arr = sortedArray<number>();
    arr.insert(1);
    assert.strictEqual(arr.remove(99), false);
  });

  it('should return correct range subset', () => {
    const arr = sortedArray<number>();
    [1, 3, 5, 7, 9, 11].forEach((n) => arr.insert(n));
    assert.deepStrictEqual(arr.range(3, 9), [3, 5, 7, 9]);
  });

  it('should return a copy from toArray', () => {
    const arr = sortedArray<number>();
    arr.insert(1);
    const copy = arr.toArray();
    copy.push(99);
    assert.strictEqual(arr.length, 1);
  });

  it('should report correct length, first, and last', () => {
    const arr = sortedArray<number>();
    assert.strictEqual(arr.length, 0);
    assert.strictEqual(arr.first, undefined);
    assert.strictEqual(arr.last, undefined);

    arr.insert(5);
    arr.insert(1);
    arr.insert(9);
    assert.strictEqual(arr.length, 3);
    assert.strictEqual(arr.first, 1);
    assert.strictEqual(arr.last, 9);
  });

  it('should support iteration with for...of', () => {
    const arr = sortedArray<number>();
    arr.insert(3);
    arr.insert(1);
    arr.insert(2);
    const result: number[] = [];
    for (const v of arr) {
      result.push(v);
    }
    assert.deepStrictEqual(result, [1, 2, 3]);
  });

  it('should support custom comparator (descending)', () => {
    const arr = sortedArray<number>((a, b) => b - a);
    arr.insert(1);
    arr.insert(3);
    arr.insert(2);
    assert.deepStrictEqual(arr.toArray(), [3, 2, 1]);
  });

  it('should handle empty array edge cases', () => {
    const arr = sortedArray<number>();
    assert.strictEqual(arr.has(1), false);
    assert.strictEqual(arr.indexOf(1), -1);
    assert.strictEqual(arr.remove(1), false);
    assert.deepStrictEqual(arr.range(0, 10), []);
    assert.deepStrictEqual(arr.toArray(), []);
  });

  it('should iterate in reverse with reversed()', () => {
    const arr = sortedArray<number>();
    [3, 1, 5, 2, 4].forEach((n) => arr.insert(n));
    const result: number[] = [];
    for (const v of arr.reversed()) {
      result.push(v);
    }
    assert.deepStrictEqual(result, [5, 4, 3, 2, 1]);
  });

  it('should return empty iterable for reversed() on empty array', () => {
    const arr = sortedArray<number>();
    const result: number[] = [];
    for (const v of arr.reversed()) {
      result.push(v);
    }
    assert.deepStrictEqual(result, []);
  });

  it('should find closest value', () => {
    const arr = sortedArray<number>();
    [1, 5, 10, 20].forEach((n) => arr.insert(n));
    assert.strictEqual(arr.closest(6), 5);
    assert.strictEqual(arr.closest(15), 10);
    assert.strictEqual(arr.closest(1), 1);
    assert.strictEqual(arr.closest(25), 20);
    assert.strictEqual(arr.closest(0), 1);
  });

  it('should return undefined for closest on empty array', () => {
    const arr = sortedArray<number>();
    assert.strictEqual(arr.closest(5), undefined);
  });

  it('should return unique values', () => {
    const arr = sortedArray<number>();
    [1, 2, 2, 3, 3, 3, 4].forEach((n) => arr.insert(n));
    const u = arr.unique();
    assert.deepStrictEqual(u.toArray(), [1, 2, 3, 4]);
  });

  it('should compute median for odd-length array', () => {
    const arr = sortedArray<number>();
    [1, 3, 5].forEach((n) => arr.insert(n));
    assert.strictEqual(arr.median(), 3);
  });

  it('should compute median for even-length array', () => {
    const arr = sortedArray<number>();
    [1, 3, 5, 7].forEach((n) => arr.insert(n));
    assert.strictEqual(arr.median(), 4);
  });

  it('should return undefined for median on empty array', () => {
    const arr = sortedArray<number>();
    assert.strictEqual(arr.median(), undefined);
  });

  it('should compute percentile', () => {
    const arr = sortedArray<number>();
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach((n) => arr.insert(n));
    assert.strictEqual(arr.percentile(50), 5);
    assert.strictEqual(arr.percentile(100), 10);
    assert.strictEqual(arr.percentile(0), 1);
  });

  it('should return undefined for percentile on empty array or invalid p', () => {
    const arr = sortedArray<number>();
    assert.strictEqual(arr.percentile(50), undefined);
    arr.insert(1);
    assert.strictEqual(arr.percentile(-1), undefined);
    assert.strictEqual(arr.percentile(101), undefined);
  });

  it('should compute sum', () => {
    const arr = sortedArray<number>();
    [1, 2, 3, 4, 5].forEach((n) => arr.insert(n));
    assert.strictEqual(arr.sum(), 15);
  });

  it('should return 0 for sum on empty array', () => {
    const arr = sortedArray<number>();
    assert.strictEqual(arr.sum(), 0);
  });

  it('should empty the array in place with clear()', () => {
    const arr = sortedArray<number>();
    [3, 1, 4, 1, 5, 9].forEach((n) => arr.insert(n));
    arr.clear();
    assert.strictEqual(arr.length, 0);
    assert.deepStrictEqual(arr.toArray(), []);
    assert.strictEqual(arr.first, undefined);
    assert.strictEqual(arr.last, undefined);
    assert.strictEqual(arr.has(3), false);
  });
});
