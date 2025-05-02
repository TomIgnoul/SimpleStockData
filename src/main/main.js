"use strict";

import { Chart } from "chart.js/auto";
import { renderChart } from "../utils/renderChart.js";
import { intradayData } from "../init/intradayData.js";
import { searchSymbol } from "../api/searchSymbolAPI.js";



searchSymbol("tesla").then((resultaten) => {
  console.log(resultaten);
});
const stringValues = ["1min", "5min", "15min", "30min", "60min"];
const slider = document.getElementById("slider");
const output = document.getElementById("slider-value");
intradayData("AAPL", stringValues[slider.value]);
slider.addEventListener("input", () => {
  console.log(stringValues[slider.value]);
  intradayData("AAPL", stringValues[slider.value]);
});

