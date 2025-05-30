
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, DollarSign, Clock, Briefcase, Filter, Star, Building, Users, Zap } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  const jobListings = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'TechCorp Inc.',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120k - $150k',
      matchScore: 95,
      skills: ['React', 'TypeScript', 'Node.js'],
      description: 'Join our innovative team building cutting-edge web applications with modern technologies...',
      postedDays: 2,
      companyImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop&crop=center'
    },
    {
      id: 2,
      title: 'Full Stack Engineer',
      company: 'StartupXYZ',
      location: 'Remote',
      type: 'Full-time',
      salary: '$90k - $130k',
      matchScore: 88,
      skills: ['JavaScript', 'Python', 'AWS'],
      description: 'Help us scale our platform to millions of users worldwide with cloud technologies...',
      postedDays: 1,
      companyImage: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=300&fit=crop&crop=center'
    },
    {
      id: 3,
      title: 'React Developer',
      company: 'Digital Solutions',
      location: 'New York, NY',
      type: 'Contract',
      salary: '$80 - $100/hr',
      matchScore: 82,
      skills: ['React', 'Redux', 'GraphQL'],
      description: 'Work on exciting client projects with modern technologies and collaborative teams...',
      postedDays: 3,
      companyImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop&crop=center'
    },
    {
      id: 4,
      title: 'UI/UX Developer',
      company: 'Design Studio',
      location: 'Los Angeles, CA',
      type: 'Full-time',
      salary: '$85k - $110k',
      matchScore: 76,
      skills: ['HTML/CSS', 'JavaScript', 'Figma'],
      description: 'Create beautiful and intuitive user experiences for global brands and startups...',
      postedDays: 5,
      companyImage: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=300&fit=crop&crop=center'
    }
  ];

  const getMatchColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100 border-green-200';
    if (score >= 80) return 'text-blue-600 bg-blue-100 border-blue-200';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100 border-yellow-200';
    return 'text-gray-600 bg-gray-100 border-gray-200';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      {/* Hero Section with Office/Work Environment */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&h=600&fit=crop&crop=center')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="relative bg-gradient-to-r from-blue-600/90 via-purple-600/80 to-pink-600/90 text-white py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-lg"
              >
                <Briefcase className="w-10 h-10 text-white" />
              </motion.div>
              <h1 className="text-6xl font-bold bg-gradient-to-r from-white via-yellow-200 to-white bg-clip-text text-transparent mb-6 drop-shadow-2xl">
                AI-Matched Jobs
              </h1>
              <p className="text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                Discover opportunities perfectly tailored to your skills and career goals with intelligent matching.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Enhanced Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative overflow-hidden rounded-3xl shadow-2xl mb-12"
        >
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200&h=400&fit=crop&crop=center')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <div className="relative bg-white/90 backdrop-blur-xl p-8 border border-white/50">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Find Your Perfect Match
              </h2>
              <p className="text-gray-600">Powered by AI to match you with the most relevant opportunities</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="relative md:col-span-2">
                <Search className="absolute left-4 top-4 w-6 h-6 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search jobs, companies, skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg transition-all"
                />
              </div>
              
              <div className="relative">
                <MapPin className="absolute left-4 top-4 w-6 h-6 text-gray-400" />
                <input
                  type="text"
                  placeholder="Location or Remote"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg transition-all"
                />
              </div>
              
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl hover:from-purple-600 hover:to-blue-600 transition-all flex items-center justify-center text-lg font-semibold shadow-xl"
              >
                <Filter className="w-6 h-6 mr-3" />
                Smart Filters
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Job Listings with Enhanced Design */}
        <div className="space-y-8">
          {jobListings.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="group relative overflow-hidden bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-white/50"
            >
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-64 h-full opacity-5 group-hover:opacity-10 transition-opacity">
                <div 
                  className="w-full h-full"
                  style={{
                    backgroundImage: `url('${job.companyImage}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                />
              </div>

              <div className="relative p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div 
                          className="w-16 h-16 rounded-2xl shadow-lg group-hover:shadow-xl transition-all"
                          style={{
                            backgroundImage: `url('${job.companyImage}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                          }}
                        />
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{job.title}</h3>
                          <div className="flex items-center space-x-2 mt-1">
                            <Building className="w-5 h-5 text-blue-600" />
                            <p className="text-lg text-blue-600 font-semibold">{job.company}</p>
                          </div>
                        </div>
                      </div>
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className={`px-4 py-2 rounded-2xl text-lg font-bold border-2 ${getMatchColor(job.matchScore)} shadow-lg`}
                      >
                        <Zap className="w-5 h-5 inline mr-2" />
                        {job.matchScore}% Match
                      </motion.div>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
                      <div className="flex items-center bg-gray-50 rounded-full px-4 py-2">
                        <MapPin className="w-5 h-5 mr-2 text-blue-500" />
                        <span className="font-medium">{job.location}</span>
                      </div>
                      <div className="flex items-center bg-gray-50 rounded-full px-4 py-2">
                        <Users className="w-5 h-5 mr-2 text-green-500" />
                        <span className="font-medium">{job.type}</span>
                      </div>
                      <div className="flex items-center bg-gray-50 rounded-full px-4 py-2">
                        <DollarSign className="w-5 h-5 mr-2 text-yellow-500" />
                        <span className="font-medium">{job.salary}</span>
                      </div>
                      <div className="flex items-center bg-gray-50 rounded-full px-4 py-2">
                        <Clock className="w-5 h-5 mr-2 text-purple-500" />
                        <span className="font-medium">{job.postedDays} days ago</span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-6 text-lg leading-relaxed">{job.description}</p>

                <div className="flex flex-wrap gap-3 mb-8">
                  {job.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skillIndex}
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-semibold border border-blue-200 hover:from-blue-200 hover:to-purple-200 transition-all"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <button className="text-blue-600 hover:text-blue-800 font-semibold text-lg transition-colors">
                    View Full Details →
                  </button>
                  <div className="flex space-x-4">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gray-100 text-gray-700 px-6 py-3 rounded-2xl hover:bg-gray-200 transition-colors font-semibold"
                    >
                      Save Job
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-2xl hover:from-purple-600 hover:to-blue-600 transition-all font-semibold shadow-lg"
                    >
                      Apply Now
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-20 relative overflow-hidden rounded-3xl"
        >
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=600&fit=crop&crop=center')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-purple-900/85 to-pink-900/90" />
          <div className="relative text-center text-white p-16">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Star className="w-16 h-16 mx-auto mb-6 text-yellow-300" />
            </motion.div>
            <h2 className="text-5xl font-bold mb-6 drop-shadow-2xl">Not Finding the Right Match?</h2>
            <p className="text-2xl text-blue-100 mb-10 max-w-3xl mx-auto leading-relaxed">
              Let our AI create a personalized job search strategy tailored to your unique profile and aspirations.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-10 py-5 rounded-2xl text-xl font-bold hover:bg-blue-50 transition-colors shadow-2xl"
            >
              Get AI Recommendations
            </motion.button>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Jobs;
