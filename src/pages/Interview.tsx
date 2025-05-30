
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, BookOpen, Target, Award, Clock, CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Interview = () => {
  const [selectedCategory, setSelectedCategory] = useState('technical');

  const categories = [
    { id: 'technical', name: 'Technical Questions', icon: Target },
    { id: 'behavioral', name: 'Behavioral Questions', icon: BookOpen },
    { id: 'mock', name: 'Mock Interviews', icon: Play },
    { id: 'tips', name: 'Interview Tips', icon: Award }
  ];

  const practiceQuestions = {
    technical: [
      'Explain the difference between let, const, and var in JavaScript.',
      'How would you optimize a React application for performance?',
      'Describe the concept of closure in JavaScript with an example.',
      'What is the virtual DOM and how does it work?'
    ],
    behavioral: [
      'Tell me about a time when you had to work with a difficult team member.',
      'Describe a challenging project you worked on and how you overcame obstacles.',
      'How do you handle tight deadlines and pressure?',
      'Give an example of when you had to learn a new technology quickly.'
    ]
  };

  const mockInterviews = [
    {
      id: 1,
      title: 'Frontend Developer Interview',
      duration: '45 minutes',
      difficulty: 'Intermediate',
      completed: true
    },
    {
      id: 2,
      title: 'System Design Interview',
      duration: '60 minutes',
      difficulty: 'Advanced',
      completed: false
    },
    {
      id: 3,
      title: 'Behavioral Interview',
      duration: '30 minutes',
      difficulty: 'Beginner',
      completed: true
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
      ]
    },
    {
      category: 'During the Interview',
      items: [
        'Arrive 10-15 minutes early',
        'Maintain good eye contact and body language',
        'Listen carefully and ask clarifying questions',
        'Be specific and provide concrete examples'
      ]
    },
    {
      category: 'After the Interview',
      items: [
        'Send a thank-you email within 24 hours',
        'Reflect on your performance and areas for improvement',
        'Follow up appropriately if you don\'t hear back',
        'Continue practicing for future opportunities'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            AI Interview Preparation
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Master your interviews with personalized practice sessions and AI-powered feedback.
          </p>
        </motion.div>

        {/* Category Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-4 rounded-lg text-center transition-all ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <IconComponent className="w-6 h-6 mx-auto mb-2" />
                  <span className="text-sm font-medium">{category.name}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Content based on selected category */}
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          {selectedCategory === 'technical' && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Technical Practice Questions</h2>
              <div className="space-y-4">
                {practiceQuestions.technical.map((question, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <p className="text-gray-800 flex-1">{question}</p>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors ml-4">
                        Practice
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedCategory === 'behavioral' && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Behavioral Practice Questions</h2>
              <div className="space-y-4">
                {practiceQuestions.behavioral.map((question, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start">
                      <p className="text-gray-800 flex-1">{question}</p>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors ml-4">
                        Practice
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedCategory === 'mock' && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Mock Interview Sessions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockInterviews.map((interview) => (
                  <div key={interview.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">{interview.title}</h3>
                      {interview.completed && <CheckCircle className="w-6 h-6 text-green-600" />}
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-2" />
                        {interview.duration}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Target className="w-4 h-4 mr-2" />
                        {interview.difficulty}
                      </div>
                    </div>
                    
                    <button className={`w-full px-4 py-2 rounded-lg transition-colors ${
                      interview.completed
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}>
                      {interview.completed ? 'Review Session' : 'Start Interview'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedCategory === 'tips' && (
            <div className="space-y-6">
              {tips.map((section, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">{section.category}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {section.items.map((tip, tipIndex) => (
                      <div key={tipIndex} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-800">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* AI Coach CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl"
        >
          <Award className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Ready for Your Dream Job?</h2>
          <p className="text-blue-100 mb-6">
            Get personalized feedback and improve your interview skills with our AI coach.
          </p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
            Start AI Coaching
          </button>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Interview;
