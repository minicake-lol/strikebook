import { pipelineTrades } from "./pipeline.ts";
import type { Trade } from "./types.ts";
import {
  reviewForTicker,
  WATCH_NEWS_BRIEF,
  type WatchNewsBrief,
  type WatchNewsReview,
} from "./watch-news.ts";

export type BookedWatchRow = {
  trade: Trade;
  review: WatchNewsReview | null;
};

export function watchTrades(trades: Trade[]): Trade[] {
  return pipelineTrades(trades).filter((t) => t.status === "Watch");
}

export function bookedWatchRows(
  trades: Trade[],
  brief: WatchNewsBrief = WATCH_NEWS_BRIEF,
): BookedWatchRow[] {
  return watchTrades(trades).map((trade) => ({
    trade,
    review: reviewForTicker(trade.ticker, brief) ?? null,
  }));
}

export function freshNewsCandidates(
  trades: Trade[],
  brief: WatchNewsBrief = WATCH_NEWS_BRIEF,
): WatchNewsReview[] {
  const watched = new Set(watchTrades(trades).map((t) => t.ticker.toUpperCase()));
  return brief.reviews.filter((r) => !watched.has(r.ticker.toUpperCase()));
}

export function needsWatchRefresh(brief: WatchNewsBrief, todayIso: string): boolean {
  return brief.asOf !== todayIso;
}
