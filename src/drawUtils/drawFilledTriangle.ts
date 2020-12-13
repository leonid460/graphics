import { TPoint, TPolygon } from "../types";
import { drawBufferizedPixel } from './drawPixel';
import { globalState } from '../globalState';
import { interpolate } from '../utils/interpolate';

export function drawFilledTriangle(firstPoint: TPoint, secondPoint: TPoint, thirdPoint: TPoint, color?: string) {
  let sortedPoints = sortTrianglePoints([firstPoint, secondPoint, thirdPoint]);
  sortedPoints = sortedPoints.map(point => point.map(Math.round)) as TPolygon;

  const x01 = interpolateXForTwoPoints(sortedPoints[0],sortedPoints[1]);
  const x12 = interpolateXForTwoPoints(sortedPoints[1], sortedPoints[2]);
  const x02 = interpolateXForTwoPoints(sortedPoints[0], sortedPoints[2]);
  const z01 = interpolateZForTwoPoints(sortedPoints[0],sortedPoints[1]);
  const z12 = interpolateZForTwoPoints(sortedPoints[1],sortedPoints[2]);
  const z02 = interpolateZForTwoPoints(sortedPoints[0],sortedPoints[2]);

  x01.pop();
  const x012 = [...x01, ...x12];

  z01.pop();
  const z012 = [...z01, ...z12 ];

  const m = Math.round(x012.length / 2);
  let leftXList, rightXList;
  let leftZList, rightZList;

  if (x02[m] < x012[m]) {
    [leftXList, rightXList] = [x02, x012];
    [leftZList, rightZList] = [z02, z012];
  } else {
    [leftXList, rightXList] = [x012, x02];
    [leftZList, rightZList] = [z012, z02];
  }

  for (let currentY = sortedPoints[0][1]; currentY <= sortedPoints[2][1]; currentY += 1) {
    const yAndY0Distance = currentY - sortedPoints[0][1];
    const xLeft = leftXList[yAndY0Distance];
    const xRight = rightXList[yAndY0Distance];
    const zLeft = leftZList[yAndY0Distance];
    const zRight = rightZList[yAndY0Distance];

    const zSegment = interpolate(xLeft, zLeft, xRight, zRight);
    drawHorizontalLine(xLeft, xRight, currentY, zSegment, color);
  }
}

function sortTrianglePoints(points: [TPoint, TPoint, TPoint]): [TPoint, TPoint, TPoint] {
  let [resultPoint0, resultPoint1, resultPoint2] = points;

  if (resultPoint1[1] < resultPoint0[1]) {
    [resultPoint0, resultPoint1] = [resultPoint1, resultPoint0];
  }

  if (resultPoint2[1] < resultPoint0[1]) {
    [resultPoint2, resultPoint0] = [resultPoint0, resultPoint2];
  }

  if (resultPoint2[1] < resultPoint1[1]) {
    [resultPoint2, resultPoint1] = [resultPoint1, resultPoint2];
  }

  return [resultPoint0, resultPoint1, resultPoint2];
}

function interpolateXForTwoPoints(firstPoint: TPoint, secondPoint: TPoint): number[] {
  const [x0, y0] = firstPoint;
  const [x1, y1] = secondPoint;

  return interpolate(y0, x0, y1, x1);
}

function interpolateZForTwoPoints(firstPoint: TPoint, secondPoint: TPoint): number[] {
  const [y0, z0] = firstPoint.slice(1);
  const [y1, z1] = secondPoint.slice(1);

  return interpolate(y0, z0, y1, z1)
}

function drawHorizontalLine(fromX: number, toX: number, level: number, zSegment: number[], color?: string) {
  if (!globalState.zBuffer) {
    throw new Error('no z buffer was initialized');
  }

  for (let x = fromX; x <= toX; x++) {
    const z = zSegment[x - fromX];

    drawBufferizedPixel(x, level, z, color);
  }
}


