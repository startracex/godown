import { statSync } from "node:fs";
import type { InputOptions, OutputOptions } from "rollup";
import { build } from "@godown/common/rollup-creator";
import { nodeResolve, terser } from "@godown/common/third-party/rollup";
import packageJSON from "./package.json";

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
