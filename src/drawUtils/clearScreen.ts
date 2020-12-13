import { globalState } from '../globalState';

export function clearScreen() {
  const { context, height, width } = globalState;

  if (!context) {
    throw new Error('no canvas context in global state');
  }

  setTimeout(() => {
    context.clearRect(0, 0, width, height);
    globalState.zBuffer?.clear();
  }, 0);
}
