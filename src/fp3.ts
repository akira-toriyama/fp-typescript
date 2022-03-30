// unit 関数
// モナドインスタンス生成関数
// オブジェクト指向のコンストラクタ

// flatMap 関数
// 処理を合成するための関数

export const addOne = (p: number) => p + 1;

export const id = {
  unit: <T>(v: T) => v,
  flatMap:
    <T>(m: T) =>
    (f: (p: T) => T) =>
      f(m),
};

// Maybe
// --------------------------------------------

// Maybeの代数的構造
// -------

// @ts-expect-error
export const match = (exp, pattern) => exp(pattern);

export const just =
  <T>(value: T) =>
  // @ts-expect-error
  (pattern) =>
    pattern.just(value);

export const nothing =
  <T>(_: T) =>
  // @ts-expect-error
  (pattern) =>
    pattern.nothing(_);
// -------

export const MaybeMonad = {
  // @ts-expect-error
  unit: (value) => just(value),
  // @ts-expect-error
  flatMap: (m) => (f) =>
    match(m, {
      // @ts-expect-error
      just: (value) => f(value),
      // @ts-expect-error
      nothing: (_) => nothing(_),
    }),
};

// 足し算
// @ts-expect-error
export const add = (mA, mB) =>
  // @ts-expect-error
  MaybeMonad.flatMap(mA)((a) =>
    // @ts-expect-error
    MaybeMonad.flatMap(mB)((b) => MaybeMonad.unit(a + b))
  );

// @ts-expect-error
export const getOrElse = (m) => {
  // @ts-expect-error
  return (alternate) => {
    return match(m, {
      // @ts-expect-error
      just: (v) => v,
      // @ts-expect-error
      nothing: (_) => alternate,
    });
  };
};
// --------------------------------------------
