
import React, { useState } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const ResumeChatbot = ({ resumeData }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: `Hi! I've analyzed your resume and I'm here to help you improve it. I can answer questions about your skills, suggest improvements, or help you tailor your resume for specific jobs. What would you like to know?`
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-career-coach', {
        body: {
          message: inputMessage,
          resumeData: resumeData,
          conversationType: 'resume_chat'
        }
      });

      if (error) throw error;

      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: data.response || 'I apologize, but I encountered an issue. Please try again.'
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        content: 'Sorry, I encountered an error. Please try again later.'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center mb-4">
        <Bot className="w-6 h-6 text-blue-600 mr-2" />
        <h3 className="text-xl font-semibold text-gray-900">Resume AI Assistant</h3>
      </div>

      <div className="h-96 overflow-y-auto mb-4 border border-gray-200 rounded-lg p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.type === 'bot' && <Bot className="w-4 h-4 mt-1 flex-shrink-0" />}
                {message.type === 'user' && <User className="w-4 h-4 mt-1 flex-shrink-0" />}
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-900 max-w-xs lg:max-w-md px-4 py-2 rounded-lg">
              <div className="flex items-center space-x-2">
                <Bot className="w-4 h-4" />
                <Loader2 className="w-4 h-4 animate-spin" />
                <p className="text-sm">AI is thinking...</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex space-x-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me about your resume, skills, or career advice..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={isLoading}
        />
        <button
          onClick={handleSendMessage}
          disabled={!inputMessage.trim() || isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        <p>Try asking: "How can I improve my resume?", "What skills should I add?", or "Tailor my resume for a software engineer role"</p>
      </div>
    </div>
  );
};

export default ResumeChatbot;
