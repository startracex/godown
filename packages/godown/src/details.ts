import Details from "./components/details.js";

Details.define();

export default Details;

export * from "./components/details.js";

declare global {
  interface HTMLElementTagNameMap {
    "godown-details": Details;
  }
}
