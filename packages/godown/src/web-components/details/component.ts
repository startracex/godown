import { attr, godown, htmlSlot, styles } from "@godown/element";
import svgCaretDown from "../../internal/icons/caret-down.js";
import { type PropertyValueMap, type TemplateResult, css, html } from "lit";
import { property } from "lit/decorators.js";

import GlobalStyle, { scopePrefix } from "../../internal/global-style.js";

const protoName = "details";

const cssScope = scopePrefix(protoName);

/**
 * {@linkcode Details} similar to `<details>`.
 *
 * @slot summary - Details summary (trigger).
 * @slot - Details content.
 * @fires change - Fires when the open changes.
 * @category display
 */
@godown(protoName)
@styles(css`
  :host {
    ${cssScope}--icon-deg-open: 0deg;
    ${cssScope}--icon-deg-close: 90deg;
    display: block;
    transition: 0.3s;
  }

  [part="root"] {
    position: relative;
  }

  [part="title"] {
    direction: ltr;
    height: 100%;
    display: grid;
    align-items: center;
    justify-content: space-between;
    grid-template-columns: auto auto;
    transition: inherit;
    overflow: hidden;
  }

  [part="details"] {
    overflow: hidden;
    display: grid;
    grid-template-rows: 0fr;
    transition: inherit;
  }

  :host([open]) [part="details"] {
    grid-template-rows: 1fr;
  }

  [float] [part="details"] {
    position: absolute;
    top: 100%;
    width: 100%;
  }

  [part] {
    transition: inherit;
    transition-property: transform, grid-template-rows;
  }

  [part="icon"] {
    display: flex;
    backface-visibility: hidden;
    transform: rotate(var(${cssScope}--icon-deg-close));
  }

  :host([open]) [part="icon"] {
    transform: rotate(var(${cssScope}--icon-deg-open));
  }
`)
class Details extends GlobalStyle {
  @property({ type: Boolean, reflect: true })
  open = false;

  @property({ type: Boolean })
  float = false;

  @property({ type: Boolean })
  fill = false;

  @property()
  summary = "";

  protected render(): TemplateResult<1> {
    return html`
      <dl
        part="root"
        ${attr(this.observedRecord)}
      >
        <dt
          part="title"
          @click="${() => this.toggle()}"
        >
          <span part="summary">${htmlSlot("summary", this.summary)}</span>
          <span part="icon">${htmlSlot("icon", svgCaretDown())}</span>
        </dt>
        <dd
          part="details"
          @click=${this.fill ? () => this.toggle() : null}
        >
          <div style="min-height: 0;">${htmlSlot()}</div>
        </dd>
      </dl>
    `;
  }

  protected updated(changedProperties: PropertyValueMap<this>): void {
    const open = changedProperties.get("open");
    if (open !== undefined) {
      this.dispatchCustomEvent("change", open);
    }
  }

  toggle(to?: boolean): void {
    this.open = to ?? !this.open;
  }

  close(): void {
    this.open = false;
  }

  show(): void {
    this.open = true;
  }
}

export default Details;
export { Details };
