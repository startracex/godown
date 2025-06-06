const matchTypes = {
  strict: 0,
  single: 1,
  multi: 2,
} as const;

const trimLeftSlash = (s: string): string => {
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== "/") {
      return s.slice(i);
    }
  }
  return s;
};

const nextPart = (path: string): [string, string] => {
  path = trimLeftSlash(path);

  if (path === "") {
    return ["", ""];
  }

  const idx = path.indexOf("/");
  if (idx === -1) {
    return [path, ""];
  }
  return [path.slice(0, idx), path.slice(idx + 1)];
};

export const dynamic = (key: string): {
  matchType: typeof matchTypes[keyof typeof matchTypes];
  key: string;
} => {
  if (key.length > 1) {
    const first = key[0];
    const last = key[key.length - 1];

    if ((first === "{" && last === "}") || (first === "[" && last === "]")) {
      key = key.slice(1, key.length - 1);
      const result = dynamic(key);
      if (result.matchType === matchTypes.strict) {
        result.matchType = matchTypes.single;
      }
      return result;
    }

    if (first === ":") {
      return { key: key.slice(1), matchType: matchTypes.single };
    }

    if (first === "*") {
      return { key: key.slice(1), matchType: matchTypes.multi };
    }

    if (key.startsWith("...")) {
      return { key: key.slice(3), matchType: matchTypes.multi };
    }

    if (key.endsWith("...")) {
      return { key: key.slice(-3), matchType: matchTypes.multi };
    }
  }

  return {
    key,
    matchType: matchTypes.strict,
  };
};

export const parseParams = (path: string, pattern: string): Record<string, string> => {
  const params = {};
  let pathPart: string, patternPart: string;

  while (true) {
    [pathPart, path] = nextPart(path);
    [patternPart, pattern] = nextPart(pattern);

    if (patternPart === "" || pathPart === "") {
      break;
    }

    const info = dynamic(patternPart);
    switch (info.matchType) {
      case matchTypes.single:
        params[info.key] = pathPart;
        break;
      case matchTypes.multi:
        params[info.key] = pathPart;
        if (path !== "") {
          params[info.key] += "/" + path;
        }
        return params;
    }
  }
  return params;
};

export class Router {
  /** @deprecated */
  static MatchTypes: {
    readonly strict: 0;
    readonly single: 1;
    readonly multi: 2;
  } = matchTypes;

  pattern?: string;

  part: string;

  match: 0 | 1 | 2 = matchTypes.strict;

  children: Router[] = [];

  constructor() {
    this.part = "";
    this.match = matchTypes.strict;
    this.pattern = "";
    this.children = [];
  }

  insert(pattern: string): void {
    this._insert(pattern, pattern);
    this.sort();
  }

  protected _insert(path: string, pattern: string): void {
    if (path === "") {
      this.pattern = pattern;
      return;
    }

    const [part, remaining] = nextPart(path);
    let child = this.findStrict(part);

    if (!child) {
      child = new Router();
      child.part = part;
      child.match = dynamic(part).matchType;
      this.children.push(child);
    }
    child._insert(remaining, pattern);
  }

  search(path: string): Router | null {
    if (path === "") {
      if (this.pattern !== "") {
        return this;
      }
      return null;
    }

    const [part, remaining] = nextPart(path);

    for (const child of this.children) {
      switch (child.match) {
        case matchTypes.strict: {
          if (child.part === part) {
            const result = child.search(remaining);
            if (result) {
              return result;
            }
          }
          break;
        }
        case matchTypes.single: {
          const result = child.search(remaining);
          if (result) {
            return result;
          }
          break;
        }
        case matchTypes.multi:
          return child;
      }
    }
    return null;
  }

  findStrict(part: string): Router | null {
    return this.children.find((child) => child.part === part) || null;
  }

  sort(): void {
    this.children.sort((a, b) => a.match - b.match);
    for (const child of this.children) {
      child.sort();
    }
  }

  static parseParams: (path: string, pattern: string) => Record<string, string> = parseParams;

  static dynamic: (key: string) => { matchType: 0 | 1 | 2; key: string } = dynamic;
}

export default Router;
export { Router as RouteTree };
