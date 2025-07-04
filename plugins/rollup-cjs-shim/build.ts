import { build, packageDependencies } from "@godown/common/build.ts";
import pkg from "./package.json" with { type: "json" };

build(
  {
    input: "index.ts",
    external: packageDependencies(pkg),
  },
  [
    {
      exports: "named",
      format: "cjs",
      file: "index.cjs",
    },
    {
      exports: "named",
      file: "index.js",
    },
  ],
);
