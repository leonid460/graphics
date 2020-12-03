function getColumnsOfMatrix(matrix: number[][]): number[][] {
  const width = matrix[0].length;
  const columns = [];

  for (let colNumber = 0; colNumber < width; colNumber++) {
    const column: number[] = matrix.map(row => row[colNumber]);
    columns.push(column);
  }

  return columns;
}

function multiplyRow(first: number[], second: number[]) {
  return first.map((item, index) => item * second[index]).reduce((acc, item) => acc + item);
}

export function multiplyMatrix(first: number[][], second: number[][]) {
  const resultMatrixWidth = second[0].length;
  const columnsOfSecond = getColumnsOfMatrix(second);

  if (first[0].length !== columnsOfSecond[0].length) {
    throw new Error('wrong sizes of matrices');
  }

  const resultMatrix: number[][] = [];

  first.forEach((row) => {
    const resultRow = row.slice(0, resultMatrixWidth).map((_, rowItemIndex) => {
      return multiplyRow(row, columnsOfSecond[rowItemIndex]);
    });

    resultMatrix.push(resultRow);
  });

  return resultMatrix;
}

export function transformRowToColumn(row: number[]): number[][] {
  return row.map(item => [ item ]);
}

export function transformColumnToRow(column: number[][]): number[] {
  return column.map(item => item[0]);
}
