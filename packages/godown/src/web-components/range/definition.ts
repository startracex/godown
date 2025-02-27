import Range from "./component.js";

Range.define();

export default Range;

declare global {
  interface HTMLElementTagNameMap {
    "godown-range": Range;
  }
}
