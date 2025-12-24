import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// PUT /api/gallery/[id] - Update gallery item (admin only)
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
    const { title, category, image_url, cloudinary_id, is_visible } = body

    const updateData: any = {}
    if (title !== undefined) updateData.title = title
    if (category !== undefined) updateData.category = category || null
    if (image_url !== undefined) updateData.image_url = image_url
    if (cloudinary_id !== undefined) updateData.cloudinary_id = cloudinary_id || null
    if (is_visible !== undefined) updateData.is_visible = is_visible

    const { data, error } = await supabase
      .from('gallery')
      .update(updateData)
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      console.error('Error updating gallery item:', error)
      return NextResponse.json({ error: 'Failed to update gallery item' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in PUT /api/gallery/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/gallery/[id] - Delete gallery item (admin only)
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

    const { error } = await supabase
      .from('gallery')
      .delete()
      .eq('id', params.id)

    if (error) {
      console.error('Error deleting gallery item:', error)
      return NextResponse.json({ error: 'Failed to delete gallery item' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Gallery item deleted successfully' })
  } catch (error) {
    console.error('Error in DELETE /api/gallery/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

