"use strict";

import { apiKey } from "./constants";

export class StockRepository {
  constructor() {
    this.apiKey = apiKey;
    this.baseUrl = "http//localhost:8080";
  }

  async fetchIntradayData(symbol = "AAPL", interval = "30m") {
    const url = `http://localhost:8080/stock/${symbol}?interval=${interval}`;

    try {
      const response = await fetch(url);

      const rawText = await response.text(); // get raw response first
      console.log("RAW response text:", rawText); // log it

      // try to parse JSON manually
      const data = JSON.parse(rawText);

      return data.data; // this should be the array
    } catch (error) {
      console.error("Failed to fetch intraday data:", error);
      return [];
    }
  }
}
