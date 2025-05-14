export function populateIntradayTable(data) {
  const tableBody = document.getElementById("dataTableBody");

  if (!Array.isArray(data) || data.length === 0) {
    tableBody.innerHTML = "<tr><td colspan='6'>No data available</td></tr>";
    return;
  }

  tableBody.innerHTML = data.reduce((html, item) => {
    return (
      html +
      `<tr>
        <td>${item.Datetime}</td>
        <td>${item.Open?.toFixed(2)}</td>
        <td>${item.High?.toFixed(2)}</td>
        <td>${item.Low?.toFixed(2)}</td>
        <td>${item.Close?.toFixed(2)}</td>
        <td>${item.Volume?.toLocaleString()}</td>
      </tr>`
    );
  }, "");
}
