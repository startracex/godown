import { globby } from "globby";
import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import { type SourceMap, transform } from "oxc-transform";
import { resolve } from "node:path";
import migrate from "rollup-plugin-oxc/migrate.js";
import { basename, dirname, extname, relative } from "sharekit/path/filepath.js";
import { isNullable, join } from "sharekit";

import { filterAssign, toDtsExt, toJsExt } from "../../lib/utils.ts";
import { setupTsconfig } from "../../lib/tsconfig/setup.ts";
import { BuildEntry } from "../../lib/build-entry.ts";

const emitFile = (path: string, code: string, map?: SourceMap) => {
  const promises: Promise<void>[] = [writeFile(path, code)];
  if (map) {
    map.file = basename(path);
    promises.push(writeFile(`${path}.map`, JSON.stringify(map)));
  }
  return Promise.all(promises);
};

async function mkdirAll(dirPath: string) {
  try {
    await access(dirPath);
  } catch {
    await mkdir(dirPath, { recursive: true });
  }
}

export const runCompile = async (
  pattern: string[],
  {
    tsconfig,
    dts,
    map,
    out,
    outDir,
    rootDir,
  }: {
    tsconfig: string;
    dts: boolean;
    map: boolean;
    outDir: string;
    out: string;
    rootDir: string;
  },
): Promise<void> => {
  const cwd = process.cwd();

  const tsconfigResult = await setupTsconfig(tsconfig);
  const files = pattern.length
    ? await globby(pattern, {
        absolute: true,
        ignore: ["**/node_modules", "**/*.d.ts"],
      })
    : tsconfigResult.fileNames.filter((f) => !f.endsWith(".d.ts"));

  const { compilerOptions } = tsconfigResult.tsconfig;
  filterAssign(isNullable, compilerOptions, {
    sourceMap: map,
    declaration: dts,
    declarationMap: (dts && map) || undefined,
  });
  rootDir = rootDir ? resolve(rootDir) : (compilerOptions.rootDir ?? tsconfigResult.dir ?? cwd);
  outDir = outDir ? resolve(outDir) : (compilerOptions.outDir ?? tsconfigResult.dir ?? cwd);
  const buildEntry = new BuildEntry({
    rootDir,
    files,
  });
  const namedFiles = buildEntry.getNamedFiles();
  const oxcOptions = migrate(compilerOptions);
  const preserveJsx = compilerOptions.jsx === "preserve" || compilerOptions.jsx === "react-native";
  if (out) {
    if (buildEntry.fileSet.size !== 1) {
      throw new Error("Out file cannot be specified when there are multiple inputs.");
    }
    const jsOutputPath = resolve(out);
    const fullPath = buildEntry.getFiles()[0];
    const text = await readFile(fullPath, "utf-8");
    const { code, map } = transform(relative(jsOutputPath, fullPath), text, oxcOptions);
    await emitFile(jsOutputPath, code, map);
    return;
  }

  const emitPromises = Object.entries(namedFiles).map(async ([name, fullPath]) => {
    const ext = extname(fullPath);
    const jsName = `${name}${toJsExt(ext, preserveJsx)}`;
    const jsOutputPath = join(outDir, jsName);
    const text = await readFile(fullPath, "utf-8");
    const { code, map, declaration, declarationMap } = transform(relative(jsOutputPath, fullPath), text, oxcOptions);
    await mkdirAll(dirname(jsOutputPath));
    const emitJsPromise = emitFile(jsOutputPath, code, map);
    if (declaration) {
      const dtsName = `${name}${toDtsExt(ext)}`;
      const dtsOutputPath = join(outDir, dtsName);
      const emitDtsPromise = emitFile(dtsOutputPath, declaration, declarationMap);

      return Promise.all([emitJsPromise, emitDtsPromise]);
    } else {
      return emitJsPromise;
    }
  });

  await Promise.all(emitPromises);
};
