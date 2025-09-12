import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white shadow-lg">
      <div className="flex items-center space-x-6">
        <Link to="/" className="text-3xl font-bold text-indigo-400">
          Glide
        </Link>
        <nav className="hidden md:flex space-x-4 font-medium">
          <Link to="/" className="hover:text-indigo-400 transition-colors">Home</Link>
          {user && (
            <Link to="/dashboard" className="hover:text-indigo-400 transition-colors">Dashboard</Link>
          )}
        </nav>
      </div>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <span className="text-gray-300 hidden sm:inline">Hello, {user.username}!</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-full hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition-colors"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;