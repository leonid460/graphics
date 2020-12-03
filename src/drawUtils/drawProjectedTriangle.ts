import { T2DPoint } from "../types";
import { drawLine } from "./drawLine";
import { projectPoint } from '../projectPoint';

export function drawProjectedTriangle(firstPoint: T2DPoint, secondPoint: T2DPoint, thirdPoint: T2DPoint) {
  const drawLineByPoints = (first: T2DPoint, second: T2DPoint, color?: string) =>
    drawLine(first[0], first[1], second[0], second[1], color);

  const newFirstPoint = projectPoint(firstPoint);
  const newSecondPoint = projectPoint(secondPoint);
  const newThirdPoint = projectPoint(thirdPoint);

  drawLineByPoints(newFirstPoint, newSecondPoint);
  drawLineByPoints(newFirstPoint, newThirdPoint);
  drawLineByPoints(newThirdPoint, newSecondPoint);
  drawLineByPoints(firstPoint, secondPoint);
  drawLineByPoints(firstPoint, thirdPoint);
  drawLineByPoints(thirdPoint, secondPoint);
}
