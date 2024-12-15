import { godown } from "@godown/element/decorators/godown.js";
import { styles } from "@godown/element/decorators/styles.js";
import { htmlSlot } from "@godown/element/directives/html-slot.js";
import { RouteTree } from "@godown/element/tools/route-tree.js";
import { css, type PropertyValueMap, type TemplateResult } from "lit";
import { property, state } from "lit/decorators.js";

import { GlobalStyle } from "../core/global-style.js";

const protoName = "router";

/**
 * {@linkcode Router} has basic routing control.
 *
 * To switch routes, use `router-link component`.
 *
 * It has two methods to collect routes.
 *
 * 1. From field `routes`, an array, each elements require "path" and "component".
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
@styles(css`:host{display:contents;}`)
class Router extends GlobalStyle {
  static routerInstances: Set<Router> = new Set<Router>();

  private __fieldRouteTree: RouteTree = new RouteTree();
  private __slottedRouteTree: RouteTree = new RouteTree();
  private __cacheRecord = new Map<string, ReturnType<typeof this.useRouter>>();
  private __routes: (
    & Record<string, any>
    & {
      path: string;
      component?: unknown;
    }
  )[];

  /**
   * Render result.
   */
  @state()
  component: unknown | TemplateResult = null;

  /**
   * Dynamic parameters record.
   */
  @state()
  params: Record<string, string> = {};

  /**
   * Value of matched path in routes.
   */
  @state()
  path: string;

  /**
   * Current pathname (equals to location.pathname).
   */
  @property()
  pathname: string;

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
  type: "united" | "slotted" | "field" = "united";

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

  get routes(): (Record<string, any> & {
    path: string;
    component?: unknown;
  })[] {
    return this.__routes;
  }

  clear(): void {
    this.__cacheRecord.clear();
  }

  protected render(): unknown {
    this.params = {};
    if (this.cache) {
      const cached = this.__cacheRecord.get(this.pathname);
      if (cached) {
        Object.assign(this, cached);
        return this.component;
      }
    }
    switch (this.type) {
      case "field":
        this.component = this.fieldComponent();
        break;
      case "slotted":
        this.component = this.slottedComponent();
        break;
      default:
        this.component = this.fieldComponent() ?? this.slottedComponent();
    }
    return this.component ?? this.default ?? null;
  }

  connectedCallback(): void {
    super.connectedCallback();
    Router.routerInstances.add(this);
    this.pathname ??= location.pathname;

    if (this.type !== "field") {
      const mutationObserver = new MutationObserver(this.collectSlottedRoutes);
      mutationObserver.observe(this, {
        attributeFilter: ["slot"],
        attributes: true,
        subtree: true,
      });
      this.collectSlottedRoutes();
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    Router.routerInstances.delete(this);
  }

  useRouter(): {
    pathname: string;
    params: Record<string, string>;
    path: string;
    component: unknown;
  } {
    return {
      pathname: this.pathname,
      params: this.params,
      path: this.path,
      component: this.component,
    };
  }

  /**
   * Callback function when the route changes.
   */
  routeChangeCallback: (params: {
    pathname: string;
    params: Record<string, string>;
    path: string;
    component: unknown | TemplateResult;
  }, first: boolean) => void = null;

  protected updated(changedProperties: PropertyValueMap<this>): void {
    const shouldDispatch = changedProperties.has("pathname") || changedProperties.has("path");
    if (shouldDispatch) {
      const ur = this.useRouter();
      const noRecord = !this.__cacheRecord.has(this.pathname);
      if (noRecord) {
        this.__cacheRecord.set(this.pathname, ur);
      }
      this.routeChangeCallback?.(ur, noRecord);
      this.dispatchEvent(new CustomEvent("change", { detail: ur }));
    }
  }

  /**
   * Get component from {@linkcode routes} by query.
   */
  fieldComponent(query?: string): unknown {
    query ||= this.__fieldRouteTree.search(this.pathname)?.pattern || null;
    this.path = query;

    if (!query) {
      return null;
    }

    this.params = this.parseParams(this.path, this.pathname);
    const route = this.routes.find((r) => r.path === query);
    if (!route) {
      return null;
    }
    return route.component;
  }

  /**
   * Get component from slotted elements by query.
   */
  slottedComponent(usedRouteTemplate?: string): TemplateResult<1> {
    const slottedPaths = this._slottedNames;
    usedRouteTemplate ||= this.__slottedRouteTree.search(this.pathname)?.pattern || null;
    this.path = usedRouteTemplate;

    if (!usedRouteTemplate) {
      return null;
    }

    this.path = slottedPaths.find((s) => s === usedRouteTemplate);
    if (!this.path) {
      return null;
    }
    this.params = this.parseParams(usedRouteTemplate, this.pathname);
    return htmlSlot(this.path);
  }

  /**
   * Reset the route tree, clear cache, collect routes from child elements.
   */
  collectSlottedRoutes(): void {
    this.__slottedRouteTree = new RouteTree();
    this.clear();
    this._slottedNames.forEach(slotName => {
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

  parseParams(routeTemplate: string, path: string = this.pathname): Record<string, string> {
    return RouteTree.parseParams(path, routeTemplate);
  }

  static updateAll(): void {
    this.routerInstances.forEach((i) => {
      i.handlePopstate();
    });
  }

  handlePopstate = this.events.add(window, "popstate", () => {
    this.pathname = location.pathname;
  }) as () => void;
}

export default Router;
