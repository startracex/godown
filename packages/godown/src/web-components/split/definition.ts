import Split from "./component.js";

Split.define();

export default Split;

declare global {
  interface HTMLElementTagNameMap {
    "godown-split": Split;
  }
}
