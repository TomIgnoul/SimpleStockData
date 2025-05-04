"use strict";

import { Chart } from "chart.js/auto";

let chartInstance = null;

export function renderChart(data) {
  const labels = data.map((point) => point.time);
  const values = data.map((point) => point.close);

  const ctx = document.getElementById("chartCanvas").getContext("2d");

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Close Price",
          data: values,
          borderWidth: 2,
          fill: false,
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
}
