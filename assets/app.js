/* ===========================================================================
   経済ニュース ダッシュボード — アプリロジック
   data/news.js が定義する window.NEWS_DATA を読み込んで描画する。
   =========================================================================== */
(function () {
  "use strict";

  var data = window.NEWS_DATA;

  /* ---------- テーマ切替 ---------- */
  var root = document.documentElement;
  var saved = localStorage.getItem("theme");
  if (saved) root.setAttribute("data-theme", saved);

  document.getElementById("theme-toggle").addEventListener("click", function () {
    var isDark;
    var current = root.getAttribute("data-theme");
    if (current) {
      isDark = current === "dark";
    } else {
      isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    var next = isDark ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });

  if (!data) {
    document.getElementById("content").innerHTML =
      '<div class="loading">ニュースデータを読み込めませんでした。data/news.js を確認してください。</div>';
    return;
  }

  /* ---------- ユーティリティ ---------- */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function formatUpdated(iso) {
    try {
      var d = new Date(iso);
      var days = ["日", "月", "火", "水", "木", "金", "土"];
      return d.getFullYear() + "年" + (d.getMonth() + 1) + "月" + d.getDate() + "日(" +
        days[d.getDay()] + ") " +
        String(d.getHours()).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0") + " 更新";
    } catch (e) { return "更新日時不明"; }
  }

  /* ---------- ヘッダー: 更新時刻 ---------- */
  document.getElementById("updated").textContent = formatUpdated(data.updated_at);

  /* ---------- まとめ画像: 読み込めた場合だけ表示 ---------- */
  (function () {
    var hero = document.getElementById("summary-hero");
    var img = document.getElementById("summary-img");
    if (!hero || !img) return;
    // HTTP配信時のみキャッシュ回避クエリを付ける（file:// では付けない）
    var q = location.protocol === "file:" ? "" : "?v=" + encodeURIComponent(data.updated_at || Date.now());
    img.src = "data/summary.png" + q;
    document.getElementById("summary-download").href = "data/summary.png" + q;
    img.addEventListener("load", function () { hero.hidden = false; });
    img.addEventListener("error", function () { hero.hidden = true; });
  })();

  /* ---------- 相場ティッカー ---------- */
  var ticker = document.getElementById("ticker");
  (data.market_snapshot || []).forEach(function (m) {
    var el = document.createElement("div");
    el.className = "tk";
    var dir = m.dir || "flat";
    var arrow = dir === "up" ? "▲" : dir === "down" ? "▼" : "—";
    el.innerHTML =
      '<span class="tk-name">' + esc(m.name) + '</span>' +
      '<span class="tk-val">' + esc(m.value) + '</span>' +
      '<span class="tk-chg ' + dir + '">' + arrow + " " + esc(m.change) +
      (m.change_pct ? " " + esc(m.change_pct) : "") + '</span>';
    ticker.appendChild(el);
  });

  /* ---------- タブ ---------- */
  var tabs = document.getElementById("tabs");
  var cats = data.categories || [];

  var allTab = makeTab("all", "すべて", true);
  tabs.appendChild(allTab);
  cats.forEach(function (c) {
    tabs.appendChild(makeTab(c.id, (c.icon ? c.icon + " " : "") + c.title, false));
  });

  function makeTab(id, label, active) {
    var b = document.createElement("button");
    b.className = "tab" + (active ? " active" : "");
    b.type = "button";
    b.dataset.target = id;
    b.textContent = label;
    b.addEventListener("click", function () {
      document.querySelectorAll(".tab").forEach(function (t) { t.classList.remove("active"); });
      b.classList.add("active");
      render(id);
    });
    return b;
  }

  /* ---------- 描画 ---------- */
  var content = document.getElementById("content");

  function render(filter) {
    content.innerHTML = "";
    var shown = filter === "all" ? cats : cats.filter(function (c) { return c.id === filter; });

    if (!shown.length) {
      content.innerHTML = '<div class="loading">該当するニュースがありません。</div>';
      return;
    }

    shown.forEach(function (c) {
      var sec = document.createElement("section");
      sec.className = "category";
      sec.id = "cat-" + c.id;

      var items = c.items || [];
      sec.innerHTML =
        '<div class="category-head">' +
        '<span class="ci">' + esc(c.icon || "📰") + '</span>' +
        '<h2>' + esc(c.title) + '</h2>' +
        '<span class="count">' + items.length + '件</span>' +
        '</div>';

      var cards = document.createElement("div");
      cards.className = "cards";

      items.forEach(function (it) {
        var card = document.createElement("article");
        card.className = "card";
        var title = it.url
          ? '<a href="' + esc(it.url) + '" target="_blank" rel="noopener">' + esc(it.headline) + '</a>'
          : esc(it.headline);
        card.innerHTML =
          '<div class="card-top">' +
          (it.region ? '<span class="chip">' + esc(it.region) + '</span>' : '') +
          (it.date ? '<span class="card-date">' + esc(it.date) + '</span>' : '') +
          '</div>' +
          '<h3>' + title + '</h3>' +
          '<p>' + esc(it.summary) + '</p>' +
          '<div class="source">出典: ' +
          (it.url
            ? '<a href="' + esc(it.url) + '" target="_blank" rel="noopener">' + esc(it.source || it.url) + '</a>'
            : esc(it.source || "")) +
          '</div>';
        cards.appendChild(card);
      });

      sec.appendChild(cards);
      content.appendChild(sec);
    });
  }

  render("all");
})();
