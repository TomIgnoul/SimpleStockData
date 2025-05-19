"use strict";

export function transformToChart(dataArray, label = "Price") {
  if (!Array.isArray(dataArray) || dataArray.length === 0) {
    return { labels: [], values: [], label };
  }

  return {
    labels: dataArray.map((d) => d.time),
    values: dataArray.map((d) => d.close),
    label,
  };
}
