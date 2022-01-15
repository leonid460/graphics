export function parse(file: string) {
  const rows = file.split('\n');

  return getPolygons(rows);
}

function getPolygons(fileStrings: string[]) {
  const { blockBegin, itemsAmount: polygonsAmount } = findBlock(fileStrings, 'POLYGONS');
  const polygons = fileStrings
    .slice(blockBegin, blockBegin + polygonsAmount)
    .map(polygonStr => polygonStr.split(' ').map(Number));

  const points = findPoints(fileStrings);

  return polygons.map(polygon => {
    return polygon.slice(1).map(pointNumber => points[pointNumber]);
  })
}

function findPoints(fileStrings: string[]) {
  const { blockBegin, itemsAmount: pointsAmount } = findBlock(fileStrings, 'POINTS');

  const points = fileStrings
    .slice(blockBegin, blockBegin + pointsAmount)
    .map(coordsStr => coordsStr.split(' ').map(Number));

  return points;
}

function findBlock(fileStrings: string[], blockName: string) {
  let blockBegin = 0;
  let itemsAmount = 0;

  fileStrings.forEach((str, index) => {
    const tokens = str.split(' ');

    if (tokens[0] === blockName) {
      blockBegin = index + 1;
      itemsAmount = Number(tokens[1]);
    }
  });

  return {
    blockBegin,
    itemsAmount
  }
}
