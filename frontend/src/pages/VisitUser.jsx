import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';

const VisitUser = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const[dates,setdates]=useState([]);
  useEffect(() => {
    axios.get(`http://localhost:8080/api/users/${userId}`, {
      headers: {
        'Authorization':localStorage.getItem('token'),
      }
    })
      .then(response => {
        setUser(response.data.user);
       
        setSubmissions(response.data.submissions);
        const date= response.data.submissions.map(submission => {
            const dateString = submission.submittedAt.split('T')[0];
      return { date: dateString };
          });
              setdates(date);
      })
      .catch(error => console.error('Error fetching user submissions:', error));
  }, [userId]);
  
  if (!user) return <div>Loading...</div>;
  //console.log("hi");
  return (
    <div className="container mx-auto p-4">
    
    <CalendarHeatmap
  startDate={new Date('2023-12-31')}
  endDate={new Date('2024-12-31')}
  values={dates}
  monthLabels={['Jan','Feb','mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']}
  // weekdayLabels={['Jan','Feb','mar','Apr','May','Jun','Jul']}
/>
      <h1 className="text-3xl font-bold text-center">{user[0].firstname} Profile</h1>
      <h2 className="text-2xl mt-4">Submissions</h2>
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

export default VisitUser;
