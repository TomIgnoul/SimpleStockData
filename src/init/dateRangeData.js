import { StockRepository } from "../api/stockRepository";
import { transformDateRangeData } from "../utils/transformDateRangeData";
import { renderChartByType } from "../utils/chartRenderer.js";
import { populateStockTable } from "../utils/populateStockTable.js";
import { setDataForSorting } from "../utils/sortTableByDate.js";

export async function dateRangeData(ticker, offsetDays) {
  try {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - offsetDays);

    const formatDate = (date) => date.toISOString().split("T")[0];

    const startDate = formatDate(start);
    const endDate = formatDate(end);

    const stockRepo = new StockRepository();
    const rawData = await stockRepo.fetchDateRangeData(
      ticker,
      startDate,
      endDate
    );

    const chartData = transformDateRangeData(rawData);
    populateStockTable(rawData);
    setDataForSorting(rawData);
    renderChartByType(chartData);
  } catch (error) {
    console.error("failed to load date range data:", error);
  }
}
