"use strict";

export class StockRepository {
  constructor() {
    this.baseUrl = "http://localhost:8080";
  }

  async fetchIntradayData(symbol = "AAPL", interval = "30min") {
    try {
      const url = `${this.baseUrl}/stock/${symbol}?interval=${interval}`;
      //fetch url with errorhandling
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`http errror: ${response.status}`);
      }

      //reading JSON body
      const result = await response.json();
      console.log("response json", json);

      //json.data -> the actual array of rows for my chart
      return result.data;
    } catch (error) {
      console.error("fetIntradayData failed:", error);
      return [];
    }
  }
}
