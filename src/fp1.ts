/**
 * 恒等関数
 * 入力値と同じ値を返す関数
 */
export const identify = <T>(x: T) => x;

export const succ = (n: number) => n + 1;
const prev = (n: number) => n - 1;
export const add = (x: number, y: number) =>
  y === 0 ? x : add(succ(x), prev(y));
