import Dragbox from "./component.js";

Dragbox.define();

export default Dragbox;

declare global {
  interface HTMLElementTagNameMap {
    "godown-dragbox": Dragbox;
  }
}
