import type { Plugin } from "@custom-elements-manifest/analyzer";

import { analyzeJSDoc } from "./lib/jsdoc.js";
import { analyzeModuleDeclaration } from "./lib/module-declaration.js";

export function jsDocDefine(match = "define"): Plugin {
  return {
    name: "cem-plugin-define (JSDoc)",
    analyzePhase(params) {
      analyzeJSDoc(match, params);
    },
  };
}

export function moduleDeclarationDefine(): Plugin {
  return {
    name: "cem-plugin-define (DeclarationDefine)",
    analyzePhase(params) {
      analyzeModuleDeclaration(params);
    },
  };
}

export default jsDocDefine;
