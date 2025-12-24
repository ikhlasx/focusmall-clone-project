/**
 * Migration script to populate database with existing event data
 * Run this after setting up Supabase and environment variables
 * 
 * Usage:
 * 1. Make sure .env or .env.local has Supabase credentials
 * 2. Run: npx tsx scripts/migrate-events.ts
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

// Original events data from the events page
const eventsData = [
  {
    title: "Foundation Stone Laying Ceremony of Emall",
    description: "The foundation stone laying ceremony marked the beginning of Emall's vision to create a modern commercial destination. The event was held in the presence of respected leaders, partners, and well-wishers, symbolizing a strong start built on trust and collaboration.",
    event_date: null,
    status: "published" as const,
    display_order: 0,
  },
  {
    title: "Foundation Stone Laying Function – Public Gathering",
    description: "A large gathering of guests and stakeholders attended the foundation ceremony, reflecting the strong community support behind Emall. The event showcased transparency, vision, and collective enthusiasm for the project.",
    event_date: null,
    status: "published" as const,
    display_order: 1,
  },
  {
    title: "Partnership Document Distribution Ceremony",
    description: "This event formalized key partnerships that play a vital role in the development of Emall. Official documents were distributed to partners, reinforcing long-term collaboration and shared goals.",
    event_date: null,
    status: "published" as const,
    display_order: 2,
  },
  {
    title: "International Launch Ceremony of Emall – Dubai",
    description: "The international launch of Emall in Dubai marked a significant milestone, introducing the project to a global audience. The event highlighted Emall's vision, scale, and opportunities for international collaboration.",
    event_date: null,
    status: "published" as const,
    display_order: 3,
  },
  {
    title: "Official Launch Ceremony of Emall",
    description: "The official launch ceremony celebrated the unveiling of Emall as a landmark commercial project. Leaders, partners, and guests came together to mark this proud moment in Emall's journey.",
    event_date: null,
    status: "published" as const,
    display_order: 4,
  },
  {
    title: "Leadership Speeches & Vision Presentation",
    description: "During the launch event, leaders shared insights into Emall's vision, future plans, and commitment to creating a sustainable business ecosystem.",
    event_date: null,
    status: "published" as const,
    display_order: 5,
  },
  {
    title: "Shareholders ID Distribution Ceremony",
    description: "This event honored the shareholders who contributed to the growth of Emall. Shareholder ID cards were formally distributed as a symbol of trust and partnership.",
    event_date: null,
    status: "published" as const,
    display_order: 6,
  },
  {
    title: "Raffle Coupon Winner Announcement Ceremony",
    description: "A celebratory event recognizing raffle coupon winners, adding excitement and engagement to the Emall launch celebrations.",
    event_date: null,
    status: "published" as const,
    display_order: 7,
  },
  {
    title: "Honouring Key Supporters of Emall",
    description: "This ceremony acknowledged individuals and partners who supported Emall throughout its development journey. Their contributions were formally recognized and appreciated.",
    event_date: null,
    status: "published" as const,
    display_order: 8,
  },
  {
    title: "Emall Business Promotion & Expo Participation",
    description: "Emall actively participated in business expos and promotional events to showcase its commercial spaces, business opportunities, and future vision to a wider audience.",
    event_date: null,
    status: "published" as const,
    display_order: 9,
  },
]

// Generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

async function migrateEvents() {
  console.log('🚀 Starting events migration...\n')

  try {
    // Check if events already exist
    const { count } = await supabase
      .from('events')
      .select('*', { count: 'exact', head: true })

    if (count && count > 0) {
      console.log(`⚠️  Found ${count} existing events in database`)
      console.log('   Skipping migration to avoid duplicates')
      console.log('   Delete existing events if you want to re-run migration\n')
      return
    }

    console.log(`📦 Migrating ${eventsData.length} events...`)

    // Insert events one by one to handle slug uniqueness
    let insertedCount = 0
    for (const eventData of eventsData) {
      let slug = generateSlug(eventData.title)
      
      // Check if slug exists and make it unique if needed
      const { data: existing } = await supabase
        .from('events')
        .select('id')
        .eq('slug', slug)
        .single()

      if (existing) {
        slug = `${slug}-${Date.now()}`
      }

      const { data: event, error } = await supabase
        .from('events')
        .insert({
          title: eventData.title,
          slug: slug,
          description: eventData.description,
          event_date: eventData.event_date,
          status: eventData.status,
          display_order: eventData.display_order,
        })
        .select()
        .single()

      if (error) {
        console.error(`❌ Error inserting event "${eventData.title}":`, error.message)
        continue
      }

      insertedCount++
      console.log(`✅ Inserted: ${eventData.title}`)
    }

    console.log(`\n🎉 Successfully migrated ${insertedCount} events to database!`)
    console.log('   You can now view and manage them in the admin panel at /admin/events')
    console.log('   You can add images to each event through the admin panel')

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
migrateEvents()

