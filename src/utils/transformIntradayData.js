"use strict";

export function transformIntradayData(dataArray) {
  if (!Array.isArray(dataArray) || dataArray.length == 0) {
    return []; //if argument is not an array or has no data in there than we return an empty array
  }

  return dataArray.map((entry) => ({
    time: entry.Date,
    open: parseFloat(entry.Open),
    high: parseFloat(entry.High),
    low: parseFloat(entry.Low),
    close: parseFloat(entry.Close),
    volume: parseInt(entry.Volume, 10),
  }));
}
