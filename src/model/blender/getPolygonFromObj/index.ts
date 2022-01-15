import { getPolygons } from './getPolygons';
import { parseObjString } from './parseObjString';


export function getPolygonsFromObj(modelObjString: string) {
  const { polygonsParams, verticesCollection } = parseObjString(modelObjString);
  return getPolygons(polygonsParams, verticesCollection);
}
