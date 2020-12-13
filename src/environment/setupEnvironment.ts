import { globalState, setGlobalHeight, setGlobalWidth } from "./globalState";
import { ZBuffer } from "./ZBuffer";

export function setUpEnvironment(){
  const canvas = document.getElementById('scene') as HTMLCanvasElement;

  let width = canvas.offsetWidth;
  let height = canvas.offsetHeight;

  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  globalState.canvas = canvas;
  globalState.context = ctx;

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

    setGlobalWidth(width);
    setGlobalHeight(height);
    globalState.zBuffer = new ZBuffer(width, height);
  }

  window.addEventListener('resize', onResize);
  onResize();
}
