import { TPoint } from "../types";
import { drawPixel } from './drawPixel';

export function drawFilledTriangle(firstPoint: TPoint, secondPoint: TPoint, thirdPoint: TPoint, color?: string ) {
  const sortedPoints = sortTrianglePoints([firstPoint, secondPoint, thirdPoint]);
  console.log({ sortedPoints });

  const xBetweenFirstAndSecond = interpolateXForTwoPoints(sortedPoints[0],sortedPoints[1]);
  const xBetweenSecondAndThird = interpolateXForTwoPoints(sortedPoints[1], sortedPoints[2]);
  const xBetweenFirstAndThird = interpolateXForTwoPoints(sortedPoints[0], sortedPoints[2]);

  xBetweenFirstAndSecond.pop();
  const x012 = [...xBetweenFirstAndSecond, ...xBetweenSecondAndThird];
  const [leftXList, rightXList] = defineLeftAndRightSides(x012, xBetweenFirstAndThird);

  for (let currentY = sortedPoints[0][1]; currentY < Math.floor(sortedPoints[2][1]); currentY++) {
    const yAndY0Distance = currentY - sortedPoints[0][1];
    drawHorizontalLine(leftXList[yAndY0Distance], rightXList[yAndY0Distance], currentY, color);
  }
}

function sortTrianglePoints(points: [TPoint, TPoint, TPoint]): [TPoint, TPoint, TPoint] {
  let [resultPoint0, resultPoint1, resultPoint2] = points;

  if (resultPoint0[1] < resultPoint1[1]) {
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

function defineLeftAndRightSides(firstXList: number[], secondXList: number[]): number[][] {
  const m = firstXList.length / 2;

  if (firstXList[m] < secondXList[m]) {
    return [firstXList, secondXList];
  } else {
    return [secondXList, firstXList];
  }
}

function drawHorizontalLine(fromX: number, toX: number, level: number, color?: string) {
  const [leftX, rightX] = fromX > toX ? [toX, fromX] : [fromX, toX];

  console.log({ leftX, rightX })
  for (let x = leftX; x < rightX; x++) {
    drawPixel(x, level, color);
  }
}

function interpolate (firstIndependent: number, firstDependent: number, secondIndependent: number, secondDependent: number): number[] {
  if (firstIndependent == secondIndependent) {
    return [firstDependent];
  }

  const values: number[] = [];
  const a = (secondDependent - firstDependent) / (secondIndependent - firstIndependent)
  let currentDependent = firstDependent;

  for (let i = firstIndependent; i <= secondIndependent; i++) {
    values.push(currentDependent);
    currentDependent += a;
  }

  return values
}
