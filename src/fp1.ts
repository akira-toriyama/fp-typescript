/**
 * 恒等関数
 * 入力値と同じ値を返す関数
 */
export const identify = <T>(x: T) => x;

type Succ = (n: number) => number;
export const succ: Succ = (n) => n + 1;

type Prev = (n: number) => number;
const prev: Prev = (n) => n - 1;

type Add = (x: number, y: number) => number;
export const add: Add = (x, y) => (y === 0 ? x : add(succ(x), prev(y)));

type Times = (
  cnt: number,
  fn: (x: number, y: number) => number,
  arg: number,
  /**
   * 結果を蓄えておくもの
   */
  memo: number
) => number;
const times: Times = (cnt, fn, m, memo) =>
  cnt > 1 ? times(cnt - 1, fn, m, fn(memo, m)) : fn(memo, m);

type Multiply = (x: number, y: number) => number;
export const multiply: Multiply = (n, m) => times(n, add, m, 0);

/**
 * 副作用が分離されていない
 */
export const legacyAge = (birthYear: number) => {
  const today = new Date();
  return today.getFullYear() - birthYear;
};

/**
 * 副作用が分離されている
 */
export const age = (birthYear: number, thisYear: number) =>
  thisYear - birthYear;

export const map =
  <T>(a: T[]) =>
  (f: (p: T) => T) =>
    a.reduce<T[]>((acc, cur) => acc.concat(f(cur)), []);

type Fn<P, R> = (p: P) => R;
/**
 * 関数合成
 */
export const compose =
  <P, PnR, R>(f1: Fn<PnR, R>, f2: Fn<P, PnR>) =>
  (p: P) =>
    f1(f2(p));

type EnumFrom = (n: number) => [number, () => ReturnType<EnumFrom>];
export const enumFrom: EnumFrom = (n) => [n, () => enumFrom(succ(n))];

export const iterate = (init: number) => (step: (p: number) => number) =>
  [init, () => iterate(step(init))(step)];

export const filter =
  (predicate: (p: number) => boolean) =>
  (aStream: ReturnType<EnumFrom>): ReturnType<EnumFrom> => {
    const [head] = aStream;

    if (predicate(head)) {
      return [head, () => filter(predicate)(aStream[1]())];
    }
    return filter(predicate)(aStream[1]());
  };

export const elemAt =
  (n: number) =>
  (aStream: ReturnType<EnumFrom>): ReturnType<EnumFrom> => {
    if (n === 1) {
      return aStream;
    }
    return elemAt(n - 1)(aStream[1]());
  };

type Env = Record<string, string>;
const extendEnv = (addData: Env, baseEnv: Env) => {
  // self.structuredClone()
  // window.structuredClone()
  // structuredClone();
  return { ...baseEnv, ...addData };
};

const lookupEnv = (key, curentEnv) => {};
