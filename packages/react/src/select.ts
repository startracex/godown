"use client";
import Select from "godown/select.js";

import { createReact, eventMap, type TargetedCustomEvent } from "./lib/create.js";
import type { IntrinsicElement } from "./lib/intrinsic.js";

export default createReact(
  Select,
  eventMap<{
    onChange: TargetedCustomEvent<string, Select>;
    onInput: TargetedCustomEvent<string, Select>;
    onSelect: TargetedCustomEvent<string | string[], Select>;
  }>({
    onInput: "input",
    onChange: "change",
    onSelect: "select",
  }),
);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-select": IntrinsicElement<Select>;
    }
  }
}
