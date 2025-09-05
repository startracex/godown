import { program } from "commander";
import { buildManifest } from "../lib/manifest/build-manifest.ts";
import { setupTsconfig } from "../lib/tsconfig/setup.ts";
import { getPackageJSON } from "../lib/utils.ts";

export const runManifest = async (): Promise<void> => {
  const { tsconfig, fileNames } = await setupTsconfig(program.opts().tsconfig);
  const { rootDir } = tsconfig.compilerOptions;
  const [packagePath, packageJSON] = getPackageJSON();
  await buildManifest({
    rootDir,
    fileNames: fileNames.filter((f) => !f.endsWith(".d.ts")),
    packageJSON,
    packagePath: packagePath,
  });
};
