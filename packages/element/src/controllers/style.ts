import { CSSResult, type ReactiveController, type ReactiveControllerHost } from "lit";
import { isArray, isBoolean, isNullable, isPlainObject, isString } from "sharekit";

type LikeString = string | {};
type ComplexStyleValue = string | CSSStyleSheet | CSSResult | Record<string, LikeString> | null | undefined;
type ComputeFn = () => ComplexStyleValue;
type Entry<K = PropertyKey, V = any> = Record<K extends PropertyKey ? K : PropertyKey, V> | [K, V][];
type StyleEntries = Entry<LikeString, LikeString | Entry<LikeString>>;

type StyleControllerHost = {
  shadowRoot: ShadowRoot;
} & ReactiveControllerHost;

function* toEntries<K, V>(o: Entry<K, V>): Generator<[K, V], void, void> {
  for (const e of isArray(o) ? o : (Object.entries(o) as [K, V][])) {
    if (e) {
      yield e;
    }
  }
}

const isAcceptValue = (value: unknown): boolean => !isNullable(value) && value !== false;

const combineDecl = (props: Entry<LikeString>): string => {
  let result = "";
  for (const [key, value] of toEntries(props)) {
    if (key && isAcceptValue(value)) {
      result += `${key}:${value};`;
    }
  }
  return result;
};

const resolveStyleObject = (rules: StyleEntries, fn: (s: string) => void) => {
  for (const [key, value] of toEntries(rules)) {
    if (value) {
      const decl = isPlainObject(value) ? combineDecl(value) : value + "";
      if (isAcceptValue(decl)) {
        fn(key ? `${key}{${decl}}` : decl);
      }
    }
  }
};

const styleObjectToStyleSheet = (rules: StyleEntries): CSSStyleSheet => {
  const sheet = new CSSStyleSheet();
  resolveStyleObject(rules, (s) => sheet.insertRule(s));
  return sheet;
};

const stringToStyleSheet = (style: string): CSSStyleSheet => {
  const sheet = new CSSStyleSheet();
  sheet.replaceSync(style);
  return sheet;
};

const toStyleSheet = (style: ComplexStyleValue): CSSStyleSheet => {
  if (isString(style)) {
    return stringToStyleSheet(style);
  }
  if (style instanceof CSSStyleSheet) {
    return style;
  }
  if (style instanceof CSSResult) {
    return style.styleSheet;
  }
  return styleObjectToStyleSheet(style);
};

/**
 * StyleController computes and applies styles when host updated.
 */
export class StyleController implements ReactiveController {
  host: StyleControllerHost;
  styleID: number;
  computeStyleFn: ComputeFn;
  deps: any[];
  shouldRecomputeFn?: () => boolean | any[];

  constructor(host: StyleControllerHost, computeStyleFn: ComputeFn, shouldRecomputeFn?: () => boolean | any[]) {
    (this.host = host).addController(this);
    this.computeStyleFn = computeStyleFn;
    this.shouldRecomputeFn = shouldRecomputeFn;
    this.deps = [];
  }

  hostUpdated(): void {
    if (this.shouldRecomputeFn) {
      const newDeps = this.shouldRecomputeFn();
      if (!this.shouldRecompute(newDeps)) {
        return;
      }
    }
    const sheets = this.host.shadowRoot?.adoptedStyleSheets;
    if (!sheets) {
      return;
    }
    if (this.styleID !== undefined) {
      sheets.splice(this.styleID, 1);
    }
    const styleResult = this.computeStyleFn();
    if (!styleResult) {
      this.styleID = undefined;
      return;
    }
    this.styleID = sheets.push(toStyleSheet(styleResult)) - 1;
  }

  shouldRecompute(re: boolean | any[] | undefined): boolean {
    if (isArray(re)) {
      if (re.length !== this.deps.length) {
        this.deps = re;
        return true;
      }
      for (let i = 0; i < this.deps.length; i++) {
        if (this.deps[i] !== re[i]) {
          this.deps = re;
          return true;
        }
      }
      return false;
    }
    if (re === false) {
      return false;
    }
    return true;
  }
}
