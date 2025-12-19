import { createClient } from '@supabase/supabase-js';

// Я достал твой Project URL из токена, который ты скинул
const supabaseUrl = 'https://fachbafkftmatoytdpov.supabase.co';

// Твой Anon Key (публичный ключ)
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhY2hiYWZrZnRtYXRveXRkcG92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxMzI4NzIsImV4cCI6MjA4MTcwODg3Mn0.W8XW_VnMbDMSjuO45uQzQCy7CN7wJAgSTWZE8sA-iBw';

export const supabase = createClient(supabaseUrl, supabaseKey);