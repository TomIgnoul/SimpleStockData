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
import {
  sortTableByVolume,
  sortTableByDate,
} from "../utils/sortTableByDate.js";
//==
import { initThemeToggle } from "../ui/themeToggle.js";
import {
  updateFavoriteButtonState,
  toggleFavorites,
  removeFromFavorites,
  renderFavorites,
} from "../ui/favorites.js";

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

const chartIcon = document.getElementById("chartIcon");

const sliderInterval = document.getElementById("sliderInterval");
const intervalLabel = document.getElementById("intervalLabel");
const sliderDateRanges = document.getElementById("sliderDateRanges");
const dateRangeLabel = document.getElementById("dateRangeLabel");

const toggleIntervalBtn = document.getElementById("toggleInterval");
const toggleDateRangeBtn = document.getElementById("toggleDateRange");

const intervalContainer = document.getElementById("intervalContainer");
const dateRangeContainer = document.getElementById("dateRangeContainer");

const tickerInput = document.getElementById("tickerTextBox");
const addFavoriteButton = document.getElementById("addFavoriteButton");
const favoritesList = document.getElementById("favoritesList");

const searchButton = document.getElementById("btntickerTextBox");

const intervaLlabel = document.getElementById("intervalLabel");

const dateHeader = document.getElementById("dateHeader");
const volumeHeader = document.getElementById("volumeHeader");

/* ========================
   dropdownSearchfield
======================== */

let selectedChartType = "line"; // default
let lastCandlestickData = null;

document.querySelectorAll("#chartDropdown .dropdown-item").forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();

    const chartType = item.getAttribute("data-value");
    const iconClass = item.getAttribute("data-icon");
    const labelText = item.textContent.trim();

    selectedChartType = chartType;
    chartIcon.className = `bi ${iconClass}`;

    if (lastCandlestickData) {
      renderChartByType(lastCandlestickData);
    }
  });
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

// ADD or REMOVE TO OR FROM FAVORITES

// updateFavoriteButtonState(tickerInput, addFavoriteButton);

// renderFavorites(
//   favoritesList,
//   tickerInput,
//   () => {
//     const interval = intervals[parseInt(sliderInterval.value, 10)] || "15m";
//     intradayData(tickerInput.value.trim().toUpperCase(), interval);
//   },
//   updateFavoriteButtonState
// );

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

export function renderChartByType(candlestickData, options = {}) {
  lastCandlestickData = candlestickData;

  const type = selectedChartType || "line";
  const chartData = transformToChart(candlestickData, "Close Price");

  if (type === "bar") {
    renderBarChart(chartData, options);
  } else {
    renderLineChart(chartData, options);
  }
}

/* ========================
   Mode Switch for Sliders
======================== */

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

// DEBOUNCED FUNCTIONS TO ADD DELAY TO SLIDER
const debounceIntradayData = debounce((ticker, interval) => {
  intradayData(ticker, interval);
});

const debounceDateRangeData = debounce((ticker, offset) => {
  dateRangeData(ticker, offset);
});

/* ========================
 Chart 
======================== */
const defaultInterval = intervals[parseInt(sliderInterval.value, 10)] || "15m";
intradayData("AAPL", defaultInterval);

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

//SLIDER CONTROL GROUP
function showIntervalBtn() {
  toggleIntervalBtn.classList.add("active");
  toggleDateRangeBtn.classList.remove("active");
}

function showDateRangeBtn() {
  toggleDateRangeBtn.classList.add("active");
  toggleIntervalBtn.classList.remove("active");
}

//INTERVAL LABELS

function showIntervalMode() {
  intervalLabel.classList.remove("d-none");
  dateRangeLabel.classList.add("d-none");
}

function showDateRangeMode() {
  intervalLabel.classList.add("d-none");
  dateRangeLabel.classList.remove("d-none");
}

toggleIntervalBtn.addEventListener("click", () => {
  showIntervalBtn();
  showIntervalMode();
});

toggleDateRangeBtn.addEventListener("click", () => {
  showDateRangeBtn();
  showDateRangeMode();
});

document.addEventListener("DOMContentLoaded", () => {
  // Sorting
  if (dateHeader) dateHeader.addEventListener("click", sortTableByDate);
  if (volumeHeader) volumeHeader.addEventListener("click", sortTableByVolume);

  initThemeToggle();

  // Keep favorite icon updated as user types
  tickerInput.addEventListener("input", () => {
    updateFavoriteButtonState(tickerInput, addFavoriteButton);
  });

  // Function to fetch intraday data for current slider value
  function fetchCurrentIntervalData() {
    const interval = intervals[parseInt(sliderInterval.value, 10)] || "15m";
    intradayData(tickerInput.value.trim().toUpperCase(), interval);
  }

  // Initial favorite button state + render
  updateFavoriteButtonState(tickerInput, addFavoriteButton);

  toggleFavorites(tickerInput, addFavoriteButton, () => {
    renderFavorites(
      favoritesList,
      tickerInput,
      fetchCurrentIntervalData,
      updateFavoriteButtonState
    );
  });
});
