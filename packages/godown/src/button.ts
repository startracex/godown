import Button from "./components/button.js";

Button.define();

export default Button;

export * from "./components/button.js";

declare global {
  interface HTMLElementTagNameMap {
    "godown-button": Button;
  }
}
