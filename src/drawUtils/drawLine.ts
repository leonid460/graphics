import { drawPixel } from './drawPixel';

export function drawLine(x0: number, y0: number, x1: number, y1: number, color = 'color') {
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
  let dError2 = Math.abs(dy) * 2;
  let error2 = 0;
  let y = y0;

  for (let x = x0; x <= x1; x++) {
    if (steep) {
      drawPixel(y, x, color);
    } else {
      drawPixel(x, y, color);
    }

    error2 += dError2;

    if (error2 > dx) {
      y += (y1 > y0 ? 1 : -1);
      error2 -= dx * 2;
    }
  }
}
