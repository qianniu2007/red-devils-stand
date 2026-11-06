/* ============================================================
   Red Devils Stand · History page script
   Renders the honours wall, century-long timeline and legend
   players, all from RDS.
   ============================================================ */

(function () {
  "use strict";
  if (typeof RDS === "undefined") return;

  /* ---------- Honours wall ---------- */
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

  /* ---------- Timeline ---------- */
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

  /* ---------- Legend players ---------- */
  var legendEl = document.getElementById("legend-grid");
  if (legendEl) {
    legendEl.innerHTML = RDS.legends.map(function (l) {
      return (
        '<article class="legend-card reveal in">' +
          '<div class="era">' + l.era + "</div>" +
          "<h3>" + l.name + "</h3>" +
          '<div class="lpos">' + l.position + "</div>" +
          "<p>" + l.text + "</p>" +
        "</article>"
      );
    }).join("");
  }
})();
