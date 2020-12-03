import { globalState } from './globalState';
import { drawLine } from './drawLine';
import './index.css';
import { T2DPoint } from './types';
import { multiplyMatrix, transformRowToColumn, transformColumnToRow } from './matrixUtils';

function setUpCanvas(inputPerspective: number){
  const canvas = document.getElementById('scene') as HTMLCanvasElement;

  let width = canvas.offsetWidth;
  let height = canvas.offsetHeight;

  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  function onResize () {
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;

    if (window.devicePixelRatio > 1) {
      canvas.width = canvas.clientWidth * 2;
      canvas.height = canvas.clientHeight * 2;
      ctx.scale(2, 2);
    } else {
      canvas.width = width;
      canvas.height = height;
    }
  }

  window.addEventListener('resize', onResize);
  onResize();

  globalState.canvas = canvas;
  globalState.context = ctx;
  globalState.width = width;
  globalState.height = height;
  globalState.perspective = width * inputPerspective;
  globalState.projectionCenterX = width / 2;
  globalState.projectionCenterY = height / 2;
}

function render() {
  window.requestAnimationFrame(() => render());
}

void function main() {
  setUpCanvas(0.8);

  const drawLineByPoints = (first: T2DPoint, second: T2DPoint, color?: string) =>
    drawLine(first[0], first[1], second[0], second[1], color);

  const a: T2DPoint = [100, 100, 1, 1];
  const b: T2DPoint = [100, 500, 1, 1];
  const c: T2DPoint = [500, 0, 1, 1];

  const projectionMatrix = [
    [1, 0, 0, 100],
    [0, 1, 0, 100],
    [0, 0, 1, 0],
    [0 ,0 ,0, 1]
  ];

  const projectionA = multiplyMatrix(projectionMatrix, transformRowToColumn(a));
  const projectionB = multiplyMatrix(projectionMatrix, transformRowToColumn(b));
  const projectionC = multiplyMatrix(projectionMatrix, transformRowToColumn(c));

  const newA: T2DPoint = transformColumnToRow(projectionA) as T2DPoint;
  const newB: T2DPoint = transformColumnToRow(projectionB) as T2DPoint
  const newC: T2DPoint = transformColumnToRow(projectionC) as T2DPoint

  drawLineByPoints(newA, newB);
  drawLineByPoints(newA, newC);
  drawLineByPoints(newC, newB);
  drawLineByPoints(a, b);
  drawLineByPoints(a, c);
  drawLineByPoints(c, b);
}();
