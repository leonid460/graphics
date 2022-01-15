import {TPoint, TPolygon} from "../types";
import {degreesToRadians} from "../math/angles";
import {multiplyMatrix} from "../math/matrix";

export function movePolygonX(polygon: TPolygon, value: number): TPolygon {
  return polygon.map(point => movePointX(point, value)) as TPolygon;
}

export function movePolygonY(polygon: TPolygon, value: number): TPolygon {
  return polygon.map(point => movePointY(point, value)) as TPolygon;
}

export function movePolygonZ(polygon: TPolygon, value: number): TPolygon {
  return polygon.map(point => movePointZ(point, value)) as TPolygon;
}

const movePointX = moverFactory(makeMoveMatrixX)
const movePointY = moverFactory(makeMoveMatrixY);
const movePointZ = moverFactory(makeMoveMatrixZ);

function moverFactory(moveMatrixCreator: (value: number) => number[][]) {
  return (point: TPoint, degreeAngle: number): TPoint => {
    const radianAngle = degreesToRadians(degreeAngle);
    const moveMatrix = moveMatrixCreator(radianAngle);

    return multiplyMatrix([point], moveMatrix)[0] as TPoint;
  }
}

function makeMoveMatrixX(value: number) {
  return [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [value, 0, 0, 1]
  ];
}

function makeMoveMatrixY(value: number) {
  return [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, value, 0, 1]
  ];
}

function makeMoveMatrixZ(value: number) {
  return [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, value, 1]
  ]
}
