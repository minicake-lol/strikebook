export const STRATEGIES = [
  "Put Credit Spread",
  "Call Credit Spread",
  "Naked Put",
  "Naked Call",
  "Iron Condor",
  "Naked Put + Naked Call",
  "Other",
] as const;

export type Strategy = (typeof STRATEGIES)[number];
export const TRADE_STATUSES = ["Open", "Closed", "Watch", "Plan"] as const;
export type TradeStatus = (typeof TRADE_STATUSES)[number];
export type OptionRight = "P" | "C";
export type CreditSide = "put_credit" | "call_credit";
