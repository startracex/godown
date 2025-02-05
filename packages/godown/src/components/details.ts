import { attr, godown, htmlSlot, styles } from "@godown/element";
import svgCaretDown from "@godown/f7-icon/icons/chevron-down.js";
import { type TemplateResult, css, html } from "lit";
import { property } from "lit/decorators.js";

import { scopePrefix } from "../core/global-style.js";
import { SuperOpenable } from "../core/super-openable.js";

const protoName = "details";

const cssScope = scopePrefix(protoName);

/**
 * {@linkcode Details} similar to `<details>`.
 *
 * @slot summary - Details summary if no `summary` is provided.
 * @slot - Details content.
 * @fires change - Fires when the open changes.
 * @category display
 */
@godown(protoName)
@styles(css`
  :host {
    ${cssScope}--icon-deg-open: 0deg;
    ${cssScope}--icon-deg-close: 90deg;
    ${cssScope}--icon-space: .22em;
    display: block;
    transition: 0.3s;
  }

  [part="root"] {
    height: 100%;
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
    padding: var(${cssScope}--icon-space);
  }

  :host([open]) [part="icon"] {
    transform: rotate(var(${cssScope}--icon-deg-open));
  }
`)
class Details extends SuperOpenable {
  /**
   * Determines whether the details component should fill the available space.
   */
  @property({ type: Boolean })
  fill = false;

  /**
   * The summary text to display in the details component.
   */
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
          <span part="summary">${this.summary || htmlSlot("summary")}</span>
          <span part="icon">${svgCaretDown()}</span>
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
}

export default Details;
export { Details };
