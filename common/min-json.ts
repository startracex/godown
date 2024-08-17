import { readFileSync, writeFileSync } from "fs";

export function minJSON(path: string) {
  const data = JSON.parse(readFileSync(path).toString());
  delete data.$schema;
  writeFileSync(path, JSON.stringify(data));
  return data;
}
