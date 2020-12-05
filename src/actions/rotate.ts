import { TPoint } from "../types";
import { multiplyMatrix } from '../utils/matrix';
import { degreesToRadians } from '../utils/angles';

export function rotatePolygonOverX(polygon: TPoint[], degreeAngle: number): TPoint[] {
  return polygon.map(point => rotatePointOverX(point, degreeAngle));
}

export function rotatePolygonOverY(polygon: TPoint[], degreeAngle: number): TPoint[] {
  return polygon.map(point => rotatePointOverY(point, degreeAngle));
}

export function rotatePolygonOverZ(polygon: TPoint[], degreeAngle: number): TPoint[] {
  return polygon.map(point => rotatePointOverZ(point, degreeAngle));
}

const rotatePointOverX = rotatorFactory(makeRotationMatrixX)
const rotatePointOverY = rotatorFactory(makeRotationMatrixY);
const rotatePointOverZ = rotatorFactory(makeRotationMatrixZ);

function rotatorFactory(rotationMatrixCreator: (radianAngle: number) => number[][]) {
  return (point: TPoint, degreeAngle: number): TPoint => {
    const radianAngle = degreesToRadians(degreeAngle);
    const rotationMatrix = rotationMatrixCreator(radianAngle);

    return multiplyMatrix([point], rotationMatrix)[0] as TPoint;
  }
}

function makeRotationMatrixX(radianAngle: number) {
  const cos = Math.cos(radianAngle);
  const sin = Math.sin(radianAngle);

  return [
    [1, 0, 0, 0],
    [0, cos, sin, 0],
    [0, -sin, cos, 0],
    [0, 0, 0, 1]
  ];
}

function makeRotationMatrixY(radianAngle: number) {
  const cos = Math.cos(radianAngle);
  const sin = Math.sin(radianAngle);

  return [
    [cos, 0, -sin, 0],
    [0, 1, 0, 0],
    [sin, 0, cos, 0],
    [0, 0, 0, 1]
  ];
}

function makeRotationMatrixZ(radianAngle: number) {
  const cos = Math.cos(radianAngle);
  const sin = Math.sin(radianAngle);

  return [
    [cos, sin, 0, 0],
    [-sin, cos, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
  ]
}
