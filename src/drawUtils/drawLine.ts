import { drawBufferizedPixel } from './drawPixel';
import {TPoint} from "../types";
import { interpolate } from '../utils/interpolate';

export function drawLine(first: TPoint, second: TPoint, color?: string) {
  let [x0, y0, z0] = first.map(Math.round);
  let [x1, y1, z1] = second.map(Math.round);

  if (Math.abs(x1 - x0) > Math.abs(y1 - y0)) {
    if (x0 > x1) {
      [x0, x1] = [x1, x0];
      [y0, y1] = [y1, y0];
      [z0, z1] = [z1, z0];
    }

    const ySegment = interpolate(x0, y0, x1, y1);
    const zSegment = interpolate(x0, z0, x1, z1);

    for (let x = x0; x <= x1; x++) {
      const y = ySegment[x - x0];
      const z = zSegment[x - x0];

      drawBufferizedPixel(x, y, z, color);
    }
  } else {
    if (y0 > y1) {
      [x0, x1] = [x1, x0];
      [y0, y1] = [y1, y0];
      [z0, z1] = [z1, z0];
    }

    const xSegment = interpolate(y0, x0, y1, x1);
    const zSegment = interpolate(y0, z0, y1, z1);

    for (let y = y0; y <= y1; y++) {
      const x = xSegment[y - y0];
      const z = zSegment[y - y0];

      drawBufferizedPixel(x, y, z, color);
    }
  }
}
