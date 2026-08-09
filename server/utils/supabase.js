const { createClient } = require('@supabase/supabase-js');
const { assertRequiredEnvVars } = require('./env');

assertRequiredEnvVars(['SUPABASE_URL', 'SUPABASE_KEY']);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

module.exports = supabase;
