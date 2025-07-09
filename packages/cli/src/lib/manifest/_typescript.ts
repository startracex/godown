import * as _ts from "typescript545";

function importDefault(mod) {
  return mod.default
    ? mod
      .default
    : mod;
}

const ts: typeof _ts = importDefault(_ts);
export default ts;
