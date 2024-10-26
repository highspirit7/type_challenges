// ============= Test Cases =============
import type { Equal, Expect } from './test-utils';

type cases = [
  Expect<Equal<Expected1, MyPick<Todo, 'title'>>>,
  Expect<Equal<Expected2, MyPick<Todo, 'title' | 'completed'>>>,
  // @ts-expect-error
  MyPick<Todo, 'title' | 'completed' | 'invalid'>
];

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

interface Expected1 {
  title: string;
}

interface Expected2 {
  title: string;
  completed: boolean;
}

type PickTitle = MyPick<Todo, 'title'>;

// ============= Your Code Here =============
// 1st try -> fail
// 2nd try after checking out the solution -> pass
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};
