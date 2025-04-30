"use strict";

// in deze code halen we de API key van alphavantage

const apiKey = "OUHQGMU8N0KTHTEB";

//TIME_SERIES_INTRADAY-API

export async function fetchIntradayData(symbol = "IBM", interval = "5min") {
  const TimeSeriesIntradayAPI = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${interval}&apikey=${apiKey}`;

  try {
    const response = await fetch(TimeSeriesIntradayAPI); //<-http request naar de API.
    if (!response.ok) {
      throw new Error(`http error: ${response.status}`);
    }

    const data = await response.json(); //< ruwe server response

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

    console.log(`volledige data voor ${symbol}:`, data); //*****
    return data;
  } catch (error) {
    console.error("Fout bij ophalen van data:", error);
  }
}
