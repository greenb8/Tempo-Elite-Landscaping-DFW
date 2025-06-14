-- Elite Landscaping DFW CRM Database Schema
-- This migration creates all the necessary tables for the CRM system

-- Clients table - Core client information
CREATE TABLE IF NOT EXISTS public.clients (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    company_name text,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text,
    phone text,
    secondary_phone text,
    address text,
    city text,
    state text,
    zip_code text,
    client_type text CHECK (client_type IN ('residential', 'commercial')) DEFAULT 'residential',
    status text CHECK (status IN ('active', 'inactive', 'prospect')) DEFAULT 'prospect',
    notes text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Properties table - Property details for each client
CREATE TABLE IF NOT EXISTS public.properties (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id uuid REFERENCES public.clients(id) ON DELETE CASCADE,
    property_name text,
    address text NOT NULL,
    city text,
    state text,
    zip_code text,
    property_type text CHECK (property_type IN ('residential', 'commercial', 'industrial')) DEFAULT 'residential',
    square_footage integer,
    lot_size decimal,
    special_instructions text,
    access_notes text,
    is_primary boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Services table - Available landscaping services
CREATE TABLE IF NOT EXISTS public.services (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    description text,
    category text CHECK (category IN ('maintenance', 'installation', 'design', 'irrigation', 'hardscape', 'seasonal')) NOT NULL,
    base_price decimal(10,2),
    unit text, -- per sq ft, per hour, flat rate, etc.
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Products table - Materials and products used
CREATE TABLE IF NOT EXISTS public.products (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    description text,
    category text,
    sku text UNIQUE,
    unit_price decimal(10,2),
    unit text, -- each, bag, yard, etc.
    stock_quantity integer DEFAULT 0,
    reorder_level integer DEFAULT 0,
    supplier text,
    is_active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Leads table - Sales pipeline management
CREATE TABLE IF NOT EXISTS public.leads (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    client_id uuid REFERENCES public.clients(id) ON DELETE SET NULL,
    source text, -- referral, website, social media, etc.
    status text CHECK (status IN ('new', 'contacted', 'qualified', 'proposal_sent', 'negotiating', 'won', 'lost')) DEFAULT 'new',
    priority text CHECK (priority IN ('low', 'medium', 'high')) DEFAULT 'medium',
    estimated_value decimal(10,2),
    probability integer CHECK (probability >= 0 AND probability <= 100) DEFAULT 50,
    expected_close_date date,
    notes text,
    assigned_to uuid REFERENCES auth.users(id),
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Proposals table - Detailed proposals for clients
CREATE TABLE IF NOT EXISTS public.proposals (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id uuid REFERENCES public.leads(id) ON DELETE CASCADE,
    client_id uuid REFERENCES public.clients(id) ON DELETE CASCADE,
    property_id uuid REFERENCES public.properties(id) ON DELETE SET NULL,
    proposal_number text UNIQUE NOT NULL,
    title text NOT NULL,
    description text,
    status text CHECK (status IN ('draft', 'sent', 'viewed', 'accepted', 'rejected', 'expired')) DEFAULT 'draft',
    subtotal decimal(10,2) DEFAULT 0,
    tax_rate decimal(5,4) DEFAULT 0,
    tax_amount decimal(10,2) DEFAULT 0,
    total_amount decimal(10,2) DEFAULT 0,
    valid_until date,
    terms_conditions text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Proposal line items - Services and products in proposals
CREATE TABLE IF NOT EXISTS public.proposal_line_items (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    proposal_id uuid REFERENCES public.proposals(id) ON DELETE CASCADE,
    service_id uuid REFERENCES public.services(id) ON DELETE SET NULL,
    product_id uuid REFERENCES public.products(id) ON DELETE SET NULL,
    description text NOT NULL,
    quantity decimal(10,2) NOT NULL DEFAULT 1,
    unit_price decimal(10,2) NOT NULL,
    line_total decimal(10,2) NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Projects table - Accepted proposals become projects
CREATE TABLE IF NOT EXISTS public.projects (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    proposal_id uuid REFERENCES public.proposals(id) ON DELETE SET NULL,
    client_id uuid REFERENCES public.clients(id) ON DELETE CASCADE,
    property_id uuid REFERENCES public.properties(id) ON DELETE SET NULL,
    project_number text UNIQUE NOT NULL,
    name text NOT NULL,
    description text,
    status text CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled', 'on_hold')) DEFAULT 'scheduled',
    start_date date,
    end_date date,
    estimated_hours decimal(8,2),
    actual_hours decimal(8,2),
    budget decimal(10,2),
    actual_cost decimal(10,2),
    assigned_to uuid REFERENCES auth.users(id),
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Maintenance accounts - Recurring service agreements
CREATE TABLE IF NOT EXISTS public.maintenance_accounts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id uuid REFERENCES public.clients(id) ON DELETE CASCADE,
    property_id uuid REFERENCES public.properties(id) ON DELETE CASCADE,
    account_name text NOT NULL,
    billing_frequency text CHECK (billing_frequency IN ('weekly', 'bi_weekly', 'monthly', 'quarterly', 'annually')) DEFAULT 'monthly',
    billing_amount decimal(10,2) NOT NULL,
    start_date date NOT NULL,
    end_date date,
    status text CHECK (status IN ('active', 'paused', 'cancelled')) DEFAULT 'active',
    auto_invoice boolean DEFAULT true,
    next_billing_date date,
    notes text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Maintenance services - Services included in maintenance accounts
CREATE TABLE IF NOT EXISTS public.maintenance_services (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    maintenance_account_id uuid REFERENCES public.maintenance_accounts(id) ON DELETE CASCADE,
    service_id uuid REFERENCES public.services(id) ON DELETE CASCADE,
    frequency text, -- weekly, monthly, seasonal, etc.
    notes text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Invoices table - Financial management
CREATE TABLE IF NOT EXISTS public.invoices (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id uuid REFERENCES public.clients(id) ON DELETE CASCADE,
    project_id uuid REFERENCES public.projects(id) ON DELETE SET NULL,
    maintenance_account_id uuid REFERENCES public.maintenance_accounts(id) ON DELETE SET NULL,
    invoice_number text UNIQUE NOT NULL,
    status text CHECK (status IN ('draft', 'sent', 'paid', 'overdue', 'cancelled')) DEFAULT 'draft',
    issue_date date NOT NULL DEFAULT CURRENT_DATE,
    due_date date NOT NULL,
    subtotal decimal(10,2) DEFAULT 0,
    tax_rate decimal(5,4) DEFAULT 0,
    tax_amount decimal(10,2) DEFAULT 0,
    total_amount decimal(10,2) DEFAULT 0,
    paid_amount decimal(10,2) DEFAULT 0,
    payment_date date,
    payment_method text,
    notes text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Invoice line items - Detailed billing items
CREATE TABLE IF NOT EXISTS public.invoice_line_items (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_id uuid REFERENCES public.invoices(id) ON DELETE CASCADE,
    service_id uuid REFERENCES public.services(id) ON DELETE SET NULL,
    product_id uuid REFERENCES public.products(id) ON DELETE SET NULL,
    description text NOT NULL,
    quantity decimal(10,2) NOT NULL DEFAULT 1,
    unit_price decimal(10,2) NOT NULL,
    line_total decimal(10,2) NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Work orders - Daily work tracking
CREATE TABLE IF NOT EXISTS public.work_orders (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id uuid REFERENCES public.projects(id) ON DELETE SET NULL,
    maintenance_account_id uuid REFERENCES public.maintenance_accounts(id) ON DELETE SET NULL,
    client_id uuid REFERENCES public.clients(id) ON DELETE CASCADE,
    property_id uuid REFERENCES public.properties(id) ON DELETE CASCADE,
    work_order_number text UNIQUE NOT NULL,
    title text NOT NULL,
    description text,
    status text CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled')) DEFAULT 'scheduled',
    scheduled_date date,
    completed_date date,
    assigned_to uuid REFERENCES auth.users(id),
    estimated_hours decimal(8,2),
    actual_hours decimal(8,2),
    notes text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Time tracking - Employee time on projects
CREATE TABLE IF NOT EXISTS public.time_entries (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    work_order_id uuid REFERENCES public.work_orders(id) ON DELETE SET NULL,
    project_id uuid REFERENCES public.projects(id) ON DELETE SET NULL,
    client_id uuid REFERENCES public.clients(id) ON DELETE CASCADE,
    date date NOT NULL DEFAULT CURRENT_DATE,
    start_time time,
    end_time time,
    hours decimal(8,2) NOT NULL,
    description text,
    billable boolean DEFAULT true,
    hourly_rate decimal(8,2),
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Equipment table - Company equipment tracking
CREATE TABLE IF NOT EXISTS public.equipment (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    type text, -- mower, truck, trailer, etc.
    model text,
    serial_number text,
    purchase_date date,
    purchase_price decimal(10,2),
    status text CHECK (status IN ('active', 'maintenance', 'retired')) DEFAULT 'active',
    assigned_to uuid REFERENCES auth.users(id),
    maintenance_schedule text,
    last_maintenance_date date,
    next_maintenance_date date,
    notes text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now())
);

-- Enable realtime for all tables
alter publication supabase_realtime add table clients;
alter publication supabase_realtime add table properties;
alter publication supabase_realtime add table services;
alter publication supabase_realtime add table products;
alter publication supabase_realtime add table leads;
alter publication supabase_realtime add table proposals;
alter publication supabase_realtime add table proposal_line_items;
alter publication supabase_realtime add table projects;
alter publication supabase_realtime add table maintenance_accounts;
alter publication supabase_realtime add table maintenance_services;
alter publication supabase_realtime add table invoices;
alter publication supabase_realtime add table invoice_line_items;
alter publication supabase_realtime add table work_orders;
alter publication supabase_realtime add table time_entries;
alter publication supabase_realtime add table equipment;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_clients_user_id ON public.clients(user_id);
CREATE INDEX IF NOT EXISTS idx_clients_status ON public.clients(status);
CREATE INDEX IF NOT EXISTS idx_properties_client_id ON public.properties(client_id);
CREATE INDEX IF NOT EXISTS idx_leads_user_id ON public.leads(user_id);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_proposals_client_id ON public.proposals(client_id);
CREATE INDEX IF NOT EXISTS idx_projects_client_id ON public.projects(client_id);
CREATE INDEX IF NOT EXISTS idx_invoices_client_id ON public.invoices(client_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON public.invoices(status);
CREATE INDEX IF NOT EXISTS idx_work_orders_client_id ON public.work_orders(client_id);
CREATE INDEX IF NOT EXISTS idx_time_entries_user_id ON public.time_entries(user_id);
CREATE INDEX IF NOT EXISTS idx_time_entries_date ON public.time_entries(date);

-- Create functions for automatic numbering
CREATE OR REPLACE FUNCTION generate_proposal_number()
RETURNS text AS $$
DECLARE
    next_num integer;
    year_part text;
BEGIN
    year_part := EXTRACT(year FROM CURRENT_DATE)::text;
    
    SELECT COALESCE(MAX(CAST(SUBSTRING(proposal_number FROM '[0-9]+$') AS integer)), 0) + 1
    INTO next_num
    FROM public.proposals
    WHERE proposal_number LIKE 'PROP-' || year_part || '-%';
    
    RETURN 'PROP-' || year_part || '-' || LPAD(next_num::text, 4, '0');
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION generate_invoice_number()
RETURNS text AS $$
DECLARE
    next_num integer;
    year_part text;
BEGIN
    year_part := EXTRACT(year FROM CURRENT_DATE)::text;
    
    SELECT COALESCE(MAX(CAST(SUBSTRING(invoice_number FROM '[0-9]+$') AS integer)), 0) + 1
    INTO next_num
    FROM public.invoices
    WHERE invoice_number LIKE 'INV-' || year_part || '-%';
    
    RETURN 'INV-' || year_part || '-' || LPAD(next_num::text, 4, '0');
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION generate_project_number()
RETURNS text AS $$
DECLARE
    next_num integer;
    year_part text;
BEGIN
    year_part := EXTRACT(year FROM CURRENT_DATE)::text;
    
    SELECT COALESCE(MAX(CAST(SUBSTRING(project_number FROM '[0-9]+$') AS integer)), 0) + 1
    INTO next_num
    FROM public.projects
    WHERE project_number LIKE 'PROJ-' || year_part || '-%';
    
    RETURN 'PROJ-' || year_part || '-' || LPAD(next_num::text, 4, '0');
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION generate_work_order_number()
RETURNS text AS $$
DECLARE
    next_num integer;
    year_part text;
BEGIN
    year_part := EXTRACT(year FROM CURRENT_DATE)::text;
    
    SELECT COALESCE(MAX(CAST(SUBSTRING(work_order_number FROM '[0-9]+$') AS integer)), 0) + 1
    INTO next_num
    FROM public.work_orders
    WHERE work_order_number LIKE 'WO-' || year_part || '-%';
    
    RETURN 'WO-' || year_part || '-' || LPAD(next_num::text, 4, '0');
END;
$$ LANGUAGE plpgsql;

-- Create triggers for automatic numbering
CREATE OR REPLACE FUNCTION set_proposal_number()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.proposal_number IS NULL OR NEW.proposal_number = '' THEN
        NEW.proposal_number := generate_proposal_number();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION set_invoice_number()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.invoice_number IS NULL OR NEW.invoice_number = '' THEN
        NEW.invoice_number := generate_invoice_number();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION set_project_number()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.project_number IS NULL OR NEW.project_number = '' THEN
        NEW.project_number := generate_project_number();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION set_work_order_number()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.work_order_number IS NULL OR NEW.work_order_number = '' THEN
        NEW.work_order_number := generate_work_order_number();
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the triggers
DROP TRIGGER IF EXISTS trigger_set_proposal_number ON public.proposals;
CREATE TRIGGER trigger_set_proposal_number
    BEFORE INSERT ON public.proposals
    FOR EACH ROW EXECUTE FUNCTION set_proposal_number();

DROP TRIGGER IF EXISTS trigger_set_invoice_number ON public.invoices;
CREATE TRIGGER trigger_set_invoice_number
    BEFORE INSERT ON public.invoices
    FOR EACH ROW EXECUTE FUNCTION set_invoice_number();

DROP TRIGGER IF EXISTS trigger_set_project_number ON public.projects;
CREATE TRIGGER trigger_set_project_number
    BEFORE INSERT ON public.projects
    FOR EACH ROW EXECUTE FUNCTION set_project_number();

DROP TRIGGER IF EXISTS trigger_set_work_order_number ON public.work_orders;
CREATE TRIGGER trigger_set_work_order_number
    BEFORE INSERT ON public.work_orders
    FOR EACH ROW EXECUTE FUNCTION set_work_order_number();

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at timestamps
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON public.clients FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON public.properties FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_leads_updated_at BEFORE UPDATE ON public.leads FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_proposals_updated_at BEFORE UPDATE ON public.proposals FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_maintenance_accounts_updated_at BEFORE UPDATE ON public.maintenance_accounts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON public.invoices FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_work_orders_updated_at BEFORE UPDATE ON public.work_orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_time_entries_updated_at BEFORE UPDATE ON public.time_entries FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_equipment_updated_at BEFORE UPDATE ON public.equipment FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
