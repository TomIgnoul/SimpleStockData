"use strict";

import { Chart } from "chart.js/auto";
import { renderChart } from "../utils/renderChart.js";
import { intradayData } from "../init/intradayData.js";
import { searchSymbol } from "../api/searchSymbolAPI.js";

const intervals = ["1min", "5min", "15min", "30min", "60min"];
const slider = document.getElementById("slider");
const tickerInput = document.getElementById("tickerTextBox");
const searchButton = document.getElementById("btntickerTextBox");

// Initial chart load
intradayData("AAPL", intervals[slider.value]);

// Update chart on slider change
slider.addEventListener("input", () => {
  const ticker = tickerInput.value || "AAPL";
  console.log(`Interval changed: ${intervals[slider.value]}`);
  intradayData(ticker, intervals[slider.value]);
});

// Search button click
searchButton.addEventListener("click", () => {
  const keyword = tickerInput.value.trim();

  if (!keyword) {
    console.warn("No ticker entered.");
    return;
  }

  console.log(`Searching for: ${keyword}`);
  searchSymbol(keyword).then((results) => {
    console.log(results);
  });
});
