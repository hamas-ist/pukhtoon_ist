-- ==============================================================================
-- PUKHTOON SOCIETY — BULLETPROOF SUPABASE DATABASE SCRIPT
-- Institute of Space Technology (IST), Islamabad
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 2. CREATE ALL TABLES FIRST (Guarantees every relation exists)
-- ------------------------------------------------------------------------------

-- Table: students
CREATE TABLE IF NOT EXISTS public.students (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reg_no VARCHAR(20) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    department VARCHAR(80) NOT NULL,
    cohort VARCHAR(20) NOT NULL,
    phone VARCHAR(30) DEFAULT '',
    enrollment_status VARCHAR(20) DEFAULT 'ACTIVE',
    total_contributed NUMERIC(12, 2) DEFAULT 0.00,
    outstanding_balance NUMERIC(12, 2) DEFAULT 0.00,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: contribution_cycles
CREATE TABLE IF NOT EXISTS public.contribution_cycles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(150) NOT NULL,
    academic_term VARCHAR(50) NOT NULL,
    target_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    collected_amount NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    deadline DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'ACTIVE',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: events
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(180) NOT NULL,
    event_date DATE NOT NULL,
    location VARCHAR(150) NOT NULL,
    planned_budget NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    actual_spending NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
    status VARCHAR(20) DEFAULT 'UPCOMING',
    description TEXT DEFAULT '',
    lead_organizer VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: contributions
CREATE TABLE IF NOT EXISTS public.contributions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES public.students(id) ON DELETE CASCADE,
    cycle_id UUID REFERENCES public.contribution_cycles(id) ON DELETE SET NULL,
    amount NUMERIC(12, 2) NOT NULL,
    payment_method VARCHAR(30) DEFAULT 'Cash',
    transaction_ref VARCHAR(50) UNIQUE NOT NULL,
    status VARCHAR(20) DEFAULT 'VERIFIED',
    collected_by VARCHAR(100) NOT NULL DEFAULT 'Finance Secretary',
    collected_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: expenses
CREATE TABLE IF NOT EXISTS public.expenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
    title VARCHAR(180) NOT NULL,
    amount NUMERIC(12, 2) NOT NULL,
    category VARCHAR(50) NOT NULL,
    voucher_ref VARCHAR(50) UNIQUE NOT NULL,
    approved_by VARCHAR(100) NOT NULL,
    spent_at DATE NOT NULL DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: audit_logs (Explicitly created before any policies or alter statements)
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    action VARCHAR(100) NOT NULL,
    actor VARCHAR(100) NOT NULL,
    details TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 3. ENABLE ROW LEVEL SECURITY (RLS)
-- ------------------------------------------------------------------------------
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contribution_cycles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- 4. POLICIES (With DROP IF EXISTS to allow running multiple times safely)
-- ------------------------------------------------------------------------------

-- Students Policies
DROP POLICY IF EXISTS "Allow public read on students" ON public.students;
CREATE POLICY "Allow public read on students" ON public.students FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public insert on students" ON public.students;
CREATE POLICY "Allow public insert on students" ON public.students FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow public update on students" ON public.students;
CREATE POLICY "Allow public update on students" ON public.students FOR UPDATE USING (true);

-- Contribution Cycles Policies
DROP POLICY IF EXISTS "Allow public read on contribution_cycles" ON public.contribution_cycles;
CREATE POLICY "Allow public read on contribution_cycles" ON public.contribution_cycles FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public insert on contribution_cycles" ON public.contribution_cycles;
CREATE POLICY "Allow public insert on contribution_cycles" ON public.contribution_cycles FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow public update on contribution_cycles" ON public.contribution_cycles;
CREATE POLICY "Allow public update on contribution_cycles" ON public.contribution_cycles FOR UPDATE USING (true);

-- Contributions Policies
DROP POLICY IF EXISTS "Allow public read on contributions" ON public.contributions;
CREATE POLICY "Allow public read on contributions" ON public.contributions FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public insert on contributions" ON public.contributions;
CREATE POLICY "Allow public insert on contributions" ON public.contributions FOR INSERT WITH CHECK (true);

-- Events Policies
DROP POLICY IF EXISTS "Allow public read on events" ON public.events;
CREATE POLICY "Allow public read on events" ON public.events FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public insert on events" ON public.events;
CREATE POLICY "Allow public insert on events" ON public.events FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS "Allow public update on events" ON public.events;
CREATE POLICY "Allow public update on events" ON public.events FOR UPDATE USING (true);

-- Expenses Policies
DROP POLICY IF EXISTS "Allow public read on expenses" ON public.expenses;
CREATE POLICY "Allow public read on expenses" ON public.expenses FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public insert on expenses" ON public.expenses;
CREATE POLICY "Allow public insert on expenses" ON public.expenses FOR INSERT WITH CHECK (true);

-- Audit Logs Policies
DROP POLICY IF EXISTS "Allow public read on audit_logs" ON public.audit_logs;
CREATE POLICY "Allow public read on audit_logs" ON public.audit_logs FOR SELECT USING (true);
DROP POLICY IF EXISTS "Allow public insert on audit_logs" ON public.audit_logs;
CREATE POLICY "Allow public insert on audit_logs" ON public.audit_logs FOR INSERT WITH CHECK (true);

-- ------------------------------------------------------------------------------
-- 5. SEED DATA (IST Islamabad Baseline Records)
-- ------------------------------------------------------------------------------
INSERT INTO public.students (reg_no, full_name, email, department, cohort, enrollment_status, total_contributed, outstanding_balance) VALUES
('210104012', 'Muhammad Ahmad Khan', 'ahmad.khan@ist.edu.pk', 'Aerospace Engineering', '2021-2025', 'ACTIVE', 6000.00, 0.00),
('220101004', 'Bilal Khattak', 'bilal.khattak@ist.edu.pk', 'Computer Science', '2022-2026', 'ACTIVE', 4500.00, 1500.00),
('210102045', 'Hamza Afridi', 'hamza.afridi@ist.edu.pk', 'Electrical Engineering', '2021-2025', 'ACTIVE', 6000.00, 0.00),
('230103019', 'Zarghona Khattak', 'zarghona.k@ist.edu.pk', 'Avionics Engineering', '2023-2027', 'ACTIVE', 3000.00, 0.00),
('220105031', 'Shahid Khan Shinwari', 'shahid.shinwari@ist.edu.pk', 'Mechanical Engineering', '2022-2026', 'ACTIVE', 3000.00, 1500.00),
('230101088', 'Palwasha Wazir', 'palwasha.wazir@ist.edu.pk', 'Computer Science', '2023-2027', 'ACTIVE', 3000.00, 0.00),
('240106002', 'Sher Alam Mehsud', 'sher.alam@ist.edu.pk', 'Space Sciences', '2024-2028', 'ACTIVE', 1500.00, 0.00),
('240107015', 'Gul Panra Yousafzai', 'gul.panra@ist.edu.pk', 'Materials Science', '2024-2028', 'ACTIVE', 1500.00, 0.00)
ON CONFLICT (reg_no) DO NOTHING;

INSERT INTO public.contribution_cycles (title, academic_term, target_amount, collected_amount, deadline, status) VALUES
('Fall 2026 Society Registration & Welfare Fund', 'Fall 2026', 150000.00, 114500.00, '2026-10-30', 'ACTIVE'),
('Khyber Cultural Night 2026 Special Sponsorship', 'Fall 2026', 120000.00, 95000.00, '2026-10-10', 'ACTIVE'),
('Spring 2026 Annual Society Operating Dues', 'Spring 2026', 125000.00, 125000.00, '2026-04-15', 'COMPLETED')
ON CONFLICT DO NOTHING;

INSERT INTO public.events (title, event_date, location, planned_budget, actual_spending, status, description, lead_organizer) VALUES
('Khyber Cultural Night & Annual Gala 2026', '2026-10-15', 'IST Main Auditorium, Islamabad', 120000.00, 94500.00, 'UPCOMING', 'The signature annual cultural festivity of IST Pukhtoon Society featuring traditional Attan, Pashto mushaira, and ethnic delicacies.', 'Zarghona Khattak'),
('Freshers Welcome & Orientation Gathering', '2026-09-10', 'IST Student Activity Center', 45000.00, 41200.00, 'COMPLETED', 'Welcoming ceremony for new Batch 2024-2028 freshmen across all university faculties.', 'Muhammad Ahmad Khan'),
('Annual Pashto Poetry Mushaira 2026', '2026-11-20', 'IST Space Sciences Seminar Hall', 35000.00, 0.00, 'UPCOMING', 'Literary symposium featuring prominent contemporary poets and student writers.', 'Palwasha Wazir')
ON CONFLICT DO NOTHING;

INSERT INTO public.audit_logs (action, actor, details) VALUES
('SYSTEM_INITIALIZED', 'Directorate of Student Affairs', 'Database schema successfully provisioned on Supabase PostgreSQL.'),
('OFFICERS_MIGRATED', 'Super Admin', 'Initial student council registry and treasury baselines configured.')
ON CONFLICT DO NOTHING;
