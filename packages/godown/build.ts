import "./manifest";

import { globSync } from "fs";
import postcss from "postcss";

import { autoprefixer, minify } from "../../common/postcss-plugins";
import { build, commonInput, commonOutput } from "../../common/rollup-creator";
import { minifyLiterals, templateReplacement, ts2 } from "../../common/rollup-plugins";

const dir = ".";

const input = globSync("src/**/*.ts");

await build(
  {
    ...commonInput,
    input,
    plugins: [
      templateReplacement(
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
    ],
  },
  {
    ...commonOutput,
    dir,
  },
);
