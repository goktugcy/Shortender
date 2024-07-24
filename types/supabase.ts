export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      clicks: {
        Row: {
          city: string | null;
          country: string | null;
          created_at?: Date | null;
          id: string;
          ip: string | null;
          link_id: string;
          user_agent: string | null;
        };
        Insert: {
          city?: string | null;
          country?: string | null;
          created_at?: Date | null;
          id?: string;
          ip?: string | null;
          link_id: string;
          user_agent?: string | null;
        };
        Update: {
          city?: string | null;
          country?: string | null;
          created_at?: Date | null;
          id?: string;
          ip?: string | null;
          link_id?: string;
          user_agent?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "clicks_link_id_fkey";
            columns: ["link_id"];
            referencedRelation: "links";
            referencedColumns: ["id"];
          }
        ];
      };
      links: {
        Row: {
          clicks: number | null;
          created_at: string | null;
          id: string;
          key: string;
          url: string | null;
          user_id: string | null;
        };
        Insert: {
          clicks?: number | null;
          created_at?: string | null;
          id?: string;
          key: string;
          url?: string | null;
          user_id?: string | null;
        };
        Update: {
          clicks?: number | null;
          created_at?: string | null;
          id?: string;
          key?: string;
          url?: string | null;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "links_user_id_fkey";
            columns: ["user_id"];
            referencedRelation: "auth.users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
