import { nothing } from "lit";

interface RenderIf {
  <A, B>(value: unknown, a: A, b: B): A | B;
  <A>(value: unknown, a: A): A;
}

export const conditionIf: RenderIf = <A, B>(value: unknown, a: A, b?: B) => (value && a) || b || nothing;
