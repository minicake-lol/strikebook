# Strikebook

Options desk logbook — credit spreads, live marks, scanner, watchlist, and sentiment. English + 繁體中文. Dark ledger, not a brokerage.

## What it is

- **Book** — realized P/L, win rate, equity, charts
- **Open** — live positions, current P/L, short put/call balance, Watch/Plan checklist
- **Log** — trade blotter (Open / Closed / Watch / Plan)
- **Watchlist** — credit ideas
- **Scanner** — IV / RSI / earnings score
- **Sentiment** — Fear & Greed + candidate tape

Watch and Plan rows stay off booked P/L, win rate, equity, and open risk.

## Run locally

```bash
npm install
npm run dev
```

Needs Node 22+. Copy environment keys your host already uses for auth and Postgres (Better Auth + Neon). Do not commit `.env`.

## Stack

TanStack Start, React 19, Tailwind v4, Better Auth, Neon/PGLite, Zustand.

PIN desks (Vincent / Test) are for the hosted preview only.
