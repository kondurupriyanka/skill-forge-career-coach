
import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, MessageCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import ResumeChatbot from './ResumeChatbot';

const ResumeUpload = ({ setUserProfile }) => {
  const [uploadStatus, setUploadStatus] = useState('idle'); // idle, uploading, success, error
  const [analysisResult, setAnalysisResult] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
  const [showChatbot, setShowChatbot] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'];
    if (!allowedTypes.includes(file.type)) {
      setError('Please upload a PDF, DOC, or DOCX file');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setError('');
    setSelectedFile(file);
    setUploadStatus('uploading');

    try {
      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `resumes/${fileName}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Parse resume using Gemini AI
      const { data: parseData, error: parseError } = await supabase.functions.invoke('parse-resume', {
        body: {
          filePath: uploadData.path,
          userId: 'user-' + Date.now()
        }
      });

      if (parseError) throw parseError;

      if (parseData.success) {
        setAnalysisResult(parseData.parsedData);
        setUserProfile(parseData.parsedData);
        setUploadStatus('success');
      } else {
        throw new Error(parseData.error || 'Failed to parse resume');
      }

    } catch (error) {
      console.error('Resume upload error:', error);
      setError(error.message || 'Failed to upload and analyze resume');
      setUploadStatus('error');
    }
  };

  const handleManualEntry = () => {
    // For demo, we'll use sample data
    const sampleProfile = {
      name: 'Rahul Kumar',
      email: 'rahul.kumar@email.com',
      phone: '+91 9876543210',
      education: [{ degree: 'B.Tech Electronics', institution: 'PQR University', year: '2024' }],
      skills: ['C++', 'Python', 'MATLAB', 'Circuit Design', 'Arduino'],
      experience: [
        { title: 'Electronics Intern', company: 'Tech Solutions', duration: '3 months', description: 'Worked on embedded systems' }
      ],
      projects: [
        { name: 'Smart Home System', description: 'IoT-based home automation', technologies: ['Arduino', 'Python'] }
      ],
      suggestions: [
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
        <h2 className="text-3xl font-bold text-gray-900 mb-4">AI Resume Parser</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Upload your resume for AI-powered analysis and get instant feedback to improve your profile
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-lg flex items-center">
          <AlertCircle className="w-5 h-5 text-red-600 mr-3" />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {uploadStatus === 'idle' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* File Upload */}
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <div className="text-center">
              <Upload className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload Resume</h3>
              <p className="text-gray-600 mb-6">Upload your resume for AI-powered analysis</p>
              
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
              <p className="text-gray-600 mb-6">Use sample data for quick testing</p>
              
              <button
                onClick={handleManualEntry}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Use Sample Data
              </button>
              
              <p className="text-sm text-gray-500 mt-4">
                Quick way to test the platform features
              </p>
            </div>
          </div>
        </div>
      )}

      {uploadStatus === 'uploading' && (
        <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-200 text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Analyzing Your Resume</h3>
          <p className="text-gray-600">Our AI is extracting insights and generating improvement suggestions...</p>
        </div>
      )}

      {uploadStatus === 'success' && analysisResult && (
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg flex items-center justify-between">
            <div className="flex items-center">
              <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
              <div>
                <h4 className="font-semibold text-green-800">Analysis Complete!</h4>
                <p className="text-green-700">Your resume has been successfully analyzed by AI.</p>
              </div>
            </div>
            <button
              onClick={() => setShowChatbot(!showChatbot)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              {showChatbot ? 'Hide' : 'Chat'} with AI
            </button>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">AI Analysis Results</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Profile Information</h4>
                <div className="space-y-2">
                  <p><span className="font-medium">Name:</span> {analysisResult.name}</p>
                  <p><span className="font-medium">Email:</span> {analysisResult.email}</p>
                  {analysisResult.phone && <p><span className="font-medium">Phone:</span> {analysisResult.phone}</p>}
                </div>

                <h4 className="font-semibold text-gray-900 mb-3 mt-6">Skills Identified</h4>
                <div className="flex flex-wrap gap-2">
                  {analysisResult.skills?.map((skill, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Education</h4>
                <div className="space-y-2">
                  {analysisResult.education?.map((edu, index) => (
                    <div key={index} className="text-gray-700">
                      <p className="font-medium">{edu.degree}</p>
                      <p className="text-sm">{edu.institution} {edu.year && `(${edu.year})`}</p>
                    </div>
                  ))}
                </div>

                <h4 className="font-semibold text-gray-900 mb-3 mt-6">Experience</h4>
                <div className="space-y-2">
                  {analysisResult.experience?.map((exp, index) => (
                    <div key={index} className="text-gray-700">
                      <p className="font-medium">{exp.title}</p>
                      <p className="text-sm">{exp.company} • {exp.duration}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {analysisResult.suggestions && analysisResult.suggestions.length > 0 && (
              <div className="mt-8 p-6 bg-orange-50 border border-orange-200 rounded-lg">
                <h4 className="font-semibold text-orange-800 mb-3 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  AI Improvement Suggestions
                </h4>
                <ul className="space-y-2">
                  {analysisResult.suggestions.map((suggestion, index) => (
                    <li key={index} className="text-orange-700">• {suggestion}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {showChatbot && (
            <ResumeChatbot resumeData={analysisResult} />
          )}
        </div>
      )}

      {uploadStatus === 'error' && (
        <div className="bg-red-50 border border-red-200 p-6 rounded-lg text-center">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-red-800 mb-2">Upload Failed</h3>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={() => {
              setUploadStatus('idle');
              setError('');
            }}
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default ResumeUpload;
