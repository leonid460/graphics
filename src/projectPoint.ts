import { TPoint } from "./types";
import { multiplyMatrix, transformColumnToRow, transformRowToColumn } from "./utils/matrix";
import { globalState } from './globalState';


export function projectPoint(point: TPoint): TPoint {
  const projection = multiplyMatrix(globalState.projectionMatrix, transformRowToColumn(point));

  return transformColumnToRow(projection) as TPoint
}
