"use strict";

// in deze code halen we de API key van alphavantage

const apiKey = "OUHQGMU8N0KTHTEB";
const symbol = "IBM";
const TimeSeriesIntradayAPI = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`;

//TIME_SERIES_INTRADAY-API

export async function fetchIntradayData(symbol = "IBM", interval = "5min") {
  const TimeSeriesIntradayAPI = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&apikey=${apiKey}`;

  try {
    const response = await fetch(TimeSeriesIntradayAPI);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const key = `Time Series (${interval})`;
    if (!data[key]) {
      console.warn(
        `Geen geldige data gevonden voor ${symbol} met interval ${interval}.`
      );
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
