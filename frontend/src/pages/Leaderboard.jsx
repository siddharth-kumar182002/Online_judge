import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/leaderboard', {
      headers: {
        'Authorization': localStorage.getItem('token') // Attach the token to the request
      }
    })
    .then(response => setLeaderboard(response.data))
    .catch(error => console.error('Error fetching leaderboard:', error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center">Leaderboard</h1>
      <div className="mt-8 text-center">
        <h2 className="text-2xl font-semibold">Top Coders</h2>
        <ul className="mt-4">
          {leaderboard.map((user, index) => (
            <li key={user.user._id} className="mb-4 p-4 border rounded shadow-sm">
              <div className="text-lg font-medium">{index + 1}. {user.user}</div>
              <div className="text-sm text-gray-600">Solved: {user.solvedCount} problems</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Leaderboard;
