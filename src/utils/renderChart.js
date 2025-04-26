import { Chart } from "chart.js";

let myChart;

export function renderChart(data) {
  const labels = data.map((d) => d.time);
  const prices = data.map((d) => d.close);

  const ctx = document.getElementById("myChart");

  if (myChart) {
    myChart.destroy(); // oude grafiek verwijderen
  }

  myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Closing Prices",
          data: prices,
          borderColor: "blue",
          backgroundColor: "lightblue",
          tension: 0.3,
        },
      ],
    },
    options: {
      responsive: false,
      plugins: {
        legend: { display: true },
      },
    },
  });
}
