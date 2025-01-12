import { globSync } from "glob";

import { analyze } from "@godown/common/cem";
import { fixModule, jb, moduleDeclarationDefine, vs } from "@godown/common/cem-plugins";
import { minJSON } from "@godown/common/min-json";

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

["custom-elements.json", "web-types.json", "vscode.css-custom-data.json", "vscode.html-custom-data.json"].map(minJSON);
