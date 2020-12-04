import { globalState } from './globalState';
import './index.css';
import { TPoint } from './types';
import { drawFilledTriangleWithStroke } from './drawUtils/drawFilledTriangleWithStroke';
import { projectPoint } from "./projectPoint";

function setUpCanvas(){
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
}

function renderLoop(renderFunction: () => void) {
  renderFunction();

  window.requestAnimationFrame(() => renderLoop(renderFunction));
}

void function main() {
  setUpCanvas();

  const renderPicture = () => {
    const a: TPoint = [100, 100, 1, 1];
    const b: TPoint = [100, 500, 1, 1];
    const c: TPoint = [500, 0, 1, 1];

    const projectedA = projectPoint(a);
    const projectedB = projectPoint(b);
    const projectedC = projectPoint(c);

    const colorsParams = {
      fill: 'aquamarine',
      stroke: 'pink'
    }

    drawFilledTriangleWithStroke([projectedA, projectedB, projectedC], colorsParams);
  }

  //renderPicture();
  renderLoop(renderPicture);
}();

