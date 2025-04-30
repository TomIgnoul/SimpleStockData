'use strict';

import { apiKey } from "./constants";

export class StockRepository {

  async fetchIntradayData(symbol = "IBM", interval = "5min") {
    const TimeSeriesIntradayAPI = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&apikey=${apiKey}`;
  
    try {
      const response = await fetch(TimeSeriesIntradayAPI);
      if (!response.ok) {
        throw new Error(`http error: ${response.status}`);
      }

      const data = await response.json();
      const key = `Time Series (${interval})`;

      if (!data[key]) {
        console.warn(`Geen geldige data gevonden voor ${symbol} met interval ${interval}.`);
        return { [key]: {} };
      }

      if (data["Error Message"] || data["Note"]) {
        throw new Error("API-fout: " + (data["Error Message"] || data["Note"]));
      }

      console.log(`volledige data voor ${symbol}:`, data);
      return data;
    } catch (error) {
      console.error("Fout bij ophalen van data:", error);
    }
  }

  async searchSymbol(keyword) {
    const url = `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${encodeURIComponent(keyword)}&apikey=${apiKey}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
  
      const data = await response.json(); // <- awaited!
      console.log(data);
      return data.bestMatches;
    } catch (error) {
      console.error("fout bij API-request:", error);
      return [];
    }
  }

}
