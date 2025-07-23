import { extname, relative } from "sharekit/path/filepath.js";

const pathsOutOf = (paths: string[], basePath: string): boolean => {
  return paths.some((path) => {
    const rel = relative(basePath, path);
    return rel.startsWith("..") || rel === path;
  });
};

const removeExt = (name: string, ext?: string): string => {
  if (ext) {
    if (!name.endsWith(ext)) {
      return name;
    }
  } else {
    ext = extname(name);
    if (ext === "") {
      return name;
    }
  }

  return name.slice(0, -ext.length);
};

const normalizeRootExt = (path: string, root: string, ext = true): string => {
  if (root) {
    path = relative(root, path);
  }
  if (!ext) {
    path = removeExt(path);
  }
  return path;
};

type BuildEntryInit = { outDir?: string; rootDir?: string; files?: string[] };

export class BuildEntry {
  rootDir: string;
  outDir: string;
  fileSet: Set<string> = new Set();

  constructor({ outDir = "", rootDir = "", files = [] }: BuildEntryInit) {
    this.rootDir = rootDir;
    this.outDir = outDir;
    this.addFiles(...files);
  }

  getFiles({
    root = "",
    ext = true,
  }: {
    root?: string;
    ext?: boolean;
  } = {}): string[] {
    return [...this.fileSet].map((f) => normalizeRootExt(f, root, ext));
  }

  addFiles(...files: string[]): void {
    for (const file of files) {
      this.fileSet.add(file);
    }
  }

  getNamedFiles({
    root = this.rootDir,
    ext = false,
  }: {
    root?: string;
    ext?: boolean;
  } = {}): Record<string, string> {
    const entries = [...this.fileSet].map((f) => {
      const named = normalizeRootExt(f, root, ext).replace(/\\/g, "/");
      return [named, f];
    });

    return Object.fromEntries(entries);
  }

  outOfDir(dir: string): boolean {
    return pathsOutOf([...this.fileSet], dir);
  }
}
