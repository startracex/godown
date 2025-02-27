import Layout from "./component.js";

Layout.define();

export default Layout;

declare global {
  interface HTMLElementTagNameMap {
    "godown-layout": Layout;
  }
}
