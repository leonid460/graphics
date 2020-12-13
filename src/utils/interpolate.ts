export function interpolate (firstIndependent: number, firstDependent: number, secondIndependent: number, secondDependent: number): number[] {
  if (firstIndependent == secondIndependent) {
    return [firstDependent];
  }

  const values: number[] = [];
  const a = (secondDependent - firstDependent) / (secondIndependent - firstIndependent);

  let currentDependent = firstDependent;

  const from = firstIndependent;
  const to = secondIndependent;

  for (let i = from; i <= to; i++) {
    values.push(Math.floor(currentDependent));
    currentDependent += a;
  }

  return values;
}
