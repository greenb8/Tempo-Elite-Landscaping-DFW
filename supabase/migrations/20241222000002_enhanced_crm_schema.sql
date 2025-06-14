-- Enhanced Elite Landscaping DFW CRM Database Schema
-- This migration creates comprehensive tables for KPI tracking and business management

-- Create users table for public access (parallel to auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id uuid PRIMARY KEY,
    token_identifier text NOT NULL,
    email text,
    name text,
    full_name text,
    avatar_url text,
    image text,
    user_id uuid,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Client phones table - Multiple phone numbers per client
CREATE TABLE IF NOT EXISTS public.client_phones (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id uuid REFERENCES public.clients(id) ON DELETE CASCADE,
    phone_number text NOT NULL,
    phone_type text CHECK (phone_type IN ('primary', 'secondary', 'mobile', 'work', 'home', 'fax')) DEFAULT 'primary',
    is_primary boolean DEFAULT false,
    notes text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Client emails table - Multiple email addresses per client
CREATE TABLE IF NOT EXISTS public.client_emails (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id uuid REFERENCES public.clients(id) ON DELETE CASCADE,
    email_address text NOT NULL,
    email_type text CHECK (email_type IN ('primary', 'secondary', 'work', 'personal', 'billing')) DEFAULT 'primary',
    is_primary boolean DEFAULT false,
    notes text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Client properties table - Multiple properties per client with detailed info
CREATE TABLE IF NOT EXISTS public.client_properties (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id uuid REFERENCES public.clients(id) ON DELETE CASCADE,
    property_name text,
    address text NOT NULL,
    city text,
    state text,
    zip_code text,
    property_type text CHECK (property_type IN ('residential', 'commercial', 'industrial', 'municipal')) DEFAULT 'residential',
    square_footage integer,
    lot_size decimal(10,2),
    lot_size_unit text DEFAULT 'sq_ft',
    special_instructions text,
    access_notes text,
    gate_code text,
    key_location text,
    is_primary boolean DEFAULT false,
    property_value decimal(12,2),
    annual_maintenance_value decimal(10,2),
    soil_type text,
    irrigation_system boolean DEFAULT false,
    landscape_features text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Enhanced Products table with detailed KPI tracking
DROP TABLE IF EXISTS public.products CASCADE;
CREATE TABLE IF NOT EXISTS public.products (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    description text,
    category text CHECK (category IN ('flora', 'mulch', 'soil', 'gravel', 'stone', 'hardscape', 'irrigation', 'tools', 'chemicals', 'fertilizer', 'seed', 'sod', 'plants', 'trees', 'shrubs')) NOT NULL,
    subcategory text,
    sku text UNIQUE,
    barcode text,
    cost_price decimal(10,2) NOT NULL DEFAULT 0, -- What we pay for it
    unit_price decimal(10,2) NOT NULL DEFAULT 0, -- What we sell it for
    markup_percentage decimal(5,2) GENERATED ALWAYS AS (
        CASE 
            WHEN cost_price > 0 THEN ((unit_price - cost_price) / cost_price * 100)
            ELSE 0
        END
    ) STORED,
    profit_margin decimal(5,2) GENERATED ALWAYS AS (
        CASE 
            WHEN unit_price > 0 THEN ((unit_price - cost_price) / unit_price * 100)
            ELSE 0
        END
    ) STORED,
    unit text NOT NULL, -- each, bag, yard, ton, sq_ft, etc.
    stock_quantity decimal(10,2) DEFAULT 0,
    reserved_quantity decimal(10,2) DEFAULT 0,
    available_quantity decimal(10,2) GENERATED ALWAYS AS (stock_quantity - reserved_quantity) STORED,
    reorder_level decimal(10,2) DEFAULT 0,
    max_stock_level decimal(10,2),
    supplier text,
    supplier_sku text,
    lead_time_days integer DEFAULT 0,
    seasonal_item boolean DEFAULT false,
    season text CHECK (season IN ('spring', 'summer', 'fall', 'winter', 'year_round')) DEFAULT 'year_round',
    weight decimal(8,2),
    weight_unit text DEFAULT 'lbs',
    dimensions text,
    storage_location text,
    is_active boolean DEFAULT true,
    last_cost_update timestamp with time zone,
    last_price_update timestamp with time zone,
    total_sold_quantity decimal(12,2) DEFAULT 0,
    total_revenue decimal(12,2) DEFAULT 0,
    total_cost decimal(12,2) DEFAULT 0,
    total_profit decimal(12,2) GENERATED ALWAYS AS (total_revenue - total_cost) STORED,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Enhanced Services table with detailed labor and KPI tracking
DROP TABLE IF EXISTS public.services CASCADE;
CREATE TABLE IF NOT EXISTS public.services (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    description text,
    category text CHECK (category IN ('arboricultural', 'irrigation', 'lawn_care', 'maintenance', 'hardscape', 'design', 'installation', 'seasonal', 'emergency')) NOT NULL,
    subcategory text,
    service_code text UNIQUE,
    base_price decimal(10,2) NOT NULL DEFAULT 0,
    cost_per_hour decimal(8,2) DEFAULT 0, -- Labor cost
    markup_percentage decimal(5,2) DEFAULT 0,
    profit_margin decimal(5,2) GENERATED ALWAYS AS (
        CASE 
            WHEN base_price > 0 THEN ((base_price - cost_per_hour) / base_price * 100)
            ELSE 0
        END
    ) STORED,
    unit text NOT NULL, -- per sq ft, per hour, flat rate, per visit, etc.
    estimated_duration_hours decimal(6,2) DEFAULT 0,
    crew_size_required integer DEFAULT 1,
    equipment_required text,
    skill_level text CHECK (skill_level IN ('entry', 'intermediate', 'advanced', 'specialist')) DEFAULT 'intermediate',
    seasonal_service boolean DEFAULT false,
    season text CHECK (season IN ('spring', 'summer', 'fall', 'winter', 'year_round')) DEFAULT 'year_round',
    requires_license boolean DEFAULT false,
    insurance_required boolean DEFAULT false,
    is_active boolean DEFAULT true,
    total_hours_performed decimal(12,2) DEFAULT 0,
    total_jobs_completed integer DEFAULT 0,
    total_revenue decimal(12,2) DEFAULT 0,
    total_cost decimal(12,2) DEFAULT 0,
    total_profit decimal(12,2) GENERATED ALWAYS AS (total_revenue - total_cost) STORED,
    average_job_rating decimal(3,2) DEFAULT 0,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Enhanced Deals table (replacing leads with more comprehensive deal tracking)
DROP TABLE IF EXISTS public.leads CASCADE;
CREATE TABLE IF NOT EXISTS public.deals (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    client_id uuid REFERENCES public.clients(id) ON DELETE SET NULL,
    property_id uuid REFERENCES public.client_properties(id) ON DELETE SET NULL,
    deal_name text NOT NULL,
    deal_number text UNIQUE,
    source text CHECK (source IN ('referral', 'website', 'social_media', 'cold_call', 'walk_in', 'repeat_customer', 'advertising', 'trade_show', 'partner')) DEFAULT 'website',
    status text CHECK (status IN ('prospecting', 'qualified', 'needs_analysis', 'proposal', 'negotiation', 'closed_won', 'closed_lost', 'on_hold')) DEFAULT 'prospecting',
    priority text CHECK (priority IN ('low', 'medium', 'high', 'urgent')) DEFAULT 'medium',
    deal_type text CHECK (deal_type IN ('one_time', 'recurring', 'maintenance_contract', 'project')) DEFAULT 'one_time',
    estimated_value decimal(12,2) DEFAULT 0,
    actual_value decimal(12,2) DEFAULT 0,
    estimated_cost decimal(12,2) DEFAULT 0,
    actual_cost decimal(12,2) DEFAULT 0,
    estimated_profit decimal(12,2) GENERATED ALWAYS AS (estimated_value - estimated_cost) STORED,
    actual_profit decimal(12,2) GENERATED ALWAYS AS (actual_value - actual_cost) STORED,
    profit_margin decimal(5,2) GENERATED ALWAYS AS (
        CASE 
            WHEN actual_value > 0 THEN ((actual_value - actual_cost) / actual_value * 100)
            ELSE 0
        END
    ) STORED,
    probability integer CHECK (probability >= 0 AND probability <= 100) DEFAULT 50,
    expected_close_date date,
    actual_close_date date,
    days_in_pipeline integer,
    competitor text,
    lost_reason text,
    win_reason text,
    notes text,
    assigned_to uuid REFERENCES auth.users(id),
    next_follow_up date,
    last_contact_date date,
    contact_frequency_days integer DEFAULT 7,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Deal line items table - Services and products in deals
CREATE TABLE IF NOT EXISTS public.deal_line_items (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    deal_id uuid REFERENCES public.deals(id) ON DELETE CASCADE,
    service_id uuid REFERENCES public.services(id) ON DELETE SET NULL,
    product_id uuid REFERENCES public.products(id) ON DELETE SET NULL,
    description text NOT NULL,
    quantity decimal(10,2) NOT NULL DEFAULT 1,
    unit_price decimal(10,2) NOT NULL DEFAULT 0,
    cost_price decimal(10,2) NOT NULL DEFAULT 0,
    line_total decimal(10,2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
    line_cost decimal(10,2) GENERATED ALWAYS AS (quantity * cost_price) STORED,
    line_profit decimal(10,2) GENERATED ALWAYS AS ((quantity * unit_price) - (quantity * cost_price)) STORED,
    profit_margin decimal(5,2) GENERATED ALWAYS AS (
        CASE 
            WHEN (quantity * unit_price) > 0 THEN (((quantity * unit_price) - (quantity * cost_price)) / (quantity * unit_price) * 100)
            ELSE 0
        END
    ) STORED,
    notes text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Enhanced Jobs table (converted from deals)
DROP TABLE IF EXISTS public.projects CASCADE;
CREATE TABLE IF NOT EXISTS public.jobs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    deal_id uuid REFERENCES public.deals(id) ON DELETE SET NULL,
    client_id uuid REFERENCES public.clients(id) ON DELETE CASCADE,
    property_id uuid REFERENCES public.client_properties(id) ON DELETE SET NULL,
    job_number text UNIQUE NOT NULL,
    job_name text NOT NULL,
    description text,
    job_type text CHECK (job_type IN ('installation', 'maintenance', 'repair', 'design', 'consultation', 'emergency')) DEFAULT 'installation',
    status text CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled', 'on_hold', 'invoiced', 'paid')) DEFAULT 'scheduled',
    priority text CHECK (priority IN ('low', 'medium', 'high', 'urgent')) DEFAULT 'medium',
    start_date date,
    end_date date,
    scheduled_completion_date date,
    actual_completion_date date,
    estimated_hours decimal(8,2) DEFAULT 0,
    actual_hours decimal(8,2) DEFAULT 0,
    estimated_cost decimal(12,2) DEFAULT 0,
    actual_cost decimal(12,2) DEFAULT 0,
    contract_value decimal(12,2) NOT NULL DEFAULT 0,
    invoiced_amount decimal(12,2) DEFAULT 0,
    paid_amount decimal(12,2) DEFAULT 0,
    profit decimal(12,2) GENERATED ALWAYS AS (contract_value - actual_cost) STORED,
    profit_margin decimal(5,2) GENERATED ALWAYS AS (
        CASE 
            WHEN contract_value > 0 THEN ((contract_value - actual_cost) / contract_value * 100)
            ELSE 0
        END
    ) STORED,
    assigned_to uuid REFERENCES auth.users(id),
    crew_lead uuid REFERENCES auth.users(id),
    crew_size integer DEFAULT 1,
    weather_dependent boolean DEFAULT true,
    requires_permit boolean DEFAULT false,
    permit_number text,
    customer_satisfaction_rating integer CHECK (customer_satisfaction_rating >= 1 AND customer_satisfaction_rating <= 5),
    completion_photos text[], -- Array of photo URLs
    before_photos text[], -- Array of photo URLs
    after_photos text[], -- Array of photo URLs
    warranty_period_months integer DEFAULT 0,
    warranty_expiry_date date,
    notes text,
    internal_notes text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Job line items table - Services and products in jobs
CREATE TABLE IF NOT EXISTS public.job_line_items (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id uuid REFERENCES public.jobs(id) ON DELETE CASCADE,
    service_id uuid REFERENCES public.services(id) ON DELETE SET NULL,
    product_id uuid REFERENCES public.products(id) ON DELETE SET NULL,
    description text NOT NULL,
    quantity decimal(10,2) NOT NULL DEFAULT 1,
    unit_price decimal(10,2) NOT NULL DEFAULT 0,
    cost_price decimal(10,2) NOT NULL DEFAULT 0,
    line_total decimal(10,2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
    line_cost decimal(10,2) GENERATED ALWAYS AS (quantity * cost_price) STORED,
    line_profit decimal(10,2) GENERATED ALWAYS AS ((quantity * unit_price) - (quantity * cost_price)) STORED,
    profit_margin decimal(5,2) GENERATED ALWAYS AS (
        CASE 
            WHEN (quantity * unit_price) > 0 THEN (((quantity * unit_price) - (quantity * cost_price)) / (quantity * unit_price) * 100)
            ELSE 0
        END
    ) STORED,
    actual_quantity_used decimal(10,2),
    waste_quantity decimal(10,2) DEFAULT 0,
    notes text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Enhanced Payments table
CREATE TABLE IF NOT EXISTS public.payments (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id uuid REFERENCES public.clients(id) ON DELETE CASCADE,
    invoice_id uuid REFERENCES public.invoices(id) ON DELETE SET NULL,
    job_id uuid REFERENCES public.jobs(id) ON DELETE SET NULL,
    payment_number text UNIQUE,
    payment_method text CHECK (payment_method IN ('cash', 'check', 'credit_card', 'debit_card', 'bank_transfer', 'paypal', 'venmo', 'zelle', 'financing')) NOT NULL,
    payment_type text CHECK (payment_type IN ('full_payment', 'partial_payment', 'deposit', 'final_payment', 'refund')) DEFAULT 'full_payment',
    amount decimal(10,2) NOT NULL,
    processing_fee decimal(8,2) DEFAULT 0,
    net_amount decimal(10,2) GENERATED ALWAYS AS (amount - processing_fee) STORED,
    payment_date date NOT NULL DEFAULT (timezone('utc'::text, now()))::date,
    reference_number text,
    check_number text,
    card_last_four text,
    status text CHECK (status IN ('pending', 'completed', 'failed', 'refunded', 'disputed')) DEFAULT 'completed',
    notes text,
    processed_by uuid REFERENCES auth.users(id),
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Enhanced Tasks table
CREATE TABLE IF NOT EXISTS public.tasks (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id uuid REFERENCES public.clients(id) ON DELETE SET NULL,
    job_id uuid REFERENCES public.jobs(id) ON DELETE SET NULL,
    deal_id uuid REFERENCES public.deals(id) ON DELETE SET NULL,
    assigned_to uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    title text NOT NULL,
    description text,
    task_type text CHECK (task_type IN ('follow_up', 'estimate', 'site_visit', 'phone_call', 'email', 'proposal', 'scheduling', 'material_order', 'equipment_check', 'quality_control', 'customer_service', 'administrative')) DEFAULT 'follow_up',
    priority text CHECK (priority IN ('low', 'medium', 'high', 'urgent')) DEFAULT 'medium',
    status text CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled', 'deferred')) DEFAULT 'pending',
    due_date date,
    due_time time,
    completed_date timestamp with time zone,
    estimated_duration_minutes integer DEFAULT 30,
    actual_duration_minutes integer,
    location text,
    requires_travel boolean DEFAULT false,
    travel_time_minutes integer DEFAULT 0,
    billable boolean DEFAULT false,
    billable_rate decimal(8,2),
    notes text,
    completion_notes text,
    reminder_date timestamp with time zone,
    reminder_sent boolean DEFAULT false,
    recurring boolean DEFAULT false,
    recurring_frequency text CHECK (recurring_frequency IN ('daily', 'weekly', 'monthly', 'quarterly', 'annually')),
    parent_task_id uuid REFERENCES public.tasks(id) ON DELETE SET NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_client_phones_client_id ON public.client_phones(client_id);
CREATE INDEX IF NOT EXISTS idx_client_emails_client_id ON public.client_emails(client_id);
CREATE INDEX IF NOT EXISTS idx_client_properties_client_id ON public.client_properties(client_id);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_sku ON public.products(sku);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON public.products(is_active);
CREATE INDEX IF NOT EXISTS idx_services_category ON public.services(category);
CREATE INDEX IF NOT EXISTS idx_services_is_active ON public.services(is_active);
CREATE INDEX IF NOT EXISTS idx_deals_status ON public.deals(status);
CREATE INDEX IF NOT EXISTS idx_deals_assigned_to ON public.deals(assigned_to);
CREATE INDEX IF NOT EXISTS idx_deals_client_id ON public.deals(client_id);
CREATE INDEX IF NOT EXISTS idx_deal_line_items_deal_id ON public.deal_line_items(deal_id);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON public.jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_assigned_to ON public.jobs(assigned_to);
CREATE INDEX IF NOT EXISTS idx_jobs_client_id ON public.jobs(client_id);
CREATE INDEX IF NOT EXISTS idx_job_line_items_job_id ON public.job_line_items(job_id);
CREATE INDEX IF NOT EXISTS idx_payments_client_id ON public.payments(client_id);
CREATE INDEX IF NOT EXISTS idx_payments_payment_date ON public.payments(payment_date);
CREATE INDEX IF NOT EXISTS idx_tasks_assigned_to ON public.tasks(assigned_to);
CREATE INDEX IF NOT EXISTS idx_tasks_due_date ON public.tasks(due_date);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON public.tasks(status);

-- Create functions for automatic numbering
CREATE OR REPLACE FUNCTION generate_deal_number()
RETURNS text AS $$
DECLARE
    next_num integer;
    year_part text;
BEGIN
    year_part := EXTRACT(year FROM CURRENT_DATE)::text;
    
    SELECT COALESCE(MAX(CAST(SUBSTRING(deal_number FROM '[0-9]+$') AS integer)), 0) + 1
    INTO next_num
    FROM public.deals
    WHERE deal_number LIKE 'DEAL-' || year_part || '-%';
    
    RETURN 'DEAL-' || year_part || '-' || LPAD(next_num::text, 4, '0');
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION generate_job_number()
RETURNS text AS $$
DECLARE
    next_num integer;
    year_part text;
BEGIN
    year_part := EXTRACT(year FROM CURRENT_DATE)::text;
    
    SELECT COALESCE(MAX(CAST(SUBSTRING(job_number FROM '[0-9]+$') AS integer)), 0) + 1
    INTO next_num
    FROM public.jobs
    WHERE job_number LIKE 'JOB-' || year_part || '-%';
    
    RETURN 'JOB-' || year_part || '-' || LPAD(next_num::text, 4, '0');
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION generate_payment_number()
RETURNS text AS $$
DECLARE
    next_num integer;
    year_part text;
BEGIN
    year_part := EXTRACT(year FROM CURRENT_DATE)::text;
    
    SELECT COALESCE(MAX(CAST(SUBSTRING(payment_number FROM '[0-9]+$') AS integer)), 0) + 1
    INTO next_num
    FROM public.payments
    WHERE payment_number LIKE 'PAY-' || year_part || '-%';
    
    RETURN 'PAY-' || year_part || '-' || LPAD(next_num::text, 4, '0');
END;
$$ LANGUAGE plpgsql;

-- Create trigger functions for automatic numbering
CREATE OR REPLACE FUNCTION set_deal_number()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.deal_number IS NULL OR NEW.deal_number = '' THEN
        NEW.deal_number := generate_deal_number();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION set_job_number()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.job_number IS NULL OR NEW.job_number = '' THEN
        NEW.job_number := generate_job_number();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION set_payment_number()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.payment_number IS NULL OR NEW.payment_number = '' THEN
        NEW.payment_number := generate_payment_number();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the triggers
DROP TRIGGER IF EXISTS trigger_set_deal_number ON public.deals;
CREATE TRIGGER trigger_set_deal_number
    BEFORE INSERT ON public.deals
    FOR EACH ROW EXECUTE FUNCTION set_deal_number();

DROP TRIGGER IF EXISTS trigger_set_job_number ON public.jobs;
CREATE TRIGGER trigger_set_job_number
    BEFORE INSERT ON public.jobs
    FOR EACH ROW EXECUTE FUNCTION set_job_number();

DROP TRIGGER IF EXISTS trigger_set_payment_number ON public.payments;
CREATE TRIGGER trigger_set_payment_number
    BEFORE INSERT ON public.payments
    FOR EACH ROW EXECUTE FUNCTION set_payment_number();

-- Create triggers for updated_at timestamps on new tables
CREATE TRIGGER update_client_phones_updated_at BEFORE UPDATE ON public.client_phones FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_client_emails_updated_at BEFORE UPDATE ON public.client_emails FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_client_properties_updated_at BEFORE UPDATE ON public.client_properties FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_deals_updated_at BEFORE UPDATE ON public.deals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_jobs_updated_at BEFORE UPDATE ON public.jobs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON public.payments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tasks_updated_at BEFORE UPDATE ON public.tasks FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable realtime for all new tables
alter publication supabase_realtime add table client_phones;
alter publication supabase_realtime add table client_emails;
alter publication supabase_realtime add table client_properties;
alter publication supabase_realtime add table deals;
alter publication supabase_realtime add table deal_line_items;
alter publication supabase_realtime add table jobs;
alter publication supabase_realtime add table job_line_items;
alter publication supabase_realtime add table payments;
alter publication supabase_realtime add table tasks;

-- Create KPI tracking functions
CREATE OR REPLACE FUNCTION update_product_kpis()
RETURNS TRIGGER AS $$
BEGIN
    -- Update product KPIs when line items are added/updated
    IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
        UPDATE public.products 
        SET 
            total_sold_quantity = (
                SELECT COALESCE(SUM(quantity), 0) 
                FROM public.job_line_items 
                WHERE product_id = NEW.product_id
            ),
            total_revenue = (
                SELECT COALESCE(SUM(line_total), 0) 
                FROM public.job_line_items 
                WHERE product_id = NEW.product_id
            ),
            total_cost = (
                SELECT COALESCE(SUM(line_cost), 0) 
                FROM public.job_line_items 
                WHERE product_id = NEW.product_id
            )
        WHERE id = NEW.product_id;
    END IF;
    
    IF TG_OP = 'DELETE' THEN
        UPDATE public.products 
        SET 
            total_sold_quantity = (
                SELECT COALESCE(SUM(quantity), 0) 
                FROM public.job_line_items 
                WHERE product_id = OLD.product_id
            ),
            total_revenue = (
                SELECT COALESCE(SUM(line_total), 0) 
                FROM public.job_line_items 
                WHERE product_id = OLD.product_id
            ),
            total_cost = (
                SELECT COALESCE(SUM(line_cost), 0) 
                FROM public.job_line_items 
                WHERE product_id = OLD.product_id
            )
        WHERE id = OLD.product_id;
        RETURN OLD;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_service_kpis()
RETURNS TRIGGER AS $$
BEGIN
    -- Update service KPIs when line items are added/updated
    IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
        UPDATE public.services 
        SET 
            total_jobs_completed = (
                SELECT COUNT(DISTINCT jli.job_id) 
                FROM public.job_line_items jli
                JOIN public.jobs j ON j.id = jli.job_id
                WHERE jli.service_id = NEW.service_id AND j.status = 'completed'
            ),
            total_revenue = (
                SELECT COALESCE(SUM(line_total), 0) 
                FROM public.job_line_items 
                WHERE service_id = NEW.service_id
            ),
            total_cost = (
                SELECT COALESCE(SUM(line_cost), 0) 
                FROM public.job_line_items 
                WHERE service_id = NEW.service_id
            )
        WHERE id = NEW.service_id;
    END IF;
    
    IF TG_OP = 'DELETE' THEN
        UPDATE public.services 
        SET 
            total_jobs_completed = (
                SELECT COUNT(DISTINCT jli.job_id) 
                FROM public.job_line_items jli
                JOIN public.jobs j ON j.id = jli.job_id
                WHERE jli.service_id = OLD.service_id AND j.status = 'completed'
            ),
            total_revenue = (
                SELECT COALESCE(SUM(line_total), 0) 
                FROM public.job_line_items 
                WHERE service_id = OLD.service_id
            ),
            total_cost = (
                SELECT COALESCE(SUM(line_cost), 0) 
                FROM public.job_line_items 
                WHERE service_id = OLD.service_id
            )
        WHERE id = OLD.service_id;
        RETURN OLD;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for KPI updates
CREATE TRIGGER trigger_update_product_kpis
    AFTER INSERT OR UPDATE OR DELETE ON public.job_line_items
    FOR EACH ROW EXECUTE FUNCTION update_product_kpis();

CREATE TRIGGER trigger_update_service_kpis
    AFTER INSERT OR UPDATE OR DELETE ON public.job_line_items
    FOR EACH ROW EXECUTE FUNCTION update_service_kpis();

-- Insert sample data for testing
INSERT INTO public.services (name, description, category, base_price, cost_per_hour, unit) VALUES
('Tree Trimming', 'Professional tree trimming and pruning services', 'arboricultural', 150.00, 75.00, 'per hour'),
('Lawn Mowing', 'Regular lawn maintenance and mowing', 'lawn_care', 50.00, 25.00, 'per visit'),
('Irrigation Installation', 'Complete irrigation system design and installation', 'irrigation', 2500.00, 1200.00, 'per system'),
('Hardscape Installation', 'Patio, walkway, and retaining wall installation', 'hardscape', 5000.00, 2500.00, 'per project'),
('Landscape Design', 'Custom landscape design and planning', 'design', 500.00, 250.00, 'per design');

INSERT INTO public.products (name, description, category, cost_price, unit_price, unit) VALUES
('Premium Mulch', 'High-quality organic mulch', 'mulch', 25.00, 45.00, 'per yard'),
('Top Soil', 'Premium screened topsoil', 'soil', 30.00, 50.00, 'per yard'),
('River Rock', 'Decorative river rock for landscaping', 'gravel', 40.00, 70.00, 'per yard'),
('Red Oak Tree', '6-8 foot red oak tree', 'flora', 150.00, 300.00, 'each'),
('Irrigation Sprinkler Head', 'Professional grade sprinkler head', 'irrigation', 8.00, 15.00, 'each');
