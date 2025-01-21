import { noChange } from "lit";
import { Directive, directive, type DirectiveResult, type ElementPart, PartType } from "lit/directive.js";

class DatasetDirective extends Directive {
  render(value: Record<string, any>): void {
  }

  update(part: ElementPart, [value]: Parameters<this["render"]>): symbol {
    if (value && part.type === PartType.ELEMENT) {
      for (const name in value) {
        (part.element as HTMLElement).dataset[name] = value[name];
      }
    }
    return noChange;
  }
}

export const dataset: (
  value: Record<string, any>,
  caller?: (element: Element, name: string, value: any) => void,
) => DirectiveResult<typeof DatasetDirective> = directive(DatasetDirective);
