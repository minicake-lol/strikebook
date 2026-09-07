import { creditSideOf, isPipelineStatus, strikeFromLeg, type Trade } from "./types.ts";

export const NBIS_WATCH_NOTE =
  "iron-condor call wing; already have Sep18 160/150 PCS; not an add-on size";

export const NBIS_WATCH_LINKED = "Sep18 PCS 160/150";

export function nbisWatchSeed(number: number, id = "watch-nbis-20260918"): Trade {
  return {
    id,
    number,
    date: "2026-09-06",
    ticker: "NBIS",
    stockPrice: 0,
    expiry: "2026-09-18",
    strategy: "Call Credit Spread",
    shortLeg: "270 Call",
    longLeg: "280 Call",
    contracts: 1,
    ivPct: null,
    delta: null,
    erBeforeExp: false,
    shortPremium: 0,
    longPremium: 0,
    width: 10,
    exitNet: null,
    maxGainOverride: null,
    pnlOverride: null,
    status: "Watch",
    thesis: NBIS_WATCH_NOTE,
    feeling: "",
    linkedOpen: NBIS_WATCH_LINKED,
  };
}

export function isPipelineSeedDesk(name?: string | null): boolean {
  const n = (name ?? "").trim().toLowerCase();
  return n === "vincent" || n === "test";
}

export function hasNbisWatchSeed(trades: Trade[]): boolean {
  return trades.some(
    (t) =>
      t.status === "Watch" &&
      t.ticker.toUpperCase() === "NBIS" &&
      t.expiry === "2026-09-18" &&
      /270/.test(t.shortLeg) &&
      /280/.test(t.longLeg),
  );
}

export function withNbisWatchSeed(trades: Trade[]): { trades: Trade[]; added: boolean } {
  if (hasNbisWatchSeed(trades)) return { trades, added: false };
  const number = trades.reduce((m, t) => Math.max(m, t.number), 0) + 1;
  return { trades: [...trades, nbisWatchSeed(number)], added: true };
}

export function pipelineTrades(trades: Trade[]): Trade[] {
  return trades.filter((t) => isPipelineStatus(t.status)).sort((a, b) => {
    const exp = a.expiry.localeCompare(b.expiry);
    if (exp) return exp;
    return a.ticker.localeCompare(b.ticker) || a.number - b.number;
  });
}

export function creditSideCode(trade: Trade): "PCS" | "CCS" | null {
  const side = creditSideOf(trade.strategy);
  if (side === "put_credit") return "PCS";
  if (side === "call_credit") return "CCS";
  return null;
}

export function strikePair(trade: Trade): string {
  const short = strikeFromLeg(trade.shortLeg);
  const long = strikeFromLeg(trade.longLeg);
  if (short != null && long != null) return `${short} / ${long}`;
  if (short != null) return String(short);
  return [trade.shortLeg, trade.longLeg].filter(Boolean).join(" / ");
}

export function logAnchorId(id: string): string {
  return `log-${id}`;
}

export function pairedPipeline(open: Trade, pipeline: Trade[]): Trade[] {
  const ticker = open.ticker.toUpperCase();
  return pipeline.filter(
    (p) => p.id !== open.id && p.ticker.toUpperCase() === ticker && p.expiry === open.expiry,
  );
}
