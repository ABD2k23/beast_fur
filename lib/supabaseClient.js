// lib/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

// Ensure these environment variables are loaded.
// NEXT_PUBLIC_SUPABASE_URL is accessible on both client and server.
// SUPABASE_SERVICE_ROLE_KEY is only accessible on the server.

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Create a client for public (anon) access from the frontend
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Create a client for admin-level (service_role) access from the backend (API Routes)
// This client bypasses Row Level Security and should ONLY be used on the server.
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    persistSession: false, // Prevents storing session in localStorage, as it's for admin operations
  },
});
