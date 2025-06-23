import { globSync } from "glob";
import postcss from "postcss";
import { statSync } from "node:fs";
import { basename, join } from "node:path";

import { jb, vs } from "@godown/common/third-party/cem.ts";
import { autoprefixer, cssnano } from "@godown/common/third-party/postcss.ts";
import { nodeResolve, terser, ts } from "@godown/common/third-party/rollup.ts";
import { minifyHtmlParts, templateReplace } from "@godown/common/workspace-scoped/rollup.ts";
import { fixModule, moduleDeclarationDefine } from "@godown/common/workspace-scoped/cem.ts";
import { build, commonInput, commonOutput } from "@godown/common/rollup-creator.ts";
import { minJSON } from "@godown/common/min-json.ts";
import { analyze } from "@godown/common/cem.ts";
import type { InputOptions, OutputOptions } from "rollup";

import packageJSON from "./package.json" with { type: "json" };

buildPackage().then(() => {
  buildCDN();
  buildManifest();
});

async function buildPackage() {
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
  );
}

async function buildCDN() {
  const intro = (...args: string[]) => {
    return `/**
 * @license ${packageJSON.license}
 * @version ${packageJSON.version}${(args.length ? "\n * " : "") + args.join("\n * ")}
 */`;
  };

  const commonOutput = {
    sourcemap: true,
    sourcemapExcludeSources: true,
    sourcemapIgnoreList: false,
    indent: false,
    intro: intro(),
  };

  const introRequireCore = intro('Require Lit Core (import from `"lit"`)');

  const buildInto: (InputOptions & { output: OutputOptions[] })[] = [
    {
      input: "index.js",
      external: ["lit"],
      plugins: [
        nodeResolve(),
        terser({
          ecma: 2021,
          keep_classnames: true,
        }),
      ],
      output: [
        {
          ...commonOutput,
          file: "build/godown.js",
          format: "es",
          intro: introRequireCore,
        },
        {
          ...commonOutput,
          file: "build/godown.iife.js",
          format: "iife",
          name: "Godown",
          globals: {
            lit: "Lit",
          },
          intro: introRequireCore,
        },
        {
          ...commonOutput,
          file: "build/godown.umd.js",
          format: "umd",
          name: "Godown",
          globals: {
            lit: "Lit",
          },
          intro: introRequireCore,
        },
      ],
    },
    {
      input: "index.js",
      plugins: [
        nodeResolve(),
        terser({
          ecma: 2021,
          keep_classnames: true,
        }),
      ],
      output: [
        {
          ...commonOutput,
          file: "build/godown+lit.js",
          format: "es",
        },
        {
          ...commonOutput,
          file: "build/godown+lit.iife.js",
          format: "iife",
          name: "Godown",
        },
        {
          ...commonOutput,
          file: "build/godown+lit.umd.js",
          format: "umd",
          name: "Godown",
        },
      ],
    },
  ];

  const maxLen = Math.max(...buildInto.flatMap(({ output }) => output.map((item1) => item1.file.length)));

  const buildFlag = !process.env.VERCEL; // skip build in Vercel

  buildInto.forEach(async (into) => {
    if (buildFlag) {
      await build(into);
    }
    into.output.forEach(({ file }) => {
      console.info(
        `${file.padEnd(maxLen)} (${buildFlag ? (statSync(file).size / 1024).toFixed(1) + " KiB" : "skipped"})`,
      );
    });
  });
}

async function buildManifest() {
  function toJSPath(path: string) {
    return (
      path
        // biome-ignore lint/performance/useTopLevelRegex:_
        .replace(/^\/?src\//, "")
        // biome-ignore lint/performance/useTopLevelRegex:_
        .replace(/\.ts$/, ".js")
    );
  }

  await analyze({
    input: globSync("src/**/*.ts"),
    litelement: true,
    plugins: [moduleDeclarationDefine(), fixModule(toJSPath), vs(), jb()],
    cwd: import.meta.dirname,
  });

  const jsonFiles = [
    "custom-elements.json",
    "web-types.json",
    "vscode.css-custom-data.json",
    "vscode.html-custom-data.json",
  ];

  jsonFiles.forEach(minJSON);

  jsonFiles.forEach((file) => {
    console.info(
      `${file.padEnd(Math.max(...jsonFiles.map((item) => item.length)))} (${
        (statSync(file).size / 1024).toFixed(1) + " KiB"
      })`,
    );
  });
}
