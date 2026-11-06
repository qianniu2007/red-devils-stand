/* ============================================================
   Red Devils Stand · Shared script
   Navigation, menu, back-to-top, entrance animations and the
   home-page countdown.
   Every feature first checks that the element exists, so it does
   not throw on pages without that element.
   ============================================================ */

(function () {
  "use strict";

  /* ---------- Mobile hamburger menu ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("open");
      navToggle.classList.toggle("open", open);
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // Collapse the menu automatically after a nav link is clicked
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Highlight the current page in the nav ---------- */
  var current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(function (a) {
    if (a.getAttribute("href") === current) a.classList.add("active");
  });

  /* ---------- Auto-update the footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Back to top ---------- */
  var toTop = document.querySelector(".to-top");
  if (toTop) {
    window.addEventListener("scroll", function () {
      toTop.classList.toggle("show", window.scrollY > 420);
    });
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Entrance animations (shown on entering the viewport) ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Home-page match countdown ---------- */
  var countdownEl = document.getElementById("countdown");
  if (countdownEl && typeof RDS !== "undefined") {
    var target = new Date(RDS.nextMatch.date).getTime();

    function render() {
      var diff = target - Date.now();
      if (diff <= 0) {
        countdownEl.innerHTML = '<div class="unit"><span class="num">KO</span><span class="unit-label">Match started</span></div>';
        return;
      }
      var days = Math.floor(diff / 86400000);
      var hours = Math.floor((diff % 86400000) / 3600000);
      var mins = Math.floor((diff % 3600000) / 60000);
      var secs = Math.floor((diff % 60000) / 1000);
      countdownEl.innerHTML =
        unit(days, "Days") + unit(hours, "Hours") + unit(mins, "Mins") + unit(secs, "Secs");
    }
    function unit(n, label) {
      return '<div class="unit"><span class="num">' + String(n).padStart(2, "0") +
        '</span><span class="unit-label">' + label + "</span></div>";
    }
    render();
    setInterval(render, 1000);
  }
})();
