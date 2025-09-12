import { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      const newSocket = io('http://localhost:5000');
      newSocket.emit('join_room', storedUser._id);
      setSocket(newSocket);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      const newSocket = io('http://localhost:5000');
      newSocket.emit('join_room', data._id);
      setSocket(newSocket);
      navigate('/dashboard');
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const register = async (username, email, password, role) => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/register', { username, email, password, role });
      localStorage.setItem('user', JSON.stringify(data));
      setUser(data);
      const newSocket = io('http://localhost:5000');
      newSocket.emit('join_room', data._id);
      setSocket(newSocket);
      navigate('/dashboard');
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    if (socket) {
      socket.disconnect();
    }
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, socket }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);