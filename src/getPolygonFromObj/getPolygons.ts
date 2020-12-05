export function getPolygons(polygonsParams: number[][][], verticesCollection: number[][]) {
  const polygons: number[][][] = [];

  polygonsParams.forEach(polygonTriplets => {
    const firstVertexNumber = polygonTriplets[0][0] - 1;
    const secondVertexNumber = polygonTriplets[1][0] - 1;
    const thirdVertexNumber = polygonTriplets[2][0] - 1;

    const firstVertex = verticesCollection[firstVertexNumber];
    const secondVertex = verticesCollection[secondVertexNumber];
    const thirdVertex = verticesCollection[thirdVertexNumber];

    polygons.push([firstVertex, secondVertex, thirdVertex])
  });

  return polygons;
}
