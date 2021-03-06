import { number } from "fp-ts";

type MultipleOf = (n: number) => (m: number) => boolean;
export const multipleOf: MultipleOf = (n) => (m) => !Boolean(m % n);

type Flip = <X, Y, R>(f: (y: Y) => (x: X) => R) => (x: X) => (y: Y) => R;
export const flip: Flip = (f) => (x) => (y) => f(y)(x);

// コンビネーター
// 関数を組み合わせる為のHoF
// ----------------------------------------
export const even = multipleOf(2);

const not =
  <F extends (v: number) => boolean, V extends number>(predicate: F) =>
  (v: V) =>
    !predicate(v);

export const odd = not(even);
// ----------------------------------------

const composeVer1 =
  <P, R1, R2>(f1: (p: R2) => R1, f2: (p: P) => R2) =>
  (v: P) =>
    f1(f2(v));

const fn1 = (p: number) => p.toString();
const fn2 = (p: number) => p * 1;
const x = composeVer1(fn1, fn2);

// Yコンビネータ
// 再起をするHoF
// ----------------------------------------
type Todo = any;
const yCombinator = (f: (...a: Todo) => Todo) => {
  return ((x: (p: Todo) => Todo) => {
    return f((y: number) => {
      return x(x)(y);
    });
  })((x: Todo) => {
    return f((y: number) => {
      return x(x)(y);
    });
  });
};

const factorialFn = (f: (p: number) => number) => (v: number) => {
  if (v === 0) {
    return 1;
  }
  return v * f(v - 1);
};

export const factorial = yCombinator(factorialFn);
// ----------------------------------------

/**
 * クロージャーとしてのカウンター
 */
export const counter = (init: number) => {
  let x = init;
  return () => {
    x = x + 1;
    return x;
  };
};

/**
 * カリー化された不変のobj
 */
export const objModule = {
  set:
    (k: string, v: unknown) =>
    (o: (p: unknown) => unknown) =>
    (queryKey: unknown) =>
      k === queryKey ? v : objModule.get(queryKey)(o),
  // @ts-expect-error
  get: (k) => (o) => o(k),
};
