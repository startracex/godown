import { attr, godown, htmlSlot, styles } from "@godown/element";
import { css, html, type TemplateResult } from "lit";
import { property } from "lit/decorators.js";

import { GlobalStyle } from "../core/global-style.js";

const protoName = "layout";

/**
 * {@linkcode Layout} renders slot and optional top header, bottom footer.
 *
 * @slot - The main content of the layout.
 * @slot header - The header of the layout.
 * @slot footer - The footer of the layout.
 * @category layout
 */
@godown(protoName)
@styles(css`
  :host,
  :host([contents]) [part="root"] {
    min-height: 100%;
    display: flex;
    flex-direction: column;
  }

  [part="root"] {
    display: contents;
  }

  [sticky] header {
    position: sticky;
    top: 0;
    z-index: 1;
  }

  [part="main"] {
    position: relative;
    flex: 1;
    width: 100%;
  }

  header,
  main,
  footer {
    width: 100%;
  }
`)
class Layout extends GlobalStyle {
  /**
   * If true, remove the header slot.
   */
  @property({ type: Boolean })
  noHeader = false;

  /**
   * If true, remove the footer slot.
   */
  @property({ type: Boolean })
  noFooter = false;

  /**
   * If true, header will sticky.
   */
  @property({ type: Boolean })
  sticky = false;

  protected render(): TemplateResult<1> {
    return html`<div part="root" ${attr(this.observedRecord)}>
      ${!this.noHeader ? html`<header part="header">${htmlSlot("header")}</header>` : ""}
      <main part="main">${htmlSlot()}</main>
      ${!this.noFooter ? html`<footer part="footer">${htmlSlot("footer")}</footer>` : ""}
    </div>`;
  }
}

export default Layout;
export { Layout };
