import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// GET /api/events/[id] - Get single event
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(req.url)
    const isAdmin = searchParams.get('admin') === 'true'

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
      .eq('id', params.id)
      .single()

    // Public: only published events
    if (!isAdmin) {
      query = query.eq('status', 'published')
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in GET /api/events/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/events/[id] - Update event (admin only)
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

    // Build update object
    const updateData: any = {
      updated_at: new Date().toISOString(),
    }

    if (title !== undefined) {
      updateData.title = title
      // Regenerate slug if title changes
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      
      const { data: existing } = await supabase
        .from('events')
        .select('id')
        .eq('slug', slug)
        .neq('id', params.id)
        .single()

      updateData.slug = existing ? `${slug}-${Date.now()}` : slug
    }

    if (description !== undefined) updateData.description = description
    if (event_date !== undefined) updateData.event_date = event_date || null
    if (status !== undefined) updateData.status = status
    if (display_order !== undefined) updateData.display_order = display_order

    // Update event
    const { error: updateError } = await supabase
      .from('events')
      .update(updateData)
      .eq('id', params.id)

    if (updateError) {
      console.error('Error updating event:', updateError)
      return NextResponse.json({ error: 'Failed to update event' }, { status: 500 })
    }

    // Update images if provided
    if (images !== undefined) {
      // Delete existing images
      await supabase.from('event_images').delete().eq('event_id', params.id)

      // Insert new images
      if (images.length > 0) {
        const imageInserts = images.map((img: { image_url: string; cloudinary_id: string }, index: number) => ({
          event_id: params.id,
          image_url: img.image_url,
          cloudinary_id: img.cloudinary_id,
          display_order: index,
        }))

        const { error: imagesError } = await supabase
          .from('event_images')
          .insert(imageInserts)

        if (imagesError) {
          console.error('Error updating event images:', imagesError)
        }
      }
    }

    // Fetch updated event
    const { data: updatedEvent } = await supabase
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
      .eq('id', params.id)
      .single()

    return NextResponse.json(updatedEvent)
  } catch (error) {
    console.error('Error in PUT /api/events/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/events/[id] - Delete event (admin only)
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Delete event (cascade will delete images)
    const { error } = await supabase
      .from('events')
      .delete()
      .eq('id', params.id)

    if (error) {
      console.error('Error deleting event:', error)
      return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Event deleted successfully' })
  } catch (error) {
    console.error('Error in DELETE /api/events/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

