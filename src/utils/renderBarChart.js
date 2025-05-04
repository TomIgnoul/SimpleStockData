"use strict";
import { Chart } from "chart.js/auto";
import { getChartInstance, setChartInstance } from "../utils/chartState.js";
let barchartInstance = null;

export function renderBarChart(data) {
  const ctx = document.getElementById("chartCanvas").getContext("2d");

  const existingChart = getChartInstance();
  if (existingChart) {
    existingChart.destroy();
  }

  barchartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: data.labels,
      datasets: [
        {
          label: data.label || "Price",
          data: data.values,
          backgroundColor: "rgba(0, 123, 255, 0.6)",
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          ticks: {
            maxRotation: 20,
            minRotation: 20,
          },
        },
        y: {
          beginAtZero: false,
        },
      },
    },
  });

  setChartInstance(barchartInstance);
  console.log(barchartInstance);
}
