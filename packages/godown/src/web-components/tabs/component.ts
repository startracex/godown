import { attr, godown, htmlSlot, StyleController, styles, tokenList } from "@godown/element";
import { cssGlobalVars, GlobalStyle, scopePrefix } from "../../internal/global-style.js";
import { css, html, type TemplateResult } from "lit";
import { property, queryAll } from "lit/decorators.js";
import { RingBuilder, ringTypeAttribute, type RingType } from "../../internal/ring.js";

const protoName = "tabs";
const cssScope = scopePrefix(protoName);

const hoverToken = "hover";

/**
 * {@linkcode Tabs} used to render a set of tabs.
 *
 * @fires select - Fires when the tab index is changed.
 * @category display
 */
@godown(protoName)
@styles(css`
  :host {
    ${cssScope}--indicator-background: var(${cssGlobalVars.passive});
    ${cssScope}--selected-background: var(${cssGlobalVars.passive});
    transition: 0.2s ease-in-out;
    display: flex;
    cursor: default;
  }

  [part="root"] {
    gap: 0.25em;
    padding: 0.25em;
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: inherit;
    overflow-x: clip;
    border-radius: inherit;
    transition: inherit;
    transition-property: width, transform, opacity;
  }

  [part~="item"] {
    position: relative;
    width: 100%;
    display: block;
    position: relative;
    white-space: nowrap;
    transition: inherit;
    border-radius: inherit;
    transition-property: inherit;
  }

  [part="indicator"],
  [part~="item"]::after {
    width: 100%;
    height: 100%;
    inset: 0;
    position: absolute;
    transition: inherit;
    border-radius: inherit;
    transition-property: inherit;
    background: var(${cssScope}--indicator-background);
  }

  [part="indicator"] {
    opacity: 0;
    z-index: -1;
  }

  [part~="item"]::after {
    z-index: -2;
  }

  [indicator="underline"] [part="indicator"],
  [indicator="underline"] [part~="item"]::after {
    top: 100%;
    height: 0.15em;
    border-radius: 0.075em;
    margin-top: 0.15em;
  }

  [part~="selected"]::after {
    content: "";
    background: var(${cssScope}--selected-background);
  }

  [part~="hover"] [part="indicator"] {
    opacity: 1;
  }
`)
class Tabs extends GlobalStyle {
  @property({ attribute: ringTypeAttribute })
  ringType: RingType = "border";

  /**
   * If it is "select", the indicator moves from the selected content to the hover position.
   *
   * If it is "previous", the indicator moves from the last moved position to the hover position.
   *
   * If "none", the indicator will not move.
   */
  @property()
  beginning: "selected" | "previous" | "none" = "selected";

  /**
   * The behavior of the indicator:
   *
   * If "background", its size will be consistent with that of a single tab.
   *
   * If "underline", an underline will be displayed at the bottom of the tab.
   */
  @property()
  indicator: "background" | "underline" = "background";

  /**
   * Tab list or slot list.
   */
  @property({ type: Array })
  tabs: string[];

  /**
   * The index of the currently selected tab.
   */
  @property({ type: Number })
  index = 0;

  protected previousIndex: number;

  @queryAll("[part~=item]")
  protected _items: HTMLCollectionOf<HTMLLIElement>;

  @queryAll("[part=indicator]")
  protected _indicators: HTMLCollectionOf<HTMLDivElement>;

  constructor() {
    super();
    new StyleController(this, () => new RingBuilder({ type: this.ringType }).css);
  }

  render(): TemplateResult<1> {
    return html`
      <ul
        part="root"
        ${attr(this.observedRecord)}
        @mouseleave="${this._handleMouseLeave}"
      >
        ${this.tabs?.map(
          (tab, index) => html`
            <li
              part="${tokenList("item", this.index === index && "selected")}"
              @mouseenter=${() => {
                this.move(this.previousIndex, index);
                this.previousIndex = index;
              }}
              @click=${() => this.select(index)}
            >
              ${htmlSlot(tab, tab)}
              <div part="indicator"></div>
            </li>
          `,
        )}
      </ul>
    `;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.previousIndex = this.beginning === "selected" ? this.index : -1;
  }

  protected _handleMouseLeave(): void {
    const lastItem = this._items[this.previousIndex];
    if (lastItem) {
      lastItem.part.remove(hoverToken);
    }
    this.previousIndex = this.beginning === "selected" ? this.index : -1;
  }

  move(sourceIndex: number, targetIndex: number): void {
    if (sourceIndex === targetIndex) {
      return;
    }
    const { _items, _indicators } = this;
    const targetElement = _items[targetIndex];
    if (!targetElement) {
      return;
    }
    targetElement.part.add(hoverToken);
    const fromItem = _items[sourceIndex];
    if (!fromItem) {
      return;
    }
    fromItem.part.remove(hoverToken);
    if (this.beginning === "none") {
      return;
    }
    const targetIndicator = _indicators[targetIndex];
    const sourceIndicator = _indicators[sourceIndex];
    if (!targetIndicator || !sourceIndicator) {
      return;
    }
    const { x: sourceX, y: sourceY, width: sourceWidth } = sourceIndicator.getBoundingClientRect();
    const { x, y } = targetIndicator.getBoundingClientRect();
    const transformX = sourceX - x;
    const transformY = sourceY - y;

    const { style: targetStyle } = targetIndicator;
    const { style: sourceStyle } = sourceIndicator;

    targetStyle.transform = `translate3d(${transformX}px,${transformY}px,0)`;
    targetStyle.width = `${sourceWidth}px`;
    targetStyle.transition = sourceStyle.transition = "none";
    targetIndicator.getBoundingClientRect();
    targetStyle.width = targetStyle.transform = targetStyle.transition = sourceStyle.transition = "";
  }

  select(selected: number): void {
    const { index, previousIndex } = this;
    this.move(previousIndex, selected);
    if (selected !== index) {
      this.previousIndex = selected;
      this.index = selected;
      this.dispatchCustomEvent("select", selected);
    }
  }
}

export default Tabs;
export { Tabs };
