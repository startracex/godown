import fs from "node:fs";
import path from "node:path";

import { create } from "@custom-elements-manifest/analyzer/src/create.js";
import { addFrameworkPlugins } from "@custom-elements-manifest/analyzer/src/utils/cli-helpers.js";
import { findExternalManifests } from "@custom-elements-manifest/analyzer/src/utils/find-external-manifests.js";
import ts from "typescript";

const defaults: Options = {
  outdir: "",
  dev: false,
  quiet: false,
  watch: false,
  litelement: false,
  stencil: false,
  fast: false,
  catalyst: false,
  "catalyst-major-2": false,
  dependencies: false,
  cwd: process.cwd(),
  noWrite: false,
};

export interface Options {
  input?: string[];
  outdir?: string;
  dev?: boolean;
  quiet?: boolean;
  watch?: boolean;
  litelement?: boolean;
  stencil?: boolean;
  fast?: boolean;
  catalyst?: boolean;
  "catalyst-major-2"?: boolean;
  dependencies?: boolean;
  plugins?: any[];
  cwd?: string;
  noWrite?: boolean;
}

export async function analyze(config: Options = {}) {
  const mergedOptions = { ...defaults, ...config };
  const { cwd, input } = mergedOptions;

  const modules = input.map((inputPath) => {
    const filePath = path.resolve(cwd, inputPath);

    const source = fs.readFileSync(filePath).toString();
    return ts.createSourceFile(inputPath, source, ts.ScriptTarget.ESNext, true);
  });

  let thirdPartyCEMs = [];
  if (mergedOptions.dependencies) {
    try {
      const inputResolved = input.map((inputItem) => path.resolve(cwd, inputItem));
      thirdPartyCEMs = await findExternalManifests(inputResolved, { basePath: cwd });
    } catch { /* empty */ }
  }

  let plugins: any[] = await addFrameworkPlugins(mergedOptions);
  plugins = [...plugins, ...(config.plugins || [])];

  const context = { dev: mergedOptions.dev, thirdPartyCEMs };

  const customElementsManifest = create({ modules, plugins, context });

  const outDirResolved = path.resolve(cwd, mergedOptions.outdir);

  if (!config.noWrite) {
    if (!fs.existsSync(outDirResolved)) {
      fs.mkdirSync(outDirResolved, { recursive: true });
    }

    fs.writeFileSync(
      path.join(outDirResolved, "custom-elements.json"),
      `${JSON.stringify(customElementsManifest, null, 2)}\n`,
    );
  }

  return customElementsManifest;
}
