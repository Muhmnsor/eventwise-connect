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
      activity_feedback: {
        Row: {
          activity_id: string | null
          content_rating: number | null
          created_at: string
          feedback_text: string | null
          id: string
          name: string | null
          organization_rating: number | null
          overall_rating: number | null
          phone: string | null
          presenter_rating: number | null
        }
        Insert: {
          activity_id?: string | null
          content_rating?: number | null
          created_at?: string
          feedback_text?: string | null
          id?: string
          name?: string | null
          organization_rating?: number | null
          overall_rating?: number | null
          phone?: string | null
          presenter_rating?: number | null
        }
        Update: {
          activity_id?: string | null
          content_rating?: number | null
          created_at?: string
          feedback_text?: string | null
          id?: string
          name?: string | null
          organization_rating?: number | null
          overall_rating?: number | null
          phone?: string | null
          presenter_rating?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "activity_feedback_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      app_permissions: {
        Row: {
          app_name: string
          created_at: string | null
          id: string
          role_id: string | null
        }
        Insert: {
          app_name: string
          created_at?: string | null
          id?: string
          role_id?: string | null
        }
        Update: {
          app_name?: string
          created_at?: string | null
          id?: string
          role_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "app_permissions_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      attendance_records: {
        Row: {
          activity_id: string | null
          check_in_time: string | null
          created_at: string
          event_id: string | null
          id: string
          project_id: string | null
          recorded_by: string | null
          registration_id: string | null
          status: string | null
        }
        Insert: {
          activity_id?: string | null
          check_in_time?: string | null
          created_at?: string
          event_id?: string | null
          id?: string
          project_id?: string | null
          recorded_by?: string | null
          registration_id?: string | null
          status?: string | null
        }
        Update: {
          activity_id?: string | null
          check_in_time?: string | null
          created_at?: string
          event_id?: string | null
          id?: string
          project_id?: string | null
          recorded_by?: string | null
          registration_id?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "attendance_records_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_records_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_records_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_records_registration_id_fkey"
            columns: ["registration_id"]
            isOneToOne: false
            referencedRelation: "registrations"
            referencedColumns: ["id"]
          },
        ]
      }
      banners: {
        Row: {
          active: boolean | null
          created_at: string
          desktop_image: string
          id: string
          mobile_image: string
          updated_at: string
        }
        Insert: {
          active?: boolean | null
          created_at?: string
          desktop_image: string
          id?: string
          mobile_image: string
          updated_at?: string
        }
        Update: {
          active?: boolean | null
          created_at?: string
          desktop_image?: string
          id?: string
          mobile_image?: string
          updated_at?: string
        }
        Relationships: []
      }
      certificate_signatures: {
        Row: {
          created_at: string
          id: string
          is_active: boolean | null
          name: string
          position: string
          signature_image: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          name: string
          position: string
          signature_image: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          name?: string
          position?: string
          signature_image?: string
        }
        Relationships: []
      }
      certificate_templates: {
        Row: {
          created_at: string
          description: string | null
          field_mappings: Json | null
          fields: Json
          font_family: string | null
          id: string
          is_active: boolean | null
          language: string | null
          name: string
          orientation: string | null
          page_size: string | null
          template_file: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          field_mappings?: Json | null
          fields?: Json
          font_family?: string | null
          id?: string
          is_active?: boolean | null
          language?: string | null
          name: string
          orientation?: string | null
          page_size?: string | null
          template_file: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          field_mappings?: Json | null
          fields?: Json
          font_family?: string | null
          id?: string
          is_active?: boolean | null
          language?: string | null
          name?: string
          orientation?: string | null
          page_size?: string | null
          template_file?: string
          updated_at?: string
        }
        Relationships: []
      }
      certificate_verifications: {
        Row: {
          certificate_id: string | null
          id: string
          ip_address: string | null
          verification_code: string
          verification_method: string
          verified_at: string
        }
        Insert: {
          certificate_id?: string | null
          id?: string
          ip_address?: string | null
          verification_code: string
          verification_method: string
          verified_at?: string
        }
        Update: {
          certificate_id?: string | null
          id?: string
          ip_address?: string | null
          verification_code?: string
          verification_method?: string
          verified_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "certificate_verifications_certificate_id_fkey"
            columns: ["certificate_id"]
            isOneToOne: false
            referencedRelation: "certificates"
            referencedColumns: ["id"]
          },
        ]
      }
      certificates: {
        Row: {
          certificate_data: Json
          certificate_number: string
          event_id: string | null
          id: string
          issued_at: string
          issued_by: string | null
          pdf_url: string | null
          project_id: string | null
          qr_code: string | null
          registration_id: string | null
          status: string | null
          template_id: string | null
          verification_code: string
        }
        Insert: {
          certificate_data?: Json
          certificate_number: string
          event_id?: string | null
          id?: string
          issued_at?: string
          issued_by?: string | null
          pdf_url?: string | null
          project_id?: string | null
          qr_code?: string | null
          registration_id?: string | null
          status?: string | null
          template_id?: string | null
          verification_code: string
        }
        Update: {
          certificate_data?: Json
          certificate_number?: string
          event_id?: string | null
          id?: string
          issued_at?: string
          issued_by?: string | null
          pdf_url?: string | null
          project_id?: string | null
          qr_code?: string | null
          registration_id?: string | null
          status?: string | null
          template_id?: string | null
          verification_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "certificates_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "certificates_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "certificates_registration_id_fkey"
            columns: ["registration_id"]
            isOneToOne: false
            referencedRelation: "registrations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "certificates_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "certificate_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      department_projects: {
        Row: {
          asana_gid: string | null
          created_at: string
          department_id: string | null
          id: string
          project_id: string | null
        }
        Insert: {
          asana_gid?: string | null
          created_at?: string
          department_id?: string | null
          id?: string
          project_id?: string | null
        }
        Update: {
          asana_gid?: string | null
          created_at?: string
          department_id?: string | null
          id?: string
          project_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "department_projects_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "department_projects_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      departments: {
        Row: {
          asana_folder_gid: string | null
          asana_gid: string | null
          asana_sync_enabled: boolean | null
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          asana_folder_gid?: string | null
          asana_gid?: string | null
          asana_sync_enabled?: boolean | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          asana_folder_gid?: string | null
          asana_gid?: string | null
          asana_sync_enabled?: boolean | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      event_feedback: {
        Row: {
          content_rating: number | null
          created_at: string
          event_id: string | null
          feedback_text: string | null
          id: string
          name: string | null
          organization_rating: number | null
          overall_rating: number | null
          phone: string | null
          presenter_rating: number | null
        }
        Insert: {
          content_rating?: number | null
          created_at?: string
          event_id?: string | null
          feedback_text?: string | null
          id?: string
          name?: string | null
          organization_rating?: number | null
          overall_rating?: number | null
          phone?: string | null
          presenter_rating?: number | null
        }
        Update: {
          content_rating?: number | null
          created_at?: string
          event_id?: string | null
          feedback_text?: string | null
          id?: string
          name?: string | null
          organization_rating?: number | null
          overall_rating?: number | null
          phone?: string | null
          presenter_rating?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "event_feedback_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      event_notification_settings: {
        Row: {
          created_at: string
          event_id: string | null
          feedback_enabled: boolean | null
          id: string
          registration_enabled: boolean | null
          reminder_enabled: boolean | null
          reminder_hours: number[] | null
        }
        Insert: {
          created_at?: string
          event_id?: string | null
          feedback_enabled?: boolean | null
          id?: string
          registration_enabled?: boolean | null
          reminder_enabled?: boolean | null
          reminder_hours?: number[] | null
        }
        Update: {
          created_at?: string
          event_id?: string | null
          feedback_enabled?: boolean | null
          id?: string
          registration_enabled?: boolean | null
          reminder_enabled?: boolean | null
          reminder_hours?: number[] | null
        }
        Relationships: [
          {
            foreignKeyName: "event_notification_settings_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      event_registration_fields: {
        Row: {
          arabic_name: boolean | null
          birth_date: boolean | null
          created_at: string
          education_level: boolean | null
          email: boolean | null
          english_name: boolean | null
          event_id: string | null
          gender: boolean | null
          id: string
          national_id: boolean | null
          phone: boolean | null
          work_status: boolean | null
        }
        Insert: {
          arabic_name?: boolean | null
          birth_date?: boolean | null
          created_at?: string
          education_level?: boolean | null
          email?: boolean | null
          english_name?: boolean | null
          event_id?: string | null
          gender?: boolean | null
          id?: string
          national_id?: boolean | null
          phone?: boolean | null
          work_status?: boolean | null
        }
        Update: {
          arabic_name?: boolean | null
          birth_date?: boolean | null
          created_at?: string
          education_level?: boolean | null
          email?: boolean | null
          english_name?: boolean | null
          event_id?: string | null
          gender?: boolean | null
          id?: string
          national_id?: boolean | null
          phone?: boolean | null
          work_status?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "event_registration_fields_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
        ]
      }
      event_reports: {
        Row: {
          activity_duration: string | null
          activity_objectives: string | null
          additional_links: string[] | null
          attendees_count: string | null
          comments: string[] | null
          created_at: string
          detailed_description: string | null
          duration: string | null
          event_id: string | null
          executor_id: string | null
          files: string[] | null
          id: string
          impact_on_participants: string | null
          objectives: string | null
          photos: string[] | null
          program_name: string | null
          report_name: string
          report_text: string
          satisfaction_level: number | null
          video_links: string[] | null
        }
        Insert: {
          activity_duration?: string | null
          activity_objectives?: string | null
          additional_links?: string[] | null
          attendees_count?: string | null
          comments?: string[] | null
          created_at?: string
          detailed_description?: string | null
          duration?: string | null
          event_id?: string | null
          executor_id?: string | null
          files?: string[] | null
          id?: string
          impact_on_participants?: string | null
          objectives?: string | null
          photos?: string[] | null
          program_name?: string | null
          report_name: string
          report_text: string
          satisfaction_level?: number | null
          video_links?: string[] | null
        }
        Update: {
          activity_duration?: string | null
          activity_objectives?: string | null
          additional_links?: string[] | null
          attendees_count?: string | null
          comments?: string[] | null
          created_at?: string
          detailed_description?: string | null
          duration?: string | null
          event_id?: string | null
          executor_id?: string | null
          files?: string[] | null
          id?: string
          impact_on_participants?: string | null
          objectives?: string | null
          photos?: string[] | null
          program_name?: string | null
          report_name?: string
          report_text?: string
          satisfaction_level?: number | null
          video_links?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "event_reports_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_reports_executor_id_fkey"
            columns: ["executor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          beneficiary_type: string
          certificate_type: string | null
          created_at: string
          date: string
          description: string | null
          end_date: string | null
          event_category: string
          event_hours: number | null
          event_path: string
          event_type: string
          id: string
          image_url: string
          is_project_activity: boolean | null
          is_visible: boolean | null
          location: string
          location_url: string | null
          max_attendees: number
          price: number | null
          project_id: string | null
          registration_end_date: string | null
          registration_start_date: string | null
          special_requirements: string | null
          time: string
          title: string
        }
        Insert: {
          beneficiary_type?: string
          certificate_type?: string | null
          created_at?: string
          date: string
          description?: string | null
          end_date?: string | null
          event_category?: string
          event_hours?: number | null
          event_path?: string
          event_type: string
          id?: string
          image_url: string
          is_project_activity?: boolean | null
          is_visible?: boolean | null
          location: string
          location_url?: string | null
          max_attendees?: number
          price?: number | null
          project_id?: string | null
          registration_end_date?: string | null
          registration_start_date?: string | null
          special_requirements?: string | null
          time: string
          title: string
        }
        Update: {
          beneficiary_type?: string
          certificate_type?: string | null
          created_at?: string
          date?: string
          description?: string | null
          end_date?: string | null
          event_category?: string
          event_hours?: number | null
          event_path?: string
          event_type?: string
          id?: string
          image_url?: string
          is_project_activity?: boolean | null
          is_visible?: boolean | null
          location?: string
          location_url?: string | null
          max_attendees?: number
          price?: number | null
          project_id?: string | null
          registration_end_date?: string | null
          registration_start_date?: string | null
          special_requirements?: string | null
          time?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      notification_logs: {
        Row: {
          event_id: string | null
          id: string
          last_error: string | null
          last_retry: string | null
          message_content: string | null
          message_id: string | null
          notification_type: string
          recipient_phone: string | null
          registration_id: string | null
          retry_count: number | null
          sent_at: string
          status: string | null
          template_id: string | null
        }
        Insert: {
          event_id?: string | null
          id?: string
          last_error?: string | null
          last_retry?: string | null
          message_content?: string | null
          message_id?: string | null
          notification_type: string
          recipient_phone?: string | null
          registration_id?: string | null
          retry_count?: number | null
          sent_at?: string
          status?: string | null
          template_id?: string | null
        }
        Update: {
          event_id?: string | null
          id?: string
          last_error?: string | null
          last_retry?: string | null
          message_content?: string | null
          message_id?: string | null
          notification_type?: string
          recipient_phone?: string | null
          registration_id?: string | null
          retry_count?: number | null
          sent_at?: string
          status?: string | null
          template_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notification_logs_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_logs_registration_id_fkey"
            columns: ["registration_id"]
            isOneToOne: false
            referencedRelation: "registrations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "notification_logs_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "whatsapp_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          message: string
          read: boolean | null
          title: string
          type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          read?: boolean | null
          title: string
          type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          read?: boolean | null
          title?: string
          type?: string
          user_id?: string | null
        }
        Relationships: []
      }
      payment_transactions: {
        Row: {
          amount: number
          created_at: string
          id: string
          payment_gateway: string | null
          payment_method: string | null
          registration_id: string | null
          status: string
          transaction_id: string | null
          updated_at: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          payment_gateway?: string | null
          payment_method?: string | null
          registration_id?: string | null
          status?: string
          transaction_id?: string | null
          updated_at?: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          payment_gateway?: string | null
          payment_method?: string | null
          registration_id?: string | null
          status?: string
          transaction_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "payment_transactions_registration_id_fkey"
            columns: ["registration_id"]
            isOneToOne: false
            referencedRelation: "registrations"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolio_only_projects: {
        Row: {
          asana_gid: string | null
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          name: string
          portfolio_id: string | null
          privacy: string | null
          start_date: string | null
          status: string | null
          updated_at: string
        }
        Insert: {
          asana_gid?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          name: string
          portfolio_id?: string | null
          privacy?: string | null
          start_date?: string | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          asana_gid?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          name?: string
          portfolio_id?: string | null
          privacy?: string | null
          start_date?: string | null
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_portfolio_only_projects_portfolio"
            columns: ["portfolio_id"]
            isOneToOne: false
            referencedRelation: "portfolios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "portfolio_only_projects_portfolio_id_fkey"
            columns: ["portfolio_id"]
            isOneToOne: false
            referencedRelation: "portfolios"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolio_projects: {
        Row: {
          asana_gid: string | null
          asana_priority: string | null
          asana_status: string | null
          asana_workspace_id: string | null
          created_at: string
          id: string
          last_sync_at: string | null
          portfolio_id: string | null
          project_id: string | null
          project_type: string | null
          sync_error: string | null
          sync_status: string | null
        }
        Insert: {
          asana_gid?: string | null
          asana_priority?: string | null
          asana_status?: string | null
          asana_workspace_id?: string | null
          created_at?: string
          id?: string
          last_sync_at?: string | null
          portfolio_id?: string | null
          project_id?: string | null
          project_type?: string | null
          sync_error?: string | null
          sync_status?: string | null
        }
        Update: {
          asana_gid?: string | null
          asana_priority?: string | null
          asana_status?: string | null
          asana_workspace_id?: string | null
          created_at?: string
          id?: string
          last_sync_at?: string | null
          portfolio_id?: string | null
          project_id?: string | null
          project_type?: string | null
          sync_error?: string | null
          sync_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_projects_portfolio_id_fkey"
            columns: ["portfolio_id"]
            isOneToOne: false
            referencedRelation: "portfolios"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "portfolio_projects_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolio_subtasks: {
        Row: {
          asana_gid: string | null
          assigned_to: string | null
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          parent_task_id: string | null
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          asana_gid?: string | null
          assigned_to?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          parent_task_id?: string | null
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          asana_gid?: string | null
          assigned_to?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          parent_task_id?: string | null
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_subtasks_parent_task_id_fkey"
            columns: ["parent_task_id"]
            isOneToOne: false
            referencedRelation: "portfolio_tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolio_task_attachments: {
        Row: {
          asana_gid: string | null
          created_at: string
          created_by: string | null
          file_name: string
          file_url: string
          id: string
          task_id: string | null
        }
        Insert: {
          asana_gid?: string | null
          created_at?: string
          created_by?: string | null
          file_name: string
          file_url: string
          id?: string
          task_id?: string | null
        }
        Update: {
          asana_gid?: string | null
          created_at?: string
          created_by?: string | null
          file_name?: string
          file_url?: string
          id?: string
          task_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_task_attachments_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "portfolio_tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolio_task_comments: {
        Row: {
          asana_gid: string | null
          content: string
          created_at: string
          created_by: string | null
          id: string
          task_id: string | null
        }
        Insert: {
          asana_gid?: string | null
          content: string
          created_at?: string
          created_by?: string | null
          id?: string
          task_id?: string | null
        }
        Update: {
          asana_gid?: string | null
          content?: string
          created_at?: string
          created_by?: string | null
          id?: string
          task_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_task_comments_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "portfolio_tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolio_tasks: {
        Row: {
          asana_gid: string | null
          assigned_to: string | null
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          last_sync_at: string | null
          parent_task_id: string | null
          priority: string | null
          project_id: string | null
          status: string | null
          sync_error: string | null
          sync_status: string | null
          title: string
          updated_at: string
          workspace_id: string | null
        }
        Insert: {
          asana_gid?: string | null
          assigned_to?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          last_sync_at?: string | null
          parent_task_id?: string | null
          priority?: string | null
          project_id?: string | null
          status?: string | null
          sync_error?: string | null
          sync_status?: string | null
          title: string
          updated_at?: string
          workspace_id?: string | null
        }
        Update: {
          asana_gid?: string | null
          assigned_to?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          last_sync_at?: string | null
          parent_task_id?: string | null
          priority?: string | null
          project_id?: string | null
          status?: string | null
          sync_error?: string | null
          sync_status?: string | null
          title?: string
          updated_at?: string
          workspace_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "portfolio_tasks_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "portfolio_tasks_parent_task_id_fkey"
            columns: ["parent_task_id"]
            isOneToOne: false
            referencedRelation: "portfolio_tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "portfolio_tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "portfolio_only_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "portfolio_tasks_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "portfolio_workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      portfolio_workspaces: {
        Row: {
          asana_gid: string | null
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          asana_gid?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          asana_gid?: string | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      portfolios: {
        Row: {
          asana_folder_gid: string | null
          asana_gid: string | null
          asana_sync_enabled: boolean | null
          created_at: string
          description: string | null
          id: string
          last_sync_at: string | null
          name: string
          sync_enabled: boolean | null
          sync_error: string | null
          updated_at: string
        }
        Insert: {
          asana_folder_gid?: string | null
          asana_gid?: string | null
          asana_sync_enabled?: boolean | null
          created_at?: string
          description?: string | null
          id?: string
          last_sync_at?: string | null
          name: string
          sync_enabled?: boolean | null
          sync_error?: string | null
          updated_at?: string
        }
        Update: {
          asana_folder_gid?: string | null
          asana_gid?: string | null
          asana_sync_enabled?: boolean | null
          created_at?: string
          description?: string | null
          id?: string
          last_sync_at?: string | null
          name?: string
          sync_enabled?: boolean | null
          sync_error?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string | null
          id: string
        }
        Insert: {
          created_at?: string
          email?: string | null
          id: string
        }
        Update: {
          created_at?: string
          email?: string | null
          id?: string
        }
        Relationships: []
      }
      project_activity_reports: {
        Row: {
          activity_duration: string | null
          activity_id: string | null
          activity_objectives: string | null
          additional_links: string[] | null
          attendees_count: string | null
          comments: string[] | null
          created_at: string
          detailed_description: string | null
          executor_id: string | null
          files: string[] | null
          id: string
          impact_on_participants: string | null
          objectives: string | null
          photos: string[] | null
          program_name: string | null
          project_id: string | null
          report_name: string
          report_text: string
          satisfaction_level: number | null
          video_links: string[] | null
        }
        Insert: {
          activity_duration?: string | null
          activity_id?: string | null
          activity_objectives?: string | null
          additional_links?: string[] | null
          attendees_count?: string | null
          comments?: string[] | null
          created_at?: string
          detailed_description?: string | null
          executor_id?: string | null
          files?: string[] | null
          id?: string
          impact_on_participants?: string | null
          objectives?: string | null
          photos?: string[] | null
          program_name?: string | null
          project_id?: string | null
          report_name: string
          report_text: string
          satisfaction_level?: number | null
          video_links?: string[] | null
        }
        Update: {
          activity_duration?: string | null
          activity_id?: string | null
          activity_objectives?: string | null
          additional_links?: string[] | null
          attendees_count?: string | null
          comments?: string[] | null
          created_at?: string
          detailed_description?: string | null
          executor_id?: string | null
          files?: string[] | null
          id?: string
          impact_on_participants?: string | null
          objectives?: string | null
          photos?: string[] | null
          program_name?: string | null
          project_id?: string | null
          report_name?: string
          report_text?: string
          satisfaction_level?: number | null
          video_links?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "project_activity_reports_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_activity_reports_executor_id_fkey"
            columns: ["executor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_activity_reports_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_notification_settings: {
        Row: {
          activity_reminder_enabled: boolean | null
          created_at: string
          feedback_enabled: boolean | null
          id: string
          project_id: string | null
          registration_enabled: boolean | null
        }
        Insert: {
          activity_reminder_enabled?: boolean | null
          created_at?: string
          feedback_enabled?: boolean | null
          id?: string
          project_id?: string | null
          registration_enabled?: boolean | null
        }
        Update: {
          activity_reminder_enabled?: boolean | null
          created_at?: string
          feedback_enabled?: boolean | null
          id?: string
          project_id?: string | null
          registration_enabled?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "project_notification_settings_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: true
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_registration_fields: {
        Row: {
          arabic_name: boolean | null
          birth_date: boolean | null
          created_at: string
          education_level: boolean | null
          email: boolean | null
          english_name: boolean | null
          gender: boolean | null
          id: string
          national_id: boolean | null
          phone: boolean | null
          project_id: string | null
          work_status: boolean | null
        }
        Insert: {
          arabic_name?: boolean | null
          birth_date?: boolean | null
          created_at?: string
          education_level?: boolean | null
          email?: boolean | null
          english_name?: boolean | null
          gender?: boolean | null
          id?: string
          national_id?: boolean | null
          phone?: boolean | null
          project_id?: string | null
          work_status?: boolean | null
        }
        Update: {
          arabic_name?: boolean | null
          birth_date?: boolean | null
          created_at?: string
          education_level?: boolean | null
          email?: boolean | null
          english_name?: boolean | null
          gender?: boolean | null
          id?: string
          national_id?: boolean | null
          phone?: boolean | null
          project_id?: string | null
          work_status?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "project_registration_fields_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_tasks: {
        Row: {
          asana_gid: string | null
          assigned_to: string | null
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          project_id: string | null
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          asana_gid?: string | null
          assigned_to?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          project_id?: string | null
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          asana_gid?: string | null
          assigned_to?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          project_id?: string | null
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          attendance_requirement_type: string | null
          beneficiary_type: string
          certificate_type: string | null
          created_at: string
          description: string | null
          end_date: string
          event_category: string
          event_path: string
          event_type: string
          id: string
          image_url: string
          is_visible: boolean | null
          max_attendees: number
          price: number | null
          project_type: string
          registration_end_date: string | null
          registration_start_date: string | null
          required_activities_count: number | null
          required_attendance_percentage: number | null
          start_date: string
          title: string
        }
        Insert: {
          attendance_requirement_type?: string | null
          beneficiary_type?: string
          certificate_type?: string | null
          created_at?: string
          description?: string | null
          end_date: string
          event_category?: string
          event_path?: string
          event_type?: string
          id?: string
          image_url: string
          is_visible?: boolean | null
          max_attendees?: number
          price?: number | null
          project_type?: string
          registration_end_date?: string | null
          registration_start_date?: string | null
          required_activities_count?: number | null
          required_attendance_percentage?: number | null
          start_date: string
          title: string
        }
        Update: {
          attendance_requirement_type?: string | null
          beneficiary_type?: string
          certificate_type?: string | null
          created_at?: string
          description?: string | null
          end_date?: string
          event_category?: string
          event_path?: string
          event_type?: string
          id?: string
          image_url?: string
          is_visible?: boolean | null
          max_attendees?: number
          price?: number | null
          project_type?: string
          registration_end_date?: string | null
          registration_start_date?: string | null
          required_activities_count?: number | null
          required_attendance_percentage?: number | null
          start_date?: string
          title?: string
        }
        Relationships: []
      }
      registrations: {
        Row: {
          arabic_name: string
          birth_date: string | null
          created_at: string
          education_level: string | null
          email: string
          english_name: string | null
          event_id: string | null
          gender: string | null
          id: string
          national_id: string | null
          phone: string
          project_id: string | null
          registration_number: string
          updated_at: string | null
          work_status: string | null
        }
        Insert: {
          arabic_name: string
          birth_date?: string | null
          created_at?: string
          education_level?: string | null
          email: string
          english_name?: string | null
          event_id?: string | null
          gender?: string | null
          id?: string
          national_id?: string | null
          phone: string
          project_id?: string | null
          registration_number: string
          updated_at?: string | null
          work_status?: string | null
        }
        Update: {
          arabic_name?: string
          birth_date?: string | null
          created_at?: string
          education_level?: string | null
          email?: string
          english_name?: string | null
          event_id?: string | null
          gender?: string | null
          id?: string
          national_id?: string | null
          phone?: string
          project_id?: string | null
          registration_number?: string
          updated_at?: string | null
          work_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "registrations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          description: string | null
          id: string
          name: string
        }
        Insert: {
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      sync_status: {
        Row: {
          created_at: string
          department_id: string | null
          id: string
          last_sync: string | null
          sync_attachments: boolean | null
          sync_comments: boolean | null
          sync_enabled: boolean | null
          sync_interval: number | null
        }
        Insert: {
          created_at?: string
          department_id?: string | null
          id?: string
          last_sync?: string | null
          sync_attachments?: boolean | null
          sync_comments?: boolean | null
          sync_enabled?: boolean | null
          sync_interval?: number | null
        }
        Update: {
          created_at?: string
          department_id?: string | null
          id?: string
          last_sync?: string | null
          sync_attachments?: boolean | null
          sync_comments?: boolean | null
          sync_enabled?: boolean | null
          sync_interval?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sync_status_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
        ]
      }
      task_attachments: {
        Row: {
          asana_gid: string | null
          created_at: string
          created_by: string | null
          file_name: string
          file_url: string
          id: string
          task_id: string | null
        }
        Insert: {
          asana_gid?: string | null
          created_at?: string
          created_by?: string | null
          file_name: string
          file_url: string
          id?: string
          task_id?: string | null
        }
        Update: {
          asana_gid?: string | null
          created_at?: string
          created_by?: string | null
          file_name?: string
          file_url?: string
          id?: string
          task_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "task_attachments_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "project_tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      task_comments: {
        Row: {
          asana_gid: string | null
          content: string
          created_at: string
          created_by: string | null
          id: string
          task_id: string | null
        }
        Insert: {
          asana_gid?: string | null
          content: string
          created_at?: string
          created_by?: string | null
          id?: string
          task_id?: string | null
        }
        Update: {
          asana_gid?: string | null
          content?: string
          created_at?: string
          created_by?: string | null
          id?: string
          task_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "task_comments_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "project_tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      task_history: {
        Row: {
          action: string
          changed_by: string | null
          created_at: string
          field_name: string | null
          id: string
          new_value: string | null
          old_value: string | null
          task_id: string
        }
        Insert: {
          action: string
          changed_by?: string | null
          created_at?: string
          field_name?: string | null
          id?: string
          new_value?: string | null
          old_value?: string | null
          task_id: string
        }
        Update: {
          action?: string
          changed_by?: string | null
          created_at?: string
          field_name?: string | null
          id?: string
          new_value?: string | null
          old_value?: string | null
          task_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_task_history_task"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "portfolio_tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_task_history_user"
            columns: ["changed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      task_subtasks: {
        Row: {
          asana_gid: string | null
          assigned_to: string | null
          created_at: string
          description: string | null
          due_date: string | null
          id: string
          parent_task_id: string | null
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          asana_gid?: string | null
          assigned_to?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          parent_task_id?: string | null
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          asana_gid?: string | null
          assigned_to?: string | null
          created_at?: string
          description?: string | null
          due_date?: string | null
          id?: string
          parent_task_id?: string | null
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_subtasks_parent_task_id_fkey"
            columns: ["parent_task_id"]
            isOneToOne: false
            referencedRelation: "project_tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          asana_gid: string | null
          assigned_to: string | null
          created_at: string | null
          description: string | null
          due_date: string | null
          id: string
          project_id: string | null
          status: string | null
          title: string
          updated_at: string | null
          workspace_id: string | null
        }
        Insert: {
          asana_gid?: string | null
          assigned_to?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          project_id?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
          workspace_id?: string | null
        }
        Update: {
          asana_gid?: string | null
          assigned_to?: string | null
          created_at?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          project_id?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
          workspace_id?: string | null
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          role_id: string
          user_id: string
        }
        Insert: {
          role_id: string
          user_id: string
        }
        Update: {
          role_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      whatsapp_settings: {
        Row: {
          account_id: string | null
          api_key: string
          business_phone: string
          callback_url: string | null
          created_at: string
          id: string
          updated_at: string
          whatsapp_number_id: string | null
        }
        Insert: {
          account_id?: string | null
          api_key: string
          business_phone: string
          callback_url?: string | null
          created_at?: string
          id?: string
          updated_at?: string
          whatsapp_number_id?: string | null
        }
        Update: {
          account_id?: string | null
          api_key?: string
          business_phone?: string
          callback_url?: string | null
          created_at?: string
          id?: string
          updated_at?: string
          whatsapp_number_id?: string | null
        }
        Relationships: []
      }
      whatsapp_templates: {
        Row: {
          content: string
          created_at: string
          id: string
          is_default: boolean | null
          language: string | null
          name: string
          notification_type: string | null
          status: string | null
          target_type: string | null
          template_type: string | null
          updated_at: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_default?: boolean | null
          language?: string | null
          name: string
          notification_type?: string | null
          status?: string | null
          target_type?: string | null
          template_type?: string | null
          updated_at?: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_default?: boolean | null
          language?: string | null
          name?: string
          notification_type?: string | null
          status?: string | null
          target_type?: string | null
          template_type?: string | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      handle_user_management: {
        Args: {
          operation: string
          target_user_id: string
          new_password?: string
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
