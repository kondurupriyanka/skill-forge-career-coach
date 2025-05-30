
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
    const { filePath, userId } = await req.json();
    
    if (!filePath) {
      throw new Error('File path is required');
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    console.log('Attempting to download file from path:', filePath);

    // Download the file from Supabase Storage
    const { data: fileData, error: downloadError } = await supabaseClient.storage
      .from('resumes')
      .download(filePath);

    if (downloadError) {
      console.error('Download error:', downloadError);
      throw new Error(`Failed to download file: ${downloadError.message}`);
    }

    if (!fileData) {
      throw new Error('No file data received');
    }

    console.log('File downloaded successfully, size:', fileData.size);

    const apiKey = Deno.env.get('OPENAI_API_KEY');
    if (!apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Convert file to base64 for OpenAI API
    const arrayBuffer = await fileData.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    const base64File = btoa(String.fromCharCode(...uint8Array));

    console.log('File converted to base64, length:', base64File.length);

    // Determine file type from the file path
    const fileExtension = filePath.split('.').pop()?.toLowerCase();
    let mimeType = 'application/pdf';
    
    if (fileExtension === 'docx') {
      mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    } else if (fileExtension === 'doc') {
      mimeType = 'application/msword';
    }

    console.log('Processing file with mime type:', mimeType);

    // Use OpenAI to parse the resume with improved prompt
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `You are an expert resume parser. Extract structured information from resumes and return ONLY valid JSON in the exact format specified below. Do not include any markdown formatting, explanations, or additional text.

Return the data in this exact JSON format:
{
  "name": "Full Name",
  "email": "email@example.com", 
  "phone": "phone number or empty string",
  "skills": ["skill1", "skill2", "skill3"],
  "education": [
    {
      "degree": "degree name",
      "institution": "school/university name",
      "year": "graduation year or empty string"
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
      "technologies": ["tech1", "tech2"]
    }
  ]
}

Extract only factual information. If information is missing, use empty strings or empty arrays. Do not make up information.`
          },
          {
            role: 'user',
            content: `Please parse this resume and extract the structured information. The file is a ${mimeType} document. Return only the JSON data as specified.

File content (base64): data:${mimeType};base64,${base64File.substring(0, 100000)}`
          }
        ],
        temperature: 0.1,
        max_tokens: 2000
      }),
    });

    if (!openAIResponse.ok) {
      const errorText = await openAIResponse.text();
      console.error('OpenAI API error:', errorText);
      throw new Error(`OpenAI API error: ${openAIResponse.statusText} - ${errorText}`);
    }

    const openAIResult = await openAIResponse.json();
    
    if (!openAIResult.choices || !openAIResult.choices[0] || !openAIResult.choices[0].message) {
      throw new Error('Invalid response from OpenAI API');
    }

    const parsedContent = openAIResult.choices[0].message.content;
    console.log('OpenAI response received:', parsedContent);

    // Parse the JSON response with better error handling
    let parsedData: ParsedResumeData;
    try {
      // Clean the response - remove any markdown formatting if present
      let jsonContent = parsedContent.trim();
      
      // Remove markdown code blocks if present
      if (jsonContent.startsWith('```json')) {
        jsonContent = jsonContent.replace(/^```json\s*/, '').replace(/\s*```$/, '');
      } else if (jsonContent.startsWith('```')) {
        jsonContent = jsonContent.replace(/^```\s*/, '').replace(/\s*```$/, '');
      }
      
      // Try to find JSON within the response if it's not clean
      const jsonMatch = jsonContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        jsonContent = jsonMatch[0];
      }
      
      parsedData = JSON.parse(jsonContent);
      
      // Validate the parsed data structure
      if (!parsedData.name && !parsedData.email) {
        throw new Error('Failed to extract basic information from resume');
      }
      
      // Ensure arrays exist
      parsedData.skills = parsedData.skills || [];
      parsedData.education = parsedData.education || [];
      parsedData.experience = parsedData.experience || [];
      parsedData.projects = parsedData.projects || [];
      
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      console.error('Raw content:', parsedContent);
      
      // Create a fallback structure
      parsedData = {
        name: 'Unable to extract name',
        email: '',
        phone: '',
        skills: [],
        education: [],
        experience: [],
        projects: []
      };
    }

    // Generate ATS score based on resume completeness
    const atsScore = calculateATSScore(parsedData);

    // Store the parsed data in Supabase
    const { data: resumeRecord, error: insertError } = await supabaseClient
      .from('resumes')
      .insert({
        title: `Resume - ${parsedData.name || 'Unknown'}`,
        content: parsedData,
        user_id: userId || 'anonymous',
        ats_score: atsScore
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error storing resume:', insertError);
      // Don't throw error here, just log it as parsing was successful
    }

    console.log('Resume processed successfully, ATS score:', atsScore);

    return new Response(JSON.stringify({ 
      success: true, 
      parsedData,
      atsScore,
      resumeId: resumeRecord?.id
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Resume parsing error:', error);
    return new Response(JSON.stringify({ 
      success: false,
      error: error.message || 'Failed to parse resume'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

function calculateATSScore(data: ParsedResumeData): number {
  let score = 0;
  
  // Basic information (30 points)
  if (data.name && data.name !== 'Unknown' && data.name !== 'Unable to extract name') score += 10;
  if (data.email && data.email.includes('@')) score += 10;
  if (data.phone && data.phone.trim() !== '') score += 10;
  
  // Skills (25 points)
  if (data.skills.length > 0) score += 15;
  if (data.skills.length > 5) score += 10;
  
  // Experience (25 points)
  if (data.experience.length > 0) score += 15;
  if (data.experience.length > 2) score += 10;
  
  // Education (15 points)
  if (data.education.length > 0) score += 15;
  
  // Projects (5 points)
  if (data.projects.length > 0) score += 5;
  
  return Math.min(score, 100);
}
