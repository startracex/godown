import Skeleton from "./components/skeleton.js";

Skeleton.define();

export default Skeleton;

export * from "./components/skeleton.js";

declare global {
  interface HTMLElementTagNameMap {
    "godown-skeleton": Skeleton;
  }
}
