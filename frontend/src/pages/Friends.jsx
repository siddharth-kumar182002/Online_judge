import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Friends = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    axios.get('http://13.233.116.70:8080/api/users/get-friend', {
      headers: {
        'Authorization': localStorage.getItem('token') // Attach the token to the request
      }
    })
    .then(response => setLeaderboard(response.data))
    .catch(error => {
      console.error('Error fetching Friends:', error)
       alert("Login required!")  
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('http://13.233.116.70:8080/public/planets.jpg')" }}>
      <div className="max-w-md mx-auto p-4"> {/* Adjust max-width and center with mx-auto */}
        <h1 className="text-3xl font-bold text-center mb-4 text-white">Friends</h1>
        <div className="bg-blue-100 text-black shadow-md rounded-lg p-6 overflow-y-auto"> {/* Styled container */}
          <table className="table-auto w-full text-center"> {/* Centered table content */}
            <thead>
              <tr>
                <th className="px-4 py-2">Friends Rank</th>
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
  );
};

export default Friends;
