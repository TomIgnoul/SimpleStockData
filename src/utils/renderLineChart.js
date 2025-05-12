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
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: {
            autoSkip: true,
            maxRotation: 0,
            minRotation: 0,
            callback: function (value) {
              const label = this.getLabelForValue(value);
              const date = new Date(label);
              return date.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });
            },
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
