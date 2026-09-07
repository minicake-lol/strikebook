import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useI18n, useT } from "@/lib/i18n";

const TABS = [
  { to: "/", label_en: "Book", label_zh: "帳簿" },
  { to: "/open", label_en: "Open", label_zh: "未平倉" },
  { to: "/log", label_en: "Log", label_zh: "流水" },
  { to: "/watch", label_en: "Watch", label_zh: "觀察" },
  { to: "/scanner", label_en: "Scanner", label_zh: "掃描" },
  { to: "/sentiment", label_en: "Sentiment", label_zh: "情緒" },
] as const;

export function DeskShell() {
  const t = useT();
  const { locale, setLocale } = useI18n();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-dvh bg-bg text-fg">
      <header className="border-b border-border bg-bg-elevated">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-4 sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-display text-2xl tracking-tight">{t("Strikebook", "Strikebook")}</p>
              <p className="text-xs text-subtle">{t("Options desk logbook", "選擇權交易台帳簿")}</p>
            </div>
            <div className="flex gap-1">
              <Button
                type="button"
                size="sm"
                variant={locale === "en" ? "default" : "ghost"}
                onClick={() => setLocale("en")}
              >
                EN
              </Button>
              <Button
                type="button"
                size="sm"
                variant={locale === "zh" ? "default" : "ghost"}
                onClick={() => setLocale("zh")}
              >
                繁
              </Button>
            </div>
          </div>
          <nav className="flex flex-wrap gap-1">
            {TABS.map((tab) => {
              const active = pathname === tab.to;
              return (
                <Link
                  key={tab.to}
                  to={tab.to}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm transition-colors",
                    active ? "bg-surface-2 text-fg" : "text-muted hover:bg-surface-2 hover:text-fg",
                  )}
                >
                  {t(tab.label_en, tab.label_zh)}
                </Link>
              );
            })}
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
