import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import axios from 'axios';

const Navbar = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8080/api/users/${searchQuery}`, {
        headers: {
          'Authorization': localStorage.getItem('token'),
        }
      });
      navigate(`/visit/${searchQuery}`);
    } catch (error) {
      console.error('Error searching user:', error);
    }
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link to="/" className="text-white">Home</Link>
          <Link to="/about-us" className="text-white">About Us</Link>
          <Link to="/leaderboard" className="text-white">Leaderboard</Link>
        </div>
        <div className="flex items-center space-x-4 ml-auto">
          <form onSubmit={handleSearch} className="flex space-x-4">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search user..."
              className="p-2 border border-gray-300 rounded"
            />
            <button type="submit" className="bg-white text-blue-500 p-2 rounded">Search</button>
          </form>
          {!isLoggedIn && <Link to="/login" className="text-white">Login</Link>}
          {!isLoggedIn && <Link to="/register" className="text-white">Register</Link>}
          {isLoggedIn && <Link to="/profile" className="text-white">Profile</Link>}
          {isLoggedIn && <button onClick={handleLogout} className="text-white">Logout</button>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
