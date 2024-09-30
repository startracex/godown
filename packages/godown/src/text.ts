import Text from "./components/text.js";

Text.define();

export default Text;

export * from "./components/text.js";

declare global {
  interface HTMLElementTagNameMap {
    "godown-text": Text;
  }
}
