import "./manifest";

import { globSync } from "glob";
import postcss from "postcss";
import templateReplace from "rollup-plugin-template-replace";

import { autoprefixer, minify } from "../../common/postcss-plugins";
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
          callback(input) {
            return postcss(autoprefixer(["since 2021"]), minify).process(input).css.trim();
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
        // eslint-disable-next-line camelcase
        keep_classnames: true,
      }),
    ],
  },
  {
    ...commonOutput,
    dir,
  },
);
