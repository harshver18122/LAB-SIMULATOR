import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ehsuegozrrygdrtgxykq.supabase.co';
const supabaseKey = 
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
  'sb_publishable_zm7GL45WCCXBcM2kQXB0Bw_IRfq203Z';

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl && 
    supabaseKey && 
    !supabaseKey.includes('your_supabase_anon_key_here')
  );
};

export const supabase = createClient(supabaseUrl, supabaseKey);
