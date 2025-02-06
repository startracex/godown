import type { InputType } from "@storybook/csf";

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
    if (summary === "string") {
      this.control("text");
    } else if (summary === "number" || summary === "boolean") {
      this.control(summary);
    } else if (summary === "object" || summary === "array" || summary.endsWith("[]")) {
      this.control("object");
    }
    return this;
  }

  description(des: string) {
    this.arg.description = des;
    return this;
  }

  disable() {
    this.arg.table.disable = true;
    return this;
  }

  category(cat: string) {
    this.arg.table.category = cat;
    return this;
  }

  table(t: InputType["table"]) {
    this.arg.table = {
      ...this.arg.table,
      ...t,
    };
    return this;
  }
}
