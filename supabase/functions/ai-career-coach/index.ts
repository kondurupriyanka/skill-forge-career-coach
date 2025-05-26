
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
    const { message, userProfile, chatHistory } = await req.json();
    const apiKey = Deno.env.get('OPENAI_API_KEY');

    if (!apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Build context from user profile
    let profileContext = '';
    if (userProfile) {
      profileContext = `
User Profile Context:
- Name: ${userProfile.name || 'Unknown'}
- Skills: ${userProfile.skills?.join(', ') || 'No skills listed'}
- Experience: ${userProfile.experience?.map(exp => `${exp.title} at ${exp.company}`).join(', ') || 'No experience listed'}
- Education: ${userProfile.education?.map(edu => `${edu.degree} from ${edu.institution}`).join(', ') || 'No education listed'}
`;
    }

    // Build chat history context
    let conversationContext = '';
    if (chatHistory && chatHistory.length > 0) {
      conversationContext = '\nRecent conversation:\n' + 
        chatHistory.map(msg => `${msg.type === 'user' ? 'User' : 'Assistant'}: ${msg.content}`).join('\n');
    }

    const systemPrompt = `You are an expert AI Career Coach with deep knowledge of current job markets, industry trends, and career development strategies. You provide personalized, actionable advice based on real-world data and current market conditions.

Your expertise includes:
- Resume optimization and ATS compatibility
- Interview preparation and techniques
- Skill gap analysis and learning recommendations
- Industry trends and emerging technologies
- Salary negotiation and career progression
- Networking strategies and personal branding
- Career transitions and pivoting strategies

Always provide:
- Specific, actionable advice
- Current market insights when relevant
- Personalized recommendations based on the user's profile
- Encouragement and motivation
- Follow-up questions to better understand their needs

Be conversational, supportive, and professional. If you don't have specific information, acknowledge it and provide general best practices.

${profileContext}${conversationContext}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 1000
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    return new Response(JSON.stringify({ 
      response: aiResponse,
      timestamp: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('AI Career Coach error:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to get AI response'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
