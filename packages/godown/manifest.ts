import { globSync } from "glob";

import { analyze } from "@godown/common/cem";
import { jb, vs } from "@godown/common/third-party/cem";
import { minJSON } from "@godown/common/min-json";
import { statSync } from "node:fs";
import { fixModule, moduleDeclarationDefine } from "@godown/common/workspace-scoped/cem";

function toJSPath(path: string) {
  return path
    .replace(/^\/?src\//, "")
    .replace(/\.ts$/, ".js");
}

await analyze({
  input: globSync("src/**/*.ts"),
  litelement: true,
  plugins: [
    moduleDeclarationDefine(),
    fixModule(toJSPath),
    vs(),
    jb(),
  ],
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
  console
    .info(`${file.padEnd(Math.max(...jsonFiles.map((item) => item.length)))} (${
      (statSync(file).size / 1024).toFixed(1) + " KiB"
    })`);
});
