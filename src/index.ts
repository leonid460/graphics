import { globalState, setGlobalHeight, setGlobalWidth } from './globalState';
import './index.css';
import { TPolygon } from './types';
import { drawFilledTriangleWithStroke } from './drawUtils/drawFilledTriangleWithStroke';
import { projectPolygon } from "./projection";
import { ZBuffer } from './ZBuffer';
import { getPolygonsFromObj } from './getPolygonFromObj';
import { model } from './model';
import { rotatePolygonOverX, rotatePolygonOverY } from './actions/rotate';
import { useControlPanel } from './ui/useControlPanel';
import { clearScreen } from './drawUtils/clearScreen';

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

async function renderLoop(renderFunction: () => void) {
  clearScreen();
  await renderFunction();

  window.requestAnimationFrame(() => renderLoop(renderFunction));
}

void async function main() {
  setUpCanvas();

  const polygons = getPolygonsFromObj(model);
  let adaptedPolygons = adaptPolygons(polygons).map(polygon => rotatePolygonOverY(polygon, -30))

  const fillColors = ['green', 'blue', 'purple', 'yellow', 'red', 'brown', 'green', 'blue', 'purple', 'yellow', 'red', 'brown'];

  const turnPolygonsY = (deg: number) => {
    adaptedPolygons = adaptedPolygons.map(polygon => rotatePolygonOverY(polygon, deg));
  }

  const turnPolygonsX = (deg: number) => {
    adaptedPolygons = adaptedPolygons.map(polygon => rotatePolygonOverX(polygon, deg));
  }

  const handleTurnLeft = () => turnPolygonsY(-15);
  const handleTurnRight = () => turnPolygonsY(15);
  const handleTurnUp = () => turnPolygonsX(-15);
  const handleTurnDown = () => turnPolygonsX(15);

  useControlPanel({
    handleTurnRight,
    handleTurnLeft,
    handleTurnUp,
    handleTurnDown
  });

  const renderPolygons = async () => {
    const promises = adaptedPolygons.map((polygon, index) => {
      return drawFilledTriangleWithStroke(projectPolygon(polygon), {
        stroke: 'black',
        fill: fillColors[index]
      });
    });

    await Promise.all(promises);
  }

  await renderLoop(renderPolygons);
}();



function adaptPolygons(rawPolygons: number[][][]): TPolygon[] {
  return rawPolygons.map(getPointsOfPolygon);
}

function getPointsOfPolygon(polygon: number[][]): TPolygon {
  return polygon.map(vertex => [vertex[0], vertex[1], vertex[2], 1]) as TPolygon;
}

