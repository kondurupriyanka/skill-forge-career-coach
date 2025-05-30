
import React from 'react';
import { User, Menu, X, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { href: '/', label: 'Dashboard', icon: '🏠' },
    { href: '/roadmap', label: 'Roadmap', icon: '🗺️' },
    { href: '/jobs', label: 'Jobs', icon: '💼' },
    { href: '/interview', label: 'Interview Prep', icon: '🎤' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white/95 backdrop-blur-lg shadow-lg border-b border-gradient-to-r from-violet-200 to-pink-200 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div 
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <div className="flex-shrink-0">
              <Link to="/" className="flex items-center space-x-2 text-2xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent hover:from-pink-600 hover:to-violet-600 transition-all duration-300">
                <Sparkles className="w-8 h-8 text-violet-600" />
                <span>AI Career Navigator</span>
              </Link>
            </div>
          </motion.div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <Link
                    to={item.href}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                      isActive(item.href)
                        ? 'text-white bg-gradient-to-r from-violet-500 to-purple-600 shadow-lg shadow-violet-500/25'
                        : 'text-gray-700 hover:text-violet-600 hover:bg-gradient-to-r hover:from-violet-50 hover:to-purple-50'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            className="hidden md:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center">
              <Link
                to="/profile"
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                  isActive('/profile')
                    ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-lg shadow-pink-500/25'
                    : 'bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-violet-500/25'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Profile</span>
              </Link>
            </div>
          </motion.div>

          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-violet-600 p-2 rounded-lg hover:bg-violet-50 transition-all duration-300"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/90 backdrop-blur-lg border-t rounded-b-xl">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 ${
                    isActive(item.href)
                      ? 'text-white bg-gradient-to-r from-violet-500 to-purple-600'
                      : 'text-gray-700 hover:text-violet-600 hover:bg-violet-50'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              ))}
              <Link
                to="/profile"
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium transition-all duration-300 ${
                  isActive('/profile')
                    ? 'text-white bg-gradient-to-r from-pink-500 to-rose-600'
                    : 'text-gray-700 hover:text-violet-600 hover:bg-violet-50'
                }`}
              >
                <User className="w-5 h-5" />
                <span>Profile</span>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
