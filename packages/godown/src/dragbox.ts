import Dragbox from "./components/dragbox.js";

Dragbox.define();

export default Dragbox;

export * from "./components/dragbox.js";

declare global {
  interface HTMLElementTagNameMap {
    "godown-dragbox": Dragbox;
  }
}
