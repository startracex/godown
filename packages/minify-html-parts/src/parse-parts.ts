type ParseResult = {
  inTag: boolean;
  text: string;
};

type ParseContext = {
  inTag: boolean;
};

/**
 * Parses the given input string into an array of `ParseResult` objects, which represent the parts of the input that are either inside or outside of HTML tags.
 *
 * @param input - The input string to be parsed.
 * @param context - An `ParseContext` object can be used to maintain state between calls to `parsePart`.
 * @returns An array of `ParseResult` objects representing the parts of the input.
 * @example
 * ```ts
 * const context = { inTag: false }
 * parsePart("<a>b<c", context)
 * // [
 * //   { inTag: true, text: '<a>' },
 * //   { inTag: false, text: 'b' },
 * //   { inTag: true, text: '<c' }
 * // ]
 * parsePart(">d< e", context)
 * // [
 * //   { inTag: true, text: ">" },
 * //   { inTag: false, text: "d< e" },
 * // ]
 * ```
 */
export const parsePart = (input: string, context: ParseContext): ParseResult[] => {
  const parts: ParseResult[] = [];
  let lastIndex = 0;

  for (let i = 0; i < input.length; i++) {
    if (input[i] === "<" && !context.inTag && (i === input.length - 1 || /\w/.test(input[i + 1]))) {
      if (i > lastIndex) {
        parts.push({
          inTag: context.inTag,
          text: input.slice(lastIndex, i),
        });
      }
      context.inTag = true;
      lastIndex = i;
      continue;
    }
    if (input[i] === ">" && context.inTag) {
      parts.push({
        inTag: true,
        text: input.slice(lastIndex, i + 1),
      });
      context.inTag = false;
      lastIndex = i + 1;
      continue;
    }
  }

  if (lastIndex < input.length) {
    parts.push({
      inTag: context.inTag,
      text: input.slice(lastIndex),
    });
  }

  return parts;
};
