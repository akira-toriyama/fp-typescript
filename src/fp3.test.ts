import * as fp3 from "./fp3";

describe("id", () => {
  test(".", () => {
    expect(fp3.id.unit(1)).toEqual(1);

    const v = 2;
    const r = fp3.id.flatMap(fp3.id.unit(v))(fp3.addOne);
    expect(r).toEqual(fp3.addOne(v));
  });
});

describe("maybe, Maybe", () => {
  test("1", () => {
    const one = fp3.just(1);
    const two = fp3.nothing("");

    const r = fp3.add(one, two);

    const rr = fp3.getOrElse(r)("xx");
    console.log({ rr });
  });
});
