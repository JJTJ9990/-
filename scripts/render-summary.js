#!/usr/bin/env node
/*
 * summary.html を PNG 画像に変換する。
 *   出力: data/summary.png            (最新・サイト表示用)
 *         data/archive/summary-YYYY-MM-DD.png (アーカイブ)
 *
 * 使い方: node scripts/render-summary.js
 * 依存: playwright + chromium（この環境にプリインストール済み）
 */
const fs = require("fs");
const path = require("path");

function findPlaywright() {
  try { return require("playwright"); } catch (e) {}
  const globals = [
    "/opt/node22/lib/node_modules/playwright",
    "/usr/lib/node_modules/playwright",
    "/usr/local/lib/node_modules/playwright"
  ];
  for (const g of globals) {
    try { return require(g); } catch (e) {}
  }
  throw new Error("playwright モジュールが見つかりません");
}

function findChromium() {
  if (process.env.CHROMIUM_PATH && fs.existsSync(process.env.CHROMIUM_PATH)) {
    return process.env.CHROMIUM_PATH;
  }
  const base = "/opt/pw-browsers";
  if (fs.existsSync(base)) {
    const dirs = fs.readdirSync(base).filter((d) => /^chromium-\d+$/.test(d));
    for (const d of dirs) {
      const p = path.join(base, d, "chrome-linux", "chrome");
      if (fs.existsSync(p)) return p;
    }
  }
  return undefined; // playwright の既定を使う
}

(async () => {
  const { chromium } = findPlaywright();
  const root = path.resolve(__dirname, "..");
  const exe = findChromium();

  const browser = await chromium.launch(exe ? { executablePath: exe } : {});
  const page = await browser.newPage({ viewport: { width: 1080, height: 1000 }, deviceScaleFactor: 2 });

  const errors = [];
  page.on("pageerror", (e) => errors.push(String(e.message)));

  await page.goto("file://" + path.join(root, "summary.html"), { waitUntil: "networkidle" });
  await page.waitForTimeout(300);

  const poster = page.locator("#poster");
  const outLatest = path.join(root, "data", "summary.png");
  await poster.screenshot({ path: outLatest });

  // アーカイブ（更新日ベース）
  const dateStr = await page.evaluate(() => {
    try {
      const d = new Date(window.NEWS_DATA.updated_at);
      return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") +
        "-" + String(d.getDate()).padStart(2, "0");
    } catch (e) {
      return new Date().toISOString().slice(0, 10);
    }
  });
  const archiveDir = path.join(root, "data", "archive");
  fs.mkdirSync(archiveDir, { recursive: true });
  const outArchive = path.join(archiveDir, "summary-" + dateStr + ".png");
  fs.copyFileSync(outLatest, outArchive);

  await browser.close();

  if (errors.length) {
    console.error("page errors:", errors);
    process.exit(1);
  }
  console.log("生成完了:", outLatest);
  console.log("アーカイブ:", outArchive);
})().catch((e) => { console.error(e); process.exit(1); });
