
import React, { useState, useEffect } from 'react';
import { AlertTriangle, Target, TrendingUp, BookOpen, ExternalLink, CheckCircle } from 'lucide-react';
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
    type: string;
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

const SkillGapAnalyzer = ({ userProfile }) => {
  const [skillGaps, setSkillGaps] = useState<SkillGap[]>([]);
  const [jobMatches, setJobMatches] = useState<JobMatch[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    if (userProfile) {
      analyzeSkillGaps();
    }
  }, [userProfile]);

  const analyzeSkillGaps = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('analyze-skill-gaps', {
        body: {
          skills: userProfile.skills || [],
          experience: userProfile.experience || [],
          education: userProfile.education || '',
          projects: []
        }
      });

      if (error) throw error;

      setSkillGaps(data.skillGaps || []);
      setJobMatches(data.jobMatches || []);
      setAnalysis(data.analysis || null);
    } catch (error) {
      console.error('Skill gap analysis error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-100 border-red-200';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low':
        return 'text-green-600 bg-green-100 border-green-200';
      default:
        return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return AlertTriangle;
      case 'medium':
        return Target;
      case 'low':
        return CheckCircle;
      default:
        return Target;
    }
  };

  if (!userProfile) {
    return (
      <div className="text-center py-12">
        <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No Profile Data</h3>
        <p className="text-gray-500">Please upload your resume first to see skill gap analysis</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">AI-Powered Skill Gap Analysis</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover which skills to develop next to advance your career based on current market demands
        </p>
      </div>

      {/* Analysis Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl">
          <TrendingUp className="w-10 h-10 mb-4" />
          <h3 className="text-2xl font-bold mb-2">{skillGaps.length}</h3>
          <p className="text-blue-100">Skills Identified</p>
        </div>
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-6 rounded-xl">
          <AlertTriangle className="w-10 h-10 mb-4" />
          <h3 className="text-2xl font-bold mb-2">
            {skillGaps.filter(gap => gap.priority === 'high').length}
          </h3>
          <p className="text-red-100">High Priority Gaps</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl">
          <CheckCircle className="w-10 h-10 mb-4" />
          <h3 className="text-2xl font-bold mb-2">{jobMatches.length}</h3>
          <p className="text-green-100">Job Matches Found</p>
        </div>
      </div>

      {/* Skill Gaps */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Skill Gap Analysis</h3>
        
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Analyzing your skill gaps...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {skillGaps.map((gap, index) => {
              const PriorityIcon = getPriorityIcon(gap.priority);
              
              return (
                <div key={index} className={`border rounded-lg p-6 ${getPriorityColor(gap.priority)}`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <PriorityIcon className="w-6 h-6" />
                      <div>
                        <h4 className="text-lg font-semibold">{gap.skill}</h4>
                        <p className="text-sm opacity-75">
                          Current: {gap.currentLevel}% | Required: {gap.requiredLevel}% | Gap: {gap.gap}%
                        </p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-medium capitalize">
                      {gap.priority} Priority
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress to Market Standard</span>
                      <span>{gap.currentLevel}%</span>
                    </div>
                    <div className="w-full bg-white bg-opacity-50 rounded-full h-2">
                      <div 
                        className="bg-current h-2 rounded-full transition-all duration-300"
                        style={{ width: `${gap.currentLevel}%` }}
                      ></div>
                    </div>
                  </div>

                  {gap.resources && gap.resources.length > 0 && (
                    <div>
                      <h5 className="font-medium mb-3 flex items-center">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Learning Resources
                      </h5>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {gap.resources.slice(0, 4).map((resource, resourceIndex) => (
                          <a
                            key={resourceIndex}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-3 bg-white bg-opacity-80 rounded-lg hover:bg-opacity-100 transition-all"
                          >
                            <div className="flex-1">
                              <p className="font-medium text-sm">{resource.title}</p>
                              <p className="text-xs opacity-75">{resource.provider} • {resource.duration}</p>
                            </div>
                            <ExternalLink className="w-4 h-4 ml-2 flex-shrink-0" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Job Matches */}
      {jobMatches.length > 0 && (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Matching Job Opportunities</h3>
          <div className="space-y-4">
            {jobMatches.slice(0, 3).map((job, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{job.title}</h4>
                    <p className="text-blue-600">{job.company}</p>
                  </div>
                  <div className="text-right">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      job.matchScore >= 80 ? 'bg-green-100 text-green-800' :
                      job.matchScore >= 60 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {job.matchScore}% Match
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Skills needed:</strong> {job.requirements.join(', ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Button */}
      <div className="text-center">
        <button
          onClick={analyzeSkillGaps}
          disabled={isLoading}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {isLoading ? 'Analyzing...' : 'Refresh Analysis'}
        </button>
      </div>
    </div>
  );
};

export default SkillGapAnalyzer;
