import './index.css';
import { setUpEnvironment } from './environment/setupEnvironment';
import { getPolygonsFromObj } from './model/blender/getPolygonFromObj';
import { adaptRawPolygons } from './model/blender/adaptors';
import { projectPolygon } from "./environment/projection";
import { clearScreen } from './drawUtils/clearScreen';
import { drawFilledTriangleWithStroke } from './drawUtils/drawFilledTriangleWithStroke';
import {rotatePolygonOverX, rotatePolygonOverY, rotatePolygonOverZ} from './actions/rotate';
import { mirrorPolygonOverX, mirrorPolygonOverY, mirrorPolygonOverZ } from './actions/mirror';
import { stretchPolygonOverX, stretchPolygonOverY, stretchPolygonOverZ} from './actions/stretch';
import { movePolygonX, movePolygonY, movePolygonZ } from './actions/move';
import { useControlPanel } from './ui/useControlPanel/useControlPanel';
import { loadModel } from './model/blender/loadModel';

async function renderLoop(renderFunction: () => void) {
  clearScreen();
  await renderFunction();

  window.requestAnimationFrame(() => renderLoop(renderFunction));
}

void async function main() {
  setUpEnvironment();
  const model = loadModel(1);
  const polygons = getPolygonsFromObj(model);

  let adaptedPolygons = adaptRawPolygons(polygons);

  const fillColors = ['green', 'blue', 'purple', 'yellow', 'red', 'brown', 'green', 'blue', 'purple', 'yellow', 'red', 'brown'];

  const turnPolygonsY = (deg: number) => {
    adaptedPolygons = adaptedPolygons.map(polygon => rotatePolygonOverY(polygon, deg));
  }

  const turnPolygonsX = (deg: number) => {
    adaptedPolygons = adaptedPolygons.map(polygon => rotatePolygonOverX(polygon, deg));
  }

  const turnPolygonsZ = (deg: number) => {
    adaptedPolygons = adaptedPolygons.map(polygon => rotatePolygonOverZ(polygon, deg));
  }

  const mirrorPolygonsY = () => {
    adaptedPolygons = adaptedPolygons.map(polygon => mirrorPolygonOverY(polygon));
  }

  const mirrorPolygonsX = () => {
    adaptedPolygons = adaptedPolygons.map(polygon => mirrorPolygonOverZ(polygon));
  }

  const mirrorPolygonsZ = () => {
    adaptedPolygons = adaptedPolygons.map(polygon => mirrorPolygonOverX(polygon));
  }

  const stretchPolygonsX = (k: number) => {
    adaptedPolygons = adaptedPolygons.map(polygon => stretchPolygonOverX(polygon, k));
  }

  const stretchPolygonsY = (k: number) => {
    adaptedPolygons = adaptedPolygons.map(polygon => stretchPolygonOverY(polygon, k));
  }

  const stretchPolygonsZ = (k: number) => {
    adaptedPolygons = adaptedPolygons.map(polygon => stretchPolygonOverZ(polygon, k));
  }

  const movePolygonsX = (value: number) => {
    adaptedPolygons = adaptedPolygons.map(polygon => movePolygonX(polygon, value));
  }

  const movePolygonsY = (value: number) => {
    adaptedPolygons = adaptedPolygons.map(polygon => movePolygonY(polygon, value));
  }

  let autoRotationMode = false;
  const toggleAutoMode = () => {
    autoRotationMode = !autoRotationMode;
  }

  const handleTurnLeft = () => turnPolygonsY(-15);
  const handleTurnRight = () => turnPolygonsY(15);
  const handleTurnUp = () => turnPolygonsX(-15);
  const handleTurnDown = () => turnPolygonsX(15);
  const handleTurnClock = () => turnPolygonsZ(15);
  const handleTurnReverseClock = () => turnPolygonsZ(-15);

  const handleMirrorX = () => mirrorPolygonsX();
  const handleMirrorY = () => mirrorPolygonsY();
  const handleMirrorZ = () => mirrorPolygonsZ();

  const handleStretchOutX = () => stretchPolygonsX(1.1);
  const handleStretchOutY = () => stretchPolygonsY(1.1);
  const handleStretchOutZ = () => stretchPolygonsZ(1.1);

  const handleStretchInX = () => stretchPolygonsX(0.9);
  const handleStretchInY = () => stretchPolygonsY(0.9);
  const handleStretchInZ = () => stretchPolygonsZ(0.9);

  const handleMoveRight = () => movePolygonsX(10);
  const handleMoveLeft = () => movePolygonsX(-10);
  const handleMoveUp = () => movePolygonsY(10);
  const handleMoveDown = () => movePolygonsY(-10);

  useControlPanel({
    handleTurnRight,
    handleTurnLeft,
    handleTurnUp,
    handleTurnDown,
    handleTurnClock,
    handleTurnReverseClock,
    toggleAutoMode,
    handleMirrorX,
    handleMirrorY,
    handleMirrorZ,
    handleStretchOutX,
    handleStretchOutY,
    handleStretchOutZ,
    handleStretchInX,
    handleStretchInY,
    handleStretchInZ,
    handleMoveRight,
    handleMoveLeft,
    handleMoveUp,
    handleMoveDown
  });

  const renderPolygons = async () => {
    if (autoRotationMode) {
      turnPolygonsY(-2);
      turnPolygonsX(2);
    }

    const promises = adaptedPolygons.map((polygon, index) => {
      const projectedPolygon = projectPolygon(polygon);

      return drawFilledTriangleWithStroke(projectedPolygon, {
        stroke: 'black',
        fill: 'red'
      });
    });

    await Promise.all(promises);
  }

  await renderLoop(renderPolygons);
}();





