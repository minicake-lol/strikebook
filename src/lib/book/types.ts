export const STRATEGIES = [
  "Put Credit Spread",
  "Call Credit Spread",
  "Naked Put",
  "Naked Call",
  "Iron Condor",
  "Naked Put + Naked Call",
  "Other",
] as const;

export type Strategy = (typeof STRATEGIES)[number];
export const TRADE_STATUSES = ["Open", "Closed", "Watch", "Plan"] as const;
export type TradeStatus = (typeof TRADE_STATUSES)[number];
export type OptionRight = "P" | "C";
export type CreditSide = "put_credit" | "call_credit";

export type ParsedLeg = {
  strike: number;
  right: OptionRight;
  qty: number;
};

export type RollEvent = {
  date: string;
  fromExpiry: string;
  toExpiry: string;
  fromShort: string;
  fromLong: string;
  toShort: string;
  toLong: string;
  closeDebit: number;
  newShortPremium: number;
  newLongPremium: number;
  contracts: number;
};

export type Trade = {
  id: string;
  number: number;
  date: string;
  ticker: string;
  stockPrice: number;
  expiry: string;
  strategy: Strategy;
  shortLeg: string;
  longLeg: string;
  contracts: number;
  ivPct: number | null;
  delta: number | null;
  erBeforeExp: boolean;
  shortPremium: number;
  longPremium: number;
  width: number | null;
  exitNet: number | null;
  maxGainOverride: number | null;
  pnlOverride: number | null;
  status: TradeStatus;
  thesis: string;
  feeling: string;
  rolls?: RollEvent[];
  dismissedAlertIds?: string[];
  linkedOpen?: string;
};

export function isPipelineStatus(status: TradeStatus): boolean {
  return status === "Watch" || status === "Plan";
}

export function isOpenTrade(trade: { status: TradeStatus }): boolean {
  return trade.status === "Open";
}

export function isClosedTrade(trade: { status: TradeStatus }): boolean {
  return trade.status === "Closed";
}

export function creditSideOf(strategy: Strategy): CreditSide | null {
  if (strategy === "Put Credit Spread") return "put_credit";
  if (strategy === "Call Credit Spread") return "call_credit";
  return null;
}

export function strategyFromSide(side: CreditSide): Strategy {
  return side === "put_credit" ? "Put Credit Spread" : "Call Credit Spread";
}

export function strikeFromLeg(leg: string): number | null {
  const m = leg.match(/(\d+(?:\.\d+)?)/);
  if (!m) return null;
  const n = Number(m[1]);
  return Number.isFinite(n) ? n : null;
}

export function creditLegLabel(strike: number, side: CreditSide): string {
  return `${strike} ${side === "put_credit" ? "Put" : "Call"}`;
}

export type ScannerRow = {
  id: string;
  ticker: string;
  price: number | null;
  ivPct: number | null;
  ivRank: number | null;
  daysToEr: number | null;
  move5dPct: number | null;
  optVolume: number | null;
  theme: string;
  lastUpdated: string;
};

export type Quote = {
  symbol: string;
  price: number;
  previousClose: number | null;
  change: number | null;
  changePct: number | null;
  volume: number | null;
  move5dPct: number | null;
  rsi14: number | null;
  asOf: number | null;
  name: string | null;
  kind: "equity" | "option" | "unknown";
  closesByDate?: Record<string, number>;
};

export type ScannerLive = {
  ivPct: number | null;
  daysToEr: number | null;
  optVolume: number | null;
};

export type MarketSnapshot = {
  quotes: Record<string, Quote>;
  scanner: Record<string, ScannerLive>;
  asOf: number;
  errors: string[];
};

export type OptionMark = {
  occ: string;
  strike: number;
  right: OptionRight;
  last: number | null;
  theo: number | null;
  price: number | null;
  source: "last" | "theo" | "intrinsic" | null;
};
