import * as fp1 from "./fp1";

describe("identify", () => {
  test("動作確認", () => {
    const x = 42;
    expect(fp1.identify(42)).toEqual(x);
  });
});

describe("add", () => {
  test("動作確認", () => {
    expect(fp1.add(4, 7)).toEqual(11);
  });
});

describe("multiply", () => {
  test("動作確認", () => {
    expect(fp1.multiply(5, 6)).toEqual(30);
  });
});

describe("legacyAge", () => {
  test("動作確認", () => {
    expect(fp1.legacyAge(1)).toBeDefined();
  });
});

describe("age", () => {
  test("動作確認", () => {
    expect(fp1.age(2000, 2010)).toEqual(10);
  });
});

describe("map", () => {
  test("動作確認", () => {
    const c = fp1.map([1, 10, 20]);
    expect(c(fp1.succ)).toEqual([2, 11, 21]);
  });
});

describe("compose", () => {
  test("動作確認", () => {
    const f1 = (p: number) => p + 1;
    const f2 = (p: number) => p * 5;
    const computer = fp1.compose(f1, f2);

    expect(computer(10)).toEqual(51);
  });
});

describe("enumFrom", () => {
  test("動作確認", () => {
    const v = 10;
    const [r] = fp1.enumFrom(v);
    expect(r).toEqual(v);
  });
});

describe("iterate", () => {
  test("動作確認", () => {
    const v = 10;
    const [r] = fp1.iterate(v)(fp1.succ);
    expect(r).toEqual(v);
  });
});

describe("filter", () => {
  test("動作確認", () => {
    const [r] = fp1.filter((p) => p % 5 === 1)(fp1.enumFrom(7));
    expect(r).toEqual(11);
  });
});

describe("elemAt", () => {
  test("動作確認", () => {
    const p1 = 5;
    const p2 = 7;
    const [r] = fp1.elemAt(p1)(fp1.enumFrom(p2));

    expect(r).toEqual(p1 + p2 - 1);
  });
});

describe("unit", () => {
  test("動作確認", () => {
    const r = fp1.unit(fp1.yen());
    expect(r).toEqual("円");
  });
});

describe("waName", () => {
  test("動作確認", () => {
    const r = fp1.waName(fp1.yen());
    expect(r).toEqual("えん");
  });
});

describe("sum2", () => {
  test("動作確認", () => {
    const a = [1, 2, 3];
    expect(fp1.sum1(a)).toEqual(6);
  });
});

describe("sum2", () => {
  test("動作確認", () => {
    const a = [1, 2, 3];
    expect(fp1.sum2(a)).toEqual(6);
  });
});

describe("lazyMultiply", () => {
  test("動作確認", () => {
    fp1.lazyMultiply(
      // 値を関数でラップ
      // 引数の無い関数で値がラップされた構造を thunk と呼ぶ
      () => 0,
      () => 10
    );
  });
});
