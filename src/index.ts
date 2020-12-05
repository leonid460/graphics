import { globalState, setGlobalHeight, setGlobalWidth } from './globalState';
import './index.css';
import { TPoint } from './types';
import { drawFilledTriangleWithStroke } from './drawUtils/drawFilledTriangleWithStroke';
import { projectPoint } from "./projectPoint";
import { ZBuffer } from './ZBuffer';
import { getPolygonsFromObj } from './getPolygonFromObj';
import { model } from './model';

function setUpCanvas(){
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

function renderLoop(renderFunction: () => void) {
  renderFunction();

  window.requestAnimationFrame(() => renderLoop(renderFunction));
}

void function main() {
  setUpCanvas();
  const polygons = getPolygonsFromObj(model);
  const adaptedPolygons = adaptPolygons(polygons);
  const firstPolygon = adaptedPolygons[0];
  const secondPolygon = adaptedPolygons[1];
  const [a, b, c] = firstPolygon;
  const [d, e, f] = secondPolygon;
  const colorsParams = {
    fill: 'aquamarine',
    stroke: 'red'
  }

  const renderPicture = () => {
    const projectedA = projectPoint(a);
    const projectedB = projectPoint(b);
    const projectedC = projectPoint(c);

    const projectedD = projectPoint(d);
    const projectedE = projectPoint(e);
    const projectedF = projectPoint(f);

    drawFilledTriangleWithStroke([projectedD, projectedE, projectedF], colorsParams);
    drawFilledTriangleWithStroke([projectedA, projectedB, projectedC], colorsParams);
  }

  const renderPolygons = () => {
    adaptedPolygons.forEach(polygon => {
      const [a, b, c] = polygon;

      const projectedA = projectPoint(a);
      const projectedB = projectPoint(b);
      const projectedC = projectPoint(c);

      drawFilledTriangleWithStroke([projectedA, projectedB, projectedC], colorsParams);
    })
  }

  //renderPolygons();
  //renderPicture();
  renderLoop(renderPolygons);
}();

function adaptPolygons(rawPolygons: number[][][]): TPoint[][] {
  return rawPolygons.map(getPointsOfPolygon);
}

function getPointsOfPolygon(polygon: number[][]): TPoint[] {
  return polygon.map(vertex => [vertex[0], vertex[1], vertex[2], 1]);
}
