
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ResumeUpload from '../components/ResumeUpload';
import JobMatchingDashboard from '../components/JobMatchingDashboard';

const CareerDashboard = () => {
  const [userProfile, setUserProfile] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Header />
      
      <div className="py-12">
        {!userProfile ? (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <ResumeUpload setUserProfile={setUserProfile} />
          </div>
        ) : (
          <JobMatchingDashboard userProfile={userProfile} />
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default CareerDashboard;
