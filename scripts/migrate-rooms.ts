/**
 * Migration script to populate database with existing room data
 * Run this after setting up Supabase and environment variables
 * 
 * Usage:
 * 1. Make sure .env or .env.local has Supabase credentials
 * 2. Run: npx tsx scripts/migrate-rooms.ts
 */

import { resolve } from 'path'
import { createClient } from '@supabase/supabase-js'
import { shopRooms, businessCentreRooms } from '../src/lib/room-data'

// Load environment variables from .env.local first, then .env
try {
  // Try to load dotenv if available
  const dotenv = require('dotenv')
  dotenv.config({ path: resolve(process.cwd(), '.env.local') })
  dotenv.config({ path: resolve(process.cwd(), '.env') })
} catch (e) {
  // dotenv not available, try to load manually or use system env vars
  console.log('Note: Loading environment variables from system or .env files')
}

// Load environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
// Use service role key for migrations (bypasses RLS) or fallback to anon key
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in environment variables')
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and either:')
  console.error('  - SUPABASE_SERVICE_ROLE_KEY (recommended for migrations)')
  console.error('  - OR NEXT_PUBLIC_SUPABASE_ANON_KEY (will need RLS policy update)')
  console.error('\nMake sure you have a .env or .env.local file in the root directory')
  console.error('\nTo get Service Role Key:')
  console.error('  1. Go to Supabase Dashboard > Settings > API')
  console.error('  2. Copy the "service_role" key (NOT the anon key)')
  console.error('  3. Add to .env: SUPABASE_SERVICE_ROLE_KEY=your_service_role_key')
  console.error('\n⚠️  WARNING: Service Role Key bypasses all security!')
  console.error('   Never commit it to git or expose it publicly.')
  console.error('\nCurrent working directory:', process.cwd())
  process.exit(1)
}

// Use service role key if available (bypasses RLS), otherwise use anon key
const isUsingServiceRole = !!process.env.SUPABASE_SERVICE_ROLE_KEY
if (isUsingServiceRole) {
  console.log('✅ Using Service Role Key (bypasses RLS)')
} else {
  console.log('⚠️  Using Anon Key - make sure RLS policies allow inserts')
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Convert shop rooms to database format
function convertShopRoom(room: any) {
  return {
    room_number: room.number.toString(),
    title: room.name === 'VACANT' ? room.shopDetails : room.name,
    block: room.block,
    floor: room.floor || null,
    category: 'Shop Room',
    rent: room.rentPerSqFt,
    status: room.status === 'Vacant' ? 'vacant' : 'rented',
    description: room.remarks || room.shopDetails || null,
  }
}

// Convert business centre rooms to database format
function convertBusinessCentreRoom(room: any) {
  return {
    room_number: room.number.toString(),
    title: room.name === 'VACANT' ? room.type : room.name,
    block: room.block,
    floor: null,
    category: 'Business Centre',
    rent: room.rate,
    status: room.status === 'Vacant' ? 'vacant' : 'rented',
    description: room.remarks || `${room.type} - ${room.quantity} units available` || null,
  }
}

async function migrateRooms() {
  console.log('🚀 Starting room migration...\n')

  try {
    // Check if rooms already exist
    const { count } = await supabase
      .from('rooms')
      .select('*', { count: 'exact', head: true })

    if (count && count > 0) {
      console.log(`⚠️  Found ${count} existing rooms in database`)
      console.log('   Skipping migration to avoid duplicates')
      console.log('   Delete existing rooms if you want to re-run migration\n')
      return
    }

    // Convert and insert shop rooms
    console.log('📦 Converting shop rooms...')
    const shopRoomsData = shopRooms.map(convertShopRoom)
    
    const { data: insertedShopRooms, error: shopError } = await supabase
      .from('rooms')
      .insert(shopRoomsData)
      .select()

    if (shopError) {
      throw shopError
    }

    console.log(`✅ Inserted ${insertedShopRooms?.length || 0} shop rooms`)

    // Convert and insert business centre rooms
    console.log('📦 Converting business centre rooms...')
    const businessRoomsData = businessCentreRooms.map(convertBusinessCentreRoom)
    
    const { data: insertedBusinessRooms, error: businessError } = await supabase
      .from('rooms')
      .insert(businessRoomsData)
      .select()

    if (businessError) {
      throw businessError
    }

    console.log(`✅ Inserted ${insertedBusinessRooms?.length || 0} business centre rooms`)

    const total = (insertedShopRooms?.length || 0) + (insertedBusinessRooms?.length || 0)
    console.log(`\n🎉 Successfully migrated ${total} rooms to database!`)
    console.log('   You can now view them in the admin panel at /admin/rooms')

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
      console.error('\n   Solution 2: Update RLS Policies')
      console.error('   Run this SQL in Supabase SQL Editor:')
      console.error('   CREATE POLICY "Allow anon inserts" ON rooms FOR INSERT TO anon USING (true);')
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
migrateRooms()

