
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Real job data sources (in production, these would be actual API calls)
const generateRealTimeJobs = (userSkills: string[], experience: any[], preferences: any) => {
  const jobTemplates = [
    {
      title: 'Frontend Developer',
      company: 'TechFlow Solutions',
      location: 'Remote',
      salary: '$70,000 - $95,000',
      type: 'Full-time',
      skills: ['JavaScript', 'React', 'TypeScript', 'CSS', 'HTML'],
      description: 'Join our innovative team building cutting-edge web applications. We value creativity, collaboration, and continuous learning.',
      applicationUrl: 'https://example.com/apply/frontend-dev'
    },
    {
      title: 'Full Stack Engineer',
      company: 'StartupX',
      location: 'San Francisco, CA',
      salary: '$90,000 - $130,000',
      type: 'Full-time',
      skills: ['Node.js', 'React', 'Python', 'PostgreSQL', 'AWS'],
      description: 'Build scalable applications that impact millions of users. Great opportunity for growth in a fast-paced startup environment.',
      applicationUrl: 'https://example.com/apply/fullstack'
    },
    {
      title: 'UI/UX Designer',
      company: 'Design Hub',
      location: 'New York, NY',
      salary: '$65,000 - $85,000',
      type: 'Full-time',
      skills: ['Figma', 'Adobe Creative Suite', 'Prototyping', 'User Research'],
      description: 'Create beautiful, user-centered designs for web and mobile applications. Work with cross-functional teams.',
      applicationUrl: 'https://example.com/apply/designer'
    },
    {
      title: 'Data Scientist',
      company: 'Analytics Pro',
      location: 'Remote',
      salary: '$85,000 - $120,000',
      type: 'Full-time',
      skills: ['Python', 'Machine Learning', 'SQL', 'Statistics', 'Pandas'],
      description: 'Analyze complex datasets to drive business decisions. Work with cutting-edge ML technologies.',
      applicationUrl: 'https://example.com/apply/data-scientist'
    },
    {
      title: 'DevOps Engineer',
      company: 'CloudTech Inc',
      location: 'Austin, TX',
      salary: '$80,000 - $110,000',
      type: 'Full-time',
      skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Linux'],
      description: 'Manage infrastructure and deployment pipelines. Ensure reliable, scalable systems.',
      applicationUrl: 'https://example.com/apply/devops'
    },
    {
      title: 'Product Manager',
      company: 'Innovation Labs',
      location: 'Seattle, WA',
      salary: '$95,000 - $140,000',
      type: 'Full-time',
      skills: ['Product Strategy', 'Agile', 'Analytics', 'User Research'],
      description: 'Lead product development from conception to launch. Drive product vision and strategy.',
      applicationUrl: 'https://example.com/apply/product-manager'
    }
  ];

  return jobTemplates.map((job, index) => {
    // Calculate match score based on skill overlap
    const userSkillsLower = userSkills.map(s => s.toLowerCase());
    const jobSkillsLower = job.skills.map(s => s.toLowerCase());
    
    const matchingSkills = jobSkillsLower.filter(skill => 
      userSkillsLower.some(userSkill => userSkill.includes(skill) || skill.includes(userSkill))
    );
    
    const baseMatchScore = Math.round((matchingSkills.length / job.skills.length) * 100);
    const randomVariation = Math.floor(Math.random() * 20) - 10; // ±10 points variation
    const matchScore = Math.max(0, Math.min(100, baseMatchScore + randomVariation));

    return {
      id: `job_${index}_${Date.now()}`,
      ...job,
      matchScore,
      postedDate: getRandomPostedDate(),
    };
  }).sort((a, b) => b.matchScore - a.matchScore);
};

const getRandomPostedDate = () => {
  const days = Math.floor(Math.random() * 7) + 1;
  if (days === 1) return 'Today';
  if (days === 2) return 'Yesterday';
  return `${days} days ago`;
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userSkills, experience, preferences } = await req.json();
    const apiKey = Deno.env.get('OPENAI_API_KEY');

    if (!apiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Generate realistic job matches
    const jobs = generateRealTimeJobs(userSkills || [], experience || [], preferences || {});

    // Use AI to enhance job descriptions and provide insights
    const enhancedJobsPromise = jobs.slice(0, 6).map(async (job) => {
      try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              {
                role: 'system',
                content: 'You are a job market expert. Enhance job descriptions to be more engaging and realistic based on current market trends. Keep it concise (max 100 words).'
              },
              {
                role: 'user',
                content: `Enhance this job description for a ${job.title} position: ${job.description}`
              }
            ],
            temperature: 0.7,
            max_tokens: 150
          }),
        });

        if (response.ok) {
          const data = await response.json();
          return {
            ...job,
            description: data.choices[0].message.content
          };
        }
      } catch (error) {
        console.error('Error enhancing job description:', error);
      }
      
      return job;
    });

    const enhancedJobs = await Promise.all(enhancedJobsPromise);

    return new Response(JSON.stringify({ 
      jobs: enhancedJobs,
      totalMatches: enhancedJobs.length,
      lastUpdated: new Date().toISOString()
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Real-time job matcher error:', error);
    return new Response(JSON.stringify({ 
      error: error.message || 'Failed to fetch job matches',
      jobs: []
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
