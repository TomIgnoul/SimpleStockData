"use strict";

import { Chart } from "chart.js";
import { renderChart } from "../utils/renderChart";
import { intradayData } from "../init/intradayData";

const intervals = ["1m", "5m", "15m", "30m", "60m"];

const slider = document.getElementById("slider");
const tickerInput = document.getElementById("tickerTextBox");
const searchButton = document.getElementById("btntickerTextBox");
const addFavoriteButton = document.getElementById("addFavoriteButton");

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
      const interval = intervals[parseInt(slider.value, 10)] || "15m";
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
