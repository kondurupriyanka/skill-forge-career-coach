
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Target, TrendingUp, Users, Award, Rocket, Star, Crown } from 'lucide-react';
import AISetupPrompt from './AISetupPrompt';
import AICareerChat from './AICareerChat';
import RealTimeJobMatcher from './RealTimeJobMatcher';

const WelcomeSection = ({ userProfile, setUserProfile }) => {
  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Analysis',
      description: 'Advanced resume parsing and skill assessment using cutting-edge AI technology',
      color: 'from-purple-500 via-violet-500 to-indigo-500',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop&crop=top'
    },
    {
      icon: Zap,
      title: 'Real-Time Matching',
      description: 'Live job recommendations updated continuously based on market trends',
      color: 'from-blue-500 via-cyan-500 to-teal-500',
      image: 'https://images.unsplash.com/photo-1551038247-3d9af20df552?w=400&h=300&fit=crop&crop=center'
    },
    {
      icon: Target,
      title: 'Personalized Roadmaps',
      description: 'Custom learning paths tailored to your career goals and skill gaps',
      color: 'from-emerald-500 via-green-500 to-lime-500',
      image: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23?w=400&h=300&fit=crop&crop=center'
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Track your progress and get insights on career advancement opportunities',
      color: 'from-orange-500 via-amber-500 to-yellow-500',
      image: 'https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=400&h=300&fit=crop&crop=center'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Job Matches Daily', icon: Users, color: 'from-violet-500 to-purple-600' },
    { number: '95%', label: 'Success Rate', icon: Award, color: 'from-emerald-500 to-green-600' },
    { number: '24/7', label: 'AI Support', icon: Brain, color: 'from-blue-500 to-cyan-600' },
    { number: '100+', label: 'Skills Tracked', icon: Target, color: 'from-pink-500 to-rose-600' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.div 
      className="space-y-16"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Hero Section with Background Image */}
      <motion.div
        variants={itemVariants}
        className="relative text-center overflow-hidden rounded-3xl"
      >
        <div 
          className="absolute inset-0 bg-gradient-to-br from-violet-600/90 via-purple-600/90 to-pink-600/90"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&h=600&fit=crop&crop=center')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'overlay'
          }}
        />
        <div className="relative z-10 px-8 py-16 text-white">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex justify-center mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-lg"
              >
                <Rocket className="w-8 h-8 text-white" />
              </motion.div>
            </div>
            <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent">
              Transform Your Career with AI
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8 leading-relaxed">
              Experience the future of career development with our AI-powered platform. 
              Get real-time job matches, personalized skill assessments, and intelligent career guidance.
            </p>
            <motion.div
              className="flex justify-center space-x-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                >
                  <Star className="w-6 h-6 text-yellow-300 fill-current" />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* AI Setup Status */}
      <motion.div variants={itemVariants}>
        <AISetupPrompt />
      </motion.div>

      {/* Stats Section */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <motion.div 
              key={index} 
              className="relative group"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity`} />
              <div className="relative text-center p-6 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50">
                <motion.div
                  className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg`}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <IconComponent className="w-6 h-6 text-white" />
                </motion.div>
                <div className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Features Grid */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <motion.div 
              key={index} 
              className="relative group overflow-hidden rounded-3xl shadow-2xl"
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.4 }}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url('${feature.image}')` }}
              />
              
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-90 group-hover:opacity-95 transition-opacity`} />
              
              {/* Content */}
              <div className="relative z-10 p-8 text-white">
                <motion.div
                  className="w-16 h-16 bg-white/20 backdrop-blur-lg rounded-2xl flex items-center justify-center mb-6 shadow-xl"
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <IconComponent className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-white/90 leading-relaxed">{feature.description}</p>
                
                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 opacity-20">
                  <Crown className="w-8 h-8" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* AI Career Chat */}
      {userProfile && (
        <motion.div variants={itemVariants}>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-3xl opacity-10" />
            <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl border border-white/50 p-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
                AI Career Coach
              </h2>
              <AICareerChat userProfile={userProfile} />
            </div>
          </div>
        </motion.div>
      )}

      {/* Real-Time Job Matcher */}
      {userProfile && (
        <motion.div variants={itemVariants}>
          <RealTimeJobMatcher userProfile={userProfile} />
        </motion.div>
      )}

      {/* Call to Action */}
      <motion.div
        variants={itemVariants}
        className="relative text-center overflow-hidden rounded-3xl"
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&h=400&fit=crop&crop=center')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-violet-900/90 via-purple-900/90 to-pink-900/90" />
        <div className="relative z-10 p-12 text-white">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Rocket className="w-16 h-16 mx-auto mb-6 text-yellow-300" />
            <h2 className="text-4xl font-bold mb-4">Ready to Accelerate Your Career?</h2>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Join thousands of professionals who have transformed their careers with AI guidance
            </p>
            {!userProfile ? (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <p className="text-lg text-blue-200">
                  🚀 Upload your resume in the "AI Resume Parser" tab to get started!
                </p>
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <p className="text-lg text-blue-200">
                  ✨ Explore all the AI-powered features in the tabs above to maximize your career potential!
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WelcomeSection;
