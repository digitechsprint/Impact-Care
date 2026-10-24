import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** True when Supabase env vars are configured. */
export const isSupabaseConfigured = Boolean(url && anon);

/** Server-side client — fresh instance per call, no session persistence. */
export function createServerSupabase(): SupabaseClient | null {
  if (!url || !anon) return null;
  return createClient(url, anon, { auth: { persistSession: false } });
}

/** Client-side singleton for 'use client' components. */
let _client: SupabaseClient | null = null;
export function getSupabaseClient(): SupabaseClient | null {
  if (!url || !anon) return null;
  if (!_client) _client = createClient(url, anon);
  return _client;
}
