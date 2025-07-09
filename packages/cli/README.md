# @godown/cli

A CLI for building package.

This package is used for building both Web Components and standard TypeScript packages.

## Example

```sh
pnpm godown build --mode lib -d dist/module -d dist/node --format cjs --map --dts --tsconfig tsconfig.dev.json --minify
```

## Commands

`build`

alias `b`

```plain
godown build|b [options]      build the package

# Repeatable options are aligned to the right according to the output.

Options:
  --root                      root directory path
  -d, --out-dir <output-path> output directory path (repeatable)
  -o, --out <output-path>     output file path (repeatable)
  -f, --format <format>       output format (repeatable, aligned to the right according to the output)
  --globals <globals>         global name (repeatable)
  --external <external>       external (repeatable)
  --name <name>               output global name
  --manifest                  generate custom element manifest
  --mode <mode>               library (lib) or application (app) mode
  --map                       emit source map
  --dts                       emit declaration
  --dry-run                   dry-run
  --minify                    minify output
  -h, --help                  display help for command
```

`manifest`

```plain
godown manifest               generate custom element manifest
```

## Built-in plugins

Rollup, CEM plugins are built-in. PostCSS plugins auto-load if found; otherwise, built-in ones are used.

If you need to add more plugins or modify internal configurations, you should use Rollup or other build tools.

The list of built-in plugins is as follows:

- autoprefixer
- cem-plugin-define
- custom-element-jet-brains-integration
- custom-element-vs-code-integration
- rollup-plugin-minify-html-parts
- rollup-plugin-oxc
- rollup-plugin-template-replace
- postcss-csso
