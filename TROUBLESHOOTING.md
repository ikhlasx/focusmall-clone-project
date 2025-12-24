# Troubleshooting Guide

## Issue: No Rooms Showing in Admin Panel

### Possible Causes:

1. **Database is Empty**
   - The database hasn't been set up yet
   - No rooms have been added to the database
   - Solution: Add rooms using the "Add Room" button or run the migration script

2. **Supabase Not Configured**
   - Environment variables are missing or incorrect
   - Solution: Check `.env.local` file has correct Supabase credentials

3. **API Error**
   - Check browser console (F12) for errors
   - Check server logs for API errors
   - Solution: Verify Supabase connection and RLS policies

4. **Authentication Issue**
   - Not logged in as admin
   - Solution: Log in at `/admin/login`

### Quick Checks:

1. **Check Environment Variables**
   ```bash
   # Make sure these are set in .env.local
   NEXT_PUBLIC_SUPABASE_URL=your_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
   ```

2. **Check Database Tables**
   - Go to Supabase Dashboard > Table Editor
   - Verify `rooms` and `room_images` tables exist
   - Check if tables have any data

3. **Check Browser Console**
   - Open DevTools (F12)
   - Go to Console tab
   - Look for errors when loading `/admin/rooms`

4. **Check Network Tab**
   - Open DevTools (F12)
   - Go to Network tab
   - Refresh the page
   - Check if `/api/rooms` request is successful
   - Check the response status and data

## Issue: No Images in Gallery

### Possible Causes:

1. **No Images Uploaded**
   - Rooms don't have images attached
   - Solution: Edit room and upload images via Cloudinary

2. **Cloudinary Not Configured**
   - Environment variables missing
   - Solution: Add Cloudinary credentials to `.env.local`

3. **Image URLs Invalid**
   - Cloudinary URLs might be incorrect
   - Solution: Check `room_images` table in Supabase

### Quick Checks:

1. **Check Cloudinary Configuration**
   ```bash
   # In .env.local
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

2. **Check Room Images**
   - Go to Supabase Dashboard > Table Editor > `room_images`
   - Verify images exist for rooms
   - Check `image_url` values are valid Cloudinary URLs

3. **Test Image Upload**
   - Go to `/admin/rooms/new`
   - Try uploading an image
   - Check if upload succeeds

## Common Error Messages

### "Failed to fetch rooms"
- **Cause**: API request failed
- **Solution**: Check Supabase connection, verify environment variables

### "Unauthorized"
- **Cause**: Not logged in or session expired
- **Solution**: Log in again at `/admin/login`

### "No rooms found"
- **Cause**: Database is empty
- **Solution**: Add rooms using the admin panel

### "Failed to upload image"
- **Cause**: Cloudinary configuration issue
- **Solution**: Verify Cloudinary credentials in `.env.local`

## Debugging Steps

1. **Enable Console Logging**
   - The admin panel now logs fetched rooms to console
   - Check browser console for "Fetched rooms:" message

2. **Check API Response**
   - Open Network tab in DevTools
   - Find `/api/rooms` request
   - Check Response tab for data or errors

3. **Verify Database Connection**
   - Go to Supabase Dashboard
   - Check if you can query tables manually
   - Verify RLS policies allow reads

4. **Test API Directly**
   - Visit `http://localhost:3000/api/rooms` in browser
   - Should return JSON array (empty if no rooms)

## Still Having Issues?

1. Check that all environment variables are set correctly
2. Verify Supabase project is active
3. Ensure database schema is created (run `supabase-schema.sql`)
4. Check that you're logged in as admin
5. Verify Cloudinary account is active
6. Check server logs for detailed error messages

