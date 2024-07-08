import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProblemSet = () => {
  const [problems, setProblems] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/problems', {
          headers: {
            'Authorization': localStorage.getItem('token') // Attach the token to the request
          }
        });
        setProblems(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching problems:', error);
      }
    };

    const fetchSolvedProblems = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/submissions', {
          headers: {
            'Authorization': localStorage.getItem('token') // Attach the token to the request
          }
        });
        //console.log(response.data);
        const acceptedProblems = response.data.submissions
          .filter(submission => submission.verdict === 'Accepted')
          .map(submission => submission.problemId._id);
        setSolvedProblems(acceptedProblems);
        //console.log(acceptedProblems);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      }
    };
   
    fetchProblems();
    fetchSolvedProblems();
    
  }, []);
  // problems.map((problem)=>{
  //   console.log(problem);
  //   if(solvedProblems.includes(problem._id)){
  //     console.log("YES");
  //   }
  //   else{
  //     console.log("NO");
  //   }
  // })
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-4">Problem Set</h1>
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 overflow-y-auto" style={{ maxHeight: '400px' }}>
          <ul className="space-y-4">
            {problems.map((problem, index) => (
              <li key={problem._id} className={`p-4 rounded-md shadow ${solvedProblems.includes(problem._id) ? 'bg-green-100' : 'bg-white-100'}`}>

                <div className="flex items-center">
                  <span className="mr-2">{index + 1}.</span>
                  <Link to={`/problems/${problem._id}`} className="text-blue-500">{problem.name}</Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProblemSet;
