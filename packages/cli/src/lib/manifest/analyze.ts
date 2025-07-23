import { readFile } from "node:fs/promises";
import { create } from "@custom-elements-manifest/analyzer/src/create.js";
import { addFrameworkPlugins } from "@custom-elements-manifest/analyzer/src/utils/cli-helpers.js";
import ts from "typescript545";

export async function analyze(
  config: {
    input?: Record<string, string>;
    plugins?: any[];
  } = {},
  frameworks: {
    litelement?: boolean;
    stencil?: boolean;
    fast?: boolean;
    catalyst?: boolean;
    "catalyst-major-2"?: boolean;
  } = {},
): Promise<any> | undefined {
  const { input } = config;

  if (!input) {
    return;
  }

  const modules = await Promise.all(
    Object.entries(input).map(async ([relativePath, fullPath]) => {
      const source = await readFile(fullPath, "utf-8");
      return ts.createSourceFile(relativePath, source, ts.ScriptTarget.ESNext, true);
    }),
  );

  let thirdPartyCEMs = [];

  let plugins: any[] = await addFrameworkPlugins(frameworks);
  plugins = [...plugins, ...(config.plugins || [])];

  const context = { thirdPartyCEMs };

  return create({ modules, plugins, context });
}
