export function matrixToBase64(matrix: any[][], resolution = 100, padding = 0): string {
  const matrixLen = matrix[0].length;
  const canvasLen = (matrixLen + 2 * padding) * resolution;
  const canvas = document.createElement("canvas");
  canvas.width = canvasLen;
  canvas.height = canvasLen;
  const ctx = canvas.getContext("2d");
  for (let y = padding; y < matrixLen + padding; y++) {
    for (let x = padding; x < matrixLen + padding; x++) {
      if (matrix[y - padding] && matrix[y - padding][x - padding]) {
        ctx.fillStyle = matrix[y - padding][x - padding];
        ctx.fillRect(x * resolution, y * resolution, resolution, resolution);
      }
    }
  }
  return canvas.toDataURL();
}

export function stringToMatrix<T>(str: string, size: number, value: T): (T | undefined)[][] {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash &= hash;
  }
  hash = Math.abs(hash);
  const matrix = Array(size).fill(undefined).map(() => Array(size).fill(undefined));
  const halfSize = Math.floor(size / 2);
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < halfSize; j++) {
      if (hash % 2 !== 0) {
        matrix[i][j] = value;
        matrix[i][size - 1 - j] = value;
      }
      hash = Math.floor(hash / 2);
    }
    if (size % 2 === 1) {
      if (hash % 2 === 0) {
        matrix[i][halfSize] = value;
      }

      hash = Math.floor(hash / 2);
    }
  }
  return matrix;
}
