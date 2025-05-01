"use strict";

import { Chart } from "chart.js/auto";
import { renderChart } from "../utils/renderChart.js";
import { initIntradayData } from "../init/initIntradayData.js";
import { searchSymbol } from "../api/searchSymbolAPI.js";

initIntradayData();

searchSymbol("tesla").then((resultaten) => {
  console.log(resultaten);
});
