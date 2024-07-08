import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext.jsx';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
const Profile = () => {
  const [user, setUser] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const[dates,setdates]=useState([]);
  
  const { handleUnauthorized } = useContext(AuthContext);
  
  useEffect(() => {
    axios.get('http://localhost:8080/api/submissions', {
      headers: {
        'Authorization': localStorage.getItem('token') // Attach the token to the request
      }
    })
    .then(response => {
      setUser(response.data.user);
      
      setSubmissions(response.data.submissions);
      //console.log(response.data.user);
      const date= response.data.submissions.map(submission => {
          const dateString = submission.submittedAt.split('T')[0];
    return { date: dateString };
        });
            setdates(date);
    })
    .catch(error => {
      if (error.response && error.response.status === 401) {
        handleUnauthorized();
      } else {
        console.error('Error fetching submissions:', error);
      }
  });
  }, [handleUnauthorized]);
  
  if (!user) return <div>Loading...</div>;
  console.log(user[0].firstname);
return (
  <div className="container mx-auto p-4">
    <div className="p-5 border rounded text-center text-gray-500 max-w-sm mx-auto mb-6">
      <img className="w-32 h-32 rounded-full mx-auto" src="https://loremflickr.com/320/320/girl" alt="Profile" />
      <div className="text-sm mt-5">
        <p href="#"
          className="font-medium leading-none text-gray-900 hover:text-indigo-600 transition duration-500 ease-in-out">{user[0].firstname} {user[0].lastname}
        </p>
        <p>Blogger &amp; Youtuber</p>
      </div>
      <p className="mt-2 text-sm text-gray-900">Lorem ipsum dolor sit amet, consecte adipisicing elit. Voluptatibus quia
        Maiores et perferendis eaque.</p>
      <div className="flex mt-4 justify-center">
        
      </div>
    </div>

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
            <td className="border px-4 py-2"><pre>{submission.code}</pre></td>
            <td className="border px-4 py-2">{submission.verdict}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
};

export default Profile;