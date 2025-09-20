import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_ANON_KEY || ''

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase environment variables not set. Using fallback storage.')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// Database types
export interface TierListRow {
  id: string
  state: any
  remix_of: string | null
  created_at: string
  updated_at: string
}
