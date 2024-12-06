import Progress from "./components/progress.js";

Progress.define();

export default Progress;

export * from "./components/progress.js";

declare global {
  interface HTMLElementTagNameMap {
    "godown-progress": Progress;
  }
}
