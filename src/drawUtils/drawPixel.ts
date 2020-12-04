import { globalState } from '../globalState';

export function drawPixel(x: number, y: number, color = 'black') {
  if (!globalState.context) {
    throw new Error('No context in global state');
  }

  globalState.context.fillStyle = color;
  globalState.context.fillRect(x, y, 1, 1);
}
