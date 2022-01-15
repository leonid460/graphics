import { TPoint, TPolygon } from "../types";
import { multiplyMatrix } from "../math/matrix";

export function mirrorPolygonOverX(polygon: TPolygon): TPolygon {
  return polygon.map(point => mirrorPointOverX(point)) as TPolygon;
}

export function mirrorPolygonOverY(polygon: TPolygon): TPolygon {
  return polygon.map(point => mirrorPointOverY(point)) as TPolygon;
}

export function mirrorPolygonOverZ(polygon: TPolygon): TPolygon {
  return polygon.map(point => mirrorPointOverZ(point)) as TPolygon;
}

const mirrorPointOverX = mirrorFactory(makeMirrorMatrixX)
const mirrorPointOverY = mirrorFactory(makeMirrorMatrixY);
const mirrorPointOverZ = mirrorFactory(makeMirrorMatrixZ);

function mirrorFactory(mirrorMatrixCreator: () => number[][]) {
  return (point: TPoint): TPoint => {
    const mirrorMatrix = mirrorMatrixCreator();

    return multiplyMatrix([point], mirrorMatrix)[0] as TPoint;
  }
}

function makeMirrorMatrixX() {
  return [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, -1, 0],
    [0, 0, 0, 1]
  ];
}

function makeMirrorMatrixY() {
  return [
    [-1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
  ];
}

function makeMirrorMatrixZ() {
  return [
    [1, 0, 0, 0],
    [0, -1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
  ];
}
