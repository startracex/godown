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
 */
export const parsePart = (input: string, context: ParseContext): ParseResult[] => {
  const parts: ParseResult[] = [];
  let startIndex = 0;

  for (let i = 0; i < input.length; i++) {
    if (input[i] === "<") {
      if (!context.inTag && i > startIndex) {
        parts.push({
          inTag: false,
          text: input.slice(startIndex, i),
        });
      }
      startIndex = i;
      context.inTag = true;
    } else if (input[i] === ">") {
      if (context.inTag) {
        parts.push({
          inTag: true,
          text: input.slice(startIndex, i + 1),
        });
        startIndex = i + 1;
        context.inTag = false;
      }
    }
  }

  if (startIndex < input.length) {
    parts.push({
      inTag: context.inTag,
      text: input.slice(startIndex),
    });
  }

  return parts;
};
