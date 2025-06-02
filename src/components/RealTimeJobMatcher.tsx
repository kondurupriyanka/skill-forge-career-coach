
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, DollarSign, Clock, ExternalLink, Zap, RefreshCw, Globe, Wifi, AlertCircle, CheckCircle, Sparkles, Brain, Share } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface JobMatch {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  matchScore: number;
  skills: string[];
  description: string;
  postedDate: string;
  applicationUrl: string;
  source: string;
}

interface TechRoleCategory {
  category: string;
  roles: string[];
  description: string;
  averageSalary: string;
  growthRate: string;
}

const RealTimeJobMatcher = ({ userProfile }) => {
  const [jobMatches, setJobMatches] = useState<JobMatch[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [sources, setSources] = useState<string[]>([]);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [appliedJobs, setAppliedJobs] = useState<Set<string>>(new Set());
  const [techRoles, setTechRoles] = useState<TechRoleCategory[]>([]);
  const [loadingTechRoles, setLoadingTechRoles] = useState(false);
  const [showTechRoles, setShowTechRoles] = useState(false);

  useEffect(() => {
    if (userProfile?.skills) {
      fetchRealTimeJobs();
      
      // Set up auto-refresh every 5 minutes if enabled
      let interval: NodeJS.Timeout;
      if (autoRefresh) {
        interval = setInterval(fetchRealTimeJobs, 5 * 60 * 1000);
      }
      
      return () => {
        if (interval) clearInterval(interval);
      };
    }
  }, [userProfile, autoRefresh]);

  const fetchRealTimeJobs = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Fetching real-time jobs with skills:', userProfile.skills);
      
      const { data, error } = await supabase.functions.invoke('real-time-job-matcher', {
        body: {
          userSkills: userProfile.skills,
          experience: userProfile.experience,
          preferences: {
            location: userProfile.location || 'Remote',
            jobType: 'Full-time',
            minSalary: 50000
          }
        }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      console.log('Received job data:', data);
      
      if (data && data.jobs) {
        setJobMatches(data.jobs);
        setSources(data.sources || []);
        setLastUpdated(new Date());
        console.log('Successfully loaded', data.jobs.length, 'jobs');
      } else {
        console.warn('No jobs data received');
        setJobMatches([]);
      }
    } catch (error) {
      console.error('Real-time job matching error:', error);
      setError('Failed to fetch real-time jobs. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const generateTechRolesWithAI = async () => {
    setLoadingTechRoles(true);
    
    try {
      console.log('Generating tech roles with AI based on current job matches');
      
      const jobTitles = jobMatches.map(job => job.title).join(', ');
      const jobSkills = [...new Set(jobMatches.flatMap(job => job.skills))].join(', ');
      
      const { data, error } = await supabase.functions.invoke('ai-tech-roles-generator', {
        body: {
          currentJobs: jobTitles,
          marketSkills: jobSkills,
          userSkills: userProfile.skills,
          userExperience: userProfile.experience
        }
      });

      if (error) {
        console.error('AI tech roles generation error:', error);
        throw error;
      }

      console.log('Generated tech roles:', data);
      
      if (data && data.techRoles) {
        setTechRoles(data.techRoles);
        setShowTechRoles(true);
      }
    } catch (error) {
      console.error('Error generating tech roles:', error);
      setError('Failed to generate tech roles. Please try again.');
    } finally {
      setLoadingTechRoles(false);
    }
  };

  const handleApplyNow = (job: JobMatch) => {
    if (job.applicationUrl && job.applicationUrl !== '#') {
      // Mark job as applied
      setAppliedJobs(prev => new Set([...prev, job.id]));
      
      // Show success notification
      console.log(`Navigating to application for ${job.title} at ${job.company}`);
      console.log('Application URL:', job.applicationUrl);
      
      // Open the application URL in a new tab with specific settings for better user experience
      const newWindow = window.open(job.applicationUrl, '_blank', 'noopener,noreferrer,width=1200,height=800');
      
      // Check if the window was blocked by popup blocker
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        // Fallback: try to navigate in the same window
        window.location.href = job.applicationUrl;
      }
      
      // Show success message
      console.log(`Successfully opened application for ${job.title} at ${job.company}`);
    } else {
      console.warn('No valid application URL available for this job');
      setError('No application link available for this job');
    }
  };

  const handleShareJob = (job: JobMatch) => {
    if (navigator.share) {
      navigator.share({
        title: `${job.title} at ${job.company}`,
        text: `Check out this job opportunity: ${job.title} at ${job.company}`,
        url: job.applicationUrl
      }).catch(console.error);
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${job.title} at ${job.company} - ${job.applicationUrl}`);
      console.log('Job details copied to clipboard');
    }
  };

  const getMatchColor = (score: number) => {
    if (score >= 85) return 'text-green-600 bg-green-100 border-green-200';
    if (score >= 70) return 'text-blue-600 bg-blue-100 border-blue-200';
    if (score >= 55) return 'text-yellow-600 bg-yellow-100 border-yellow-200';
    return 'text-gray-600 bg-gray-100 border-gray-200';
  };

  const getSourceColor = (source: string) => {
    const colors = {
      'RapidAPI (JSearch)': 'bg-purple-100 text-purple-800',
      'Adzuna': 'bg-blue-100 text-blue-800',
      'Jooble': 'bg-green-100 text-green-800',
      'Google Jobs': 'bg-red-100 text-red-800',
      'Job Boards': 'bg-orange-100 text-orange-800',
      'Internal': 'bg-gray-100 text-gray-800'
    };
    return colors[source] || 'bg-gray-100 text-gray-800';
  };

  if (!userProfile) {
    return (
      <div className="text-center py-12">
        <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No Profile Data</h3>
        <p className="text-gray-500">Please upload your resume first to see real-time job matches</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <Wifi className="w-6 h-6 mr-2 text-green-500" />
            Live Job Matches
          </h2>
          <p className="text-gray-600">Real-time opportunities from multiple job boards</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* AI Tech Roles Button */}
          <button
            onClick={generateTechRolesWithAI}
            disabled={loadingTechRoles || jobMatches.length === 0}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 flex items-center space-x-2 transition-colors"
          >
            <Brain className={`w-4 h-4 ${loadingTechRoles ? 'animate-spin' : ''}`} />
            <span>{loadingTechRoles ? 'Generating...' : 'AI Tech Roles'}</span>
          </button>
          
          {/* Auto-refresh toggle */}
          <label className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="rounded"
            />
            <span>Auto-refresh</span>
          </label>
          
          {/* Last updated */}
          {lastUpdated && (
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              Updated {lastUpdated.toLocaleTimeString()}
            </div>
          )}
          
          {/* Manual refresh button */}
          <button
            onClick={fetchRealTimeJobs}
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>{isLoading ? 'Refreshing...' : 'Refresh'}</span>
          </button>
        </div>
      </div>

      {/* AI-Generated Tech Roles Section */}
      {showTechRoles && techRoles.length > 0 && (
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-6">
          <div className="flex items-center mb-4">
            <Sparkles className="w-6 h-6 text-purple-600 mr-2" />
            <h3 className="text-xl font-bold text-gray-900">AI-Recommended Tech Roles</h3>
            <span className="ml-2 bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
              Based on Current Market
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {techRoles.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-4 shadow-sm border border-gray-200"
              >
                <h4 className="font-semibold text-gray-900 mb-2">{category.category}</h4>
                <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                
                <div className="space-y-2 mb-3">
                  <div className="text-xs text-gray-500">Average Salary: {category.averageSalary}</div>
                  <div className="text-xs text-gray-500">Growth Rate: {category.growthRate}</div>
                </div>
                
                <div className="space-y-1">
                  {category.roles.slice(0, 5).map((role, roleIndex) => (
                    <div key={roleIndex} className="text-sm text-blue-600 hover:text-blue-800 cursor-pointer">
                      • {role}
                    </div>
                  ))}
                  {category.roles.length > 5 && (
                    <div className="text-xs text-gray-500">+{category.roles.length - 5} more roles</div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Sources indicator */}
      {sources.length > 0 && (
        <div className="flex items-center space-x-2">
          <Globe className="w-4 h-4 text-gray-600" />
          <span className="text-sm text-gray-600">Fetching from:</span>
          {sources.map((source, index) => (
            <span
              key={index}
              className={`px-2 py-1 rounded-full text-xs font-medium ${getSourceColor(source)}`}
            >
              {source}
            </span>
          ))}
        </div>
      )}

      {/* Applied Jobs Counter */}
      {appliedJobs.size > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <p className="text-green-700">You've applied to {appliedJobs.size} job(s) today!</p>
        </div>
      )}

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {jobMatches.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-lg border hover:shadow-xl transition-all duration-300 relative"
          >
            {/* Source badge */}
            <div className="absolute top-4 right-4">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSourceColor(job.source)}`}>
                {job.source}
              </span>
            </div>

            <div className="flex justify-between items-start mb-4 pr-16">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h3>
                <p className="text-blue-600 font-medium mb-2">{job.company}</p>
                
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-3">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {job.salary}
                  </div>
                  <div className="flex items-center">
                    <Briefcase className="w-4 h-4 mr-1" />
                    {job.type}
                  </div>
                </div>
              </div>
            </div>

            {/* Match score */}
            <div className="mb-4">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getMatchColor(job.matchScore)}`}>
                <Zap className="w-4 h-4 mr-1" />
                {job.matchScore}% Match
              </div>
            </div>

            <p className="text-gray-700 text-sm mb-4 line-clamp-3">{job.description}</p>

            {/* Skills */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Required Skills:</h4>
              <div className="flex flex-wrap gap-2">
                {job.skills.slice(0, 6).map((skill, skillIndex) => {
                  const hasSkill = userProfile.skills?.some(userSkill => 
                    userSkill.toLowerCase().includes(skill.toLowerCase()) ||
                    skill.toLowerCase().includes(userSkill.toLowerCase())
                  );
                  
                  return (
                    <span
                      key={skillIndex}
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        hasSkill 
                          ? 'bg-green-100 text-green-800 border border-green-200' 
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {skill}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Posted {job.postedDate}</span>
              <div className="flex items-center space-x-2">
                {/* Share button */}
                <button
                  onClick={() => handleShareJob(job)}
                  className="bg-gray-100 text-gray-600 p-2 rounded-lg hover:bg-gray-200 transition-colors"
                  title="Share job"
                >
                  <Share className="w-4 h-4" />
                </button>
                
                {/* Apply button */}
                {job.applicationUrl && job.applicationUrl !== '#' ? (
                  <button
                    onClick={() => handleApplyNow(job)}
                    disabled={appliedJobs.has(job.id)}
                    className={`px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 text-sm font-medium ${
                      appliedJobs.has(job.id)
                        ? 'bg-green-100 text-green-700 cursor-default'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {appliedJobs.has(job.id) ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        <span>Applied</span>
                      </>
                    ) : (
                      <>
                        <span>Apply Now</span>
                        <ExternalLink className="w-4 h-4" />
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    disabled
                    className="bg-gray-300 text-gray-500 px-4 py-2 rounded-lg text-sm cursor-not-allowed"
                  >
                    Link Unavailable
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Loading state */}
      {isLoading && jobMatches.length === 0 && (
        <div className="text-center py-12">
          <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-6"></div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Fetching Live Jobs</h3>
          <p className="text-gray-600">Searching across multiple job boards for the best matches...</p>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && jobMatches.length === 0 && !error && (
        <div className="text-center py-12">
          <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Jobs Found</h3>
          <p className="text-gray-500 mb-4">We couldn't find any matching jobs right now.</p>
          <button
            onClick={fetchRealTimeJobs}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default RealTimeJobMatcher;
