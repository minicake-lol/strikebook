import { createFileRoute } from "@tanstack/react-router";
import { WatchTab } from "@/components/desk/watch-tab";
import { PREVIEW_TRADES } from "@/lib/book/preview-trades";

export const Route = createFileRoute("/watch")({
  component: WatchPage,
});

function WatchPage() {
  return <WatchTab trades={PREVIEW_TRADES} />;
}
