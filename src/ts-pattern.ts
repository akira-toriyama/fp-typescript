import { match, P } from "ts-pattern";

type A = { type: "a"; aa: string };
type B = { type: "b"; bb: string };
type C = { type: "c"; cc: string };

type Result = A | B | C;

export const f = (result: Result): string =>
  match(result)
    .with({ type: "a" }, (r) => r.aa)

    .when(
      (x) => false,
      (x) => "-when-"
    )
    .with({ type: "b" }, (r) => r.bb)
    .with({ type: "c" }, (r) => r.cc)
    .exhaustive();
