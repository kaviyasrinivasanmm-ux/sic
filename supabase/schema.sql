-- ============================================================
-- BLOOM Wellness Spa - Complete Supabase Database Architecture
-- Project URL: https://jamxlrouxqesemsxgqne.supabase.co
-- Key: sb_publishable_XDgVLhUa-C0Je4MRGE00Lg_IsbReMvG
-- Safe Execution: Uses IF NOT EXISTS for all 12 tables & policies
-- ============================================================

-- Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS / PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(50),
  role VARCHAR(50) DEFAULT 'customer', -- 'customer', 'admin', 'therapist'
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. TREATMENTS TABLE
CREATE TABLE IF NOT EXISTS public.treatments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  duration INT NOT NULL DEFAULT 60, -- minutes
  image TEXT,
  category VARCHAR(100) DEFAULT 'Massage Therapy',
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. THERAPISTS TABLE
CREATE TABLE IF NOT EXISTS public.therapists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(50),
  specialization TEXT[] DEFAULT '{}',
  image TEXT,
  experience_years INT DEFAULT 5,
  rating NUMERIC(3, 2) DEFAULT 4.9,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. THERAPIST AVAILABILITY TABLE
CREATE TABLE IF NOT EXISTS public.therapist_availability (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  therapist_id UUID REFERENCES public.therapists(id) ON DELETE CASCADE,
  day_of_week VARCHAR(20) NOT NULL, -- 'Monday', 'Tuesday', etc.
  start_time TIME NOT NULL DEFAULT '10:00:00',
  end_time TIME NOT NULL DEFAULT '20:00:00',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_ref VARCHAR(20) UNIQUE NOT NULL,
  customer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50) NOT NULL,
  treatment_id UUID REFERENCES public.treatments(id) ON DELETE SET NULL,
  treatment_name VARCHAR(255) NOT NULL,
  therapist_id UUID REFERENCES public.therapists(id) ON DELETE SET NULL,
  therapist_name VARCHAR(255) NOT NULL,
  booking_date DATE NOT NULL,
  booking_time VARCHAR(50) NOT NULL,
  duration_mins INT NOT NULL DEFAULT 60,
  status VARCHAR(50) DEFAULT 'confirmed', -- 'pending', 'confirmed', 'completed', 'cancelled'
  price NUMERIC(10, 2) NOT NULL,
  payment_status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'paid', 'refunded'
  special_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. PAYMENTS TABLE
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  amount NUMERIC(10, 2) NOT NULL,
  payment_method VARCHAR(50) DEFAULT 'Card / UPI at Spa', -- 'Card', 'UPI', 'Cash', 'NetBanking'
  status VARCHAR(50) DEFAULT 'completed', -- 'pending', 'completed', 'failed', 'refunded'
  payment_date TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. EXPENSES TABLE
CREATE TABLE IF NOT EXISTS public.expenses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  amount NUMERIC(10, 2) NOT NULL,
  expense_date DATE DEFAULT CURRENT_DATE,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. MEMBERSHIPS TABLE
CREATE TABLE IF NOT EXISTS public.memberships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  duration VARCHAR(50) DEFAULT 'Monthly', -- 'Monthly', 'Annual'
  benefits TEXT[] DEFAULT '{}',
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. CUSTOMER MEMBERSHIPS TABLE
CREATE TABLE IF NOT EXISTS public.customer_memberships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  customer_email VARCHAR(255) NOT NULL,
  membership_id UUID REFERENCES public.memberships(id) ON DELETE CASCADE,
  membership_name VARCHAR(255) NOT NULL,
  start_date DATE DEFAULT CURRENT_DATE,
  end_date DATE DEFAULT (CURRENT_DATE + INTERVAL '30 days'),
  status VARCHAR(50) DEFAULT 'active', -- 'active', 'expired', 'cancelled'
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 10. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  customer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  customer_name VARCHAR(255) NOT NULL,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE SET NULL,
  rating NUMERIC(2, 1) CHECK (rating >= 1.0 AND rating <= 5.0),
  comment TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 11. NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  read_status BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. ADMIN ACTIVITY LOGS TABLE
CREATE TABLE IF NOT EXISTS public.admin_activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_name VARCHAR(255) DEFAULT 'Master Admin',
  action VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 13. CANCELLATION REQUESTS TABLE (Staff & Chatbot Integration)
CREATE TABLE IF NOT EXISTS public.cancellation_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  request_ref VARCHAR(50) UNIQUE NOT NULL,
  booking_ref VARCHAR(50) NOT NULL,
  client_name VARCHAR(255) NOT NULL,
  client_email VARCHAR(255) NOT NULL,
  client_phone VARCHAR(50),
  treatment_name VARCHAR(255),
  booking_date VARCHAR(50),
  reason TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'Pending', -- 'Pending', 'Accepted', 'Declined'
  staff_response TEXT,
  reviewed_at TIMESTAMPTZ,
  reviewed_by VARCHAR(255),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.treatments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.therapists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.therapist_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_activity_logs ENABLE ROW LEVEL SECURITY;

-- Helper to safely drop existing policies before recreating
DO $$ 
BEGIN
  -- Profiles Policies
  EXECUTE 'DROP POLICY IF EXISTS "Public select profiles" ON public.profiles';
  EXECUTE 'DROP POLICY IF EXISTS "Public insert profiles" ON public.profiles';
  EXECUTE 'DROP POLICY IF EXISTS "Public update profiles" ON public.profiles';
  
  -- Treatments Policies
  EXECUTE 'DROP POLICY IF EXISTS "Public select treatments" ON public.treatments';
  EXECUTE 'DROP POLICY IF EXISTS "Public manage treatments" ON public.treatments';

  -- Therapists Policies
  EXECUTE 'DROP POLICY IF EXISTS "Public select therapists" ON public.therapists';
  EXECUTE 'DROP POLICY IF EXISTS "Public manage therapists" ON public.therapists';

  -- Bookings Policies
  EXECUTE 'DROP POLICY IF EXISTS "Public select bookings" ON public.bookings';
  EXECUTE 'DROP POLICY IF EXISTS "Public insert bookings" ON public.bookings';
  EXECUTE 'DROP POLICY IF EXISTS "Public update bookings" ON public.bookings';
  EXECUTE 'DROP POLICY IF EXISTS "Public delete bookings" ON public.bookings';

  -- Payments Policies
  EXECUTE 'DROP POLICY IF EXISTS "Public select payments" ON public.payments';
  EXECUTE 'DROP POLICY IF EXISTS "Public insert payments" ON public.payments';

  -- Expenses Policies
  EXECUTE 'DROP POLICY IF EXISTS "Public select expenses" ON public.expenses';
  EXECUTE 'DROP POLICY IF EXISTS "Public manage expenses" ON public.expenses';

  -- Memberships Policies
  EXECUTE 'DROP POLICY IF EXISTS "Public select memberships" ON public.memberships';
  EXECUTE 'DROP POLICY IF EXISTS "Public select customer_memberships" ON public.customer_memberships';
  EXECUTE 'DROP POLICY IF EXISTS "Public insert customer_memberships" ON public.customer_memberships';

  -- Reviews Policies
  EXECUTE 'DROP POLICY IF EXISTS "Public select reviews" ON public.reviews';
  EXECUTE 'DROP POLICY IF EXISTS "Public insert reviews" ON public.reviews';

  -- Notifications Policies
  EXECUTE 'DROP POLICY IF EXISTS "Public select notifications" ON public.notifications';

  -- Admin Activity Logs Policies
  EXECUTE 'DROP POLICY IF EXISTS "Public select admin_logs" ON public.admin_activity_logs';
  EXECUTE 'DROP POLICY IF EXISTS "Public insert admin_logs" ON public.admin_activity_logs';
END $$;

-- RLS Declarations for Anon/Public Client App Access
CREATE POLICY "Public select profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public insert profiles" ON public.profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update profiles" ON public.profiles FOR UPDATE USING (true);

CREATE POLICY "Public select treatments" ON public.treatments FOR SELECT USING (true);
CREATE POLICY "Public manage treatments" ON public.treatments FOR ALL USING (true);

CREATE POLICY "Public select therapists" ON public.therapists FOR SELECT USING (true);
CREATE POLICY "Public manage therapists" ON public.therapists FOR ALL USING (true);

CREATE POLICY "Public select bookings" ON public.bookings FOR SELECT USING (true);
CREATE POLICY "Public insert bookings" ON public.bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update bookings" ON public.bookings FOR UPDATE USING (true);
CREATE POLICY "Public delete bookings" ON public.bookings FOR DELETE USING (true);

CREATE POLICY "Public select payments" ON public.payments FOR SELECT USING (true);
CREATE POLICY "Public insert payments" ON public.payments FOR INSERT WITH CHECK (true);

CREATE POLICY "Public select expenses" ON public.expenses FOR SELECT USING (true);
CREATE POLICY "Public manage expenses" ON public.expenses FOR ALL USING (true);

CREATE POLICY "Public select memberships" ON public.memberships FOR SELECT USING (true);
CREATE POLICY "Public select customer_memberships" ON public.customer_memberships FOR SELECT USING (true);
CREATE POLICY "Public insert customer_memberships" ON public.customer_memberships FOR INSERT WITH CHECK (true);

CREATE POLICY "Public select reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Public insert reviews" ON public.reviews FOR INSERT WITH CHECK (true);

CREATE POLICY "Public select notifications" ON public.notifications FOR SELECT USING (true);

CREATE POLICY "Public select admin_logs" ON public.admin_activity_logs FOR SELECT USING (true);
CREATE POLICY "Public insert admin_logs" ON public.admin_activity_logs FOR INSERT WITH CHECK (true);

ALTER TABLE public.cancellation_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public select cancellation_requests" ON public.cancellation_requests FOR SELECT USING (true);
CREATE POLICY "Public insert cancellation_requests" ON public.cancellation_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Staff update cancellation_requests" ON public.cancellation_requests FOR UPDATE USING (true);

-- ============================================================
-- BASELINE DATA SEEDING
-- Populate baseline catalog items if missing
-- ============================================================

INSERT INTO public.treatments (name, description, price, duration, category, active)
VALUES
  ('Swedish Massage (Serenity Ritual)', 'European therapeutic ritual employing long gliding effleurage strokes for deep full-body muscular relaxation.', 3499, 90, 'Relaxation Therapy', true),
  ('Deep Tissue Therapy (Deep Recovery)', 'Reaches deep muscle layers and sub-fascial tension to release chronic postural knots.', 4299, 90, 'Pain Relief & Physio', true),
  ('Aromatherapy Ritual (Eucalyptus Bliss)', 'Custom-blended 100% pure steam-distilled essential oils paired with gentle lymphatic drainage.', 3999, 90, 'Holistic & Sensory', true),
  ('Reflexology (Sole & Spirit Harmony)', 'Systematic pressure applied to foot and hand meridian reflex points to revitalize internal organ balance.', 2999, 60, 'Holistic & Sensory', true),
  ('Hot Stone Therapy (Thermal Balance)', 'Polished volcanic basalt stones heated to 54°C placed along spinal chakra centers for thermal healing.', 4799, 90, 'Thermal Therapy', true)
ON CONFLICT DO NOTHING;

INSERT INTO public.therapists (name, email, phone, specialization, rating, active)
VALUES
  ('Sarah Jenkins', 'sarah.j@bloom.com', '+91 98765 00001', '{"Swedish Massage", "Aromatherapy"}', 4.95, true),
  ('David Vance', 'david.v@bloom.com', '+91 98765 00002', '{"Deep Tissue Therapy", "Sports Physio"}', 4.92, true),
  ('Helen Lin', 'helen.l@bloom.com', '+91 98765 00003', '{"Hot Stone Therapy", "Reflexology"}', 4.98, true)
ON CONFLICT DO NOTHING;

INSERT INTO public.memberships (name, price, duration, benefits, active)
VALUES
  ('Silver Serenity Pass', 9999, 'Monthly', '{"2 Full 90-min Massage Sessions", "15% Off Additional Rituals", "Priority Weekend Booking"}', true),
  ('Gold BLOOM Elite Pass', 18999, 'Monthly', '{"4 Full 90-min Ritual Sessions", "25% Off All Signature Packages", "Dedicated Senior Therapist Match"}', true),
  ('Family Spa Circle Pass', 29999, 'Monthly', '{"8 Shared 90-min Ritual Sessions", "Transferable among Family Members", "VIP Suite Reservation"}', true)
ON CONFLICT DO NOTHING;
