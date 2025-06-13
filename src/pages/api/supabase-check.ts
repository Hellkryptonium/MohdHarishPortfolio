import { supabase } from '../../utils/supabaseClient';

export default async function handler(req, res) {
  // Try a simple query to check connection
  const { data, error } = await supabase.from("posts").select("id").limit(1);
  if (error) {
    res.status(500).json({ success: false, error: error.message });
    return;
  }
  res.status(200).json({ success: true, data });
}
