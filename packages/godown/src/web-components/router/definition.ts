import Router from "./component.js";

Router.define();

export default Router;

declare global {
  interface HTMLElementTagNameMap {
    "godown-router": Router;
  }
}
