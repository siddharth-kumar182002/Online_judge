import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import venusImage from '../assets/venus.png';
import mercuryImage from '../assets/mercury.png';
import earthImage from '../assets/earth.png';
import marsImage from '../assets/mars.png';

ChartJS.register(ArcElement, Tooltip, Legend);

const Profile = () => {
  const [user, setUser] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [dates, setDates] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [expandedCode, setExpandedCode] = useState({});

  const { handleUnauthorized } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('http://13.233.116.70:8080/api/submissions', {
      headers: {
        'Authorization': localStorage.getItem('token') // Attach the token to the request
      }
    })
    .then(response => {
      setUser(response.data.user);
      setSubmissions(response.data.submissions);
      const date = response.data.submissions.map(submission => {
        const dateString = submission.submittedAt.split('T')[0];
        return { date: dateString };
      });
      setDates(date);
    })
    .catch(error => {
      if (error.response && error.response.status === 401) {
        handleUnauthorized();
        navigate('/login');
      } else {
        console.error('Error fetching submissions:', error);
      }
    });
  }, [handleUnauthorized,navigate]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('http://13.233.116.70:8080/api/image/upload', formData, {
        headers: {
          'Authorization': localStorage.getItem('token'),
          'Content-Type': 'multipart/form-data'
        }
      });
      setUser({ ...user, image: response.data.imagePath });
    } catch (error) {
      console.error('Error uploading image:', error);
      alert("Choose image");
    }
  };

  const toggleCode = (id) => {
    setExpandedCode(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  if (!user) return <div>Loading...</div>;

  // Calculate the number of solved problems
  const solvedProblems = user[0].problemcount;
  const totalProblems = 5;  // Total number of problems

  let planetimage;
  if (solvedProblems <= 1) { 
    planetimage = mercuryImage;
  } else if (solvedProblems <= 4) {
    planetimage = venusImage;
  } else if (solvedProblems <= 6) {
    planetimage = marsImage;
  } else if (solvedProblems <= 10) {
    planetimage = earthImage;
  }

  const planetName = (() => {
    if (solvedProblems <= 1) return 'Mercury';
    if (solvedProblems <= 4) return 'Venus';
    if (solvedProblems <= 6) return 'Mars';
    if (solvedProblems <= 10) return 'Earth';
    return 'Unknown Planet';
  })();

  const data = {
    labels: ['Solved', 'Unsolved'],
    datasets: [
      {
        label: 'Problems',
        data: [solvedProblems, totalProblems - solvedProblems],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384']
      }
    ]
  };

  return (
    <div className="container mx-auto p-4 flex flex-wrap bg-blue-100"> {/* Light blue background */}
    
      <div className="p-5 border rounded text-center text-gray-500 mb-6">
        <img className="w-32 h-32 rounded-full mx-auto" src={`http://13.233.116.70:8080/${user[0].image}`} alt="Profile" />
        <div className="text-sm mt-5">
          <p className="font-medium leading-none text-gray-900 hover:text-indigo-600 transition duration-500 ease-in-out">{user[0].firstname} {user[0].lastname}</p>
          <p>{user[0].college}</p>
        </div>
        <p className="mt-2 text-sm text-gray-900">Man living in {planetName} with total number of question solved is {solvedProblems}</p>
        <div className="flex mt-4 justify-center">
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload} className="bg-blue-500 text-white py-2 px-4 rounded ml-4">Upload</button>
        </div>
      </div>

      <div className="w-full md:w-1/5 p-4 ml-40 mr-20">
        <h2 className="text-2xl font-bold text-center">Problem Solving Progress</h2>
        <Pie data={data} />
      </div>

      <div className="w-full md:w-1/5 p-4 mr-40 ml-10">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-center">Current Planet</h2>
          <img src={planetimage} alt="Planet" />
          <p className="mt-4 mb-2 text-lg font-medium text-gray-900">You are on planet {planetName}</p>
        </div>
      </div>

      <div className="w-full mt-4">
        <CalendarHeatmap
          startDate={new Date('2023-12-31')}
          endDate={new Date('2024-12-31')}
          values={dates}
          monthLabels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
        />
        <h1 className="text-3xl font-bold text-center mt-4">Last Submissions</h1>
        <table className="table-auto w-full mt-4">
          <thead>
            <tr>
              <th className="px-4 py-2">Problem Name</th>
              <th className="px-4 py-2">Code</th>
              <th className="px-4 py-2">Verdict</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map(submission => (
              <tr key={submission._id}>
                <td className="border px-4 py-2">{submission.problemId ? submission.problemId.name : 'Unknown'}</td>
                <td className="border px-4 py-2">
                  <pre style={{maxHeight: expandedCode[submission._id] ? 'none' : '2em', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                    {submission.code}
                  </pre>
                  <button className="text-blue-500" onClick={() => toggleCode(submission._id)}>
                    {expandedCode[submission._id] ? 'Show less' : 'Show more'}
                  </button>
                </td>
                <td className="border px-4 py-2">{submission.verdict}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Profile;
