import Progress from "./component.js";

Progress.define();

export default Progress;

declare global {
  interface HTMLElementTagNameMap {
    "godown-progress": Progress;
  }
}
