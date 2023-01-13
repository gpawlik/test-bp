export function chunkArray(array: any[], chunkSize: number): string[][] {
  const chunkedArray = [];
  let index = 0;

  while (index < array.length) {
    chunkedArray.push(array.slice(index, index + chunkSize));
    index += chunkSize;
  }

  return chunkedArray;
}
