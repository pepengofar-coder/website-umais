import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase credentials not found. PPDB form submissions will redirect to WhatsApp only.'
  );
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Submit PPDB registration to Supabase
 */
export async function submitPPDBRegistration(data) {
  if (!supabase) {
    console.warn('Supabase not configured. Skipping database submission.');
    return { success: false, reason: 'no-supabase' };
  }

  try {
    const { data: result, error } = await supabase
      .from('ppdb_registrations')
      .insert([
        {
          student_name: data.studentName,
          parent_name: data.parentName,
          whatsapp: data.whatsapp,
          school_origin: data.school,
          message: data.message || null,
          status: 'pending',
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return { success: true, data: result };
  } catch (error) {
    console.error('Error submitting PPDB registration:', error);
    return { success: false, reason: 'error', error };
  }
}
