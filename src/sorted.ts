export interface SortedArray<T> {
  insert(value: T): void;
  remove(value: T): boolean;
  has(value: T): boolean;
  indexOf(value: T): number;
  range(min: T, max: T): T[];
  toArray(): T[];
  reversed(): Iterable<T>;
  closest(value: T): T | undefined;
  unique(): SortedArray<T>;
  median(): T | undefined;
  percentile(p: number): T | undefined;
  sum(): number;
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

    reversed(): Iterable<T> {
      return {
        [Symbol.iterator](): Iterator<T> {
          let i = items.length - 1;
          return {
            next(): IteratorResult<T> {
              if (i >= 0) {
                return { value: items[i--], done: false };
              }
              return { value: undefined as unknown as T, done: true };
            },
          };
        },
      };
    },

    closest(value: T): T | undefined {
      if (items.length === 0) return undefined;
      const idx = binarySearch(value);
      if (idx >= items.length) return items[items.length - 1];
      if (cmp(items[idx], value) === 0) return items[idx];
      if (idx === 0) return items[0];
      // Compare distance to idx and idx-1 using comparator magnitude
      const diffLeft = Math.abs(
        cmp(items[idx - 1], value),
      );
      const diffRight = Math.abs(cmp(items[idx], value));
      return diffLeft <= diffRight ? items[idx - 1] : items[idx];
    },

    unique(): SortedArray<T> {
      const result = sortedArray<T>(comparator);
      for (let i = 0; i < items.length; i++) {
        if (i === 0 || cmp(items[i], items[i - 1]) !== 0) {
          result.insert(items[i]);
        }
      }
      return result;
    },

    median(): T | undefined {
      if (items.length === 0) return undefined;
      const mid = Math.floor(items.length / 2);
      if (items.length % 2 === 1) return items[mid];
      return ((items[mid - 1] as unknown as number) +
        (items[mid] as unknown as number)) / 2 as unknown as T;
    },

    percentile(p: number): T | undefined {
      if (items.length === 0 || p < 0 || p > 100) return undefined;
      const idx = Math.ceil((p / 100) * items.length) - 1;
      return items[Math.max(0, idx)];
    },

    sum(): number {
      let total = 0;
      for (let i = 0; i < items.length; i++) {
        total += items[i] as unknown as number;
      }
      return total;
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
