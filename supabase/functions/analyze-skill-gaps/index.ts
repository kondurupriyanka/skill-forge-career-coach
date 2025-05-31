
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
    const { skills, experience, education, targetRole } = await req.json();
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    const theirStackToken = Deno.env.get('THEIRSTACK_API_TOKEN');

    if (!geminiApiKey) {
      throw new Error('Gemini API key not configured');
    }

    let requiredSkills = [];
    let industryData = null;

    // Try to get industry-specific skills from TheirStack API
    if (theirStackToken && targetRole) {
      try {
        const theirStackResponse = await fetch(`https://api.theirstack.com/v1/companies?tech=${encodeURIComponent(targetRole)}`, {
          headers: {
            'Authorization': `Bearer ${theirStackToken}`,
            'Content-Type': 'application/json'
          }
        });

        if (theirStackResponse.ok) {
          industryData = await theirStackResponse.json();
          console.log('TheirStack data:', industryData);
        }
      } catch (error) {
        console.error('TheirStack API error:', error);
      }
    }

    // Use Gemini AI to analyze skill gaps
    const prompt = `
    You are an expert career analyst. Analyze the skill gap for this profile:
    
    Current Skills: ${skills.join(', ')}
    Experience: ${experience.map(exp => exp.title || exp).join(', ')}
    Education: ${education}
    Target Role: ${targetRole || 'Not specified'}
    
    Industry Data: ${industryData ? JSON.stringify(industryData) : 'Not available'}
    
    Provide a comprehensive skill gap analysis in JSON format with:
    {
      "skillGaps": [
        {
          "skill": "skill name",
          "currentLevel": 0-100,
          "requiredLevel": 0-100,
          "gap": 0-100,
          "priority": "high/medium/low",
          "resources": [
            {
              "title": "resource title",
              "url": "https://example.com",
              "provider": "provider name",
              "type": "course/tutorial/certification",
              "duration": "estimated time",
              "free": true/false
            }
          ]
        }
      ],
      "jobMatches": [
        {
          "title": "job title",
          "company": "company name",
          "matchScore": 0-100,
          "requirements": ["skill1", "skill2"],
          "skillGaps": []
        }
      ],
      "analysis": {
        "overallScore": 0-100,
        "strongAreas": ["area1", "area2"],
        "improvementAreas": ["area1", "area2"],
        "recommendations": ["rec1", "rec2"]
      }
    }
    `;

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
                text: prompt
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 2000,
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    const responseText = data.candidates[0].content.parts[0].text;

    // Try to parse JSON response
    let analysisResult;
    try {
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysisResult = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('JSON parsing error:', parseError);
      
      // Fallback analysis if parsing fails
      analysisResult = {
        skillGaps: [
          {
            skill: 'JavaScript',
            currentLevel: 70,
            requiredLevel: 90,
            gap: 20,
            priority: 'high',
            resources: [
              {
                title: 'Advanced JavaScript Course',
                url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript',
                provider: 'MDN',
                type: 'tutorial',
                duration: '2-3 weeks',
                free: true
              }
            ]
          }
        ],
        jobMatches: [
          {
            title: targetRole || 'Software Developer',
            company: 'Tech Company',
            matchScore: 75,
            requirements: skills.slice(0, 3),
            skillGaps: []
          }
        ],
        analysis: {
          overallScore: 75,
          strongAreas: skills.slice(0, 2),
          improvementAreas: ['Communication', 'Leadership'],
          recommendations: ['Continue learning current skills', 'Expand to new technologies']
        }
      };
    }

    return new Response(JSON.stringify(analysisResult), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Skill gap analysis error:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to analyze skill gaps',
      skillGaps: [],
      jobMatches: [],
      analysis: null
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
