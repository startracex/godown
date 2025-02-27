import Details from "./component.js";

Details.define();

export default Details;

declare global {
  interface HTMLElementTagNameMap {
    "godown-details": Details;
  }
}
