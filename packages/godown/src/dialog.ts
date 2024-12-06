import Dialog from "./components/dialog.js";

Dialog.define();

export default Dialog;

export * from "./components/dialog.js";

declare global {
  interface HTMLElementTagNameMap {
    "godown-dialog": Dialog;
  }
}
