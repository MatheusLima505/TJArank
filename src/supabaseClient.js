import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wrofosfnenktzukayekp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indyb2Zvc2ZuZW5rdHp1a2F5ZWtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI5MjI0MDQsImV4cCI6MjA0ODQ5ODQwNH0.RMjHg-dPNcnv81zcajlAyG-ttbpu-ADm7xiNATKFm04';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
