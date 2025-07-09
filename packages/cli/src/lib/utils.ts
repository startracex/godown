import type { OutputOptions, RollupBuild } from "rollup";
import { existsSync, readFileSync } from "node:fs";
import { dirname, extname, join } from "node:path";
import { builtinModules } from "node:module";

export const findUp = (filename: string, startDir: string): string | undefined => {
  let currentDir = startDir;
  let prevDir = null;

  while (currentDir !== prevDir) {
    const filePath = join(currentDir, filename);

    if (existsSync(filePath)) {
      return filePath;
    }

    prevDir = currentDir;
    currentDir = dirname(currentDir);
  }
};

export const removeExt = (name: string, ext?: string): string => {
  if (ext) {
    if (!name.endsWith(ext)) {
      return name;
    }
  } else {
    ext = extname(name);
  }

  return name.slice(0, -ext.length);
};

export const getPackageJSON = (cwd: string = process.cwd()): [string, any | null] => {
  const path = findUp("package.json", cwd);
  if (!path) {
    return ["", null];
  }
  return [path, JSON.parse(readFileSync(path, "utf-8"))];
};

export const createExternal = (deps: (
  | string
  | RegExp
)[]) => {
  return (id: string): boolean => {
    if (id.startsWith("node:") || id.startsWith("http://") || id.startsWith("https://")) {
      return true;
    }
    return deps.some((dep) => {
      if (typeof dep === "string") {
        return id === dep;
      }
      return dep.test(id);
    });
  };
};

export const packageExternal = (packageJSON: any = getPackageJSON()[1]): (id: string) => boolean => {
  const deps = [
    ...builtinModules,
    ...Object.keys(packageJSON.dependencies || {}),
    ...Object.keys(packageJSON.peerDependencies || {}),
  ].map((dep) => new RegExp(`^${dep}(/|$)`));
  return createExternal(deps);
};

export const writeOutputs = async (
  bundle: RollupBuild,
  output: OutputOptions | OutputOptions[],
): Promise<void> => {
  let outputs = Array.isArray(output) ? output : [output];
  await Promise.all(outputs.map(async (output) => await bundle.write(output)));
};

const isModuleFormat = (f: string) => {
  return f === "es" || f === "esm" || f === "module";
};

const isCommonFormat = (f: string) => {
  return f === "cjs" || f === "commonjs";
};

export const normalizeModuleFormat = (format: string): "amd" | "cjs" | "esm" | "iife" | "system" | "umd" => {
  if (isModuleFormat(format)) {
    format = "esm";
  } else if (isCommonFormat(format)) {
    format = "cjs";
  } else if (format === "systemjs") {
    format = "system";
  }
  return (format as any) || "esm";
};
