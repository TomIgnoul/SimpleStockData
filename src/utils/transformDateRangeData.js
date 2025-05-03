export function transformDateRangeData(dataArray) {
  if (!Array.isArray(dataArray) || dataArray === 0) return [];
  console.log("raw date range: ", dataArray[0]);

  return dataArray.map((entry) => ({
    time: entry.Date || entry.Datetime,
    open: parseFloat(entry.Open),
    high: parseFloat(entry.High),
    low: parseFloat(entry.Low),
    close: parseFloat(entry.Close),
    volume: parseInt(entry.Volume, 10),
  }));
}
