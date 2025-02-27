import Alert from "./component.js";

Alert.define();

export default Alert;

declare global {
  interface HTMLElementTagNameMap {
    "godown-alert": Alert;
  }
}
