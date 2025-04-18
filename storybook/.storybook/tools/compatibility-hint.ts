import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "iconify-icon";
import "godown/alert";
import "godown/details";

const rules: {
  isSupport: () => boolean;
  name: string;
  link: string;
}[] = [
  {
    isSupport: () => Object.hasOwn(HTMLElement.prototype, "popover"),
    name: "popover",
    link: "https://developer.mozilla.org/en-US/docs/Web/API/Popover_API",
  },
  {
    isSupport: () => CSS.supports("color:light-dark(#000,#fff)"),
    name: "light-dark()",
    link: "https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark",
  },
  {
    isSupport: () => CSS.supports("position-area:top"),
    name: "anchor positioning",
    link: "https://developer.mozilla.org/en-US/docs/Web/CSS/position-area",
  },
];

@customElement("compatibility-hint")
export class CompatibilityHint extends LitElement {
  static styles = [
    css`
      :host {
        z-index: 5;
        position: fixed;
        bottom: 0;
        right: 0;
        padding: 0 1em 0.5em 0;
      }

      @media screen and (max-width: 600px) {
        :host {
          bottom: 2em;
        }
      }

      #details {
        height: fit-content;
      }

      #summary {
        gap: 0.3em;
        display: flex;
        align-items: center;
        font-weight: bold;
      }

      .hint {
        margin-top: 0.5em;
        text-align: right;
      }

      .icon {
        font-size: 1.5em;
      }
    `,
  ];

  render() {
    const unSupports = rules.filter(({ isSupport }) => !isSupport());
    if (!unSupports.length) {
      return null;
    }
    const alertContent = unSupports.map(({ name, link }) => {
      return html`
        <div class="hint">
          <a
            href="${link}"
            target="_blank"
          >
            ${name}
          </a>
          is not supported in this browser.
        </div>
      `;
    });
    return html`
      <godown-alert>
        <godown-details
          open
          id="details"
        >
          <div
            slot="summary"
            id="summary"
          >
            <iconify-icon
              class="icon"
              icon="fluent:warning-20-regular"
            ></iconify-icon>
            Compatibility Hint (${unSupports.length})
          </div>
          <div>${alertContent}</div>
        </godown-details>
      </godown-alert>
    `;
  }
}
