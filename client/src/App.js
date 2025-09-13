import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/ProfilePage';
import RideHistoryPage from './pages/RideHistoryPage';
import DriverApplicationPage from './pages/DriverApplicationPage';
import AboutPage from './pages/AboutPage';
import PrivateRoute from './components/common/PrivateRoute';
import { GoogleMapsLoader } from './components/common/GoogleMapsLoader';
import ProfileSidebar from './components/common/ProfileSidebar';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Header toggleSidebar={toggleSidebar} />
      <div className={`flex-grow transition-transform duration-300 ${isSidebarOpen ? '-translate-x-80' : 'translate-x-0'}`}>
        <GoogleMapsLoader>
          <main>
            <Routes>
              <Route path="/" element={<AuthPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/join-us" element={<DriverApplicationPage />} />
              
              <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/ride-history" element={<RideHistoryPage />} />
              </Route>
            </Routes>
          </main>
        </GoogleMapsLoader>
      </div>
      <Footer />
      <ProfileSidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
    </div>
  );
}

export default App;