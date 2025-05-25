
import React, { useState } from 'react';
import { Briefcase, MapPin, Clock, DollarSign, ExternalLink, Heart, Filter } from 'lucide-react';

const JobRecommendations = ({ userProfile }) => {
  const [filterLocation, setFilterLocation] = useState('all');
  const [filterExperience, setFilterExperience] = useState('all');
  const [savedJobs, setSavedJobs] = useState(new Set());

  const jobRecommendations = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'TechStart India',
      location: 'Bangalore',
      experience: 'Fresher - 2 years',
      salary: '₹4-8 LPA',
      matchScore: 95,
      skills: ['React', 'JavaScript', 'HTML/CSS'],
      description: 'Join our growing team to build modern web applications using React and JavaScript.',
      type: 'Full-time',
      posted: '2 days ago',
      applicants: '45 applicants'
    },
    {
      id: 2,
      title: 'Python Developer Intern',
      company: 'DataTech Solutions',
      location: 'Hyderabad',
      experience: 'Internship',
      salary: '₹15-25k/month',
      matchScore: 88,
      skills: ['Python', 'SQL', 'Data Analysis'],
      description: 'Learn and grow with our data science team while working on real-world projects.',
      type: 'Internship',
      posted: '1 day ago',
      applicants: '23 applicants'
    },
    {
      id: 3,
      title: 'Full Stack Developer',
      company: 'InnovateLab',
      location: 'Pune',
      experience: '1-3 years',
      salary: '₹6-12 LPA',
      matchScore: 82,
      skills: ['React', 'Node.js', 'MongoDB'],
      description: 'Build end-to-end applications and work with cutting-edge technologies.',
      type: 'Full-time',
      posted: '3 days ago',
      applicants: '67 applicants'
    },
    {
      id: 4,
      title: 'Software Engineer Trainee',
      company: 'MegaCorp Technologies',
      location: 'Chennai',
      experience: 'Fresher',
      salary: '₹3.5-6 LPA',
      matchScore: 79,
      skills: ['Java', 'JavaScript', 'Problem Solving'],
      description: 'Comprehensive training program for fresh graduates with strong fundamentals.',
      type: 'Full-time',
      posted: '1 week ago',
      applicants: '156 applicants'
    },
    {
      id: 5,
      title: 'Backend Developer',
      company: 'CloudFirst',
      location: 'Remote',
      experience: '0-2 years',
      salary: '₹5-9 LPA',
      matchScore: 75,
      skills: ['Node.js', 'Python', 'AWS'],
      description: 'Work on scalable backend systems and cloud infrastructure.',
      type: 'Full-time',
      posted: '4 days ago',
      applicants: '89 applicants'
    },
    {
      id: 6,
      title: 'UI/UX Developer',
      company: 'DesignHub',
      location: 'Mumbai',
      experience: 'Fresher - 1 year',
      salary: '₹4-7 LPA',
      matchScore: 72,
      skills: ['JavaScript', 'React', 'Design'],
      description: 'Create beautiful and intuitive user interfaces for web applications.',
      type: 'Full-time',
      posted: '5 days ago',
      applicants: '34 applicants'
    }
  ];

  const toggleSaveJob = (jobId) => {
    const newSavedJobs = new Set(savedJobs);
    if (newSavedJobs.has(jobId)) {
      newSavedJobs.delete(jobId);
    } else {
      newSavedJobs.add(jobId);
    }
    setSavedJobs(newSavedJobs);
  };

  const getMatchColor = (score) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  if (!userProfile) {
    return (
      <div className="text-center py-12">
        <Briefcase className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No Profile Data</h3>
        <p className="text-gray-500">Please upload your resume first to see job recommendations</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Job Recommendations</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Curated job opportunities that match your skills and experience level
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-blue-600 mb-2">{jobRecommendations.length}</div>
          <div className="text-gray-600">Total Matches</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-green-600 mb-2">
            {jobRecommendations.filter(job => job.matchScore >= 90).length}
          </div>
          <div className="text-gray-600">Perfect Matches</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-purple-600 mb-2">
            {jobRecommendations.filter(job => job.type === 'Internship').length}
          </div>
          <div className="text-gray-600">Internships</div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="text-2xl font-bold text-orange-600 mb-2">{savedJobs.size}</div>
          <div className="text-gray-600">Saved Jobs</div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center mb-4">
          <Filter className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="font-semibold text-gray-900">Filters</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <select 
              value={filterLocation} 
              onChange={(e) => setFilterLocation(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Locations</option>
              <option value="bangalore">Bangalore</option>
              <option value="hyderabad">Hyderabad</option>
              <option value="pune">Pune</option>
              <option value="remote">Remote</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
            <select 
              value={filterExperience} 
              onChange={(e) => setFilterExperience(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Levels</option>
              <option value="fresher">Fresher</option>
              <option value="internship">Internship</option>
              <option value="experienced">1+ Years</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
            <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option value="all">All Types</option>
              <option value="fulltime">Full-time</option>
              <option value="internship">Internship</option>
              <option value="contract">Contract</option>
            </select>
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="space-y-6">
        {jobRecommendations.map((job) => (
          <div key={job.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getMatchColor(job.matchScore)}`}>
                    {job.matchScore}% Match
                  </div>
                </div>
                <p className="text-lg font-medium text-blue-600 mb-2">{job.company}</p>
                <p className="text-gray-600 mb-4">{job.description}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-2" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Briefcase className="w-4 h-4 mr-2" />
                <span>{job.experience}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <DollarSign className="w-4 h-4 mr-2" />
                <span>{job.salary}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="w-4 h-4 mr-2" />
                <span>{job.posted}</span>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Required Skills:</h4>
              <div className="flex flex-wrap gap-2">
                {job.skills.map((skill, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="text-sm text-gray-500">
                {job.applicants}
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => toggleSaveJob(job.id)}
                  className={`p-2 rounded-full transition-colors ${
                    savedJobs.has(job.id) 
                      ? 'text-red-600 bg-red-100 hover:bg-red-200' 
                      : 'text-gray-400 bg-gray-100 hover:bg-gray-200 hover:text-red-600'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${savedJobs.has(job.id) ? 'fill-current' : ''}`} />
                </button>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center">
                  Apply Now
                  <ExternalLink className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More */}
      <div className="text-center">
        <button className="bg-gray-100 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
          Load More Jobs
        </button>
      </div>
    </div>
  );
};

export default JobRecommendations;
