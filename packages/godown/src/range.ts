import Range from "./components/range.js";

Range.define();

export default Range;

export * from "./components/range.js";

declare global {
  interface HTMLElementTagNameMap {
    "godown-range-input": Range;
  }
}
