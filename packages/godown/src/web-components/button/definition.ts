import Button from "./component.js";

Button.define();

export default Button;

declare global {
  interface HTMLElementTagNameMap {
    "godown-button": Button;
  }
}
