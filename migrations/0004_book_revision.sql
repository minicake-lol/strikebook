-- Optimistic concurrency so a stale device cache cannot overwrite a newer blotter.
alter table desk_book add column if not exists revision integer not null default 1;
