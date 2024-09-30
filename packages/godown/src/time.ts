import Time from "./components/time.js";

Time.define();

export default Time;

export * from "./components/time.js";

declare global {
  interface HTMLElementTagNameMap {
    "godown-time": Time;
  }
}
