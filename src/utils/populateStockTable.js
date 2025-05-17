export function populateStockTable(data) {
  const tableBody = document.getElementById("dataTableBody");

  if (!Array.isArray(data) || data.length === 0) {
    tableBody.innerHTML = "<tr><td colspan='6'>No data available</td></tr>";
    return;
  }

  tableBody.innerHTML = data.reduce((html, item) => {
    return (
      html +
      `<tr>
        <td>${formatDateForDisplay(item.Datetime || item.Date)}</td>
        <td>${item.Open?.toFixed(2)}</td>
        <td>${item.High?.toFixed(2)}</td>
        <td>${item.Low?.toFixed(2)}</td>
        <td>${item.Close?.toFixed(2)}</td>
        <td>${item.Volume?.toLocaleString()}</td>
      </tr>`
    );
  }, "");
}

export function formatDateForDisplay(dateString) {
  // console.log("Raw date Data:", dateString);

  if (!dateString) return "–";

  const parsed = new Date(dateString);

  console.log("Parsed:", parsed);

  if (isNaN(parsed)) return "Invalid date";

  return parsed.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
