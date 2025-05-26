
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, DollarSign, Clock, ExternalLink, Zap } from 'lucide-react';
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
}

const RealTimeJobMatcher = ({ userProfile }) => {
  const [jobMatches, setJobMatches] = useState<JobMatch[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    if (userProfile?.skills) {
      fetchRealTimeJobs();
      // Set up real-time updates every 5 minutes
      const interval = setInterval(fetchRealTimeJobs, 5 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [userProfile]);

  const fetchRealTimeJobs = async () => {
    setIsLoading(true);
    try {
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

      if (error) throw error;

      setJobMatches(data.jobs);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Real-time job matching error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getMatchColor = (score: number) => {
    if (score >= 85) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-blue-600 bg-blue-100';
    if (score >= 55) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
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
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Real-Time Job Matches</h2>
          <p className="text-gray-600">Live job opportunities matched to your profile</p>
        </div>
        <div className="flex items-center space-x-4">
          {lastUpdated && (
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              Updated {lastUpdated.toLocaleTimeString()}
            </div>
          )}
          <button
            onClick={fetchRealTimeJobs}
            disabled={isLoading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center space-x-2"
          >
            <Zap className="w-4 h-4" />
            <span>{isLoading ? 'Updating...' : 'Refresh Jobs'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {jobMatches.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-xl shadow-lg border hover:shadow-xl transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{job.title}</h3>
                <p className="text-blue-600 font-medium mb-2">{job.company}</p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
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
              
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getMatchColor(job.matchScore)}`}>
                {job.matchScore}% Match
              </div>
            </div>

            <p className="text-gray-700 text-sm mb-4 line-clamp-3">{job.description}</p>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Required Skills:</h4>
              <div className="flex flex-wrap gap-2">
                {job.skills.slice(0, 6).map((skill, skillIndex) => {
                  const hasSkill = userProfile.skills?.some(userSkill => 
                    userSkill.toLowerCase().includes(skill.toLowerCase())
                  );
                  
                  return (
                    <span
                      key={skillIndex}
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        hasSkill 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {skill}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">Posted {job.postedDate}</span>
              <a
                href={job.applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 text-sm"
              >
                <span>Apply Now</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {isLoading && (
        <div className="text-center py-8">
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Finding the best job matches for you...</p>
        </div>
      )}
    </div>
  );
};

export default RealTimeJobMatcher;
