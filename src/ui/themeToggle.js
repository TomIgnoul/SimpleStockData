// === Theme toggle ===

export function initThemeToggle() {
  const toggleBtn = document.getElementById("themeToggle");
  if (toggleBtn) {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-bs-theme", savedTheme);
    toggleBtn.innerHTML =
      savedTheme === "dark"
        ? '<i class="bi bi-sun"></i>'
        : '<i class="bi bi-moon"></i>';

    toggleBtn.addEventListener("click", () => {
      const currentTheme =
        document.documentElement.getAttribute("data-bs-theme");
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-bs-theme", newTheme);
      localStorage.setItem("theme", newTheme);
      toggleBtn.innerHTML =
        newTheme === "dark"
          ? '<i class="bi bi-sun"></i>'
          : '<i class="bi bi-moon"></i>';
    });
  }
}
