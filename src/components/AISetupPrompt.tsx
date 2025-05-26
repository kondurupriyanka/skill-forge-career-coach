
import React from 'react';
import { Brain, Key, Database } from 'lucide-react';
import { motion } from 'framer-motion';

const AISetupPrompt = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-8 rounded-2xl shadow-xl"
    >
      <div className="flex items-center mb-6">
        <Brain className="w-10 h-10 mr-4" />
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
