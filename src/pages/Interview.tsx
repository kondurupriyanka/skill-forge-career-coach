
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, BookOpen, Target, Award, Clock, CheckCircle, Mic, Video, Brain } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Interview = () => {
  const [selectedCategory, setSelectedCategory] = useState('technical');

  const categories = [
    { id: 'technical', name: 'Technical Questions', icon: Target, color: 'from-blue-500 to-cyan-600' },
    { id: 'behavioral', name: 'Behavioral Questions', icon: BookOpen, color: 'from-purple-500 to-pink-600' },
    { id: 'mock', name: 'Mock Interviews', icon: Play, color: 'from-green-500 to-emerald-600' },
    { id: 'tips', name: 'Interview Tips', icon: Award, color: 'from-orange-500 to-yellow-600' }
  ];

  const practiceQuestions = {
    technical: [
      {
        question: 'Explain the difference between let, const, and var in JavaScript.',
        difficulty: 'Intermediate',
        image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop&crop=center'
      },
      {
        question: 'How would you optimize a React application for performance?',
        difficulty: 'Advanced', 
        image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=300&fit=crop&crop=center'
      },
      {
        question: 'Describe the concept of closure in JavaScript with an example.',
        difficulty: 'Intermediate',
        image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop&crop=center'
      },
      {
        question: 'What is the virtual DOM and how does it work?',
        difficulty: 'Beginner',
        image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=300&fit=crop&crop=center'
      }
    ],
    behavioral: [
      {
        question: 'Tell me about a time when you had to work with a difficult team member.',
        difficulty: 'Intermediate',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop&crop=center'
      },
      {
        question: 'Describe a challenging project you worked on and how you overcame obstacles.',
        difficulty: 'Advanced',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center'
      },
      {
        question: 'How do you handle tight deadlines and pressure?',
        difficulty: 'Intermediate',
        image: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=400&h=300&fit=crop&crop=center'
      },
      {
        question: 'Give an example of when you had to learn a new technology quickly.',
        difficulty: 'Beginner',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop&crop=center'
      }
    ]
  };

  const mockInterviews = [
    {
      id: 1,
      title: 'Frontend Developer Interview',
      duration: '45 minutes',
      difficulty: 'Intermediate',
      completed: true,
      type: 'Video Interview',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop&crop=center'
    },
    {
      id: 2,
      title: 'System Design Interview',
      duration: '60 minutes',
      difficulty: 'Advanced',
      completed: false,
      type: 'Technical Deep Dive',
      image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=300&fit=crop&crop=center'
    },
    {
      id: 3,
      title: 'Behavioral Interview',
      duration: '30 minutes',
      difficulty: 'Beginner',
      completed: true,
      type: 'Soft Skills Assessment',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop&crop=center'
    }
  ];

  const tips = [
    {
      category: 'Before the Interview',
      items: [
        'Research the company and role thoroughly',
        'Prepare specific examples using the STAR method',
        'Practice common questions out loud',
        'Prepare thoughtful questions to ask the interviewer'
      ],
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop&crop=center'
    },
    {
      category: 'During the Interview',
      items: [
        'Arrive 10-15 minutes early',
        'Maintain good eye contact and body language',
        'Listen carefully and ask clarifying questions',
        'Be specific and provide concrete examples'
      ],
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop&crop=center'
    },
    {
      category: 'After the Interview',
      items: [
        'Send a thank-you email within 24 hours',
        'Reflect on your performance and areas for improvement',
        'Follow up appropriately if you don\'t hear back',
        'Continue practicing for future opportunities'
      ],
      image: 'https://images.unsplash.com/photo-1553484771-371a605b060b?w=600&h=400&fit=crop&crop=center'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      {/* Hero Section with Professional Interview Setting */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1600&h=600&fit=crop&crop=center')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="relative bg-gradient-to-r from-blue-600/90 via-purple-600/80 to-pink-600/90 text-white py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
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
                <Mic className="w-10 h-10 text-white" />
              </motion.div>
              <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent mb-6 drop-shadow-2xl">
                AI Interview Preparation
              </h1>
              <p className="text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                Master your interviews with personalized practice sessions and AI-powered feedback.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Enhanced Category Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative overflow-hidden rounded-3xl shadow-2xl mb-12"
        >
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=400&fit=crop&crop=center')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <div className="relative bg-white/90 backdrop-blur-xl p-8 border border-white/50">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Choose Your Preparation Path
              </h2>
              <p className="text-xl text-gray-600">Select the type of interview practice that matches your needs</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <motion.button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    whileHover={{ scale: 1.05, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative overflow-hidden p-6 rounded-2xl text-center transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'text-white shadow-2xl'
                        : 'bg-white text-gray-700 hover:shadow-xl border-2 border-gray-100'
                    }`}
                  >
                    {selectedCategory === category.id && (
                      <div className={`absolute inset-0 bg-gradient-to-r ${category.color}`} />
                    )}
                    <div className="relative z-10">
                      <IconComponent className="w-8 h-8 mx-auto mb-3" />
                      <span className="text-lg font-semibold">{category.name}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Content based on selected category */}
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          {(selectedCategory === 'technical' || selectedCategory === 'behavioral') && (
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <div 
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=1200&h=800&fit=crop&crop=center')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <div className="relative bg-white/90 backdrop-blur-xl p-10 border border-white/50">
                <div className="flex items-center mb-8">
                  <Brain className="w-10 h-10 text-blue-600 mr-4" />
                  <h2 className="text-3xl font-bold text-gray-900">
                    {selectedCategory === 'technical' ? 'Technical Practice Questions' : 'Behavioral Practice Questions'}
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {practiceQuestions[selectedCategory].map((item, index) => (
                    <motion.div 
                      key={index} 
                      className="group relative overflow-hidden rounded-2xl border-2 border-gray-200 hover:border-blue-300 transition-all duration-300 bg-white shadow-lg hover:shadow-2xl"
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      <div 
                        className="h-48 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                        style={{ backgroundImage: `url('${item.image}')` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold border-2 ${getDifficultyColor(item.difficulty)}`}>
                          {item.difficulty}
                        </span>
                      </div>
                      <div className="relative p-6">
                        <p className="text-gray-800 text-lg leading-relaxed mb-6 font-medium">{item.question}</p>
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all font-semibold text-lg shadow-lg"
                        >
                          Start Practice Session
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedCategory === 'mock' && (
            <div className="relative overflow-hidden rounded-3xl shadow-2xl">
              <div 
                className="absolute inset-0 opacity-5"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=800&fit=crop&crop=center')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <div className="relative bg-white/90 backdrop-blur-xl p-10 border border-white/50">
                <div className="flex items-center mb-8">
                  <Video className="w-10 h-10 text-green-600 mr-4" />
                  <h2 className="text-3xl font-bold text-gray-900">Mock Interview Sessions</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {mockInterviews.map((interview) => (
                    <motion.div 
                      key={interview.id} 
                      className="group relative overflow-hidden rounded-2xl border-2 border-gray-200 hover:border-green-300 transition-all duration-300 bg-white shadow-lg hover:shadow-2xl"
                      whileHover={{ scale: 1.02, y: -5 }}
                    >
                      <div 
                        className="h-48 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                        style={{ backgroundImage: `url('${interview.image}')` }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute top-4 right-4 flex items-center">
                        {interview.completed && <CheckCircle className="w-8 h-8 text-green-500 bg-white rounded-full p-1" />}
                      </div>
                      <div className="relative p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{interview.title}</h3>
                        <p className="text-gray-600 mb-4">{interview.type}</p>
                        
                        <div className="space-y-3 mb-6">
                          <div className="flex items-center text-sm">
                            <Clock className="w-5 h-5 mr-3 text-blue-500" />
                            <span className="font-medium">{interview.duration}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Target className="w-5 h-5 mr-3 text-purple-500" />
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(interview.difficulty)}`}>
                              {interview.difficulty}
                            </span>
                          </div>
                        </div>
                        
                        <motion.button 
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`w-full px-6 py-3 rounded-xl transition-all font-semibold text-lg ${
                            interview.completed
                              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-emerald-600 hover:to-green-600 shadow-lg'
                          }`}
                        >
                          {interview.completed ? 'Review Session' : 'Start Interview'}
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedCategory === 'tips' && (
            <div className="space-y-8">
              {tips.map((section, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative overflow-hidden rounded-3xl shadow-2xl"
                >
                  <div 
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: `url('${section.image}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                  <div className="relative bg-white/90 backdrop-blur-xl p-10 border border-white/50">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                      <Award className="w-8 h-8 text-orange-500 mr-4" />
                      {section.category}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {section.items.map((tip, tipIndex) => (
                        <motion.div 
                          key={tipIndex} 
                          className="flex items-start space-x-4 p-6 bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-xl transition-all group"
                          whileHover={{ scale: 1.02, x: 5 }}
                        >
                          <motion.div
                            whileHover={{ scale: 1.2, rotate: 10 }}
                            className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg"
                          >
                            <CheckCircle className="w-5 h-5 text-white" />
                          </motion.div>
                          <span className="text-gray-800 font-medium text-lg group-hover:text-gray-900 transition-colors">{tip}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Enhanced AI Coach CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-20 relative overflow-hidden rounded-3xl"
        >
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=600&fit=crop&crop=center')`,
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
              <Award className="w-16 h-16 mx-auto mb-6 text-yellow-300" />
            </motion.div>
            <h2 className="text-5xl font-bold mb-6 drop-shadow-2xl">Ready for Your Dream Job?</h2>
            <p className="text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
              Get personalized feedback and improve your interview skills with our advanced AI coach.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-10 py-5 rounded-2xl text-xl font-bold hover:bg-blue-50 transition-colors shadow-2xl"
            >
              Start AI Coaching Session
            </motion.button>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Interview;
