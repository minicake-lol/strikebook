import { createFileRoute } from "@tanstack/react-router";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/log")({
  component: LogPage,
});

function LogPage() {
  const t = useT();
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <p className="text-[11px] font-medium tracking-[0.18em] text-subtle uppercase">{t("Log", "流水")}</p>
      <h1 className="mt-2 font-display text-4xl text-fg">{t("Blotter", "交易流水")}</h1>
      <p className="mt-3 max-w-xl text-sm text-muted">
        {t("Open / Closed / Watch / Plan. Watch stays off booked P/L.", "未平倉 / 已平倉 / 觀察 / 計劃。Watch 不計入已實現損益。")}
      </p>
    </div>
  );
}
