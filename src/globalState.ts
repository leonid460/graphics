interface IGlobalState {
  canvas?: HTMLCanvasElement,
  context?: CanvasRenderingContext2D,
  width: number;
  height: number;
  perspective: number;
  projectionCenterX: number;
  projectionCenterY: number;
}

export const globalState: IGlobalState = {
  width: 0,
  height: 0,
  perspective: 0,
  projectionCenterX: 0,
  projectionCenterY: 0
};
