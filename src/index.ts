import './index.css';
import { setUpEnvironment } from './environment/setupEnvironment';
import { getPolygonsFromObj } from './getPolygonFromObj';
import { adaptRawPolygons } from './model/adaptors';
import { projectPolygon } from "./environment/projection";
import { clearScreen } from './drawUtils/clearScreen';
import { drawFilledTriangleWithStroke } from './drawUtils/drawFilledTriangleWithStroke';
import { rotatePolygonOverX, rotatePolygonOverY } from './actions/rotate';
import { useControlPanel } from './ui/useControlPanel/useControlPanel';
import { loadModel } from './model/loadModel';

async function renderLoop(renderFunction: () => void) {
  clearScreen();
  await renderFunction();

  window.requestAnimationFrame(() => renderLoop(renderFunction));
}

void async function main() {
  setUpEnvironment();
  const model = loadModel();

  const polygons = getPolygonsFromObj(model);
  let adaptedPolygons = adaptRawPolygons(polygons).map(polygon => rotatePolygonOverY(polygon, -30))

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





