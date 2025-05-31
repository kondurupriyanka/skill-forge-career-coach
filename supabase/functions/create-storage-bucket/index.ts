
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Create the resumes bucket if it doesn't exist
    const { data: buckets, error: listError } = await supabaseClient.storage.listBuckets();
    
    if (listError) {
      throw listError;
    }

    const resumesBucket = buckets.find(bucket => bucket.name === 'resumes');
    
    if (!resumesBucket) {
      const { data, error } = await supabaseClient.storage.createBucket('resumes', {
        public: false,
        allowedMimeTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        fileSizeLimit: 5242880 // 5MB
      });

      if (error) {
        throw error;
      }

      console.log('Created resumes bucket:', data);
    }

    return new Response(JSON.stringify({ 
      success: true,
      message: 'Storage bucket ready'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Storage bucket creation error:', error);
    return new Response(JSON.stringify({ 
      success: false,
      error: error.message || 'Failed to create storage bucket'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
