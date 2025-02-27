import Input from "./component.js";

Input.define();

export default Input;

declare global {
  interface HTMLElementTagNameMap {
    "godown-input": Input;
  }
}
