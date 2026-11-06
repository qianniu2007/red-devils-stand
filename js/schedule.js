/* ============================================================
   红魔看台 · 赛程页脚本
   数据渲染、按赛事/状态筛选、观赛打卡（localStorage 持久化）。
   ============================================================ */

(function () {
  "use strict";

  var listEl = document.getElementById("match-list");
  if (!listEl || typeof RDS === "undefined") return;

  var WATCH_KEY = "rds_watched_ids";
  var filters = { comp: "ALL", status: "ALL" };

  /* ---------- 读取已打卡列表 ---------- */
  function getWatched() {
    try { return JSON.parse(localStorage.getItem(WATCH_KEY)) || []; }
    catch (e) { return []; }
  }
  function saveWatched(arr) {
    localStorage.setItem(WATCH_KEY, JSON.stringify(arr));
  }
  function matchId(m) {
    return m.date + "|" + m.home + "|" + m.away;
  }

  /* ---------- 日期格式化 ---------- */
  var WEEK = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  function fmtDate(iso) {
    var d = new Date(iso);
    var t = d.getHours() + ":" + String(d.getMinutes()).padStart(2, "0");
    return {
      d: (d.getMonth() + 1) + "月" + d.getDate() + "日",
      w: WEEK[d.getDay()],
      t: t
    };
  }

  /* ---------- 判断曼联胜负 ---------- */
  function unitedResult(m) {
    var home = RDS.isUnitedHome(m);
    var us = home ? m.homeScore : m.awayScore;
    var them = home ? m.awayScore : m.homeScore;
    if (us > them) return "W";
    if (us === them) return "D";
    return "L";
  }

  /* ---------- 单场 HTML ---------- */
  function rowHTML(m) {
    var dt = fmtDate(m.date);
    var watched = getWatched().indexOf(matchId(m)) !== -1;
    var isHome = RDS.isUnitedHome(m);

    // 徽章
    var badge = "";
    if (m.played) {
      if (m.pending) {
        badge = '<span class="badge ucl">' + (m.competition === "UCL" ? "★" : "•") + "</span>";
      } else if (m.competition === "UCL") {
        badge = '<span class="badge ucl">★</span>';
      } else {
        var r = unitedResult(m);
        badge = '<span class="badge ' + (r === "W" ? "win" : r === "D" ? "draw" : "loss") + '">' + r + "</span>";
      }
    } else {
      badge = '<span class="badge ucl">' + (m.competition === "UCL" ? "★" : "•") + "</span>";
    }

    // 比分
    var score;
    if (m.played && !m.pending && m.homeScore !== null) {
      score = '<span class="score">' + m.homeScore + " : " + m.awayScore + "</span>";
    } else if (m.played && m.pending) {
      score = '<span class="score unplayed">完赛</span>';
    } else {
      score = '<span class="score unplayed">VS</span>';
    }

    // 队名（曼联加主/客标记）
    function teamLabel(name) {
      if (name === "Manchester United") {
        return name + '<span class="u-tag">' + (isHome ? "主" : "客") + "</span>";
      }
      return name;
    }

    return (
      '<article class="match-row reveal in">' +
        '<div class="match-date"><span class="d">' + dt.d + "</span>" + dt.w + " " + dt.t + "</div>" +
        badge +
        '<div class="match-fixture">' +
          '<span class="match-team home">' + teamLabel(m.home) + "</span>" +
          score +
          '<span class="match-team away">' + teamLabel(m.away) + "</span>" +
        "</div>" +
        '<div class="match-right">' +
          '<span class="match-venue">' + (m.competition === "UCL" ? "欧冠 · " : "") + m.venue + "</span>" +
          '<button class="check-btn' + (watched ? " watched" : "") + '" data-id="' + matchId(m) + '">' +
            (watched ? "✓ 已看" : "标记已看") +
          "</button>" +
        "</div>" +
      "</article>"
    );
  }

  /* ---------- 渲染（带筛选）---------- */
  function render() {
    var data = RDS.fixtures.filter(function (m) {
      if (filters.comp !== "ALL" && m.competition !== filters.comp) return false;
      if (filters.status === "PLAYED" && !m.played) return false;
      if (filters.status === "UNPLAYED" && m.played) return false;
      return true;
    });

    if (!data.length) {
      listEl.innerHTML = '<div class="empty-note">这个筛选条件下暂时没有比赛。</div>';
      return;
    }
    listEl.innerHTML = data.map(rowHTML).join("");
  }

  /* ---------- 筛选按钮事件 ---------- */
  document.querySelectorAll(".filter-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var group = btn.getAttribute("data-group");
      var value = btn.getAttribute("data-value");
      filters[group] = value;
      document.querySelectorAll('.filter-btn[data-group="' + group + '"]').forEach(function (b) {
        b.classList.remove("active");
      });
      btn.classList.add("active");
      render();
    });
  });

  /* ---------- 打卡按钮（事件委托）---------- */
  listEl.addEventListener("click", function (e) {
    var btn = e.target.closest(".check-btn");
    if (!btn) return;
    var id = btn.getAttribute("data-id");
    var watched = getWatched();
    var idx = watched.indexOf(id);
    if (idx === -1) {
      watched.push(id);
      btn.classList.add("watched");
      btn.textContent = "✓ 已看";
    } else {
      watched.splice(idx, 1);
      btn.classList.remove("watched");
      btn.textContent = "标记已看";
    }
    saveWatched(watched);
  });

  render();
})();
