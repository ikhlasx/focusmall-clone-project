import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// GET /api/rooms - Get all rooms (public)
export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(req.url)
    const status = searchParams.get('status')

    let query = supabase
      .from('rooms')
      .select(`
        *,
        room_images (
          id,
          image_url,
          cloudinary_id
        )
      `)
      .order('block', { ascending: true })
      .order('room_number', { ascending: true })

    // Filter by status if provided
    if (status && (status === 'vacant' || status === 'rented')) {
      query = query.eq('status', status)
    }

    const { data, error } = await query

    if (error) {
      console.error('Supabase query error:', error)
      throw error
    }

    // Return empty array if no data (not an error)
    return NextResponse.json(data || [])
  } catch (error: any) {
    console.error('Error fetching rooms:', error)
    return NextResponse.json(
      { 
        error: error.message || 'Failed to fetch rooms',
        details: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}

// POST /api/rooms - Create new room (admin only)
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
    const {
      room_number,
      title,
      block,
      floor,
      category,
      rent,
      status = 'vacant',
      description,
      images = [],
    } = body

    // Validate required fields
    if (!room_number || !title || !block || !category || rent === undefined) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Insert room
    const { data: room, error: roomError } = await supabase
      .from('rooms')
      .insert({
        room_number,
        title,
        block,
        floor: floor || null,
        category,
        rent: parseFloat(rent),
        status,
        description: description || null,
      })
      .select()
      .single()

    if (roomError) {
      throw roomError
    }

    // Insert images if provided
    if (images.length > 0 && room) {
      const imageInserts = images.map((img: { image_url: string; cloudinary_id?: string }) => ({
        room_id: room.id,
        image_url: img.image_url,
        cloudinary_id: img.cloudinary_id || null,
      }))

      const { error: imageError } = await supabase
        .from('room_images')
        .insert(imageInserts)

      if (imageError) {
        console.error('Error inserting images:', imageError)
        // Don't fail the request if images fail
      }
    }

    // Fetch room with images
    const { data: roomWithImages, error: fetchError } = await supabase
      .from('rooms')
      .select(`
        *,
        room_images (
          id,
          image_url,
          cloudinary_id
        )
      `)
      .eq('id', room.id)
      .single()

    if (fetchError) {
      throw fetchError
    }

    return NextResponse.json(roomWithImages, { status: 201 })
  } catch (error: any) {
    console.error('Error creating room:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create room' },
      { status: 500 }
    )
  }
}


