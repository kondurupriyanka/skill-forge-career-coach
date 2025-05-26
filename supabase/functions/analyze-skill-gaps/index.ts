
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Real free learning resources database
const learningResources = {
  javascript: [
    { title: "JavaScript Full Course", url: "https://youtu.be/PkZNo7MFNFg", provider: "freeCodeCamp", type: "course", duration: "8 hours", free: true },
    { title: "JavaScript30", url: "https://javascript30.com", provider: "Wes Bos", type: "project", duration: "30 days", free: true },
    { title: "MDN JavaScript Guide", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide", provider: "MDN", type: "tutorial", duration: "Self-paced", free: true }
  ],
  react: [
    { title: "React Course for Beginners", url: "https://youtu.be/bMknfKXIFA8", provider: "freeCodeCamp", type: "course", duration: "12 hours", free: true },
    { title: "React Official Tutorial", url: "https://react.dev/learn", provider: "React Team", type: "tutorial", duration: "4 hours", free: true },
    { title: "Build 15 React Projects", url: "https://youtu.be/a_7Z7C_JCyo", provider: "freeCodeCamp", type: "project", duration: "9 hours", free: true }
  ],
  python: [
    { title: "Python for Everybody", url: "https://www.coursera.org/specializations/python", provider: "Coursera", type: "course", duration: "8 months", free: true },
    { title: "CS50P Introduction to Programming", url: "https://cs50.harvard.edu/python/2022/", provider: "Harvard", type: "course", duration: "10 weeks", free: true },
    { title: "Python Tutorial", url: "https://youtu.be/_uQrJ0TkZlc", provider: "Programming with Mosh", type: "tutorial", duration: "6 hours", free: true }
  ],
  "data-science": [
    { title: "Data Science Course", url: "https://youtu.be/ua-CiDNNj30", provider: "freeCodeCamp", type: "course", duration: "12 hours", free: true },
    { title: "Kaggle Learn", url: "https://www.kaggle.com/learn", provider: "Kaggle", type: "certification", duration: "40 hours", free: true }
  ],
  "machine-learning": [
    { title: "Machine Learning Course", url: "https://www.coursera.org/learn/machine-learning", provider: "Stanford", type: "course", duration: "11 weeks", free: true },
    { title: "Fast.ai Practical Deep Learning", url: "https://course.fast.ai/", provider: "fast.ai", type: "course", duration: "7 weeks", free: true }
  ],
  "web-development": [
    { title: "Full Stack Web Development", url: "https://youtu.be/nu_pCVPKzTk", provider: "freeCodeCamp", type: "course", duration: "4 hours", free: true },
    { title: "The Odin Project", url: "https://www.theodinproject.com/", provider: "The Odin Project", type: "curriculum", duration: "1000+ hours", free: true }
  ]
};

// Job market data (in production, this would come from real APIs)
const jobMarketData = [
  {
    title: "Frontend Developer",
    company: "Tech Innovators Pvt Ltd",
    requirements: ["JavaScript", "React", "HTML/CSS", "Git", "REST APIs"],
    skillWeights: { javascript: 90, react: 85, html: 80, css: 80, git: 75 }
  },
  {
    title: "Full Stack Developer", 
    company: "StartupXYZ",
    requirements: ["JavaScript", "React", "Node.js", "MongoDB", "Express"],
    skillWeights: { javascript: 85, react: 80, nodejs: 85, mongodb: 75, express: 75 }
  },
  {
    title: "Data Analyst",
    company: "Data Solutions Inc",
    requirements: ["Python", "SQL", "Excel", "Tableau", "Statistics"],
    skillWeights: { python: 85, sql: 90, excel: 70, tableau: 75, statistics: 80 }
  },
  {
    title: "Python Developer",
    company: "AI Innovations",
    requirements: ["Python", "Django", "PostgreSQL", "Docker", "API Development"],
    skillWeights: { python: 90, django: 80, postgresql: 75, docker: 70, api: 75 }
  }
];

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { skills, experience, education, projects } = await req.json();

    // Use OpenAI to analyze skill levels and gaps
    const openAIResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are an expert career counselor and skill assessor. Analyze a person's profile and provide skill level assessments and career guidance.

            Based on their skills, experience, education, and projects, assess their current skill levels (0-100) for each skill they mention, and also identify missing skills they need for their target career path.

            Return a JSON response with this structure:
            {
              "skillAssessment": {
                "skillName": currentLevel (0-100)
              },
              "recommendedSkills": ["skill1", "skill2", ...],
              "careerSuggestions": ["role1", "role2", ...]
            }`
          },
          {
            role: 'user',
            content: `Please analyze this profile:
            
            Skills: ${skills?.join(', ') || 'None listed'}
            
            Experience: ${experience?.map(exp => `${exp.title} at ${exp.company}`).join(', ') || 'No experience listed'}
            
            Education: ${education?.map(edu => `${edu.degree} from ${edu.institution}`).join(', ') || 'No education listed'}
            
            Projects: ${projects?.map(proj => `${proj.name}: ${proj.description}`).join(', ') || 'No projects listed'}`
          }
        ],
        temperature: 0.3,
        max_tokens: 1500
      }),
    });

    const aiResult = await openAIResponse.json();
    const aiAnalysis = JSON.parse(aiResult.choices[0].message.content);

    // Calculate skill gaps against job requirements
    const skillGaps = [];
    const jobMatches = [];

    // Process each job and calculate matches
    for (const job of jobMarketData) {
      let totalMatch = 0;
      let skillCount = 0;
      const jobSkillGaps = [];

      for (const requirement of job.requirements) {
        const normalizedSkill = requirement.toLowerCase().replace(/[^a-z]/g, '');
        const currentLevel = aiAnalysis.skillAssessment[requirement] || 
                           aiAnalysis.skillAssessment[normalizedSkill] || 
                           (skills?.some(s => s.toLowerCase().includes(normalizedSkill)) ? 50 : 0);
        
        const requiredLevel = job.skillWeights[normalizedSkill] || 75;
        const gap = Math.max(0, requiredLevel - currentLevel);
        
        if (gap > 10) {
          // Find learning resources for this skill
          const skillResources = learningResources[normalizedSkill] || 
                               learningResources[normalizedSkill.replace('-', '')] ||
                               learningResources['web-development']; // Fallback

          jobSkillGaps.push({
            skill: requirement,
            currentLevel,
            requiredLevel,
            gap,
            priority: gap > 50 ? 'high' : gap > 25 ? 'medium' : 'low',
            resources: skillResources || []
          });
        }

        totalMatch += (currentLevel / requiredLevel) * 100;
        skillCount++;
      }

      const matchScore = Math.min(100, Math.round(totalMatch / skillCount));
      
      jobMatches.push({
        title: job.title,
        company: job.company,
        matchScore,
        requirements: job.requirements,
        skillGaps: jobSkillGaps
      });

      // Add skill gaps to main array
      skillGaps.push(...jobSkillGaps);
    }

    // Remove duplicates and sort by priority
    const uniqueSkillGaps = Array.from(
      new Map(skillGaps.map(gap => [gap.skill, gap])).values()
    ).sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

    // Sort job matches by score
    jobMatches.sort((a, b) => b.matchScore - a.matchScore);

    return new Response(JSON.stringify({
      skillGaps: uniqueSkillGaps,
      jobMatches,
      analysis: aiAnalysis
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Skill gap analysis error:', error);
    return new Response(JSON.stringify({ 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
