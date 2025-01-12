import { globSync } from "glob";
import postcss from "postcss";
import templateReplace from "rollup-plugin-template-replace";

import { autoprefixer, cssnano } from "../../common/postcss-plugins";
import { build, commonInput, commonOutput } from "../../common/rollup-creator";
import { minifyLiterals, terser, ts2 } from "../../common/rollup-plugins";

const dir = ".";

const input = globSync("src/**/*.ts");

await build(
  {
    ...commonInput,
    input,
    plugins: [
      templateReplace(
        {
          tags: ["css"],
          async callback(input) {
            const result = await postcss(autoprefixer(["since 2021"]), cssnano).process(input, { from: undefined });
            return result.css;
          },
        },
      ),
      minifyLiterals(),
      ts2(
        {
          tsconfig: "./tsconfig.prod.json",
        },
      ),
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
).then(
  () => {
    import("./manifest");
    import("./build_cdn.ts");
  },
);
