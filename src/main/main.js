"use strict";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import { Chart } from "chart.js";
import { renderLineChart } from "../utils/renderLineChart";
import { renderBarChart } from "../utils/renderBarChart";
import { intradayData } from "../init/intradayData";
import { dateRangeData } from "../init/dateRangeData";
import { debounce } from "../utils/debounce";
import { transformToChart } from "../utils/transformChartData";
import "bootstrap-icons/font/bootstrap-icons.css";

// INTERVAL + RANGE OPTIONS
const intervals = ["1m", "5m", "15m", "30m", "60m"];
const dateRanges = {
  0: { label: "7d", offset: 7 },
  1: { label: "1m", offset: 30 },
  2: { label: "3m", offset: 90 },
  3: { label: "6m", offset: 180 },
  4: { label: "1y", offset: 365 },
};

// ELEMENTS
const chartTypeSelector = document.getElementById("ChartTypeSelector");

const sliderInterval = document.getElementById("sliderInterval");
const intervalLabel = document.getElementById("intervalLabel");
const sliderDateRanges = document.getElementById("sliderDateRanges");
const dateRangeLabel = document.getElementById("dateRangeLabel");

const toggleIntervalBtn = document.getElementById("toggleInterval");
const toggleDateRangeBtn = document.getElementById("toggleDateRange");

const intervalContainer = document.getElementById("intervalContainer");
const dateRangeContainer = document.getElementById("dateRangeContainer");

const tickerInput = document.getElementById("tickerTextBox");
const searchButton = document.getElementById("btntickerTextBox");
const addFavoriteButton = document.getElementById("addFavoriteButton");

//CHART SELECT
let lastCandlestickData = null;

export function renderChartByType(candlestickData, options = {}) {
  lastCandlestickData = candlestickData;

  const type = chartTypeSelector.value || "line";
  const chartData = transformToChart(candlestickData, "Close Price");

  if (type === "bar") {
    renderBarChart(chartData, options);
  } else {
    renderLineChart(chartData, options);
  }
}

chartTypeSelector.addEventListener("change", () => {
  if (lastCandlestickData) {
    renderChartByType(lastCandlestickData);
  }
});

//CHART LOADERS BASED ON SLIDER STATES:

function loadIntradayFromSlider() {
  const ticker = tickerInput.value.trim().toUpperCase() || "AAPL";
  const interval = intervals[parseInt(sliderInterval.value, 10)] || "15m";
  intradayData(ticker, interval);
}

function loadDateRangeFromSlider() {
  const ticker = tickerInput.value.trim().toUpperCase() || "AAPL";
  const selected = parseInt(sliderDateRanges.value, 10);
  const offsetDays = dateRanges[selected]?.offset || 30;
  dateRangeData(ticker, offsetDays);
}

// DEBOUNCED FUNCTIONS
const debounceIntradayData = debounce((ticker, interval) => {
  intradayData(ticker, interval);
});

const debounceDateRangeData = debounce((ticker, offset) => {
  dateRangeData(ticker, offset);
});

// INITIAL CHART
const defaultInterval = intervals[parseInt(sliderInterval.value, 10)] || "15m";
intradayData("AAPL", defaultInterval);

// TOGGLE BEHAVIOR
dateRangeContainer.style.display = "none";

toggleIntervalBtn.addEventListener("click", () => {
  intervalContainer.style.display = "block";
  dateRangeContainer.style.display = "none";

  loadIntradayFromSlider();
});

toggleDateRangeBtn.addEventListener("click", () => {
  intervalContainer.style.display = "none";
  dateRangeContainer.style.display = "block";

  loadDateRangeFromSlider();
});

// SLIDER INTERVAL
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

// SLIDER DATE RANGE
sliderDateRanges.addEventListener("input", () => {
  const ticker = tickerInput.value.trim().toUpperCase() || "AAPL";
  const selected = parseInt(sliderDateRanges.value, 10);
  const offsetDays = dateRanges[selected]?.offset || 30;

  dateRangeLabel.textContent = dateRanges[selected].label || "1m";
  debounceDateRangeData(ticker, offsetDays);
});

// SEARCH BUTTON
searchButton.addEventListener("click", () => {
  const keyword = tickerInput.value.trim();
  if (!keyword) {
    console.warn("No ticker entered.");
    return;
  }
  const interval = intervals[parseInt(sliderInterval.value, 10)] || "15m";
  intradayData(keyword, interval);
});

// ADD TO FAVORITES

function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites") || "[]");
}

function updateFavoriteButtonState() {
  const ticker = tickerInput.value.trim().toUpperCase();
  const favorites = getFavorites();
  const icon = addFavoriteButton.querySelector("i");

  if (favorites.includes(ticker)) {
    icon.className = "bi bi-star-fill";
    addFavoriteButton.setAttribute("data-mode", "remove");
  } else {
    icon.className = "bi bi-star";
    addFavoriteButton.setAttribute("data-mode", "add");
  }
}

addFavoriteButton.addEventListener("click", () => {
  requestAnimationFrame(() => {
    const ticker = tickerInput.value.trim().toUpperCase();
    if (!ticker) return;

    const mode = addFavoriteButton.getAttribute("data-mode");

    if (mode === "remove") {
      removeFromFavorites(ticker);
    } else {
      const favorites = getFavorites();
      if (!favorites.includes(ticker)) {
        favorites.push(ticker);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        console.log(`Added ${ticker}`);
        renderFavorites();
      }
    }

    updateFavoriteButtonState();
  });
});

function removeFromFavorites(ticker) {
  const favorites = getFavorites();
  const updated = favorites.filter((item) => item !== ticker);
  localStorage.setItem("favorites", JSON.stringify(updated));
  updateFavoriteButtonState();
  renderFavorites();
}

function renderFavorites() {
  const favorites = getFavorites();
  const list = document.getElementById("favoritesList");
  list.innerHTML = "";

  favorites.forEach((ticker) => {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";

    const span = document.createElement("span");
    span.textContent = ticker;
    span.style.cursor = "pointer";
    span.addEventListener("click", () => {
      const interval = intervals[parseInt(sliderInterval.value, 10)] || "15m";
      intradayData(ticker, interval);
      tickerInput.value = ticker;
      updateFavoriteButtonState();
    });

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.className = "btn btn-sm btn-outline-danger";
    removeBtn.addEventListener("click", () => {
      removeFromFavorites(ticker);
    });

    li.appendChild(span);
    li.appendChild(removeBtn);
    list.appendChild(li);
  });
}

// Trigger state update when typing in input
tickerInput.addEventListener("input", () => {
  updateFavoriteButtonState();
});

// Initial render
renderFavorites();
updateFavoriteButtonState();
