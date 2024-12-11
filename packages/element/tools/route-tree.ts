import { trim } from "./lib.js";

/**
 * 0 is strict match, other values are wide matches.
 */
enum matchType {
  strict,
  single,
  multi,
}

export class RouteTree {
  /**
   * Raw pattern.
   */
  protected pattern?: string;
  /**
   * A part in the pattern.
   */
  protected part: string;
  /**
   * Match type of the current part.
   */
  protected matchType: matchType = matchType.strict;
  /**
   * Whether the children are sorted.
   */
  protected sorted: boolean;

  protected children: RouteTree[] = [];

  insert(pattern: string, parts?: string[], height = 0): void {
    if (!parts) {
      parts = RouteTree.split(pattern);
    }
    if (parts.length === height) {
      this.pattern = pattern;
      return;
    }

    const part = parts[height];
    let spec = this.findStrict(part);

    if (!spec) {
      spec = new RouteTree();
      spec.part = part;
      spec.matchType = RouteTree.dynamic(part).matchType;
      this.children.push(spec);
      this.sorted = false;
    }
    spec.insert(pattern, parts, height + 1);
  }

  search(parts: string[], height = 0): RouteTree | null {
    if (!this.sorted) {
      this.sort();
    }

    if (
      parts.length === height
      || RouteTree.dynamic(this.part).matchType === matchType.multi
    ) {
      if (!this.pattern) {
        return null;
      }
      return this;
    }
    const part = parts[height];
    const children = this.filterWide(part);
    for (const child of children) {
      const result = child.search(parts, height + 1);
      if (result !== null) {
        return result;
      }
    }
    return null;
  }

  private findStrict(part: string): RouteTree | null {
    return this.children.find((child) => child.part === part) || null;
  }

  private filterWide(part: string): RouteTree[] {
    return this.children.filter((child) => child.part === part || child.matchType);
  }

  /**
   * Returns the pattern of the route that matches the given string.
   */
  useWhich(s: string): string | null {
    return this.search(RouteTree.split(s))?.pattern || null;
  }

  /**
   * Returns dynamic matching parameters.
   */
  parseParams(path: string, pattern: string): Record<string, string> {
    const pathSplit = RouteTree.split(path);
    const patternSplit = RouteTree.split(pattern);
    const params: Record<string, string> = {};
    for (let index = 0; index < patternSplit.length; index++) {
      const part = patternSplit[index];
      const { key, carry, multi } = RouteTree.dynamic(part);
      if (!key) {
        continue;
      }
      if (!multi) {
        params[key.slice(carry)] = pathSplit[index];
      } else {
        params[key.slice(carry)] = pathSplit.slice(index).join("/");
        break;
      }
    }
    return params;
  }

  /**
   * @param key Pattern, may contains dynamic matching parameters.
   */
  static dynamic(key: string): {
    key: string;
    carry: number;
    multi: boolean;
    matchType: matchType;
  } {
    if (key) {
      if (key.length > 2) {
        if (key[0] === "{" && key[key.length - 1] === "}" || key[0] === "[" && key[key.length - 1] === "]") {
          key = key.slice(1, -1);
          return RouteTree.dynamic(key);
        }
      }
      if (key.length > 1) {
        const s1 = key[0];
        if (s1 === ":") {
          return {
            key,
            carry: 1,
            multi: false,
            matchType: matchType.single,
          };
        }
        if (s1 === "*") {
          return {
            key,
            carry: 1,
            multi: true,
            matchType: matchType.multi,
          };
        }
        if (key.length > 3) {
          const s3 = key.slice(0, 3);
          if (s3 === "...") {
            return {
              key,
              carry: 3,
              multi: true,
              matchType: matchType.multi,
            };
          }
        }
      }
    }

    return {
      key: undefined,
      carry: 0,
      multi: false,
      matchType: matchType.strict,
    };
  }

  /**
   * Join paths with "/" and remove the leading and trailing "/".
   */
  static join(...paths: string[]): string {
    return paths.map(path => trim(path, "/")).join("/");
  }

  /**
   * Split a path by "/" and filter empty parts.
   */
  static split(s: string): string[] {
    return s.split("/").filter((a) => a);
  }

  sort(): void {
    const { children } = this;
    if (children.length) {
      children.sort((a, b) => {
        return a.matchType - b.matchType;
      });
      for (const child of children) {
        child.sort();
      }
    }
    this.sorted = true;
  }
}

export default RouteTree;
