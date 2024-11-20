import { type InputType } from "@storybook/csf";

export const booleanArg = {
  control: { type: "boolean" },
  table: {
    type: { summary: "boolean" },
    defaultValue: { summary: "false" },
  },
};

export const stringArg = {
  control: { type: "text" },
  table: {
    type: { summary: "string" },
    defaultValue: { summary: "" },
  },
};

export const numberArg = {
  control: { type: "number" },
  table: {
    type: { summary: "number" },
    defaultValue: { summary: "0" },
  },
};

export class ArgHelper {
  arg: InputType = {
    control: {},
    table: {},
  };

  name(n: string) {
    this.arg.name = n;
    return this;
  }

  control(typ: InputType["control"], con: Record<string, any> = {}) {
    if (typ) {
      this.arg.control = {
        ...con,
        type: typeof typ === "string" ? typ : (typ as any).type,
      };
    }
    return this;
  }

  options(arr: string[], def = arr[0]) {
    this.arg.control = "select";
    this.arg.options = arr;
    this.default(def);
    this.type(arr.map((v) => `"${v}"`).join(" | "));
    return this;
  }

  default(summary?: string, detail?: string) {
    this.arg.table = {
      ...this.arg.table,
      defaultValue: {
        summary,
        detail,
      },
    };
    return this;
  }

  noDefault() {
    delete this.arg.table.defaultValue;
    return this;
  }

  type(summary: string, detail?: string) {
    this.arg.table = {
      ...this.arg.table,
      type: {
        summary,
        detail,
      },
    };
    return this;
  }

  description(des: string) {
    this.arg.description = des;
    return this;
  }

  disable() {
    this.arg.disabled = true;
    return this;
  }
}
