import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";

import { IconSet } from "@iconify/tools/lib/icon-set";
import { iconToSVG } from "@iconify/utils/lib/svg/build";
import { globSync } from "glob";

import format from "./lib/format.js";
import { build, commonInput } from "@godown/common/rollup-creator.js";
import { commonjs } from "@godown/common/third-party/rollup.js";
import { cjsShim } from "@godown/common/workspace-scoped/rollup.js";

const set = new IconSet(createRequire(import.meta.url)("@iconify-json/f7/icons.json"));

["icons", "types"].forEach((path) => {
  if (!existsSync(path)) {
    mkdirSync(path);
  }
});

const list = set.list(["icon"]);

list.forEach((item) => {
  const icon = set.resolve(item);
  if (!icon) {
    throw new Error(`Error occurred with building icon ${item}`);
  }
  const result = iconToSVG(icon);
  const jsCode = format(result);
  writeFileSync(`icons/${item}.js`, jsCode);
});

const I = `type I = import("@godown/element/directives/icon.d.ts").IconRenderer;\n`;

Object.entries({
  "includes.json": JSON.stringify(list),
  "types/icon.d.ts": I + "declare var i: I;\nexport default i;",
  "types/all.d.ts": I +
    list.map((name) => `declare module "@godown/f7-icon/icons/${name}.js" { var i: I; export default i; }`).join("\n"),
}).map((entry) => writeFileSync(entry[0], entry[1] + "\n"));

build({
  ...commonInput,
  input: globSync("lib/*.js"),
  output: {
    dir: ".",
    sourcemap: true,
    format: "cjs",
    entryFileNames: "[name].cjs",
    preserveModules: true,
    preserveModulesRoot: ".",
  },
  plugins: [cjsShim(), commonjs()],
});
