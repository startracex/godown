import Form from "./component.js";

Form.define();

export default Form;

declare global {
  interface HTMLElementTagNameMap {
    "godown-form": Form;
  }
}
