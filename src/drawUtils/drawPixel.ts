import { globalState } from '../globalState';

export function drawPixel(x: number, y: number, color = 'black') {
  if (!globalState.context) {
    throw new Error('No context in global state');
  }

  globalState.context.fillStyle = color;
  globalState.context.globalAlpha = 1;
  globalState.context.fillRect(x, y, 1, 1);
}

export function drawBufferizedPixel(x: number, y: number, z: number, color = 'black') {
  if (!globalState.zBuffer) {
    throw new Error('no z buffer was initialized');
  }

  const zFromBuffer = globalState.zBuffer.get(x, y);
  const shouldDraw = z >= zFromBuffer;

  if (shouldDraw) {
    drawPixel(x, y, color);
    globalState.zBuffer.set(x, y, z);
  }
}
