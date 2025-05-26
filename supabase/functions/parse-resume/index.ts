
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface ParsedResumeData {
  name: string;
  email: string;
  phone?: string;
  skills: string[];
  education: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
  experience: Array<{
    title: string;
    company: string;
    duration: string;
    description: string;
  }>;
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
  }>;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { filePath } = await req.json();
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Download the file from Supabase Storage
    const { data: fileData, error: downloadError } = await supabaseClient.storage
      .from('resumes')
      .download(filePath);

    if (downloadError) {
      throw new Error(`Failed to download file: ${downloadError.message}`);
    }

    // Convert file to base64 for OpenAI API
    const arrayBuffer = await fileData.arrayBuffer();
    const base64File = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));

    // Use OpenAI to parse the resume
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `You are an expert resume parser. Extract structured information from resumes and return it in JSON format. 
            
            Return the data in this exact format:
            {
              "name": "Full Name",
              "email": "email@example.com", 
              "phone": "phone number",
              "skills": ["skill1", "skill2", ...],
              "education": [
                {
                  "degree": "degree name",
                  "institution": "school/university name",
                  "year": "graduation year"
                }
              ],
              "experience": [
                {
                  "title": "job title",
                  "company": "company name", 
                  "duration": "start - end date",
                  "description": "brief description"
                }
              ],
              "projects": [
                {
                  "name": "project name",
                  "description": "project description",
                  "technologies": ["tech1", "tech2", ...]
                }
              ]
            }
            
            Extract only factual information. If information is missing, use empty strings or arrays.`
          },
          {
            role: 'user',
            content: `Please parse this resume file and extract the structured information. The file is in base64 format: ${base64File.substring(0, 1000)}...`
          }
        ],
        temperature: 0.1,
        max_tokens: 2000
      }),
    });

    if (!openAIResponse.ok) {
      throw new Error(`OpenAI API error: ${openAIResponse.statusText}`);
    }

    const openAIResult = await openAIResponse.json();
    const parsedContent = openAIResult.choices[0].message.content;

    // Parse the JSON response
    let parsedData: ParsedResumeData;
    try {
      parsedData = JSON.parse(parsedContent);
    } catch (parseError) {
      // If JSON parsing fails, create a fallback structure
      parsedData = {
        name: 'Unknown',
        email: '',
        phone: '',
        skills: [],
        education: [],
        experience: [],
        projects: []
      };
    }

    // Store the parsed data in Supabase
    const { error: insertError } = await supabaseClient
      .from('resumes')
      .insert({
        title: `Resume - ${parsedData.name}`,
        content: parsedData,
        user_id: req.headers.get('user-id'), // You'll need to pass this from the frontend
        ats_score: Math.floor(Math.random() * 30) + 70 // Placeholder ATS score
      });

    if (insertError) {
      console.error('Error storing resume:', insertError);
    }

    return new Response(JSON.stringify({ 
      success: true, 
      parsedData 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Resume parsing error:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to parse resume' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
