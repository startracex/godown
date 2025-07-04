Replace the template expressions and restore them.

It won't process nested expressions.

```js
import replace from "rollup-plugin-template-replace";

export default {
  input: "index.js",
  output: {
    dir: "output",
    format: "esm",
  },
  plugins: [
    replace({
      /* options */
    }),
  ],
};
```

Example, use a CSS preprocessor to process css literals.

```js
replace({
  match: (tag) => tag === "css",
  callback: (input) => postcss(/* postcss plugins */).process(input).css.trim(),
  replace: (_, index) => `--__REPLACE__${index}__`,
});
```
