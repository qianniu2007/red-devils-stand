/* ============================================================
   红魔看台 · 队史页脚本
   渲染荣誉墙、百年时间线与传奇球员，数据全部来自 RDS。
   ============================================================ */

(function () {
  "use strict";
  if (typeof RDS === "undefined") return;

  /* ---------- 荣誉墙 ---------- */
  var honourEl = document.getElementById("honour-grid");
  if (honourEl) {
    honourEl.innerHTML = RDS.honours.map(function (h) {
      return (
        '<div class="honour-card reveal in">' +
          '<div class="big">' + h.count + "</div>" +
          "<h3>" + h.name + "</h3>" +
          "<p>" + h.note + "</p>" +
        "</div>"
      );
    }).join("");
  }

  /* ---------- 时间线 ---------- */
  var timelineEl = document.getElementById("timeline");
  if (timelineEl) {
    timelineEl.innerHTML = RDS.timeline.map(function (t) {
      return (
        '<div class="timeline-item">' +
          '<div class="when">' + t.year + " · " + t.title + "</div>" +
          "<h4>" + t.title + "</h4>" +
          "<p>" + t.text + "</p>" +
        "</div>"
      );
    }).join("");
  }

  /* ---------- 传奇球员 ---------- */
  var legendEl = document.getElementById("legend-grid");
  if (legendEl) {
    legendEl.innerHTML = RDS.legends.map(function (l) {
      return (
        '<article class="legend-card reveal in">' +
          '<div class="era">' + l.era + "</div>" +
          "<h3>" + l.name + "</h3>" +
          '<div class="lpos">' + l.cn + " · " + l.position + "</div>" +
          "<p>" + l.text + "</p>" +
        "</article>"
      );
    }).join("");
  }
})();
