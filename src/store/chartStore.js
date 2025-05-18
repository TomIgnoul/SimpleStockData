let selectedChartType = "line";
let lastCandlestickData = null;

export function setSelectedChartType(type) {
  selectedChartType = type;
}

export function getSelectedChartType() {
  return selectedChartType;
}

export function setLastCandlestickData(data) {
  lastCandlestickData = data;
}

export function getLastCandlestickData() {
  return lastCandlestickData;
}
