import Dialog from "./components/dialog.js";

Dialog.define();

export default Dialog;

declare global {
  interface HTMLElementTagNameMap {
    "godown-dialog": Dialog;
  }
}
