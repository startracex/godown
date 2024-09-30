import { godown } from "@godown/element/decorators/godown.js";
import { styles } from "@godown/element/decorators/styles.js";
import { htmlStyle } from "@godown/element/directives/html-style.js";
import { css, html } from "lit";
import { property } from "lit/decorators.js";

import { cssGlobalVars, GlobalStyle, scopePrefix } from "../core/global-style.js";

const defineName = "breath";
const cssScope = scopePrefix(defineName);

/**
 * {@linkcode Breath} render the text with a breathing effect.
 *
 * Dynamically generate a breathing effect based on the length of the split text.
 *
 * If there is not enough CSS variable, overrun elements will use the.
 *
 * godown was a css library in its earliest days,
 * and this is the component version of its first effect.
 *
 * Inspired by Vercel home page (2023).
 *
 * @category effect
 */
@godown(defineName)
@styles(
  css`
    :host {
      ${cssScope}--deg: 60deg;
      ${cssScope}--1-1: var(${cssGlobalVars._colors.red[5]});
      ${cssScope}--1-2: var(${cssGlobalVars._colors.yellow[5]});
      ${cssScope}--2-1: var(${cssGlobalVars._colors.green[5]});
      ${cssScope}--2-2: var(${cssGlobalVars._colors.purple[5]});
      ${cssScope}--3-1: var(${cssGlobalVars._colors.blue[5]});
      ${cssScope}--3-2: var(${cssGlobalVars._colors.pink[5]});
      ${cssScope}--1: linear-gradient(var(${cssScope}--deg), var(${cssScope}--1-1), var(${cssScope}--1-2));
      ${cssScope}--2: linear-gradient(var(${cssScope}--deg), var(${cssScope}--2-1), var(${cssScope}--2-2));
      ${cssScope}--3: linear-gradient(var(${cssScope}--deg), var(${cssScope}--3-1), var(${cssScope}--3-2));
    }
  `,
  css`
    :host {
      display: flex;
      margin: auto;
      width: -moz-fit-content;
      width: fit-content;
      font-size: 2em;
      align-items: center;
    }

    ::selection {
      background: none;
    }

    .rel {
      position: relative;
      font-weight: 800;
      font-size: inherit;
      letter-spacing: -0.05em;
    }
  `,
  css`
    .nocolor,
    .colorful {
      padding: 0 0.05em;
      box-sizing: border-box;
      display: inline-block;
      animation-iteration-count: infinite;
      -webkit-text-fill-color: transparent;
      -webkit-background-clip: text !important;
      background-clip: text !important;
    }
    .colorful {
      opacity: 0;
      animation-name: colorfulN;
    }
    .nocolor {
      position: absolute;
      top: 0;
      background: var(${cssGlobalVars.clipBackground});
    }
  `,
)
class Breath extends GlobalStyle {
  /**
   * Strings or array of strings,
   * if array, divided each element into chunks,
   * otherwise split strings by whitespace.
   */
  @property()
  text: string | string[];
  /**
   * Effect duration, ending in s or ms.
   */
  @property()
  duration: string;

  protected render() {
    const texts = this.getTexts();
    return [
      texts.map(this.renderText),
      htmlStyle(this.computeStyle(texts.length)),
    ];
  }

  protected renderText(text: string) {
    return html`<span class="rel">
      <span class="nocolor">${text}</span>
      <span class="colorful">${text}</span>
    </span>`;
  }

  protected getTexts(): string[] {
    return Array.isArray(this.text) ? this.text : (this.text || this.textContent).split(/\s+/).filter((x) => x);
  }

  protected computeStyle(len: number) {
    const gap = 100 / 2 / len;
    const duration = this.parseDuration() || len * 2 + 2;

    return (
      `.colorful{animation-duration:${duration}s;}`
      + `@keyframes colorfulN{0%,${gap * 3}%{opacity:0;}${gap}%,${gap * 2}%{opacity:1;}}`
      + (() => {
        let style1 = "";
        for (let number = 1; number <= len; number++) {
          const delay = -1 * duration / len * (len - (number - 2));
          const defaultNumber = ((number - 1) % 3) + 1;
          style1 +=
            `.rel:nth-child(${number}) .colorful{animation-delay:${delay}s;background:var(${cssScope}--${number},var(${cssScope}--${defaultNumber}));}`;
        }
        return style1;
      })()
    );
  }

  protected parseDuration() {
    const { duration } = this;
    if (duration) {
      if (duration.endsWith("s")) {
        return parseFloat(duration.slice(0, -1));
      } else if (duration.endsWith("ms")) {
        return parseFloat(duration.slice(0, -2)) / 1000;
      }
    }
  }
}

export default Breath;
