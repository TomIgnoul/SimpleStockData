"use strict";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

// Utils
import { transformToChart } from "../utils/transformChartData";
import { renderLineChart } from "../utils/renderLineChart";
import { renderBarChart } from "../utils/renderBarChart";
import { renderChartByType } from "../utils/chartRenderer.js";
import {
  sortTableByVolume,
  sortTableByDate,
} from "../utils/sortTableByDate.js";

// UI Modules
import { initThemeToggle } from "../ui/themeToggle.js";
import { initChartTypeToggle } from "../ui/chartTypeToggle.js";
import { initSliderControls } from "../ui/sliderControls.js";
import {
  updateFavoriteButtonState,
  toggleFavorites,
  renderFavorites,
} from "../ui/favorites.js";

// Store
import {
  setSelectedChartType,
  getLastCandlestickData,
} from "../store/chartStore.js";

// Data fetching
import { intradayData } from "../init/intradayData";

// DOM Elements
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

const dateHeader = document.getElementById("dateHeader");
const volumeHeader = document.getElementById("volumeHeader");

// --- Search Button ---
searchButton.addEventListener("click", () => {
  const keyword = tickerInput.value.trim().toUpperCase();
  if (!keyword) return;
  const interval =
    ["1m", "5m", "15m", "30m", "60m"][parseInt(sliderInterval.value, 10)] ||
    "15m";
  intradayData(keyword, interval);
});

tickerInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    searchButton.click();
  }
});

// --- DOM  ---
document.addEventListener("DOMContentLoaded", () => {
  // Theme
  initThemeToggle();

  // Chart Type Toggle
  initChartTypeToggle(chartIcon, setSelectedChartType, () => {
    const latestData = getLastCandlestickData();
    if (latestData) renderChartByType(latestData);
  });

  // Favorites
  function fetchCurrentIntervalData() {
    const interval = intervals[parseInt(sliderInterval.value, 10)] || "15m";
    intradayData(tickerInput.value.trim().toUpperCase(), interval);
  }

  renderFavorites(
    favoritesList,
    tickerInput,
    fetchCurrentIntervalData,
    updateFavoriteButtonState
  );

  updateFavoriteButtonState(tickerInput, addFavoriteButton);
  toggleFavorites(tickerInput, addFavoriteButton, () => {
    renderFavorites(
      favoritesList,
      tickerInput,
      () => {
        const interval =
          ["1m", "5m", "15m", "30m", "60m"][
            parseInt(sliderInterval.value, 10)
          ] || "15m";
        intradayData(tickerInput.value.trim().toUpperCase(), interval);
      },
      updateFavoriteButtonState
    );
  });

  // Chart sliders
  initSliderControls({
    sliderInterval,
    sliderDateRanges,
    intervalLabel,
    dateRangeLabel,
    toggleIntervalBtn,
    toggleDateRangeBtn,
    intervalContainer,
    dateRangeContainer,
    tickerInput,
  });

  // Table sort
  if (dateHeader) dateHeader.addEventListener("click", sortTableByDate);
  if (volumeHeader) volumeHeader.addEventListener("click", sortTableByVolume);

  // Live update favorite star
  tickerInput.addEventListener("input", () => {
    updateFavoriteButtonState(tickerInput, addFavoriteButton);
  });
});
