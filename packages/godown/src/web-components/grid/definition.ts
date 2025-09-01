import { define } from "../../internal/call-define.js";
import Grid from "./component.js";

export default define(Grid) as typeof Grid;

declare global {
  interface HTMLElementTagNameMap {
    "godown-grid": Grid;
  }
}
