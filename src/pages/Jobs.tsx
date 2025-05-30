
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, DollarSign, Clock, Briefcase, Filter, Star } from 'lucide-react';
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
      description: 'Join our innovative team building cutting-edge web applications...',
      postedDays: 2
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
      description: 'Help us scale our platform to millions of users worldwide...',
      postedDays: 1
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
      description: 'Work on exciting client projects with modern technologies...',
      postedDays: 3
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
      description: 'Create beautiful and intuitive user experiences...',
      postedDays: 5
    }
  ];

  const getMatchColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            AI-Matched Jobs
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover opportunities perfectly tailored to your skills and career goals.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Location..."
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
              <Filter className="w-5 h-5 mr-2" />
              Advanced Filters
            </button>
          </div>
        </motion.div>

        {/* Job Listings */}
        <div className="space-y-6">
          {jobListings.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getMatchColor(job.matchScore)}`}>
                      {job.matchScore}% Match
                    </div>
                  </div>
                  
                  <p className="text-blue-600 font-medium mb-3">{job.company}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="w-4 h-4 mr-1" />
                      {job.type}
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-1" />
                      {job.salary}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {job.postedDays} days ago
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-gray-700 mb-4">{job.description}</p>

              <div className="flex flex-wrap gap-2 mb-6">
                {job.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  View Details
                </button>
                <div className="flex space-x-3">
                  <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                    Save Job
                  </button>
                  <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Apply Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8 rounded-2xl"
        >
          <Star className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Not Finding the Right Match?</h2>
          <p className="text-blue-100 mb-6">
            Let our AI create a personalized job search strategy for you.
          </p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
            Get AI Recommendations
          </button>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Jobs;
