import { trim } from "./lib.js";

const between = (a: string, b: string, c: string) => a.startsWith(b) && a.endsWith(c);

export class RouteTree {
  static matchType = {
    strict: 0,
    single: 1,
    multi: 2,
  };

  /**
   * Represents a node in the route tree, containing information about a route pattern.
   */
  pattern?: string;

  /**
   * The part of the route pattern represented by this node in the route tree.
   */
  protected part: string;
  /**
   * The type of match for the current route tree node.
   * Can be one of  {@link RouteTree.matchType}.
   */
  protected matchType: number = RouteTree.matchType.strict;

  private sorted: boolean;

  private children: RouteTree[] = [];

  /**
   * Inserts a pattern into the route tree.
   * @param pattern The pattern to insert.
   * @param parts The parts of the pattern, if already split.
   * @param height The current height in the route tree.
   */
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

  /**
   * Searches for a route in the route tree.
   * @param parts The path or parts of the path to search.
   * @param height The current height in the route tree.
   * @returns The matching route tree node, or null if not found.
   */
  search(parts: string | string[], height = 0): RouteTree | null {
    if (typeof parts === "string") {
      parts = RouteTree.split(parts);
    }

    if (!this.sorted) {
      this.sort();
    }

    if (parts.length === height || RouteTree.dynamic(this.part).matchType === RouteTree.matchType.multi) {
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
   * Sorts the children of the route tree.
   * @returns void
   */
  private sort(): void {
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

  /**
   * Parses a path and a pattern, and returns an object with the dynamic matching parameters.
   * Split the path and pattern into parts, pick up the matching parts, and return them as an object.
   * @param path The path to parse.
   * @param pattern The pattern to parse.
   * @returns An object with the dynamic matching parameters.
   */
  static parseParams(path: string, pattern: string): Record<string, string> {
    const pathSplit = RouteTree.split(path);
    const patternSplit = RouteTree.split(pattern);
    const params: Record<string, string> = {};
    for (let index = 0; index < patternSplit.length; index++) {
      const part = patternSplit[index];
      const { key, matchType } = RouteTree.dynamic(part);
      if (matchType === RouteTree.matchType.single) {
        params[key] = pathSplit[index];
      } else if (matchType === RouteTree.matchType.multi) {
        params[key] = pathSplit.slice(index).join("/");
        break;
      }
    }
    return params;
  }

  /**
   * Parses a route pattern and returns key and match type of the dynamic parameter.
   * The pattern may contain dynamic parameters in the following formats:
   * - `{param}`: single parameter
   * - `[param]`: single parameter
   * - `:param`: single parameter
   * - `*param`: multi-parameter
   * - `...param`: multi-parameter
   *
   * If the matching still exists within the parentheses, ignore the previous value.
   *
   * @param key The route pattern to parse.
   * @returns Key and match type of the dynamic parameter.
   */
  static dynamic(key: string): {
    key: string;
    matchType: number;
  } {
    if (key) {
      if (between(key, "{", "}") || between(key, "[", "]")) {
        key = key.slice(1, -1);
        const result = RouteTree.dynamic(key);
        result.matchType ||= RouteTree.matchType.single;
        return result;
      }

      if (key.startsWith(":")) {
        return {
          key: key.slice(1),
          matchType: RouteTree.matchType.single,
        };
      }
      if (key.startsWith("*")) {
        return {
          key: key.slice(1),
          matchType: RouteTree.matchType.multi,
        };
      }
      if (key.startsWith("...")) {
        return {
          key: key.slice(3),
          matchType: RouteTree.matchType.multi,
        };
      }
    }

    return {
      key: key,
      matchType: RouteTree.matchType.strict,
    };
  }

  /**
   * Join the given paths with a "/" and remove the leading and trailing "/" from each path.
   * @param paths - An array of paths to join.
   * @returns The joined path with "/" separators and no leading or trailing "/".
   */
  static join(...paths: string[]): string {
    return paths.map((path) => trim(path, "/")).join("/");
  }

  /**
   * Split a path string by "/" and filter out any empty parts.
   * @param s - The path string to split.
   * @returns An array of path segments with any empty parts removed.
   */
  static split(s: string): string[] {
    return s.split("/").filter((a) => a);
  }
}

export default RouteTree;
