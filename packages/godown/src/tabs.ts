import Tabs from "./components/tabs.js";

Tabs.define();

export default Tabs;

export * from "./components/tabs.js";

declare global {
  interface HTMLElementTagNameMap {
    "godown-tabs": Tabs;
  }
}
