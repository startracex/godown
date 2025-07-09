import glob from "fast-glob";
import { resolve } from "path";

const expandSuffix = (p: string, ext?: string): string => {
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

export const globPattern = async ({ pattern, cwd, exts }: {
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
    return (await glob(include, {
      ignore: exclude,
      cwd,
    })).map((path) => resolve(path));
  }
};
