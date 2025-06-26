// infra/clients/supabase.client.ts
import { createClient } from "@supabase/supabase-js";

export const createSupabaseClient = () => {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_KEY;
  if (!url || !key) throw new Error("Missing SUPABASE env vars");

  return createClient(url, key);
};
