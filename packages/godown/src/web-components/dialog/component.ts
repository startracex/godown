import { type HandlerEvent, godown, htmlSlot, queryPart, styles } from "@godown/element";
import { type PropertyValues, type TemplateResult, css, html } from "lit";
import { property } from "lit/decorators.js";

import GlobalStyle, { scopePrefix } from "../../internal/global-style.js";

const protoName = "dialog";
const cssScope = scopePrefix(protoName);

/**
 * {@linkcode Dialog} similar to `<dialog>`.
 *
 * Like dialog, it listens for submit events and closes itself when the target method is "dialog".
 *
 * Previous versions of Dialog did not contain triggers.
 * Therefore, unlike Tooltip which uses the default slot as the trigger.
 * Dialog needs to use slot="trigger" as the trigger instead of an element without a slot name.
 *
 * @fires change - Fires when the open changes.
 * @slot trigger - The trigger element.
 * @slot - The dialog content.
 * @category feedback
 */
@godown(protoName)
@styles(css`
  :host {
    ${cssScope}--background-modal: black;
    ${cssScope}--opacity-modal: 0.2;
    width: fit-content;
    display: block;
    background: none;
  }

  dialog {
    position: relative;
    background: none;
    z-index: 1;
    left: 50%;
    top: 50%;
    position: fixed;
    transform: translate(-50%, -50%);
  }

  ::backdrop {
    background: var(${cssScope}--background-modal);
    opacity: var(${cssScope}--opacity-modal);
  }
`)
class Dialog extends GlobalStyle {
  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: Boolean, reflect: true })
  modal = false;

  /**
   * Indicates whether the modal has been invoked.
   */
  private __modalInvoke = false;

  @queryPart("dialog")
  protected _dialog: HTMLDialogElement;

  protected render(): TemplateResult<1> {
    return html`
      <div
        part="root"
        @click=${this.show}
      >
        ${htmlSlot("trigger")}
      </div>
      <dialog
        part="dialog"
        role="dialog"
      >
        ${htmlSlot("dialog")}${htmlSlot()}
      </dialog>
    `;
  }

  showModal(): void {
    this.modal = true;
    this.__modalInvoke = true;
    this.show();
  }

  show(): void {
    this.open = true;
  }

  close(): void {
    this.open = false;
  }

  toggle(to?: boolean): void {
    this.open = to ?? !this.open;
  }

  private __submitEvent: EventListenerOrEventListenerObject;
  private __keydownEvent: EventListenerOrEventListenerObject;

  protected updated(changedProperties: PropertyValues): void {
    if (changedProperties.has("open")) {
      if (this.open) {
        if (this.modal) {
          this._dialog.showModal();
        } else {
          this._dialog.show();
        }
        this.__submitEvent = this.events.add(this, "submit", this._handelSubmit);

        this.__keydownEvent = this.events.add(document, "keydown", this._handleKeydown.bind(this));
      } else {
        if (this.__modalInvoke) {
          this.modal = false;
          this.__modalInvoke = false;
        }
        this._dialog.close();
        this.events.remove(this, "submit", this.__submitEvent);
        this.events.remove(document, "keydown", this.__keydownEvent);
      }
    }
  }

  protected _handleKeydown(e: KeyboardEvent): void {
    if (e.key === "Escape") {
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
}

export default Dialog;
export { Dialog };
