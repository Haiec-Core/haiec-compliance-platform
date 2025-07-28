export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      account_delete_tokens: {
        Row: {
          token: string
          user_id: string
        }
        Insert: {
          token?: string
          user_id: string
        }
        Update: {
          token?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "account_delete_tokens_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      billing_customers: {
        Row: {
          billing_email: string
          default_currency: string | null
          gateway_customer_id: string
          gateway_name: string
          metadata: Json | null
          workspace_id: string
        }
        Insert: {
          billing_email: string
          default_currency?: string | null
          gateway_customer_id: string
          gateway_name: string
          metadata?: Json | null
          workspace_id: string
        }
        Update: {
          billing_email?: string
          default_currency?: string | null
          gateway_customer_id?: string
          gateway_name?: string
          metadata?: Json | null
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "billing_customers_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      billing_invoices: {
        Row: {
          amount: number
          currency: string
          due_date: string | null
          gateway_customer_id: string
          gateway_invoice_id: string
          gateway_name: string
          gateway_price_id: string | null
          gateway_product_id: string | null
          hosted_invoice_url: string | null
          paid_date: string | null
          status: string
        }
        Insert: {
          amount: number
          currency: string
          due_date?: string | null
          gateway_customer_id: string
          gateway_invoice_id: string
          gateway_name: string
          gateway_price_id?: string | null
          gateway_product_id?: string | null
          hosted_invoice_url?: string | null
          paid_date?: string | null
          status: string
        }
        Update: {
          amount?: number
          currency?: string
          due_date?: string | null
          gateway_customer_id?: string
          gateway_invoice_id?: string
          gateway_name?: string
          gateway_price_id?: string | null
          gateway_product_id?: string | null
          hosted_invoice_url?: string | null
          paid_date?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "billing_invoices_gateway_customer_id_fkey"
            columns: ["gateway_customer_id"]
            isOneToOne: false
            referencedRelation: "billing_customers"
            referencedColumns: ["gateway_customer_id"]
          },
          {
            foreignKeyName: "billing_invoices_gateway_price_id_fkey"
            columns: ["gateway_price_id"]
            isOneToOne: false
            referencedRelation: "billing_prices"
            referencedColumns: ["gateway_price_id"]
          },
          {
            foreignKeyName: "billing_invoices_gateway_product_id_fkey"
            columns: ["gateway_product_id"]
            isOneToOne: false
            referencedRelation: "billing_products"
            referencedColumns: ["gateway_product_id"]
          },
        ]
      }
      billing_one_time_payments: {
        Row: {
          amount: number
          charge_date: string
          currency: string
          gateway_charge_id: string
          gateway_customer_id: string
          gateway_invoice_id: string
          gateway_name: string
          gateway_price_id: string
          gateway_product_id: string
          status: string
        }
        Insert: {
          amount: number
          charge_date: string
          currency: string
          gateway_charge_id: string
          gateway_customer_id: string
          gateway_invoice_id: string
          gateway_name: string
          gateway_price_id: string
          gateway_product_id: string
          status: string
        }
        Update: {
          amount?: number
          charge_date?: string
          currency?: string
          gateway_charge_id?: string
          gateway_customer_id?: string
          gateway_invoice_id?: string
          gateway_name?: string
          gateway_price_id?: string
          gateway_product_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "billing_one_time_payments_gateway_customer_id_fkey"
            columns: ["gateway_customer_id"]
            isOneToOne: false
            referencedRelation: "billing_customers"
            referencedColumns: ["gateway_customer_id"]
          },
          {
            foreignKeyName: "billing_one_time_payments_gateway_invoice_id_fkey"
            columns: ["gateway_invoice_id"]
            isOneToOne: false
            referencedRelation: "billing_invoices"
            referencedColumns: ["gateway_invoice_id"]
          },
          {
            foreignKeyName: "billing_one_time_payments_gateway_price_id_fkey"
            columns: ["gateway_price_id"]
            isOneToOne: false
            referencedRelation: "billing_prices"
            referencedColumns: ["gateway_price_id"]
          },
          {
            foreignKeyName: "billing_one_time_payments_gateway_product_id_fkey"
            columns: ["gateway_product_id"]
            isOneToOne: false
            referencedRelation: "billing_products"
            referencedColumns: ["gateway_product_id"]
          },
        ]
      }
      billing_prices: {
        Row: {
          active: boolean
          amount: number
          currency: string
          free_trial_days: number | null
          gateway_name: string
          gateway_price_id: string
          gateway_product_id: string
          recurring_interval: string
          recurring_interval_count: number
          tier: string | null
        }
        Insert: {
          active?: boolean
          amount: number
          currency: string
          free_trial_days?: number | null
          gateway_name: string
          gateway_price_id?: string
          gateway_product_id: string
          recurring_interval: string
          recurring_interval_count?: number
          tier?: string | null
        }
        Update: {
          active?: boolean
          amount?: number
          currency?: string
          free_trial_days?: number | null
          gateway_name?: string
          gateway_price_id?: string
          gateway_product_id?: string
          recurring_interval?: string
          recurring_interval_count?: number
          tier?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "billing_prices_gateway_product_id_fkey"
            columns: ["gateway_product_id"]
            isOneToOne: false
            referencedRelation: "billing_products"
            referencedColumns: ["gateway_product_id"]
          },
        ]
      }
      billing_products: {
        Row: {
          active: boolean
          description: string | null
          features: Json | null
          gateway_name: string
          gateway_product_id: string
          is_visible_in_ui: boolean
          name: string
        }
        Insert: {
          active?: boolean
          description?: string | null
          features?: Json | null
          gateway_name: string
          gateway_product_id: string
          is_visible_in_ui?: boolean
          name: string
        }
        Update: {
          active?: boolean
          description?: string | null
          features?: Json | null
          gateway_name?: string
          gateway_product_id?: string
          is_visible_in_ui?: boolean
          name?: string
        }
        Relationships: []
      }
      billing_subscriptions: {
        Row: {
          cancel_at_period_end: boolean
          currency: string
          current_period_end: string
          current_period_start: string
          gateway_customer_id: string
          gateway_name: string
          gateway_price_id: string
          gateway_product_id: string
          gateway_subscription_id: string
          id: string
          is_trial: boolean
          quantity: number | null
          status: Database["public"]["Enums"]["subscription_status"]
          trial_ends_at: string | null
        }
        Insert: {
          cancel_at_period_end: boolean
          currency: string
          current_period_end: string
          current_period_start: string
          gateway_customer_id: string
          gateway_name: string
          gateway_price_id: string
          gateway_product_id: string
          gateway_subscription_id: string
          id?: string
          is_trial: boolean
          quantity?: number | null
          status: Database["public"]["Enums"]["subscription_status"]
          trial_ends_at?: string | null
        }
        Update: {
          cancel_at_period_end?: boolean
          currency?: string
          current_period_end?: string
          current_period_start?: string
          gateway_customer_id?: string
          gateway_name?: string
          gateway_price_id?: string
          gateway_product_id?: string
          gateway_subscription_id?: string
          id?: string
          is_trial?: boolean
          quantity?: number | null
          status?: Database["public"]["Enums"]["subscription_status"]
          trial_ends_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "billing_subscriptions_gateway_customer_id_fkey"
            columns: ["gateway_customer_id"]
            isOneToOne: false
            referencedRelation: "billing_customers"
            referencedColumns: ["gateway_customer_id"]
          },
          {
            foreignKeyName: "billing_subscriptions_gateway_price_id_fkey"
            columns: ["gateway_price_id"]
            isOneToOne: false
            referencedRelation: "billing_prices"
            referencedColumns: ["gateway_price_id"]
          },
          {
            foreignKeyName: "billing_subscriptions_gateway_product_id_fkey"
            columns: ["gateway_product_id"]
            isOneToOne: false
            referencedRelation: "billing_products"
            referencedColumns: ["gateway_product_id"]
          },
        ]
      }
      user_application_settings: {
        Row: {
          email_readonly: string
          id: string
        }
        Insert: {
          email_readonly: string
          id: string
        }
        Update: {
          email_readonly?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_application_settings_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
        }
        Relationships: []
      }
      user_settings: {
        Row: {
          default_workspace: string | null
          id: string
        }
        Insert: {
          default_workspace?: string | null
          id: string
        }
        Update: {
          default_workspace?: string | null
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_settings_default_workspace_fkey"
            columns: ["default_workspace"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_settings_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_admin_settings: {
        Row: {
          workspace_id: string
          workspace_settings: Json
        }
        Insert: {
          workspace_id: string
          workspace_settings?: Json
        }
        Update: {
          workspace_id?: string
          workspace_settings?: Json
        }
        Relationships: [
          {
            foreignKeyName: "workspace_admin_settings_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: true
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_application_settings: {
        Row: {
          membership_type: Database["public"]["Enums"]["workspace_membership_type"]
          workspace_id: string
        }
        Insert: {
          membership_type?: Database["public"]["Enums"]["workspace_membership_type"]
          workspace_id: string
        }
        Update: {
          membership_type?: Database["public"]["Enums"]["workspace_membership_type"]
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_application_settings_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: true
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_chat_messages: {
        Row: {
          attachments: Json
          chat_id: string
          created_at: string
          id: string
          parts: Json
          role: string
        }
        Insert: {
          attachments: Json
          chat_id: string
          created_at?: string
          id?: string
          parts: Json
          role: string
        }
        Update: {
          attachments?: Json
          chat_id?: string
          created_at?: string
          id?: string
          parts?: Json
          role?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_chat_messages_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "workspace_chats"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_chat_votes: {
        Row: {
          chat_id: string
          is_upvoted: boolean
          message_id: string
          user_id: string
        }
        Insert: {
          chat_id: string
          is_upvoted: boolean
          message_id: string
          user_id: string
        }
        Update: {
          chat_id?: string
          is_upvoted?: boolean
          message_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_chat_votes_chat_id_fkey"
            columns: ["chat_id"]
            isOneToOne: false
            referencedRelation: "workspace_chats"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workspace_chat_votes_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "workspace_chat_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workspace_chat_votes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_chats: {
        Row: {
          created_at: string
          id: string
          title: string
          visibility: Database["public"]["Enums"]["chat_visibility_type"]
          workspace_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          title: string
          visibility?: Database["public"]["Enums"]["chat_visibility_type"]
          workspace_id: string
        }
        Update: {
          created_at?: string
          id?: string
          title?: string
          visibility?: Database["public"]["Enums"]["chat_visibility_type"]
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_chats_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_document_suggestions: {
        Row: {
          created_at: string
          description: string | null
          document_created_at: string
          document_id: string
          id: string
          is_resolved: boolean
          original_text: string
          suggested_text: string
          user_id: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          document_created_at?: string
          document_id: string
          id?: string
          is_resolved?: boolean
          original_text: string
          suggested_text: string
          user_id: string
        }
        Update: {
          created_at?: string
          description?: string | null
          document_created_at?: string
          document_id?: string
          id?: string
          is_resolved?: boolean
          original_text?: string
          suggested_text?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_document_suggestions_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "workspace_documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workspace_document_suggestions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_documents: {
        Row: {
          content: string | null
          created_at: string
          id: string
          kind: Database["public"]["Enums"]["document_kind"]
          title: string
          workspace_id: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          id?: string
          kind?: Database["public"]["Enums"]["document_kind"]
          title: string
          workspace_id: string
        }
        Update: {
          content?: string | null
          created_at?: string
          id?: string
          kind?: Database["public"]["Enums"]["document_kind"]
          title?: string
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_documents_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_invitations: {
        Row: {
          created_at: string
          id: string
          invitee_user_email: string
          invitee_user_id: string | null
          invitee_user_role: Database["public"]["Enums"]["workspace_member_role_type"]
          inviter_user_id: string
          status: Database["public"]["Enums"]["workspace_invitation_link_status"]
          workspace_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          invitee_user_email: string
          invitee_user_id?: string | null
          invitee_user_role?: Database["public"]["Enums"]["workspace_member_role_type"]
          inviter_user_id: string
          status?: Database["public"]["Enums"]["workspace_invitation_link_status"]
          workspace_id: string
        }
        Update: {
          created_at?: string
          id?: string
          invitee_user_email?: string
          invitee_user_id?: string | null
          invitee_user_role?: Database["public"]["Enums"]["workspace_member_role_type"]
          inviter_user_id?: string
          status?: Database["public"]["Enums"]["workspace_invitation_link_status"]
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workspace_invitations_invitee_user_id_fkey"
            columns: ["invitee_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workspace_invitations_inviter_user_id_fkey"
            columns: ["inviter_user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workspace_invitations_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_members: {
        Row: {
          added_at: string
          id: string
          workspace_id: string
          workspace_member_id: string
          workspace_member_role: Database["public"]["Enums"]["workspace_member_role_type"]
        }
        Insert: {
          added_at?: string
          id?: string
          workspace_id: string
          workspace_member_id: string
          workspace_member_role: Database["public"]["Enums"]["workspace_member_role_type"]
        }
        Update: {
          added_at?: string
          id?: string
          workspace_id?: string
          workspace_member_id?: string
          workspace_member_role?: Database["public"]["Enums"]["workspace_member_role_type"]
        }
        Relationships: [
          {
            foreignKeyName: "workspace_members_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workspace_members_workspace_member_id_fkey"
            columns: ["workspace_member_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      workspace_settings: {
        Row: {
          workspace_id: string
          workspace_settings: Json
        }
        Insert: {
          workspace_id: string
          workspace_settings?: Json
        }
        Update: {
          workspace_id?: string
          workspace_settings?: Json
        }
        Relationships: [
          {
            foreignKeyName: "workspace_settings_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: true
            referencedRelation: "workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      workspaces: {
        Row: {
          created_at: string
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          slug?: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_customer_workspace_id: {
        Args: {
          customer_id_arg: string
        }
        Returns: string
      }
      get_workspace_team_member_admins: {
        Args: {
          workspace_id: string
        }
        Returns: {
          member_id: string
        }[]
      }
      get_workspace_team_member_ids: {
        Args: {
          workspace_id: string
        }
        Returns: {
          member_id: string
        }[]
      }
      is_workspace_admin: {
        Args: {
          user_id: string
          workspace_id: string
        }
        Returns: boolean
      }
      is_workspace_member: {
        Args: {
          user_id: string
          workspace_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      chat_visibility_type: "private" | "public"
      document_kind: "text" | "code" | "image" | "sheet"
      organization_joining_status:
        | "invited"
        | "joinied"
        | "declined_invitation"
        | "joined"
      organization_member_role: "owner" | "admin" | "member" | "readonly"
      pricing_plan_interval: "day" | "week" | "month" | "year"
      pricing_type: "one_time" | "recurring"
      project_status: "draft" | "pending_approval" | "approved" | "completed"
      project_team_member_role: "admin" | "member" | "readonly"
      subscription_status:
        | "trialing"
        | "active"
        | "canceled"
        | "incomplete"
        | "incomplete_expired"
        | "past_due"
        | "unpaid"
        | "paused"
      workspace_invitation_link_status:
        | "active"
        | "finished_accepted"
        | "finished_declined"
        | "inactive"
      workspace_member_role_type: "owner" | "admin" | "member" | "readonly"
      workspace_membership_type: "solo" | "team"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  storage: {
    Tables: {
      buckets: {
        Row: {
          allowed_mime_types: string[] | null
          avif_autodetection: boolean | null
          created_at: string | null
          file_size_limit: number | null
          id: string
          name: string
          owner: string | null
          owner_id: string | null
          public: boolean | null
          updated_at: string | null
        }
        Insert: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id: string
          name: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          allowed_mime_types?: string[] | null
          avif_autodetection?: boolean | null
          created_at?: string | null
          file_size_limit?: number | null
          id?: string
          name?: string
          owner?: string | null
          owner_id?: string | null
          public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      migrations: {
        Row: {
          executed_at: string | null
          hash: string
          id: number
          name: string
        }
        Insert: {
          executed_at?: string | null
          hash: string
          id: number
          name: string
        }
        Update: {
          executed_at?: string | null
          hash?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      objects: {
        Row: {
          bucket_id: string | null
          created_at: string | null
          id: string
          last_accessed_at: string | null
          metadata: Json | null
          name: string | null
          owner: string | null
          owner_id: string | null
          path_tokens: string[] | null
          updated_at: string | null
          user_metadata: Json | null
          version: string | null
        }
        Insert: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Update: {
          bucket_id?: string | null
          created_at?: string | null
          id?: string
          last_accessed_at?: string | null
          metadata?: Json | null
          name?: string | null
          owner?: string | null
          owner_id?: string | null
          path_tokens?: string[] | null
          updated_at?: string | null
          user_metadata?: Json | null
          version?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "objects_bucketId_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads: {
        Row: {
          bucket_id: string
          created_at: string
          id: string
          in_progress_size: number
          key: string
          owner_id: string | null
          upload_signature: string
          user_metadata: Json | null
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          id: string
          in_progress_size?: number
          key: string
          owner_id?: string | null
          upload_signature: string
          user_metadata?: Json | null
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          id?: string
          in_progress_size?: number
          key?: string
          owner_id?: string | null
          upload_signature?: string
          user_metadata?: Json | null
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
        ]
      }
      s3_multipart_uploads_parts: {
        Row: {
          bucket_id: string
          created_at: string
          etag: string
          id: string
          key: string
          owner_id: string | null
          part_number: number
          size: number
          upload_id: string
          version: string
        }
        Insert: {
          bucket_id: string
          created_at?: string
          etag: string
          id?: string
          key: string
          owner_id?: string | null
          part_number: number
          size?: number
          upload_id: string
          version: string
        }
        Update: {
          bucket_id?: string
          created_at?: string
          etag?: string
          id?: string
          key?: string
          owner_id?: string | null
          part_number?: number
          size?: number
          upload_id?: string
          version?: string
        }
        Relationships: [
          {
            foreignKeyName: "s3_multipart_uploads_parts_bucket_id_fkey"
            columns: ["bucket_id"]
            isOneToOne: false
            referencedRelation: "buckets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "s3_multipart_uploads_parts_upload_id_fkey"
            columns: ["upload_id"]
            isOneToOne: false
            referencedRelation: "s3_multipart_uploads"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_insert_object: {
        Args: {
          bucketid: string
          name: string
          owner: string
          metadata: Json
        }
        Returns: undefined
      }
      extension: {
        Args: {
          name: string
        }
        Returns: string
      }
      filename: {
        Args: {
          name: string
        }
        Returns: string
      }
      foldername: {
        Args: {
          name: string
        }
        Returns: string[]
      }
      get_size_by_bucket: {
        Args: Record<PropertyKey, never>
        Returns: {
          size: number
          bucket_id: string
        }[]
      }
      list_multipart_uploads_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          next_key_token?: string
          next_upload_token?: string
        }
        Returns: {
          key: string
          id: string
          created_at: string
        }[]
      }
      list_objects_with_delimiter: {
        Args: {
          bucket_id: string
          prefix_param: string
          delimiter_param: string
          max_keys?: number
          start_after?: string
          next_token?: string
        }
        Returns: {
          name: string
          id: string
          metadata: Json
          updated_at: string
        }[]
      }
      operation: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      search: {
        Args: {
          prefix: string
          bucketname: string
          limits?: number
          levels?: number
          offsets?: number
          search?: string
          sortcolumn?: string
          sortorder?: string
        }
        Returns: {
          name: string
          id: string
          updated_at: string
          created_at: string
          last_accessed_at: string
          metadata: Json
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

