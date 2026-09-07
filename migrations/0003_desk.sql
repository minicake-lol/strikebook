-- Per-person desk profiles (PIN picker) and private books.
create table if not exists desk_profiles (
  user_id text primary key,
  display_name text not null,
  handle text not null unique,
  tone smallint not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists desk_book (
  user_id text primary key,
  trades_json text not null,
  scanner_json text not null,
  starting_capital double precision not null default 25000,
  updated_at timestamptz not null default now()
);
