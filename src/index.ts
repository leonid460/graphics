import { globalState, setGlobalHeight, setGlobalWidth } from './globalState';
import './index.css';
import { TPoint } from './types';
import { drawFilledTriangleWithStroke } from './drawUtils/drawFilledTriangleWithStroke';
import { projectPoint } from "./projectPoint";
import { ZBuffer } from './ZBuffer';
import { getPolygonsFromObj } from './getPolygonFromObj';
import { model } from './model';
import { rotatePolygonOverX, rotatePolygonOverY } from './actions/rotate';

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
  }

  globalState.zBuffer = new ZBuffer(width, height);

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
  const adaptedPolygons = adaptPolygons(polygons)
    .map(polygon => rotatePolygonOverY(polygon, 45))
    .map(polygon => rotatePolygonOverX(polygon, 45))

  const testRawPolygon1 = [[-1, -1, 10], [1, 1, 10], [1, -1, 10]];
  const testRawPolygon2 = [[-1, -1, 0], [-1, 1, 0], [1, -1, 0]];

  const [firstPolygon, secondPolygon] = adaptPolygons([testRawPolygon1, testRawPolygon2]);
  const [a, b, c] = firstPolygon;
  const [d, e, f] = secondPolygon;

  const colorsParams1 = {
    fill: 'red',
    stroke: 'black'
  }

  const colorsParams2 = {
    fill: 'blue',
    stroke: 'blue'
  }

  const renderPicture = () => {
    const projectedA = projectPoint(a);
    const projectedB = projectPoint(b);
    const projectedC = projectPoint(c);

    const projectedD = projectPoint(d);
    const projectedE = projectPoint(e);
    const projectedF = projectPoint(f);

    drawFilledTriangleWithStroke([projectedA, projectedB, projectedC], colorsParams1);
    drawFilledTriangleWithStroke([projectedD, projectedE, projectedF], colorsParams2);
  }

  const renderPolygons = () => {
    adaptedPolygons.forEach(polygon => {
      const [a, b, c] = polygon;

      const projectedA = projectPoint(a);
      const projectedB = projectPoint(b);
      const projectedC = projectPoint(c);

      drawFilledTriangleWithStroke([projectedA, projectedB, projectedC], colorsParams1);
    })
  }

  // renderPolygons();
  //renderPicture();
  renderLoop(renderPolygons);
}();

function adaptPolygons(rawPolygons: number[][][]): TPoint[][] {
  return rawPolygons.map(getPointsOfPolygon);
}

function getPointsOfPolygon(polygon: number[][]): TPoint[] {
  return polygon.map(vertex => [vertex[0], vertex[1], vertex[2], 1]);
}
