#!/usr/bin/env node
import { Command } from "commander";

import thisPackage from "../package.json" with { type: "json" };
import { booleanOption } from "./lib/utils.ts";

const program = new Command();

const getOptions = <T extends Record<string, any> = any>(thisArg): T => {
  return { ...thisArg.opts(), ...program.opts() };
};

const repeatableOption = <T = string>(
  arr: T[] = [],
  toValue: (s: string) => T = (s) => s as T,
): ((value: string) => T[]) => {
  return (value: string) => {
    arr.unshift(toValue(value));
    return arr;
  };
};

const dirOrFileOutputs: { dir?: string; file?: string }[] = [];

program
  .name(thisPackage.name)
  .version(thisPackage.version, "-v, --version")
  .description(thisPackage.description)
  .option("--tsconfig", "tsconfig path", "tsconfig.json");

program
  .command("build [pattern...]")
  .alias("b")
  .description("build the package")
  .option("-c, --config <config>", "config file path")
  .option("-r, --root-dir <root-dir>", "root directory path")
  .option(
    "-o, --out <output-path>",
    "output file path (repeatable)",
    repeatableOption(dirOrFileOutputs, (value: string) => ({ file: value })),
  )
  .option(
    "-d, --out-dir <output-path>",
    "output directory path (repeatable)",
    repeatableOption(dirOrFileOutputs, (value: string) => ({ dir: value })),
  )
  .option(
    "-f, --format <format>",
    "output format (repeatable, aligned to the right according to the output)",
    repeatableOption(),
  )
  .option("-e, --external <external>", "external (repeatable)", repeatableOption())
  .option("-b, --bundler <bundler>", "specify the bundler, rollup or rolldown")
  .option("--globals <globals>", "global name (repeatable)", repeatableOption())
  .option("--name <name>", "output global name")
  .option("--manifest [boolean]", "generate custom element manifest", booleanOption)
  .option("--map [boolean]", "emit source map", booleanOption)
  .option("--dts [boolean]", "emit declaration", booleanOption)
  .option("--dry-run [boolean]", "dry-run", booleanOption)
  .option("--minify [boolean]", "minify output", booleanOption)
  .action(function (pattern: string[]) {
    import("./cmd/build.ts").then(({ runBuild }) => {
      runBuild(pattern, dirOrFileOutputs, getOptions(this));
    });
  });

program
  .command("compile [pattern...]")
  .alias("c")
  .description("compile the package")
  .option("-c, --config <config>", "config file path")
  .option("-r, --root-dir <root-dir>", "root directory path")
  .option("-o, --out <output-path>", "output file path")
  .option("-d, --out-dir <output-path>", "output directory path")
  .option("--map [boolean]", "emit source map", booleanOption)
  .option("--dts [boolean]", "emit declaration", booleanOption)
  .action(function (pattern: string[]) {
    import("./cmd/compile.ts").then(({ runCompile }) => {
      runCompile(pattern, getOptions(this));
    });
  });

program
  .command("manifest")
  .description("generate custom element manifest")
  .action(() => {
    import("./cmd/manifest.ts").then(({ runManifest }) => {
      runManifest();
    });
  });

program.parse();
