let dateSortDirection = "descending";

export function sortTableByDate() {
  const table = document.getElementById("table");
  let switching = true;
  let shouldSwitch, i;
  let rows = table.rows;

  while (switching) {
    switching = false;

    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;

      const x = rows[i].getElementsByTagName("TD")[0].innerText;
      const y = rows[i + 1].getElementsByTagName("TD")[0].innerText;

      const dateX = new Date(x);
      const dateY = new Date(y);

      if (dateSortDirection === "ascending") {
        if (dateX > dateY) {
          shouldSwitch = true;
          break;
        }
      } else {
        if (dateX < dateY) {
          shouldSwitch = true;
          break;
        }
      }
    }

    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    } else {
      // Toggle richting na eerste sortering
      if (!switching && dateSortDirection === "ascending") {
        dateSortDirection = "descending";
        switching = true;
      } else if (!switching && dateSortDirection === "descending") {
        dateSortDirection = "ascending";
        switching = true;
      }
    }
  }
}
