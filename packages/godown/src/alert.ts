import Alert from "./components/alert.js";

Alert.define();

export default Alert;

declare global {
  interface HTMLElementTagNameMap {
    "godown-alert": Alert;
  }
}
