// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

const promiseAllTest1 = PromiseAll([1, 2, 3] as const); // with 'as const', it will be considered as readonly [1, 2, 3] which is tuple of literal types.
const promiseAllTest2 = PromiseAll([1, 2, Promise.resolve(3)] as const);
const promiseAllTest3 = PromiseAll([1, 2, Promise.resolve(3)]);
const promiseAllTest4 = PromiseAll<Array<number | Promise<number>>>([1, 2, 3]);
// How to interpret the result of promiseAllTest4
// Input Type: When you pass [1, 2, 3] to PromiseAll, the input type is inferred as Array<number | Promise<number>>.

// Type Inference: TypeScript infers that T is the type of the input, which means T is effectively (number | Promise<number>)[].

// Mapped Type: The return type of PromiseAll is evaluated using the mapped type:

// Awaited<T[P]> for each element:
// For 1: Awaited<number> is number
// For 2: Awaited<number> is number
// For 3: Awaited<number> is number
// Thus, the inferred return type is Promise<number[]> because it doesn’t contain any promises in the input.

// promiseAllTest4: The inferred type for promiseAllTest4 is Promise<number[]>, since all the elements in the input array are plain numbers, and Awaited does not alter their type.

type cases = [
  Expect<Equal<typeof promiseAllTest1, Promise<[1, 2, 3]>>>,
  Expect<Equal<typeof promiseAllTest2, Promise<[1, 2, number]>>>,
  Expect<Equal<typeof promiseAllTest3, Promise<[number, number, number]>>>,
  Expect<Equal<typeof promiseAllTest4, Promise<number[]>>>
];

// ============= Your Code Here =============
// 1st try -> fail

type Awaited<T> = T extends PromiseLike<infer R> ? Awaited<R> : T;
type test1 = Awaited<[1]>;
type test2 = Awaited<1>;
type test3 = Awaited<number>;

declare function PromiseAll<T extends unknown[]>(
  values: readonly [...T]
): Promise<{
  [P in keyof T]: Awaited<T[P]>; // Can write a type for tuple this way since it behaves like an object indexed by numbers.
}>;
