
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RealTimeJobMatcher from './RealTimeJobMatcher';
import SkillsAnalysis from './SkillsAnalysis';
import SkillGapAnalyzer from './SkillGapAnalyzer';
import LearningRoadmap from './LearningRoadmap';
import JobRecommendations from './JobRecommendations';

const JobMatchingDashboard = ({ userProfile }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Career Intelligence Dashboard</h1>
        <p className="text-xl text-gray-600">
          AI-powered insights to accelerate your career growth
        </p>
      </div>

      <Tabs defaultValue="real-time-jobs" className="space-y-8">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="real-time-jobs">Live Jobs</TabsTrigger>
          <TabsTrigger value="skill-analysis">Skills</TabsTrigger>
          <TabsTrigger value="skill-gaps">Gap Analysis</TabsTrigger>
          <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="real-time-jobs">
          <RealTimeJobMatcher userProfile={userProfile} />
        </TabsContent>

        <TabsContent value="skill-analysis">
          <SkillsAnalysis userProfile={userProfile} />
        </TabsContent>

        <TabsContent value="skill-gaps">
          <SkillGapAnalyzer userProfile={userProfile} />
        </TabsContent>

        <TabsContent value="roadmap">
          <LearningRoadmap userProfile={userProfile} />
        </TabsContent>

        <TabsContent value="recommendations">
          <JobRecommendations userProfile={userProfile} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default JobMatchingDashboard;
