import { alias } from "@godown/element/decorators/alias.js";
import GodownElement from "@godown/element/element.js";
import { css } from "@lit/reactive-element/css-tag.js";
import { property } from "@lit/reactive-element/decorators/property.js";
import { state } from "@lit/reactive-element/decorators/state.js";

class IconElement extends GodownElement {
  static styles = css`:host{width:1em;height:1em;display:inline-block}svg{height:100%;width:100%;display:block}`;

  @state()
  toURL: (id: string) => string | URL = (id) => `./icons/${id}.js`;

  @property()
  loading: "lazy" | "eager" = "lazy";

  @property()
  name: string;

  @state()
  module: any;

  protected allowLoad: boolean;

  load(id: string) {
    if (this.name && this.allowLoad) {
      import(this.toURL(id) + "").then((i) => this.module = i);
    }
  }

  protected render() {
    return this.module?.default();
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.loading === "eager") {
      this.allowLoad = true;
      this.load(this.name);
    } else {
      const handleIntersection: IntersectionObserverCallback = (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.allowLoad = true;
            this.load(this.name);
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
      this.load(value);
    }
  }
}

export { IconElement, IconElement as default };
