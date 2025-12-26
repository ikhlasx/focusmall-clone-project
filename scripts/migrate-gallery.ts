/**
 * Migration script to populate database with existing gallery data
 * Run this after setting up Supabase and environment variables
 * 
 * Usage:
 * 1. Make sure .env or .env.local has Supabase credentials
 * 2. Run: npx tsx scripts/migrate-gallery.ts
 * 
 * Note: This script will insert gallery items with placeholder image URLs.
 * You should replace these with actual images through the admin panel.
 */

import { resolve } from 'path'
import { createClient } from '@supabase/supabase-js'

// Load environment variables from .env.local first, then .env
try {
  const dotenv = require('dotenv')
  dotenv.config({ path: resolve(process.cwd(), '.env.local') })
  dotenv.config({ path: resolve(process.cwd(), '.env') })
} catch (e) {
  console.log('Note: Loading environment variables from system or .env files')
}

// Load environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in environment variables')
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and either:')
  console.error('  - SUPABASE_SERVICE_ROLE_KEY (recommended for migrations)')
  console.error('  - OR NEXT_PUBLIC_SUPABASE_ANON_KEY (will need RLS policy update)')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Original gallery data from the gallery page
// Note: These are placeholder URLs. You should replace them with actual images through the admin panel.
const galleryData = [
  // Exterior & Architectural Views
  { title: "Emall Exterior – Day View", category: "Exterior", imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop" },
  { title: "Emall Exterior – Night View", category: "Exterior", imageUrl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=600&fit=crop" },
  { title: "Front Elevation Perspective", category: "Exterior", imageUrl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop" },
  
  // Roof Garden Restaurant
  { title: "Roof Garden Restaurant – Overview", category: "Dining", imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop" },
  { title: "Roof Garden Dining Area", category: "Dining", imageUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop" },
  { title: "Roof Garden Food Presentation", category: "Dining", imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop" },
  
  // Fitness & Wellness
  { title: "Gents Gymnasium", category: "Fitness", imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop" },
  { title: "Fitness Center – Training Area", category: "Fitness", imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop" },
  { title: "Ladies Gymnasium", category: "Fitness", imageUrl: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&h=600&fit=crop" },
  
  // Entertainment & Recreation
  { title: "Indoor Game Zone", category: "Facilities", imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop" },
  { title: "Kids Play Area", category: "Facilities", imageUrl: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=600&fit=crop" },
  
  // Retail & Shopping
  { title: "Supermarket Interior – Aisle View", category: "Shopping", imageUrl: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e4?w=800&h=600&fit=crop" },
  { title: "Supermarket Fresh Produce Section", category: "Shopping", imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=600&fit=crop" },
  
  // Facilities & Services
  { title: "Gents & Ladies Prayer Hall", category: "Facilities", imageUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=600&fit=crop" },
  
  // Meetings & Official Moments
  { title: "First Director Board Meeting – Dubai", category: "Meetings", imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop" },
  { title: "Board Meeting Group Photo", category: "Meetings", imageUrl: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&h=600&fit=crop" },
  { title: "Official Discussion Session", category: "Meetings", imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop" },
  
  // Media & Public Presence
  { title: "Emall Featured on News Channel", category: "Media", imageUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop" },
]

async function migrateGallery() {
  console.log('🚀 Starting gallery migration...\n')

  try {
    // Check if gallery items already exist
    const { count } = await supabase
      .from('gallery')
      .select('*', { count: 'exact', head: true })

    if (count && count > 0) {
      console.log(`⚠️  Found ${count} existing gallery items in database`)
      console.log('   Skipping migration to avoid duplicates')
      console.log('   Delete existing gallery items if you want to re-run migration\n')
      return
    }

    console.log(`📦 Migrating ${galleryData.length} gallery items...`)
    console.log('⚠️  Note: These items use placeholder image URLs from Unsplash')
    console.log('   You should replace them with actual images through the admin panel\n')

    // Insert gallery items
    const galleryItems = galleryData.map(item => ({
      title: item.title,
      category: item.category,
      image_url: item.imageUrl,
      cloudinary_id: null, // No Cloudinary ID for placeholder images
      is_visible: true,
    }))

    const { data: insertedItems, error } = await supabase
      .from('gallery')
      .insert(galleryItems)
      .select()

    if (error) {
      throw error
    }

    console.log(`✅ Inserted ${insertedItems?.length || 0} gallery items`)
    console.log(`\n🎉 Successfully migrated ${insertedItems?.length || 0} gallery items to database!`)
    console.log('   You can now view and manage them in the admin panel at /admin/gallery')
    console.log('   ⚠️  IMPORTANT: Replace placeholder images with actual images through the admin panel')
    console.log('      - Go to /admin/gallery')
    console.log('      - Edit each item and upload the actual image')

  } catch (error: any) {
    console.error('❌ Migration failed:', error.message)
    
    if (error.message.includes('row-level security')) {
      console.error('\n🔒 RLS Policy Error Detected!')
      console.error('   The migration script needs to bypass RLS policies.')
      console.error('\n   Solution 1 (Recommended): Use Service Role Key')
      console.error('   1. Go to Supabase Dashboard > Settings > API')
      console.error('   2. Copy the "service_role" key')
      console.error('   3. Add to .env: SUPABASE_SERVICE_ROLE_KEY=your_service_role_key')
      console.error('   4. Run migration again')
    } else {
      console.error('\n   Make sure:')
      console.error('   1. Supabase credentials are correct')
      console.error('   2. Database schema is created (run supabase-schema.sql)')
      console.error('   3. Tables exist and are accessible')
    }
    process.exit(1)
  }
}

// Run migration
migrateGallery()






