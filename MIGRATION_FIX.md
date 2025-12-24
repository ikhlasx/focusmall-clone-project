# Fix RLS Policy Error for Migration

## Problem
The migration script fails with: `new row violates row-level security policy for table "rooms"`

This happens because RLS policies require authentication, but the migration script runs without a logged-in user.

## Solution 1: Use Service Role Key (Recommended) ✅

The **Service Role Key** bypasses all RLS policies, making it perfect for migrations.

### Steps:

1. **Get Service Role Key from Supabase:**
   - Go to [Supabase Dashboard](https://app.supabase.com)
   - Select your project
   - Go to **Settings** → **API**
   - Find **"service_role"** key (NOT the anon key)
   - Copy it

2. **Add to `.env` file:**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   ```

3. **Run migration again:**
   ```bash
   npx tsx scripts/migrate-rooms.ts
   ```

### ⚠️ Security Warning:
- **NEVER** commit the Service Role Key to git
- **NEVER** expose it in client-side code
- **ONLY** use it for server-side scripts and migrations
- It bypasses ALL security policies!

## Solution 2: Temporarily Allow Anon Inserts

If you can't use the service role key, you can temporarily allow anonymous inserts:

1. **Go to Supabase SQL Editor**
2. **Run this SQL:**
   ```sql
   -- Allow anon inserts temporarily
   CREATE POLICY "Allow anon inserts for migration" ON rooms
     FOR INSERT
     TO anon
     WITH CHECK (true);

   CREATE POLICY "Allow anon inserts for migration" ON room_images
     FOR INSERT
     TO anon
     WITH CHECK (true);
   ```

3. **Run migration:**
   ```bash
   npx tsx scripts/migrate-rooms.ts
   ```

4. **After migration, remove the policies:**
   ```sql
   DROP POLICY "Allow anon inserts for migration" ON rooms;
   DROP POLICY "Allow anon inserts for migration" ON room_images;
   ```

## Which Solution to Use?

- **Use Solution 1 (Service Role Key)** if:
  - You're comfortable with secure key management
  - You want the most secure approach
  - You'll remove the key from `.env` after migration

- **Use Solution 2 (Temporary Policy)** if:
  - You can't access the service role key
  - You want a quick temporary fix
  - You'll remember to remove the policies after

## After Migration

Once migration is complete:
1. Remove `SUPABASE_SERVICE_ROLE_KEY` from `.env` (if you used Solution 1)
2. Remove temporary policies (if you used Solution 2)
3. Your admin panel will work with authenticated users only

