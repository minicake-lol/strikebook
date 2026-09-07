import { cn } from "@/lib/utils";

export function Badge({
  className,
  tone = "neutral",
  ...props
}: React.ComponentProps<"span"> & { tone?: "neutral" | "profit" | "loss" | "warn" | "open" | "closed" }) {
  const tones = {
    neutral: "bg-surface-2 text-muted",
    profit: "bg-profit/15 text-profit",
    loss: "bg-loss/15 text-loss",
    warn: "bg-warn/15 text-warn",
    open: "bg-warn/15 text-warn",
    closed: "bg-profit/15 text-profit",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
