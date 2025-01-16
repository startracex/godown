import type { Plugin, SourceMapInput } from "rollup";

export interface ReplaceParams {
  search?: string | RegExp | { [Symbol.replace](string: string, replaceValue: string): string };
  regex?: RegExp;
  replacement: string;
  parts?: string[];
  effects?: ReplaceParams[];
}

export const defaultReplacements: ReplaceParams[] = [
  {
    regex: /import\.meta\.dirname/g,
    replacement: "__dirname",
  },
  {
    regex: /import\.meta\.filename/g,
    replacement: "__filename",
  },
  {
    parts: "(const|var|let) require = createRequire\\(import\\.meta\\.url\\);?".split(" "),
    replacement: "",
    effects: [
      {
        parts: `import { createRequire } from ["'](node:)?module["'];?`.split(" "),
        replacement: "",
      },
    ],
  },
  {
    parts: "(const|var|let) global = globalThis;?".split(" "),
    replacement: "",
  },
];

function cjsReplace({
  replacements = defaultReplacements,
  generateSourceMap = null,
}: {
  replacements?: ReplaceParams[];
  generateSourceMap?: (code: string) => SourceMapInput;
} = {}): Plugin {
  return {
    name: "cjs-shim",
    transform(code: string) {
      return {
        code: doReplace(code, replacements),
        map: generateSourceMap?.(code) ?? null,
      };
    },
  };
}

function doReplace(code: string, params: ReplaceParams[]) {
  return params.reduce((currentCode, { search, regex, parts, replacement, effects: effect }) => {
    let newCode: string;
    if (search) {
      newCode = currentCode.replace(search as any, replacement);
    } else {
      if (!regex) {
        const re = parts.join("\\s*");
        regex = new RegExp(re, "g");
      }
      newCode = currentCode.replace(regex, replacement);
    }

    if (newCode !== currentCode && effect) {
      newCode = doReplace(newCode, effect);
    }
    return newCode;
  }, code);
}

export { cjsReplace, cjsReplace as cjsShim, cjsReplace as default };
