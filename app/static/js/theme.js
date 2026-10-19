(function () {
  var STORAGE_KEY = "affix-theme";
  var QUERY = "(prefers-color-scheme: dark)";

  function getStoredTheme() {
    try {
      var value = localStorage.getItem(STORAGE_KEY);
      return value === "dark" || value === "light" ? value : null;
    } catch (error) {
      return null;
    }
  }

  function getSystemTheme() {
    return window.matchMedia && window.matchMedia(QUERY).matches ? "dark" : "light";
  }

  function getActiveTheme() {
    return document.documentElement.getAttribute("data-theme") || getStoredTheme() || getSystemTheme();
  }

  function updateButtons(theme) {
    document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
      var nextTheme = theme === "dark" ? "light" : "dark";
      button.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
      button.setAttribute("aria-label", "Switch to " + nextTheme + " mode");
      button.setAttribute("title", "Switch to " + nextTheme + " mode");

      button.querySelectorAll("[data-theme-toggle-label]").forEach(function (label) {
        label.textContent = "Switch to " + nextTheme + " mode";
      });
    });
  }

  function applyTheme(theme, persist) {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.style.colorScheme = theme;

    if (persist) {
      try {
        localStorage.setItem(STORAGE_KEY, theme);
      } catch (error) {
        // Ignore storage errors and keep the active theme in memory only.
      }
    }

    updateButtons(theme);
  }

  function bindButtons() {
    document.querySelectorAll("[data-theme-toggle]").forEach(function (button) {
      button.addEventListener("click", function () {
        var nextTheme = getActiveTheme() === "dark" ? "light" : "dark";
        applyTheme(nextTheme, true);
      });
    });
  }

  function bindSystemTheme() {
    if (!window.matchMedia) {
      return;
    }

    var media = window.matchMedia(QUERY);
    media.addEventListener("change", function (event) {
      if (getStoredTheme()) {
        return;
      }

      applyTheme(event.matches ? "dark" : "light", false);
    });
  }

  function bootTheme() {
    applyTheme(getActiveTheme(), false);
    bindButtons();
    bindSystemTheme();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootTheme);
  } else {
    bootTheme();
  }
})();
