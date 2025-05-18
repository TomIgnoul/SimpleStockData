export function initChartTypeToggle(
  chartIcon,
  setSelectedChartType,
  renderChartByType
) {
  document.querySelectorAll("#chartDropdown .dropdown-item").forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();

      const chartType = item.getAttribute("data-value");
      const iconClass = item.getAttribute("data-icon");

      setSelectedChartType(chartType);

      chartIcon.className = `bi ${iconClass}`;

      renderChartByType();
    });
  });
}
