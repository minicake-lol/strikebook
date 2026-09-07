import { createFileRoute } from "@tanstack/react-router";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  component: BookPage,
});

function BookPage() {
  const t = useT();
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <p className="text-[11px] font-medium tracking-[0.18em] text-subtle uppercase">{t("Book", "帳簿")}</p>
      <h1 className="mt-2 font-display text-4xl text-fg">{t("Realized book", "已實現帳簿")}</h1>
      <p className="mt-3 max-w-xl text-sm text-muted">
        {t(
          "Watch and Plan rows stay off booked P/L. Today's news review lives on the Watch tab.",
          "Watch / Plan 不計入已實現損益。今日新聞覆核在觀察頁。",
        )}
      </p>
    </div>
  );
}
