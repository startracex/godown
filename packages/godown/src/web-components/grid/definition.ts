import Grid from "./component.js";

Grid.define();

export default Grid;

declare global {
  interface HTMLElementTagNameMap {
    "godown-grid": Grid;
  }
}
