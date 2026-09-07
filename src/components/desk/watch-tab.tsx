import { Badge } from "@/components/ui/badge";
import { formatDate, formatDateYear } from "@/lib/book/format";
import { creditSideCode, strikePair } from "@/lib/book/pipeline";
import type { Trade } from "@/lib/book/types";
import { bookedWatchRows, freshNewsCandidates } from "@/lib/book/watchlist";
import { WATCH_NEWS_BRIEF, type WatchStance } from "@/lib/book/watch-news";
import { useI18n, useT } from "@/lib/i18n";

const STANCE_TONE: Record<WatchStance, "profit" | "warn" | "neutral" | "loss" | "open"> = {
  keep: "profit",
  add: "open",
  wait: "warn",
  drop: "loss",
};

function stanceLabel(stance: WatchStance, t: (en: string, zh: string) => string): string {
  if (stance === "keep") return t("Keep", "維持");
  if (stance === "add") return t("Add", "加入");
  if (stance === "wait") return t("Wait", "等待");
  return t("Drop", "剔除");
}

function structureLine(trade: Trade): string {
  const code = creditSideCode(trade);
  const pair = strikePair(trade);
  const bits = [code, pair].filter(Boolean);
  return bits.length ? bits.join(" ") : [trade.shortLeg, trade.longLeg].filter(Boolean).join(" / ");
}

export function WatchTab({ trades }: { trades: Trade[] }) {
  const t = useT();
  const { locale } = useI18n();
  const brief = WATCH_NEWS_BRIEF;
  const bullets = locale === "zh" ? brief.bullets_zh : brief.bullets_en;
  const booked = bookedWatchRows(trades, brief);
  const fresh = freshNewsCandidates(trades, brief);
  const session =
    brief.session === "holiday"
      ? t("US cash shut (Labor Day)", "美股休市（勞工節）")
      : brief.session === "weekend"
        ? t("Weekend", "週末")
        : t("Session open", "盤中");

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-4 py-8 sm:px-6">
      <header className="flex flex-col gap-3 border-b border-border pb-6">
        <p className="text-[11px] font-medium tracking-[0.18em] text-subtle uppercase">
          {t("Watch", "觀察")} · {formatDateYear(brief.asOf)}
        </p>
        <h1 className="font-display text-4xl leading-tight text-fg sm:text-5xl">
          {t("Credit ideas against the tape", "對著盤面的信用價差想法")}
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-muted">{t(brief.headline_en, brief.headline_zh)}</p>
        <div className="flex flex-wrap gap-2 pt-1">
          <Badge>{session}</Badge>
          <Badge tone="warn">VIX {brief.vix.toFixed(2)}</Badge>
          <Badge tone="loss">SKEW {brief.skew.toFixed(2)}</Badge>
          <Badge tone="neutral">{t(brief.regime_en, brief.regime_zh)}</Badge>
        </div>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="text-[11px] font-medium tracking-[0.16em] text-subtle uppercase">
          {t("Tape", "盤面")}
        </h2>
        <ul className="flex flex-col gap-2 text-sm leading-relaxed text-muted">
          {bullets.map((line) => (
            <li key={line} className="border-l border-faint pl-3">
              {line}
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-[11px] font-medium tracking-[0.16em] text-subtle uppercase">
          {t("Booked Watch", "帳上觀察")}
        </h2>
        {booked.length === 0 ? (
          <p className="text-sm text-muted">{t("No Watch rows on the blotter.", "帳上沒有 Watch 列。")}</p>
        ) : (
          <div className="flex flex-col gap-3">
            {booked.map(({ trade, review }) => (
              <article
                key={trade.id}
                className="rounded-xl bg-surface px-4 py-4 shadow-[var(--shadow-border)]"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-mono text-lg text-fg">{trade.ticker}</p>
                    <p className="text-xs text-muted">
                      {structureLine(trade)} · {formatDate(trade.expiry)}
                      {trade.linkedOpen ? ` · ${trade.linkedOpen}` : ""}
                    </p>
                  </div>
                  <Badge tone={review ? STANCE_TONE[review.stance] : "neutral"}>
                    {review ? stanceLabel(review.stance, t) : t("Unreviewed", "尚未覆核")}
                  </Badge>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {review ? t(review.thesis_en, review.thesis_zh) : trade.thesis}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-[11px] font-medium tracking-[0.16em] text-subtle uppercase">
          {t("From the tape", "今日盤面候選")}
        </h2>
        <div className="flex flex-col gap-3">
          {fresh.map((row) => (
            <article key={row.ticker} className="rounded-xl bg-surface px-4 py-4 shadow-[var(--shadow-border)]">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-lg text-fg">{row.ticker}</p>
                  <p className="text-xs text-muted">{t(row.title_en, row.title_zh)}</p>
                </div>
                <Badge tone={STANCE_TONE[row.stance]}>{stanceLabel(row.stance, t)}</Badge>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">{t(row.thesis_en, row.thesis_zh)}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-[11px] font-medium tracking-[0.16em] text-subtle uppercase">
          {t("Calendar", "行事曆")}
        </h2>
        <ul className="flex flex-col gap-2">
          {brief.catalysts.map((c) => (
            <li key={c.when} className="grid grid-cols-[7.5rem_1fr] gap-3 text-sm">
              <span className="font-mono text-subtle">{c.when}</span>
              <span className="text-muted">{t(c.item_en, c.item_zh)}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
