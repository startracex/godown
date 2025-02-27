import Dialog from "./component.js";

Dialog.define();

export default Dialog;

declare global {
  interface HTMLElementTagNameMap {
    "godown-dialog": Dialog;
  }
}
