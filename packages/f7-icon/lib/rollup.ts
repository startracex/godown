import { createRequire } from "node:module";

import { IconSet } from "@iconify/tools/lib/icon-set";
import { type IconifyIconBuildResult, iconToSVG } from "@iconify/utils/lib/svg/build";

import format from "./format.js";

const require = createRequire(import.meta.url);

const isIcon = (icon: string) => icon.startsWith("@godown/f7-icon/icons/");

const getName1 = (id: string) => {
  id = id.slice("@godown/f7-icon/icons/".length);
  const dot = id.lastIndexOf(".");
  if (dot !== -1) {
    id = id.slice(0, dot);
  }
  return id;
};

export default function ({
  match = isIcon,
  getSet = () => "f7",
  getName = getName1,
  formatter = format,
}: {
  match?: (id: string) => boolean;
  getSet?: (id: string) => string;
  getName?: (id: string) => string;
  formatter?: (
    result?: IconifyIconBuildResult,
    name?: string,
    setName?: string,
  ) => string;
} = {}) {
  return {
    name: "godown-f7-icon-virtual",
    enforce: "pre" as const,
    resolveId(id: string) {
      if (match(id)) {
        return id;
      }
      return null;
    },
    load(id: string) {
      if (match(id)) {
        const setName = getSet(id);
        const name = getName(id);
        let loadSet: IconSet;
        try {
          loadSet = new IconSet(require(`@iconify-json/${setName}/icons.json`));
        } catch {
          try {
            loadSet = new IconSet(require(`@iconify/json/json/${setName}.json`));
          } catch {
            throw new Error(`Failed to load IconSet \`${setName}\` from @iconify-json/${setName} or @iconify/json.`);
          }
        }
        const result = iconToSVG(loadSet.resolve(name));

        const code = formatter(result, name, setName);
        return {
          code,
        };
      }
      return null;
    },
  };
}
