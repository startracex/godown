import Dragbox from "./components/dragbox.js";

Dragbox.define();

export default Dragbox;

declare global {
  interface HTMLElementTagNameMap {
    "godown-dragbox": Dragbox;
  }
}
