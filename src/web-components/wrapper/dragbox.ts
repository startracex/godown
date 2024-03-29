import { css, html, property } from "../../.deps.js";
import { define } from "../../decorators/define.js";
import { htmlSlot, type HTMLTemplate } from "../../lib/templates.js";
import { GodownElement } from "../../supers/root.js";

const defineName = "dragbox";

/**
 * {@linkcode Dragbox} does not extend beyond the range of {@linkcode Dragbox.offsetsWidth} and {@linkcode Dragbox.offsetsHeight}.
 */
@define(defineName)
export class Dragbox extends GodownElement {
  drag: boolean;
  t: number;
  l: number;
  cx: number;
  cy: number;

  /**
   * Position x.
   */
  @property() x = "auto";
  /**
   * Position y.
   */
  @property() y = "auto";

  static styles = [
    css`
      :host {
        position: relative;
        display: inline-flex;
      }
    `,
  ];

  protected render(): HTMLTemplate {
    return html`<div @mousedown="${this._handleDragStart}" @mouseup="${this._handleDragEnd}">${htmlSlot()}</div>`;
  }

  protected firstUpdated() {
    this.reset();
    this.addEvent(document, "mouseup", this._handleDragEnd.bind(this));
  }

  protected _handleDragStart(e: MouseEvent) {
    this.cx = e.clientX;
    this.cy = e.clientY;
    this.t = this.offsetTop;
    this.l = this.offsetLeft;
    this.drag = true;
    this.addEvent(document, "mousemove", this._handleDrag.bind(this), undefined, "0");
  }

  protected _handleDragEnd() {
    this.drag = false;
    this.removeEvent(document, "mousemove", "0");
  }

  protected _handleDrag(e: MouseEvent) {
    if (!this.drag) {
      return;
    }
    const nl = e.clientX - (this.cx - this.l);
    const nt = e.clientY - (this.cy - this.t);
    if (nl < 0) {
      this.style.left = "0";
    } else if (nl < this.offsetsWidth - this.offsetWidth) {
      this.style.left = `${nl}px`;
    } else {
      this.style.left = `${this.offsetsWidth - this.offsetWidth}"px"`;
    }
    if (nt < 0) {
      this.style.top = "0";
    } else if (nt < this.offsetsHeight - this.offsetHeight) {
      this.style.top = `${nt}px`;
    } else {
      this.style.top = `${this.offsetsHeight - this.offsetHeight}px`;
    }
  }

  reset() {
    this.style.left = this.x || "0";
    this.style.top = this.y || "0";
    if (this.offsetLeft > this.offsetsWidth - this.offsetWidth) {
      this.style.left = `${this.offsetsWidth - this.offsetWidth}px`;
    }
    if (this.offsetTop > this.offsetsHeight - this.offsetHeight) {
      this.style.top = `${this.offsetsHeight - this.offsetHeight}px`;
    }
  }
}

export default Dragbox;
declare global {
  interface HTMLElementTagNameMap {
    "drag-box": Dragbox;
    "g-dragbox": Dragbox;
  }
}
