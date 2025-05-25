
import React from 'react';
import { Upload, Target, BookOpen, Users, TrendingUp, Award } from 'lucide-react';

const WelcomeSection = () => {
  const features = [
    {
      icon: Upload,
      title: 'Resume Analysis',
      description: 'Upload your resume and get AI-powered insights on your skills and experience',
      color: 'bg-blue-500'
    },
    {
      icon: Target,
      title: 'Job Matching',
      description: 'Find opportunities that match your profile and career goals',
      color: 'bg-green-500'
    },
    {
      icon: BookOpen,
      title: 'Learning Roadmap',
      description: 'Get personalized learning paths to bridge skill gaps',
      color: 'bg-purple-500'
    },
    {
      icon: Users,
      title: 'Interview Prep',
      description: 'Practice with AI-generated questions tailored to your target roles',
      color: 'bg-orange-500'
    },
    {
      icon: TrendingUp,
      title: 'Progress Tracking',
      description: 'Monitor your growth and achievements over time',
      color: 'bg-indigo-500'
    },
    {
      icon: Award,
      title: 'Skill Assessment',
      description: 'Identify your strengths and areas for improvement',
      color: 'bg-pink-500'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-xl text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to Your AI Career Journey
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
          Empowering students from Tier-2 & Tier-3 institutions to achieve their career dreams with AI-powered guidance
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Upload Your Resume
          </button>
          <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
            Explore Features
          </button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className={`${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
              <feature.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Statistics */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
        <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
          Helping Students Succeed
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600 mb-2">10,000+</div>
            <div className="text-gray-600">Students Helped</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
            <div className="text-gray-600">Job Match Accuracy</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
            <div className="text-gray-600">Partner Companies</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-orange-600 mb-2">85%</div>
            <div className="text-gray-600">Placement Success</div>
          </div>
        </div>
      </div>

      {/* Quick Start Guide */}
      <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Get Started in 3 Simple Steps</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
            <h4 className="font-semibold text-gray-900 mb-2">Upload Resume</h4>
            <p className="text-gray-600">Share your resume or enter your details manually</p>
          </div>
          <div className="text-center">
            <div className="bg-green-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
            <h4 className="font-semibold text-gray-900 mb-2">Get Analysis</h4>
            <p className="text-gray-600">Receive AI-powered insights on your profile</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
            <h4 className="font-semibold text-gray-900 mb-2">Follow Roadmap</h4>
            <p className="text-gray-600">Execute your personalized career plan</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
