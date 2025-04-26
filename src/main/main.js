"use strict";

import { fetchIntradayData } from "../api/intradayAPI.js";
import { Chart } from "chart.js/auto";
import { renderChart } from "../utils/renderChart.js";

//testdata
const dataA = [
  { time: "10:00", close: 150 },
  { time: "10:15", close: 155 },
  { time: "10:30", close: 160 },
];

const dataB = [
  { time: "11:00", close: 140 },
  { time: "11:15", close: 135 },
  { time: "11:30", close: 138 },
];

//hier komt new Chart()
renderChart(dataA);

document.getElementById("switchChart").addEventListener("click", () => {
  renderChart(dataB);
});
