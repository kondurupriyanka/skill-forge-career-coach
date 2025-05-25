
import React, { useState } from 'react';
import { CheckCircle, Circle, Clock, BookOpen, Award, Target } from 'lucide-react';

const LearningRoadmap = ({ userProfile }) => {
  const [activePhase, setActivePhase] = useState(0);

  const roadmapData = {
    targetRole: 'Full Stack Developer',
    duration: '6 months',
    phases: [
      {
        title: 'Phase 1: Frontend Mastery',
        duration: '8 weeks',
        status: 'in-progress',
        progress: 60,
        skills: ['Advanced React', 'TypeScript', 'State Management'],
        milestones: [
          { title: 'Complete React Advanced Course', completed: true, duration: '2 weeks' },
          { title: 'Build 3 React Projects', completed: true, duration: '3 weeks' },
          { title: 'Learn TypeScript', completed: false, duration: '2 weeks' },
          { title: 'Master Redux/Context API', completed: false, duration: '1 week' }
        ]
      },
      {
        title: 'Phase 2: Backend Development',
        duration: '10 weeks',
        status: 'upcoming',
        progress: 0,
        skills: ['Node.js', 'Express.js', 'Database Design', 'API Development'],
        milestones: [
          { title: 'Node.js Fundamentals', completed: false, duration: '3 weeks' },
          { title: 'Express.js & API Development', completed: false, duration: '3 weeks' },
          { title: 'Database Design (MongoDB/PostgreSQL)', completed: false, duration: '2 weeks' },
          { title: 'Build Full Stack Applications', completed: false, duration: '2 weeks' }
        ]
      },
      {
        title: 'Phase 3: Cloud & DevOps',
        duration: '6 weeks',
        status: 'upcoming',
        progress: 0,
        skills: ['AWS/Azure', 'Docker', 'CI/CD', 'Deployment'],
        milestones: [
          { title: 'AWS Cloud Practitioner', completed: false, duration: '3 weeks' },
          { title: 'Docker & Containerization', completed: false, duration: '2 weeks' },
          { title: 'CI/CD Pipeline Setup', completed: false, duration: '1 week' }
        ]
      },
      {
        title: 'Phase 4: Portfolio & Job Prep',
        duration: '4 weeks',
        status: 'upcoming',
        progress: 0,
        skills: ['Portfolio Development', 'Interview Prep', 'System Design'],
        milestones: [
          { title: 'Build Professional Portfolio', completed: false, duration: '2 weeks' },
          { title: 'System Design Preparation', completed: false, duration: '1 week' },
          { title: 'Mock Interviews & Practice', completed: false, duration: '1 week' }
        ]
      }
    ]
  };

  const getPhaseColor = (status, progress) => {
    if (status === 'completed') return 'bg-green-500';
    if (status === 'in-progress') return 'bg-blue-500';
    return 'bg-gray-300';
  };

  if (!userProfile) {
    return (
      <div className="text-center py-12">
        <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No Profile Data</h3>
        <p className="text-gray-500">Please upload your resume first to see your learning roadmap</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Learning Roadmap</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Personalized learning path to achieve your career goals as a {roadmapData.targetRole}
        </p>
      </div>

      {/* Roadmap Overview */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <Target className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Target Role</h3>
            <p className="text-blue-100">{roadmapData.targetRole}</p>
          </div>
          <div className="text-center">
            <Clock className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Duration</h3>
            <p className="text-blue-100">{roadmapData.duration}</p>
          </div>
          <div className="text-center">
            <Award className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Progress</h3>
            <p className="text-blue-100">15% Complete</p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>
        
        <div className="space-y-8">
          {roadmapData.phases.map((phase, index) => (
            <div key={index} className="relative">
              <div 
                className={`absolute left-6 w-4 h-4 rounded-full border-4 border-white ${getPhaseColor(phase.status, phase.progress)}`}
              ></div>
              
              <div className="ml-16">
                <div 
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setActivePhase(activePhase === index ? -1 : index)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{phase.title}</h3>
                      <p className="text-gray-600">Duration: {phase.duration}</p>
                    </div>
                    <div className="text-right">
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        phase.status === 'completed' ? 'bg-green-100 text-green-800' :
                        phase.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {phase.status === 'completed' ? 'Completed' :
                         phase.status === 'in-progress' ? 'In Progress' : 'Upcoming'}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{phase.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          phase.status === 'completed' ? 'bg-green-500' :
                          phase.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-300'
                        }`}
                        style={{ width: `${phase.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Skills to Learn:</h4>
                    <div className="flex flex-wrap gap-2">
                      {phase.skills.map((skill, skillIndex) => (
                        <span key={skillIndex} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {activePhase === index && (
                    <div className="border-t pt-4">
                      <h4 className="font-medium text-gray-900 mb-4">Milestones:</h4>
                      <div className="space-y-3">
                        {phase.milestones.map((milestone, milestoneIndex) => (
                          <div key={milestoneIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center">
                              {milestone.completed ? (
                                <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                              ) : (
                                <Circle className="w-5 h-5 text-gray-400 mr-3" />
                              )}
                              <span className={milestone.completed ? 'text-gray-900 line-through' : 'text-gray-900'}>
                                {milestone.title}
                              </span>
                            </div>
                            <span className="text-sm text-gray-500">{milestone.duration}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Resources */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Recommended Learning Resources</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 border border-gray-200 rounded-lg">
            <BookOpen className="w-8 h-8 text-blue-600 mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">Online Courses</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• React Complete Guide (Udemy)</li>
              <li>• Node.js Bootcamp (Coursera)</li>
              <li>• AWS Cloud Practitioner (AWS)</li>
            </ul>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <Award className="w-8 h-8 text-green-600 mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">Certifications</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• AWS Cloud Practitioner</li>
              <li>• Google Cloud Associate</li>
              <li>• MongoDB Developer</li>
            </ul>
          </div>

          <div className="p-4 border border-gray-200 rounded-lg">
            <Target className="w-8 h-8 text-purple-600 mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">Practice Projects</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• E-commerce Website</li>
              <li>• Task Management App</li>
              <li>• Real-time Chat Application</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningRoadmap;
