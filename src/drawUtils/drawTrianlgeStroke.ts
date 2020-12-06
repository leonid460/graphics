import { TPoint}  from "../types";
import { drawLine } from "./drawLine";

export function drawTriangleStroke(firstPoint: TPoint, secondPoint: TPoint, thirdPoint: TPoint, color?: string) {
  drawLine(firstPoint, secondPoint, color);
  drawLine(firstPoint, thirdPoint, color);
  drawLine(thirdPoint, secondPoint, color);
}
