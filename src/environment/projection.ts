import {TPoint, TPolygon} from "../types";
import { multiplyMatrix, transformColumnToRow, transformRowToColumn } from "../math/matrix";
import { globalState } from './globalState';

export function projectPoint(point: TPoint): TPoint {
  const projection = multiplyMatrix(globalState.projectionMatrix, transformRowToColumn(point));

  return transformColumnToRow(projection) as TPoint
}

export function projectPolygon(polygon: TPolygon): TPolygon {
  const [a, b, c] = polygon;

  return [projectPoint(a), projectPoint(b), projectPoint(c)];
}
