import { define } from "../../internal/call-define.js";
import Tabs from "./component.js";

export default define(Tabs) as typeof Tabs;

declare global {
  interface HTMLElementTagNameMap {
    "godown-tabs": Tabs;
  }
}
