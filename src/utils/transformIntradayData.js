"use strict";

export function transformIntradayData(intradayData, interval) {
  const seriesKey = `Time Series (${interval})`;
  const raw = intradayData[seriesKey];
  if (!raw) {
    console.error(`kon '${seriesKey}' niet vinden in Response`, intradayData);
    return [];
  }
  return Object.entries(raw).map(([time, vals]) => ({
    time,
    open: parseFloat(vals["1. open"]),
    high: parseFloat(vals["2. high"]),
    low: parseFloat(vals["3. low"]),
    close: parseFloat(vals["4. close"]),
    volume: parseInt(vals["5. volume"], 10),
  }));
}
