export const SENTIMENT_SNAPSHOT_URL = "/data/sentiment_snapshot.json";

export type FearGreedRating = "Extreme Fear" | "Fear" | "Neutral" | "Greed" | "Extreme Greed";
export type CrowdLabel = "Panic" | "Euphoria" | "Neutral";
export type FgComponentId =
  | "momentum"
  | "strength"
  | "breadth"
  | "putCall"
  | "vix"
  | "junk"
  | "haven";

export type FgComponent = {
  id: FgComponentId | string;
  rating: FearGreedRating;
};

export type SentimentTicker = {
  symbol: string;
  label: CrowdLabel;
  label_en: string;
  label_zh: string;
  bull: number;
  bear: number;
  bear_pctile: number;
  bull_pctile: number | null;
  window_days: number;
  note_en: string;
  note_zh: string;
  updated_at: string;
  is_candidate: boolean;
};

export type SentimentMarket = {
  fg_score: number;
  fg_rating: FearGreedRating;
  fg_percentile_1y: number;
  prev_close: number | null;
  prev_1w: number | null;
  prev_1m: number | null;
  prev_1y: number | null;
  components: FgComponent[];
};

export type SentimentSnapshot = {
  as_of: string;
  schema_version: number;
  source: "mock" | "live";
  market: SentimentMarket;
  tickers: SentimentTicker[];
  extreme_tape: SentimentTicker[];
};
