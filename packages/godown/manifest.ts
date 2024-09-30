import { moduleDeclarationDefine } from "cem-plugin-define";
import fixModule from "cem-plugin-fix-module";
import { globSync } from "fs";

import { analyze } from "../../common/cem";
import { jb, vs } from "../../common/cem-plugins";
import { minJSON } from "../../common/min-json";

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
    vs.customElementVsCodePlugin(),
    jb.customElementJetBrainsPlugin(),
  ],
  cwd: import.meta.dirname,
});

["custom-elements.json", "web-types.json", "vscode.css-custom-data.json", "vscode.html-custom-data.json"].map(minJSON);
