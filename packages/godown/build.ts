import { globSync } from "glob";
import postcss from "postcss";

import { autoprefixer, cssnano } from "@godown/common/postcss-plugins";
import { build, commonInput, commonOutput } from "@godown/common/rollup-creator";
import { minifyLiterals, templateReplace, terser, ts2 } from "@godown/common/rollup-plugins";

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
      minifyLiterals({
        options: {
          minifyOptions: {
            minifyCSS: false, // !This option will cause loss of CSS property value units
            minifyJS: false,
          },
        },
      }),
      ts2({
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
