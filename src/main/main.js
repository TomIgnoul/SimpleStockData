"use strict";

import { Chart } from "chart.js";
import { renderChart } from "../utils/renderChart";
import { intradayData } from "../init/intradayData";
import { dateRangeData } from "../init/dateRangeData";
import { debounce } from "../utils/debounce";

const intervals = ["1m", "5m", "15m", "30m", "60m"];
const dateRanges = {
  0: { label: "7d", offset: 7 },
  1: { label: "1m", offset: 30 },
  2: { label: "3m", offset: 90 },
  3: { label: "6m", offset: 180 },
  4: { label: "1y", offset: 365 },
};

const sliderInterval = document.getElementById("sliderInterval");
const intervalLabel = document.getElementById("intervalLabel");
const debounceIntradayData = debounce((ticker, interval) => {
  intradayData(ticker, interval);
});

const sliderDateRanges = document.getElementById("sliderDateRanges");
const dateRangeLabel = document.getElementById("dateRangeLabel");
const debounceDateRangeData = debounce((ticker, interval) => {
  dateRangeData(ticker, interval);
});

const tickerInput = document.getElementById("tickerTextBox");
const searchButton = document.getElementById("btntickerTextBox");
const addFavoriteButton = document.getElementById("addFavoriteButton");

const defaultInterval = intervals[parseInt(sliderInterval.value, 10)] || "15m";

//initial chart load
intradayData("AAPL", defaultInterval);

//sliderInterval
sliderInterval.addEventListener("input", () => {
  const ticker = tickerInput.value || "AAPL";
  const interval = intervals[parseInt(sliderInterval.value, 10)];

  if (!interval) {
    console.warn("Invalid interval selected.");
    return;
  }

  intervalLabel.textContent = interval;

  debounceIntradayData(ticker, interval);
});

//sliderDateRanges
sliderDateRanges.addEventListener("input", () => {
  const ticker = tickerInput.value.trim().toUpperCase() || "AAPL";
  const selected = parseInt(sliderDateRanges.value, 10);
  const offsetDays = dateRanges[selected]?.offset || 30;

  dateRangeLabel.textContent = dateRanges[selected].label || "1m";

  debounceDateRangeData(ticker, offsetDays);
});

// searchbutton
searchButton.addEventListener("click", () => {
  const keyword = tickerInput.value.trim();

  if (!keyword) {
    console.warn("No ticker entered.");
    return;
  }

  const interval = intervals[parseInt(sliderInterval.value, 10)] || "15m";
  intradayData(keyword, interval);
});

//add to favorites

addFavoriteButton.addEventListener("click", () => {
  requestAnimationFrame(() => {
    const ticker = tickerInput.value.trim().toUpperCase();
    if (!ticker) return;

    const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    if (!favorites.includes(ticker)) {
      favorites.push(ticker);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      console.log(`Added ${ticker}`);
      renderFavorites();
    } else {
      console.log(`${ticker} is already a favorite`);
    }
  });
});

//make a list based on favorites:

function renderFavorites() {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  const list = document.getElementById("favoritesList");
  list.innerHTML = "";

  favorites.forEach((ticker) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = ticker;
    span.style.cursor = "pointer";
    span.style.marginRight = "10px";
    span.addEventListener("click", () => {
      const interval = intervals[parseInt(sliderInterval.value, 10)] || "15m";
      intradayData(ticker, interval);
      tickerInput.Value = ticker;
    });

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
      removeFromFavorites(ticker);
    });

    li.appendChild(span);
    li.appendChild(removeBtn);
    list.appendChild(li);
  });
}

renderFavorites();

function removeFromFavorites(ticker) {
  const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
  const updated = favorites.filter((item) => item !== ticker);
  localStorage.setItem("favorites", JSON.stringify(updated));
  renderFavorites();
}
