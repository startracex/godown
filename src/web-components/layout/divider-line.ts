import { css, html, property } from "../../deps.js";
import { htmlSlot, type HTMLTemplate } from "../../lib/templates.js";
import { createScope, define, GodownElement } from "../../root.js";

const defineName = "divider-line";
const cssvarScope = createScope(defineName);

/**
 * DividerLine similar to hr.
 */
@define(defineName)
export class DividerLine extends GodownElement {
  /**
   * Enable vertical.
   */
  @property({ type: Boolean }) v = false;

  static styles = [
    css`
      :host {
        ${cssvarScope}--before-length: auto;
        ${cssvarScope}--after-length: auto;
        ${cssvarScope}--breadth: .125em;
        display: block;
        color: currentColor;
        background: none;
      }

      div {
        display: flex;
        align-items: center;
        border-radius: inherit;
        width: 100%;
      }

      hr {
        border-radius: inherit;
        margin: 0;
        border: 0;
        flex: 1;
        background: currentColor;
      }

      .v {
        height: 100%;
        display: flex;
        flex-direction: column;
      }

      .before {
        height: var(${cssvarScope}--breadth);
        max-width: var(${cssvarScope}--before-length);
      }
      .after {
        height: var(${cssvarScope}--breadth);
        max-width: var(${cssvarScope}--after-length);
      }
      .v .before {
        width: var(${cssvarScope}--breadth);
        max-height: var(${cssvarScope}--before-length);
      }
      .v .after {
        width: var(${cssvarScope}--breadth);
        max-height: var(${cssvarScope}--after-length);
      }
    `,
  ];

  protected render(): HTMLTemplate {
    return html`<div class="${this.v ? "v" : ""}">
      <hr class="before" />
      ${htmlSlot()}
      <hr class="after" />
    </div>`;
  }
}

export default DividerLine;

declare global {
  interface HTMLElementTagNameMap {
    "divider-line": DividerLine;
  }
}