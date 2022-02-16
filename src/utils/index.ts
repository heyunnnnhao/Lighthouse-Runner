export function formatTime(time): string {
  return new Date(time).toLocaleString('zh-CN');
}

export function getAverage(list: Array<number>): number {
  return list.reduce((a, b) => a + b, 0) / list.length;
}

export function getStandardDeviation(list: Array<number>): number {
  const mean = getAverage(list);

  return Math.sqrt(list.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b, 0) / list.length);
}
