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
      console.log("response json", result);

      //json.data -> the actual array of rows for my chart
      return result.data;
    } catch (error) {
      console.error("fetchIntradayData failed:", error);
      return [];
    }
  }

  async fetchDateRangeData(ticker, start, end) {
    try {
      const url = `${this.baseUrl}/stock/date-range/${ticker}?start=${start}&end=${end}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`http errror: ${response.status}`);
      }

      const result = await response.json();
      console.log("response json", result);
      return result.data;
    } catch (error) {
      console.error("fetchDateRangeDate failed:", error);
      return [];
    }
  }
}
