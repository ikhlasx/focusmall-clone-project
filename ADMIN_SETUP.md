# EMALL Admin Panel Setup Guide

This guide will help you set up the admin panel for the EMALL project.

## Prerequisites

- Node.js installed
- Supabase account (free tier available)
- Cloudinary account (free tier available)

## Step 1: Set Up Supabase

1. **Create a Supabase Project**
   - Go to [https://supabase.com](https://supabase.com)
   - Create a new project
   - Note down your project URL and anon key

2. **Set Up Database Schema**
   - In Supabase Dashboard, go to SQL Editor
   - Run the SQL from `supabase-schema.sql` file
   - This creates the `rooms` and `room_images` tables

3. **Set Up Authentication**
   - Go to Authentication > Users in Supabase Dashboard
   - Create an admin user (email + password)
   - Or use the Sign Up page to create your first admin account

## Step 2: Set Up Cloudinary

1. **Create a Cloudinary Account**
   - Go to [https://cloudinary.com](https://cloudinary.com)
   - Sign up for free account
   - Go to Dashboard

2. **Get Your Credentials**
   - Cloud Name (found in Dashboard)
   - API Key (found in Dashboard)
   - API Secret (found in Dashboard)

## Step 3: Configure Environment Variables

1. **Create `.env.local` file** in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

2. Replace the placeholder values with your actual credentials

## Step 4: Install Dependencies

```bash
npm install
```

## Step 5: Run the Development Server

```bash
npm run dev
```

## Step 6: Access Admin Panel

1. Navigate to `http://localhost:3000/admin/login`
2. Log in with your Supabase admin credentials
3. You'll be redirected to the admin dashboard

## Admin Panel Features

### Dashboard (`/admin`)
- View statistics:
  - Total Rooms
  - Vacant Rooms
  - Rented Rooms
  - Business Centre Rooms

### Room Management (`/admin/rooms`)
- View all rooms in a grid
- Search and filter rooms
- Toggle room status (Vacant ↔ Rented)
- Edit room details
- Delete rooms

### Add New Room (`/admin/rooms/new`)
- Create new room with:
  - Room number
  - Title
  - Block (A Block / B Block)
  - Floor
  - Category
  - Rent
  - Status
  - Description
  - Images (uploaded to Cloudinary)

### Edit Room (`/admin/rooms/[id]/edit`)
- Update all room details
- Manage images
- Change status

## Public Website

The public website at `/rooms` automatically fetches only **vacant** rooms from the database and displays them.

## Security Notes

- Admin routes are protected by Supabase authentication
- Only authenticated users can create, update, or delete rooms
- Public users can only view vacant rooms
- Cloudinary API secrets are never exposed to the client

## Database Schema

### `rooms` table
- `id` (UUID, Primary Key)
- `room_number` (VARCHAR)
- `title` (VARCHAR)
- `block` (VARCHAR)
- `floor` (VARCHAR, nullable)
- `category` (VARCHAR)
- `rent` (DECIMAL)
- `status` (VARCHAR: 'vacant' or 'rented')
- `description` (TEXT, nullable)
- `created_at` (TIMESTAMP)

### `room_images` table
- `id` (UUID, Primary Key)
- `room_id` (UUID, Foreign Key to rooms)
- `image_url` (TEXT)
- `cloudinary_id` (VARCHAR, nullable)
- `created_at` (TIMESTAMP)

## Troubleshooting

### No Rooms Showing

**If you see "No rooms found" in the admin panel:**

1. **Database is Empty** (Most Common)
   - The database hasn't been populated yet
   - **Solution**: Add rooms using the "Add Room" button, or run the migration script:
     ```bash
     # Install tsx if needed
     npm install -D tsx
     
     # Run migration (requires .env.local with Supabase credentials)
     npx tsx scripts/migrate-rooms.ts
     ```

2. **Check Environment Variables**
   - Verify `.env.local` exists and has correct Supabase credentials
   - Restart dev server after changing environment variables

3. **Check Browser Console**
   - Open DevTools (F12) > Console tab
   - Look for error messages
   - Check for "Fetched rooms:" log message

4. **Check Network Tab**
   - Open DevTools (F12) > Network tab
   - Refresh `/admin/rooms` page
   - Find `/api/rooms` request
   - Check if it returns 200 status and data

5. **Verify Database Setup**
   - Go to Supabase Dashboard > Table Editor
   - Check if `rooms` table exists
   - Verify RLS policies allow reads

### No Images in Gallery

**If room detail modal shows "Room images coming soon":**

1. **No Images Uploaded**
   - Rooms don't have images attached yet
   - **Solution**: Edit room and upload images via Cloudinary

2. **Cloudinary Not Configured**
   - Check `.env.local` has Cloudinary credentials
   - Restart dev server after adding credentials

3. **Image Upload Fails**
   - Verify Cloudinary credentials are correct
   - Check file size (max 5MB)
   - Ensure file is an image format (JPG, PNG, etc.)

### "Unauthorized" errors
- Make sure you're logged in at `/admin/login`
- Check that your Supabase credentials are correct
- Verify RLS policies in Supabase allow authenticated users

### Rooms not showing on public site
- Check that rooms have `status = 'vacant'`
- Verify API route is working: `/api/rooms?status=vacant`
- Check browser console for errors
- Only vacant rooms are shown to public users

### Common Issues

**"Failed to fetch rooms"**
- Check Supabase connection
- Verify environment variables
- Check Supabase project is active

**"No rooms found"**
- Database is empty (this is normal for new setup)
- Add rooms using admin panel or migration script

**Images not loading**
- Check Cloudinary configuration
- Verify image URLs in `room_images` table
- Check Next.js image configuration allows Cloudinary domain

## Next Steps

- Customize admin role checking (currently any authenticated user can access)
- Add audit logging for room changes
- Implement bulk operations
- Add CSV import functionality
- Set up email notifications for new room bookings


