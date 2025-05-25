
import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';

const ResumeUpload = ({ setUserProfile }) => {
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, success, error
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploadStatus('uploading');

    // Simulate AI analysis
    setTimeout(() => {
      const mockAnalysis = {
        name: 'Priya Sharma',
        education: 'B.Tech Computer Science - ABC College (2024)',
        skills: ['JavaScript', 'React', 'Python', 'SQL', 'HTML/CSS'],
        experience: ['Internship at XYZ Tech (3 months)', 'College Projects (5+ projects)'],
        strengths: ['Strong technical foundation', 'Quick learner', 'Team collaboration'],
        recommendations: [
          'Add more backend technologies like Node.js',
          'Include cloud platform experience (AWS/Azure)',
          'Strengthen data structures and algorithms'
        ]
      };

      setAnalysisResult(mockAnalysis);
      setUserProfile(mockAnalysis);
      setUploadStatus('success');
    }, 2000);
  };

  const handleManualEntry = () => {
    // For demo, we'll use sample data
    const sampleProfile = {
      name: 'Rahul Kumar',
      education: 'B.Tech Electronics - PQR University (2024)',
      skills: ['C++', 'Python', 'MATLAB', 'Circuit Design', 'Arduino'],
      experience: ['Final Year Project', 'Robotics Club Lead', 'Hackathon Participant'],
      strengths: ['Problem solving', 'Hardware expertise', 'Leadership'],
      recommendations: [
        'Learn software development skills',
        'Explore IoT and embedded systems',
        'Develop full-stack web development skills'
      ]
    };

    setAnalysisResult(sampleProfile);
    setUserProfile(sampleProfile);
    setUploadStatus('success');
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Resume Analysis</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Upload your resume or enter your details manually to get AI-powered insights about your profile
        </p>
      </div>

      {uploadStatus === 'idle' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* File Upload */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <div className="text-center">
              <Upload className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload Resume</h3>
              <p className="text-gray-600 mb-6">Upload your resume in PDF or Word format</p>
              
              <label className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors cursor-pointer inline-block">
                Choose File
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              
              <p className="text-sm text-gray-500 mt-4">
                Supported formats: PDF, DOC, DOCX (Max 5MB)
              </p>
            </div>
          </div>

          {/* Manual Entry */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <div className="text-center">
              <FileText className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Manual Entry</h3>
              <p className="text-gray-600 mb-6">Enter your details manually for quick analysis</p>
              
              <button
                onClick={handleManualEntry}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Start Manual Entry
              </button>
              
              <p className="text-sm text-gray-500 mt-4">
                Fill out a simple form with your information
              </p>
            </div>
          </div>
        </div>
      )}

      {uploadStatus === 'uploading' && (
        <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-200 text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Analyzing Your Resume</h3>
          <p className="text-gray-600">Our AI is extracting insights from your resume...</p>
        </div>
      )}

      {uploadStatus === 'success' && analysisResult && (
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg flex items-center">
            <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
            <div>
              <h4 className="font-semibold text-green-800">Analysis Complete!</h4>
              <p className="text-green-700">Your resume has been successfully analyzed.</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Profile Summary</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Basic Information</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Name:</span> {analysisResult.name}</p>
                  <p><span className="font-medium">Education:</span> {analysisResult.education}</p>
                </div>

                <h4 className="font-semibold text-gray-900 mb-3 mt-6">Skills Identified</h4>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.skills.map((skill, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Experience</h4>
                <ul className="space-y-1">
                  {analysisResult.experience.map((exp, index) => (
                    <li key={index} className="text-gray-700">• {exp}</li>
                  ))}
                </ul>

                <h4 className="font-semibold text-gray-900 mb-3 mt-6">Key Strengths</h4>
                <ul className="space-y-1">
                  {analysisResult.strengths.map((strength, index) => (
                    <li key={index} className="text-gray-700">• {strength}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 p-6 bg-orange-50 border border-orange-200 rounded-lg">
              <h4 className="font-semibold text-orange-800 mb-3 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                Recommendations for Improvement
              </h4>
              <ul className="space-y-2">
                {analysisResult.recommendations.map((rec, index) => (
                  <li key={index} className="text-orange-700">• {rec}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
