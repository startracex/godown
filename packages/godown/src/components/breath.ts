import { attr, godown, htmlStyle, styles } from "@godown/element";
import { type TemplateResult, css, html } from "lit";
import { property } from "lit/decorators.js";

import { GlobalStyle, cssGlobalVars, scopePrefix } from "../core/global-style.js";

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
 * @slot - Breathing parts.
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
      margin: auto;
      width: fit-content;
      font-size: 2em;
      align-items: center;
      direction: ltr;
    }

    :host,
    :host([contents]) [part="root"] {
      display: flex;
    }

    [part="root"] {
      display: contents;
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
      color: transparent;
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
  content: string | string[];

  /**
   * Effect duration, ending in s or ms.
   */
  @property()
  duration: string;

  protected render(): TemplateResult<1> {
    const texts = this.getTexts();
    return html`
      <div
        part="root"
        ${attr(this.observedRecord)}
      >
        ${[texts.map(this._renderText), htmlStyle(this._computeStyle(texts.length))]}
      </div>
    `;
  }

  protected _renderText(text: string): TemplateResult<1> {
    return html`
      <span class="rel">
        <span class="nocolor">${text}</span>
        <span class="colorful">${text}</span>
      </span>
    `;
  }

  protected getTexts(): string[] {
    return Array.isArray(this.content)
      ? this.content
      : (this.content || this.textContent).split(/\s+/).filter((x) => x);
  }

  protected _computeStyle(len: number): string {
    const gap = 100 / 2 / len;
    const duration = this.parseDuration() || len * 2 + 2;
    let style1 = "";
    for (let number = 1; number <= len; number++) {
      const delay = (-duration / len) * (len - number + 1);
      const defaultNumber = ((number - 1) % 3) + 1;
      style1 += `.rel:nth-child(${number}) .colorful{animation-delay:${delay}s;background:var(${cssScope}--${number},var(${cssScope}--${defaultNumber}));}`;
    }
    return `.colorful{animation-duration:${duration}s;}@keyframes colorfulN{0%,${gap * 3}%{opacity:0;}${gap}%,${
      gap * 2
    }%{opacity:1;}}${style1}`;
  }

  parseDuration(): number | undefined {
    const { duration } = this;
    if (duration) {
      if (duration.endsWith("s")) {
        return Number.parseFloat(duration.slice(0, -1));
      }
      if (duration.endsWith("ms")) {
        return Number.parseFloat(duration.slice(0, -2)) / 1000;
      }
    }
  }
}

export default Breath;
export { Breath };
