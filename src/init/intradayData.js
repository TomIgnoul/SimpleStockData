"use strict";

import { renderChart } from "../utils/renderChart.js";
import { StockRepository } from "../api/stockRepository.js";
import { validateParams } from "../utils/validateParams.js";
import { transformIntradayData } from "../utils/transformIntradayData.js";

export async function intradayData(ticker = "AAPL", interval = "30min") {
  try {
    validateParams(ticker, interval);

    //const intradayData = await fetchIntradayData(ticker, interval);
    const stockRepo = new StockRepository();
    const intradayData = await stockRepo.fetchIntradayData(ticker, interval);

    const rows = transformIntradayData(intradayData, interval);
    console.log(rows); //<<****
    renderChart(rows);
  } catch (error) {
    console.error("Initialisatie intraday data is mislukt:", error);
  }
}



