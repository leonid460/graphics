import { globalState } from './globalState';
import { Dot } from './Dot';
import './index.css';

function setUpCanvas(inputPerspective: number){
  const canvas = document.getElementById('scene') as HTMLCanvasElement;

  let width = canvas.offsetWidth; // Width of the scene
  let height = canvas.offsetHeight; // Height of the scene

  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  function onResize () {
    // We need to define the dimensions of the canvas to our canvas element
    // Javascript doesn't know the computed dimensions from CSS so we need to do it manually
    width = canvas.offsetWidth;
    height = canvas.offsetHeight;

    // If the screen device has a pixel ratio over 1
    // We render the canvas twice bigger to make it sharper (e.g. Retina iPhone)
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
  // Make sure the canvas size is perfect
  onResize();

  globalState.canvas = canvas;
  globalState.context = ctx;
  globalState.width = width;
  globalState.height = height;
  globalState.perspective = width * inputPerspective;
  globalState.projectionCenterX = width / 2;
  globalState.projectionCenterY = height / 2;
}

function renderDots(dots: Dot[]) {
  if (!globalState.context) {
    throw new Error('No canvas context in global state');
  }

  globalState.context.clearRect(0, 0, globalState.width, globalState.height);

  for (let i = 0; i < dots.length; i++) {
    dots[i].draw();
  }

  window.requestAnimationFrame(() => renderDots(dots));
}

void function main() {
  setUpCanvas(0.8);
  const dots: Dot[] = [];

  for (let i = 0; i < 800; i++) {
    dots.push(new Dot());
  }

  renderDots(dots);
}();
