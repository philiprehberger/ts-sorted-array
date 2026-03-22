export interface SortedArray<T> {
  insert(value: T): void;
  remove(value: T): boolean;
  has(value: T): boolean;
  indexOf(value: T): number;
  range(min: T, max: T): T[];
  toArray(): T[];
  readonly length: number;
  readonly first: T | undefined;
  readonly last: T | undefined;
  [Symbol.iterator](): Iterator<T>;
}

export function sortedArray<T>(
  comparator?: (a: T, b: T) => number,
): SortedArray<T> {
  const items: T[] = [];
  const cmp =
    comparator ?? ((a: T, b: T) => (a < b ? -1 : a > b ? 1 : 0));

  function binarySearch(value: T): number {
    let low = 0;
    let high = items.length;
    while (low < high) {
      const mid = (low + high) >>> 1;
      if (cmp(items[mid], value) < 0) low = mid + 1;
      else high = mid;
    }
    return low;
  }

  return {
    insert(value: T): void {
      const idx = binarySearch(value);
      items.splice(idx, 0, value);
    },

    remove(value: T): boolean {
      const idx = binarySearch(value);
      if (idx < items.length && cmp(items[idx], value) === 0) {
        items.splice(idx, 1);
        return true;
      }
      return false;
    },

    has(value: T): boolean {
      const idx = binarySearch(value);
      return idx < items.length && cmp(items[idx], value) === 0;
    },

    indexOf(value: T): number {
      const idx = binarySearch(value);
      if (idx < items.length && cmp(items[idx], value) === 0) {
        return idx;
      }
      return -1;
    },

    range(min: T, max: T): T[] {
      const result: T[] = [];
      const start = binarySearch(min);
      for (let i = start; i < items.length; i++) {
        if (cmp(items[i], max) > 0) break;
        result.push(items[i]);
      }
      return result;
    },

    toArray(): T[] {
      return [...items];
    },

    get length(): number {
      return items.length;
    },

    get first(): T | undefined {
      return items[0];
    },

    get last(): T | undefined {
      return items[items.length - 1];
    },

    [Symbol.iterator](): Iterator<T> {
      return items[Symbol.iterator]();
    },
  };
}
