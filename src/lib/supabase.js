import { createClient } from '@supabase/supabase-js';

// Public anon key — safe to include in client-side code (protected by RLS policies)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xckcepsallcbruluoovx.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhja2NlcHNhbGxjYnJ1bHVvb3Z4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1OTc5MjQsImV4cCI6MjA5MTE3MzkyNH0.tx5r53L9PQsaxl23_kdvun3WnxfhzmQtNScv-S_GBdE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Upload an image to Supabase Storage bucket 'image'.
 * Returns the public URL on success, or null on failure.
 * @param {File} file - The image file to upload
 * @param {string} folder - Subfolder path (e.g. 'hero', 'gallery', 'teachers')
 * @returns {Promise<{url: string|null, error: string|null}>}
 */
export async function uploadImage(file, folder = 'general') {
  try {
    // Generate unique filename: folder/timestamp_randomhex_originalname
    const timestamp = Date.now();
    const randomHex = Math.random().toString(16).slice(2, 8);
    // Sanitize filename: remove spaces and special chars
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const filePath = `${folder}/${timestamp}_${randomHex}_${safeName}`;

    const { data, error } = await supabase.storage
      .from('image')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) {
      console.error('Upload error:', error);
      return { url: null, error: error.message };
    }

    // Get the public URL
    const { data: urlData } = supabase.storage
      .from('image')
      .getPublicUrl(data.path);

    return { url: urlData.publicUrl, error: null };
  } catch (err) {
    console.error('Upload exception:', err);
    return { url: null, error: 'Gagal mengupload gambar. Silakan coba lagi.' };
  }
}

/**
 * Delete an image from Supabase Storage.
 * Extracts the file path from the public URL.
 * @param {string} publicUrl - The full public URL of the image
 * @returns {Promise<boolean>}
 */
export async function deleteImage(publicUrl) {
  if (!publicUrl) return false;

  try {
    // Extract path from URL: .../storage/v1/object/public/image/FILEPATH
    const marker = '/storage/v1/object/public/image/';
    const idx = publicUrl.indexOf(marker);
    if (idx === -1) return false; // Not a storage URL, skip

    const filePath = decodeURIComponent(publicUrl.substring(idx + marker.length));
    const { error } = await supabase.storage.from('image').remove([filePath]);

    if (error) {
      console.error('Delete error:', error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Delete exception:', err);
    return false;
  }
}

/**
 * Submit PPDB registration to Supabase
 */
export async function submitPPDBRegistration(data) {
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
