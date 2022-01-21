function getAverage(list) {
  return list.reduce((a, b) => a + b, 0) / list.length;
}

function getStandardDeviation(list) {
  const mean = getAverage(list);

  return Math.sqrt(list.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b, 0) / list.length);
}

module.exports = {
  getAverage,
  getStandardDeviation,
};
