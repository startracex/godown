import { styleText } from "node:util";

type StyleFormat = Parameters<typeof styleText>[0];

const createLiteral = (format?: StyleFormat) => {
  return (strings: TemplateStringsArray, ...values: any[]) => {
    return strings.reduce((pre, cur, index) => {
      return `${pre}${format ? styleText(format, cur) : cur}${
        //
        String(index === values.length ? "" : String(values[index]))
      }`;
    }, "");
  };
};

export let logLevel = 99;

const createLogger = (level: number, callback: typeof console.log, format?: StyleFormat) => {
  return (strings: TemplateStringsArray, ...values: any[]): void => {
    if (logLevel > level) {
      callback(createLiteral(format)(strings, ...values));
    }
  };
};

const style = (format: StyleFormat) => {
  return (strings: TemplateStringsArray, ...values: any[]): string => {
    return strings.reduce((pre, cur, index) => {
      return `${pre}${styleText(format, cur)}${String(
        index === values.length ? "" : styleText(format, String(values[index])),
      )}`;
    }, "");
  };
};

const warn: (strings: TemplateStringsArray, ...values: any[]) => void = createLogger(2, console.warn, "yellowBright");

const error: (strings: TemplateStringsArray, ...values: any[]) => void = createLogger(1, console.error, "redBright");

const info: (strings: TemplateStringsArray, ...values: any[]) => void = createLogger(3, console.info, "cyanBright");

// biome-ignore lint/suspicious/noConsole:_
const log: (strings: TemplateStringsArray, ...values: any[]) => void = createLogger(3, console.log);

export { error, info, log, style, warn };
