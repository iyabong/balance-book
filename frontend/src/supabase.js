import { createClient } from '@supabase/supabase-js';

const supabseUrl = 'https://upjplafvpukgjwtrvsho.supabase.co';
const supabseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVwanBsYWZ2cHVrZ2p3dHJ2c2hvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM4MTc3OTUsImV4cCI6MjA1OTM5Mzc5NX0.QOgBDc6oFe8OycmNtuoFl-UrBlB9LVT218vJFg1TXI4';
const supabse = createClient(supabseUrl, supabseKey);

export default supabse;