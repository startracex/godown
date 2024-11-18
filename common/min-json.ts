import { readFileSync, writeFileSync } from "fs";

export function minJSON(path: string) {
  const data = JSON.parse(readFileSync(path).toString());
  delete data.$schema;
  let s = JSON.stringify(data);
  s = s.replace(/\\r/g, "");
  s = s.replace(/(\\n){2,}/gm, "\\n");
  writeFileSync(path, s);
  return data;
}
