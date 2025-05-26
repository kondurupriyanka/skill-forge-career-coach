
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Target, TrendingUp, Users, Award } from 'lucide-react';
import AISetupPrompt from './AISetupPrompt';
import AICareerChat from './AICareerChat';
import RealTimeJobMatcher from './RealTimeJobMatcher';

const WelcomeSection = ({ userProfile, setUserProfile }) => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced resume parsing and skill assessment using cutting-edge AI technology',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Zap,
      title: 'Real-Time Matching',
      description: 'Live job recommendations updated continuously based on market trends',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Target,
      title: 'Personalized Roadmaps',
      description: 'Custom learning paths tailored to your career goals and skill gaps',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Track your progress and get insights on career advancement opportunities',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Job Matches Daily', icon: Users },
    { number: '95%', label: 'Success Rate', icon: Award },
    { number: '24/7', label: 'AI Support', icon: Brain },
    { number: '100+', label: 'Skills Tracked', icon: Target }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
          Transform Your Career with AI
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
          Experience the future of career development with our AI-powered platform. 
          Get real-time job matches, personalized skill assessments, and intelligent career guidance.
        </p>
      </motion.div>

      {/* AI Setup Status */}
      <AISetupPrompt />

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="text-center p-6 bg-white rounded-xl shadow-lg border">
              <IconComponent className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          );
        })}
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <div key={index} className="relative p-8 bg-white rounded-2xl shadow-lg border overflow-hidden group hover:shadow-xl transition-shadow">
              <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-6`}>
                <IconComponent className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          );
        })}
      </motion.div>

      {/* AI Career Chat */}
      {userProfile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">AI Career Coach</h2>
          <AICareerChat userProfile={userProfile} />
        </motion.div>
      )}

      {/* Real-Time Job Matcher */}
      {userProfile && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <RealTimeJobMatcher userProfile={userProfile} />
        </motion.div>
      )}

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white p-12 rounded-2xl"
      >
        <h2 className="text-3xl font-bold mb-4">Ready to Accelerate Your Career?</h2>
        <p className="text-xl mb-8 text-blue-100">
          Join thousands of professionals who have transformed their careers with AI guidance
        </p>
        {!userProfile ? (
          <p className="text-lg text-blue-200">
            Upload your resume in the "AI Resume Parser" tab to get started!
          </p>
        ) : (
          <p className="text-lg text-blue-200">
            Explore all the AI-powered features in the tabs above to maximize your career potential!
          </p>
        )}
      </motion.div>
    </div>
  );
};

export default WelcomeSection;
