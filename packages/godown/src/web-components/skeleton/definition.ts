import { define } from "../../internal/call-define.js";
import Skeleton from "./component.js";

export default define(Skeleton) as typeof Skeleton;

declare global {
  interface HTMLElementTagNameMap {
    "godown-skeleton": Skeleton;
  }
}
