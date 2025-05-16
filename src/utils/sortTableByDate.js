import { populateIntradayTable } from "../utils/populateIntradayTable.js";

let currentData = [];
let sortAscending = false;

export function sortTableByDate() {
  const sorted = [...currentData].sort((a, b) => {
    const dateA = new Date(a.Datetime || a.Date);
    const dateB = new Date(b.Datetime || b.Date);
    return sortAscending ? dateA - dateB : dateB - dateA;
  });

  sortAscending = !sortAscending; // wissel richting
  populateIntradayTable(sorted);
}

export function setDataForSorting(data) {
  currentData = data;
}
