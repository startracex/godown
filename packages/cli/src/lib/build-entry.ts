import { join, relative, sep } from "path";
import { removeExt } from "./utils.ts";

export class BuildEntry {
  root: string;
  files: string[];
  outDir: string;
  constructor({
    outDir,
    rootDir,
    files,
  }: {
    outDir?: string;
    rootDir?: string;
    files?: string[];
  }) {
    this.root = rootDir;
    this.files = files;
    this.outDir = outDir;
  }

  get entries(): [string, string][] {
    return this.files.map((fileName) => {
      const rel = relative(this.root, fileName);
      return [rel, fileName];
    });
  }

  get input(): Record<string, string> {
    return Object.fromEntries(this.entries.map(([rel, full]) => {
      return [removeExt(rel), full];
    }));
  }

  get output(): Record<string, string> {
    return Object.fromEntries(this.entries.map(([rel]) => {
      return [removeExt(rel), join(this.outDir, rel)];
    }));
  }
}
