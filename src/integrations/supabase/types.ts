export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      accommodations: {
        Row: {
          amenities: string[]
          created_at: string | null
          description: string
          featured: boolean | null
          id: string
          image: string
          location: string
          name: string
          price_per_night: number
          rating: number
          updated_at: string | null
        }
        Insert: {
          amenities: string[]
          created_at?: string | null
          description: string
          featured?: boolean | null
          id?: string
          image: string
          location: string
          name: string
          price_per_night: number
          rating: number
          updated_at?: string | null
        }
        Update: {
          amenities?: string[]
          created_at?: string | null
          description?: string
          featured?: boolean | null
          id?: string
          image?: string
          location?: string
          name?: string
          price_per_night?: number
          rating?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      bookings: {
        Row: {
          adults: number
          children: number
          created_at: string | null
          end_date: string
          experience_id: string
          id: string
          payment_intent_id: string | null
          special_requests: string | null
          start_date: string
          status: string
          total_price: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          adults?: number
          children?: number
          created_at?: string | null
          end_date: string
          experience_id: string
          id?: string
          payment_intent_id?: string | null
          special_requests?: string | null
          start_date: string
          status?: string
          total_price: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          adults?: number
          children?: number
          created_at?: string | null
          end_date?: string
          experience_id?: string
          id?: string
          payment_intent_id?: string | null
          special_requests?: string | null
          start_date?: string
          status?: string
          total_price?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "experiences"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          created_at: string | null
          description: string
          duration_hours: number
          featured: boolean | null
          id: string
          image: string
          instructor: string
          price: number
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          duration_hours: number
          featured?: boolean | null
          id?: string
          image: string
          instructor: string
          price: number
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          duration_hours?: number
          featured?: boolean | null
          id?: string
          image?: string
          instructor?: string
          price?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      destinations: {
        Row: {
          created_at: string | null
          description: string
          featured: boolean | null
          id: string
          image: string
          location: string
          rating: number
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          featured?: boolean | null
          id?: string
          image: string
          location: string
          rating: number
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          featured?: boolean | null
          id?: string
          image?: string
          location?: string
          rating?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      experiences: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          image_url: string | null
          location: string | null
          price: number
          title: string
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          location?: string | null
          price: number
          title: string
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string | null
          location?: string | null
          price?: number
          title?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      features: {
        Row: {
          created_at: string | null
          description: string
          featured: boolean | null
          icon: string
          id: string
          image: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          featured?: boolean | null
          icon: string
          id?: string
          image: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          featured?: boolean | null
          icon?: string
          id?: string
          image?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      guides: {
        Row: {
          bio: string
          created_at: string | null
          featured: boolean | null
          id: string
          image: string
          name: string
          specialty: string
          updated_at: string | null
          years_experience: number
        }
        Insert: {
          bio: string
          created_at?: string | null
          featured?: boolean | null
          id?: string
          image: string
          name: string
          specialty: string
          updated_at?: string | null
          years_experience: number
        }
        Update: {
          bio?: string
          created_at?: string | null
          featured?: boolean | null
          id?: string
          image?: string
          name?: string
          specialty?: string
          updated_at?: string | null
          years_experience?: number
        }
        Relationships: []
      }
      news: {
        Row: {
          author: string
          category: string
          content: string
          created_at: string | null
          featured: boolean | null
          id: string
          image: string
          published_at: string | null
          tags: string[]
          title: string
          updated_at: string | null
        }
        Insert: {
          author: string
          category: string
          content: string
          created_at?: string | null
          featured?: boolean | null
          id?: string
          image: string
          published_at?: string | null
          tags: string[]
          title: string
          updated_at?: string | null
        }
        Update: {
          author?: string
          category?: string
          content?: string
          created_at?: string | null
          featured?: boolean | null
          id?: string
          image?: string
          published_at?: string | null
          tags?: string[]
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          email: string
          first_name: string | null
          id: string
          last_name: string | null
          subscribed_at: string | null
        }
        Insert: {
          email: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          subscribed_at?: string | null
        }
        Update: {
          email?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          subscribed_at?: string | null
        }
        Relationships: []
      }
      tours: {
        Row: {
          created_at: string | null
          description: string
          destination_id: string | null
          duration_days: number
          featured: boolean | null
          id: string
          image: string
          price: number
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          destination_id?: string | null
          duration_days: number
          featured?: boolean | null
          id?: string
          image: string
          price: number
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          destination_id?: string | null
          duration_days?: number
          featured?: boolean | null
          id?: string
          image?: string
          price?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tours_destination_id_fkey"
            columns: ["destination_id"]
            isOneToOne: false
            referencedRelation: "destinations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
