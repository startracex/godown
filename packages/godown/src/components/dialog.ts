import { type HandlerEvent, attr, godown, htmlSlot, styles } from "@godown/element";
import { type PropertyValues, type TemplateResult, css, html } from "lit";
import { property } from "lit/decorators.js";

import { cssGlobalVars, scopePrefix } from "../core/global-style.js";
import SuperOpenable from "../core/super-openable.js";

const protoName = "dialog";
const cssScope = scopePrefix(protoName);

/**
 * {@linkcode Dialog} similar to `<dialog>`.
 *
 * Like dialog, it listens for submit events and closes itself when the target method is "dialog".
 *
 * It listens for the keydown event and also closes itself when the {@linkcode key} contained in the key is pressed.
 *
 * @fires change - Fires when the open changes.
 * @category feedback
 */
@godown(protoName)
@styles(css`
  :host {
    ${cssScope}--background: none;
    ${cssScope}--background-modal: black;
    ${cssScope}--opacity-modal: 0.2;
    background: var(${cssScope}--background);
    pointer-events: none;
    visibility: hidden;
    position: fixed;
    z-index: 1;
    inset: 0;
  }

  :host([open]) {
    visibility: visible;
  }

  :host([open][modal]) [part="modal"] {
    pointer-events: all;
    visibility: visible;
    opacity: var(${cssScope}--opacity-modal);
  }

  [part="modal"] {
    visibility: hidden;
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    background: var(${cssScope}--background-modal);
  }

  [part="root"] {
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
    align-items: center;
    justify-content: center;
  }

  [part="container"] {
    pointer-events: all;
    position: absolute;
  }

  [direction^="top"] [part="container"] {
    top: 0;
  }

  [direction^="bottom"] [part="container"] {
    bottom: 0;
  }

  [direction$="right"] [part="container"] {
    right: 0;
  }

  [direction$="left"] [part="container"] {
    left: 0;
  }
`)
class Dialog extends SuperOpenable {
  /**
   * The direction of the dialog container.
   */
  @property()
  direction: string;

  /**
   * Indicates whether the dialog should be displayed as a modal.
   */
  @property({ type: Boolean, reflect: true })
  modal = false;

  /**
   * The keys will close the dialog when pressed.
   */
  @property()
  key = "Escape";

  /**
   * Indicates whether the modal has been invoked.
   */
  private __modalInvoke = false;

  protected render(): TemplateResult<1> {
    return html`
      <div
        part="root"
        ${attr(this.observedRecord)}
      >
        <div part="modal"></div>
        <div part="container">${htmlSlot()}</div>
      </div>
    `;
  }

  showModal(): void {
    if (!this.modal) {
      this.modal = true;
      this.__modalInvoke = true;
    }
    this.show();
  }

  private __submitEvent: EventListenerOrEventListenerObject;
  private __keydownEvent: EventListenerOrEventListenerObject;

  protected updated(changedProperties: PropertyValues): void {
    if (changedProperties.has("open")) {
      if (this.open) {
        this.__submitEvent = this.events.add(this, "submit", this._handelSubmit);
        if (this.key) {
          this.__keydownEvent = this.events.add(document, "keydown", this._handleKeydown.bind(this));
        }
      } else {
        this.events.remove(this, "submit", this.__submitEvent);
        this.events.remove(document, "keydown", this.__keydownEvent);
      }
    }
  }

  protected _handleKeydown(e: KeyboardEvent): void {
    const keys = this.key.split(/[\s,]/);
    if (keys.includes(e.key) || keys.includes(e.code)) {
      e.preventDefault();
      this.close();
    }
  }

  protected _handelSubmit(e: HandlerEvent<HTMLFormElement>): void {
    if (e.target.method === "dialog") {
      e.preventDefault();
      this.close();
    }
  }

  close(): void {
    if (this.__modalInvoke) {
      this.modal = false;
      this.__modalInvoke = false;
    }
    this.open = false;
  }
}

export default Dialog;
export { Dialog };
