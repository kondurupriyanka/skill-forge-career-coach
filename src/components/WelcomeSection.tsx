
import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Zap, Target, TrendingUp, Users, Award, Rocket, Star, Crown, Sparkles } from 'lucide-react';
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
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop&crop=top'
    },
    {
      icon: Zap,
      title: 'Real-Time Matching',
      description: 'Live job recommendations updated continuously based on market trends',
      color: 'from-blue-500 via-cyan-500 to-teal-500',
      image: 'https://images.unsplash.com/photo-1551038247-3d9af20df552?w=800&h=600&fit=crop&crop=center'
    },
    {
      icon: Target,
      title: 'Personalized Roadmaps',
      description: 'Custom learning paths tailored to your career goals and skill gaps',
      color: 'from-emerald-500 via-green-500 to-lime-500',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&crop=center'
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Track your progress and get insights on career advancement opportunities',
      color: 'from-orange-500 via-amber-500 to-yellow-500',
      image: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&h=600&fit=crop&crop=center'
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
      {/* Hero Section with Beautiful Landscape */}
      <motion.div
        variants={itemVariants}
        className="relative text-center overflow-hidden rounded-3xl min-h-[500px] flex items-center justify-center"
      >
        <div 
          className="absolute inset-0 bg-gradient-to-br from-violet-600/80 via-purple-600/80 to-pink-600/80 transition-all duration-700"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=900&fit=crop&crop=center')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundBlendMode: 'overlay'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
        <div className="relative z-10 px-8 py-16 text-white max-w-5xl mx-auto">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex justify-center mb-8">
              <motion.div
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-lg border border-white/30 shadow-2xl"
              >
                <Rocket className="w-10 h-10 text-white" />
              </motion.div>
            </div>
            <h1 className="text-7xl font-bold mb-8 bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent drop-shadow-2xl">
              Transform Your Career with AI
            </h1>
            <p className="text-2xl text-blue-100 max-w-4xl mx-auto mb-10 leading-relaxed drop-shadow-lg">
              Experience the future of career development with our AI-powered platform. 
              Get real-time job matches, personalized skill assessments, and intelligent career guidance.
            </p>
            <motion.div
              className="flex justify-center space-x-3 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ 
                    scale: [1, 1.3, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    delay: i * 0.3,
                    ease: "easeInOut"
                  }}
                >
                  <Star className="w-8 h-8 text-yellow-300 fill-current drop-shadow-lg" />
                </motion.div>
              ))}
            </motion.div>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl"
            >
              <Sparkles className="w-8 h-8 mx-auto mb-3 text-yellow-300" />
              <p className="text-lg text-blue-100 font-medium">
                ✨ Join 50,000+ professionals who have already transformed their careers
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* AI Setup Status */}
      <motion.div variants={itemVariants}>
        <AISetupPrompt />
      </motion.div>

      {/* Enhanced Stats Section with Team Image */}
      <motion.div
        variants={itemVariants}
        className="relative rounded-3xl overflow-hidden"
      >
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=400&fit=crop&crop=center')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="relative bg-gradient-to-r from-white/90 via-white/95 to-white/90 backdrop-blur-xl p-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Trusted by Professionals Worldwide
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our AI-powered platform delivers exceptional results for career growth
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div 
                  key={index} 
                  className="relative group text-center"
                  whileHover={{ scale: 1.05, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${stat.color} rounded-3xl opacity-10 group-hover:opacity-20 transition-all duration-300 blur-xl`} />
                  <div className="relative bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 p-8 group-hover:shadow-3xl transition-all duration-300">
                    <motion.div
                      className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </motion.div>
                    <div className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                      {stat.number}
                    </div>
                    <div className="text-lg text-gray-600 font-semibold">{stat.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Enhanced Features Grid with Meaningful Images */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 gap-12"
      >
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <motion.div 
              key={index} 
              className="relative group overflow-hidden rounded-3xl shadow-2xl"
              whileHover={{ scale: 1.03, y: -8 }}
              transition={{ duration: 0.5 }}
            >
              {/* High-quality Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                style={{ backgroundImage: `url('${feature.image}')` }}
              />
              
              {/* Enhanced Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-85 group-hover:opacity-90 transition-all duration-500`} />
              
              {/* Content with Better Positioning */}
              <div className="relative z-10 p-10 text-white min-h-[320px] flex flex-col justify-between">
                <div>
                  <motion.div
                    className="w-20 h-20 bg-white/20 backdrop-blur-xl rounded-3xl flex items-center justify-center mb-6 shadow-2xl border border-white/30"
                    whileHover={{ rotate: 360, scale: 1.15 }}
                    transition={{ duration: 0.6 }}
                  >
                    <IconComponent className="w-10 h-10 text-white" />
                  </motion.div>
                  <h3 className="text-3xl font-bold mb-6 drop-shadow-lg">{feature.title}</h3>
                  <p className="text-white/95 leading-relaxed text-lg">{feature.description}</p>
                </div>
                
                {/* Decorative Elements */}
                <div className="flex justify-between items-end mt-6">
                  <div className="opacity-30">
                    <Crown className="w-10 h-10" />
                  </div>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-4 h-4 bg-white rounded-full opacity-60"
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* AI Career Chat */}
      {userProfile && (
        <motion.div variants={itemVariants}>
          <div className="relative overflow-hidden rounded-3xl">
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=1200&h=600&fit=crop&crop=center')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            <div className="relative bg-gradient-to-br from-cyan-50/90 via-blue-50/95 to-purple-50/90 backdrop-blur-xl rounded-3xl border border-white/50 p-12 shadow-2xl">
              <div className="text-center mb-8">
                <motion.div
                  className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Brain className="w-8 h-8 text-white" />
                </motion.div>
                <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  AI Career Coach
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Get personalized guidance from our advanced AI career advisor
                </p>
              </div>
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

      {/* Enhanced Call to Action with Inspiring Image */}
      <motion.div
        variants={itemVariants}
        className="relative text-center overflow-hidden rounded-3xl min-h-[400px] flex items-center justify-center"
      >
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1600&h=800&fit=crop&crop=center')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-violet-900/85 via-purple-900/90 to-pink-900/85" />
        <div className="relative z-10 p-16 text-white max-w-4xl mx-auto">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="mb-8"
            >
              <Rocket className="w-20 h-20 mx-auto text-yellow-300 drop-shadow-2xl" />
            </motion.div>
            <h2 className="text-5xl font-bold mb-6 drop-shadow-2xl">Ready to Accelerate Your Career?</h2>
            <p className="text-2xl mb-10 text-blue-100 max-w-3xl mx-auto leading-relaxed drop-shadow-lg">
              Join thousands of professionals who have transformed their careers with AI guidance
            </p>
            {!userProfile ? (
              <motion.div 
                className="bg-white/15 backdrop-blur-xl rounded-3xl p-8 border border-white/30 shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Sparkles className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
                <p className="text-2xl text-blue-200 font-semibold">
                  🚀 Upload your resume in the "AI Resume Parser" tab to get started!
                </p>
              </motion.div>
            ) : (
              <motion.div 
                className="bg-white/15 backdrop-blur-xl rounded-3xl p-8 border border-white/30 shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Award className="w-12 h-12 mx-auto mb-4 text-yellow-300" />
                <p className="text-2xl text-blue-200 font-semibold">
                  ✨ Explore all the AI-powered features in the tabs above to maximize your career potential!
                </p>
              </motion.div>
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WelcomeSection;
