import config from "@startracex/dev-config/oxfmt";
import { defineConfig } from "oxfmt";

export default defineConfig({
  ...config,
  overrides: [
    {
      files: ["**/*.json"],
      options: {
        printWidth: 1,
      },
    },
  ],
});
