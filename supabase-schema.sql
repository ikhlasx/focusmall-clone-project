-- Create rooms table
CREATE TABLE IF NOT EXISTS rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_number VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  block VARCHAR(50) NOT NULL,
  floor VARCHAR(50),
  category VARCHAR(100) NOT NULL,
  rent DECIMAL(10, 2) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'vacant' CHECK (status IN ('vacant', 'rented')),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create room_images table
CREATE TABLE IF NOT EXISTS room_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  cloudinary_id VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_rooms_status ON rooms(status);
CREATE INDEX IF NOT EXISTS idx_rooms_block ON rooms(block);
CREATE INDEX IF NOT EXISTS idx_rooms_category ON rooms(category);
CREATE INDEX IF NOT EXISTS idx_room_images_room_id ON room_images(room_id);

-- Enable Row Level Security (RLS)
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE room_images ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist, then create new ones
DROP POLICY IF EXISTS "Public can read rooms" ON rooms;
DROP POLICY IF EXISTS "Public can read room_images" ON room_images;
DROP POLICY IF EXISTS "Admins can manage rooms" ON rooms;
DROP POLICY IF EXISTS "Admins can manage room_images" ON room_images;

-- Policy: Anyone can read rooms (public access)
CREATE POLICY "Public can read rooms" ON rooms
  FOR SELECT
  USING (true);

-- Policy: Anyone can read room images (public access)
CREATE POLICY "Public can read room_images" ON room_images
  FOR SELECT
  USING (true);

-- Policy: Only authenticated admins can insert/update/delete rooms
-- Note: You'll need to set up admin role checking in your application
-- For now, we'll allow authenticated users (you can refine this later)
CREATE POLICY "Admins can manage rooms" ON rooms
  FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can manage room_images" ON room_images
  FOR ALL
  USING (auth.role() = 'authenticated');

-- Alternative: Allow anon inserts for migrations (less secure, remove after migration)
-- Uncomment the lines below if you want to allow inserts without authentication
-- Then comment them out after migration is complete
-- CREATE POLICY "Allow anon inserts for migration" ON rooms
--   FOR INSERT
--   TO anon
--   WITH CHECK (true);
--
-- CREATE POLICY "Allow anon inserts for migration" ON room_images
--   FOR INSERT
--   TO anon
--   WITH CHECK (true);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  event_date DATE,
  status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('published', 'draft')),
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create event_images table
CREATE TABLE IF NOT EXISTS event_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  cloudinary_id VARCHAR(255),
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create gallery table
CREATE TABLE IF NOT EXISTS gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  category VARCHAR(50),
  image_url TEXT NOT NULL,
  cloudinary_id VARCHAR(255),
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_events_slug ON events(slug);
CREATE INDEX IF NOT EXISTS idx_events_display_order ON events(display_order);
CREATE INDEX IF NOT EXISTS idx_event_images_event_id ON event_images(event_id);
CREATE INDEX IF NOT EXISTS idx_event_images_display_order ON event_images(display_order);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery(category);
CREATE INDEX IF NOT EXISTS idx_gallery_visible ON gallery(is_visible);

-- Enable Row Level Security (RLS)
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist, then create new ones
DROP POLICY IF EXISTS "Public can read published events" ON events;
DROP POLICY IF EXISTS "Public can read event images" ON event_images;
DROP POLICY IF EXISTS "Public can read visible gallery" ON gallery;
DROP POLICY IF EXISTS "Admins can manage events" ON events;
DROP POLICY IF EXISTS "Admins can manage event_images" ON event_images;
DROP POLICY IF EXISTS "Admins can manage gallery" ON gallery;

-- Policy: Public can read published events
CREATE POLICY "Public can read published events" ON events
  FOR SELECT
  USING (status = 'published');

-- Policy: Public can read event images for published events
CREATE POLICY "Public can read event images" ON event_images
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM events 
      WHERE events.id = event_images.event_id 
      AND events.status = 'published'
    )
  );

-- Policy: Public can read visible gallery items
CREATE POLICY "Public can read visible gallery" ON gallery
  FOR SELECT
  USING (is_visible = true);

-- Policy: Admins can manage events
CREATE POLICY "Admins can manage events" ON events
  FOR ALL
  USING (auth.role() = 'authenticated');

-- Policy: Admins can manage event_images
CREATE POLICY "Admins can manage event_images" ON event_images
  FOR ALL
  USING (auth.role() = 'authenticated');

-- Policy: Admins can manage gallery
CREATE POLICY "Admins can manage gallery" ON gallery
  FOR ALL
  USING (auth.role() = 'authenticated');


