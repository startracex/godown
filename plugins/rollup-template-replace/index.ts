import MagicString from "magic-string";
import { type Plugin } from "rollup";
import { createFilter } from "rollup-pluginutils";
import { type ExtractResult, extractSourceFile } from "template-extractor";

interface RollupFilterOptions {
  include?: Parameters<typeof createFilter>[0];
  exclude?: Parameters<typeof createFilter>[1];
}

export interface ReplacementOptions {
  match?: (tag: string) => boolean;
  replace?: (text?: string, index?: number, child?: ExtractResult, parent?: ExtractResult) => string;
  callback?: (input: string) => string;
}

export function templateReplacement(oldContent: string, {
  replace,
  callback,
  match,
}: ReplacementOptions) {
  const templates = extractSourceFile(oldContent).filter(
    ({ tag, children }) => (children && children.length && (match ? match(tag) : tag)),
  );

  if (!templates.length) {
    return oldContent;
  }

  let replaceIndex = 0;
  const replaceMap = new Map<string, string>();
  const replacePositions: {
    text: string;
    start: number;
    end: number;
  }[] = [];

  for (let index = 0; index < templates.length; index++) {
    const template = templates[index];

    const { start, end } = template;

    const replaced = replaceText(
      template.text,
      template.children.map(
        (child) => {
          const replacedValue = replace(child.text, replaceIndex, child, template);
          replaceIndex++;
          replaceMap.set(replacedValue, child.text);
          return {
            text: replacedValue,
            start: child.start - start - ("${".length),
            end: child.end - start + ("}".length),
          };
        },
      ),
    );

    let processContent = replaced;

    if (callback) {
      const qStart = processContent.indexOf("`");
      const qEnd = processContent.lastIndexOf("`");
      const sliceStart = qStart === -1 ? 0 : qStart + 1;
      const sliceEnd = qEnd === -1 ? processContent.length : qEnd - 1;
      processContent = "`" + callback(processContent.slice(sliceStart, sliceEnd)) + "`";
    }

    replaceMap.forEach((value, key) => {
      processContent = processContent.replaceAll(key, "${" + value + "}");
    });

    replacePositions.push({
      text: processContent,
      start,
      end,
    });
  }

  return replaceText(oldContent, replacePositions);
}

export default function (
  options:
    & {
      tags?: string[];
    }
    & ReplacementOptions
    & RollupFilterOptions,
): Plugin {
  const filter = createFilter(options.include, options.exclude);
  return {
    name: "postcss-process",
    transform(oldContent: string, id: string) {
      if (!filter(id)) {
        return;
      }
      const code = templateReplacement(oldContent, {
        callback: options.callback,
        match: options.match || ((tag) => options.tags.includes(tag)),
        replace: options.replace || ((text, index, parent) => "__REPLACE_" + index + "__"),
      });
      return {
        code: code,
        map: new MagicString(code).generateMap({ hires: true }),
      };
    },
  };
}

export function replaceText(raw: string, pos: { text: string; start: number; end: number; }[]) {
  let index = 0;
  let result = "";
  pos.forEach(({ start, end, text }) => {
    result += raw.slice(index, start) + text;
    index = end;
  });
  return result + raw.slice(index);
}
