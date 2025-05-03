"use strict";

export function transformIntradayData(dataArray) {
  if (!Array.isArray(dataArray) || dataArray.length == 0) {
    return [];
  }

  console.log("Raw dataArray received: ", dataArray);
  //we can work with .map() function as we checked if dataArray is a valid array
  return dataArray.map((entry) => ({
    time: entry.Datetime,
    open: parseFloat(entry.Open),
    high: parseFloat(entry.High),
    low: parseFloat(entry.Low),
    close: parseFloat(entry.Close),
    volume: parseInt(entry.Volume, 10),
  }));
}
