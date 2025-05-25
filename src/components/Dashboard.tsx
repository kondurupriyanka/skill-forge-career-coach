
import React, { useState } from 'react';
import ResumeUpload from './ResumeUpload';
import SkillsAnalysis from './SkillsAnalysis';
import JobRecommendations from './JobRecommendations';
import LearningRoadmap from './LearningRoadmap';
import InterviewPrep from './InterviewPrep';
import ProgressTracker from './ProgressTracker';
import WelcomeSection from './WelcomeSection';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userProfile, setUserProfile] = useState(null);

  const tabs = [
    { id: 'overview', label: 'Overview', component: WelcomeSection },
    { id: 'upload', label: 'Upload Resume', component: ResumeUpload },
    { id: 'skills', label: 'Skills Analysis', component: SkillsAnalysis },
    { id: 'jobs', label: 'Job Matches', component: JobRecommendations },
    { id: 'roadmap', label: 'Learning Path', component: LearningRoadmap },
    { id: 'interview', label: 'Interview Prep', component: InterviewPrep },
    { id: 'progress', label: 'Progress', component: ProgressTracker }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || WelcomeSection;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Career Dashboard</h2>
        <p className="text-gray-600">Navigate your path to success with AI-powered insights</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Active Component */}
      <div className="animate-fade-in">
        <ActiveComponent userProfile={userProfile} setUserProfile={setUserProfile} />
      </div>
    </div>
  );
};

export default Dashboard;
