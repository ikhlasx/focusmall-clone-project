import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// GET /api/gallery - Get all gallery items (public: only visible, admin: all)
export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
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
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false })

    // Public: only visible items
    if (!isAdmin) {
      query = query.eq('is_visible', true)
    }

    // Filter by category if provided
    if (category && category !== 'All') {
      query = query.eq('category', category)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching gallery:', error)
      return NextResponse.json({ error: 'Failed to fetch gallery' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error in GET /api/gallery:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/gallery - Add gallery item (admin only)
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
    const { title, category, image_url, cloudinary_id, is_visible } = body

    if (!title || !image_url) {
      return NextResponse.json({ error: 'Title and image URL are required' }, { status: 400 })
    }

    const { data: galleryItem, error } = await supabase
      .from('gallery')
      .insert({
        title,
        category: category || null,
        image_url,
        cloudinary_id: cloudinary_id || null,
        is_visible: is_visible !== undefined ? is_visible : true,
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating gallery item:', error)
      return NextResponse.json({ error: 'Failed to create gallery item' }, { status: 500 })
    }

    return NextResponse.json(galleryItem, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/gallery:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}






