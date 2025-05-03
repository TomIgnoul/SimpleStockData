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

// export function transformIntradayData(intradayData, interval) {
//   const seriesKey = `Time Series (${interval})`;
//   const raw = intradayData[seriesKey];
//   if (!raw) {
//     console.error(`kon '${seriesKey}' niet vinden in Response`, intradayData);
//     return [];
//   }
//   return Object.entries(raw).map(([time, vals]) => ({
//     time,
//     open: parseFloat(vals["1. open"]),
//     high: parseFloat(vals["2. high"]),
//     low: parseFloat(vals["3. low"]),
//     close: parseFloat(vals["4. close"]),
//     volume: parseInt(vals["5. volume"], 10),
//   }));
// }
