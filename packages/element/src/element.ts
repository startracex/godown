import { LitElement, type PropertyDeclaration, type PropertyValues } from "lit";
import { property } from "lit/decorators.js";

import { GodownConfig } from "./config.js";
import { deepQuerySelector, deepQuerySelectorAll, Events, Observers, Timeouts } from "./tools/index.js";

export const attributeName = (property: PropertyKey, { attribute }: PropertyDeclaration): string | undefined => {
  if (attribute === false || typeof property === "symbol") {
    return;
  }
  return attribute === true || attribute === undefined ? String(property).toLowerCase() : attribute;
};

class GodownElement extends LitElement {
  static godownConfig: GodownConfig = new GodownConfig();

  static elementTagName?: string;

  static elementAttributes: Map<string, PropertyKey>;

  static elementCategory?: any;

  static protoName?: string;

  /**
   * Defines a custom element with the specified tag name and options.
   * If the element is not already defined, it will be registered with the GodownConfig.
   * @param tagName - The tag name to use for the custom element, defaulting to the {@link elementTagName} static property.
   * @param options - Element definition options.
   */
  static define(tagName: string = this.elementTagName, options?: ElementDefinitionOptions): void {
    if (!this.isDefined()) {
      this.godownConfig.define(tagName, this, options);
    }
  }

  static isDefined(): boolean {
    return !!this.getDefined();
  }

  static getDefined(): CustomElementConstructor | undefined {
    return this.godownConfig.get(this.elementTagName);
  }

  static finalize(): void {
    super.finalize();
    this.elementAttributes = new Map();
    for (const [property, option] of this.elementProperties.entries()) {
      const attribute = attributeName(property, option);
      if (attribute) {
        this.elementAttributes.set(attribute, property);
      }
    }
  }

  /**
   * Returns an object containing the current values of the observed attributes.
   * @returns An object where the keys are the observed attribute names and the values are the current values of those attributes.
   */
  get observedRecord(): Record<string, any> {
    const record = {};
    for (const [attribute, property] of (this.constructor as typeof GodownElement).elementAttributes.entries()) {
      record[attribute] = this[property];
    }
    return record;
  }

  /**
   * Returns the first unnamed slot element in the shadow root.
   * @returns The unnamed slot element, or `null` if not found.
   */
  protected get _slot(): HTMLSlotElement | null {
    return this.shadowRoot ? this.shadowRoot.querySelector<HTMLSlotElement>("slot:not([name])") : null;
  }

  /**
   * Returns all slot elements in the shadow root.
   * @returns An array of all slot elements in the shadow root.
   */
  protected get _slotAll(): HTMLSlotElement[] {
    return this.shadowRoot ? [...this.shadowRoot.querySelectorAll<HTMLSlotElement>("slot")] : [];
  }

  /**
   * Returns all slotted elements.
   * @returns An array of all slotted elements.
   */
  protected get _slottedAll(): HTMLSlotElement[] {
    return [...this.querySelectorAll<HTMLSlotElement>("[slot]")];
  }

  /**
   * Returns names of all slotted elements.
   * @returns An array of slot names.
   */
  protected get _slottedNames(): string[] {
    return this._slottedAll.map((c) => c.getAttribute("slot")).filter((v) => v);
  }

  /**
   * Events storage for the element.
   *
   * All listeners will be removed when the element is disconnected.
   */
  events: Events;

  /**
   * Observers storage for the element.
   *
   * All observers will be removed when the element is disconnected.
   */
  observers: Observers;

  /**
   * Timeouts storage for the element.
   *
   * All timeouts will be removed when the element is disconnected.
   */
  timeouts: Timeouts;

  /**
   * Assigns properties to the element when the element is connected.
   */
  assign: null | Record<string, any>;

  /**
   * Indicates whether the element's contents should be displayed as if the element itself was not there.
   * When set to `true`, the element should be rendered with `display: contents` (apply the following style):
   * ```css
   * :host([contents]) {
   *   display: contents;
   * }
   */
  @property({ type: Boolean, reflect: true })
  contents?: boolean;

  /**
   * When {@link contents} is set to `true`, {@link getBoundingClientRect} and {@link getClientRects} will return the bounding
   * client rectangle of it, instead of the element itself.
   * Defaults to undefined, to fall back to the first element in the shadow root.
   */
  contentsRoot?: HTMLElement;

  /**
   * Returns the bounding client rectangle of the element or its contents root.
   * If the element has the `contents` property set, it will return the bounding client rectangle of the first element in the shadow root or the `contentsRoot` element, instead of the element itself.
   * @returns The bounding client rectangle of the element or its contents root.
   */
  getBoundingClientRect(): DOMRect {
    let root: Element | null | undefined;
    return this.contents &&
        // root is contentsRoot or first Element of shadowRoot
        (root = this.contentsRoot || this.shadowRoot?.firstElementChild) &&
        // root is not the element itself
        root !== this
      ? root.getBoundingClientRect()
      : super.getBoundingClientRect();
  }

  /**
   * Returns the client rects of the element or its contents root.
   * If the element has the `contents` property set, it will return the client rects of the first element in the shadow root or the `contentsRoot` element, instead of the element itself.
   * @returns The client rects of the element or its contents root.
   */
  getClientRects(): DOMRectList {
    let root: Element | null | undefined;
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
   * lazy: style will be applied after connectedCallback.
   */
  private __stylex: { css?: string; index?: number; lazy?: string };

  /**
   * Returns the stylex property value.
   */
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
    this.observers = new Observers();
    this.timeouts = new Timeouts();
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
    this.observers.removeAll();
    this.timeouts.removeAll();
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

  /**
   * Performs a deep query selector on the current element, searching within its shadow DOM if present.
   *
   * @param selectors - The CSS selectors to use for the query.
   * @returns The first element that matches the specified selectors, or null if no matches are found.
   */
  deepQuerySelector<E extends Element = HTMLElement>(selectors: string): E | null {
    return deepQuerySelector<E>(selectors, this);
  }

  /**
   * Performs a deep query selector all on the current element, searching within its shadow DOM if present.
   *
   * @param selectors - The CSS selectors to use for the query.
   * @returns An array of all elements that match the specified selectors.
   */
  deepQuerySelectorAll<E extends Element = HTMLElement>(selectors: string): E[] {
    return deepQuerySelectorAll<E>(selectors, this);
  }

  /**
   * Adds the provided CSS styles to the element's shadow DOM adopted style sheets.
   *
   * @param styles - An array of CSS strings to be added to the adopted style sheets.
   * @returns The index of the injected style sheet, or `undefined` if there is no shadow root or no styles were provided.
   */
  adoptStyles(...styles: { toString(): string }[]): number | undefined {
    if (!this.shadowRoot) {
      return;
    }
    const stack = this.shadowRoot.adoptedStyleSheets;
    if (styles.length) {
      const sheet = new CSSStyleSheet();
      styles.forEach((style) => sheet.insertRule(style.toString()));
      stack.push(sheet);
      return stack.length - 1;
    }
  }

  dispatchCustomEvent(type: string, detail?: any, options?: EventInit): void {
    this.dispatchEvent(new CustomEvent(type, { detail, composed: true, ...options }));
  }
}

export { GodownElement, GodownElement as default };
