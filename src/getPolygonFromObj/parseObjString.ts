export function parseObjString(objString: string) {
  const rows = objString.split('\n');
  const verticesStrings = rows.filter(row => `${row[0]}${row[1]}` === 'v ');
  const fStrings = rows.filter(row => `${row[0]}${row[1]}` === 'f ');

  const polygonsParams = fStrings.map(row => (
    getFieldValues(row).map(tripleString => (
      tripleString.split('/').map(Number)
    ))
  ));

  const verticesCollection = verticesStrings.map(row => (
    getFieldValues(row).map(Number)
  ));

  return {
    polygonsParams,
    verticesCollection
  }
}

function getFieldValues(field: string): string[] {
  return field.split(' ').slice(1);
}
