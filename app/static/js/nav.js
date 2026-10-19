(function () {
  function bootNav() {
    var nav = document.querySelector(".main-nav");
    var toggle = document.querySelector("[data-nav-toggle]");

    if (!nav || !toggle) {
      return;
    }

    function closeNav() {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }

    function toggleNav() {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    }

    toggle.addEventListener("click", toggleNav);

    document.addEventListener("click", function (event) {
      if (window.innerWidth > 900) {
        return;
      }

      if (!nav.contains(event.target)) {
        closeNav();
      }
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 900) {
        closeNav();
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootNav);
  } else {
    bootNav();
  }
})();
