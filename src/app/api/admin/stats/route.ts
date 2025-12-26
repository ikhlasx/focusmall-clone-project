import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch all stats in parallel
    const [roomsResult, eventsResult, galleryResult] = await Promise.all([
      // Rooms stats
      supabase
        .from('rooms')
        .select('status, category', { count: 'exact' }),
      // Events stats
      supabase
        .from('events')
        .select('status', { count: 'exact' }),
      // Gallery stats
      supabase
        .from('gallery')
        .select('is_visible', { count: 'exact' }),
    ])

    const rooms = roomsResult.data || []
    const events = eventsResult.data || []
    const gallery = galleryResult.data || []

    const stats = {
      rooms: {
        total: roomsResult.count || 0,
        vacant: rooms.filter((r) => r.status === 'vacant').length,
        rented: rooms.filter((r) => r.status === 'rented').length,
        businessCentre: rooms.filter((r) => r.category === 'Business Centre').length,
      },
      events: {
        total: eventsResult.count || 0,
        published: events.filter((e) => e.status === 'published').length,
        draft: events.filter((e) => e.status === 'draft').length,
      },
      gallery: {
        total: galleryResult.count || 0,
        visible: gallery.filter((g) => g.is_visible).length,
        hidden: gallery.filter((g) => !g.is_visible).length,
      },
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching admin stats:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}






