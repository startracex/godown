import { createRequire } from "node:module";
import type { RollupBuild, RollupOptions } from "rollup";

import { wrapThrowable } from "../utils.ts";

const requireRollup = (path?: string | URL): any => {
  const require = createRequire(path);
  return ["rollup", require("rollup").rollup];
};

const requireRolldown = (path?: string | URL): any => {
  const require = createRequire(path);
  return ["rolldown", require("rolldown").rolldown];
};

export const getBundlerSync = (
  tool?: string,
  path?: string | URL,
): ["rollup" | "rolldown", (options: RollupOptions) => Promise<RollupBuild>] => {
  if (tool === "rollup") {
    return requireRollup(path);
  }

  if (tool === "rolldown") {
    return requireRolldown(path);
  }

  let [result, err] = wrapThrowable(requireRollup, path);
  if (!err) {
    return result;
  }
  [result, err] = wrapThrowable(requireRolldown, path);
  if (!err) {
    return result;
  }
  throw err;
};
