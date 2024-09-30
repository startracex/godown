import Grid from "./components/grid.js";

Grid.define();

export default Grid;

declare global {
  interface HTMLElementTagNameMap {
    "godown-grid": Grid;
  }
}
