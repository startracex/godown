import { build } from "../../common/rollup-creator.ts";
import { commonjs } from "../../common/rollup-plugins.ts";

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
