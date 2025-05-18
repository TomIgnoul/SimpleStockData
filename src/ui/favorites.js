export function getFavorites() {
  return JSON.parse(localStorage.getItem("favorites") || "[]");
}

export function updateFavoriteButtonState(inputEl, buttonEl) {
  const ticker = inputEl.value.trim().toUpperCase();
  const favorites = getFavorites();
  const icon = buttonEl.querySelector("i");

  if (favorites.includes(ticker)) {
    icon.className = "bi bi-star-fill";
    buttonEl.setAttribute("data-mode", "remove");
  } else {
    icon.className = "bi bi-star";
    buttonEl.setAttribute("data-mode", "add");
  }
}

export function toggleFavorites(inputEl, buttonEl, renderFavoritesFn) {
  buttonEl.addEventListener("click", () => {
    requestAnimationFrame(() => {
      const ticker = inputEl.value.trim().toUpperCase();
      if (!ticker) return;

      const mode = buttonEl.getAttribute("data-mode");

      const favorites = getFavorites();
      if (mode === "remove") {
        const updated = favorites.filter((item) => item !== ticker);
        localStorage.setItem("favorites", JSON.stringify(updated));
      } else if (!favorites.includes(ticker)) {
        favorites.push(ticker);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        console.log(`Added ${ticker}`);
      }

      updateFavoriteButtonState(inputEl, buttonEl);
      renderFavoritesFn();
    });
  });
}

export function removeFromFavorites(
  ticker,
  inputEl,
  buttonEl,
  renderFavoritesFn
) {
  const favorites = getFavorites();
  const updated = favorites.filter((item) => item !== ticker);
  localStorage.setItem("favorites", JSON.stringify(updated));

  updateFavoriteButtonState(inputEl, buttonEl);
  renderFavoritesFn();
}

export function renderFavorites(
  favoritesListEl,
  inputEl,
  intervalFn,
  updateBtnStateFn
) {
  if (!favoritesListEl) {
    console.warn("favlistel is null or undefined");
    return;
  }
  console.log("favoritesListEl:", favoritesListEl);
  const favorites = getFavorites();
  favoritesListEl.innerHTML = "";

  favorites.forEach((ticker) => {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";

    const span = document.createElement("span");
    span.textContent = ticker;
    span.style.cursor = "pointer";
    span.addEventListener("click", () => {
      inputEl.value = ticker;
      intervalFn();
      updateBtnStateFn(inputEl, document.getElementById("addFavoriteButton"));
    });

    li.appendChild(span);
    favoritesListEl.appendChild(li);
  });
}
