export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
  public: {
    Tables: {
      events: {
        Row: {
          id: string
          title: string
          tag: string
          date: string
          venue: string
          description: string
          registration_link: string | null
          is_upcoming: boolean
          attendance: number | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['events']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['events']['Insert']>
      }
      publications: {
        Row: {
          id: string
          title: string
          authors: string
          category: string
          year: number
          abstract: string
          pdf_link: string | null
          cover_image?: string | null
          is_free: boolean
          read_time: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['publications']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['publications']['Insert']>
      }
      team_members: {
        Row: {
          id: string
          name: string
          role: string
          vertical: string | null
          headshot_url: string | null
          linkedin_url: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['team_members']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['team_members']['Insert']>
      }
      faqs: {
        Row: {
          id: string
          question: string
          answer: string
          sort_order: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['faqs']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['faqs']['Insert']>
      }
      testimonials: {
        Row: {
          id: string
          quote: string
          author_name: string
          author_role: string
          headshot_url: string | null
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['testimonials']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['testimonials']['Insert']>
      }
      partnership_inquiries: {
        Row: {
          id: string
          name: string
          organisation: string
          email: string
          message: string
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['partnership_inquiries']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['partnership_inquiries']['Insert']>
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}
