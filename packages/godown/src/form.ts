import Form from "./components/form.js";

Form.define();

export default Form;

export * from "./components/form.js";

declare global {
  interface HTMLElementTagNameMap {
    "godown-form": Form;
  }
}
