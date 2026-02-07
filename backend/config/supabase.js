const { createClient } = require('@supabase/supabase-js');

// Only initialize if Supabase credentials are provided
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let supabase = null;
let supabaseAdmin = null;

// Validate Supabase URL format
const isValidSupabaseUrl = (url) => {
  if (!url) return false;
  if (url.includes('your-project') || url.includes('placeholder')) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' && url.includes('supabase.co');
  } catch {
    return false;
  }
};

// Initialize Supabase only if valid credentials are provided
if (isValidSupabaseUrl(supabaseUrl) && supabaseAnonKey && !supabaseAnonKey.includes('your-') && !supabaseAnonKey.includes('placeholder')) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log('✅ Supabase client initialized');
    
    if (supabaseServiceKey && !supabaseServiceKey.includes('your-') && !supabaseServiceKey.includes('placeholder')) {
      supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
      console.log('✅ Supabase admin client initialized');
    }
  } catch (error) {
    console.warn('⚠️  Supabase initialization failed:', error.message);
  }
} else {
  console.log('ℹ️  Supabase not configured - image uploads will be disabled');
}

module.exports = { supabase, supabaseAdmin };
