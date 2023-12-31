import { css, define, html, property, query } from "../deps.js";
import ItemsSTD from "./std.js";
import { PropertyValueMap } from "lit";

@define("dialog-item")
export class DialogItem extends ItemsSTD {
  static styles = css`
    :host {
      position: fixed;
      height: 100%;
      width: 100%;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      transition: all 0.3s;
      display: flex;
      visibility: hidden;
      background: rgb(0 0 0 / 0%);
      pointer-events: none;
    }

    :host([open]) {
      visibility: visible;
    }

    :host([open][modal]) {
      pointer-events: all;
      backdrop-filter: blur(0.25px);
      background: rgb(0 0 0 / 20%);
    }

    :host([open]) slot {
      opacity: 1 !important;
      transform: translateY(0) translateX(0) !important;
    }

    div {
      height: 100%;
      width: 100%;
      display: flex;
      transition: inherit;
    }

    slot {
      display: block;
      width: fit-content;
      height: fit-content;
      margin: auto;
      opacity: 0;
      transition: inherit;
      pointer-events: all;
    }

    .center {
      transform: translateY(-15%);
    }

    .top {
      width: 100%;
      margin-top: 0;
      transform: translateY(-15%);
    }

    .right {
      height: 100%;
      margin-right: 0;
      transform: translateX(15%);
    }

    .bottom {
      width: 100%;
      margin-bottom: 0;
      transform: translateY(15%);
    }

    .left {
      height: 100%;
      margin-left: 0;
      transform: translateX(-15%);
    }
  `;
  @property({ type: Boolean, reflect: true }) modal = false;
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: Boolean }) scale = false;
  @property({ type: Number }) gap = 0.1;
  @property({ type: String }) key = "Escape";
  @property({ type: String }) call: "left" | "center" | "right" | "top" | "bottom" = "center";
  @query("div") _div: HTMLDivElement;

  render() {
    return html` <div>
      <slot class="${this.call}"></slot>
    </div>`;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEvent(this, "submit", this._handelSubmit);
    if (this.scale) {
      this.addEvent(this, "wheel", this._handleWheel);
    }
    if (this.key) {
      this.addEvent(document, "keydown", this._handleKeydown.bind(this));
    }
    if (this.open) {
      this.show();
    }
  }

  show() {
    this.open = true;
  }

  showModal() {
    this.modal = true;
    this.show();
  }

  close() {
    this.open = false;
  }

  protected updated(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>) {
    const hasOpen = changedProperties.has("open");
    if (hasOpen) {
      this.dispatchEvent(new CustomEvent(this.open ? "open" : "close"));
    }
  }

  protected _handleWheel(e: any) {
    if (this.scale) {
      const s = this._div.style.transform.match(/scale\((.*)\)/);
      let scale = 1;
      if (s) {
        scale = Number(s[1]);
      }
      if (e.deltaY > 0) {
        scale -= this.gap;
      } else {
        scale += this.gap;
      }
      this._div.style.transform = `scale(${scale})`;
    }
  }

  protected _handleKeydown(e: KeyboardEvent) {
    const keys = this.key.split(/[^a-zA-Z0-9]/).filter((s) => s);
    if (keys.includes(e.key) || keys.includes(e.code)) {
      this.close();
    }
  }

  protected _handelSubmit(e: SubmitEvent) {
    if ((e.target as HTMLFormElement).method === "dialog") {
      this.close();
    }
  }
}

export default DialogItem;
declare global {
  interface HTMLElementTagNameMap {
    "dialog-item": DialogItem;
  }
}
