import { readFileSync } from "node:fs";
import { createRequire } from "node:module";

import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    {
      name: "replace-placeholder",
      enforce: "pre",
      load(id) {
        if (id.endsWith(".mdx")) {
          const raw = readFileSync(id).toString();
          // biome-ignore lint/performance/useTopLevelRegex:
          const placeholderRegex = /\{\/\* PLACEHOLDER (.*?) \*\/\}/;
          const match = raw.match(placeholderRegex);
          if (!match) {
            return;
          }
          const placeholders = extractPlaceholderContent(match[1]);
          if (!placeholders.length) {
            return;
          }
          const [path, start, end] = placeholders;
          const require = createRequire(id);
          const resolvedPath = require.resolve(path);
          if (!resolvedPath) {
            return;
          }
          const replace = readFileSync(resolvedPath).toString();
          const replaceStart = start ? replace.indexOf(start) : 0;
          const replaceEnd = end
            ? replace.lastIndexOf(end) + end.length
            : replace.length;
          return raw.slice(0, match.index) + replace.slice(replaceStart, replaceEnd);
        }
      },
    },
  ],
});

function extractPlaceholderContent(input: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (char === `\\`) {
      current += char;
      i++;
      current += input[i];
    }
    if (char === `"`) {
      if (inQuotes) {
        result.push(current);
        current = "";
        inQuotes = false;
      } else {
        inQuotes = true;
      }
      continue;
    }

    if (!inQuotes && char === " ") {
      if (current) {
        result.push(current);
        current = "";
      }
      continue;
    }
    current += char;
  }

  if (current) {
    result.push(current);
  }

  return result;
}
