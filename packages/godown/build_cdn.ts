import { statSync } from "node:fs";
import type { InputOptions, OutputOptions } from "rollup";
import { build } from "@godown/common/rollup-creator";
import { nodeResolve, terser } from "@godown/common/rollup-plugins";
import packageJSON from "./package.json";

const intro = (...args: string[]) => {
  return `/**
 * @license MIT
 * @version ${packageJSON.version}${(args.length ? "\n * " : "") + args.join("\n * ")}
 */`;
};

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
        file: "build/godown.js",
        format: "es",
        sourcemap: true,
        indent: false,
        intro: intro(`Require Lit Core (import from \`"lit"\`)`),
      },
      {
        file: "build/godown.iife.js",
        format: "iife",
        name: "Godown",
        indent: false,
        globals: {
          lit: "Lit",
        },
        intro: intro(`Require Lit Core ("Lit" in globalThis)`),
      },
      {
        file: "build/godown.umd.js",
        format: "umd",
        name: "Godown",
        sourcemap: true,
        indent: false,
        globals: {
          lit: "Lit",
        },
        intro: intro(`Require Lit Core ("Lit" in globalThis)`),
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
        file: "build/godown+lit.js",
        format: "es",
        sourcemap: true,
        intro: intro(),
        indent: false,
      },
      {
        file: "build/godown+lit.iife.js",
        format: "iife",
        name: "Godown",
        sourcemap: true,
        intro: intro(),
        indent: false,
      },
      {
        file: "build/godown+lit.umd.js",
        format: "umd",
        name: "Godown",
        sourcemap: true,
        intro: intro(),
        indent: false,
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
    console.info(`${file.padEnd(maxLen)} (${
      buildFlag
        ? (statSync(file).size / 1024).toFixed(1) + " KiB"
        : "skipped"
    })`);
  });
});
