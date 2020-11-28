import { globalState } from './globalState';

export class Dot {
  x: number;
  y: number;
  z: number;
  radius: number;
  xProjected: number;
  yProjected: number;
  scaleProjected: number;

  constructor() {
    this.x = (Math.random() - 0.5) * globalState.width;
    this.y = (Math.random() - 0.5) * globalState.height;
    this.z = Math.random() * globalState.width;
    this.radius = 10;

    this.xProjected = 0;
    this.yProjected = 0;
    this.scaleProjected = 0;
  }

  project3DOn2d() {
    this.scaleProjected = globalState.perspective / (globalState.perspective + this.z);
    this.xProjected = (this.x * this.scaleProjected) + globalState.projectionCenterX;
    this.yProjected = (this.y * this.scaleProjected) + globalState.projectionCenterY;
  }

  draw() {
    if (!globalState.context) {
      throw new Error('No context in global state');
    }

    this.project3DOn2d();

    const opacity =  Math.abs(1 - this.z / globalState.width);
    const projectedX = this.xProjected - this.radius;
    const projectedY = this.yProjected - this.radius;
    const projectedScale = this.radius * 2 * this.scaleProjected

    globalState.context.globalAlpha = opacity;
    globalState.context.fillRect(projectedX, projectedY, projectedScale, projectedScale);
  }
}
