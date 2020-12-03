import { T2DPoint } from "./types";
import { multiplyMatrix, transformColumnToRow, transformRowToColumn } from "./matrixUtils";
import { globalState } from './globalState';


export function projectPoint(point: T2DPoint): T2DPoint {
  const projection = multiplyMatrix(globalState.projectionMatrix, transformRowToColumn(point));

  return transformColumnToRow(projection) as T2DPoint
}
