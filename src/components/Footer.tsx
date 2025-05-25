
import React from 'react';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">AI Career Navigator</h3>
            <p className="text-gray-300 mb-6 max-w-md">
              Empowering students from Tier-2 and Tier-3 institutions to achieve their career dreams 
              through AI-powered guidance and personalized learning paths.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Mail className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Phone className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <MapPin className="w-6 h-6" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Features</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Resume Analysis</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Job Matching</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Skill Assessment</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Learning Roadmap</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Interview Prep</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            Made with <Heart className="w-4 h-4 text-red-500 inline mx-1" /> for students everywhere
          </p>
          <p className="text-gray-400 text-sm mt-2">
            © 2024 AI Career Navigator. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
