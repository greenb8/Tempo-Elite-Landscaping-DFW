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
      client_emails: {
        Row: {
          client_id: string | null
          created_at: string | null
          email_address: string
          email_type: string | null
          id: string
          is_primary: boolean | null
          notes: string | null
          updated_at: string | null
        }
        Insert: {
          client_id?: string | null
          created_at?: string | null
          email_address: string
          email_type?: string | null
          id?: string
          is_primary?: boolean | null
          notes?: string | null
          updated_at?: string | null
        }
        Update: {
          client_id?: string | null
          created_at?: string | null
          email_address?: string
          email_type?: string | null
          id?: string
          is_primary?: boolean | null
          notes?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_emails_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      client_phones: {
        Row: {
          client_id: string | null
          created_at: string | null
          id: string
          is_primary: boolean | null
          notes: string | null
          phone_number: string
          phone_type: string | null
          updated_at: string | null
        }
        Insert: {
          client_id?: string | null
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          notes?: string | null
          phone_number: string
          phone_type?: string | null
          updated_at?: string | null
        }
        Update: {
          client_id?: string | null
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          notes?: string | null
          phone_number?: string
          phone_type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_phones_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      client_properties: {
        Row: {
          access_notes: string | null
          address: string
          annual_maintenance_value: number | null
          city: string | null
          client_id: string | null
          created_at: string | null
          gate_code: string | null
          id: string
          irrigation_system: boolean | null
          is_primary: boolean | null
          key_location: string | null
          landscape_features: string | null
          lot_size: number | null
          lot_size_unit: string | null
          property_name: string | null
          property_type: string | null
          property_value: number | null
          soil_type: string | null
          special_instructions: string | null
          square_footage: number | null
          state: string | null
          updated_at: string | null
          zip_code: string | null
        }
        Insert: {
          access_notes?: string | null
          address: string
          annual_maintenance_value?: number | null
          city?: string | null
          client_id?: string | null
          created_at?: string | null
          gate_code?: string | null
          id?: string
          irrigation_system?: boolean | null
          is_primary?: boolean | null
          key_location?: string | null
          landscape_features?: string | null
          lot_size?: number | null
          lot_size_unit?: string | null
          property_name?: string | null
          property_type?: string | null
          property_value?: number | null
          soil_type?: string | null
          special_instructions?: string | null
          square_footage?: number | null
          state?: string | null
          updated_at?: string | null
          zip_code?: string | null
        }
        Update: {
          access_notes?: string | null
          address?: string
          annual_maintenance_value?: number | null
          city?: string | null
          client_id?: string | null
          created_at?: string | null
          gate_code?: string | null
          id?: string
          irrigation_system?: boolean | null
          is_primary?: boolean | null
          key_location?: string | null
          landscape_features?: string | null
          lot_size?: number | null
          lot_size_unit?: string | null
          property_name?: string | null
          property_type?: string | null
          property_value?: number | null
          soil_type?: string | null
          special_instructions?: string | null
          square_footage?: number | null
          state?: string | null
          updated_at?: string | null
          zip_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "client_properties_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          address: string | null
          city: string | null
          client_type: string | null
          company_name: string | null
          created_at: string | null
          email: string | null
          first_name: string
          id: string
          last_name: string
          notes: string | null
          phone: string | null
          secondary_phone: string | null
          state: string | null
          status: string | null
          updated_at: string | null
          user_id: string | null
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          client_type?: string | null
          company_name?: string | null
          created_at?: string | null
          email?: string | null
          first_name: string
          id?: string
          last_name: string
          notes?: string | null
          phone?: string | null
          secondary_phone?: string | null
          state?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          client_type?: string | null
          company_name?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string
          id?: string
          last_name?: string
          notes?: string | null
          phone?: string | null
          secondary_phone?: string | null
          state?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
          zip_code?: string | null
        }
        Relationships: []
      }
      deal_line_items: {
        Row: {
          cost_price: number
          created_at: string | null
          deal_id: string | null
          description: string
          id: string
          line_cost: number | null
          line_profit: number | null
          line_total: number | null
          notes: string | null
          product_id: string | null
          profit_margin: number | null
          quantity: number
          service_id: string | null
          unit_price: number
        }
        Insert: {
          cost_price?: number
          created_at?: string | null
          deal_id?: string | null
          description: string
          id?: string
          line_cost?: number | null
          line_profit?: number | null
          line_total?: number | null
          notes?: string | null
          product_id?: string | null
          profit_margin?: number | null
          quantity?: number
          service_id?: string | null
          unit_price?: number
        }
        Update: {
          cost_price?: number
          created_at?: string | null
          deal_id?: string | null
          description?: string
          id?: string
          line_cost?: number | null
          line_profit?: number | null
          line_total?: number | null
          notes?: string | null
          product_id?: string | null
          profit_margin?: number | null
          quantity?: number
          service_id?: string | null
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "deal_line_items_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deal_line_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deal_line_items_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      deals: {
        Row: {
          actual_close_date: string | null
          actual_cost: number | null
          actual_profit: number | null
          actual_value: number | null
          assigned_to: string | null
          client_id: string | null
          competitor: string | null
          contact_frequency_days: number | null
          created_at: string | null
          days_in_pipeline: number | null
          deal_name: string
          deal_number: string | null
          deal_type: string | null
          estimated_cost: number | null
          estimated_profit: number | null
          estimated_value: number | null
          expected_close_date: string | null
          id: string
          last_contact_date: string | null
          lost_reason: string | null
          next_follow_up: string | null
          notes: string | null
          priority: string | null
          probability: number | null
          profit_margin: number | null
          property_id: string | null
          source: string | null
          status: string | null
          updated_at: string | null
          user_id: string | null
          win_reason: string | null
        }
        Insert: {
          actual_close_date?: string | null
          actual_cost?: number | null
          actual_profit?: number | null
          actual_value?: number | null
          assigned_to?: string | null
          client_id?: string | null
          competitor?: string | null
          contact_frequency_days?: number | null
          created_at?: string | null
          days_in_pipeline?: number | null
          deal_name: string
          deal_number?: string | null
          deal_type?: string | null
          estimated_cost?: number | null
          estimated_profit?: number | null
          estimated_value?: number | null
          expected_close_date?: string | null
          id?: string
          last_contact_date?: string | null
          lost_reason?: string | null
          next_follow_up?: string | null
          notes?: string | null
          priority?: string | null
          probability?: number | null
          profit_margin?: number | null
          property_id?: string | null
          source?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
          win_reason?: string | null
        }
        Update: {
          actual_close_date?: string | null
          actual_cost?: number | null
          actual_profit?: number | null
          actual_value?: number | null
          assigned_to?: string | null
          client_id?: string | null
          competitor?: string | null
          contact_frequency_days?: number | null
          created_at?: string | null
          days_in_pipeline?: number | null
          deal_name?: string
          deal_number?: string | null
          deal_type?: string | null
          estimated_cost?: number | null
          estimated_profit?: number | null
          estimated_value?: number | null
          expected_close_date?: string | null
          id?: string
          last_contact_date?: string | null
          lost_reason?: string | null
          next_follow_up?: string | null
          notes?: string | null
          priority?: string | null
          probability?: number | null
          profit_margin?: number | null
          property_id?: string | null
          source?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
          win_reason?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "deals_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deals_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "client_properties"
            referencedColumns: ["id"]
          },
        ]
      }
      equipment: {
        Row: {
          assigned_to: string | null
          created_at: string | null
          id: string
          last_maintenance_date: string | null
          maintenance_schedule: string | null
          model: string | null
          name: string
          next_maintenance_date: string | null
          notes: string | null
          purchase_date: string | null
          purchase_price: number | null
          serial_number: string | null
          status: string | null
          type: string | null
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string | null
          id?: string
          last_maintenance_date?: string | null
          maintenance_schedule?: string | null
          model?: string | null
          name: string
          next_maintenance_date?: string | null
          notes?: string | null
          purchase_date?: string | null
          purchase_price?: number | null
          serial_number?: string | null
          status?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          created_at?: string | null
          id?: string
          last_maintenance_date?: string | null
          maintenance_schedule?: string | null
          model?: string | null
          name?: string
          next_maintenance_date?: string | null
          notes?: string | null
          purchase_date?: string | null
          purchase_price?: number | null
          serial_number?: string | null
          status?: string | null
          type?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      invoice_line_items: {
        Row: {
          created_at: string | null
          description: string
          id: string
          invoice_id: string | null
          line_total: number
          product_id: string | null
          quantity: number
          service_id: string | null
          unit_price: number
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          invoice_id?: string | null
          line_total: number
          product_id?: string | null
          quantity?: number
          service_id?: string | null
          unit_price: number
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          invoice_id?: string | null
          line_total?: number
          product_id?: string | null
          quantity?: number
          service_id?: string | null
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "invoice_line_items_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
        ]
      }
      invoices: {
        Row: {
          client_id: string | null
          created_at: string | null
          due_date: string
          id: string
          invoice_number: string
          issue_date: string
          maintenance_account_id: string | null
          notes: string | null
          paid_amount: number | null
          payment_date: string | null
          payment_method: string | null
          project_id: string | null
          status: string | null
          subtotal: number | null
          tax_amount: number | null
          tax_rate: number | null
          total_amount: number | null
          updated_at: string | null
        }
        Insert: {
          client_id?: string | null
          created_at?: string | null
          due_date: string
          id?: string
          invoice_number: string
          issue_date?: string
          maintenance_account_id?: string | null
          notes?: string | null
          paid_amount?: number | null
          payment_date?: string | null
          payment_method?: string | null
          project_id?: string | null
          status?: string | null
          subtotal?: number | null
          tax_amount?: number | null
          tax_rate?: number | null
          total_amount?: number | null
          updated_at?: string | null
        }
        Update: {
          client_id?: string | null
          created_at?: string | null
          due_date?: string
          id?: string
          invoice_number?: string
          issue_date?: string
          maintenance_account_id?: string | null
          notes?: string | null
          paid_amount?: number | null
          payment_date?: string | null
          payment_method?: string | null
          project_id?: string | null
          status?: string | null
          subtotal?: number | null
          tax_amount?: number | null
          tax_rate?: number | null
          total_amount?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_maintenance_account_id_fkey"
            columns: ["maintenance_account_id"]
            isOneToOne: false
            referencedRelation: "maintenance_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      job_line_items: {
        Row: {
          actual_quantity_used: number | null
          cost_price: number
          created_at: string | null
          description: string
          id: string
          job_id: string | null
          line_cost: number | null
          line_profit: number | null
          line_total: number | null
          notes: string | null
          product_id: string | null
          profit_margin: number | null
          quantity: number
          service_id: string | null
          unit_price: number
          waste_quantity: number | null
        }
        Insert: {
          actual_quantity_used?: number | null
          cost_price?: number
          created_at?: string | null
          description: string
          id?: string
          job_id?: string | null
          line_cost?: number | null
          line_profit?: number | null
          line_total?: number | null
          notes?: string | null
          product_id?: string | null
          profit_margin?: number | null
          quantity?: number
          service_id?: string | null
          unit_price?: number
          waste_quantity?: number | null
        }
        Update: {
          actual_quantity_used?: number | null
          cost_price?: number
          created_at?: string | null
          description?: string
          id?: string
          job_id?: string | null
          line_cost?: number | null
          line_profit?: number | null
          line_total?: number | null
          notes?: string | null
          product_id?: string | null
          profit_margin?: number | null
          quantity?: number
          service_id?: string | null
          unit_price?: number
          waste_quantity?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "job_line_items_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_line_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_line_items_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "services"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          actual_completion_date: string | null
          actual_cost: number | null
          actual_hours: number | null
          after_photos: string[] | null
          assigned_to: string | null
          before_photos: string[] | null
          client_id: string | null
          completion_photos: string[] | null
          contract_value: number
          created_at: string | null
          crew_lead: string | null
          crew_size: number | null
          customer_satisfaction_rating: number | null
          deal_id: string | null
          description: string | null
          end_date: string | null
          estimated_cost: number | null
          estimated_hours: number | null
          id: string
          internal_notes: string | null
          invoiced_amount: number | null
          job_name: string
          job_number: string
          job_type: string | null
          notes: string | null
          paid_amount: number | null
          permit_number: string | null
          priority: string | null
          profit: number | null
          profit_margin: number | null
          property_id: string | null
          requires_permit: boolean | null
          scheduled_completion_date: string | null
          start_date: string | null
          status: string | null
          updated_at: string | null
          warranty_expiry_date: string | null
          warranty_period_months: number | null
          weather_dependent: boolean | null
        }
        Insert: {
          actual_completion_date?: string | null
          actual_cost?: number | null
          actual_hours?: number | null
          after_photos?: string[] | null
          assigned_to?: string | null
          before_photos?: string[] | null
          client_id?: string | null
          completion_photos?: string[] | null
          contract_value?: number
          created_at?: string | null
          crew_lead?: string | null
          crew_size?: number | null
          customer_satisfaction_rating?: number | null
          deal_id?: string | null
          description?: string | null
          end_date?: string | null
          estimated_cost?: number | null
          estimated_hours?: number | null
          id?: string
          internal_notes?: string | null
          invoiced_amount?: number | null
          job_name: string
          job_number: string
          job_type?: string | null
          notes?: string | null
          paid_amount?: number | null
          permit_number?: string | null
          priority?: string | null
          profit?: number | null
          profit_margin?: number | null
          property_id?: string | null
          requires_permit?: boolean | null
          scheduled_completion_date?: string | null
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
          warranty_expiry_date?: string | null
          warranty_period_months?: number | null
          weather_dependent?: boolean | null
        }
        Update: {
          actual_completion_date?: string | null
          actual_cost?: number | null
          actual_hours?: number | null
          after_photos?: string[] | null
          assigned_to?: string | null
          before_photos?: string[] | null
          client_id?: string | null
          completion_photos?: string[] | null
          contract_value?: number
          created_at?: string | null
          crew_lead?: string | null
          crew_size?: number | null
          customer_satisfaction_rating?: number | null
          deal_id?: string | null
          description?: string | null
          end_date?: string | null
          estimated_cost?: number | null
          estimated_hours?: number | null
          id?: string
          internal_notes?: string | null
          invoiced_amount?: number | null
          job_name?: string
          job_number?: string
          job_type?: string | null
          notes?: string | null
          paid_amount?: number | null
          permit_number?: string | null
          priority?: string | null
          profit?: number | null
          profit_margin?: number | null
          property_id?: string | null
          requires_permit?: boolean | null
          scheduled_completion_date?: string | null
          start_date?: string | null
          status?: string | null
          updated_at?: string | null
          warranty_expiry_date?: string | null
          warranty_period_months?: number | null
          weather_dependent?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "jobs_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "jobs_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "client_properties"
            referencedColumns: ["id"]
          },
        ]
      }
      maintenance_accounts: {
        Row: {
          account_name: string
          auto_invoice: boolean | null
          billing_amount: number
          billing_frequency: string | null
          client_id: string | null
          created_at: string | null
          end_date: string | null
          id: string
          next_billing_date: string | null
          notes: string | null
          property_id: string | null
          start_date: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          account_name: string
          auto_invoice?: boolean | null
          billing_amount: number
          billing_frequency?: string | null
          client_id?: string | null
          created_at?: string | null
          end_date?: string | null
          id?: string
          next_billing_date?: string | null
          notes?: string | null
          property_id?: string | null
          start_date: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          account_name?: string
          auto_invoice?: boolean | null
          billing_amount?: number
          billing_frequency?: string | null
          client_id?: string | null
          created_at?: string | null
          end_date?: string | null
          id?: string
          next_billing_date?: string | null
          notes?: string | null
          property_id?: string | null
          start_date?: string
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "maintenance_accounts_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "maintenance_accounts_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      maintenance_services: {
        Row: {
          created_at: string | null
          frequency: string | null
          id: string
          maintenance_account_id: string | null
          notes: string | null
          service_id: string | null
        }
        Insert: {
          created_at?: string | null
          frequency?: string | null
          id?: string
          maintenance_account_id?: string | null
          notes?: string | null
          service_id?: string | null
        }
        Update: {
          created_at?: string | null
          frequency?: string | null
          id?: string
          maintenance_account_id?: string | null
          notes?: string | null
          service_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "maintenance_services_maintenance_account_id_fkey"
            columns: ["maintenance_account_id"]
            isOneToOne: false
            referencedRelation: "maintenance_accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          card_last_four: string | null
          check_number: string | null
          client_id: string | null
          created_at: string | null
          id: string
          invoice_id: string | null
          job_id: string | null
          net_amount: number | null
          notes: string | null
          payment_date: string
          payment_method: string
          payment_number: string | null
          payment_type: string | null
          processed_by: string | null
          processing_fee: number | null
          reference_number: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          card_last_four?: string | null
          check_number?: string | null
          client_id?: string | null
          created_at?: string | null
          id?: string
          invoice_id?: string | null
          job_id?: string | null
          net_amount?: number | null
          notes?: string | null
          payment_date?: string
          payment_method: string
          payment_number?: string | null
          payment_type?: string | null
          processed_by?: string | null
          processing_fee?: number | null
          reference_number?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          card_last_four?: string | null
          check_number?: string | null
          client_id?: string | null
          created_at?: string | null
          id?: string
          invoice_id?: string | null
          job_id?: string | null
          net_amount?: number | null
          notes?: string | null
          payment_date?: string
          payment_method?: string
          payment_number?: string | null
          payment_type?: string | null
          processed_by?: string | null
          processing_fee?: number | null
          reference_number?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_invoice_id_fkey"
            columns: ["invoice_id"]
            isOneToOne: false
            referencedRelation: "invoices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          available_quantity: number | null
          barcode: string | null
          category: string
          cost_price: number
          created_at: string | null
          description: string | null
          dimensions: string | null
          id: string
          is_active: boolean | null
          last_cost_update: string | null
          last_price_update: string | null
          lead_time_days: number | null
          markup_percentage: number | null
          max_stock_level: number | null
          name: string
          profit_margin: number | null
          reorder_level: number | null
          reserved_quantity: number | null
          season: string | null
          seasonal_item: boolean | null
          sku: string | null
          stock_quantity: number | null
          storage_location: string | null
          subcategory: string | null
          supplier: string | null
          supplier_sku: string | null
          total_cost: number | null
          total_profit: number | null
          total_revenue: number | null
          total_sold_quantity: number | null
          unit: string
          unit_price: number
          updated_at: string | null
          weight: number | null
          weight_unit: string | null
        }
        Insert: {
          available_quantity?: number | null
          barcode?: string | null
          category: string
          cost_price?: number
          created_at?: string | null
          description?: string | null
          dimensions?: string | null
          id?: string
          is_active?: boolean | null
          last_cost_update?: string | null
          last_price_update?: string | null
          lead_time_days?: number | null
          markup_percentage?: number | null
          max_stock_level?: number | null
          name: string
          profit_margin?: number | null
          reorder_level?: number | null
          reserved_quantity?: number | null
          season?: string | null
          seasonal_item?: boolean | null
          sku?: string | null
          stock_quantity?: number | null
          storage_location?: string | null
          subcategory?: string | null
          supplier?: string | null
          supplier_sku?: string | null
          total_cost?: number | null
          total_profit?: number | null
          total_revenue?: number | null
          total_sold_quantity?: number | null
          unit: string
          unit_price?: number
          updated_at?: string | null
          weight?: number | null
          weight_unit?: string | null
        }
        Update: {
          available_quantity?: number | null
          barcode?: string | null
          category?: string
          cost_price?: number
          created_at?: string | null
          description?: string | null
          dimensions?: string | null
          id?: string
          is_active?: boolean | null
          last_cost_update?: string | null
          last_price_update?: string | null
          lead_time_days?: number | null
          markup_percentage?: number | null
          max_stock_level?: number | null
          name?: string
          profit_margin?: number | null
          reorder_level?: number | null
          reserved_quantity?: number | null
          season?: string | null
          seasonal_item?: boolean | null
          sku?: string | null
          stock_quantity?: number | null
          storage_location?: string | null
          subcategory?: string | null
          supplier?: string | null
          supplier_sku?: string | null
          total_cost?: number | null
          total_profit?: number | null
          total_revenue?: number | null
          total_sold_quantity?: number | null
          unit?: string
          unit_price?: number
          updated_at?: string | null
          weight?: number | null
          weight_unit?: string | null
        }
        Relationships: []
      }
      properties: {
        Row: {
          access_notes: string | null
          address: string
          city: string | null
          client_id: string | null
          created_at: string | null
          id: string
          is_primary: boolean | null
          lot_size: number | null
          property_name: string | null
          property_type: string | null
          special_instructions: string | null
          square_footage: number | null
          state: string | null
          updated_at: string | null
          zip_code: string | null
        }
        Insert: {
          access_notes?: string | null
          address: string
          city?: string | null
          client_id?: string | null
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          lot_size?: number | null
          property_name?: string | null
          property_type?: string | null
          special_instructions?: string | null
          square_footage?: number | null
          state?: string | null
          updated_at?: string | null
          zip_code?: string | null
        }
        Update: {
          access_notes?: string | null
          address?: string
          city?: string | null
          client_id?: string | null
          created_at?: string | null
          id?: string
          is_primary?: boolean | null
          lot_size?: number | null
          property_name?: string | null
          property_type?: string | null
          special_instructions?: string | null
          square_footage?: number | null
          state?: string | null
          updated_at?: string | null
          zip_code?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "properties_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      proposal_line_items: {
        Row: {
          created_at: string | null
          description: string
          id: string
          line_total: number
          product_id: string | null
          proposal_id: string | null
          quantity: number
          service_id: string | null
          unit_price: number
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          line_total: number
          product_id?: string | null
          proposal_id?: string | null
          quantity?: number
          service_id?: string | null
          unit_price: number
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          line_total?: number
          product_id?: string | null
          proposal_id?: string | null
          quantity?: number
          service_id?: string | null
          unit_price?: number
        }
        Relationships: [
          {
            foreignKeyName: "proposal_line_items_proposal_id_fkey"
            columns: ["proposal_id"]
            isOneToOne: false
            referencedRelation: "proposals"
            referencedColumns: ["id"]
          },
        ]
      }
      proposals: {
        Row: {
          client_id: string | null
          created_at: string | null
          description: string | null
          id: string
          lead_id: string | null
          property_id: string | null
          proposal_number: string
          status: string | null
          subtotal: number | null
          tax_amount: number | null
          tax_rate: number | null
          terms_conditions: string | null
          title: string
          total_amount: number | null
          updated_at: string | null
          valid_until: string | null
        }
        Insert: {
          client_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          lead_id?: string | null
          property_id?: string | null
          proposal_number: string
          status?: string | null
          subtotal?: number | null
          tax_amount?: number | null
          tax_rate?: number | null
          terms_conditions?: string | null
          title: string
          total_amount?: number | null
          updated_at?: string | null
          valid_until?: string | null
        }
        Update: {
          client_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          lead_id?: string | null
          property_id?: string | null
          proposal_number?: string
          status?: string | null
          subtotal?: number | null
          tax_amount?: number | null
          tax_rate?: number | null
          terms_conditions?: string | null
          title?: string
          total_amount?: number | null
          updated_at?: string | null
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "proposals_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "proposals_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
      services: {
        Row: {
          average_job_rating: number | null
          base_price: number
          category: string
          cost_per_hour: number | null
          created_at: string | null
          crew_size_required: number | null
          description: string | null
          equipment_required: string | null
          estimated_duration_hours: number | null
          id: string
          insurance_required: boolean | null
          is_active: boolean | null
          markup_percentage: number | null
          name: string
          profit_margin: number | null
          requires_license: boolean | null
          season: string | null
          seasonal_service: boolean | null
          service_code: string | null
          skill_level: string | null
          subcategory: string | null
          total_cost: number | null
          total_hours_performed: number | null
          total_jobs_completed: number | null
          total_profit: number | null
          total_revenue: number | null
          unit: string
          updated_at: string | null
        }
        Insert: {
          average_job_rating?: number | null
          base_price?: number
          category: string
          cost_per_hour?: number | null
          created_at?: string | null
          crew_size_required?: number | null
          description?: string | null
          equipment_required?: string | null
          estimated_duration_hours?: number | null
          id?: string
          insurance_required?: boolean | null
          is_active?: boolean | null
          markup_percentage?: number | null
          name: string
          profit_margin?: number | null
          requires_license?: boolean | null
          season?: string | null
          seasonal_service?: boolean | null
          service_code?: string | null
          skill_level?: string | null
          subcategory?: string | null
          total_cost?: number | null
          total_hours_performed?: number | null
          total_jobs_completed?: number | null
          total_profit?: number | null
          total_revenue?: number | null
          unit: string
          updated_at?: string | null
        }
        Update: {
          average_job_rating?: number | null
          base_price?: number
          category?: string
          cost_per_hour?: number | null
          created_at?: string | null
          crew_size_required?: number | null
          description?: string | null
          equipment_required?: string | null
          estimated_duration_hours?: number | null
          id?: string
          insurance_required?: boolean | null
          is_active?: boolean | null
          markup_percentage?: number | null
          name?: string
          profit_margin?: number | null
          requires_license?: boolean | null
          season?: string | null
          seasonal_service?: boolean | null
          service_code?: string | null
          skill_level?: string | null
          subcategory?: string | null
          total_cost?: number | null
          total_hours_performed?: number | null
          total_jobs_completed?: number | null
          total_profit?: number | null
          total_revenue?: number | null
          unit?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      tasks: {
        Row: {
          actual_duration_minutes: number | null
          assigned_to: string | null
          billable: boolean | null
          billable_rate: number | null
          client_id: string | null
          completed_date: string | null
          completion_notes: string | null
          created_at: string | null
          created_by: string | null
          deal_id: string | null
          description: string | null
          due_date: string | null
          due_time: string | null
          estimated_duration_minutes: number | null
          id: string
          job_id: string | null
          location: string | null
          notes: string | null
          parent_task_id: string | null
          priority: string | null
          recurring: boolean | null
          recurring_frequency: string | null
          reminder_date: string | null
          reminder_sent: boolean | null
          requires_travel: boolean | null
          status: string | null
          task_type: string | null
          title: string
          travel_time_minutes: number | null
          updated_at: string | null
        }
        Insert: {
          actual_duration_minutes?: number | null
          assigned_to?: string | null
          billable?: boolean | null
          billable_rate?: number | null
          client_id?: string | null
          completed_date?: string | null
          completion_notes?: string | null
          created_at?: string | null
          created_by?: string | null
          deal_id?: string | null
          description?: string | null
          due_date?: string | null
          due_time?: string | null
          estimated_duration_minutes?: number | null
          id?: string
          job_id?: string | null
          location?: string | null
          notes?: string | null
          parent_task_id?: string | null
          priority?: string | null
          recurring?: boolean | null
          recurring_frequency?: string | null
          reminder_date?: string | null
          reminder_sent?: boolean | null
          requires_travel?: boolean | null
          status?: string | null
          task_type?: string | null
          title: string
          travel_time_minutes?: number | null
          updated_at?: string | null
        }
        Update: {
          actual_duration_minutes?: number | null
          assigned_to?: string | null
          billable?: boolean | null
          billable_rate?: number | null
          client_id?: string | null
          completed_date?: string | null
          completion_notes?: string | null
          created_at?: string | null
          created_by?: string | null
          deal_id?: string | null
          description?: string | null
          due_date?: string | null
          due_time?: string | null
          estimated_duration_minutes?: number | null
          id?: string
          job_id?: string | null
          location?: string | null
          notes?: string | null
          parent_task_id?: string | null
          priority?: string | null
          recurring?: boolean | null
          recurring_frequency?: string | null
          reminder_date?: string | null
          reminder_sent?: boolean | null
          requires_travel?: boolean | null
          status?: string | null
          task_type?: string | null
          title?: string
          travel_time_minutes?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_parent_task_id_fkey"
            columns: ["parent_task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      time_entries: {
        Row: {
          billable: boolean | null
          client_id: string | null
          created_at: string | null
          date: string
          description: string | null
          end_time: string | null
          hourly_rate: number | null
          hours: number
          id: string
          project_id: string | null
          start_time: string | null
          updated_at: string | null
          user_id: string | null
          work_order_id: string | null
        }
        Insert: {
          billable?: boolean | null
          client_id?: string | null
          created_at?: string | null
          date?: string
          description?: string | null
          end_time?: string | null
          hourly_rate?: number | null
          hours: number
          id?: string
          project_id?: string | null
          start_time?: string | null
          updated_at?: string | null
          user_id?: string | null
          work_order_id?: string | null
        }
        Update: {
          billable?: boolean | null
          client_id?: string | null
          created_at?: string | null
          date?: string
          description?: string | null
          end_time?: string | null
          hourly_rate?: number | null
          hours?: number
          id?: string
          project_id?: string | null
          start_time?: string | null
          updated_at?: string | null
          user_id?: string | null
          work_order_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "time_entries_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "time_entries_work_order_id_fkey"
            columns: ["work_order_id"]
            isOneToOne: false
            referencedRelation: "work_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          image: string | null
          name: string | null
          token_identifier: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          image?: string | null
          name?: string | null
          token_identifier: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          image?: string | null
          name?: string | null
          token_identifier?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      work_orders: {
        Row: {
          actual_hours: number | null
          assigned_to: string | null
          client_id: string | null
          completed_date: string | null
          created_at: string | null
          description: string | null
          estimated_hours: number | null
          id: string
          maintenance_account_id: string | null
          notes: string | null
          project_id: string | null
          property_id: string | null
          scheduled_date: string | null
          status: string | null
          title: string
          updated_at: string | null
          work_order_number: string
        }
        Insert: {
          actual_hours?: number | null
          assigned_to?: string | null
          client_id?: string | null
          completed_date?: string | null
          created_at?: string | null
          description?: string | null
          estimated_hours?: number | null
          id?: string
          maintenance_account_id?: string | null
          notes?: string | null
          project_id?: string | null
          property_id?: string | null
          scheduled_date?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
          work_order_number: string
        }
        Update: {
          actual_hours?: number | null
          assigned_to?: string | null
          client_id?: string | null
          completed_date?: string | null
          created_at?: string | null
          description?: string | null
          estimated_hours?: number | null
          id?: string
          maintenance_account_id?: string | null
          notes?: string | null
          project_id?: string | null
          property_id?: string | null
          scheduled_date?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
          work_order_number?: string
        }
        Relationships: [
          {
            foreignKeyName: "work_orders_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_orders_maintenance_account_id_fkey"
            columns: ["maintenance_account_id"]
            isOneToOne: false
            referencedRelation: "maintenance_accounts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "work_orders_property_id_fkey"
            columns: ["property_id"]
            isOneToOne: false
            referencedRelation: "properties"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_deal_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_invoice_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_job_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_payment_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_project_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_proposal_number: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_work_order_number: {
        Args: Record<PropertyKey, never>
        Returns: string
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
