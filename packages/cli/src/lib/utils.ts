import glob from "fast-glob";
import { existsSync, readFileSync } from "node:fs";
import { builtinModules } from "node:module";
import type { OutputOptions, RollupBuild } from "rollup";
import { isObject, isString } from "sharekit";
import { dirname, join, sep } from "sharekit/path/filepath.js";

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

export const getPackageJSON = (cwd: string = process.cwd()): [string, Record<string, any>] | [undefined, null] => {
  const path = findUp("package.json", cwd);
  if (!path) {
    return [undefined, null];
  }
  return [path, JSON.parse(readFileSync(path, "utf-8"))];
};

const matchStringOrRegExp = (a: string | RegExp, b: string): boolean => {
  if (isString(a)) {
    return a === b;
  }
  return a.test(b);
};

export const createExternal = (deps: (string | RegExp)[] = []) => {
  return (id: string): boolean => {
    if (id.startsWith("node:") || id.startsWith("http://") || id.startsWith("https://")) {
      return true;
    }
    return deps.some((dep) => matchStringOrRegExp(dep, id));
  };
};

export const packageExternal = (packageJSON: any = getPackageJSON()[1]): ((id: string) => boolean) => {
  const deps = [
    ...builtinModules,
    ...Object.keys(packageJSON.dependencies || {}),
    ...Object.keys(packageJSON.peerDependencies || {}),
  ].map((dep) => new RegExp(`^${dep}(/|$)`));
  return createExternal(deps);
};

export const stringsExternal = (s: string[]): ((id: string) => boolean) => {
  return createExternal(
    s
      .map((ss) => {
        if (ss.startsWith("/") && ss.endsWith("/")) {
          return new RegExp(ss.slice(1, -1));
        }
        return ss;
      })
      .filter(Boolean),
  );
};

export const writeBundle = async (
  bundle: RollupBuild,
  output: OutputOptions | OutputOptions[],
  close?: boolean,
): Promise<void> => {
  let outputs = Array.isArray(output) ? output : [output];
  await Promise.all(outputs.map(async (output) => await bundle.write(output)));
  if (close) {
    await bundle.close();
  }
};

const isModuleFormat = (f: string) => {
  return f === "es" || f === "esm" || f === "module";
};

const isCommonFormat = (f: string) => {
  return f === "cjs" || f === "commonjs";
};

const isSystemFormat = (f: string) => {
  return f === "system" || f === "systemjs";
};

export const normalizeFormat = (format: string): "amd" | "cjs" | "esm" | "iife" | "system" | "umd" => {
  if (isModuleFormat(format)) {
    return "esm";
  }
  if (isCommonFormat(format)) {
    return "cjs";
  }
  if (isSystemFormat(format)) {
    return "system";
  }
  if (format === "amd" || format === "iife" || format === "umd") {
    return format;
  }
  return "esm";
};

const trimQuotesRegexp = /^(['"])(.*)\1$/;
export const trimQuotes = (str: string): string => {
  return str.replace(trimQuotesRegexp, "$2");
};

type AlignArrays<T = any> = Record<PropertyKey, T[]>;

export const alignAssign = <T = any, A extends AlignArrays = AlignArrays>(
  base: T[],
  arrays: A,
): (T & {
  [K in keyof A]: A[K][number];
})[] => {
  return base.map((b, i) => {
    const result = { ...b };
    for (const key in arrays as any) {
      if (arrays[key].length > i) {
        result[key] = arrays[key][i];
      }
    }
    return result;
  }) as any;
};

export const expandArray = <T = any>(
  arr: T[] | undefined,
  len: number,
  val?: T,
  callFn: (...items: T[]) => number = Array.prototype.push,
): T[] => {
  if (!arr) {
    return Array(len).fill(val);
  }
  if (arr.length < len) {
    callFn.call(arr, ...Array(len - arr.length).fill(val));
  }
  return arr;
};

export const getCommonPath = (paths: string[], separator: string = sep): string => {
  if (paths.length === 0) {
    return "";
  }
  const firstPath = paths[0].split(separator);
  let commonLength = firstPath.length;
  for (let i = 1; i < paths.length; i++) {
    const currentPath = paths[i].split(separator);
    commonLength = Math.min(commonLength, currentPath.length);
    for (let j = 0; j < commonLength; j++) {
      if (firstPath[j] !== currentPath[j]) {
        commonLength = j;
        break;
      }
    }
    if (commonLength === 0) {
      break;
    }
  }
  const commonPath = firstPath.slice(0, commonLength).join(separator);
  if (commonPath && paths.every((p) => p.startsWith(commonPath))) {
    return commonPath.endsWith(separator) ? commonPath : commonPath + separator;
  }
  return commonPath;
};

export const getCommonDir = (paths: string[], separator: string = sep): string => {
  const commonPath = getCommonPath(paths, separator);
  if (commonPath.endsWith(separator)) {
    return commonPath.slice(0, commonPath.length - 1);
  }
  const idx = commonPath.lastIndexOf(separator);
  if (idx === -1) {
    return commonPath;
  }
  return commonPath.slice(0, idx);
};

export const expandSuffix = (p: string, ext?: string): string => {
  if (!ext) {
    if (p.endsWith("/")) {
      return `${p}/**/*`;
    }
    return p;
  }
  const withExt = `**/*{${ext}}`;
  if (p.endsWith("/")) {
    return `${p}+(|${withExt})`;
  }
  if (p.endsWith("*")) {
    return `${p}{${ext}}+(/${withExt})`;
  }
  return `${p}+(|/${withExt})`;
};

export const globPattern = async ({
  pattern,
  cwd,
  exts,
}: {
  cwd?: string;
  exts?: string[];
  pattern: string | string[];
}): Promise<string[]> => {
  const ext = exts?.join(",");

  if (typeof pattern === "string") {
    pattern = [pattern];
  }
  if (pattern.length) {
    const include = pattern.filter((p) => !p.startsWith("!")).map((p) => expandSuffix(p, ext));
    const exclude = pattern.filter((p) => p.startsWith("!")).map((p) => expandSuffix(p.slice(1)));
    return await glob(include, {
      ignore: exclude,
      cwd,
      absolute: true,
    });
  }
};

export function* flatObjectArray<T extends object>(arr: T[]): Generator<[keyof T, T[keyof T], number], void, unknown> {
  for (let i = 0; i < arr.length; i++) {
    const obj = arr[i];
    for (const key in obj) {
      if (Object.hasOwn(obj, key)) {
        yield [key, obj[key], i];
      }
    }
  }
}

export const filterAssign = <T extends object>(
  filter: (value: any, key: string | number | symbol) => boolean,
  target: T,
  ...objects: object[]
): T & Record<PropertyKey, unknown> => {
  objects.slice(1).forEach((obj) => {
    if (!isObject(obj)) {
      return;
    }

    Object.keys(obj).forEach((key) => {
      const value = (obj as any)[key];
      if (filter(value, key)) {
        (target as any)[key] = value;
      }
    });
  });

  return target as any;
};

export const toJsExt = (ext: string, jsx: boolean): string => {
  switch (ext) {
    case ".ts":
      return ".js";
    case ".tsx":
    case ".jsx":
      return jsx ? ".jsx" : ".js";
    case ".mts":
      return ".mjs";
    case ".cts":
      return ".cjs";
    default:
      return ext;
  }
};

export const toDtsExt = (ext: string): string => {
  switch (ext) {
    case ".ts":
    case ".tsx":
      return ".d.ts";
    case ".mts":
      return ".d.mts";
    case ".cts":
      return ".d.cts";
    default:
      return ext;
  }
};

export const isTsExt = (ext: string): boolean => {
  switch (ext) {
    case ".ts":
    case ".tsx":
    case ".mts":
    case ".cts":
      return true;
    default:
      return false;
  }
};

export const getExts = (js: boolean, jsx: boolean): string[] => {
  const extensions = [".ts", ".mts", ".cts"];
  if (jsx) {
    extensions.push(".tsx");
  }
  if (js) {
    extensions.push(".js", ".mjs", ".cjs");
    if (jsx) {
      extensions.push(".jsx");
    }
  }
  return extensions;
};

export const firstPromiseResolved = <T>(promises: Promise<T>[]): Promise<T> => {
  if (promises.length === 0) {
    return;
  }
  const wrappedPromises: Promise<T>[] = promises.map((promise) => promise.catch(() => new Promise<T>(() => {})));
  const allRejectedPromise: Promise<never> = Promise.all(
    promises.map((promise) =>
      promise.catch((error) => {
        return error instanceof Error ? error : new Error(String(error));
      }),
    ),
  ).then((errors) => {
    return Promise.reject(errors);
  });

  return Promise.race<T>([...wrappedPromises, allRejectedPromise]);
};

export const wrapThrowable = <T extends (...args: any[]) => any>(
  func: T,
  ...args: Parameters<T>
): [ReturnType<T>, null] | [undefined, Error] => {
  try {
    const result = func(...args);
    return [result, null];
  } catch (e) {
    const error = e instanceof Error ? e : new Error(String(e));
    return [undefined, error];
  }
};

export const booleanOption = (v: any): boolean => {
  v = v + "";
  return v !== "0" && v !== "false";
};
