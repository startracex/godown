import Layout from "./components/layout.js";

Layout.define();

export default Layout;

export * from "./components/layout.js";

declare global {
  interface HTMLElementTagNameMap {
    "godown-layout": Layout;
  }
}
