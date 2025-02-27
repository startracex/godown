import Tabs from "./component.js";

Tabs.define();

export default Tabs;

declare global {
  interface HTMLElementTagNameMap {
    "godown-tabs": Tabs;
  }
}
