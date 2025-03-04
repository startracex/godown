# rollup-plugin-minify-html-parts

This library extracts (tagged) template expressions from TypeScript code, which will be minified when `shouldMinify` returns true.

Can be used in `lit-html` or `fast-element`.

## Example

Rollup config

```js
import { minifyHtmlParts } from "rollup-plugin-minify-html-parts";

export default {
  // ...
  plugins: [
    minifyHtmlParts({
      removeComments: true,
      removeAttributeQuotes: true,
      removeEmptyAttributeValues: true,
      shouldMinify(extractResult) {
        return extractResult.type === "TaggedTemplateExpression" &&
          extractResult.tag.getText() === "html";
      },
    }),
  ],
};
```

Input

```js
export const htmlResult = html`
  <my-element
    ${attr}
    id="${id}"
    class="x ${classes}"
    .property="${property}"
    @click="${onClick}"
  >
    <!-- comment -->
    ${html`
      <div>${textContent}</div>
    `}
  </my-element>
`;
```

Output

```plain
export const htmlResult = html`<my-element ${attr} id=${id} class="x ${classes}" .property=${property} @click=${onClick}> ${html`<div>${textContent}</div>`} </my-element>`;
```
