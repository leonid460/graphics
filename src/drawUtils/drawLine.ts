import { drawBufferizedPixel } from './drawPixel';
import {TPoint} from "../types";

export function drawLine(first: TPoint, second: TPoint, color?: string ) {
  let [x0, y0, z0] = first;
  let [x1, y1, z1] = second

  let steep = false;

  if (Math.abs(x0 - x1) < Math.abs(y0 - y1)) {
    [x0, y0] = [y0, x0];
    [x1, y1] = [y1, x1];
    steep = true;
  }

  if (x0 > x1) {
    [x0, x1] = [x1, x0];
    [y0, y1] = [y1, y0];
  }

  let dx = x1 - x0;
  let dy = y1 - y0;
  let dz = z1 - z0;
  let dError2 = Math.abs(dy) * 2;
  let error2 = 0;
  let y = y0;
  let z = z0;

  for (let x = x0; x <= x1; x++) {
    if (steep) {
      drawBufferizedPixel(y, x, z, color);
    } else {
      drawBufferizedPixel(x, y, z, color);
    }

    error2 += dError2;

    if (error2 > dx) {
      y += (y1 > y0 ? 1 : -1);
      error2 -= dx * 2;
    }
  }
}
