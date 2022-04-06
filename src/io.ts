const getItem = (k: string) => localStorage.getItem(k);
const setItem = (k: string, v: string) => localStorage.setItem(k, v);
const toUpperCase = (v: string | null) => (v || "").toUpperCase();

type Effect<T> = () => T;

class IO<A> {
  constructor(private _effect: Effect<A>) {}

  static of<T>(val: T) {
    return new IO(() => val);
  }

  map<B>(f: (val: A) => B): IO<B> {
    return new IO(() => f(this._effect()));
  }

  flatMap<B>(f: (val: A) => IO<B>): IO<B> {
    return new IO(() => f(this._effect())._effect());
  }

  eval() {
    return this._effect();
  }
}

const r = IO.of(getItem("kk")).map(toUpperCase).eval();
