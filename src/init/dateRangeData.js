import { StockRepository } from "../api/stockRepository";
// import { renderChart } from "../utils/renderChart";
import { transformDateRangeData } from "../utils/transformDateRangeData";
import { renderChartByType } from "../main/main.js";
import { populateIntradayTable } from "../utils/populateIntradayTable.js";

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
    let chartData = transformDateRangeData(rawData);
    populateIntradayTable(rawData);
    renderChartByType(chartData);
  } catch (error) {
    console.error("failed to load date range data:", error);
  }
}
