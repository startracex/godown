import Button from "./components/button.js";

Button.define();

export default Button;

declare global {
  interface HTMLElementTagNameMap {
    "godown-button": Button;
  }
}
