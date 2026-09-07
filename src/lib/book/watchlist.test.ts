import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { nbisWatchSeed } from "./pipeline.ts";
import {
  bookedWatchRows,
  freshNewsCandidates,
  needsWatchRefresh,
  watchTrades,
} from "./watchlist.ts";
import { reviewForTicker, WATCH_NEWS_BRIEF } from "./watch-news.ts";

describe("daily Watch news", () => {
  it("is dated for the current news run", () => {
    assert.equal(WATCH_NEWS_BRIEF.asOf, "2026-09-07");
    assert.equal(WATCH_NEWS_BRIEF.session, "holiday");
    assert.ok(WATCH_NEWS_BRIEF.reviews.length >= 4);
  });

  it("keeps the booked NBIS call wing and does not drop it", () => {
    const nbis = reviewForTicker("NBIS");
    assert.ok(nbis);
    assert.equal(nbis?.stance, "keep");
    assert.equal(nbis?.strategy, "Call Credit Spread");
    assert.match(nbis?.shortLeg ?? "", /270/);
    assert.match(nbis?.longLeg ?? "", /280/);
    assert.equal(nbis?.erBeforeExp, false);
  });

  it("does not turn Oracle or Adobe into a pre-earnings credit sale", () => {
    for (const ticker of ["ORCL", "ADBE"]) {
      const row = reviewForTicker(ticker);
      assert.ok(row);
      assert.equal(row?.stance, "wait");
      assert.equal(row?.erBeforeExp, true);
      assert.equal(row?.strategy, null);
    }
  });

  it("pairs the NBIS blotter row with today's keep review", () => {
    const trades = [nbisWatchSeed(1)];
    assert.equal(watchTrades(trades).length, 1);
    const rows = bookedWatchRows(trades);
    assert.equal(rows[0]?.review?.stance, "keep");
    const fresh = freshNewsCandidates(trades);
    assert.ok(fresh.every((r) => r.ticker !== "NBIS"));
    assert.ok(fresh.some((r) => r.ticker === "ORCL"));
    assert.ok(fresh.some((r) => r.ticker === "LULU"));
  });

  it("flags a stale brief when the calendar day has moved", () => {
    assert.equal(needsWatchRefresh(WATCH_NEWS_BRIEF, "2026-09-07"), false);
    assert.equal(needsWatchRefresh(WATCH_NEWS_BRIEF, "2026-09-08"), true);
  });
});
