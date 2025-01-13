import GodownElement from "@godown/element/element.js";
import { css } from "@lit/reactive-element/css-tag.js";
import { property } from "@lit/reactive-element/decorators/property.js";
import { state } from "@lit/reactive-element/decorators/state.js";

const importSpec = (specifier: string | URL, base: string | URL) =>
  (typeof specifier === "string" && import.meta.resolve)
    ? import.meta.resolve(specifier)
    : new URL(specifier, base || undefined) + "";

class IconElement extends GodownElement {
  static styles = [
    css`:host([contents]){display:contents}:host([contents]) svg{display:inline-block}`,
    css`:host{width:1em;height:1em;vertical-align:middle;display:inline-block}:host(:not([contents])) svg{height:100%;width:100%;display:block}`,
  ];

  @state()
  toURL: (this: IconElement, name: string) => string | URL = (id) => `./icons/${id}.js`;

  @property()
  loading: "lazy" | "eager" = "lazy";

  @property()
  base = import.meta.url;

  @property()
  name: string;

  @state()
  module: any;

  protected allowLoad?: boolean;

  load() {
    if (this.name && this.allowLoad) {
      import(importSpec(this.toURL(this.name), this.base)).then((i) => this.module = i);
    }
  }

  protected render() {
    return this.module?.default();
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.loading === "eager") {
      this.allowLoad = true;
      this.load();
    } else {
      const handleIntersection: IntersectionObserverCallback = (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.allowLoad = true;
            this.load();
            observer.unobserve(this);
          }
        });
      };
      const observer = new IntersectionObserver(handleIntersection);
      observer.observe(this);
    }
  }

  attributeChangedCallback(name: string, old: string, value: string | null): void {
    super.attributeChangedCallback(name, old, value);
    if (name === "name" && value) {
      this.load();
    }
  }
}

export { IconElement, IconElement as default };
