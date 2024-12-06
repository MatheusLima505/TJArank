import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jwxxdywpzrpqyauapcmd.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3eHhkeXdwenJwcXlhdWFwY21kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzMzA2MTksImV4cCI6MjA0ODkwNjYxOX0.jkxefDhucVUeakphKVUyaok_M9WUbQVp8UEAfQ6-iIY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);