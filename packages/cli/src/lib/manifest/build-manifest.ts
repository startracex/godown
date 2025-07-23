import { readFile, writeFile } from "node:fs/promises";
import { basename, join } from "sharekit/path/filepath.js";
import { BuildEntry } from "../build-entry.ts";
import { analyze } from "./analyze.ts";
import { getFrameworks } from "./frameworks.ts";
import { vsCode, moduleDeclarationDefine as mdd, jetBrains } from "./plugins.ts";
import type { Plugin } from "@custom-elements-manifest/analyzer";
import { dirname } from "sharekit/path/filepath.js";

import { getCommonDir } from "../utils.ts";

export const buildManifest = async ({
  rootDir,
  fileNames,
  packagePath,
  packageJSON,
  plugins,
}: {
  rootDir?: string;
  fileNames: string[];
  packagePath?: string;
  packageJSON?: any;
  plugins?: Plugin[];
}): Promise<void> => {
  const buildEntry = new BuildEntry({ rootDir: rootDir || getCommonDir(fileNames), files: fileNames });
  const input = buildEntry.getNamedFiles({ ext: true });
  const ce = await analyze(
    {
      input,
      plugins: plugins ?? [mdd(), vsCode(), jetBrains()],
    },
    getFrameworks(packageJSON),
  );
  if (!packagePath) {
    return;
  }
  packagePath = basename(packagePath) === "package.json" ? packagePath : join(packagePath, "package.json");
  packageJSON ??= JSON.parse(await readFile(packagePath, "utf-8"));
  let cePath = packageJSON.customElements;
  if (!cePath) {
    cePath = join(dirname(packagePath), "custom-elements.json");
  }
  await writeFile(cePath, JSON.stringify(ce) + "\n");
};
