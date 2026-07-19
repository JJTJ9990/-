/*
 * 経済ニュースデータ
 * ---------------------------------------------------------------------------
 * このファイルは毎朝の自動更新セッションによって書き換えられます。
 * 手動で編集しても構いませんが、次回の自動更新で上書きされます。
 *
 * スキーマ:
 *   updated_at      : ISO8601 の最終更新時刻 (JST)
 *   market_snapshot : 相場サマリーの配列
 *   categories      : カテゴリごとのニュース配列
 * ---------------------------------------------------------------------------
 */
window.NEWS_DATA = {
  updated_at: "2026-07-19T07:20:00+09:00",

  market_snapshot: [
    { name: "日経平均", value: "64,141.12", change: "-2,694.42", change_pct: "-4.03%", dir: "down" },
    { name: "NYダウ", value: "52,146.42", change: "-406.55", change_pct: "-0.77%", dir: "down" },
    { name: "S&P500", value: "7,457.69", change: "-76.08", change_pct: "-1.01%", dir: "down" },
    { name: "NASDAQ", value: "25,520.24", change: "-361.71", change_pct: "-1.40%", dir: "down" },
    { name: "ドル円", value: "162.40", change: "+0.04", change_pct: "円安", dir: "down" },
    { name: "WTI原油", value: "高止まり", change: "$4/ガロン超", change_pct: "", dir: "up" }
  ],

  categories: [
    {
      id: "macro",
      title: "マクロ経済・金融政策",
      icon: "🏦",
      items: [
        {
          headline: "日銀、政策金利を1.0%へ引き上げ（6月会合）",
          summary: "日本銀行は6月15・16日の金融政策決定会合で政策金利を0.75%から1.0%程度へ引き上げ。採決は賛成7・反対1。3年連続の歴史的高水準の賃上げで「賃金と物価の好循環」が想定通り実現しているとの判断。市場は次回利上げを12月と見込む。",
          region: "日本",
          source: "日本経済研究センター",
          url: "https://www.jcer.or.jp/research-report/20260616-2.html",
          date: "2026-06-16"
        },
        {
          headline: "長期国債買入れの減額、27年4月以降は停止の見通し",
          summary: "日銀は長期国債の買入れ減額を27年4月以降停止し、月間2兆円程度の買入れを継続する方針。市場では年内の追加利上げを予想する声が多く、着地点として2.0%を見据える見方も。",
          region: "日本",
          source: "三井住友DSアセットマネジメント",
          url: "https://www.smd-am.co.jp/market/macroview/2026/mvreport20260501_2/",
          date: "2026-05-01"
        },
        {
          headline: "FRBは政策金利を据え置き（3.50〜3.75%）、内部で意見対立",
          summary: "6月FOMCはFFレート誘導目標を4会合連続で据え置き。7月16日にはダラス連銀ローガン総裁が「インフレが高止まりし2%への道筋が見えない」と利上げを主張する一方、ジェファーソン副議長は慎重姿勢。7月下旬の次回会合が焦点。",
          region: "米国",
          source: "インタラクティブクリプト / みんかぶ",
          url: "https://fx.minkabu.jp/indicators/US-FOMC",
          date: "2026-07-16"
        }
      ]
    },
    {
      id: "markets",
      title: "市場・株・為替",
      icon: "📈",
      items: [
        {
          headline: "日経平均、2,694円安の大幅続落（-4.03%）",
          summary: "7月17日の日経平均は前日比2,694.42円安の64,141.12円で引け。中国の新AIモデル発表を受けたAI競争激化への懸念と、原油価格の高止まりが重し。寄り付きは495円安からスタートし、午後にかけて下げ幅を拡大した。",
          region: "日本",
          source: "みんかぶ / 株式新聞",
          url: "https://fx.minkabu.jp/news/373486",
          date: "2026-07-17"
        },
        {
          headline: "NYダウは406ドル安と続落",
          summary: "7月17日の米国市場でNYダウは406.55ドル安の52,146.42ドル。中国のAIモデル発表と原油高が投資家心理を冷やした。ハイテク中心に売りが優勢となった。",
          region: "米国",
          source: "株探",
          url: "https://s.kabutan.jp/news/n202607180092/",
          date: "2026-07-17"
        },
        {
          headline: "ドル円は162円台前半で推移、円安基調続く",
          summary: "ドル円相場は7月17日朝時点で162.38円付近。日米金利差やFRB内の利上げ観測を背景に円安地合いが継続している。",
          region: "為替",
          source: "みんかぶ FX/為替",
          url: "https://fx.minkabu.jp/",
          date: "2026-07-17"
        }
      ]
    },
    {
      id: "geopolitics",
      title: "国際・地政学",
      icon: "🌏",
      items: [
        {
          headline: "米相互関税に違憲判断、通商法122条の10%関税へ切替",
          summary: "2月20日に連邦最高裁がトランプ政権の相互関税を違憲と判断。政権は徴収を停止し、1974年通商法122条に基づく10%関税(150日間の期限付き)を導入。7月24日以降は301条による関税へ切り替える予定で、通商政策の不透明感が続く。",
          region: "米国",
          source: "住友商事グローバルリサーチ",
          url: "https://www.scgr.co.jp/report/survey/2026041580108/",
          date: "2026-04-15"
        },
        {
          headline: "ホルムズ海峡の緊張でエネルギー供給不安、原油高進行",
          summary: "米国とイスラエルによるイラン攻撃後、イランがホルムズ海峡を事実上閉鎖したことで世界のエネルギー供給懸念が拡大。WTI先物が上昇し、米ガソリン価格は1ガロン4ドルを突破した。",
          region: "中東",
          source: "PwC Japan / 各種報道",
          url: "https://www.pwc.com/jp/ja/knowledge/thoughtleadership/geopolitical-risk2026.html",
          date: "2026-07-10"
        },
        {
          headline: "USMCA見直し協議が7月に、交渉難航の恐れ",
          summary: "米国・メキシコ・カナダ協定(USMCA)の見直しに係る三国間協議が7月に予定。保護主義を強める米国が原産品条件の厳格化を求めており、交渉は難航の見込み。日本企業も約7割が関税の影響を受け、サプライチェーンや価格戦略の見直しを迫られている。",
          region: "北米",
          source: "ジェトロ / 各種報道",
          url: "https://www.jetro.go.jp/world/security_trade_control/",
          date: "2026-07-01"
        }
      ]
    }
  ]
};
