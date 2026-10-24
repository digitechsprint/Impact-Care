-- Stores submissions from the site's contact / appointment / careers forms.
create table if not exists public.contact_submissions (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  page        text,
  name        text,
  email       text,
  phone       text,
  message     text,
  payload     jsonb not null default '{}'::jsonb
);

alter table public.contact_submissions enable row level security;

-- Anyone (anon key) may insert; nobody may read via the anon key.
drop policy if exists "Public can submit contact forms" on public.contact_submissions;
create policy "Public can submit contact forms"
  on public.contact_submissions for insert
  to anon, authenticated
  with check (true);
