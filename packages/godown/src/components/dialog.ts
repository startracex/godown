import { type HandlerEvent, attr, godown, htmlSlot, styles } from "@godown/element";
import { type PropertyValues, type TemplateResult, css, html } from "lit";
import { property, query } from "lit/decorators.js";

import { scopePrefix } from "../core/global-style.js";
import { SuperOpenable } from "../core/super-openable.js";
import { type DirectionCardinal, type DirectionCorner, type DirectionCenter } from "../core/direction.js";

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
    ${cssScope}--background-modal: black;
    ${cssScope}--opacity-modal: 0.2;
    width: fit-content;
    display: block;
    margin: auto;
    background: none;
    left: 50%;
    top: 50%;
    position: fixed;
    transform: translate(-50%, -50%);
  }

  :host(:not([open])) {
    visibility: hidden;
  }

  :host([contents]) dialog {
    position: fixed;
  }

  dialog {
    position: relative;
    background: inherit;
  }

  ::backdrop {
    background: var(${cssScope}--background-modal);
    opacity: var(${cssScope}--opacity-modal);
  }
`)
class Dialog extends SuperOpenable {
  /**
   * The direction of the dialog container.
   */
  @property()
  direction: DirectionCardinal | DirectionCorner | DirectionCenter;

  /**
   * Indicates whether the dialog should be displayed as a modal.
   */
  @property({ type: Boolean, reflect: true })
  set modal(value: boolean) {
    this.contents = value;
  }

  get modal(): boolean {
    return this.contents;
  }

  /**
   * The keys will close the dialog when pressed.
   */
  @property()
  key = "Escape";

  /**
   * Indicates whether the modal has been invoked.
   */
  private __modalInvoke = false;

  @query("dialog")
  protected _dialog: HTMLDialogElement;

  protected render(): TemplateResult<1> {
    return html`
      <dialog
        part="root"
        ${attr(this.observedRecord)}
      >
        ${htmlSlot()}
      </dialog>
    `;
  }

  showModal(): void {
    this.modal = true;
    this.__modalInvoke = true;
    this.show();
  }

  attributeChangedCallback(name: string, _old: string | null, value: string | null): void {
    super.attributeChangedCallback(name, _old, value);
    if (name === "open") {
      if (this.open) {
        if (this.modal) {
          this._dialog.showModal();
        } else {
          this._dialog.show();
        }
      } else {
        this._dialog.close();
      }
    }
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
