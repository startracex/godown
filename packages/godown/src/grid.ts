import Grid from "./components/grid.js";

Grid.define();

export default Grid;

export * from "./components/grid.js";

declare global {
  interface HTMLElementTagNameMap {
    "godown-grid": Grid;
  }
}
