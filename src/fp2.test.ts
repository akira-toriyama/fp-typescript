import * as fp2 from "./fp2";

describe("multipleOf", () => {
  test(".", () => {
    const multipleOfTwo = fp2.multipleOf(2);

    // 4は2の約数か？
    expect(multipleOfTwo(4)).toEqual(true);

    // 5は2の約数か？
    expect(multipleOfTwo(5)).toEqual(false);
  });
});

describe("flip", () => {
  test(".", () => {
    const fn = fp2.flip(fp2.multipleOf);
    const r = fn(2);
  });
});

describe("even, odd", () => {
  test(".", () => {
    expect(fp2.even(4)).toEqual(true);
    expect(fp2.odd(3)).toEqual(true);
  });
});

describe("factorial", () => {
  test(".", () => {
    const r = fp2.factorial(5);
    expect(r).toEqual(120);
  });
});
