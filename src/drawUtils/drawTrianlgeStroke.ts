import { TPoint}  from "../types";
import  {drawLine } from "./drawLine";

export function drawTriangleStroke(firstPoint: TPoint, secondPoint: TPoint, thirdPoint: TPoint, color?: string) {
  const drawLineByPoints = (first: TPoint, second: TPoint, color?: string) =>
    drawLine(first[0], first[1], second[0], second[1], color);

  drawLineByPoints(firstPoint, secondPoint, color);
  drawLineByPoints(firstPoint, thirdPoint, color);
  drawLineByPoints(thirdPoint, secondPoint, color);
}
