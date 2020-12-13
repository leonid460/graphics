export class ZBuffer {
  data: number[][];
  height: number;
  width: number;

  constructor(width: number, height: number) {
    this.data = createEmptyMatrix(width, height);
    this.height = height;
    this.width = width;

    this.get = this.get.bind(this);
    this.set = this.set.bind(this);
    this.clear = this.clear.bind(this);
  }

  get(x: number, y: number) {
    const roundedX = Math.floor(x);
    const roundedY = Math.floor(y);

    return this.data[roundedY][roundedX]
  }

  set(x: number, y: number, value: number) {
    const roundedX = Math.floor(x);
    const roundedY = Math.floor(y);
    this.data[roundedY][roundedX] = value;
  }

  clear() {
    // this.data = createEmptyMatrix(this.width, this.height);

    this.data.forEach(row => {
      row.forEach((_, index) => {
        row[index] = -Infinity;
      })
    })
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
