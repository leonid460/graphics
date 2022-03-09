// @ts-ignore
import { ZBuffer } from "./ZBuffer";

interface IGlobalState {
  canvas?: HTMLCanvasElement,
  context?: CanvasRenderingContext2D,
  width: number;
  height: number;
  projectionMatrix: number[][];
  zBuffer?: ZBuffer;
}

export const globalState: IGlobalState = {
  width: 0,
  height: 0,
  projectionMatrix: [
    [80, 0, 0, 0],
    [0, -80, 0, 0],
    [0, 0, 80, 0],
    [0 ,0 ,0, 1]
  ]
};

export function setGlobalHeight(value: number) {
  return setSize('height', value);
}

export function setGlobalWidth(value: number) {
  return setSize('width', value);
}

function setSize(direction: 'height' | 'width', value: number) {
  globalState[direction] = value;

  if (direction === 'width') {
    globalState.projectionMatrix[0][3] = value / 2;
  }

  if (direction === 'height') {
    globalState.projectionMatrix[1][3] = value / 2;
  }
}
