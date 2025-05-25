
import React from 'react';
import { TrendingUp, Target, AlertTriangle, CheckCircle } from 'lucide-react';

const SkillsAnalysis = ({ userProfile }) => {
  const skillCategories = [
    {
      name: 'Technical Skills',
      skills: [
        { name: 'JavaScript', level: 80, demand: 95, gap: 15 },
        { name: 'React', level: 70, demand: 90, gap: 20 },
        { name: 'Python', level: 75, demand: 85, gap: 10 },
        { name: 'Node.js', level: 30, demand: 80, gap: 50 },
        { name: 'SQL', level: 60, demand: 75, gap: 15 },
        { name: 'AWS', level: 20, demand: 85, gap: 65 }
      ]
    },
    {
      name: 'Soft Skills',
      skills: [
        { name: 'Communication', level: 70, demand: 95, gap: 25 },
        { name: 'Teamwork', level: 85, demand: 90, gap: 5 },
        { name: 'Problem Solving', level: 80, demand: 95, gap: 15 },
        { name: 'Leadership', level: 60, demand: 80, gap: 20 }
      ]
    }
  ];

  const getSkillColor = (gap) => {
    if (gap <= 10) return 'text-green-600 bg-green-100';
    if (gap <= 30) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getSkillIcon = (gap) => {
    if (gap <= 10) return CheckCircle;
    if (gap <= 30) return Target;
    return AlertTriangle;
  };

  if (!userProfile) {
    return (
      <div className="text-center py-12">
        <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No Profile Data</h3>
        <p className="text-gray-500">Please upload your resume first to see skills analysis</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Skills Analysis</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Comprehensive analysis of your current skills compared to industry demands
        </p>
      </div>

      {/* Overall Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl">
          <TrendingUp className="w-10 h-10 mb-4" />
          <h3 className="text-2xl font-bold mb-2">78%</h3>
          <p className="text-blue-100">Overall Skill Score</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl">
          <CheckCircle className="w-10 h-10 mb-4" />
          <h3 className="text-2xl font-bold mb-2">6</h3>
          <p className="text-green-100">Strong Skills</p>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-xl">
          <Target className="w-10 h-10 mb-4" />
          <h3 className="text-2xl font-bold mb-2">4</h3>
          <p className="text-orange-100">Skills to Improve</p>
        </div>
      </div>

      {/* Skills Heatmap */}
      {skillCategories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">{category.name}</h3>
          
          <div className="space-y-6">
            {category.skills.map((skill, skillIndex) => {
              const SkillIcon = getSkillIcon(skill.gap);
              
              return (
                <div key={skillIndex} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <SkillIcon className={`w-5 h-5 ${getSkillColor(skill.gap).split(' ')[0]}`} />
                      <span className="font-semibold text-gray-900">{skill.name}</span>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getSkillColor(skill.gap)}`}>
                      {skill.gap <= 10 ? 'Strong' : skill.gap <= 30 ? 'Good' : 'Needs Work'}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Your Level</span>
                        <span className="font-medium">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Market Demand</span>
                        <span className="font-medium">{skill.demand}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${skill.demand}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Skill Gap</span>
                        <span className="font-medium">{skill.gap}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${
                            skill.gap <= 10 ? 'bg-green-500' : 
                            skill.gap <= 30 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${skill.gap}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Recommended Actions */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-8 rounded-xl border border-purple-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Recommended Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-purple-800">High Priority Skills</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-purple-700">
                <AlertTriangle className="w-4 h-4 mr-2 text-red-500" />
                Learn AWS cloud services (65% gap)
              </li>
              <li className="flex items-center text-purple-700">
                <AlertTriangle className="w-4 h-4 mr-2 text-red-500" />
                Improve Node.js backend skills (50% gap)
              </li>
              <li className="flex items-center text-purple-700">
                <Target className="w-4 h-4 mr-2 text-yellow-500" />
                Enhance communication skills (25% gap)
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-purple-800">Learning Suggestions</h4>
            <ul className="space-y-2">
              <li className="text-purple-700">• Complete AWS Cloud Practitioner certification</li>
              <li className="text-purple-700">• Build full-stack projects with Node.js</li>
              <li className="text-purple-700">• Join Toastmasters for communication skills</li>
              <li className="text-purple-700">• Practice technical presentations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsAnalysis;
