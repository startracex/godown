import Details from "./components/details.js";

Details.define();

export default Details;

declare global {
  interface HTMLElementTagNameMap {
    "godown-details": Details;
  }
}
