import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jamxlrouxqesemsxgqne.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_XDgVLhUa-C0Je4MRGE00Lg_IsbReMvG'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
