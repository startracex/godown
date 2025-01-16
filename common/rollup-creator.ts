import { type InputOptions, type OutputOptions, rollup } from "rollup";

export const commonInput: Pick<InputOptions, "external" | "onwarn"> = {
  external: ["@", "lit", "tslib", "fmtime"].map((s) => new RegExp(`^${s}`)),

  onwarn(warning, warn) {
    if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
      return;
    }
    warn(warning);
  },
};

export const commonOutput: Pick<
  OutputOptions,
  "format" | "preserveModules" | "sourcemap" | "sourcemapExcludeSources" | "virtualDirname"
> = {
  format: "esm",
  preserveModules: true,
  sourcemap: true,
  sourcemapExcludeSources: true,
  virtualDirname: "virtual",
};

export async function build<I extends InputOptions & { output?: O }, O extends OutputOptions | OutputOptions[]>(
  i: I,
  o?: O,
): Promise<InputOptions & { output?: I["output"] extends O ? I["output"] : O }> {
  const bundle = await rollup(i);
  i.output ||= o;

  if (!i.output) {
    return null;
  }
  if (Array.isArray(i.output)) {
    await Promise.all(i.output.map((o) => bundle.write(o)));
  } else {
    await bundle.write(i.output);
  }
  return i;
}
