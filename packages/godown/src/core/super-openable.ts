import type { PropertyValueMap } from "lit";
import { property } from "lit/decorators.js";

import { GlobalStyle } from "./global-style.js";

class SuperOpenable extends GlobalStyle {
  /**
   * Open the content.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  toggle(to: boolean = !this.open satisfies boolean): void {
    this.open = to;
  }

  close(): void {
    this.open = false;
  }

  show(): void {
    this.open = true;
  }

  protected updated(changedProperties: PropertyValueMap<this>): void {
    const open = changedProperties.get("open");
    if (open !== undefined) {
      this.dispatchEvent(new CustomEvent("change", { detail: this.open, composed: true }));
    }
  }

  protected _handelClick(_: MouseEvent): void {
    this.toggle();
  }
}

export default SuperOpenable;
export { SuperOpenable };
