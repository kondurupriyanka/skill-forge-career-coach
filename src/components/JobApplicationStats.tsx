import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Briefcase, CheckCircle, Clock, Calendar } from 'lucide-react';

interface JobApplicationStatsProps {
  userId: string;
}

const JobApplicationStats: React.FC<JobApplicationStatsProps> = ({ userId }) => {
  const [stats, setStats] = useState({
    totalApplications: 0,
    recentApplications: 0,
    interviews: 0,
    responses: 0,
    loading: true
  });

  useEffect(() => {
    if (userId) {
      fetchApplicationStats();
    }
  }, [userId]);

  const fetchApplicationStats = async () => {
    try {
      // Check if the job_applications table exists
      const { data: tableCheck, error: tableCheckError } = await supabase
        .from('job_applications')
        .select('id')
        .limit(1);
      
      // If table doesn't exist, use default values
      if (tableCheckError) {
        console.log('Note: job_applications table may not exist yet:', tableCheckError.message);
        setStats({
          totalApplications: 0,
          recentApplications: 0,
          interviews: 0,
          responses: 0,
          loading: false
        });
        return;
      }
      
      // Get total applications
      const { data: totalData, error: totalError } = await supabase
        .from('job_applications')
        .select('id')
        .eq('user_id', userId);

      // Get applications in the last 7 days
      const lastWeek = new Date();
      lastWeek.setDate(lastWeek.getDate() - 7);
      const { data: recentData, error: recentError } = await supabase
        .from('job_applications')
        .select('id')
        .eq('user_id', userId)
        .gte('applied_at', lastWeek.toISOString());

      // Get interviews scheduled
      const { data: interviewData, error: interviewError } = await supabase
        .from('job_applications')
        .select('id')
        .eq('user_id', userId)
        .not('interview_date', 'is', null);

      // Get responses received
      const { data: responseData, error: responseError } = await supabase
        .from('job_applications')
        .select('id')
        .eq('user_id', userId)
        .not('response_received_at', 'is', null);

      // If there are errors, log them but continue with default values
      if (totalError || recentError || interviewError || responseError) {
        console.log('Note: Error fetching application stats, using defaults:', 
          totalError || recentError || interviewError || responseError);
      }

      setStats({
        totalApplications: totalData?.length || 0,
        recentApplications: recentData?.length || 0,
        interviews: interviewData?.length || 0,
        responses: responseData?.length || 0,
        loading: false
      });
    } catch (error) {
      console.log('Error in fetchApplicationStats, using defaults:', error);
      setStats({
        totalApplications: 0,
        recentApplications: 0,
        interviews: 0,
        responses: 0,
        loading: false
      });
    }
  };

  if (stats.loading) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-8 bg-gray-200 rounded mb-4"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
        Your Application Stats
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
          <div className="flex items-center text-blue-700 mb-1">
            <Briefcase className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">Total Applications</span>
          </div>
          <p className="text-2xl font-bold text-blue-800">{stats.totalApplications}</p>
        </div>
        
        <div className="bg-green-50 p-3 rounded-lg border border-green-100">
          <div className="flex items-center text-green-700 mb-1">
            <Clock className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">Last 7 Days</span>
          </div>
          <p className="text-2xl font-bold text-green-800">{stats.recentApplications}</p>
        </div>
        
        <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
          <div className="flex items-center text-purple-700 mb-1">
            <Calendar className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">Interviews</span>
          </div>
          <p className="text-2xl font-bold text-purple-800">{stats.interviews}</p>
        </div>
        
        <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
          <div className="flex items-center text-amber-700 mb-1">
            <CheckCircle className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">Responses</span>
          </div>
          <p className="text-2xl font-bold text-amber-800">{stats.responses}</p>
        </div>
      </div>
    </div>
  );
};

export default JobApplicationStats;