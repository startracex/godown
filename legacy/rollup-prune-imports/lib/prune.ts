export class Prune {
  sideEffects = new Set<string>();
  exports = new Map<string, Set<string>>();
  required = new Map<string, Set<string>>();
  addExports(moduleName: string, ...symbols: string[]) {
    this.exports.set(moduleName, mergeIterable(symbols, this.exports.get(moduleName)));
  }

  hasExports(moduleName: string) {
    return this.exports.has(moduleName);
  }

  addRequired(moduleName: string, ...symbols: string[]) {
    if (symbols.length === 0) {
      this.sideEffects.add(moduleName);
    } else {
      this.required.set(moduleName, mergeIterable(symbols, this.required.get(moduleName)));
    }
  }

  findExport(moduleName: string) {
    return [...this.exports.entries()].find(([, symbols]) => symbols.has(moduleName))?.[0];
  }
}

function mergeIterable<T>(...sets: (Iterable<T> | null | undefined)[]): Set<T> {
  const result = new Set<T>();
  for (const set of sets) {
    if (!set) {
      continue;
    }
    for (const value of set) {
      result.add(value);
    }
  }
  return result;
}
