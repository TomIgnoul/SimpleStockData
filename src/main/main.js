"use strict";

import { fetchIntradayData } from "../api/intradayAPI.js";
import { Chart } from "chart.js/auto";
import { renderChart } from "../utils/renderChart.js";
import { initIntradayData } from "../init/initIntradayData.js";

initIntradayData();
