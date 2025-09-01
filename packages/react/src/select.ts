"use client";
import Select from "godown/select.js";

import { createReact, eventMap, type TargetedCustomEvent } from "./lib/create.js";
import type { IntrinsicElement } from "./lib/intrinsic.js";

export default createReact(
  Select,
  eventMap<{
    onChange: TargetedCustomEvent<string, InstanceType<typeof Select>>;
    onInput: TargetedCustomEvent<string, InstanceType<typeof Select>>;
    onSelect: TargetedCustomEvent<string | string[], InstanceType<typeof Select>>;
  }>({
    onInput: "input",
    onChange: "change",
    onSelect: "select",
  }),
);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-select": IntrinsicElement<InstanceType<typeof Select>>;
    }
  }
}
