import type { Strategy } from "./types.ts";

/** Daily Watch tape. Rewrite this module on each news run; keep `asOf` current. */
export type WatchStance = "keep" | "add" | "wait" | "drop";
export type WatchSession = "holiday" | "open" | "weekend";

export type WatchNewsCatalyst = {
  when: string;
  item_en: string;
  item_zh: string;
};

export type WatchNewsReview = {
  ticker: string;
  stance: WatchStance;
  strategy: Strategy | null;
  shortLeg: string;
  longLeg: string;
  expiry: string;
  erBeforeExp: boolean;
  linkedOpen?: string;
  title_en: string;
  title_zh: string;
  thesis_en: string;
  thesis_zh: string;
};

export type WatchNewsBrief = {
  asOf: string;
  session: WatchSession;
  regime_en: string;
  regime_zh: string;
  vix: number;
  skew: number;
  headline_en: string;
  headline_zh: string;
  bullets_en: string[];
  bullets_zh: string[];
  catalysts: WatchNewsCatalyst[];
  reviews: WatchNewsReview[];
  sources: { name: string; url: string }[];
};

export const WATCH_NEWS_BRIEF: WatchNewsBrief = {
  asOf: "2026-09-07",
  session: "holiday",
  regime_en: "Low-vol bull · cash shut · hike odds above even",
  regime_zh: "低波牛 · 美股休市 · 升息機率過半",
  vix: 14.53,
  skew: 151.58,
  headline_en:
    "Labor Day shut. Friday payrolls flipped September from hold to hike; chips carried the tape. Keep NBIS 270/280 CCS as the IC wing. Do not sell credit into Oracle or Adobe Thursday.",
  headline_zh:
    "勞工節休市。週五非農遠超預期，九月會議由暫停轉為升息定價，盤面靠晶片撐著。NBIS 270/280 買權價差維持 Watch，勿加碼已有 PCS。Oracle / Adobe 週四財報前不賣信用價差。",
  bullets_en: [
    "August payrolls 162k vs ~53–56k consensus; unemployment 4.1%. September 16 hike odds moved above 50%.",
    "S&P 500 7,718.60 (−0.38%) Friday; Nasdaq held up on a narrow chip bid. SOX/semis were the only clear green sector.",
    "VIX 14.53, VIX1D 12.03 now above VIX9D 11.97 — event risk bunched into Tuesday reopen and Friday CPI, not a calm fortnight.",
    "SKEW 151.58 for a third session above 150 while 3-month implied correlation slumped to 9.53. Index looks quiet; tails do not.",
    "Brent ~$97.6 / WTI ~$93 after weekend Gulf strikes and a Hormuz restricted-zone threat. Oil vol still treated as bounded.",
    "Oracle (~$159) and Adobe (~$267) report Thursday 10 Sep with PPI that morning. Apple hardware event Wednesday. CPI Friday. FOMC 15–16 Sep.",
  ],
  bullets_zh: [
    "八月非農 16.2 萬，遠高於約 5.3–5.6 萬預期；失業率 4.1%。9/16 升息機率已過半。",
    "週五標普 7,718.60（−0.38%），那斯達克靠窄幅晶片撐盤。半導體是少數明顯上漲的板塊。",
    "VIX 14.53，VIX1D 12.03 已高於 VIX9D 11.97——風險擠在週二開盤與週五 CPI，不是平靜的兩週。",
    "SKEW 連三日高於 150（151.58），三個月隱含相關跌到 9.53。指數看起來安靜，尾端並不。",
    "週末波斯灣衝突、荷姆茲受限區威脅，Brent 約 $97.6 / WTI 約 $93。原油波動仍被定價成有上限。",
    "Oracle（約 $159）與 Adobe（約 $267）週四 9/10 財報，當日早盤 PPI。Apple 週三發表會。週五 CPI。FOMC 9/15–16。",
  ],
  catalysts: [
    {
      when: "Tue 8 Sep",
      item_en: "US cash and listed options reopen. Respect the Asia chip follow-through; do not chase Friday's rip in the first hour.",
      item_zh: "美股與選擇權開盤。亞洲晶片已先走一截，週五漲勢不要開盤第一小時追。",
    },
    {
      when: "Wed 9 Sep",
      item_en: "Apple hardware event. AAPL is not a credit idea into the keynote.",
      item_zh: "Apple 硬體發表會。AAPL 發表會前不當作信用價差標的。",
    },
    {
      when: "Thu 10 Sep",
      item_en: "PPI 8:30 ET, ECB 25 bp hike widely expected, Oracle and Adobe after the close. Event premium, not a sell-the-IV day.",
      item_zh: "美東 8:30 PPI、歐洲央行普遍預期升息一碼，盤後 Oracle / Adobe。這是事件溢價日，不是賣隱波日。",
    },
    {
      when: "Fri 11 Sep",
      item_en: "CPI 8:30 ET. Last inflation print before the 16 Sep FOMC. Index expected move to this expiry ~1.0%.",
      item_zh: "美東 8:30 CPI。9/16 FOMC 前最後一筆通膨。指數至該到期的預期波幅約 1%。",
    },
    {
      when: "Wed 16 Sep",
      item_en: "FOMC decision. Front VIX futures still in contango; street is long November VIX convexity from Friday flow.",
      item_zh: "FOMC 利率決議。近月 VIX 期貨仍是正價差；週五流顯示街上在買十一月 VIX 凸性。",
    },
  ],
  reviews: [
    {
      ticker: "NBIS",
      stance: "keep",
      strategy: "Call Credit Spread",
      shortLeg: "270 Call",
      longLeg: "280 Call",
      expiry: "2026-09-18",
      erBeforeExp: false,
      linkedOpen: "Sep18 PCS 160/150",
      title_en: "Keep the 270/280 call wing",
      title_zh: "維持 270/280 買權翼",
      thesis_en:
        "Iron-condor call wing vs the booked Sep18 160/150 PCS — not add-on size. Last prints still well below 270 after the convert overhang; earnings are 10 Nov, not before this expiry. Chip bid and GPT-6 Asia strength can squeeze high-beta AI names on Tuesday, but 270 remains the Watch, not a chase. Do not roll the short put closer just because hike odds jumped.",
      thesis_zh:
        "這是已有 Sep18 160/150 PCS 的鐵兀鷹買權翼，不是加碼。可轉債稀釋後股價仍遠低於 270；財報 11/10，不在此到期前。晶片與 GPT-6 亞洲強勢週二可能擠壓高貝塔 AI 股，但 270 仍是 Watch，不是追價。升息機率跳升也不要把空頭賣權往近價捲。",
    },
    {
      ticker: "ORCL",
      stance: "wait",
      strategy: null,
      shortLeg: "",
      longLeg: "",
      expiry: "2026-09-18",
      erBeforeExp: true,
      title_en: "Wait — earnings Thursday",
      title_zh: "等待——週四財報",
      thesis_en:
        "AI-cloud print after the close 10 Sep, ~$159 into the holiday. Capex vs backlog is the tell. Do not sell a PCS or CCS into the event. After the print: PCS only if it dumps on FCF/capex and IV is still fat; CCS only if it rips and you are fading an extended move, not catching the first tick.",
      thesis_zh:
        "9/10 盤後 AI 雲財報，休市前約 $159。看資本支出對上 backlog。財報前不賣 PCS 或 CCS。公布後：若因 FCF／資本支出殺盤且隱波仍貴才考慮 PCS；若噴出再考慮 CCS，不要接第一根。",
    },
    {
      ticker: "ADBE",
      stance: "wait",
      strategy: null,
      shortLeg: "",
      longLeg: "",
      expiry: "2026-09-18",
      erBeforeExp: true,
      title_en: "Wait — earnings Thursday, CEO handoff",
      title_zh: "等待——週四財報、執行長交接",
      thesis_en:
        "Reports the same night as Oracle. Closed ~$267 Friday (−6.7%) on the Chakravarthy CEO transition (1 Dec) and is ~18% lower on the year. BofA is on the sell side. Event premium is not a gift — wait for the print. No PCS while the tape is still repricing the franchise; CCS only if it rips through the 280s after numbers and IV stays rich.",
      thesis_zh:
        "與 Oracle 同晚公布。週五收約 $267（−6.7%），Chakravarthy 12/1 接任執行長，年內約跌 18%。BofA 偏空。事件溢價不是禮物——等數字。品牌仍在重估時不賣 PCS；只有數字後衝過 280 且隱波仍貴才看 CCS。",
    },
    {
      ticker: "LULU",
      stance: "wait",
      strategy: null,
      shortLeg: "",
      longLeg: "",
      expiry: "2026-09-18",
      erBeforeExp: false,
      title_en: "Wait — falling knife, no PCS yet",
      title_zh: "等待——跌勢未穩，先不賣 PCS",
      thesis_en:
        "Friday −17% to ~$101 after a 4% revenue drop, −9% comps, and another guide-down (FY EPS $9.48–$9.73). New CEO Heidi O'Neill starts 8 Sep. IV is fat; directional risk is fatter. Do not sell the 80s puts until Tuesday reopen shows a base. Rich premium after a crash is not the same as an edge.",
      thesis_zh:
        "週五跌約 17% 至約 $101：營收 −4%、同店 −9%，再次下修（全年 EPS $9.48–$9.73）。新任執行長 Heidi O'Neill 9/8 上任。隱波雖貴，方向風險更貴。週二開盤未見底部前，不賣 80 附近賣權。崩跌後的貴權利金不等于優勢。",
    },
    {
      ticker: "SMH",
      stance: "wait",
      strategy: "Call Credit Spread",
      shortLeg: "",
      longLeg: "",
      expiry: "2026-09-18",
      erBeforeExp: false,
      title_en: "Wait for Tuesday reopen, then fade the rip",
      title_zh: "等週二開盤，再考慮賣買權價差",
      thesis_en:
        "Semis led Friday; Kospi +4.2% and memory names ripped overnight on GPT-6 Astra. A CCS after a vertical open can make sense if IV holds. Selling calls into Sunday-night Asia strength is chasing. Recheck SMH / high-beta AI on the 8 Sep cash open before writing strikes.",
      thesis_zh:
        "週五半導體領漲；GPT-6 Astra 帶動 overnight 韓國與記憶體。若隱波仍在，垂直跳空後的 CCS 才合理。對著週日亞洲漲勢賣買權是追價。9/8 現金開盤先看 SMH／高貝塔 AI，再寫履約價。",
    },
  ],
  sources: [
    {
      name: "Saxo Options Brief, 7 Sep 2026",
      url: "https://www.home.saxo/en-ch/content/articles/options/chips-run-front-end-firms---options-brief---7-september-2026-07092026",
    },
    {
      name: "BLS CPI / PPI calendar",
      url: "https://www.bls.gov/schedule/2026/home.htm",
    },
    {
      name: "Federal Reserve September 2026 calendar",
      url: "https://www.federalreserve.gov/newsevents/2026-september.htm",
    },
  ],
};

export function watchNewsAsOf(): string {
  return WATCH_NEWS_BRIEF.asOf;
}

export function reviewForTicker(
  ticker: string,
  brief: WatchNewsBrief = WATCH_NEWS_BRIEF,
): WatchNewsReview | undefined {
  const key = ticker.trim().toUpperCase();
  return brief.reviews.find((r) => r.ticker.toUpperCase() === key);
}
