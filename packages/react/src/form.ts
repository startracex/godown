"use client";
import component from "godown/form.js";

import create, { type IntrinsicTag } from "./_create.js";

export default create(component);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "godown-form": IntrinsicTag<"godown-form">;
    }
  }
}
