import { IconElement } from "./element.js";
IconElement.define("f7-icon");
export { IconElement as default, IconElement as F7Icon };

declare global {
  interface HTMLElementTagNameMap {
    "f7-icon": IconElement;
  }
}
