const fs = require("fs");
const path = require("path");

const dir = `packages/cli`;
const pkg = require(path.join(__dirname, dir, "package.json"));

const getBinFiles = (bin) => {
  return [...new Set((bin ? (typeof bin === "string" ? [bin] : Object.values(bin)) : []).filter(Boolean))];
};

const ensureFileExist = (filePath) => {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(path.dirname(filePath), {
      recursive: true,
    });
    fs.writeFileSync(filePath, "");
  }
};

for (const file of getBinFiles(pkg.bin)) {
  const target = path.join(dir, file);
  ensureFileExist(target);
}
