
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Edit, Camera, MapPin, Mail, Phone, Globe, Github, Linkedin, Save } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    website: 'https://johndoe.dev',
    linkedin: 'https://linkedin.com/in/johndoe',
    github: 'https://github.com/johndoe',
    bio: 'Passionate full-stack developer with 5+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud technologies.',
    skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'MongoDB', 'TypeScript', 'GraphQL'],
    experience: [
      {
        title: 'Senior Frontend Developer',
        company: 'TechCorp Inc.',
        duration: '2022 - Present',
        description: 'Leading frontend development for enterprise applications using React and TypeScript.'
      },
      {
        title: 'Full Stack Developer',
        company: 'StartupXYZ',
        duration: '2020 - 2022',
        description: 'Built and maintained multiple web applications using MERN stack.'
      }
    ]
  });

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
    console.log('Saving profile data:', profileData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          {/* Profile Header */}
          <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                    <User className="w-12 h-12 text-gray-400" />
                  </div>
                  <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="text-white">
                  <h1 className="text-3xl font-bold mb-2">{profileData.fullName}</h1>
                  <p className="text-blue-100 mb-1">Full Stack Developer</p>
                  <div className="flex items-center text-blue-100">
                    <MapPin className="w-4 h-4 mr-1" />
                    {profileData.location}
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className="bg-white text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition-colors flex items-center"
              >
                {isEditing ? (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center text-gray-700">
                      <Mail className="w-4 h-4 mr-2 text-gray-400" />
                      {profileData.email}
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center text-gray-700">
                      <Phone className="w-4 h-4 mr-2 text-gray-400" />
                      {profileData.phone}
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={profileData.website}
                      onChange={(e) => handleInputChange('website', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center text-gray-700">
                      <Globe className="w-4 h-4 mr-2 text-gray-400" />
                      <a href={profileData.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {profileData.website}
                      </a>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center text-gray-700">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      {profileData.location}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Social Links</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn</label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={profileData.linkedin}
                      onChange={(e) => handleInputChange('linkedin', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center text-gray-700">
                      <Linkedin className="w-4 h-4 mr-2 text-gray-400" />
                      <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        LinkedIn Profile
                      </a>
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">GitHub</label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={profileData.github}
                      onChange={(e) => handleInputChange('github', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  ) : (
                    <div className="flex items-center text-gray-700">
                      <Github className="w-4 h-4 mr-2 text-gray-400" />
                      <a href={profileData.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        GitHub Profile
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bio */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">About Me</h2>
              {isEditing ? (
                <textarea
                  value={profileData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-700 leading-relaxed">{profileData.bio}</p>
              )}
            </div>

            {/* Skills */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Skills</h2>
              <div className="flex flex-wrap gap-3">
                {profileData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Experience</h2>
              <div className="space-y-6">
                {profileData.experience.map((exp, index) => (
                  <div key={index} className="border-l-4 border-blue-600 pl-6">
                    <h3 className="text-lg font-semibold text-gray-900">{exp.title}</h3>
                    <p className="text-blue-600 font-medium">{exp.company}</p>
                    <p className="text-sm text-gray-500 mb-2">{exp.duration}</p>
                    <p className="text-gray-700">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Profile;
