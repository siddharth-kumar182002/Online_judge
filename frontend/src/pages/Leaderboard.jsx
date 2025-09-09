import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import planetsImage from '../assets/planets.jpg';
const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    axios.get('http://13.126.195.239:8080/api/leaderboard', {
      headers: {
        'Authorization': localStorage.getItem('token') // Attach the token to the request
      }
    })
    .then(response => setLeaderboard(response.data))
    .catch(error => console.error('Error fetching leaderboard:', error));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${planetsImage})` }}>
      <div className="container mx-auto p-4 flex justify-center"> {/* Center the container */}
        <div className="bg-blue-100 text-black shadow-md rounded-lg p-6 overflow-y-auto" style={{ maxWidth: '600px' }}> {/* Set max width for the container */}
          <h1 className="text-3xl font-bold text-center mb-4">Leaderboard</h1>
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-semibold">Top Coders</h2>
            <table className="table-auto w-full mt-4 text-center"> {/* Centered table content */}
              <thead>
                <tr>
                  <th className="px-4 py-2">Rank</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">Solved Problems</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((user, index) => (
                  <tr key={user.user} className="mb-4 p-4 border rounded shadow-sm">
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">
                      <Link to={`/visit/${user.user}`} className="text-lg font-medium">{user.user}</Link>
                    </td>
                    <td className="border px-4 py-2 text-gray-600">{user.solvedCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
