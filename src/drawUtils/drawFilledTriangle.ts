import { TPoint, TPolygon } from "../types";
import { drawBufferizedPixel } from './drawPixel';
import { globalState } from '../globalState';

export function drawFilledTriangle(firstPoint: TPoint, secondPoint: TPoint, thirdPoint: TPoint, color?: string) {
  let sortedPoints = sortTrianglePoints([firstPoint, secondPoint, thirdPoint]);
  sortedPoints = sortedPoints.map(point => point.map(Math.floor)) as TPolygon;

  // console.log({ sortedPoints });

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

  const [leftXList, rightXList] = [x012, x02];
  const [leftZList, rightZList] = [z012, z02];

  // debugger;
  // O(n^2)
  for (let currentY = sortedPoints[0][1]; currentY <= sortedPoints[2][1]; currentY += 1) {
    const yAndY0Distance = currentY - sortedPoints[0][1];
    const xLeft = leftXList[yAndY0Distance];
    const xRight = rightXList[yAndY0Distance];
    const zLeft = leftZList[yAndY0Distance];
    const zRight = rightZList[yAndY0Distance];

    //debugger;
    const zSegment = interpolate(xLeft, zLeft, xRight, zRight);
    // console.log({ xLeft, zLeft, xRight, zRight });
    // console.log({ zSegment });
    // debugger;
    drawHorizontalLine(xLeft, xRight, currentY, zSegment, color);
  }
}

// O(1)
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

// лучший случай: O(1) | худший: O(n)
function interpolateXForTwoPoints(firstPoint: TPoint, secondPoint: TPoint): number[] {
  const [x0, y0] = firstPoint;
  const [x1, y1] = secondPoint;

  return interpolate(y0, x0, y1, x1);
}

// лучший случай: O(1) | худший: O(n)
function interpolateZForTwoPoints(firstPoint: TPoint, secondPoint: TPoint): number[] {
  const [y0, z0] = firstPoint.slice(1);
  const [y1, z1] = secondPoint.slice(1);

  return interpolate(y0, z0, y1, z1)
}

// O(1)
function defineLeftAndRightLists(xLists: number[][], zLists: number[][]): { zLists: number[][], xLists: number[][] } {
  const [firstXList, secondXList] = xLists;
  const [firstZList, secondZList] = zLists;

  const m = firstXList.length / 2;

  if (firstXList[m] < secondXList[m]) {
    return {
      xLists: [firstXList, secondXList],
      zLists: [firstZList, secondZList]
    };
  } else {
    return {
      xLists: [secondXList, firstXList],
      zLists: [secondZList, firstZList]
    };
  }
}

// O(n)
function drawHorizontalLine(fromX: number, toX: number, level: number, zSegment: number[], color?: string) {
  if (!globalState.zBuffer) {
    throw new Error('no z buffer was initialized');
  }

  const [leftX, rightX] = fromX > toX ? [toX, fromX] : [fromX, toX];

  if (fromX > toX) {
    zSegment = zSegment.reverse();
  }

  for (let x = leftX; x <= rightX; x++) {
    const z = zSegment[x - leftX];

    drawBufferizedPixel(x, level, z, color);
  }
}

// лучший случай: O(1) | худший: O(n)
function interpolate (firstIndependent: number, firstDependent: number, secondIndependent: number, secondDependent: number): number[] {
  if (firstIndependent == secondIndependent) {
    return [firstDependent];
  }

  const values: number[] = [];
  let a = (secondDependent - firstDependent) / (secondIndependent - firstIndependent);

  if (firstDependent > secondDependent) {
    a = - Math.abs(a);
  } else {
    a = Math.abs(a);
  }

  let currentDependent = firstDependent;

  const from = firstIndependent;
  const to = secondIndependent;

  const [left, right] = from < to ? [from, to] : [to, from];

  for (let i = left; i <= right; i++) {
    values.push(Math.floor(currentDependent));
    currentDependent += a;
  }

  return values;
}
