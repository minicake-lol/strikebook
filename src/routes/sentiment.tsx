import { createFileRoute } from "@tanstack/react-router";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/sentiment")({
  component: SentimentPage,
});

function SentimentPage() {
  const t = useT();
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <p className="text-[11px] font-medium tracking-[0.18em] text-subtle uppercase">{t("Sentiment", "情緒")}</p>
      <h1 className="mt-2 font-display text-4xl text-fg">{t("Fear & Greed", "恐懼與貪婪")}</h1>
    </div>
  );
}
