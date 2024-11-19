import React, { useState, useEffect } from 'react';

const ScholarshipCountDashboard = () => {
  const [scholarshipCounts, setScholarshipCounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the data from the backend API
    fetch('http://localhost:5000/api/scholarships/count')
      .then(response => response.json())
      .then(data => {
        setScholarshipCounts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Scholarship Count by Criteria</h2>
      <table>
        <thead>
          <tr>
            <th>Criteria</th>
            <th>Scholarship Count</th>
          </tr>
        </thead>
        <tbody>
          {scholarshipCounts.map((item, index) => (
            <tr key={index}>
              <td>{item.Criteria}</td>
              <td>{item.Scholarship_Count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScholarshipCountDashboard;
