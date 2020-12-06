import { drawTriangleStroke } from './drawTrianlgeStroke';
import { drawFilledTriangle } from './drawFilledTriangle';
import { TPoint } from "../types";

type TColorsParams = {
  stroke: string;
  fill: string;
}

export function drawFilledTriangleWithStroke(points: [TPoint, TPoint, TPoint], colorsParams: TColorsParams ) {
  drawTriangleStroke(...points, colorsParams.stroke);
  drawFilledTriangle(...points, colorsParams.fill);
}
