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
    [1, 0, 0, 100],
    [0, 1, 0, 100],
    [0, 0, 1, 0],
    [0 ,0 ,0, 1]
  ]
};
