
import React from 'react';
import { motion } from 'framer-motion';
import { Target, CheckCircle, Clock, Star, ArrowRight, MapPin, Trophy, Zap } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Roadmap = () => {
  const roadmapSteps = [
    {
      id: 1,
      title: 'Profile Setup',
      description: 'Upload resume and complete profile information',
      status: 'completed',
      estimatedTime: '10 mins',
      skills: ['Resume Upload', 'Profile Creation'],
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop&crop=center'
    },
    {
      id: 2,
      title: 'Skill Assessment',
      description: 'AI-powered analysis of your current skill set',
      status: 'current',
      estimatedTime: '20 mins',
      skills: ['Technical Skills', 'Soft Skills', 'Industry Knowledge'],
      image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=600&h=400&fit=crop&crop=center'
    },
    {
      id: 3,
      title: 'Goal Setting',
      description: 'Define your career objectives and target roles',
      status: 'upcoming',
      estimatedTime: '15 mins',
      skills: ['Career Planning', 'Goal Definition'],
      image: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=600&h=400&fit=crop&crop=center'
    },
    {
      id: 4,
      title: 'Learning Path',
      description: 'Personalized curriculum based on skill gaps',
      status: 'upcoming',
      estimatedTime: '2-6 months',
      skills: ['New Technologies', 'Certifications', 'Projects'],
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop&crop=center'
    },
    {
      id: 5,
      title: 'Portfolio Building',
      description: 'Create projects to showcase your skills',
      status: 'upcoming',
      estimatedTime: '1-3 months',
      skills: ['Project Development', 'GitHub', 'Documentation'],
      image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=600&h=400&fit=crop&crop=center'
    },
    {
      id: 6,
      title: 'Job Applications',
      description: 'Apply to relevant positions with optimized applications',
      status: 'upcoming',
      estimatedTime: 'Ongoing',
      skills: ['Resume Optimization', 'Cover Letters', 'Networking'],
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&crop=center'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-8 h-8 text-green-600" />;
      case 'current':
        return <Zap className="w-8 h-8 text-blue-600" />;
      default:
        return <Target className="w-8 h-8 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-500 bg-gradient-to-br from-green-50 to-emerald-50';
      case 'current':
        return 'border-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50';
      default:
        return 'border-gray-300 bg-gradient-to-br from-gray-50 to-slate-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      {/* Hero Section with Mountain Landscape */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&h=600&fit=crop&crop=center')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="relative bg-gradient-to-r from-blue-600/90 via-purple-600/80 to-pink-600/90 text-white py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-lg"
              >
                <MapPin className="w-10 h-10 text-white" />
              </motion.div>
              <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent mb-6 drop-shadow-2xl">
                Your Career Roadmap
              </h1>
              <p className="text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                Follow your personalized path to career success with AI-guided milestones and achievements.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          {roadmapSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative overflow-hidden rounded-3xl border-2 ${getStatusColor(step.status)} transition-all hover:shadow-2xl group`}
            >
              {/* Background Image */}
              <div 
                className="absolute top-0 right-0 w-1/3 h-full opacity-20 group-hover:opacity-30 transition-opacity"
                style={{
                  backgroundImage: `url('${step.image}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              
              <div className="relative p-8 flex items-start space-x-6">
                <div className="flex-shrink-0">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center group-hover:shadow-2xl transition-all"
                  >
                    {getStatusIcon(step.status)}
                  </motion.div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <span className="text-3xl font-bold text-gray-400">#{step.id}</span>
                      <h3 className="text-3xl font-bold text-gray-900">{step.title}</h3>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-gray-600 bg-white/80 backdrop-blur-lg rounded-full px-4 py-2 shadow-lg">
                      <Clock className="w-5 h-5" />
                      <span className="font-semibold">{step.estimatedTime}</span>
                    </div>
                  </div>
                  
                  <p className="text-xl text-gray-700 mb-6 leading-relaxed">{step.description}</p>
                  
                  <div className="flex flex-wrap gap-3 mb-6">
                    {step.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skillIndex}
                        whileHover={{ scale: 1.05 }}
                        className="px-4 py-2 bg-white/90 backdrop-blur-lg rounded-full text-sm font-semibold text-gray-700 border border-white/50 shadow-lg hover:shadow-xl transition-all"
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                  
                  {step.status === 'current' && (
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl hover:from-purple-600 hover:to-blue-600 transition-all flex items-center text-lg font-semibold shadow-xl"
                    >
                      Start Your Journey
                      <ArrowRight className="w-6 h-6 ml-3" />
                    </motion.button>
                  )}
                  
                  {step.status === 'completed' && (
                    <div className="flex items-center text-green-600 font-semibold text-lg">
                      <Trophy className="w-6 h-6 mr-3" />
                      Completed Successfully!
                    </div>
                  )}
                </div>
              </div>
              
              {index < roadmapSteps.length - 1 && (
                <div className="absolute left-12 -bottom-6 w-1 h-12 bg-gradient-to-b from-gray-300 to-transparent"></div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Enhanced CTA with Success Image */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-20 relative overflow-hidden rounded-3xl"
        >
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=600&fit=crop&crop=center')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-purple-900/85 to-pink-900/90" />
          <div className="relative text-center text-white p-16">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Star className="w-16 h-16 mx-auto mb-6 text-yellow-300" />
            </motion.div>
            <h2 className="text-5xl font-bold mb-6 drop-shadow-2xl">Ready to Accelerate Your Growth?</h2>
            <p className="text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
              Get personalized recommendations and track your progress with AI-powered insights.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-10 py-5 rounded-2xl text-xl font-bold hover:bg-blue-50 transition-colors shadow-2xl"
            >
              Start Your Journey Today
            </motion.button>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Roadmap;
