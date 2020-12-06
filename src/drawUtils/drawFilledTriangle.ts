import { TPoint } from "../types";
import { drawBufferizedPixel } from './drawPixel';
import { globalState } from '../globalState';

export function drawFilledTriangle(firstPoint: TPoint, secondPoint: TPoint, thirdPoint: TPoint, color?: string ) {
  let sortedPoints = sortTrianglePoints([firstPoint, secondPoint, thirdPoint]);
  sortedPoints.forEach(point => point[1] = Math.floor(point[1]))

  const xBetweenFirstAndSecond = interpolateXForTwoPoints(sortedPoints[0],sortedPoints[1]);
  const xBetweenSecondAndThird = interpolateXForTwoPoints(sortedPoints[1], sortedPoints[2]);
  const xBetweenFirstAndThird = interpolateXForTwoPoints(sortedPoints[0], sortedPoints[2]);
  const z01 = interpolateZForTwoPoints(sortedPoints[0],sortedPoints[1]);
  const z12 = interpolateZForTwoPoints(sortedPoints[1],sortedPoints[2]);
  const z02 = interpolateZForTwoPoints(sortedPoints[0],sortedPoints[2]);

  xBetweenFirstAndSecond.pop();
  const x012 = [...xBetweenFirstAndSecond, ...xBetweenSecondAndThird];

  z01.pop();
  const z012 = [...z01, ...z12 ];

  const { zLists, xLists } = defineLeftAndRightLists([x012, xBetweenFirstAndThird], [z012, z02]);
  const [leftXList, rightXList] = xLists;
  const [leftZList, rightZList] = zLists;

  for (let currentY = sortedPoints[0][1]; currentY <= sortedPoints[2][1]; currentY++) {
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

function defineLeftAndRightXList(firstXList: number[], secondXList: number[]): number[][] {
  const m = firstXList.length / 2;

  if (firstXList[m] < secondXList[m]) {
    return [firstXList, secondXList];
  } else {
    return [secondXList, firstXList];
  }
}

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

function drawHorizontalLine(fromX: number, toX: number, level: number, zSegment: number[], color?: string) {
  const [leftX, rightX] = fromX > toX ? [toX, fromX] : [fromX, toX];

  if (!globalState.zBuffer) {
    throw new Error('no z buffer was initialized');
  }

  for (let x = leftX; x <= rightX; x++) {
    const z = zSegment[x - leftX];

    let zFromBuffer = globalState.zBuffer.get(x, level);
    const shouldDraw = z >= zFromBuffer;

    drawBufferizedPixel(x, level, z, color);
  }
}

function interpolate (firstIndependent: number, firstDependent: number, secondIndependent: number, secondDependent: number): number[] {
  if (firstIndependent == secondIndependent) {
    return [firstDependent];
  }

  const values: number[] = [];
  const a = (secondDependent - firstDependent) / (secondIndependent - firstIndependent)
  let currentDependent = firstDependent;

  fromTo(firstIndependent, secondIndependent, (index) => {
    values.push(currentDependent);
    currentDependent += a;
  })

  return values
}

function fromTo(from: number, to: number, action: (index: number) => void) {
  const [left, right] = from < to ? [from, to] : [to, from];

  for (let i = left; i <= right; i++) {
    action(i);
  }
}
