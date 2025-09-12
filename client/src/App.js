import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/common/PrivateRoute';
import { GoogleMapsLoader } from './components/common/GoogleMapsLoader';

function App() {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <GoogleMapsLoader>
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
        </main>
      </GoogleMapsLoader>
      <Footer />
    </div>
  );
}

export default App;