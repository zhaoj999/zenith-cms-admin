-- Create Articles Table
create table public.articles (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  author text not null,
  category text not null,
  status text not null check (status in ('已发布', '草稿', '待审核'))
);

-- Enable Row Level Security (RLS)
alter table public.articles enable row level security;

-- Create Policy to allow all access (for development simplicity)
-- WARNING: In production, you should restrict this.
create policy "Allow all access to articles"
on public.articles
for all
to anon
using (true)
with check (true);


-- Create Activities Table
create table public.activities (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  type text not null check (type in ('article', 'system', 'user')),
  status_label text
);

-- Enable RLS
alter table public.activities enable row level security;

-- Create Policy
create policy "Allow all access to activities"
on public.activities
for all
to anon
using (true)
with check (true);
