export class ZBuffer {
  data: number[][];

  constructor(width: number, height: number) {
    this.data = createEmptyMatrix(width, height);

    this.get = this.get.bind(this);
    this.set = this.set.bind(this);
  }

  get(x: number, y: number) {
    return this.data[y][x]
  }

  set(x: number, y: number, value: number) {
    this.data[y][x] = value;
  }
}

function createEmptyMatrix(width: number, height: number): number[][] {
  const matrix = [];

  for (let i = 0; i < height; i++) {
    const row = [];

    for (let j = 0; j < width; j++) {
      row.push(-Infinity);
    }

    matrix.push(row);
  }

  return matrix;
}
