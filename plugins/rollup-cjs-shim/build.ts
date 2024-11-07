import { build } from "../../common/rollup-creator.ts";
import { commonjs } from "../../common/rollup-plugins.ts";
import cjsReplace from "./index.ts";

build({
  input: "index.js",
  output: {
    dir: ".",
    format: "cjs",
    entryFileNames: "[name].cjs",
    exports: "named",
  },
  plugins: [
    cjsReplace(),
    commonjs(),
  ],
});
