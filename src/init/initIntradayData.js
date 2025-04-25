"use strict";
import { fetchIntradayData } from "../api/intradayAPI.js";
import { transformIntradayData } from "../utils/transformIntradayData.js";

async function initIntradayData(ticker = "AAPL", interval = "30min") {
  const intradayData = await fetchIntradayData(ticker, interval);
  const rows = transformIntradayData(intradayData, interval);
  console.log(rows);
}

initIntradayData();
