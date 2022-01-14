export function getAverage(list: Array<number>): number {
  return list.reduce((a, b) => a + b, 0) / list.length;
}

export function getStandardDeviation(list: Array<number>): number {
  const mean = getAverage(list);

  return Math.sqrt(list.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / list.length);
}
