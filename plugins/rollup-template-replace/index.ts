import MagicString from "magic-string";
import { createFilter, type FilterPattern } from "@rollup/pluginutils";
import { extractSourceFile, getTemplateTextRange, getTextRange, type TaggedTemplateExpressionResult } from "template-extractor";
import type { Plugin } from "rollup";

export interface ReplacementOptions {
  match?: (tag: string) => boolean;
  replace?: (text?: string, index?: number) => string;
  callback?: (input: string) => string | Promise<string>;
}

export default function (
  {
    tags,
    include,
    exclude,
    match,
    replace,
    callback,
  }:
    & {
      tags?: string[];
      include?: FilterPattern;
      exclude?: FilterPattern;
    }
    & ReplacementOptions,
): Plugin {
  const filter = createFilter(include, exclude);
  return {
    name: "template-replace",
    async transform(code: string, id: string) {
      const ms = new MagicString(code);

      if (!filter(id)) {
        return;
      }

      await doReplace(
        code,
        {
          match: match || ((tag) => tags?.includes(tag)),
          replace: replace || ((_, i) => `__REPLACE__${i}__`),
          callback: callback,
        },
        ms,
      );

      return {
        code: ms.toString(),
        map: ms.generateMap({
          hires: true,
        }),
      };
    },
  };
}

export async function doReplace(
  raw: string,
  { match, replace, callback }: ReplacementOptions,
  ms: MagicString,
): Promise<MagicString> {
  const templates = extractSourceFile(raw).filter((r) =>
    "tag" in r && match?.(r.tag.getText())
  ) as TaggedTemplateExpressionResult[];

  let replaceIndex = 0;

  for (const t of templates) {
    const { strings, values } = t;

    const replaceSegments = getSegments(strings, values).map((s) => {
      return {
        ...s,
        replaced: s.type === "value" ? (replace?.(s.text, replaceIndex++) ?? s.text) : s.text,
      };
    });

    const joinedString = replaceSegments.map((s) => s.replaced).join("");

    const transformed = (await callback?.(joinedString)) ?? joinedString;

    let offset = 0;
    const replacedMatchArray: {
      pos: number;
      segment: Segment & {
        replaced: string;
      };
    }[] = [];
    for (const replaceSegment of replaceSegments) {
      if (replaceSegment.type === "value") {
        const pos = transformed.indexOf(replaceSegment.replaced, offset);
        replacedMatchArray.push({ pos, segment: replaceSegment });
        offset = pos + replaceSegment.replaced.length;
      }
    }

    /* If the callback has just changed the sequence of replacement values, the accuracy of the original mapping will be reduced. */

    if (isSortedAscending(replacedMatchArray.map((r) => r.pos))) {
      offset = 0;
      for (let i = 0; i < replaceSegments.length; i++) {
        const segment = replaceSegments[i];
        if (segment.type === "string") {
          if (i < replaceSegments.length - 1) {
            const valueSegment = replaceSegments[i + 1];
            const { pos } = replacedMatchArray[i / 2];
            if (pos === -1) {
              continue;
            }
            ms.overwrite(segment.start, segment.end, transformed.slice(offset, pos));
            offset = pos + valueSegment.replaced.length;
          } else {
            ms.overwrite(segment.start, segment.end, transformed.slice(offset));
          }
        }
      }
    } else {
      if (replaceSegments.length === 1) {
        const segment = replaceSegments[0];
        ms.overwrite(segment.start, segment.end, transformed);
      } else {
        let s = transformed;
        replacedMatchArray.forEach(({ segment }) => {
          s = s.replace(segment.replaced, `\${${segment.text}}`);
        });

        ms.overwrite(t.template.getStart() + 1, t.template.getEnd() - 1, s);
      }
    }
  }

  return ms;
}

function isSortedAscending(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) {
      return false;
    }
  }
  return true;
}

type Segment = {
  type: "string" | "value";
  text: string;
  start: number;
  end: number;
  padStart?: number;
  padEnd?: number;
};

function getSegments(strings, values): Segment[] {
  const segments: Segment[] = [];

  for (let i = 0; i < strings.length; i++) {
    const s = strings[i];
    const segment: Segment = {
      type: "string",
      ...getTemplateTextRange(s),
    };

    segments.push(segment);

    if (i < values.length) {
      const v = values[i];

      segments.push({
        type: "value",
        ...getTextRange(v),
      });
    }
  }

  return segments;
}
