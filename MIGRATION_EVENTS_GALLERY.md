# Events & Gallery Migration Guide

This guide will help you migrate existing events and gallery data from the hardcoded pages to the database.

## Prerequisites

1. ✅ Supabase database is set up
2. ✅ Database schema is created:
   - **Option 1:** Run the complete `supabase-schema.sql` in Supabase SQL Editor (includes rooms, events, and gallery)
   - **Option 2:** If you already have rooms tables, run `supabase-schema-events-gallery.sql` (events and gallery only)
3. ✅ Environment variables are configured:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY` (recommended) OR `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### ⚠️ Important: Run Schema First!

**Before running migrations, make sure the database tables exist:**

1. Go to your Supabase Dashboard
2. Navigate to SQL Editor
3. Run one of these:
   - `supabase-schema.sql` (complete schema)
   - `supabase-schema-events-gallery.sql` (events & gallery only)

The schema files now handle existing policies gracefully (drops and recreates them).

## Migration Steps

### Step 0: Install tsx (if not already installed)

If you don't have `tsx` installed, you can either:

**Option 1:** Install it as a dev dependency:
```bash
npm install -D tsx
```

**Option 2:** Use npx (no installation needed):
```bash
npx tsx scripts/migrate-events.ts
```

### Step 1: Migrate Events

Run the events migration script:

**Using npm script:**
```bash
npm run migrate:events
```

**Or directly:**
```bash
npx tsx scripts/migrate-events.ts
```

This will:
- Insert 10 existing events into the database
- Set them all as "published" status
- Assign display order based on the original order

**What gets migrated:**
- Event titles and descriptions
- Event status (all set to "published")
- Display order

**Note:** Event images are NOT migrated. You'll need to add images through the admin panel after migration.

### Step 2: Migrate Gallery

Run the gallery migration script:

**Using npm script:**
```bash
npm run migrate:gallery
```

**Or directly:**
```bash
npx tsx scripts/migrate-gallery.ts
```

This will:
- Insert 18 existing gallery items into the database
- Set them all as "visible"
- Assign categories based on the original data

**What gets migrated:**
- Gallery item titles (image names)
- Categories
- Placeholder image URLs (from Unsplash)

**⚠️ IMPORTANT:** The gallery items use placeholder image URLs. You MUST replace them with actual images:

1. Go to `/admin/gallery`
2. Click "Edit" on each gallery item
3. Upload the actual image (it will replace the placeholder URL)
4. Save

### Step 3: Verify Migration

1. **Check Events:**
   - Visit `/admin/events` - you should see 10 events
   - Visit `/events` - events should display on the public page

2. **Check Gallery:**
   - Visit `/admin/gallery` - you should see 18 gallery items
   - Visit `/gallery` - gallery items should display on the public page

## Adding Images After Migration

### For Events:

1. Go to `/admin/events`
2. Click "Edit" on an event
3. In the "Event Images" section, click "Choose File" and select images
4. You can upload multiple images per event
5. Click "Update Event" to save

### For Gallery:

1. Go to `/admin/gallery`
2. Click "Edit" on a gallery item
3. Click "Choose File" and select the actual image
4. The placeholder URL will be replaced with your uploaded image
5. Click "Update" to save

### Quick Migration (All at Once)

If you want to migrate rooms, events, and gallery all at once:

```bash
npm run migrate:all
```

This will run all three migrations in sequence.

## Troubleshooting

### RLS Policy Error

If you get a "row-level security" error:

**Solution 1 (Recommended):** Use Service Role Key
1. Go to Supabase Dashboard > Settings > API
2. Copy the "service_role" key (NOT the anon key)
3. Add to `.env` or `.env.local`:
   ```
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```
4. Run migration again

**Solution 2:** Temporarily allow anon inserts (less secure)
Run this SQL in Supabase SQL Editor:
```sql
CREATE POLICY "Allow anon inserts for migration" ON events
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow anon inserts for migration" ON gallery
  FOR INSERT TO anon WITH CHECK (true);
```

After migration, remove these policies for security.

### Duplicate Data

If you see "existing events/gallery items found" message:
- The migration detected existing data and skipped to avoid duplicates
- If you want to re-run, delete existing events/gallery items first through the admin panel

### Images Not Showing

- Make sure Cloudinary is configured:
  - `CLOUDINARY_CLOUD_NAME`
  - `CLOUDINARY_API_KEY`
  - `CLOUDINARY_API_SECRET`
- Check that images are uploaded through the admin panel
- Verify image URLs in the database are correct

## Next Steps

After migration:

1. ✅ Add images to events through `/admin/events`
2. ✅ Replace placeholder gallery images with actual images through `/admin/gallery`
3. ✅ Review and update event dates if needed
4. ✅ Organize gallery items by category
5. ✅ Test the public pages to ensure everything displays correctly

## Support

If you encounter issues:
1. Check the console output for specific error messages
2. Verify your Supabase credentials
3. Ensure the database schema is correctly applied
4. Check that RLS policies allow the operations you're trying to perform

