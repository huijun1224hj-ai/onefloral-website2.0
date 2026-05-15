create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  title_cn text,
  title_en text,
  category text,
  price text,
  description text,
  image_url text,
  active boolean default true
);

alter table products enable row level security;

create policy "Public can read active products"
on products for select using (active = true);

create policy "Anyone can insert products"
on products for insert with check (true);

-- In Supabase Storage, create a public bucket named: product-images
-- For simple use, set the bucket public. For stronger security, add login later.
