export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      rooms: {
        Row: {
          id: string
          room_number: string
          title: string
          block: string
          floor: string | null
          category: string
          rent: number
          status: 'vacant' | 'rented'
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          room_number: string
          title: string
          block: string
          floor?: string | null
          category: string
          rent: number
          status?: 'vacant' | 'rented'
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          room_number?: string
          title?: string
          block?: string
          floor?: string | null
          category?: string
          rent?: number
          status?: 'vacant' | 'rented'
          description?: string | null
          created_at?: string
        }
      }
      room_images: {
        Row: {
          id: string
          room_id: string
          image_url: string
          cloudinary_id: string | null
          created_at: string
        }
        Insert: {
          id?: string
          room_id: string
          image_url: string
          cloudinary_id?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          room_id?: string
          image_url?: string
          cloudinary_id?: string | null
          created_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          slug: string
          description: string
          event_date: string | null
          status: 'published' | 'draft'
          display_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          description: string
          event_date?: string | null
          status?: 'published' | 'draft'
          display_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          description?: string
          event_date?: string | null
          status?: 'published' | 'draft'
          display_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      event_images: {
        Row: {
          id: string
          event_id: string
          image_url: string
          cloudinary_id: string | null
          display_order: number
          created_at: string
        }
        Insert: {
          id?: string
          event_id: string
          image_url: string
          cloudinary_id?: string | null
          display_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          event_id?: string
          image_url?: string
          cloudinary_id?: string | null
          display_order?: number
          created_at?: string
        }
      }
      gallery: {
        Row: {
          id: string
          title: string
          category: string | null
          image_url: string
          cloudinary_id: string | null
          is_visible: boolean
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          category?: string | null
          image_url: string
          cloudinary_id?: string | null
          is_visible?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          category?: string | null
          image_url?: string
          cloudinary_id?: string | null
          is_visible?: boolean
          created_at?: string
        }
      }
    }
  }
}


