import { createFileRoute } from "@tanstack/react-router";
import { OpenChecklist } from "@/components/desk/open-checklist";
import { PREVIEW_TRADES } from "@/lib/book/preview-trades";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/open")({
  component: OpenPage,
});

function OpenPage() {
  const t = useT();
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8 px-4 py-10 sm:px-6">
      <div>
        <p className="text-[11px] font-medium tracking-[0.18em] text-subtle uppercase">{t("Open", "未平倉")}</p>
        <h1 className="mt-2 font-display text-4xl text-fg">{t("Live risk", "即時風險")}</h1>
        <p className="mt-3 max-w-xl text-sm text-muted">
          {t(
            "Open marks hydrate from the desk book. The Watch/Plan checklist is seeded for preview desks.",
            "未平倉價位由帳簿灌入。Watch / Plan 清單在預覽桌面先放入種子。",
          )}
        </p>
      </div>
      <OpenChecklist trades={PREVIEW_TRADES} />
    </div>
  );
}
