import { attr, godown, htmlSlot, styles } from "@godown/element";
import { type TemplateResult, css, html } from "lit";
import { property } from "lit/decorators.js";

import { GlobalStyle } from "../core/global-style.js";

const protoName = "layout";

/**
 * {@linkcode Layout} renders main content, top header, bottom footer.
 *
 * If `sticky` is set to `true`, the header will be sticky.
 *
 * Main content will take up the remaining space.
 *
 * Element display should be `(inline-)flex` or `(inline-)grid`.
 *
 * @slot - The main content of the layout.
 * @slot header - The header of the layout.
 * @slot footer - The footer of the layout.
 * @category layout
 */
@godown(protoName)
@styles(css`
  :host {
    width: 100%;
    min-height: 100%;
    flex-direction: column;
    grid-template-rows: auto 1fr auto;
  }

  :host,
  :host([contents]) [part="root"] {
    display: flex;
  }

  [part="root"] {
    display: contents;
  }

  [part="main"] {
    width: 100%;
    flex: 1;
  }

  [part="header"],
  [part="footer"] {
    flex-shrink: 0;
    width: 100%;
  }

  [sticky] header {
    position: sticky;
    top: 0;
  }
`)
class Layout extends GlobalStyle {
  /**
   * @deprecated Omit header slot instead.
   */
  noHeader: boolean;

  /**
   * @deprecated Omit footer slot instead.
   */
  noFooter: boolean;

  /**
   * If `true`, header will sticky.
   */
  @property({ type: Boolean })
  sticky = false;

  protected render(): TemplateResult<1> {
    return html`
      <div
        part="root"
        ${attr(this.observedRecord)}
      >
        <header part="header">${htmlSlot("header")}</header>
        <main part="main">${htmlSlot()}</main>
        <footer part="footer">${htmlSlot("footer")}</footer>
      </div>
    `;
  }
}

export default Layout;
export { Layout };
