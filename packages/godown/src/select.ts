import Select from "./components/select.js";

Select.define();

export default Select;

export * from "./components/select.js";

declare global {
  interface HTMLElementTagNameMap {
    "godown-select": Select;
  }
}
