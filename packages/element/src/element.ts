import { LitElement, type PropertyValues } from "lit";
import { property } from "lit/decorators.js";

import GodownConfig from "./config.js";
import { deepQuerySelector, deepQuerySelectorAll } from "./tools/dom.js";
import { Events } from "./tools/events.js";

class GodownElement extends LitElement {
  static godownConfig: GodownConfig = new GodownConfig();

  static elementTagName?: string;

  static elementCategory?: any;

  static protoName?: string;

  static define(tagName: string = this.elementTagName, options?: ElementDefinitionOptions): void {
    if (!this.isDefined()) {
      this.godownConfig.define(tagName, this, options);
    }
  }

  static isDefined(): boolean {
    return !!this.getDefined();
  }

  static getDefined(): CustomElementConstructor {
    return this.godownConfig.get(this.elementTagName);
  }

  get observedRecord(): Record<string, any> {
    return Object.fromEntries(this.scopedObservedAttributes.map((key) => [key, this[key]]));
  }

  /**
   * Returns observedAttributes excluding in GodownElement.
   */
  get scopedObservedAttributes(): string[] {
    return this.globalObservedAttributes.filter((key) => !GodownElement.observedAttributes.includes(key));
  }

  /**
   * Returns observedAttributes.
   */
  get globalObservedAttributes(): string[] {
    return (this.constructor as any).observedAttributes;
  }

  /**
   * No named slot element.
   */
  get _slot(): HTMLSlotElement {
    return this.shadowRoot.querySelector<HTMLSlotElement>("slot:not([name])");
  }

  /**
   * All slot elements.
   */
  get _slotAll(): HTMLSlotElement[] {
    return [...this.shadowRoot.querySelectorAll<HTMLSlotElement>("slot")];
  }

  /**
   * Slotted elements.
   */
  get _slottedAll(): HTMLElement[] {
    return [...this.querySelectorAll<HTMLSlotElement>("[slot]")];
  }

  /**
   * Named slotted elements' slot attribute.
   */
  get _slottedNames(): string[] {
    return this._slottedAll.map((c) => c.getAttribute("slot")).filter((v) => v);
  }

  /**
   * Events storage for the element.
   *
   * @example
   * ```ts
   * const handleClick = this.events.add("click", () => {});
   * this.events.remove("click", handleClick);
   * this.events.removeAll();
   * ```
   */
  events: Events;

  /**
   * Assigns properties to the element when the element is constructed.
   */
  assign: void | Record<string, any>;

  /**
   * ```css
   * :host([contents]) {
   *   display: contents;
   * }
   * ```
   */
  @property({ type: Boolean, reflect: true })
  contents?: boolean;

  /**
   * Contents root of the element.
   */
  contentsRoot?: HTMLElement;

  getBoundingClientRect(): DOMRect {
    let root: Element | void;
    return this.contents &&
        // root is contentsRoot or first Element of shadowRoot
        (root = this.contentsRoot || this.shadowRoot?.firstElementChild) &&
        // root is not the element itself
        root !== this
      ? root.getBoundingClientRect()
      : super.getBoundingClientRect();
  }

  getClientRects(): DOMRectList {
    let root: Element | void;
    return this.contents &&
        // root is contentsRoot or first Element of shadowRoot
        (root = this.contentsRoot || this.shadowRoot?.firstElementChild) &&
        // root is not the element itself
        root !== this
      ? root.getClientRects()
      : super.getClientRects();
  }

  /**
   * css: current stylex property.
   * index: index of injected style.
   * lazy: stylex property that will be applied after connectedCallback.
   */
  __stylex: { css?: string; index?: number; lazy?: string };

  get stylex(): string | undefined {
    return this.__stylex.css;
  }

  /**
   * Appends to `shadowRoot.adoptedStyleSheets` and overrides the initial styles.
   *
   * If there is no selector, it will be `:host`.
   *
   * If element has no shadowRoot, it will be applied after connectedCallback.
   *
   * Resetting will remove the previous stylex.
   *
   * @parma sx CSS string.
   *
   * @example
   * ```html
   * <custom-element stylex=":host{--key:value;}"></custom-element>
   * <custom-element stylex="--key:value;"></custom-element>
   * ```
   */
  @property({ reflect: true })
  set stylex(sx: string) {
    sx = sx.trim();
    if (!/^[\s\S]*{[\s\S]*}$/.test(sx)) {
      sx = `:host{${sx}}`;
    }
    if (!this.shadowRoot) {
      this.__stylex.lazy = sx;
      return;
    }
    if (this.__stylex.index) {
      this.shadowRoot.adoptedStyleSheets.splice(this.__stylex.index, 1);
    }
    this.__stylex.css = sx;
    this.__stylex.index = this.adoptStyles(sx);
  }

  constructor(init?: Record<PropertyKey, any>) {
    super();
    this.events = new Events();
    this.__stylex = {};
    this.assign = {
      ...(GodownElement.godownConfig?.assign || {}),
      ...init,
    };
  }

  connectedCallback(): void {
    super.connectedCallback();
    if (this.assign) {
      Object.assign(this, this.assign);
      this.assign = null;
    }
    const { lazy } = this.__stylex;
    if (lazy) {
      this.adoptStyles(lazy);
      this.__stylex.lazy = "";
    }
  }

  disconnectedCallback(): void {
    this.events.removeAll();
  }

  mount(arg?: PropertyValues): void {
    this.firstUpdated(arg);
  }

  unmount(): void {
    this.disconnectedCallback();
  }

  remount(arg?: PropertyValues): void {
    this.unmount();
    this.connectedCallback();
    this.mount(arg);
  }

  deepQuerySelector<E extends Element = HTMLElement>(selectors: string): E {
    return deepQuerySelector<E>(selectors, this);
  }

  deepQuerySelectorAll<E extends Element = HTMLElement>(selectors: string): E[] {
    return deepQuerySelectorAll<E>(selectors, this);
  }

  /**
   * Add styles to shadowRoot.
   *
   * @param styles CSS strings.
   * @returns Index of injected style.
   *
   * @example
   * ```
   * this.applyStyles(
   * "...",
   * css`...`,
   * )
   * ```
   */
  adoptStyles(...styles: { toString(): string }[]): number {
    const stack = this.shadowRoot.adoptedStyleSheets;
    if (styles.length) {
      const sheet = new CSSStyleSheet();
      styles.forEach((style) => sheet.insertRule(style.toString()));
      stack.push(sheet);
    }
    return stack.length - 1;
  }

  dispatchCustomEvent(type: string, detail?: any, options?: EventInit): void {
    this.dispatchEvent(new CustomEvent(type, { detail, composed: true, ...options }));
  }
}

export { GodownElement, GodownElement as default };
