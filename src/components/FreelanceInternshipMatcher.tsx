
import React, { useState, useEffect } from 'react';
import { Briefcase, Clock, MapPin, DollarSign, ExternalLink, Filter, Search } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const FreelanceInternshipMatcher = ({ userProfile }) => {
  const [opportunities, setOpportunities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all', // all, internship, freelance, part-time
    remote: false,
    experienceLevel: 'all',
    skillMatch: 50
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (userProfile) {
      fetchOpportunities();
    }
  }, [userProfile, filters]);

  const fetchOpportunities = async () => {
    setIsLoading(true);
    try {
      // Mock data for demonstration - in real implementation this would call external APIs
      const mockOpportunities = [
        {
          id: 1,
          title: 'Frontend Developer Intern',
          company: 'TechStart Inc.',
          type: 'internship',
          location: 'Remote',
          duration: '3 months',
          stipend: '$800/month',
          skillsRequired: ['React', 'JavaScript', 'CSS'],
          description: 'Join our team to work on exciting web applications using React and modern frontend technologies.',
          matchScore: 85,
          applicationUrl: 'https://example.com/apply',
          posted: '2 days ago'
        },
        {
          id: 2,
          title: 'Part-time Data Analysis',
          company: 'DataCorp',
          type: 'part-time',
          location: 'New York, NY',
          duration: '6 months',
          stipend: '$25/hour',
          skillsRequired: ['Python', 'SQL', 'Excel'],
          description: 'Analyze customer data and create insights to drive business decisions.',
          matchScore: 70,
          applicationUrl: 'https://example.com/apply',
          posted: '1 week ago'
        },
        {
          id: 3,
          title: 'Mobile App Development',
          company: 'Freelance Project',
          type: 'freelance',
          location: 'Remote',
          duration: '2 months',
          stipend: '$2,500 total',
          skillsRequired: ['React Native', 'JavaScript', 'Mobile Development'],
          description: 'Build a cross-platform mobile app for a startup. Great opportunity to work with modern technologies.',
          matchScore: 75,
          applicationUrl: 'https://example.com/apply',
          posted: '3 days ago'
        },
        {
          id: 4,
          title: 'UI/UX Design Intern',
          company: 'Design Studio',
          type: 'internship',
          location: 'San Francisco, CA',
          duration: '4 months',
          stipend: '$1,200/month',
          skillsRequired: ['Figma', 'Adobe XD', 'Prototyping'],
          description: 'Work with senior designers to create beautiful user experiences for web and mobile applications.',
          matchScore: 60,
          applicationUrl: 'https://example.com/apply',
          posted: '5 days ago'
        },
        {
          id: 5,
          title: 'Backend Development',
          company: 'DevCorp',
          type: 'freelance',
          location: 'Remote',
          duration: '3 months',
          stipend: '$4,000 total',
          skillsRequired: ['Node.js', 'Express', 'MongoDB'],
          description: 'Develop backend APIs for a new SaaS platform. Flexible schedule and remote work.',
          matchScore: 80,
          applicationUrl: 'https://example.com/apply',
          posted: '1 day ago'
        }
      ];

      // Filter opportunities based on current filters
      let filteredOpportunities = mockOpportunities;

      if (filters.type !== 'all') {
        filteredOpportunities = filteredOpportunities.filter(opp => opp.type === filters.type);
      }

      if (filters.remote) {
        filteredOpportunities = filteredOpportunities.filter(opp => opp.location.toLowerCase().includes('remote'));
      }

      if (filters.skillMatch > 0) {
        filteredOpportunities = filteredOpportunities.filter(opp => opp.matchScore >= filters.skillMatch);
      }

      if (searchQuery) {
        filteredOpportunities = filteredOpportunities.filter(opp => 
          opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          opp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          opp.skillsRequired.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
        );
      }

      // Sort by match score
      filteredOpportunities.sort((a, b) => b.matchScore - a.matchScore);

      setOpportunities(filteredOpportunities);
    } catch (error) {
      console.error('Error fetching opportunities:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'internship':
        return 'bg-blue-100 text-blue-800';
      case 'freelance':
        return 'bg-green-100 text-green-800';
      case 'part-time':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getMatchColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  if (!userProfile) {
    return (
      <div className="text-center py-12">
        <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No Profile Data</h3>
        <p className="text-gray-500">Please upload your resume first to see freelance and internship opportunities</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Freelance & Internship Opportunities</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover part-time, freelance, and internship opportunities matched to your skills
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div className="col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search opportunities..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <select
            value={filters.type}
            onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="internship">Internships</option>
            <option value="freelance">Freelance</option>
            <option value="part-time">Part-time</option>
          </select>

          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={filters.remote}
                onChange={(e) => setFilters(prev => ({ ...prev, remote: e.target.checked }))}
                className="mr-2"
              />
              <span className="text-sm">Remote Only</span>
            </label>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Min Match Score:</span>
          <input
            type="range"
            min="0"
            max="100"
            value={filters.skillMatch}
            onChange={(e) => setFilters(prev => ({ ...prev, skillMatch: parseInt(e.target.value) }))}
            className="flex-1"
          />
          <span className="text-sm text-gray-600">{filters.skillMatch}%</span>
        </div>
      </div>

      {/* Opportunities Grid */}
      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600">Finding the best opportunities for you...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {opportunities.map((opportunity) => (
            <div key={opportunity.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{opportunity.title}</h3>
                  <p className="text-blue-600 font-medium">{opportunity.company}</p>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(opportunity.type)}`}>
                    {opportunity.type}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMatchColor(opportunity.matchScore)}`}>
                    {opportunity.matchScore}% match
                  </span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {opportunity.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  {opportunity.duration}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <DollarSign className="w-4 h-4 mr-2" />
                  {opportunity.stipend}
                </div>
              </div>

              <p className="text-gray-700 text-sm mb-4">{opportunity.description}</p>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Skills Required:</h4>
                <div className="flex flex-wrap gap-2">
                  {opportunity.skillsRequired.map((skill, index) => {
                    const hasSkill = userProfile.skills?.some(userSkill => 
                      userSkill.toLowerCase().includes(skill.toLowerCase())
                    );
                    
                    return (
                      <span
                        key={index}
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          hasSkill 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {skill}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">Posted {opportunity.posted}</span>
                <a
                  href={opportunity.applicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center text-sm"
                >
                  <span>Apply Now</span>
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}

      {opportunities.length === 0 && !isLoading && (
        <div className="text-center py-12">
          <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No Opportunities Found</h3>
          <p className="text-gray-500">Try adjusting your filters or search criteria</p>
        </div>
      )}
    </div>
  );
};

export default FreelanceInternshipMatcher;
