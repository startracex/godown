import Skeleton from "./component.js";

Skeleton.define();

export default Skeleton;

declare global {
  interface HTMLElementTagNameMap {
    "godown-skeleton": Skeleton;
  }
}
