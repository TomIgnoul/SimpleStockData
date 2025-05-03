"use strict";

import { Chart } from "chart.js";
import { renderChart } from "../utils/renderChart";
import { intradayData } from "../init/intradayData";

const intervals = ["1m", "5m", "15m", "30m", "60m"];

const slider = document.getElementById("slider");
const tickerInput = document.getElementById("tickerTextBox");
const searchButton = document.getElementById("btntickerTextBox");

const defaultInterval = intervals[parseInt(slider.value, 10)] || "15m";

//initial chart load
intradayData("AAPL", defaultInterval);

//slider
slider.addEventListener("input", () => {
  const ticker = tickerInput.value || "AAPL";
  const interval = intervals[parseInt(slider.value, 10)];

  if (!interval) {
    console.warn("Invalid interval selected.");
    return;
  }

  console.log(`Interval changed: ${interval}`);
  intradayData(ticker, interval);
});

// searchbutton
searchButton.addEventListener("click", () => {
  const keyword = tickerInput.value.trim();

  if (!keyword) {
    console.warn("No ticker entered.");
    return;
  }

  const interval = intervals[parseInt(slider.value, 10)] || "15m";
  intradayData(keyword, interval);
});
