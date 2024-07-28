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
          id?: string;
          link_id: string;
          ip: string | null;
          city: string | null;
          country: string | null;
          isp?: string | null;
          user_agent: string | null;
          created_at?: Date | null;
        };
        Insert: {
          id?: string;
          link_id: string;
          ip: string | null;
          city: string | null;
          country: string | null;
          isp?: string | null;
          user_agent: string | null;
          created_at?: Date | null;
        };
        Update: {
          id?: string;
          link_id: string;
          ip: string | null;
          city: string | null;
          country: string | null;
          isp?: string | null;
          user_agent: string | null;
          created_at?: Date | null;
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
          id?: string;
          user_id?: string | null;
          key?: string;
          url?: string | null;
          status?: boolean | true;
          clicks?: number | null;
          created_at?: Date | null;
          updated_at?: Date | null;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          key?: string;
          url?: string | null;
          status?: boolean | true;
          clicks?: number | null;
          created_at?: Date | null;
          updated_at?: Date | null;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          key?: string;
          url?: string | null;
          status?: boolean | true;
          clicks?: number | null;
          created_at?: Date | null;
          updated_at?: Date | null;
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
