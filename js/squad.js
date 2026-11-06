/* ============================================================
   红魔看台 · 一线队脚本
   球员卡片渲染、按位置筛选、按姓名/国籍实时搜索。
   ============================================================ */

(function () {
  "use strict";

  var gridEl = document.getElementById("squad-grid");
  var searchEl = document.getElementById("squad-search");
  if (!gridEl || typeof RDS === "undefined") return;

  var POS_CN = { GK: "门将", DF: "后卫", MF: "中场", FW: "前锋" };
  var currentPos = "ALL";

  /* ---------- 单个球员卡片 ---------- */
  function cardHTML(p) {
    return (
      '<article class="player-card reveal in">' +
        '<span class="pos-tag">' + POS_CN[p.position] + "</span>" +
        (p.captain ? '<span class="captain" title="队长">© 队长</span>' : "") +
        '<div class="number">' + String(p.number).padStart(2, "0") + "</div>" +
        '<div class="pname">' + p.name + "</div>" +
        '<div class="nation">' + p.nation + " · " + p.nationCode + "</div>" +
      "</article>"
    );
  }

  /* ---------- 渲染（筛选 + 搜索）---------- */
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
      gridEl.innerHTML = '<div class="empty-note" style="grid-column:1/-1;">没有找到匹配的球员，换个关键词试试。</div>';
      return;
    }
    gridEl.innerHTML = data.map(cardHTML).join("");
  }

  /* ---------- 位置筛选 ---------- */
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

  /* ---------- 实时搜索 ---------- */
  if (searchEl) {
    searchEl.addEventListener("input", render);
  }

  render();
})();
