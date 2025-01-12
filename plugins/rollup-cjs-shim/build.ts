import { build } from "@godown/common/rollup-creator.ts";
import { commonjs } from "@godown/common/rollup-plugins.ts";

build({
  input: "index.js",
  output: {
    dir: ".",
    format: "cjs",
    entryFileNames: "[name].cjs",
    exports: "named",
  },
  plugins: [
    commonjs(),
  ],
});
