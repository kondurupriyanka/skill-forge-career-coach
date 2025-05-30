
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, CheckCircle, AlertCircle, Brain, Loader2, Lightbulb, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ParsedResumeData {
  name: string;
  email: string;
  phone?: string;
  skills: string[];
  education: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
  experience: Array<{
    title: string;
    company: string;
    duration: string;
    description: string;
  }>;
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
  }>;
  suggestions?: string[];
}

const EnhancedResumeUpload = ({ userProfile, setUserProfile }) => {
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'parsing' | 'success' | 'error'>('idle');
  const [parsedData, setParsedData] = useState<ParsedResumeData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [atsScore, setAtsScore] = useState<number | null>(null);
  const [aiProvider, setAiProvider] = useState<string>('');
  const { toast } = useToast();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setUploadStatus('uploading');
    setError(null);

    try {
      // Validate file type
      const allowedTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msword'
      ];

      if (!allowedTypes.includes(file.type)) {
        throw new Error('Please upload a PDF or Word document (.pdf, .doc, .docx)');
      }

      // Validate file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        throw new Error('File size must be less than 10MB');
      }

      console.log('Uploading file:', file.name, 'Type:', file.type, 'Size:', file.size);

      // Upload file to Supabase Storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      console.log('File uploaded successfully:', uploadData.path);
      setUploadStatus('parsing');

      // Get current user for associating the resume
      const { data: { user } } = await supabase.auth.getUser();
      const userId = user?.id || null;

      // Call our AI parsing edge function
      const { data: parseResult, error: parseError } = await supabase.functions
        .invoke('parse-resume', {
          body: { 
            filePath: uploadData.path,
            userId: userId
          }
        });

      if (parseError) {
        console.error('Parse error:', parseError);
        throw new Error(`Parsing failed: ${parseError.message}`);
      }

      if (!parseResult.success) {
        throw new Error(parseResult.error || 'Failed to parse resume');
      }

      const parsed = parseResult.parsedData as ParsedResumeData;
      setParsedData(parsed);
      setAtsScore(parseResult.atsScore || 0);
      setAiProvider(parseResult.aiProvider || 'ai');
      
      setUserProfile({
        ...parsed,
        resumeUrl: uploadData.path,
        atsScore: parseResult.atsScore || 0
      });
      
      setUploadStatus('success');

      toast({
        title: "Resume Analyzed Successfully!",
        description: `ATS Score: ${parseResult.atsScore || 0}/100 • Powered by ${parseResult.aiProvider === 'gemini' ? 'Google Gemini AI' : 'AI'}`,
      });

    } catch (err: any) {
      console.error('Resume processing error:', err);
      setError(err.message || 'Failed to process resume');
      setUploadStatus('error');
      
      toast({
        title: "Upload Failed",
        description: err.message || 'Failed to process resume',
        variant: "destructive",
      });
    }
  }, [setUserProfile, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/msword': ['.doc']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024 // 10MB
  });

  const resetUpload = () => {
    setUploadStatus('idle');
    setError(null);
    setParsedData(null);
    setAtsScore(null);
    setAiProvider('');
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4"
        >
          AI-Powered Resume Analysis
        </motion.h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Upload your resume and let our Google Gemini AI extract insights, match you with jobs, and create your personalized roadmap
        </p>
      </div>

      <AnimatePresence mode="wait">
        {uploadStatus === 'idle' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative"
          >
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 cursor-pointer ${
                isDragActive
                  ? 'border-blue-500 bg-blue-50 scale-105'
                  : 'border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50'
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="w-16 h-16 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {isDragActive ? 'Drop your resume here!' : 'Upload Your Resume'}
              </h3>
              <p className="text-gray-600 mb-4">
                Drag & drop your PDF or DOCX file, or click to browse
              </p>
              <div className="text-sm text-gray-500">
                Supported formats: PDF, DOC, DOCX • Max size: 10MB
              </div>
              <div className="mt-4 text-sm text-blue-600 font-medium">
                ✨ Powered by Google Gemini AI
              </div>
            </div>
          </motion.div>
        )}

        {(uploadStatus === 'uploading' || uploadStatus === 'parsing') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white p-12 rounded-xl shadow-lg border text-center"
          >
            <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {uploadStatus === 'uploading' ? 'Uploading Resume...' : 'Google Gemini AI is Analyzing Your Resume...'}
            </h3>
            <p className="text-gray-600">
              {uploadStatus === 'uploading' 
                ? 'Securely uploading your file...' 
                : 'Extracting skills, experience, and generating personalized suggestions...'}
            </p>
          </motion.div>
        )}

        {uploadStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 border border-red-200 p-6 rounded-xl"
          >
            <div className="flex items-center text-red-800 mb-2">
              <AlertCircle className="w-6 h-6 mr-3" />
              <h4 className="font-semibold">Upload Failed</h4>
            </div>
            <p className="text-red-700 mb-4">{error}</p>
            <button
              onClick={resetUpload}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </motion.div>
        )}

        {uploadStatus === 'success' && parsedData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-green-50 border border-green-200 p-4 rounded-lg flex items-center justify-between">
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
                <div>
                  <h4 className="font-semibold text-green-800">Analysis Complete!</h4>
                  <p className="text-green-700">Your resume has been successfully analyzed by Google Gemini AI.</p>
                </div>
              </div>
              {atsScore !== null && (
                <div className="bg-white px-4 py-2 rounded-lg">
                  <div className="text-sm text-gray-600">ATS Score</div>
                  <div className={`text-2xl font-bold ${
                    atsScore >= 80 ? 'text-green-600' : 
                    atsScore >= 60 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {atsScore}/100
                  </div>
                </div>
              )}
            </div>

            {/* AI Improvement Suggestions */}
            {parsedData.suggestions && parsedData.suggestions.length > 0 && (
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 p-6 rounded-xl">
                <div className="flex items-center mb-4">
                  <Lightbulb className="w-6 h-6 text-purple-600 mr-3" />
                  <h4 className="font-semibold text-purple-800">AI-Powered Improvement Suggestions</h4>
                  <TrendingUp className="w-5 h-5 text-purple-600 ml-2" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {parsedData.suggestions.map((suggestion, index) => (
                    <div key={index} className="bg-white p-3 rounded-lg border border-purple-100">
                      <p className="text-purple-700 text-sm">{suggestion}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white p-8 rounded-xl shadow-lg border">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Brain className="w-8 h-8 text-purple-600 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-900">AI-Extracted Profile</h3>
                </div>
                <div className="flex items-center space-x-4">
                  {aiProvider === 'gemini' && (
                    <span className="text-sm text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full">
                      Powered by Google Gemini
                    </span>
                  )}
                  <button
                    onClick={resetUpload}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Upload Another
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Personal Information</h4>
                  <div className="space-y-2">
                    <p><span className="font-medium">Name:</span> {parsedData.name}</p>
                    <p><span className="font-medium">Email:</span> {parsedData.email}</p>
                    {parsedData.phone && <p><span className="font-medium">Phone:</span> {parsedData.phone}</p>}
                  </div>

                  <h4 className="font-semibold text-gray-900 mb-3 mt-6">Skills Detected</h4>
                  <div className="flex flex-wrap gap-2">
                    {parsedData.skills.map((skill, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Education</h4>
                  <div className="space-y-2">
                    {parsedData.education.map((edu, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <p className="font-medium">{edu.degree}</p>
                        <p className="text-sm text-gray-600">{edu.institution} • {edu.year}</p>
                      </div>
                    ))}
                  </div>

                  <h4 className="font-semibold text-gray-900 mb-3 mt-6">Experience</h4>
                  <div className="space-y-2">
                    {parsedData.experience.slice(0, 3).map((exp, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <p className="font-medium">{exp.title}</p>
                        <p className="text-sm text-gray-600">{exp.company} • {exp.duration}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {parsedData.projects.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Projects</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {parsedData.projects.slice(0, 4).map((project, index) => (
                      <div key={index} className="p-3 bg-gray-50 rounded-lg">
                        <p className="font-medium">{project.name}</p>
                        <p className="text-sm text-gray-600 mb-2">{project.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.map((tech, techIndex) => (
                            <span key={techIndex} className="bg-purple-100 text-purple-700 px-2 py-1 rounded text-xs">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedResumeUpload;
