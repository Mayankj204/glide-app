import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('rider');
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password, role);
    } catch (err) {
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 space-y-8 bg-white rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-900">Create a new Glide account</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <input
              id="username"
              name="username"
              type="text"
              required
              className="relative block w-full px-4 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="relative block w-full px-4 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="relative block w-full px-4 py-3 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="role" className="sr-only">
              Account Type
            </label>
            <select
              id="role"
              name="role"
              required
              className="relative block w-full px-4 py-3 text-gray-900 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="rider">Rider</option>
              <option value="driver">Driver</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="relative flex justify-center w-full px-4 py-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign up
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;