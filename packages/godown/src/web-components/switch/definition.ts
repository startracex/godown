import Switch from "./component.js";

Switch.define();

export default Switch;

declare global {
  interface HTMLElementTagNameMap {
    "godown-switch": Switch;
  }
}
