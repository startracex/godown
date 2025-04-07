import { globSync } from "glob";
import postcss from "postcss";

import { autoprefixer, cssnano } from "@godown/common/third-party/postcss";
import { terser, ts } from "@godown/common/third-party/rollup";
import { minifyHtmlParts, templateReplace } from "@godown/common/workspace-scoped/rollup";
import { build, commonInput, commonOutput } from "@godown/common/rollup-creator";
import { basename, join } from "node:path";
const dir = ".";

const input = globSync("src/**/*.ts");

await build(
  {
    ...commonInput,
    input,
    plugins: [
      templateReplace({
        tags: ["css"],
        async callback(input) {
          const result = await postcss(autoprefixer(["since 2021"]), cssnano).process(input, { from: undefined });
          return result.css;
        },
      }),
      minifyHtmlParts(),
      ts({
        tsconfig: "./tsconfig.prod.json",
        compilerOptions: {
          sourceRoot: "__source__",
        },
      }),
      terser({
        keep_classnames: true,
      }),
    ],
  },
  {
    ...commonOutput,
    sourcemapPathTransform(s) {
      if (!s.includes("__source__")) {
        return s;
      }
      const [dir, wrongPath] = s.split("__source__");
      const base = basename(wrongPath);
      return join(dir, base);
    },
    dir,
  },
).then(() => {
  import("./manifest.ts");
  import("./build_cdn.ts");
});
