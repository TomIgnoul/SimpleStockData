// ui/sliderControls.js

import { intradayData } from "../init/intradayData";
import { dateRangeData } from "../init/dateRangeData";
import { debounce } from "../utils/debounce";

export const intervals = ["1m", "5m", "15m", "30m", "60m"];

export function initSliderControls({
  sliderInterval,
  sliderDateRanges,
  intervalLabel,
  dateRangeLabel,
  toggleIntervalBtn,
  toggleDateRangeBtn,
  intervalContainer,
  dateRangeContainer,
  tickerInput,
  stockTableEl,
}) {
  const intervals = ["1m", "5m", "15m", "30m", "60m"];
  const dateRanges = {
    0: { label: "7d", offset: 7 },
    1: { label: "1m", offset: 30 },
    2: { label: "3m", offset: 90 },
    3: { label: "6m", offset: 180 },
    4: { label: "1y", offset: 365 },
  };

  const debounceIntradayData = debounce((ticker, interval) => {
    intradayData(ticker, interval);
  });

  const debounceDateRangeData = debounce((ticker, offset) => {
    dateRangeData(ticker, offset);
  });

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

  function showIntervalBtn() {
    toggleIntervalBtn.classList.add("active");
    toggleDateRangeBtn.classList.remove("active");
  }

  function showDateRangeBtn() {
    toggleDateRangeBtn.classList.add("active");
    toggleIntervalBtn.classList.remove("active");
  }

  function showIntervalMode() {
    intervalLabel.classList.remove("d-none");
    dateRangeLabel.classList.add("d-none");
  }

  function showDateRangeMode() {
    intervalLabel.classList.add("d-none");
    dateRangeLabel.classList.remove("d-none");
  }

  // Initial chart fetch
  const defaultInterval =
    intervals[parseInt(sliderInterval.value, 10)] || "15m";
  intradayData("AAPL", defaultInterval);

  // Event listeners
  sliderInterval.addEventListener("input", () => {
    const ticker = tickerInput.value || "AAPL";
    const interval = intervals[parseInt(sliderInterval.value, 10)];
    if (!interval) return;
    intervalLabel.textContent = interval;
    debounceIntradayData(ticker, interval);
  });

  sliderDateRanges.addEventListener("input", () => {
    const ticker = tickerInput.value.trim().toUpperCase() || "AAPL";
    const selected = parseInt(sliderDateRanges.value, 10);
    const offsetDays = dateRanges[selected]?.offset || 30;
    dateRangeLabel.textContent = dateRanges[selected].label || "1m";
    debounceDateRangeData(ticker, offsetDays);
  });

  toggleIntervalBtn.addEventListener("click", () => {
    intervalContainer.style.display = "block";
    dateRangeContainer.style.display = "none";
    showIntervalBtn();
    showIntervalMode();
    loadIntradayFromSlider();
  });

  toggleDateRangeBtn.addEventListener("click", () => {
    intervalContainer.style.display = "none";
    dateRangeContainer.style.display = "block";
    showDateRangeBtn();
    showDateRangeMode();
    loadDateRangeFromSlider();
  });
  intervalContainer.style.display = "block";
  dateRangeContainer.style.display = "none";

  if (stockTableEl) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          stockTableEl.classList.add("fade-in-visible");
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(stockTableEl);
  }
  showIntervalBtn();
  showIntervalMode();
}
