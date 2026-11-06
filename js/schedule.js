/* ============================================================
   Red Devils Stand · Schedule page script
   Data rendering, competition/status filters and the watched
   check-in (persisted in localStorage).
   ============================================================ */

(function () {
  "use strict";

  var listEl = document.getElementById("match-list");
  if (!listEl || typeof RDS === "undefined") return;

  var WATCH_KEY = "rds_watched_ids";
  var filters = { comp: "ALL", status: "ALL" };

  /* ---------- Read the watched list ---------- */
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

  /* ---------- Date formatting ---------- */
  var WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                 "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function fmtDate(iso) {
    var d = new Date(iso);
    var t = d.getHours() + ":" + String(d.getMinutes()).padStart(2, "0");
    return {
      d: MONTHS[d.getMonth()] + " " + d.getDate(),
      w: WEEK[d.getDay()],
      t: t
    };
  }

  /* ---------- United's result ---------- */
  function unitedResult(m) {
    var home = RDS.isUnitedHome(m);
    var us = home ? m.homeScore : m.awayScore;
    var them = home ? m.awayScore : m.homeScore;
    if (us > them) return "W";
    if (us === them) return "D";
    return "L";
  }

  /* ---------- Single match HTML ---------- */
  function rowHTML(m) {
    var dt = fmtDate(m.date);
    var watched = getWatched().indexOf(matchId(m)) !== -1;
    var isHome = RDS.isUnitedHome(m);

    // Badge
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

    // Score
    var score;
    if (m.played && !m.pending && m.homeScore !== null) {
      score = '<span class="score">' + m.homeScore + " : " + m.awayScore + "</span>";
    } else if (m.played && m.pending) {
      score = '<span class="score unplayed">Full time</span>';
    } else {
      score = '<span class="score unplayed">VS</span>';
    }

    // Team name (United get a home/away tag)
    function teamLabel(name) {
      if (name === "Manchester United") {
        return name + '<span class="u-tag">' + (isHome ? "H" : "A") + "</span>";
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
          '<span class="match-venue">' + (m.competition === "UCL" ? "UCL · " : "") + m.venue + "</span>" +
          '<button class="check-btn' + (watched ? " watched" : "") + '" data-id="' + matchId(m) + '">' +
            (watched ? "✓ Watched" : "Mark as watched") +
          "</button>" +
        "</div>" +
      "</article>"
    );
  }

  /* ---------- Render (with filters) ---------- */
  function render() {
    var data = RDS.fixtures.filter(function (m) {
      if (filters.comp !== "ALL" && m.competition !== filters.comp) return false;
      if (filters.status === "PLAYED" && !m.played) return false;
      if (filters.status === "UNPLAYED" && m.played) return false;
      return true;
    });

    if (!data.length) {
      listEl.innerHTML = '<div class="empty-note">No matches for this filter yet.</div>';
      return;
    }
    listEl.innerHTML = data.map(rowHTML).join("");
  }

  /* ---------- Filter button events ---------- */
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

  /* ---------- Watched button (event delegation) ---------- */
  listEl.addEventListener("click", function (e) {
    var btn = e.target.closest(".check-btn");
    if (!btn) return;
    var id = btn.getAttribute("data-id");
    var watched = getWatched();
    var idx = watched.indexOf(id);
    if (idx === -1) {
      watched.push(id);
      btn.classList.add("watched");
      btn.textContent = "✓ Watched";
    } else {
      watched.splice(idx, 1);
      btn.classList.remove("watched");
      btn.textContent = "Mark as watched";
    }
    saveWatched(watched);
  });

  render();
})();
