import { isString } from "./is.js";

const resolveParts = (parts: string[], resolved: string[], abs?: boolean) => {
  for (const part of parts) {
    if (part && part !== ".") {
      if (part === "..") {
        if (resolved.length > 0 && resolved[resolved.length - 1] !== "..") {
          resolved.pop();
        } else if (!abs) {
          resolved.push("..");
        }
      } else {
        resolved.push(part);
      }
    }
  }
};

const joinSlash = (parts: string[], abs?: boolean) => (abs ? "/" : parts.length ? "" : ".") + parts.join("/");

const splitRegexp = /[\\/]/;

export class Path {
  abs: boolean;
  parts: string[];
  path: string;
  dir: string;
  ext: string;
  name: string;
  base: string;

  constructor(path?: string) {
    if (!path) {
      this.abs = false;
      this.parts = [];
      this.path = ".";
      this.dir = "";
      this.base = "";
      this.ext = "";
      this.name = "";
      return;
    }
    this.abs = path[0] === "/";
    this.parts = [];
    const segments = path.split(splitRegexp);
    resolveParts(segments, this.parts, this.abs);
    this.path = joinSlash(this.parts, this.abs);
    const lastIndex = this.path.lastIndexOf("/");
    if (lastIndex === -1) {
      this.dir = "";
    } else {
      this.dir = joinSlash(this.parts.slice(0, this.parts.length - 1), this.abs);
    }
    const lastPart = this.path.slice(lastIndex + 1);
    this.base = lastPart;
    if (lastPart === "." || lastPart === "..") {
      this.name = lastPart;
      this.ext = "";
    } else {
      const dotIndex = lastPart.lastIndexOf(".");
      this.ext = dotIndex === -1 ? "" : lastPart.slice(dotIndex);
      this.name = dotIndex === -1 ? lastPart : lastPart.slice(0, dotIndex);
    }
  }

  relative(to: string | Path): Path {
    to = Path.from(to);
    if (this.abs !== to.abs) {
      return to;
    }

    const fromParts = this.parts;
    const toParts = to.parts;

    let i = 0;
    while (i < fromParts.length && i < toParts.length && fromParts[i] === toParts[i]) {
      i++;
    }

    const relativeParts: string[] = [];
    for (let j = i; j < fromParts.length; j++) {
      relativeParts.push("..");
    }
    relativeParts.push(...toParts.slice(i));

    return new Path(joinSlash(relativeParts));
  }

  join(...segments: (string | Path)[]): Path {
    const { abs, path, parts } = this;
    if (!segments.length) {
      return new Path(path);
    }

    const resolvedParts: string[] = [];
    resolveParts(parts, resolvedParts);
    for (const segment of segments.map((segment) => Path.from(segment))) {
      if (segment.abs) {
        resolvedParts.push("");
      }
      resolveParts(segment.parts, resolvedParts);
    }

    return new Path(joinSlash(resolvedParts, abs));
  }

  toString() {
    return this.path;
  }

  static from(path: string | Path): Path {
    return isString(path) ? new Path(path) : path;
  }
}

export default Path;
