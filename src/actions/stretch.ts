import {TPoint, TPolygon} from "../types";
import { multiplyMatrix } from "../math/matrix";

export function stretchPolygonOverX(polygon: TPolygon, k: number): TPolygon {
  return polygon.map(point => stretchPointOverX(point, k)) as TPolygon;
}

export function stretchPolygonOverY(polygon: TPolygon, k: number): TPolygon {
  return polygon.map(point => stretchPointOverY(point, k)) as TPolygon;
}

export function stretchPolygonOverZ(polygon: TPolygon, k: number): TPolygon {
  return polygon.map(point => stretchPointOverZ(point, k)) as TPolygon;
}

const stretchPointOverX = rotatorFactory(makeStretchMatrixX)
const stretchPointOverY = rotatorFactory(makeStretchMatrixY);
const stretchPointOverZ = rotatorFactory(makeStretchMatrixZ);

function rotatorFactory(stretchMatrixCreator: (k: number) => number[][]) {
  return (point: TPoint, k: number): TPoint => {
    const stretchMatrix = stretchMatrixCreator(k);

    return multiplyMatrix([point], stretchMatrix)[0] as TPoint;
  }
}

function makeStretchMatrixX(k: number) {
  return [
    [k, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
  ];
}

function makeStretchMatrixY(k: number) {
  return [
    [1, 0, 0, 0],
    [0, k, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
  ];
}

function makeStretchMatrixZ(k: number) {
  return [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, k, 0],
    [0, 0, 0, 1]
  ];
}
