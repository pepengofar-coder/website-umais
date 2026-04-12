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
 * Upload an image to Supabase Storage bucket 'image'.
 * Returns the public URL on success, or null on failure.
 * @param {File} file - The image file to upload
 * @param {string} folder - Subfolder path (e.g. 'hero', 'gallery', 'teachers')
 * @returns {Promise<{url: string|null, error: string|null}>}
 */
export async function uploadImage(file, folder = 'general') {
  if (!supabase) {
    return { url: null, error: 'Supabase tidak terkonfigurasi.' };
  }

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
  if (!supabase || !publicUrl) return false;

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
