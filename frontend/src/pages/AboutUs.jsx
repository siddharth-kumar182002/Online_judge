import React from 'react';

const AboutUs = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('http://13.233.116.70:8080/public/planets.jpg')" }}>
      <div className="max-w-md mx-auto p-4"> {/* Adjust max-width and center with mx-auto */}
        <h1 className="text-3xl font-bold text-center text-white">About us!</h1>
        <div className="mt-8 text-center bg-black bg-opacity-50 p-6 rounded-lg">
          <p className="text-white">
            Welcome to our Online Judge platform, where problem-solving skills and coding expertise are at the forefront. Our mission is to provide a comprehensive and competitive environment for coders to practice and enhance their abilities. Join us to tackle challenging problems, compete with peers, and grow as a programmer.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
