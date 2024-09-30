import Form from "./components/form.js";

Form.define();

export default Form;

declare global {
  interface HTMLElementTagNameMap {
    "godown-form": Form;
  }
}
