# @philiprehberger/sorted-array

[![CI](https://github.com/philiprehberger/ts-sorted-array/actions/workflows/ci.yml/badge.svg)](https://github.com/philiprehberger/ts-sorted-array/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@philiprehberger/sorted-array)](https://www.npmjs.com/package/@philiprehberger/sorted-array)
[![License](https://img.shields.io/github/license/philiprehberger/ts-sorted-array)](LICENSE)

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

## License

MIT
