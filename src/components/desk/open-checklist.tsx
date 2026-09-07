import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/book/format";
import { creditSideCode, logAnchorId, pairedPipeline, pipelineTrades, strikePair } from "@/lib/book/pipeline";
import type { Trade } from "@/lib/book/types";
import { useT } from "@/lib/i18n";

export function OpenChecklist({ trades }: { trades: Trade[] }) {
  const t = useT();
  const pipeline = pipelineTrades(trades);
  const open = trades.filter((row) => row.status === "Open");

  if (pipeline.length === 0) {
    return (
      <p className="text-sm text-muted">
        {t("No Watch or Plan rows sitting next to open risk.", "沒有掛在未平倉旁邊的 Watch / Plan。")}
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-[11px] font-medium tracking-[0.16em] text-subtle uppercase">
        {t("Watch / Plan", "觀察 / 計劃")}
      </h2>
      <ul className="flex flex-col gap-2">
        {pipeline.map((row) => {
          const paired = open.flatMap((o) => pairedPipeline(o, [row]));
          const code = creditSideCode(row);
          return (
            <li key={row.id} className="flex flex-wrap items-center gap-2 text-sm">
              <Badge tone={row.status === "Watch" ? "warn" : "neutral"}>{row.status}</Badge>
              <Link to="/watch" hash={logAnchorId(row.id)} className="font-mono text-fg hover:underline">
                {row.ticker}
              </Link>
              <span className="text-muted">
                {[code, strikePair(row), formatDate(row.expiry)].filter(Boolean).join(" · ")}
              </span>
              {paired.length > 0 ? (
                <span className="text-xs text-subtle">{t("paired to open", "對應未平倉")}</span>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
