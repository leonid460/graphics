import { drawTriangleStroke } from './drawTrianlgeStroke';
import { drawFilledTriangle } from './drawFilledTriangle';
import { TPoint } from "../types";

type TColorsParams = {
  stroke: string;
  fill: string;
}

export async function drawFilledTriangleWithStroke(points: [TPoint, TPoint, TPoint], colorsParams: TColorsParams): Promise<void> {
  return new Promise(resolve => {
    drawFilledTriangle(...points, colorsParams.fill);
    //drawTriangleStroke(...points, colorsParams.stroke);
    resolve();
  })
}
