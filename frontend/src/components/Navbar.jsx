import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';

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
      if(isLoggedIn){
        navigate(`/visit/${searchQuery}`);
      }
      else{
        alert("Login required");
      }
      
    } catch (error) {
      console.error('Error searching user:', error);
    }
  };

  const activeClassName = "border-b-2 border-white";

  return (
    <nav className="bg-blue-500 p-4 fixed top-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-white text-2xl font-bold pr-4">CodingPlanets</h1>
          <NavLink to="/" className={({ isActive }) => isActive ? `${activeClassName} text-white` : "text-white"}>Home</NavLink>
          <NavLink to="/about-us" className={({ isActive }) => isActive ? `${activeClassName} text-white` : "text-white"}>About Us</NavLink>
          <NavLink to="/leaderboard" className={({ isActive }) => isActive ? `${activeClassName} text-white` : "text-white"}>Leaderboard</NavLink>
          <NavLink to="/friends" className={({ isActive }) => isActive ? `${activeClassName} text-white` : "text-white"}>Friends</NavLink>
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
          {!isLoggedIn && <NavLink to="/login" className={({ isActive }) => isActive ? `${activeClassName} text-white` : "text-white"}>Login</NavLink>}
          {!isLoggedIn && <NavLink to="/register" className={({ isActive }) => isActive ? `${activeClassName} text-white` : "text-white"}>Register</NavLink>}
          {isLoggedIn && <NavLink to="/profile" className={({ isActive }) => isActive ? `${activeClassName} text-white` : "text-white"}>Profile</NavLink>}
          {isLoggedIn && <button onClick={handleLogout} className="text-white">Logout</button>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
