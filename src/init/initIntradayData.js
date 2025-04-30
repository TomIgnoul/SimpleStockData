"use strict";
import { fetchIntradayData } from "../api/intradayAPI.js";
import { renderChart } from "../utils/renderChart.js";
import { transformIntradayData } from "../utils/transformIntradayData.js";
import { validateParams } from "../utils/validateParams.js";

async function initIntradayData(ticker = "AAPL", interval = "30min") {
  try {
    validateParams(ticker, interval);

    const intradayData = await fetchIntradayData(ticker, interval);
    const rows = transformIntradayData(intradayData, interval);
    console.log(rows); //<<****
    renderChart(rows);
  } catch (error) {
    console.error("Initialisatie intraday data is mislukt:", error);
  }
}
