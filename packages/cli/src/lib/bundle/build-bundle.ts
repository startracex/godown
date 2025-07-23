import type { Result } from "postcss-load-config";
import postcss from "postcss";
import { rollup, type ExternalOption, type InputOption, type OutputOptions } from "rollup";
import { isString } from "sharekit";

import { html, minifyHtmlParts, templateReplace } from "./plugins.ts";
import type { getBundlerSync } from "./get-bundler.ts";
import { writeBundle } from "../utils.ts";
import { setupOptions } from "./setup.ts";

const listInputs = (input): string[] => {
  if (isString(input)) {
    return [input];
  }
  if (Array.isArray(input)) {
    return input;
  }
  return Object.values(input);
};

export const build = async ({
  input,
  output,
  external,
  postcss: postcssResult,
  bundler,
  oxcOptions,
}: {
  input?: InputOption;
  output?: OutputOptions | OutputOptions[];
  external?: ExternalOption;
  postcss?: Result;
  bundler?: Awaited<ReturnType<typeof getBundlerSync>>;
  oxcOptions?: Parameters<typeof setupOptions>[1];
} = {}): Promise<void> => {
  const inputList = listInputs(input);
  if (!inputList.length) {
    return;
  }
  const htmlInput = inputList.filter((i) => i.endsWith(".html") || i.endsWith(".htm"));
  const [bundlerType, bundleFunc] = bundler ?? ["rollup", rollup];
  const inputs = setupOptions(bundlerType, oxcOptions, {
    input,
    external,
    plugins: [
      htmlInput.length &&
        html({
          input: htmlInput,
        }),
      postcssResult?.plugins?.length &&
        templateReplace({
          tags: ["css"],
          async callback(input) {
            const result = await postcss(postcssResult.plugins).process(input, {
              from: undefined,
              ...postcssResult.options,
            });
            return result.css;
          },
        }),
      minifyHtmlParts(),
    ].filter(Boolean),
  });

  const bundle = await bundleFunc(inputs);

  await writeBundle(bundle, output, true);
};
