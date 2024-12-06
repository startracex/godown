import Router from "./components/router.js";

Router.define();

export default Router;

export * from "./components/router.js";

declare global {
  interface HTMLElementTagNameMap {
    "godown-router": Router;
  }
}
