import { intersects, major, validRange } from "semver";

function isBelowV2(v: string): boolean {
  if (!validRange(v)) {
    return major(v) < 2;
  }

  return intersects(v, "<2.0.0");
}

export const getFrameworks = (
  dependencies: Record<string, string> = {},
): {
  litelement?: boolean;
  stencil?: boolean;
  fast?: boolean;
  catalyst?: boolean;
  "catalyst-major-2"?: boolean;
} => {
  const result: {
    litelement?: boolean;
    stencil?: boolean;
    fast?: boolean;
    catalyst?: boolean;
    "catalyst-major-2"?: boolean;
  } = {};

  if (dependencies.lit || dependencies["@lit/reactive-element"]) {
    result.litelement = true;
  }
  if (dependencies.stencil) {
    result.stencil = true;
  }
  if (dependencies["fast-element"]) {
    result.fast = true;
  }
  const catalyst = dependencies["@github/catalyst"];
  if (catalyst) {
    if (isBelowV2(catalyst)) {
      result.catalyst = true;
    } else {
      result["catalyst-major-2"] = true;
    }
  }

  return result;
};
