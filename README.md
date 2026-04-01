# @philiprehberger/sorted-array

[![CI](https://github.com/philiprehberger/ts-sorted-array/actions/workflows/ci.yml/badge.svg)](https://github.com/philiprehberger/ts-sorted-array/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@philiprehberger/sorted-array.svg)](https://www.npmjs.com/package/@philiprehberger/sorted-array)
[![Last updated](https://img.shields.io/github/last-commit/philiprehberger/ts-sorted-array)](https://github.com/philiprehberger/ts-sorted-array/commits/main)

Sorted array with binary search — maintains order on insert.

## Installation

```bash
npm install @philiprehberger/sorted-array
```

## Usage

```ts
import { sortedArray } from '@philiprehberger/sorted-array';

const arr = sortedArray<number>();
arr.insert(5);
arr.insert(1);
arr.insert(3);

console.log(arr.toArray()); // [1, 3, 5]
console.log(arr.has(3));    // true
console.log(arr.range(1, 4)); // [1, 3]

// Custom comparator (descending)
const desc = sortedArray<number>((a, b) => b - a);
desc.insert(1);
desc.insert(3);
desc.insert(2);
console.log(desc.toArray()); // [3, 2, 1]
```

### Reverse Iteration

```ts
const arr = sortedArray<number>();
[3, 1, 5, 2, 4].forEach((n) => arr.insert(n));

for (const value of arr.reversed()) {
  console.log(value); // 5, 4, 3, 2, 1
}
```

### Closest Value Lookup

```ts
const arr = sortedArray<number>();
[1, 5, 10, 20].forEach((n) => arr.insert(n));

console.log(arr.closest(6));  // 5
console.log(arr.closest(15)); // 10
console.log(arr.closest(25)); // 20
```

### Statistical Methods

```ts
const arr = sortedArray<number>();
[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach((n) => arr.insert(n));

console.log(arr.sum());           // 55
console.log(arr.median());        // 5.5
console.log(arr.percentile(90));  // 9
```

### Unique Filter

```ts
const arr = sortedArray<number>();
[1, 2, 2, 3, 3, 3].forEach((n) => arr.insert(n));

const uniq = arr.unique();
console.log(uniq.toArray()); // [1, 2, 3]
```

## API

### `sortedArray<T>(comparator?)`

Creates a new sorted array. Accepts an optional comparator function.

Returns a `SortedArray<T>` with:

- **`insert(value)`** — Insert a value in sorted position
- **`remove(value)`** — Remove a value, returns `true` if found
- **`has(value)`** — Check if a value exists
- **`indexOf(value)`** — Get index of value, or `-1`
- **`range(min, max)`** — Get all values between min and max (inclusive)
- **`toArray()`** — Get a copy of the internal array
- **`reversed()`** — Return an iterable for descending traversal
- **`closest(value)`** — Find the nearest element using binary search
- **`unique()`** — Return a new `SortedArray` with duplicates removed
- **`median()`** — Median value (averages middle two for even-length arrays)
- **`percentile(p)`** — Value at the given percentile (0-100)
- **`sum()`** — Sum of all elements (numeric arrays)
- **`length`** — Number of elements
- **`first`** — First (smallest) element or `undefined`
- **`last`** — Last (largest) element or `undefined`
- **`[Symbol.iterator]()`** — Iterate in sorted order

## Development

```bash
npm install
npm run build
npm test
```

## Support

If you find this project useful:

⭐ [Star the repo](https://github.com/philiprehberger/ts-sorted-array)

🐛 [Report issues](https://github.com/philiprehberger/ts-sorted-array/issues?q=is%3Aissue+is%3Aopen+label%3Abug)

💡 [Suggest features](https://github.com/philiprehberger/ts-sorted-array/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement)

❤️ [Sponsor development](https://github.com/sponsors/philiprehberger)

🌐 [All Open Source Projects](https://philiprehberger.com/open-source-packages)

💻 [GitHub Profile](https://github.com/philiprehberger)

🔗 [LinkedIn Profile](https://www.linkedin.com/in/philiprehberger)

## License

[MIT](LICENSE)
