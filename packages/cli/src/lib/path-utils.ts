import { relative, sep } from "path";

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
