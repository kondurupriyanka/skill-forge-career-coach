
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, Target, AlertTriangle, CheckCircle, ExternalLink, Clock } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { supabase } from '@/integrations/supabase/client';

interface SkillGap {
  skill: string;
  currentLevel: number;
  requiredLevel: number;
  gap: number;
  priority: 'high' | 'medium' | 'low';
  resources: Array<{
    title: string;
    url: string;
    provider: string;
    type: 'course' | 'tutorial' | 'certification' | 'project';
    duration: string;
    free: boolean;
  }>;
}

interface JobMatch {
  title: string;
  company: string;
  matchScore: number;
  requirements: string[];
  skillGaps: SkillGap[];
}

const AISkillGapAnalyzer = ({ userProfile }) => {
  const [skillGaps, setSkillGaps] = useState<SkillGap[]>([]);
  const [jobMatches, setJobMatches] = useState<JobMatch[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [radarData, setRadarData] = useState([]);

  useEffect(() => {
    if (userProfile?.skills) {
      analyzeSkillGaps();
    }
  }, [userProfile]);

  const analyzeSkillGaps = async () => {
    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke('analyze-skill-gaps', {
        body: {
          skills: userProfile.skills,
          experience: userProfile.experience,
          education: userProfile.education,
          projects: userProfile.projects
        }
      });

      if (error) throw error;

      setSkillGaps(data.skillGaps);
      setJobMatches(data.jobMatches);
      
      // Prepare radar chart data
      const chartData = data.skillGaps.slice(0, 8).map(gap => ({
        skill: gap.skill,
        current: gap.currentLevel,
        required: gap.requiredLevel,
        fullMark: 100
      }));
      setRadarData(chartData);

    } catch (error) {
      console.error('Skill gap analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getGapIcon = (gap: number) => {
    if (gap <= 20) return CheckCircle;
    if (gap <= 50) return Target;
    return AlertTriangle;
  };

  if (!userProfile) {
    return (
      <div className="text-center py-12">
        <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No Profile Data</h3>
        <p className="text-gray-500">Please upload your resume first to see AI-powered skill gap analysis</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          AI Skill Gap Analysis
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Advanced AI analysis of your skills compared to current market demands and job requirements
        </p>
      </motion.div>

      {isAnalyzing ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-12 rounded-xl shadow-lg border text-center"
        >
          <Brain className="w-16 h-16 text-purple-600 animate-pulse mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">AI is Analyzing Your Profile</h3>
          <p className="text-gray-600">Comparing your skills with 10,000+ job postings...</p>
        </motion.div>
      ) : (
        <>
          {/* Skill Radar Chart */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white p-8 rounded-xl shadow-lg border"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Skills Radar</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="skill" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar
                    name="Current Level"
                    dataKey="current"
                    stroke="#3B82F6"
                    fill="#3B82F6"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Radar
                    name="Required Level"
                    dataKey="required"
                    stroke="#EF4444"
                    fill="transparent"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-6 mt-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                <span className="text-sm text-gray-600">Your Current Level</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 border-2 border-red-500 border-dashed rounded mr-2"></div>
                <span className="text-sm text-gray-600">Market Requirement</span>
              </div>
            </div>
          </motion.div>

          {/* Job Matches */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {jobMatches.slice(0, 4).map((job, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg border">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{job.title}</h4>
                    <p className="text-blue-600 font-medium">{job.company}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">{job.matchScore}%</div>
                    <div className="text-sm text-gray-500">Match</div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h5 className="font-medium text-gray-900 mb-2">Key Requirements:</h5>
                  <div className="flex flex-wrap gap-2">
                    {job.requirements.slice(0, 5).map((req, reqIndex) => (
                      <span key={reqIndex} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                        {req}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-sm text-gray-600">
                  <div className="flex items-center">
                    <AlertTriangle className="w-4 h-4 text-orange-500 mr-1" />
                    {job.skillGaps.length} skills to improve
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Detailed Skill Gaps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-gray-900">Priority Skills to Develop</h3>
            {skillGaps.slice(0, 6).map((gap, index) => {
              const GapIcon = getGapIcon(gap.gap);
              
              return (
                <div key={index} className="bg-white p-6 rounded-xl shadow-lg border">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <GapIcon className="w-6 h-6 text-gray-600 mr-3" />
                      <h4 className="text-xl font-semibold text-gray-900">{gap.skill}</h4>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(gap.priority)}`}>
                      {gap.priority.toUpperCase()} PRIORITY
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Your Level</div>
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2 mr-3">
                          <div 
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${gap.currentLevel}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{gap.currentLevel}%</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Required Level</div>
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2 mr-3">
                          <div 
                            className="bg-green-600 h-2 rounded-full"
                            style={{ width: `${gap.requiredLevel}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{gap.requiredLevel}%</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-600 mb-1">Skill Gap</div>
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2 mr-3">
                          <div 
                            className={`h-2 rounded-full ${
                              gap.gap <= 20 ? 'bg-green-500' : 
                              gap.gap <= 50 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${gap.gap}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{gap.gap}%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-medium text-gray-900 mb-3">Recommended Free Resources:</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {gap.resources.slice(0, 4).map((resource, resIndex) => (
                        <div key={resIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{resource.title}</div>
                            <div className="text-sm text-gray-600">{resource.provider}</div>
                            <div className="flex items-center mt-1">
                              <Clock className="w-3 h-3 text-gray-500 mr-1" />
                              <span className="text-xs text-gray-500">{resource.duration}</span>
                              {resource.free && (
                                <span className="ml-2 bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs">FREE</span>
                              )}
                            </div>
                          </div>
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-3 p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </>
      )}
    </div>
  );
};

export default AISkillGapAnalyzer;
