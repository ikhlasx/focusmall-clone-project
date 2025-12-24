import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// GET /api/rooms/stats - Get room statistics (admin only)
export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get total rooms
    const { count: totalRooms } = await supabase
      .from('rooms')
      .select('*', { count: 'exact', head: true })

    // Get vacant rooms
    const { count: vacantRooms } = await supabase
      .from('rooms')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'vacant')

    // Get rented rooms
    const { count: rentedRooms } = await supabase
      .from('rooms')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'rented')

    // Get business centre rooms
    const { count: businessCentreRooms } = await supabase
      .from('rooms')
      .select('*', { count: 'exact', head: true })
      .eq('category', 'Business Centre')

    return NextResponse.json({
      totalRooms: totalRooms || 0,
      vacantRooms: vacantRooms || 0,
      rentedRooms: rentedRooms || 0,
      businessCentreRooms: businessCentreRooms || 0,
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    )
  }
}


