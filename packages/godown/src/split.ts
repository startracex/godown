import Split from "./components/split.js";

Split.define();

export default Split;

export * from "./components/split.js";

declare global {
  interface HTMLElementTagNameMap {
    "godown-split-input": Split;
  }
}
