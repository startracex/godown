# @godown/cli

A low-configuration bundler powered by `Rollup + OXC` or `Rolldown`.

By default, it treats the `dependencies` and `peerDependencies` in the `package.json` as external dependencies, applies TypeScript transformation options from `tsconfig.json`, and respects its `rootDir`, `outDir`, `includes`, and `excludes` when generating outputs.

```sh
npm i -D @godown/cli rollup # if using Rollup
npm i -D @godown/cli rolldown # if using Rolldown
npm i -g @godown/cli # if using the CLI globally
```

## CLI

### `build`

```sh
pnpm godown build

pnpm godown build -d dist/module -d dist/node --format cjs --map --dts --tsconfig tsconfig.json --minify
```

_When using multiple -d flags, please add the -f flag promptly, as they are end-aligned._

```sh
# Incorrect (may cause unexpected output):
pnpm godown build  -d dist/node  --format cjs  -d dist/module
#                     ^^^^^^^^^            └──────^^^^^^^^^^^
#                  no format match                   cjs

# Correct:
pnpm godown build  -d dist/node  --format cjs -d dist/module  --format esm
#                     ^^^^^^^^^────────────┘     ^^^^^^^^^^^────────────┘
#                        cjs                        esm
```

You can pass `--bundler` to specify the bundler.

```sh
pnpm godown build --bundler rollup

pnpm godown build --bundler rolldown
```

Pass the repeatable `--globals` option to specify globals.
Key-value pairs can be separated using either `=` or `:`.

Pass the repeatable `--external` option to specify external IDs.
If the globals options is provided, external defaults to the keys of globals;
otherwise, it defaults to the keys of `dependencies` and `peerDependencies` in `package.json`.

To remove externals, pass a non-existent id.

### `compile`

The compile command compiles only TypeScript to JavaScript.

```sh
# automatically detects tsconfig.json
pnpm godown compile
# compile signal file
pnpm godown compile some-ts-file.ts -o some-js-file.js
# compile multiple files
pnpm godown compile src-dir -o out-dir --dts --map
```

### `manifest`

The manifest command will generate web components manifests

Infer the framework from the `dependencies`, `peerDependencies` in `package.json`.

```sh
pnpm godown manifest
```

This command will generate:

- `custom-elements.json`

- `vscode.css-custom-data.json`

- `vscode.html-custom-data.json`

- `web-types.json`

### `help`

Run `godown help`, `godown help [command]` to display help.

## Runtime Config

Set the runtime configuration using a JSON or JSONC format.

```json
{
  "build": {
    "bundler": "rollup",
    "minify": false,
    "map": true,
    "dts": true,
    "name": "MyLibrary",
    "globals": {
      "deps": "Deps"
    },
    "outputs": {
      "./src/tests/*": null,
      "./src/*.ts": {
        "esm": "./build/*.js",
        "cjs": "./build/*.cjs"
      },
      "./build/index.js": {
        "umd": "./build/bundle.js"
      }
    }
  },
  "manifest": false,
  "tsconfig": "tsconfig.json"
}
```

```sh
pnpm godown build -c path_to_json_file
```

### Build outputs

Use formatting as the key and the output location as the value.

Use `*` as a wildcard for file names to match multiple path levels.

An output ending with `/` is treated as a directory

The portion before the `*` is treated as the directory path, while the `*` itself serves as a file name wildcard placeholder.

Otherwise, it's treated as single-file output, in this case the input must also be a single file.

In this example, the `build` command will:

- Ignore `./src/tests/*`, because it's vale is `null`.

- Bundle `./src/*.ts` to `./build/*.js` with ESM format and `./build/*.cjs` with CJS format.

- Bundle `./build/index.js` to `./build/bundle.js` with UMD format after `./src/*.ts` is bundled.

## Plugins

The list of built-in plugins is as follows:

For manifest:

- cem-plugin-define
- custom-element-jet-brains-integration
- custom-element-vs-code-integration

For build:

- @rollup/plugin-commonjs
- @web/rollup-plugin-html
- rollup-plugin-minify-html-parts
- rollup-plugin-oxc
- rollup-plugin-template-replace

Postcss:

- autoprefixer
- postcss-csso
