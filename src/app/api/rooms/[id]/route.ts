import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// GET /api/rooms/[id] - Get single room
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    const { data, error } = await supabase
      .from('rooms')
      .select(`
        *,
        room_images (
          id,
          image_url,
          cloudinary_id
        )
      `)
      .eq('id', id)
      .single()

    if (error) {
      throw error
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching room:', error)
    return NextResponse.json(
      { error: 'Room not found' },
      { status: 404 }
    )
  }
}

// PUT /api/rooms/[id] - Update room (admin only)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
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
      status,
      description,
      images,
    } = body

    // Build update object
    const updateData: any = {}
    if (room_number !== undefined) updateData.room_number = room_number
    if (title !== undefined) updateData.title = title
    if (block !== undefined) updateData.block = block
    if (floor !== undefined) updateData.floor = floor
    if (category !== undefined) updateData.category = category
    if (rent !== undefined) updateData.rent = parseFloat(rent)
    if (status !== undefined) updateData.status = status
    if (description !== undefined) updateData.description = description

    // Update room
    const { error: updateError } = await supabase
      .from('rooms')
      .update(updateData)
      .eq('id', id)

    if (updateError) {
      throw updateError
    }

    // Handle images if provided
    if (images !== undefined) {
      // Delete existing images
      await supabase.from('room_images').delete().eq('room_id', id)

      // Insert new images
      if (Array.isArray(images) && images.length > 0) {
        const imageInserts = images.map((img: { image_url: string; cloudinary_id?: string }) => ({
          room_id: id,
          image_url: img.image_url,
          cloudinary_id: img.cloudinary_id || null,
        }))

        await supabase.from('room_images').insert(imageInserts)
      }
    }

    // Fetch updated room with images
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
      .eq('id', id)
      .single()

    if (fetchError) {
      throw fetchError
    }

    return NextResponse.json(roomWithImages)
  } catch (error: any) {
    console.error('Error updating room:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update room' },
      { status: 500 }
    )
  }
}

// DELETE /api/rooms/[id] - Delete room (admin only)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Delete room (cascade will delete images)
    const { error } = await supabase.from('rooms').delete().eq('id', id)

    if (error) {
      throw error
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error deleting room:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to delete room' },
      { status: 500 }
    )
  }
}


