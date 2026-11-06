/* ============================================================
   红魔看台 · 共享脚本
   导航、菜单、回到顶部、入场动画、首页倒计时。
   所有功能都先检测元素是否存在，避免在没有该元素的页面报错。
   ============================================================ */

(function () {
  "use strict";

  /* ---------- 移动端汉堡菜单 ---------- */
  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("open");
      navToggle.classList.toggle("open", open);
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // 点击导航链接后自动收起菜单
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- 当前页导航高亮 ---------- */
  var current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(function (a) {
    if (a.getAttribute("href") === current) a.classList.add("active");
  });

  /* ---------- 页脚年份自动更新 ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- 回到顶部 ---------- */
  var toTop = document.querySelector(".to-top");
  if (toTop) {
    window.addEventListener("scroll", function () {
      toTop.classList.toggle("show", window.scrollY > 420);
    });
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- 入场动画（进入视口才显示）---------- */
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

  /* ---------- 首页比赛倒计时 ---------- */
  var countdownEl = document.getElementById("countdown");
  if (countdownEl && typeof RDS !== "undefined") {
    var target = new Date(RDS.nextMatch.date).getTime();

    function render() {
      var diff = target - Date.now();
      if (diff <= 0) {
        countdownEl.innerHTML = '<div class="unit"><span class="num">KO</span><span class="unit-label">比赛已开始</span></div>';
        return;
      }
      var days = Math.floor(diff / 86400000);
      var hours = Math.floor((diff % 86400000) / 3600000);
      var mins = Math.floor((diff % 3600000) / 60000);
      var secs = Math.floor((diff % 60000) / 1000);
      countdownEl.innerHTML =
        unit(days, "天") + unit(hours, "时") + unit(mins, "分") + unit(secs, "秒");
    }
    function unit(n, label) {
      return '<div class="unit"><span class="num">' + String(n).padStart(2, "0") +
        '</span><span class="unit-label">' + label + "</span></div>";
    }
    render();
    setInterval(render, 1000);
  }
})();
