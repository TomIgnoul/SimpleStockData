// src/utils/chartRenderer.js

import { renderLineChart } from "./renderLineChart.js";
import { renderBarChart } from "./renderBarChart.js";
import { transformToChart } from "./transformChartData.js";
import {
  setLastCandlestickData,
  getSelectedChartType,
} from "../store/chartStore.js";

export function renderChartByType(candlestickData, options = {}) {
  setLastCandlestickData(candlestickData);

  const type = getSelectedChartType();
  const chartData = transformToChart(candlestickData, "Close Price");

  if (type === "bar") {
    renderBarChart(chartData, options);
  } else {
    renderLineChart(chartData, options);
  }
}
