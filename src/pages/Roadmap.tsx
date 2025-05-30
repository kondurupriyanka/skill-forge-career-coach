
import React from 'react';
import { motion } from 'framer-motion';
import { Target, CheckCircle, Clock, Star, ArrowRight } from 'lucide-react';
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
      skills: ['Resume Upload', 'Profile Creation']
    },
    {
      id: 2,
      title: 'Skill Assessment',
      description: 'AI-powered analysis of your current skill set',
      status: 'current',
      estimatedTime: '20 mins',
      skills: ['Technical Skills', 'Soft Skills', 'Industry Knowledge']
    },
    {
      id: 3,
      title: 'Goal Setting',
      description: 'Define your career objectives and target roles',
      status: 'upcoming',
      estimatedTime: '15 mins',
      skills: ['Career Planning', 'Goal Definition']
    },
    {
      id: 4,
      title: 'Learning Path',
      description: 'Personalized curriculum based on skill gaps',
      status: 'upcoming',
      estimatedTime: '2-6 months',
      skills: ['New Technologies', 'Certifications', 'Projects']
    },
    {
      id: 5,
      title: 'Portfolio Building',
      description: 'Create projects to showcase your skills',
      status: 'upcoming',
      estimatedTime: '1-3 months',
      skills: ['Project Development', 'GitHub', 'Documentation']
    },
    {
      id: 6,
      title: 'Job Applications',
      description: 'Apply to relevant positions with optimized applications',
      status: 'upcoming',
      estimatedTime: 'Ongoing',
      skills: ['Resume Optimization', 'Cover Letters', 'Networking']
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'current':
        return <Clock className="w-6 h-6 text-blue-600" />;
      default:
        return <Target className="w-6 h-6 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'border-green-500 bg-green-50';
      case 'current':
        return 'border-blue-500 bg-blue-50';
      default:
        return 'border-gray-300 bg-gray-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            Your Career Roadmap
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Follow your personalized path to career success with AI-guided milestones and achievements.
          </p>
        </motion.div>

        <div className="space-y-8">
          {roadmapSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-6 rounded-xl border-2 ${getStatusColor(step.status)} transition-all hover:shadow-lg`}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  {getStatusIcon(step.status)}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{step.title}</h3>
                    <span className="text-sm text-gray-500 flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {step.estimatedTime}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{step.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {step.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 border"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  {step.status === 'current' && (
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                      Start Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </button>
                  )}
                </div>
              </div>
              
              {index < roadmapSteps.length - 1 && (
                <div className="absolute left-8 top-full w-0.5 h-8 bg-gray-300"></div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl"
        >
          <Star className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Ready to Accelerate?</h2>
          <p className="text-blue-100 mb-6">
            Get personalized recommendations and track your progress with AI-powered insights.
          </p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
            Get Started Today
          </button>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Roadmap;
