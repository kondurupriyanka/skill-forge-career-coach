
import React, { useState } from 'react';
import { PlayCircle, StopCircle, Mic, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';

const InterviewPrep = ({ userProfile }) => {
  const [selectedRole, setSelectedRole] = useState('frontend');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState(new Set());

  const interviewQuestions = {
    frontend: [
      {
        question: "What is the difference between React functional and class components?",
        category: "Technical",
        difficulty: "Medium",
        hints: ["Think about state management", "Consider lifecycle methods", "Modern React practices"]
      },
      {
        question: "How do you optimize the performance of a React application?",
        category: "Technical",
        difficulty: "Hard",
        hints: ["Code splitting", "Memoization", "Virtual DOM", "Bundle optimization"]
      },
      {
        question: "Tell me about a challenging project you worked on during college.",
        category: "Behavioral",
        difficulty: "Medium",
        hints: ["STAR method", "Specific examples", "What you learned"]
      },
      {
        question: "How would you implement state management in a large React application?",
        category: "Technical",
        difficulty: "Hard",
        hints: ["Redux vs Context", "State structure", "Performance considerations"]
      },
      {
        question: "Why do you want to work as a Frontend Developer?",
        category: "Behavioral",
        difficulty: "Easy",
        hints: ["Personal motivation", "Career goals", "What excites you"]
      }
    ],
    backend: [
      {
        question: "Explain the difference between SQL and NoSQL databases.",
        category: "Technical",
        difficulty: "Medium",
        hints: ["ACID properties", "Scalability", "Use cases"]
      },
      {
        question: "How would you design a RESTful API for a social media platform?",
        category: "System Design",
        difficulty: "Hard",
        hints: ["REST principles", "Resource naming", "HTTP methods"]
      },
      {
        question: "What is your experience with version control systems?",
        category: "Technical",
        difficulty: "Easy",
        hints: ["Git workflows", "Collaboration", "Best practices"]
      }
    ],
    fullstack: [
      {
        question: "How would you handle authentication in a full-stack application?",
        category: "Technical",
        difficulty: "Hard",
        hints: ["JWT vs Sessions", "Security considerations", "Frontend and backend"]
      },
      {
        question: "Describe your approach to debugging a full-stack application.",
        category: "Technical",
        difficulty: "Medium",
        hints: ["Frontend debugging", "Backend logs", "Database queries"]
      }
    ]
  };

  const roles = [
    { id: 'frontend', name: 'Frontend Developer', questions: interviewQuestions.frontend.length },
    { id: 'backend', name: 'Backend Developer', questions: interviewQuestions.backend.length },
    { id: 'fullstack', name: 'Full Stack Developer', questions: interviewQuestions.fullstack.length }
  ];

  const currentQuestions = interviewQuestions[selectedRole] || [];
  const question = currentQuestions[currentQuestion];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Technical': return 'bg-blue-100 text-blue-800';
      case 'Behavioral': return 'bg-purple-100 text-purple-800';
      case 'System Design': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleNextQuestion = () => {
    setCompletedQuestions(prev => new Set([...prev, currentQuestion]));
    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  if (!userProfile) {
    return (
      <div className="text-center py-12">
        <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No Profile Data</h3>
        <p className="text-gray-500">Please upload your resume first to get personalized interview questions</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Interview Preparation</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Practice with AI-generated questions tailored to your target roles and skill level
        </p>
      </div>

      {/* Role Selection */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Select Interview Type</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => {
                setSelectedRole(role.id);
                setCurrentQuestion(0);
              }}
              className={`p-4 rounded-lg border-2 transition-colors ${
                selectedRole === role.id
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              }`}
            >
              <h4 className="font-semibold mb-2">{role.name}</h4>
              <p className="text-sm opacity-75">{role.questions} questions available</p>
            </button>
          ))}
        </div>
      </div>

      {/* Progress */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900">Progress</h3>
          <span className="text-sm text-gray-600">
            {completedQuestions.size} of {currentQuestions.length} completed
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(completedQuestions.size / currentQuestions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Current Question */}
      {question && (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-start mb-6">
            <div>
              <div className="flex items-center space-x-3 mb-3">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(question.category)}`}>
                  {question.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(question.difficulty)}`}>
                  {question.difficulty}
                </span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900">
                Question {currentQuestion + 1} of {currentQuestions.length}
              </h3>
            </div>
            {completedQuestions.has(currentQuestion) && (
              <CheckCircle className="w-8 h-8 text-green-600" />
            )}
          </div>

          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <p className="text-lg text-gray-800 leading-relaxed">{question.question}</p>
          </div>

          {/* Recording Controls */}
          <div className="flex justify-center space-x-4 mb-6">
            <button
              onClick={() => setIsRecording(!isRecording)}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                isRecording
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isRecording ? (
                <>
                  <StopCircle className="w-5 h-5 mr-2" />
                  Stop Recording
                </>
              ) : (
                <>
                  <PlayCircle className="w-5 h-5 mr-2" />
                  Start Recording
                </>
              )}
            </button>
            <button className="flex items-center px-6 py-3 rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
              <Mic className="w-5 h-5 mr-2" />
              Audio Only
            </button>
          </div>

          {isRecording && (
            <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-6 text-center">
              <div className="flex items-center justify-center text-red-600 mb-2">
                <div className="w-3 h-3 bg-red-600 rounded-full animate-pulse mr-2"></div>
                Recording in progress...
              </div>
              <p className="text-sm text-red-700">Take your time to answer the question thoughtfully</p>
            </div>
          )}

          {/* Hints */}
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
            <div className="flex items-center text-yellow-800 mb-2">
              <AlertCircle className="w-5 h-5 mr-2" />
              <h4 className="font-medium">Helpful Hints</h4>
            </div>
            <ul className="text-sm text-yellow-700 space-y-1">
              {question.hints.map((hint, index) => (
                <li key={index}>• {hint}</li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 0}
              className="px-6 py-2 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <button
              onClick={handleNextQuestion}
              className="px-6 py-2 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              {currentQuestion === currentQuestions.length - 1 ? 'Finish' : 'Next Question'}
            </button>
          </div>
        </div>
      )}

      {/* Interview Tips */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl border border-green-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Interview Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Before the Interview</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• Research the company and role thoroughly</li>
              <li>• Practice common technical questions</li>
              <li>• Prepare specific examples using STAR method</li>
              <li>• Test your video setup and internet connection</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">During the Interview</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• Speak clearly and at a moderate pace</li>
              <li>• Think out loud during technical problems</li>
              <li>• Ask clarifying questions when needed</li>
              <li>• Show enthusiasm and genuine interest</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPrep;
