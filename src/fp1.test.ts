import { identify, add } from "./fp1";

describe("identify", () => {
  test("動作確認", () => {
    const x = 42;
    expect(identify(42)).toEqual(x);
  });
});

describe("add", () => {
  test("動作確認", () => {
    expect(add(4, 7)).toEqual(11);
  });
});
