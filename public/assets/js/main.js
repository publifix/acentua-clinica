(function () {
  "use strict";

  var header = document.querySelector(".site-header");
  var navToggle = document.querySelector(".nav-toggle");
  var navClose = document.querySelector(".nav-close");
  var navMobile = document.querySelector(".nav-mobile");
  var body = document.body;

  function setScrolled() {
    if (!header) return;
    var scrolled = window.scrollY > 24;
    header.classList.toggle("is-scrolled", scrolled);
  }
  setScrolled();
  window.addEventListener("scroll", setScrolled, { passive: true });

  function closeNav() {
    body.classList.remove("nav-open");
    if (navToggle) navToggle.setAttribute("aria-expanded", "false");
  }

  function openNav() {
    body.classList.add("nav-open");
    if (navToggle) navToggle.setAttribute("aria-expanded", "true");
  }

  if (navToggle && navMobile) {
    navToggle.addEventListener("click", openNav);
    if (navClose) navClose.addEventListener("click", closeNav);
    navMobile.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  var tabs = document.querySelectorAll(".service-tab");
  var cards = document.querySelectorAll(".service-card");

  function applyFilter(category) {
    cards.forEach(function (card) {
      var match = category === "todos" || card.getAttribute("data-category") === category;
      card.hidden = !match;
    });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      tabs.forEach(function (t) { t.setAttribute("aria-selected", "false"); });
      tab.setAttribute("aria-selected", "true");
      applyFilter(tab.getAttribute("data-category"));
    });
  });

  var yearEl = document.getElementById("current-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
