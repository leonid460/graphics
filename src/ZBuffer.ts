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

function createEmptyMatrix(width: number, height: number) {
  const matrix = new Array(height);

  return matrix.fill(new Array(width).fill(0));
}
