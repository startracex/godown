import { relative, sep } from "node:path";

export const pathsOutOf = (paths: string[], basePath: string): boolean => {
  return paths.some((path) => {
    const rel = relative(basePath, path);
    return rel.startsWith("..") || rel === path;
  });
};

export const getCommonPath = (paths: string[], separator: string = sep): string => {
  if (paths.length === 0) {
    return "";
  }

  const firstPath = paths[0].split(separator);
  let commonLength = firstPath.length;

  for (let i = 1; i < paths.length; i++) {
    const currentPath = paths[i].split(separator);
    commonLength = Math.min(commonLength, currentPath.length);

    for (let j = 0; j < commonLength; j++) {
      if (firstPath[j] !== currentPath[j]) {
        commonLength = j;
        break;
      }
    }

    if (commonLength === 0) {
      break;
    }
  }

  const commonPath = firstPath.slice(0, commonLength).join(separator);

  if (commonPath && paths.every((p) => p.startsWith(commonPath))) {
    return commonPath.endsWith(separator) ? commonPath : commonPath + separator;
  }

  return commonPath;
};

export const getCommonDir = (paths: string[], separator: string = sep): string => {
  if (paths.length === 1) {
    const path = paths[0];
    if (path.endsWith(separator)) {
      return path.slice(0, path.length - 1);
    }
    const idx = path.lastIndexOf(separator);
    if (idx === -1) {
      return path;
    }
    return path.slice(0, idx);
  }
  const commonPath = getCommonPath(paths, separator);
  if (commonPath.endsWith(separator)) {
    return commonPath.slice(0, commonPath.length - 1);
  }
  return commonPath;
};
