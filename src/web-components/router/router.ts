import { css, property, type PropertyValueMap, state } from "../../.deps.js";
import { conf } from "../../conf.js";
import { define } from "../../decorators/define.js";
import RouteTree from "../../lib/route-tree.js";
import { htmlSlot, type HTMLTemplate } from "../../lib/templates.js";
import { deepQuerySelectorAll } from "../../lib/utils.js";
import { GodownElement } from "../../supers/root.js";

type WithRecord<T extends string> = Record<string, any> & Record<T, string>;

const defineName = "router";

/**
 * {@linkcode Router} has basic routing control.
 */
@define(defineName)
export class Router<T = unknown> extends GodownElement {
  private _routes: (WithRecord<"path"> & { component?: T })[] = [];
  private _routeTree: RouteTree = new RouteTree();

  /**
   * Component will render.
   */
  @state() component: T | HTMLTemplate = null;
  /**
   * Dynamic parameters record.
   */
  @state() params: Record<string, string> = {};
  /**
   * Value of matched path in routes, or null.
   */
  @state() path: string = null;
  /**
   * Current pathname (location.pathname).
   */
  @property() pathname = "";
  /**
   * Path prefix.
   */
  @property() baseURL = "";
  /**
   * Rendered content when there is no match.
   */
  @state() def = htmlSlot();
  /**
   * The type of routing query.
   */
  @property() type: "united" | "child" | "slotted" | "field" = "united";
  /**
   * Rewrite history.
   */
  @state() override = true;
  /**
   * Cache accessed.
   */
  @property({ type: Boolean }) cache = false;

  /**
   * Cache record.
   */
  record = new Map<string, ReturnType<typeof this.useRouter>>();

  set routes(v) {
    if (Object.prototype.toString.call(v) !== "[object Array]") {
      return;
    }
    this._routes = v;
    this.reset();
    for (const route of v) {
      this._routeTree.insert(route.path);
    }
    this.requestUpdate();
  }

  get routes() {
    return this._routes;
  }

  static styles = [
    css`
      :host {
        display: contents;
      }
    `,
  ];

  reset() {
    this._routeTree = new RouteTree();
    this.record.clear();
  }

  protected render(): T | HTMLTemplate {
    if (this.cache) {
      const cached = this.record.get(this.pathname);
      if (cached) {
        Object.assign(this, cached);
        return this.component;
      }
    }
    this.params = {};
    switch (this.type) {
      case "field":
        this.component = this.fieldComponent();
        break;
      case "child":
      case "slotted":
        this.component = this.slottedComponent();
        break;
      case "united":
        this.component = this.fieldComponent() ?? this.slottedComponent();
        break;
    }
    return this.component ?? this.def;
  }

  useRouter() {
    return {
      pathname: this.pathname,
      params: this.params,
      path: this.path,
      component: this.component,
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this.pathname = window.location.pathname;
    if (!this.override) {
      return;
    }
    this.addEvent(window, "popstate", () => {
      this.pathname = window.location.pathname;
    });
    const self = this;
    const pushHistory = history.pushState;
    history.pushState = function () {
      pushHistory.apply(this, arguments);
      self.pathname = window.location.pathname;
    };
    const replaceHistory = history.replaceState;
    history.replaceState = function () {
      replaceHistory.apply(this, arguments);
      self.pathname = window.location.pathname;
    };
  }

  /**
   *
   * @param ur value of useRouter()
   * @param first whether this path is loaded for the first time
   */
  routeChangeCallback: (ur: ReturnType<typeof this.useRouter>, first: boolean) => void = null;

  protected updated(changedProperties: PropertyValueMap<this>) {
    const shouldDispatch = changedProperties.has("pathname") || changedProperties.has("path");
    if (shouldDispatch) {
      const ur = this.useRouter();
      const noRecord = !this.record.has(this.pathname);
      if (noRecord) {
        this.record.set(this.pathname, ur);
      }
      this.routeChangeCallback?.(ur, noRecord);
      this.dispatchEvent(new CustomEvent("change", { detail: ur }));
    }
  }

  fieldComponent(usedRouteTemplate?: string): null | T {
    if (!usedRouteTemplate) {
      usedRouteTemplate = this.useWhichRoute(this.pathname);
    }
    this.path = usedRouteTemplate;
    if (!usedRouteTemplate) {
      return null;
    }
    this.params = this.parseRouterParams(this.path, this.pathname);
    const route = this.routes.find((r) => r.path === usedRouteTemplate);
    if (!route) {
      return null;
    }
    return route.component;
  }

  slottedComponent(usedRouteTemplate?: string): null | HTMLTemplate {
    const childNodes = this.querySelectorAll(":scope > *[slot]");
    if (!childNodes.length) {
      return null;
    }
    const slottedPaths = Array.from(childNodes).map((node) => {
      const slotname = node.getAttribute("slot");
      return {
        path: slotname,
      };
    });
    const tempRouteTree = new RouteTree();
    for (const withPath of slottedPaths) {
      tempRouteTree.insert(withPath.path);
    }
    if (!usedRouteTemplate) {
      usedRouteTemplate = this.useWhichRoute(this.pathname, undefined, tempRouteTree);
      if (!usedRouteTemplate) {
        return null;
      }
    }
    const slotElement = slottedPaths.find((s) => s.path === usedRouteTemplate);
    if (!slotElement) {
      return null;
    }
    this.params = this.parseRouterParams(usedRouteTemplate, this.pathname);
    return htmlSlot(slotElement.path);
  }

  useWhichRoute(path: string, baseURL = this.baseURL, appl: RouteTree = this._routeTree): string | null {
    return appl.useWhich(baseURL + path);
  }

  parseRouterParams(routeTemplate: string, originpath: string, appl: RouteTree = this._routeTree): Record<string, string> {
    return appl.parseParams(originpath, routeTemplate);
  }

  static updateAll() {
    const routeViewTagName = conf.nameMap.get("route-view");
    if (!routeViewTagName) {
      return;
    }
    const routeViewArray = deepQuerySelectorAll<Router>(routeViewTagName, document.body);
    routeViewArray.forEach((ArrayItem) => {
      if (!ArrayItem.override) {
        ArrayItem.pathname = window.location.pathname;
      }
    });
  }
}

export default Router;

declare global {
  interface HTMLElementTagNameMap {
    "route-view": Router;
    "g-router": Router;
  }
}
