import { rmSync } from "node:fs";
import { join } from "node:path";

import { type GlobOptions, globSync } from "glob";

/**
 * Converts the input ts pattern to an array of output files and then removes them.
 */
export function cleanTSGenFiles(
  input: {
    pattern: string[];
    dir?: string;
    options?: GlobOptions;
  },
  output: {
    addFiles?: string[];
    addDirs?: string[];
    dir?: string;
    options?: GlobOptions;
  },
) {
  const p1 = globSync(input.pattern, {
    cwd: input.dir,
    ...input.options,
  }).map(
    path => path.slice(0, -3) + ".{js,d.ts,js.map,d.ts.map}",
  );

  const files = globSync([...p1, ...output.addFiles], {
    cwd: output.dir,
  });

  const p2 = globSync("*/", {
    cwd: input.dir,
  });

  const dirs = globSync([...p2, ...output.addDirs], {
    cwd: output.dir,
  });

  files.forEach(file => rmSync(join(output.dir, file)));
  dirs.forEach(dir => rmSync(join(output.dir, dir), { recursive: true }));
}
