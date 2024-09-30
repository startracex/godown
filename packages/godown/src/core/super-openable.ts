import { type PropertyValueMap } from "lit";
import { property } from "lit/decorators.js";

import { GlobalStyle } from "./global-style.js";

class SuperOpenable extends GlobalStyle {
  /**
   * Open the content.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  toggle(to = !this.open) {
    this.open = to;
  }

  close() {
    this.open = false;
  }

  show() {
    this.open = true;
  }

  protected updated(changedProperties: PropertyValueMap<this>) {
    const open = changedProperties.get("open");
    if (open !== undefined) {
      this.dispatchEvent(new CustomEvent("change", { detail: this.open }));
    }
  }

  // eslint-disable-next-line
  protected _handelClick(_: MouseEvent) {
    this.toggle();
  }
}

export default SuperOpenable;

export type Direction4 = "left" | "right" | "top" | "bottom";

export type Direction5 = Direction4 | "center";

export type Direction8 =
  | Direction4
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

export type Direction9 = Direction8 | Direction5;
