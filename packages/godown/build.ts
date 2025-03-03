import { globSync } from "glob";
import postcss from "postcss";

import { autoprefixer, cssnano } from "@godown/common/third-party/postcss";
import { terser, ts } from "@godown/common/third-party/rollup";
import { minifyHtmlParts, templateReplace } from "@godown/common/workspace-scoped/rollup";
import { build, commonInput, commonOutput } from "@godown/common/rollup-creator";

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
      }),
      terser({
        ecma: 2021,
        keep_classnames: true,
      }),
    ],
  },
  {
    ...commonOutput,
    dir,
  },
).then(() => {
  import("./manifest.ts");
  import("./build_cdn.ts");
});
