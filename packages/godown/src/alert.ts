import Alert from "./components/alert.js";

Alert.define();

export default Alert;

export * from "./components/alert.js";

declare global {
  interface HTMLElementTagNameMap {
    "godown-alert": Alert;
  }
}
