import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// GET /api/events - Get all events (public: only published, admin: all)
export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')
    const isAdmin = searchParams.get('admin') === 'true'

    // Check if admin request
    if (isAdmin) {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
    }

    let query = supabase
      .from('events')
      .select(`
        *,
        event_images (
          id,
          image_url,
          cloudinary_id,
          display_order
        )
      `)
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: false })

    // Public: only published events
    if (!isAdmin) {
      query = query.eq('status', 'published')
    } else if (status) {
      query = query.eq('status', status)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching events:', error)
      return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in GET /api/events:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/events - Create new event (admin only)
export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { title, description, event_date, status, display_order, images } = body

    if (!title || !description) {
      return NextResponse.json({ error: 'Title and description are required' }, { status: 400 })
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    // Check if slug exists
    const { data: existing } = await supabase
      .from('events')
      .select('id')
      .eq('slug', slug)
      .single()

    let finalSlug = slug
    if (existing) {
      finalSlug = `${slug}-${Date.now()}`
    }

    // Create event
    const { data: event, error: eventError } = await supabase
      .from('events')
      .insert({
        title,
        slug: finalSlug,
        description,
        event_date: event_date || null,
        status: status || 'draft',
        display_order: display_order || 0,
      })
      .select()
      .single()

    if (eventError) {
      console.error('Error creating event:', eventError)
      return NextResponse.json({ error: 'Failed to create event' }, { status: 500 })
    }

    // Add images if provided
    if (images && images.length > 0) {
      const imageInserts = images.map((img: { image_url: string; cloudinary_id: string }, index: number) => ({
        event_id: event.id,
        image_url: img.image_url,
        cloudinary_id: img.cloudinary_id,
        display_order: index,
      }))

      const { error: imagesError } = await supabase
        .from('event_images')
        .insert(imageInserts)

      if (imagesError) {
        console.error('Error adding event images:', imagesError)
        // Don't fail the request, just log the error
      }
    }

    // Fetch the complete event with images
    const { data: completeEvent } = await supabase
      .from('events')
      .select(`
        *,
        event_images (
          id,
          image_url,
          cloudinary_id,
          display_order
        )
      `)
      .eq('id', event.id)
      .single()

    return NextResponse.json(completeEvent, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/events:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

