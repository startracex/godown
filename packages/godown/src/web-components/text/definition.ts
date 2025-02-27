import Text from "./component.js";

Text.define();

export default Text;

declare global {
  interface HTMLElementTagNameMap {
    "godown-text": Text;
  }
}
