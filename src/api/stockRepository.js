"use strict";

import { apiKey } from "./constants";

export class StockRepository {
  constructor() {
    this.apiKey = apiKey;
    this.baseUrl = "https://www.alphavantage.co/query";
  }

  async fetchIntradayData(symbol = "IBM", interval = "5min") {
    const url = `${this.baseUrl}?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&apikey=${this.apiKey}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

      const data = await response.json();
      const key = `Time Series (${interval})`;

      if (data["Error Message"] || data["Note"]) {
        throw new Error(data["Error Message"] || data["Note"]);
      }

      if (!data[key]) {
        console.warn(`No data found for ${symbol} with interval ${interval}.`);
        return { [key]: {} };
      }

      console.log(`Full intraday data for ${symbol}:`, data);
      return data;
    } catch (error) {
      console.error("Failed to fetch intraday data:", error.message);
      return null;
    }
  }

  async searchSymbol(keyword) {
    const url = `${
      this.baseUrl
    }?function=SYMBOL_SEARCH&keywords=${encodeURIComponent(keyword)}&apikey=${
      this.apiKey
    }`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

      const data = await response.json();
      if (data["Error Message"] || data["Note"]) {
        throw new Error(data["Error Message"] || data["Note"]);
      }

      return data.bestMatches || [];
    } catch (error) {
      console.error("Symbol search failed:", error.message);
      return [];
    }
  }
}
