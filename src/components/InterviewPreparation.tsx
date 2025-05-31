
import React, { useState, useEffect } from 'react';
import { Play, Mic, MicOff, RotateCcw, Award, TrendingUp, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const InterviewPreparation = ({ userProfile }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionProgress, setSessionProgress] = useState({
    questionsAnswered: 0,
    totalQuestions: 5,
    averageScore: 0,
    completedSessions: 0
  });
  const [targetRole, setTargetRole] = useState('');
  const [interviewType, setInterviewType] = useState('technical');

  const interviewTypes = [
    { id: 'technical', label: 'Technical Interview', description: 'Focus on technical skills and problem-solving' },
    { id: 'behavioral', label: 'Behavioral Interview', description: 'Assess soft skills and cultural fit' },
    { id: 'general', label: 'General Interview', description: 'Mix of technical and behavioral questions' }
  ];

  const generateQuestion = async () => {
    if (!userProfile || !targetRole) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-career-coach', {
        body: {
          message: `Generate a ${interviewType} interview question for a ${targetRole} position`,
          userProfile: userProfile,
          conversationType: 'interview_question',
          interviewType,
          targetRole
        }
      });

      if (error) throw error;

      setCurrentQuestion({
        id: Date.now(),
        question: data.question,
        difficulty: data.difficulty || 'medium',
        expectedAnswer: data.expectedAnswer || '',
        tips: data.tips || []
      });
    } catch (error) {
      console.error('Error generating question:', error);
      setCurrentQuestion({
        id: Date.now(),
        question: `Tell me about a challenging ${interviewType === 'technical' ? 'technical problem' : 'situation'} you've faced and how you solved it.`,
        difficulty: 'medium',
        expectedAnswer: '',
        tips: []
      });
    } finally {
      setIsLoading(false);
    }
  };

  const evaluateAnswer = async () => {
    if (!userAnswer.trim() || !currentQuestion) return;

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-career-coach', {
        body: {
          question: currentQuestion.question,
          answer: userAnswer,
          targetRole,
          interviewType,
          conversationType: 'interview_evaluation'
        }
      });

      if (error) throw error;

      setFeedback({
        score: data.score || 75,
        strengths: data.strengths || ['Good structure'],
        improvements: data.improvements || ['Add more specific examples'],
        suggestions: data.suggestions || ['Practice more technical examples']
      });

      // Update progress
      setSessionProgress(prev => ({
        ...prev,
        questionsAnswered: prev.questionsAnswered + 1,
        averageScore: Math.round((prev.averageScore * prev.questionsAnswered + (data.score || 75)) / (prev.questionsAnswered + 1))
      }));

    } catch (error) {
      console.error('Error evaluating answer:', error);
      setFeedback({
        score: 70,
        strengths: ['Clear communication'],
        improvements: ['Add more specific details'],
        suggestions: ['Practice with real examples']
      });
    } finally {
      setIsLoading(false);
    }
  };

  const startNewQuestion = () => {
    setCurrentQuestion(null);
    setUserAnswer('');
    setFeedback(null);
    generateQuestion();
  };

  if (!userProfile) {
    return (
      <div className="text-center py-12">
        <Mic className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No Profile Data</h3>
        <p className="text-gray-500">Please upload your resume first to start interview preparation</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">AI Interview Preparation</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Practice with AI-generated questions tailored to your target role and get instant feedback
        </p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-blue-500 text-white p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100">Questions Answered</p>
              <p className="text-2xl font-bold">{sessionProgress.questionsAnswered}</p>
            </div>
            <CheckCircle className="w-8 h-8" />
          </div>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100">Average Score</p>
              <p className="text-2xl font-bold">{sessionProgress.averageScore}%</p>
            </div>
            <Award className="w-8 h-8" />
          </div>
        </div>
        <div className="bg-purple-500 text-white p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100">Progress</p>
              <p className="text-2xl font-bold">{Math.round((sessionProgress.questionsAnswered / sessionProgress.totalQuestions) * 100)}%</p>
            </div>
            <TrendingUp className="w-8 h-8" />
          </div>
        </div>
        <div className="bg-orange-500 text-white p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100">Sessions</p>
              <p className="text-2xl font-bold">{sessionProgress.completedSessions}</p>
            </div>
            <Play className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Configuration */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Interview Setup</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Target Role</label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="e.g., Frontend Developer, Data Scientist"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Interview Type</label>
            <select
              value={interviewType}
              onChange={(e) => setInterviewType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {interviewTypes.map(type => (
                <option key={type.id} value={type.id}>{type.label}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-4">
          <button
            onClick={generateQuestion}
            disabled={!targetRole || isLoading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center"
          >
            <Play className="w-4 h-4 mr-2" />
            {isLoading ? 'Generating...' : 'Start Interview Practice'}
          </button>
        </div>
      </div>

      {/* Question Section */}
      {currentQuestion && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Interview Question</h3>
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                currentQuestion.difficulty === 'hard' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {currentQuestion.difficulty} level
              </span>
            </div>
            <button
              onClick={startNewQuestion}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-gray-900 text-lg">{currentQuestion.question}</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Answer</label>
              <textarea
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your answer here... Be specific and provide examples."
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={evaluateAnswer}
                disabled={!userAnswer.trim() || isLoading}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
              >
                {isLoading ? 'Analyzing...' : 'Get AI Feedback'}
              </button>
              <button
                onClick={() => setIsRecording(!isRecording)}
                className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
                  isRecording ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {isRecording ? <MicOff className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
                {isRecording ? 'Stop Recording' : 'Voice Answer'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Section */}
      {feedback && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Feedback</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-3 ${
                feedback.score >= 80 ? 'bg-green-100 text-green-600' :
                feedback.score >= 60 ? 'bg-yellow-100 text-yellow-600' :
                'bg-red-100 text-red-600'
              }`}>
                <span className="text-2xl font-bold">{feedback.score}</span>
              </div>
              <p className="font-medium">Overall Score</p>
            </div>
            
            <div>
              <h4 className="font-medium text-green-800 mb-2">Strengths</h4>
              <ul className="space-y-1">
                {feedback.strengths.map((strength, index) => (
                  <li key={index} className="text-green-700 text-sm">• {strength}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-orange-800 mb-2">Areas to Improve</h4>
              <ul className="space-y-1">
                {feedback.improvements.map((improvement, index) => (
                  <li key={index} className="text-orange-700 text-sm">• {improvement}</li>
                ))}
              </ul>
            </div>
          </div>
          
          {feedback.suggestions && feedback.suggestions.length > 0 && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">AI Suggestions</h4>
              <ul className="space-y-1">
                {feedback.suggestions.map((suggestion, index) => (
                  <li key={index} className="text-blue-700 text-sm">• {suggestion}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="mt-6 text-center">
            <button
              onClick={startNewQuestion}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Next Question
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewPreparation;
