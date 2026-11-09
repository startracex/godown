import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import stylus from "stylus";

const stylDir = join(dirname(fileURLToPath(import.meta.url)), "../styl");
const entry = join(stylDir, "manager.styl");

export const renderManagerCss = (): string =>
  stylus(readFileSync(entry, "utf8")).set("filename", entry).set("paths", [stylDir]).render();
