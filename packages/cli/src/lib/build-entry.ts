import { relative } from "path";
import { removeExt } from "./utils.ts";
import { getCommonPath, pathsOutOf } from "./path-utils.ts";

const normalizeRootExt = (path: string, root: string, ext = true): string => {
  if (root) {
    path = relative(root, path);
  }
  if (!ext) {
    path = removeExt(path);
  }
  return path;
};

export class BuildEntry {
  root: string;
  fileSet: Set<string> = new Set();
  outDir: string;
  constructor({
    outDir = "",
    rootDir = "",
    files = [],
  }: {
    outDir?: string;
    rootDir?: string;
    files?: string[];
  }) {
    this.root = rootDir;
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
    root = this.root,
    ext = false,
  }: {
    root?: string;
    ext?: boolean;
  } = {}): Record<string, string> {
    const entries = [...this.fileSet].map((f) => {
      const named = normalizeRootExt(f, root, ext);
      return [named, f];
    });

    return Object.fromEntries(entries);
  }

  outOfDir(dir: string): boolean {
    return pathsOutOf([...this.fileSet], dir);
  }

  getCommonPath(): string {
    return getCommonPath([...this.fileSet]);
  }
}
