import { define } from "../../internal/call-define.js";
import Layout from "./component.js";

export default define(Layout) as typeof Layout;

declare global {
  interface HTMLElementTagNameMap {
    "godown-layout": Layout;
  }
}
