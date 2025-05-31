
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, resumeData, userProfile, conversationType, interviewType, targetRole, question, answer } = await req.json();
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');

    if (!geminiApiKey) {
      throw new Error('Gemini API key not configured');
    }

    let prompt = '';
    let systemContext = '';

    switch (conversationType) {
      case 'resume_chat':
        systemContext = `You are an expert career counselor and resume analyst. The user has uploaded their resume with the following data: ${JSON.stringify(resumeData)}. 
        Help them improve their resume, answer questions about their skills, suggest career paths, and provide tailored advice. Be encouraging and specific.`;
        prompt = `User question: ${message}`;
        break;

      case 'interview_question':
        systemContext = `You are an expert interviewer. Generate a ${interviewType} interview question for a ${targetRole} position. 
        Consider the user's profile: ${JSON.stringify(userProfile)}.
        Return JSON with: question, difficulty (easy/medium/hard), expectedAnswer, tips`;
        prompt = `Generate a challenging but fair ${interviewType} interview question for ${targetRole}`;
        break;

      case 'interview_evaluation':
        systemContext = `You are an expert interview evaluator. Evaluate the candidate's answer for a ${targetRole} position.
        Question: ${question}
        Answer: ${answer}
        Provide detailed feedback with a score (0-100), strengths, improvements, and suggestions.
        Return JSON format.`;
        prompt = `Evaluate this interview answer for ${targetRole} position`;
        break;

      case 'skill_analysis':
        systemContext = `You are a skill gap analyst. Analyze the user's skills against market demands for their target role.
        User profile: ${JSON.stringify(userProfile)}`;
        prompt = `Analyze skill gaps and provide improvement recommendations for ${message}`;
        break;

      default:
        systemContext = 'You are a helpful AI career assistant.';
        prompt = message;
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `${systemContext}\n\n${prompt}`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 1000,
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    let responseText = data.candidates[0].content.parts[0].text;

    // Try to parse JSON responses for structured data
    let structuredResponse = null;
    if (conversationType === 'interview_question' || conversationType === 'interview_evaluation') {
      try {
        // Clean the response to extract JSON
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          structuredResponse = JSON.parse(jsonMatch[0]);
        }
      } catch (e) {
        console.log('Could not parse JSON response, using text response');
      }
    }

    if (conversationType === 'interview_question' && structuredResponse) {
      return new Response(JSON.stringify(structuredResponse), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } else if (conversationType === 'interview_evaluation' && structuredResponse) {
      return new Response(JSON.stringify(structuredResponse), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } else {
      return new Response(JSON.stringify({ 
        response: responseText,
        conversationType 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

  } catch (error) {
    console.error('AI Career Coach error:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to get AI response',
      response: 'I apologize, but I encountered an error. Please try again later.'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
