const fs = require("fs");
const path = require("path");

function readPackage(pkg) {
  if (pkg.name === "@godown/cli") {
    const target = `packages/cli/${pkg.bin.godown}`;

    if (!fs.existsSync(target)) {
      fs.mkdirSync(path.dirname(target), {
        recursive: true,
      });
      fs.writeFileSync(target, "");
    }
  }

  return pkg;
}

module.exports = {
  hooks: {
    readPackage,
  },
};
