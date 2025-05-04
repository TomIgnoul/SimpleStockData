// src/utils/transformChartData.js
"use strict";

//This funcion is used by renderChartByType in ../main/main.js
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
