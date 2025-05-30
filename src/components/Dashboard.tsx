
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
    { id: 'overview', label: 'Overview', component: WelcomeSection, icon: '🏠', gradient: 'from-violet-500 to-purple-600' },
    { id: 'upload', label: 'AI Resume Parser', component: EnhancedResumeUpload, icon: '🧠', gradient: 'from-blue-500 to-cyan-600' },
    { id: 'skills', label: 'Skill Gap Analysis', component: AISkillGapAnalyzer, icon: '📊', gradient: 'from-emerald-500 to-green-600' },
    { id: 'jobs', label: 'Job Matches', component: JobRecommendations, icon: '💼', gradient: 'from-orange-500 to-amber-600' },
    { id: 'roadmap', label: 'Learning Roadmap', component: LearningRoadmap, icon: '🗺️', gradient: 'from-pink-500 to-rose-600' },
    { id: 'interview', label: 'AI Interview Prep', component: InterviewPrep, icon: '🎤', gradient: 'from-indigo-500 to-purple-600' },
    { id: 'progress', label: 'Progress Tracker', component: ProgressTracker, icon: '📈', gradient: 'from-teal-500 to-cyan-600' }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || WelcomeSection;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <motion.h2 
          className="text-5xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent mb-4"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          AI Career Navigator
        </motion.h2>
        <motion.p 
          className="text-gray-600 text-xl max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Transform your career with AI-powered insights and personalized guidance
        </motion.p>
      </motion.div>

      {/* Enhanced Tab Navigation */}
      <motion.div 
        className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl mb-12 overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <nav className="flex overflow-x-auto scrollbar-hide">
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-0 py-6 px-4 font-medium text-sm whitespace-nowrap transition-all duration-500 relative group ${
                activeTab === tab.id
                  ? 'text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 + 0.3 }}
            >
              {/* Background for active tab */}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTabBg"
                  className={`absolute inset-0 bg-gradient-to-r ${tab.gradient} rounded-2xl m-2 shadow-xl`}
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              
              {/* Hover background for inactive tabs */}
              <div className={`absolute inset-0 bg-gradient-to-r ${tab.gradient} opacity-0 group-hover:opacity-10 rounded-2xl m-2 transition-opacity duration-300`} />
              
              <div className="relative z-10 flex flex-col items-center space-y-2">
                <motion.span 
                  className="text-2xl"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  {tab.icon}
                </motion.span>
                <span className="font-semibold">{tab.label}</span>
              </div>
              
              {/* Active tab glow effect */}
              {activeTab === tab.id && (
                <motion.div
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-white rounded-full shadow-lg"
                  layoutId="activeTabIndicator"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </nav>
      </motion.div>

      {/* Active Component with Enhanced Animation */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="relative"
        >
          {/* Background with gradient and blur */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/40 to-white/60 backdrop-blur-sm rounded-3xl" />
          
          {/* Content container */}
          <div className="relative bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 p-8">
            <ActiveComponent userProfile={userProfile} setUserProfile={setUserProfile} />
          </div>

          {/* Decorative elements */}
          <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-violet-400 to-purple-600 rounded-full opacity-20 blur-xl" />
          <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-600 rounded-full opacity-20 blur-xl" />
        </motion.div>
      </AnimatePresence>

      {/* Enhanced Profile Status Indicator */}
      {userProfile && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 100 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <div className="bg-gradient-to-r from-emerald-500 to-green-600 text-white p-4 rounded-2xl shadow-2xl border border-white/20 backdrop-blur-lg">
            <div className="flex items-center space-x-3">
              <motion.div 
                className="w-3 h-3 bg-white rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="font-semibold">Profile Active</span>
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-xs">✨</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;
