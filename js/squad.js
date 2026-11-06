/* ============================================================
   Red Devils Stand · Squad page script
   Player card rendering, position filters and live search by
   name / nationality.
   ============================================================ */

(function () {
  "use strict";

  var gridEl = document.getElementById("squad-grid");
  var searchEl = document.getElementById("squad-search");
  if (!gridEl || typeof RDS === "undefined") return;

  var POS_EN = { GK: "Goalkeeper", DF: "Defender", MF: "Midfielder", FW: "Forward" };
  var currentPos = "ALL";

  /* ---------- Single player card ---------- */
  function cardHTML(p) {
    return (
      '<article class="player-card reveal in">' +
        '<span class="pos-tag">' + POS_EN[p.position] + "</span>" +
        (p.captain ? '<span class="captain" title="Captain">© Captain</span>' : "") +
        '<div class="number">' + String(p.number).padStart(2, "0") + "</div>" +
        '<div class="pname">' + p.name + "</div>" +
        '<div class="nation">' + p.nation + " · " + p.nationCode + "</div>" +
      "</article>"
    );
  }

  /* ---------- Render (filters + search) ---------- */
  function render() {
    var keyword = searchEl ? searchEl.value.trim().toLowerCase() : "";

    var data = RDS.squad.filter(function (p) {
      if (currentPos !== "ALL" && p.position !== currentPos) return false;
      if (keyword) {
        var hay = (p.name + " " + p.nation + " " + p.nationCode).toLowerCase();
        if (hay.indexOf(keyword) === -1) return false;
      }
      return true;
    });

    if (!data.length) {
      gridEl.innerHTML = '<div class="empty-note" style="grid-column:1/-1;">No matching players found. Try a different keyword.</div>';
      return;
    }
    gridEl.innerHTML = data.map(cardHTML).join("");
  }

  /* ---------- Position filters ---------- */
  document.querySelectorAll(".filter-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      currentPos = btn.getAttribute("data-value");
      document.querySelectorAll(".filter-btn").forEach(function (b) {
        b.classList.remove("active");
      });
      btn.classList.add("active");
      render();
    });
  });

  /* ---------- Live search ---------- */
  if (searchEl) {
    searchEl.addEventListener("input", render);
  }

  render();
})();
