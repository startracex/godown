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

Example, use a CSS preprocessor to process the modified text.

```js
replace({
  match: (tag) => tag === "css",
  callback: (input) => postcss(/* postcss plugins */).process(input).css.trim(),
  replace: (_, index) => `--__REPLACE__${index}__`,
});
```

before replacement

```js
css`
  .class {
    ${"expression_0"}: ${"expression_1"};
  }
`;
```

after replacement

```js
css`
  .class {
    --__REPLACE__0__: --__REPLACE__1__;
  }
`;
```

callback input (content between `` ` ``)

```css
.class {
  --__REPLACE__0__: --__REPLACE__1__;
}
```

Final output text will be restored.
