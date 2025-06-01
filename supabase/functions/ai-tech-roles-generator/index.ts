
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const generateTechRolesPrompt = (currentJobs: string, marketSkills: string, userSkills: string[], userExperience: string) => {
  return `You are an AI career advisor specializing in technology roles. Based on the current job market data and user profile, generate a comprehensive list of tech roles categorized by different technology domains.

CURRENT MARKET DATA:
- Job Titles in Market: ${currentJobs}
- Skills in Demand: ${marketSkills}
- User Skills: ${userSkills.join(', ')}
- User Experience Level: ${userExperience || 'Entry Level'}

Generate a response with the following tech role categories and provide 10-20 specific job titles for each category. Also include market insights:

1. **Full Stack Development**
2. **Frontend Development** 
3. **Backend Development**
4. **Database & Data Engineering**
5. **AI/ML & Data Science**
6. **DevOps & Cloud Engineering**
7. **Mobile Development**
8. **Cybersecurity**
9. **Product Management**
10. **Quality Assurance & Testing**

For each category, provide:
- Category name
- Brief description (2-3 sentences)
- 10-20 specific job titles/roles
- Average salary range
- Growth rate/demand level

Format your response as JSON with this structure:
{
  "techRoles": [
    {
      "category": "Full Stack Development",
      "description": "Description here",
      "roles": ["Full Stack Developer", "MEAN Stack Developer", ...],
      "averageSalary": "$70,000 - $150,000",
      "growthRate": "High demand, 15% growth"
    }
  ]
}

Focus on roles that are currently trending and align with the job market data provided. Include both traditional and emerging tech roles.`;
};

serve(async (req) => {
  console.log('AI Tech Roles Generator function called');
  
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const requestBody = await req.json();
    console.log('Request body received:', requestBody);
    
    const { currentJobs, marketSkills, userSkills, userExperience } = requestBody;
    
    const geminiApiKey = Deno.env.get('GEMINI_API_KEY');
    if (!geminiApiKey) {
      throw new Error('GEMINI_API_KEY not found in environment variables');
    }

    console.log('Generating tech roles with Gemini AI...');
    
    const prompt = generateTechRolesPrompt(currentJobs, marketSkills, userSkills, userExperience);
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
      {
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
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          }
        })
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Gemini API error:', errorText);
      throw new Error(`Gemini API error: ${response.status} ${errorText}`);
    }

    const data = await response.json();
    console.log('Gemini API response:', data);

    if (!data.candidates || data.candidates.length === 0) {
      throw new Error('No response from Gemini AI');
    }

    const generatedText = data.candidates[0].content.parts[0].text;
    console.log('Generated text:', generatedText);

    // Extract JSON from the response
    let techRolesData;
    try {
      // Try to find JSON in the response
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        techRolesData = JSON.parse(jsonMatch[0]);
      } else {
        // Fallback: parse the entire response as JSON
        techRolesData = JSON.parse(generatedText);
      }
    } catch (parseError) {
      console.error('Error parsing JSON from Gemini response:', parseError);
      
      // Fallback: create a structured response from the text
      techRolesData = {
        techRoles: [
          {
            category: "Full Stack Development",
            description: "Developers who work on both frontend and backend technologies, building complete web applications.",
            roles: [
              "Full Stack Developer", "MEAN Stack Developer", "MERN Stack Developer", "Full Stack Engineer",
              "Web Application Developer", "Software Engineer - Full Stack", "Full Stack Architect",
              "JavaScript Full Stack Developer", "Python Full Stack Developer", "Java Full Stack Developer",
              "PHP Full Stack Developer", "Ruby on Rails Developer", "Django Developer", "Node.js Developer",
              "React Full Stack Developer", "Vue.js Full Stack Developer", "Angular Full Stack Developer"
            ],
            averageSalary: "$70,000 - $150,000",
            growthRate: "High demand, 15% growth"
          },
          {
            category: "Frontend Development",
            description: "Specialists in user interface development, creating engaging and responsive web experiences.",
            roles: [
              "Frontend Developer", "React Developer", "Angular Developer", "Vue.js Developer",
              "JavaScript Developer", "UI Developer", "Web Developer", "Frontend Engineer",
              "Mobile Web Developer", "CSS Specialist", "HTML/CSS Developer", "Responsive Web Developer",
              "Progressive Web App Developer", "TypeScript Developer", "Next.js Developer", "Gatsby Developer"
            ],
            averageSalary: "$60,000 - $130,000",
            growthRate: "Strong demand, 12% growth"
          },
          {
            category: "Backend Development",
            description: "Server-side developers who build and maintain the logic, databases, and architecture behind applications.",
            roles: [
              "Backend Developer", "API Developer", "Server-Side Developer", "Python Developer",
              "Java Developer", "Node.js Developer", "PHP Developer", "C# Developer",
              "Ruby Developer", "Go Developer", "Microservices Developer", "REST API Developer",
              "GraphQL Developer", "Backend Engineer", "System Developer", "Database Developer"
            ],
            averageSalary: "$75,000 - $160,000",
            growthRate: "High demand, 14% growth"
          },
          {
            category: "AI/ML & Data Science",
            description: "Professionals working with artificial intelligence, machine learning, and data analysis to extract insights and build intelligent systems.",
            roles: [
              "Machine Learning Engineer", "Data Scientist", "AI Engineer", "Deep Learning Engineer",
              "NLP Engineer", "Computer Vision Engineer", "MLOps Engineer", "Data Analyst",
              "Research Scientist", "AI Researcher", "ML Platform Engineer", "Data Engineer",
              "Business Intelligence Analyst", "Quantitative Analyst", "AI Product Manager", "ML Consultant"
            ],
            averageSalary: "$90,000 - $200,000",
            growthRate: "Explosive growth, 25% growth"
          },
          {
            category: "DevOps & Cloud Engineering",
            description: "Infrastructure and deployment specialists who ensure smooth operations and scalability of applications.",
            roles: [
              "DevOps Engineer", "Cloud Engineer", "Site Reliability Engineer", "Infrastructure Engineer",
              "AWS Solutions Architect", "Azure Cloud Engineer", "Google Cloud Engineer", "Kubernetes Engineer",
              "Docker Specialist", "CI/CD Engineer", "Platform Engineer", "Cloud Architect",
              "Infrastructure Automation Engineer", "Cloud Security Engineer", "Monitoring Engineer", "Release Engineer"
            ],
            averageSalary: "$80,000 - $170,000",
            growthRate: "Very high demand, 20% growth"
          }
        ]
      };
    }

    console.log('Successfully generated tech roles:', techRolesData);

    return new Response(JSON.stringify(techRolesData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('AI Tech Roles Generator error:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to generate tech roles',
      techRoles: []
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
