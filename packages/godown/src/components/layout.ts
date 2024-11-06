import { godown } from "@godown/element/decorators/godown.js";
import { styles } from "@godown/element/decorators/styles.js";
import { classList } from "@godown/element/directives/class-list.js";
import { htmlSlot } from "@godown/element/directives/html-slot.js";
import { css, html } from "lit";
import { property } from "lit/decorators.js";

import { GlobalStyle } from "../core/global-style.js";

const protoName = "layout";

/**
 * {@linkcode NavLayout} renders slot and optional top header, bottom footer.
 *
 * @slot - The main content of the layout.
 *
 * @slot header - The header of the layout.
 *
 * @slot footer - The footer of the layout.
 *
 * @category layout
 */
@godown(protoName)
@styles(
  css`
    :host {
      min-height: 100%;
      display: flex;
      flex-direction: column;
    }

    .sticky {
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
  `,
)
class NavLayout extends GlobalStyle {
  /**
   * If true, hide the header slot.
   */
  @property({ type: Boolean })
  noHeader: boolean;
  /**
   * If true, hide the footer slot.
   */
  @property({ type: Boolean })
  noFooter: boolean;

  /**
   * If true, header will sticky.
   */
  @property({ type: Boolean })
  sticky: boolean;

  protected render() {
    return html`${
      !this.noHeader
        ? html`<header part="header" class="${classList({ sticky: this.sticky })}">${htmlSlot("header")}</header>`
        : ""
    }
    <main part="main">${htmlSlot()}</main>
    ${
      !this.noFooter
        ? html`<footer part="footer">${htmlSlot("footer")}</footer>`
        : ""
    }`;
  }
}

export default NavLayout;
