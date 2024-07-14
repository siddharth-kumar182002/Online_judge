import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container min-h-screen flex flex-col items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('http://13.233.116.70:8080/public/planets.jpg')" }}>
      <h1 className="text-3xl font-bold text-center text-white">Welcome to the CodingPlanet!</h1>
      <div className="mt-8 text-center bg-black bg-opacity-50 p-6 rounded-lg">
        <p className="text-white">
        Here you can solve problems, compete with others, and improve your skills.
        </p>
        <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
          <Link to="/problem-set">Problem Set</Link>
        </button>
      </div>
      <div className="rules-container bg-white text-gray-700 p-4 rounded shadow-md mt-6 max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Rules and Regulations</h2>
        <ul className="list-disc pl-5">
          <li>Always submit original code.</li>
          <li>Do not share your solutions with others.</li>
          <li>Respect the competition guidelines.</li>
          <li>Follow the community rules and guidelines.</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
