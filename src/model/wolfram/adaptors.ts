import { TPolygon } from "../../types";

export function adaptRawPolygons(rawPolygons: number[][][]): TPolygon[] {
  return rawPolygons.map(getPointsOfPolygon);
}

function getPointsOfPolygon(polygon: number[][]): TPolygon {
  return polygon.map(vertex => [vertex[1], vertex[2], vertex[3], 1]) as TPolygon;
}
