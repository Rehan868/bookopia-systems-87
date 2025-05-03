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
      audit_logs: {
        Row: {
          action: string
          created_at: string | null
          id: string
          new_values: Json | null
          old_values: Json | null
          record_id: string | null
          table_name: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          id?: string
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          id?: string
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      bookings: {
        Row: {
          adults: number | null
          amount_paid: number | null
          base_rate: number
          check_in_date: string
          check_out_date: string
          children: number | null
          commission: number | null
          created_at: string | null
          created_by: string | null
          guest_email: string | null
          guest_id: string
          guest_name: string | null
          guest_phone: string | null
          id: string
          net_to_owner: number | null
          notes: string | null
          payment_status: Database["public"]["Enums"]["payment_status"] | null
          reference: string
          room_id: string
          security_deposit: number | null
          status: Database["public"]["Enums"]["booking_status"] | null
          total_amount: number
          tourism_fee: number | null
          updated_at: string | null
          vat: number | null
        }
        Insert: {
          adults?: number | null
          amount_paid?: number | null
          base_rate: number
          check_in_date: string
          check_out_date: string
          children?: number | null
          commission?: number | null
          created_at?: string | null
          created_by?: string | null
          guest_email?: string | null
          guest_id: string
          guest_name?: string | null
          guest_phone?: string | null
          id?: string
          net_to_owner?: number | null
          notes?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          reference: string
          room_id: string
          security_deposit?: number | null
          status?: Database["public"]["Enums"]["booking_status"] | null
          total_amount: number
          tourism_fee?: number | null
          updated_at?: string | null
          vat?: number | null
        }
        Update: {
          adults?: number | null
          amount_paid?: number | null
          base_rate?: number
          check_in_date?: string
          check_out_date?: string
          children?: number | null
          commission?: number | null
          created_at?: string | null
          created_by?: string | null
          guest_email?: string | null
          guest_id?: string
          guest_name?: string | null
          guest_phone?: string | null
          id?: string
          net_to_owner?: number | null
          notes?: string | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          reference?: string
          room_id?: string
          security_deposit?: number | null
          status?: Database["public"]["Enums"]["booking_status"] | null
          total_amount?: number
          tourism_fee?: number | null
          updated_at?: string | null
          vat?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_guest_id_fkey"
            columns: ["guest_id"]
            isOneToOne: false
            referencedRelation: "guests"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      cleaning_tasks: {
        Row: {
          assigned_to: string | null
          created_at: string | null
          date: string
          id: string
          notes: string | null
          room_id: string
          status: Database["public"]["Enums"]["cleaning_status"] | null
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string | null
          date: string
          id?: string
          notes?: string | null
          room_id: string
          status?: Database["public"]["Enums"]["cleaning_status"] | null
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          created_at?: string | null
          date?: string
          id?: string
          notes?: string | null
          room_id?: string
          status?: Database["public"]["Enums"]["cleaning_status"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cleaning_tasks_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      expenses: {
        Row: {
          amount: number
          category: Database["public"]["Enums"]["expense_category"]
          created_at: string | null
          date: string
          description: string
          id: string
          notes: string | null
          owner: string | null
          payment_method: string | null
          property: string | null
          receipt: string | null
          status: string | null
          updated_at: string | null
          vendor: string | null
        }
        Insert: {
          amount: number
          category: Database["public"]["Enums"]["expense_category"]
          created_at?: string | null
          date: string
          description: string
          id?: string
          notes?: string | null
          owner?: string | null
          payment_method?: string | null
          property?: string | null
          receipt?: string | null
          status?: string | null
          updated_at?: string | null
          vendor?: string | null
        }
        Update: {
          amount?: number
          category?: Database["public"]["Enums"]["expense_category"]
          created_at?: string | null
          date?: string
          description?: string
          id?: string
          notes?: string | null
          owner?: string | null
          payment_method?: string | null
          property?: string | null
          receipt?: string | null
          status?: string | null
          updated_at?: string | null
          vendor?: string | null
        }
        Relationships: []
      }
      guests: {
        Row: {
          address: string | null
          city: string | null
          country: string | null
          created_at: string | null
          email: string | null
          first_name: string
          id: string
          id_document_url: string | null
          last_name: string
          passport_number: string | null
          phone: string | null
          state: string | null
          updated_at: string | null
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          first_name: string
          id?: string
          id_document_url?: string | null
          last_name: string
          passport_number?: string | null
          phone?: string | null
          state?: string | null
          updated_at?: string | null
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string
          id?: string
          id_document_url?: string | null
          last_name?: string
          passport_number?: string | null
          phone?: string | null
          state?: string | null
          updated_at?: string | null
          zip_code?: string | null
        }
        Relationships: []
      }
      owner_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          created_by: string | null
          email: string
          id: string
          joined_date: string | null
          name: string
          payment_details: Json | null
          phone: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          created_by?: string | null
          email: string
          id: string
          joined_date?: string | null
          name: string
          payment_details?: Json | null
          phone?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          created_by?: string | null
          email?: string
          id?: string
          joined_date?: string | null
          name?: string
          payment_details?: Json | null
          phone?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      properties: {
        Row: {
          address: string | null
          city: string | null
          country: string | null
          created_at: string | null
          id: string
          name: string
          state: string | null
          updated_at: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          id?: string
          name: string
          state?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          country?: string | null
          created_at?: string | null
          id?: string
          name?: string
          state?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      room_owner_assignments: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          id: string
          owner_id: string
          room_id: string
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          owner_id: string
          room_id: string
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          owner_id?: string
          room_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "room_owner_assignments_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "owner_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "room_owner_assignments_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      room_types: {
        Row: {
          base_rate: number
          created_at: string | null
          description: string | null
          id: string
          name: string
          property_id: string | null
          updated_at: string | null
        }
        Insert: {
          base_rate: number
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          property_id?: string | null
          updated_at?: string | null
        }
        Update: {
          base_rate?: number
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          property_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "room_types_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      rooms: {
        Row: {
          capacity: number | null
          created_at: string | null
          id: string
          last_cleaned: string | null
          name: string | null
          next_check_in: string | null
          number: string
          property_id: string
          rate: number
          status: Database["public"]["Enums"]["room_status"] | null
          type_id: string | null
          updated_at: string | null
        }
        Insert: {
          capacity?: number | null
          created_at?: string | null
          id?: string
          last_cleaned?: string | null
          name?: string | null
          next_check_in?: string | null
          number: string
          property_id: string
          rate: number
          status?: Database["public"]["Enums"]["room_status"] | null
          type_id?: string | null
          updated_at?: string | null
        }
        Update: {
          capacity?: number | null
          created_at?: string | null
          id?: string
          last_cleaned?: string | null
          name?: string | null
          next_check_in?: string | null
          number?: string
          property_id?: string
          rate?: number
          status?: Database["public"]["Enums"]["room_status"] | null
          type_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "rooms_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rooms_type_id_fkey"
            columns: ["type_id"]
            isOneToOne: false
            referencedRelation: "room_types"
            referencedColumns: ["id"]
          },
        ]
      }
      staff_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          id: string
          name: string
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          id: string
          name: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { user_id: string }
        Returns: string
      }
      is_owner_of_room: {
        Args: { owner_id: string; room_id: string }
        Returns: boolean
      }
    }
    Enums: {
      booking_status:
        | "pending"
        | "confirmed"
        | "checked_in"
        | "checked_out"
        | "cancelled"
        | "no_show"
      cleaning_status: "pending" | "in_progress" | "completed" | "verified"
      expense_category:
        | "utilities"
        | "maintenance"
        | "supplies"
        | "personnel"
        | "marketing"
        | "taxes"
        | "insurance"
        | "other"
      payment_status: "pending" | "partial" | "paid" | "refunded"
      room_status: "available" | "occupied" | "maintenance" | "cleaning"
      user_role: "admin" | "agent"
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
    Enums: {
      booking_status: [
        "pending",
        "confirmed",
        "checked_in",
        "checked_out",
        "cancelled",
        "no_show",
      ],
      cleaning_status: ["pending", "in_progress", "completed", "verified"],
      expense_category: [
        "utilities",
        "maintenance",
        "supplies",
        "personnel",
        "marketing",
        "taxes",
        "insurance",
        "other",
      ],
      payment_status: ["pending", "partial", "paid", "refunded"],
      room_status: ["available", "occupied", "maintenance", "cleaning"],
      user_role: ["admin", "agent"],
    },
  },
} as const
