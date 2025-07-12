import { readFileSync } from "node:fs";
import { create } from "@custom-elements-manifest/analyzer/src/create.js";
import { addFrameworkPlugins } from "@custom-elements-manifest/analyzer/src/utils/cli-helpers.js";
import ts from "./_typescript.ts";

export async function analyze(config: {
  input?: Record<string, string>;
  plugins?: any[];
} = {}, frameworks: {
  litelement?: boolean;
  stencil?: boolean;
  fast?: boolean;
  catalyst?: boolean;
  "catalyst-major-2"?: boolean;
} = {}): Promise<any> {
  const { input } = config;

  const modules = (Object.entries(input)).map(([relativePath, fullPath]) => {
    const source = readFileSync(fullPath).toString();
    return ts.createSourceFile(relativePath, source, ts.ScriptTarget.ESNext, true);
  });

  let thirdPartyCEMs = [];

  let plugins: any[] = await addFrameworkPlugins(frameworks);
  plugins = [...plugins, ...(config.plugins || [])];

  const context = { thirdPartyCEMs };

  return create({ modules, plugins, context });
}
