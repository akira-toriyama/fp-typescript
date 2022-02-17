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
