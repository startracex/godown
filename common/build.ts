import { type InputOptions, type OutputOptions, rollup } from "rollup";

export const packageDependencies = (pkg: object) =>
  ["dependencies", "peerDependencies"].flatMap((key) => Object.keys(pkg[key] || {}).map((d) => new RegExp(`^${d}`)));

export const commonOutput: OutputOptions = {
  format: "esm",
  preserveModules: true,
  sourcemap: true,
  virtualDirname: "virtual",
};

export async function build(
  i: InputOptions & { output?: OutputOptions | OutputOptions[] },
  o?: OutputOptions | OutputOptions[],
): Promise<InputOptions & { output?: OutputOptions | OutputOptions[] }> {
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
