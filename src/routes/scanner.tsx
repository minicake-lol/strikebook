import { createFileRoute } from "@tanstack/react-router";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/scanner")({
  component: ScannerPage,
});

function ScannerPage() {
  const t = useT();
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <p className="text-[11px] font-medium tracking-[0.18em] text-subtle uppercase">{t("Scanner", "掃描")}</p>
      <h1 className="mt-2 font-display text-4xl text-fg">{t("IV / RSI / earnings", "隱波 / RSI / 財報")}</h1>
    </div>
  );
}
