
import React from 'react';
import { TrendingUp, Award, Target, Calendar, BarChart3, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const ProgressTracker = ({ userProfile }) => {
  const skillProgressData = [
    { month: 'Jan', frontend: 65, backend: 30, cloud: 20 },
    { month: 'Feb', frontend: 70, backend: 35, cloud: 25 },
    { month: 'Mar', frontend: 75, backend: 45, cloud: 35 },
    { month: 'Apr', frontend: 80, backend: 55, cloud: 45 },
    { month: 'May', frontend: 85, backend: 65, cloud: 55 }
  ];

  const learningActivityData = [
    { name: 'Courses Completed', value: 8, color: '#3B82F6' },
    { name: 'Projects Built', value: 5, color: '#10B981' },
    { name: 'Certifications', value: 3, color: '#F59E0B' },
    { name: 'Mock Interviews', value: 12, color: '#8B5CF6' }
  ];

  const weeklyActivityData = [
    { day: 'Mon', hours: 2.5 },
    { day: 'Tue', hours: 3.2 },
    { day: 'Wed', hours: 1.8 },
    { day: 'Thu', hours: 4.1 },
    { day: 'Fri', hours: 2.9 },
    { day: 'Sat', hours: 5.3 },
    { day: 'Sun', hours: 3.7 }
  ];

  const achievements = [
    {
      title: 'First React Project',
      description: 'Built your first React application',
      date: '2024-03-15',
      icon: Award,
      color: 'bg-blue-500'
    },
    {
      title: 'JavaScript Master',
      description: 'Completed advanced JavaScript course',
      date: '2024-04-02',
      icon: Target,
      color: 'bg-green-500'
    },
    {
      title: 'Interview Ready',
      description: 'Completed 10 mock interviews',
      date: '2024-04-20',
      icon: TrendingUp,
      color: 'bg-purple-500'
    },
    {
      title: 'Portfolio Published',
      description: 'Launched professional portfolio website',
      date: '2024-05-01',
      icon: Award,
      color: 'bg-orange-500'
    }
  ];

  if (!userProfile) {
    return (
      <div className="text-center py-12">
        <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600 mb-2">No Progress Data</h3>
        <p className="text-gray-500">Start your learning journey to see your progress here</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Progress Tracker</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Monitor your learning journey and celebrate your achievements
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-xl">
          <TrendingUp className="w-10 h-10 mb-4" />
          <h3 className="text-2xl font-bold mb-2">15</h3>
          <p className="text-blue-100">Skills Improved</p>
        </div>
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-xl">
          <Award className="w-10 h-10 mb-4" />
          <h3 className="text-2xl font-bold mb-2">4</h3>
          <p className="text-green-100">Achievements</p>
        </div>
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-xl">
          <Clock className="w-10 h-10 mb-4" />
          <h3 className="text-2xl font-bold mb-2">89</h3>
          <p className="text-purple-100">Hours Learned</p>
        </div>
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-xl">
          <Target className="w-10 h-10 mb-4" />
          <h3 className="text-2xl font-bold mb-2">76%</h3>
          <p className="text-orange-100">Goal Progress</p>
        </div>
      </div>

      {/* Skill Progress Chart */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Skill Development Over Time</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={skillProgressData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="frontend" stroke="#3B82F6" strokeWidth={3} name="Frontend" />
              <Line type="monotone" dataKey="backend" stroke="#10B981" strokeWidth={3} name="Backend" />
              <Line type="monotone" dataKey="cloud" stroke="#F59E0B" strokeWidth={3} name="Cloud" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Learning Activity & Weekly Hours */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Learning Activity Pie Chart */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Learning Activities</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={learningActivityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {learningActivityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {learningActivityData.map((item, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-4 h-4 rounded-full mr-2"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-700">{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Activity Bar Chart */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Weekly Learning Hours</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyActivityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="hours" fill="#3B82F6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-center">
            <p className="text-gray-600">Average: 3.4 hours/day</p>
          </div>
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Achievements</h3>
        <div className="space-y-4">
          {achievements.map((achievement, index) => {
            const IconComponent = achievement.icon;
            return (
              <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                <div className={`${achievement.color} w-12 h-12 rounded-full flex items-center justify-center mr-4`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
                  <p className="text-gray-600">{achievement.description}</p>
                </div>
                <div className="text-sm text-gray-500">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  {new Date(achievement.date).toLocaleDateString()}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Goals and Milestones */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-8 rounded-xl border border-indigo-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Current Goals</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-gray-700">Complete React Roadmap</span>
                <span className="text-indigo-600">80%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-600 h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-gray-700">Build Portfolio Projects</span>
                <span className="text-green-600">60%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-gray-700">Practice Interview Skills</span>
                <span className="text-yellow-600">40%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Upcoming Milestones</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-700">
                <Target className="w-4 h-4 mr-2 text-indigo-600" />
                Complete Node.js course by June 15
              </li>
              <li className="flex items-center text-gray-700">
                <Target className="w-4 h-4 mr-2 text-green-600" />
                Deploy first full-stack project
              </li>
              <li className="flex items-center text-gray-700">
                <Target className="w-4 h-4 mr-2 text-purple-600" />
                Apply to 10 internship positions
              </li>
              <li className="flex items-center text-gray-700">
                <Target className="w-4 h-4 mr-2 text-orange-600" />
                Get AWS certification
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
