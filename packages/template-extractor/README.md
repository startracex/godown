# template-extractor

Extract templates from TypeScript.

## Usage

```ts
import fs from "fs";
import { extractSourceFile } from "template-extractor";

extractSourceFile(fs.readFileSync("input.ts", "utf-8"));

import ts from "typescript";
import { extract } from "template-extractor";

extract(ts.createSourceFile("input.ts", src, ts.ScriptTarget.Latest, true));
```

## Example

```ts
`
Template 
${`Template Span`}
`;

tagged`
Tagged Template
${`Template Span`}
`;
```

```json
[
  {
    "tag": "",
    "type": "TemplateExpression",
    "kind": 228,
    "text": "\n`\nTemplate \n${`Template Span`}\n`",
    "start": 0,
    "end": 33,
    "children": [
      {
        "type": "TemplateSpan",
        "kind": 239,
        "text": "`Template Span`",
        "start": 15,
        "end": 30
      }
    ]
  },
  {
    "tag": "tagged",
    "type": "TaggedTemplateExpression",
    "kind": 228,
    "text": "`\nTagged Template\n${`Template Span`}\n`",
    "start": 42,
    "end": 80,
    "children": [
      {
        "type": "TemplateSpan",
        "kind": 239,
        "text": "`Template Span`",
        "start": 62,
        "end": 77
      }
    ]
  }
]
```
