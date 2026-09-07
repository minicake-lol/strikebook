-- Single-tenant options logbook. One row is the live journal.
create table if not exists book_state (
  id text primary key,
  trades_json text not null,
  scanner_json text not null,
  starting_capital double precision not null default 25000,
  updated_at timestamptz not null default now()
);
