import Select from "./component.js";

Select.define();

export default Select;

declare global {
  interface HTMLElementTagNameMap {
    "godown-select": Select;
  }
}
