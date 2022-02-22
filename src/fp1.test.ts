import * as fp1 from "./fp1";

describe(fp1.identify.name, () => {
  test("動作確認", () => {
    const x = 42;
    expect(fp1.identify(42)).toEqual(x);
  });
});

describe(fp1.add.name, () => {
  test("動作確認", () => {
    expect(fp1.add(4, 7)).toEqual(11);
  });
});

describe(fp1.multiply.name, () => {
  test("動作確認", () => {
    expect(fp1.multiply(5, 6)).toEqual(30);
  });
});

describe(fp1.legacyAge.name, () => {
  test("動作確認", () => {
    expect(fp1.legacyAge(1)).toBeDefined();
  });
});

describe(fp1.age.name, () => {
  test("動作確認", () => {
    expect(fp1.age(2000, 2010)).toEqual(10);
  });
});

describe(fp1.map.name, () => {
  test("動作確認", () => {
    const c = fp1.map([1, 10, 20]);
    expect(c(fp1.succ)).toEqual([2, 11, 21]);
  });
});

describe(fp1.compose.name, () => {
  test("動作確認", () => {
    const f1 = (p: number) => p + 1;
    const f2 = (p: number) => p * 5;
    const computer = fp1.compose(f1, f2);

    expect(computer(10)).toEqual(51);
  });
});

describe(fp1.enumFrom.name, () => {
  test("動作確認", () => {
    const r = fp1.enumFrom(10);

    r.map((v) => console.log({ v }));
  });
});
