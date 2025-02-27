import Time from "./component.js";

Time.define();

export default Time;

declare global {
  interface HTMLElementTagNameMap {
    "godown-time": Time;
  }
}
