import Input from "./components/input.js";

Input.define();

export default Input;

export * from "./components/input.js";

declare global {
  interface HTMLElementTagNameMap {
    "godown-input": Input;
  }
}
