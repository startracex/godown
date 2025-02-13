import { RouteTree, godown, htmlSlot, omit, styles } from "@godown/element";
import { type PropertyValueMap, type TemplateResult, css } from "lit";
import { property, state } from "lit/decorators.js";

import { GlobalStyle } from "../core/global-style.js";

interface RouteState {
  pathname: string;
  params: Record<string, string>;
  path: string;
}

interface RouteResult extends RouteState {
  component: unknown;
}

interface RouteItem {
  [key: PropertyKey]: unknown;
  path: string;
  render?: (state?: RouteState) => unknown;
  component?: unknown;
}

const routerTypes = {
  field: "field",
  slotted: "slotted",
  united: "united",
} as const;

type RouterType = keyof typeof routerTypes;

const protoName = "router";

/**
 * {@linkcode Router} has basic routing control.
 *
 * To switch routes, use `router-link component`.
 *
 * It has two methods to collect routes.
 *
 * 1. From field `routes`, an array, each elements require "path".
 * 2. From child elements, which have the slot attribute for matching routes.
 *
 * If only the method 1 is used, set `type` to `"field"`.
 *
 * If only the method 2 is used, set `type` to `"slotted"`.
 *
 * `type` defaults to `"united"`, which will try method 1, then method 2.
 *
 * If no routes are matched, the default value (no named slot) will be rendered.
 *
 * @slot - Display slot when there is no match.
 * @slot * - Matching slot will be displayed.
 * @category navigation
 */
@godown(protoName)
@styles(css`
  :host {
    display: contents;
  }
`)
class Router extends GlobalStyle {
  static routerInstances: Set<Router> = new Set<Router>();

  private __fieldRouteTree: RouteTree = new RouteTree();
  private __slottedRouteTree: RouteTree = new RouteTree();
  private __cacheRecord = new Map<string, RouteResult>();
  private __routes: RouteItem[];

  /**
   * Render result.
   */
  @state()
  component: unknown | TemplateResult = null;

  /**
   * Dynamic parameters record.
   */
  get params(): Record<string, string> {
    if (!this.path) {
      return {};
    }
    return RouteTree.parseParams(this.pathname, this.path);
  }

  /**
   * Value of matched path in routes.
   */
  @state()
  path?: string;

  /**
   * Current pathname (equals to location.pathname).
   */
  @property()
  pathname: string = location.pathname;

  /**
   * Rendered content when there is no match.
   */
  @state()
  default: TemplateResult = htmlSlot();

  /**
   * The type of routing sources.
   *
   * If field, it won't collect the slot attribute of the child elements.
   *
   * This property should not be changed after the rendering is complete.
   */
  @property()
  type: RouterType = routerTypes.united;

  /**
   * Cache accessed records.
   *
   * Emptied at each re-collection.
   */
  @property({ type: Boolean })
  cache = false;

  @state()
  set routes(value) {
    this.__routes = value;
    this.collectFieldRoutes(value);
  }

  get routes(): RouteItem[] {
    return this.__routes;
  }

  clear(): void {
    this.__cacheRecord.clear();
  }

  protected render(): unknown {
    let cached: RouteResult | undefined;
    if (this.cache && (cached = this.__cacheRecord.get(this.pathname))) {
      this.component = cached.component;
      this.path = cached.path;
      this.pathname = cached.pathname;
    }
    if (!cached) {
      switch (this.type) {
        case routerTypes.field:
          this.component = this.fieldComponent();
          break;
        case routerTypes.slotted:
          this.component = this.slottedComponent();
          break;
        default:
          this.component = this.fieldComponent() ?? this.slottedComponent();
      }
    }
    return this.component ?? this.default;
  }

  connectedCallback(): void {
    super.connectedCallback();
    Router.routerInstances.add(this);

    if (this.type !== "field") {
      this.observers.add(this, MutationObserver, this.collectSlottedRoutes, {
        attributes: true,
        attributeFilter: ["slot"],
        subtree: true,
      });
      this.collectSlottedRoutes();
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    Router.routerInstances.delete(this);
  }

  useRouter(): RouteResult {
    return {
      pathname: this.pathname,
      params: this.params,
      path: this.path,
      component: this.component,
    };
  }

  protected updated(changedProperties: PropertyValueMap<this>): void {
    const shouldDispatch = changedProperties.has("pathname") || changedProperties.has("path");
    if (shouldDispatch) {
      const ur = this.useRouter();
      if (!this.__cacheRecord.has(this.pathname) && this.path) {
        this.__cacheRecord.set(this.pathname, ur);
      }
      this.dispatchCustomEvent("change", ur);
    }
  }

  /**
   * Get component from {@linkcode routes} by query.
   */
  fieldComponent(query?: string): unknown {
    query ||= this.__fieldRouteTree.search(this.pathname)?.pattern;
    this.path = query;

    if (!query) {
      return null;
    }

    const route = this.routes.find((r) => r.path === query);
    if (!route) {
      return null;
    }

    if ("render" in route) {
      return route.render?.(omit(this.useRouter(), "component")) || null;
    }

    return route.component;
  }

  /**
   * Get component from slotted elements by query.
   */
  slottedComponent(query?: string): TemplateResult<1> {
    const slottedPaths = this._slottedNames;
    query ||= this.__slottedRouteTree.search(this.pathname)?.pattern;
    this.path = query;

    if (!query) {
      return null;
    }

    this.path = slottedPaths.find((s) => s === query);
    if (!this.path) {
      return null;
    }

    return htmlSlot(this.path);
  }

  /**
   * Reset the route tree, clear cache, collect routes from child elements.
   */
  collectSlottedRoutes(): void {
    this.__slottedRouteTree = new RouteTree();
    this.clear();
    this._slottedNames.forEach((slotName) => {
      this.__slottedRouteTree.insert(slotName);
    });
  }

  /**
   * Reset the route tree, clear cache, collect routes from value.
   */
  collectFieldRoutes(value: typeof this.routes): void {
    this.__fieldRouteTree = new RouteTree();
    this.clear();
    value.forEach(({ path }) => {
      this.__fieldRouteTree.insert(path);
    });
  }

  static updateAll(): void {
    this.routerInstances.forEach((i) => {
      i.handlePopstate();
    });
  }

  search(pathname: string): RouteTree {
    return this.__fieldRouteTree.search(pathname) || this.__slottedRouteTree.search(pathname);
  }

  handlePopstate: () => void = this.events.add(window, "popstate", () => {
    this.pathname = location.pathname;
  });
}

export default Router;
export { Router };
