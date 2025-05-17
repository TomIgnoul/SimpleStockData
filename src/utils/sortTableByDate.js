import { populateStockTable } from "../utils/populateStockTable.js";

let currentData = [];
let sortAscending = false;

// Sort by Date
export function sortTableByDate() {
  const sorted = [...currentData].sort((a, b) => {
    const dateA = new Date(a.Datetime || a.Date);
    const dateB = new Date(b.Datetime || b.Date);
    return sortAscending ? dateA - dateB : dateB - dateA;
  });

  sortAscending = !sortAscending; // wissel richting
  populateStockTable(sorted);
}

export function setDataForSorting(data) {
  currentData = data;
}

// Sort by Volume
export function sortTableByVolume() {
  const sorted = [...currentData].sort((a, b) => {
    const volumeA = a.Volume || 0;
    const volumeB = b.Volume || 0;
    return sortAscending ? volumeA - volumeB : volumeB - volumeA;
  });

  sortAscending = !sortAscending; // wissel richting
  populateStockTable(sorted);
}
