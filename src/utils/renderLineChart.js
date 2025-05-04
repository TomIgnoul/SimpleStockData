"use strict";

import { Chart } from "chart.js/auto";
import { getChartInstance, setChartInstance } from "./chartState.js";

export function renderLineChart(data) {
  const ctx = document.getElementById("chartCanvas").getContext("2d");

  const existingChart = getChartInstance();
  if (existingChart) {
    existingChart.destroy();
  }

  const newChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: data.labels,
      datasets: [
        {
          label: data.label || "Close Price",
          data: data.values,
          borderWidth: 2,
          borderColor: "#007bff",
          fill: false,
          tension: 0.2,
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

  setChartInstance(newChart);
}
