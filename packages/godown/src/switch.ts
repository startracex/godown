import Switch from "./components/switch.js";

Switch.define();

export default Switch;

export * from "./components/switch.js";

declare global {
  interface HTMLElementTagNameMap {
    "godown-switch": Switch;
  }
}
