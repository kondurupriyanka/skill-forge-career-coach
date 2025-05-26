
import React, { useState, useEffect } from 'react';
import { Brain, Key, Database, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';

const AISetupPrompt = () => {
  const [apiKeyStatus, setApiKeyStatus] = useState('checking');

  useEffect(() => {
    checkAPIKeyStatus();
  }, []);

  const checkAPIKeyStatus = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('check-openai-status');
      if (data?.hasApiKey) {
        setApiKeyStatus('connected');
      } else {
        setApiKeyStatus('missing');
      }
    } catch (error) {
      setApiKeyStatus('missing');
    }
  };

  if (apiKeyStatus === 'connected') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-8 rounded-2xl shadow-xl"
      >
        <div className="flex items-center mb-6">
          <CheckCircle className="w-10 h-10 mr-4" />
          <h3 className="text-2xl font-bold">AI Features Fully Activated!</h3>
        </div>
        
        <p className="text-green-100 mb-6">
          Your AI-powered career navigator is ready! Experience real-time resume analysis, 
          intelligent job matching, and personalized career guidance.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
            <Brain className="w-8 h-8 mb-2" />
            <h4 className="font-semibold mb-1">AI Career Coach</h4>
            <p className="text-sm text-green-100">Real-time career guidance and advice</p>
          </div>
          <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
            <Key className="w-8 h-8 mb-2" />
            <h4 className="font-semibold mb-1">Smart Resume Parser</h4>
            <p className="text-sm text-green-100">Advanced AI resume analysis</p>
          </div>
          <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
            <Database className="w-8 h-8 mb-2" />
            <h4 className="font-semibold mb-1">Live Job Matching</h4>
            <p className="text-sm text-green-100">Real-time job recommendations</p>
          </div>
        </div>

        <div className="text-sm text-green-100">
          <p>✅ OpenAI API connected and active</p>
          <p>✅ Supabase database connected</p>
          <p>✅ Real-time features enabled</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-8 rounded-2xl shadow-xl"
    >
      <div className="flex items-center mb-6">
        <AlertCircle className="w-10 h-10 mr-4" />
        <h3 className="text-2xl font-bold">AI Features Setup Required</h3>
      </div>
      
      <p className="text-purple-100 mb-6">
        To enable AI-powered resume parsing, skill gap analysis, and job matching, 
        we need to configure your OpenAI API key.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
          <Key className="w-8 h-8 mb-2" />
          <h4 className="font-semibold mb-1">OpenAI Integration</h4>
          <p className="text-sm text-purple-100">For resume parsing and AI analysis</p>
        </div>
        <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
          <Database className="w-8 h-8 mb-2" />
          <h4 className="font-semibold mb-1">Supabase Storage</h4>
          <p className="text-sm text-purple-100">For secure file storage</p>
        </div>
        <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
          <Brain className="w-8 h-8 mb-2" />
          <h4 className="font-semibold mb-1">Real-time Analysis</h4>
          <p className="text-sm text-purple-100">Live job matching and recommendations</p>
        </div>
      </div>

      <div className="text-sm text-purple-100">
        <p>✅ Supabase database connected</p>
        <p>⚙️ OpenAI API key needed for AI features</p>
        <p>📁 Storage bucket will be created automatically</p>
      </div>
    </motion.div>
  );
};

export default AISetupPrompt;
