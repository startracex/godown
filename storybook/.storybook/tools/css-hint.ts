import { css, html, LitElement } from "lit";
import "godown/alert";

const supports: {
  condition: string;
  name: string;
  link: string;
}[] = [
  {
    condition: "color:light-dark(#000,#fff)",
    name: "light-dark()",
    link: "https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark",
  },
];

export class CssHint extends LitElement {
  static styles = [
    css`
      :host {
        z-index: 5;
        position: fixed;
        bottom: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        gap: 0.5em;
        padding: 0 1em 0.5em 0;
        color: white;
        color-scheme: dark;
      }

      @media screen and (max-width: 600px) {
        :host {
          bottom: 2em;
        }
      }
    `,
  ];

  render() {
    return supports.map(({ condition, name, link }) => {
      return CSS.supports(condition)
        ? null
        : html`
            <godown-alert>
              <div>
                <a
                  href="${link}"
                  target="_blank"
                >
                  ${name}
                </a>
                is not supported in this browser.
              </div>
            </godown-alert>
          `;
    });
  }
}

customElements.define("css-hint", CssHint);
