"use strict";

import { StockRepository } from "../api/stockRepository";
import { validateParams } from "../utils/validateParams.js";
import { transformIntradayData } from "../utils/transformIntradayData.js";
// import { renderChart } from "../utils/renderChart.js";
import { renderChartByType } from "../main/main.js";
import { populateIntradayTable } from "../utils/populateIntradayTable.js";

export async function intradayData(ticker = "AAPL", interval = "15m") {
  try {
    validateParams(ticker, interval);

    //fetch rawdata from API
    const stockRepo = new StockRepository();
    const rawData = await stockRepo.fetchIntradayData(ticker, interval);

    //transform rawdata to readible data for renderchart
    let chartData = transformIntradayData(rawData);
    populateIntradayTable(rawData);
    renderChartByType(chartData);
  } catch (error) {
    console.error("failed to load intraday data:", error);
  }
}
