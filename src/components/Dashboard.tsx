
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import EnhancedResumeUpload from './EnhancedResumeUpload';
import AISkillGapAnalyzer from './AISkillGapAnalyzer';
import JobRecommendations from './JobRecommendations';
import LearningRoadmap from './LearningRoadmap';
import InterviewPrep from './InterviewPrep';
import ProgressTracker from './ProgressTracker';
import WelcomeSection from './WelcomeSection';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userProfile, setUserProfile] = useState(null);

  const tabs = [
    { id: 'overview', label: 'Overview', component: WelcomeSection, icon: '🏠' },
    { id: 'upload', label: 'AI Resume Parser', component: EnhancedResumeUpload, icon: '🧠' },
    { id: 'skills', label: 'Skill Gap Analysis', component: AISkillGapAnalyzer, icon: '📊' },
    { id: 'jobs', label: 'Job Matches', component: JobRecommendations, icon: '💼' },
    { id: 'roadmap', label: 'Learning Roadmap', component: LearningRoadmap, icon: '🗺️' },
    { id: 'interview', label: 'AI Interview Prep', component: InterviewPrep, icon: '🎤' },
    { id: 'progress', label: 'Progress Tracker', component: ProgressTracker, icon: '📈' }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || WelcomeSection;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          AI Career Navigator
        </h2>
        <p className="text-gray-600 text-lg">Transform your career with AI-powered insights and personalized guidance</p>
      </motion.div>

      {/* Enhanced Tab Navigation with Icons */}
      <div className="bg-white/80 backdrop-blur-lg rounded-2xl border border-gray-200/50 shadow-lg mb-8 overflow-hidden">
        <nav className="flex overflow-x-auto">
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-0 py-4 px-6 font-medium text-sm whitespace-nowrap transition-all duration-300 relative ${
                activeTab === tab.id
                  ? 'text-blue-600 bg-blue-50/50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50/50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center justify-center space-x-2">
                <span className="text-lg">{tab.icon}</span>
                <span>{tab.label}</span>
              </div>
              
              {/* Active tab indicator */}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </nav>
      </div>

      {/* Active Component with Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="bg-white/60 backdrop-blur-sm rounded-2xl p-1"
        >
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
            <ActiveComponent userProfile={userProfile} setUserProfile={setUserProfile} />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Profile Status Indicator */}
      {userProfile && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-full shadow-lg"
        >
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
            <span className="font-medium">Profile Active</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;
