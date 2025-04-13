import { attr, godown, htmlSlot, StyleController, styles, tokenList } from "@godown/element";
import { cssGlobalVars, GlobalStyle, scopePrefix } from "../../internal/global-style.js";
import { css, html, type TemplateResult } from "lit";
import { property, queryAll } from "lit/decorators.js";
import { RingBuilder, type RingType } from "../../internal/ring.js";

const protoName = "tabs";
const cssScope = scopePrefix(protoName);

const mouseEnterAddedToken = "hover";

/**
 * {@linkcode Tabs} used to render a set of tabs.
 *
 * It accepts "tabs" to present the sub-content.
 *
 * When "useSlot" is enabled, each item in "tabs" becomes a named slot with the same name as itself,
 * while for non-slot tabs, the content is rendered as a horizontally padded string.
 *
 * When "mouseenter" and "mouseleave" are triggered on an individual tab, the indicator will move.
 *
 * The moving indicator will start from the position of the item that was last entered.
 *
 * If the pointer moves out of the root element or the element is connected to the document,
 * the starting position of the indicator will be regarded as the current selection.
 *
 * Apply "flex-direction: column" to the tabs to arrange them vertically.
 *
 * @csspart root - The root element.
 * @csspart item - The tab items.
 * @csspart indicator - The indicator.
 * @csspart selected - The selected tab item.
 * @csspart hover - The hovered tab item.
 * @fires select - Fires when the tab is selected.
 * @category display
 */
@godown(protoName)
@styles(css`
  :host {
    ${cssScope}--indicator-background: var(${cssGlobalVars.passive});
    ${cssScope}--space: 0.25em;
    border-radius: var(${cssGlobalVars.radius});
    transition: 0.3s ease-in-out;
    width: fit-content;
    display: flex;
    cursor: default;
  }

  [part="root"] {
    padding: 0.2em;
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: inherit;
    overflow-x: clip;
    border-radius: inherit;
    transition: inherit;
    transition-property: width, transform, opacity;
    gap: var(${cssScope}--space);
  }

  [useslot] [part~="item"] {
    padding: 0;
  }

  [part~="item"] {
    width: 100%;
    display: block;
    padding: 0 0.25em;
    position: relative;
    white-space: nowrap;
    transition: inherit;
    border-radius: inherit;
    transition-property: inherit;
  }

  [part="indicator"] {
    width: 100%;
    height: 100%;
    inset: 0;
    opacity: 0;
    z-index: -1;
    position: absolute;
    transition: inherit;
    border-radius: inherit;
    transition-property: inherit;
    background: var(${cssScope}--indicator-background);
  }

  [part~="selected"] {
    background: var(${cssScope}--indicator-background);
  }

  [part~="selected"] [part="indicator"],
  [part~="hover"] [part="indicator"] {
    opacity: 1;
  }
`)
class Tabs extends GlobalStyle {
  @property({ attribute: "ring-type" })
  ringType: RingType = "border";

  /**
   * Determines whether the tabs should use a slot for their content instead of a string.
   */
  @property({ type: Boolean })
  useSlot = false;

  /**
   * An array of strings or slot content representing the tabs.
   */
  @property({ type: Array })
  tabs: string[];

  /**
   * The index of the currently selected tab.
   */
  @property({ type: Number })
  index = 0;

  protected _lastIndex: number;

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
        ${this.tabs?.map((tab, index) =>
          tab || this.useSlot
            ? html`
                <li
                  part="${tokenList("item", {
                    selected: this.index === index,
                  })}"
                  @mouseenter=${() => {
                    this.move(this._lastIndex, index);
                    this._lastIndex = index;
                  }}
                  @click=${() => this.select(index)}
                >
                  ${this.useSlot ? htmlSlot(tab) : tab}
                  <div part="indicator"></div>
                </li>
              `
            : "",
        )}
      </ul>
    `;
  }

  connectedCallback(): void {
    super.connectedCallback();
    this._lastIndex = this.index;
  }

  protected _handleMouseLeave(): void {
    const lastItem = this._items[this._lastIndex];
    if (lastItem) {
      lastItem.part.remove(mouseEnterAddedToken);
    }
    this._lastIndex = this.index;
  }

  move(from: number, to: number): void {
    if (from === to) {
      return;
    }
    const { _items, _indicators } = this;
    const toItem = _items[to];
    if (!toItem) {
      return;
    }
    toItem.part.add(mouseEnterAddedToken);
    const fromItem = _items[from];
    if (!fromItem) {
      return;
    }
    fromItem.part.remove(mouseEnterAddedToken);
    const toIndicator = _indicators[to];
    const fromIndicator = _indicators[from];
    if (!toIndicator || !fromIndicator) {
      return;
    }
    const fromIndicatorRect = fromIndicator.getBoundingClientRect();
    const toItemRect = toItem.getBoundingClientRect();
    const transformX = fromIndicatorRect.x - toItemRect.x;
    const transformY = fromIndicatorRect.y - toItemRect.y;
    const fromWidth = fromIndicatorRect.width;

    const { style } = toIndicator;
    const cssNone = "none";

    style.transform = `translate3d(${transformX}px,${transformY}px,0)`;
    style.width = fromWidth + "px";
    style.transition = fromIndicator.style.transition = cssNone;

    toIndicator.getBoundingClientRect();

    style.width = style.transform = style.transition = fromIndicator.style.transition = "";
  }

  select(selected: number): void {
    const { index, tabs, _lastIndex, useSlot } = this;
    if (!tabs || index === selected || !(selected in tabs)) {
      return;
    }
    this.dispatchCustomEvent("select", selected);
    this.move(_lastIndex, selected);
    this._lastIndex = selected;
    if (index in tabs && (tabs[index] || useSlot)) {
      this.index = selected;
    }
  }
}

export default Tabs;
export { Tabs };
