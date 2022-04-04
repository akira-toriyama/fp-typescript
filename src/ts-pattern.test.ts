import { f } from "./ts-pattern";

describe("f", () => {
  test("x", () => {
    const r = f({ type: "a", aa: "ok-" });

    console.log(r);
  });
});
