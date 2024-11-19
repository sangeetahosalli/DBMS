// import React, { useEffect, useReducer } from 'react';
// import studentService from '../services/studentService';
// import applicationService from '../services/applicationService';
// import LoadingSkeleton from '../components/LoadingSkeleton';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useNavigate } from 'react-router-dom';

// // Initial state for the reducer
// const initialState = {
//   scholarships: [],
//   notifications: [],
//   loading: true,
//   error: null,
// };

// // Reducer function to manage state
// const dashboardReducer = (state, action) => {
//   switch (action.type) {
//     case 'FETCH_SUCCESS':
//       return {
//         ...state,
//         scholarships: action.scholarships,
//         notifications: action.notifications,
//         loading: false,
//       };
//     case 'FETCH_ERROR':
//       return { ...state, error: action.error, loading: false };
//     case 'UPDATE_NOTIFICATIONS':
//       return { ...state, notifications: action.notifications };
//     case 'SUBMIT_ERROR':
//       return { ...state, error: action.error };
//     default:
//       return state;
//   }
// };

// const Dashboard = () => {
//   const [state, dispatch] = useReducer(dashboardReducer, initialState);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [scholarshipsResponse, notificationsResponse] = await Promise.all([
//           studentService.getScholarships(),
//           studentService.getNotifications(),
//         ]);

//         dispatch({
//           type: 'FETCH_SUCCESS',
//           scholarships: scholarshipsResponse.data,
//           notifications: notificationsResponse.data,
//         });
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         dispatch({ type: 'FETCH_ERROR', error: 'Error fetching data. Please try again later.' });
//       }
//     };

//     // Fetch data on mount
//     fetchData();

//     // Poll for new notifications every 5 seconds
//     const intervalId = setInterval(async () => {
//       try {
//         const notificationsResponse = await studentService.getNotifications();
//         dispatch({
//           type: 'UPDATE_NOTIFICATIONS',
//           notifications: notificationsResponse.data,
//         });
//       } catch (error) {
//         console.error('Error fetching notifications:', error);
//       }
//     }, 5000); // polling every 5 seconds

//     // Cleanup interval on unmount
//     return () => clearInterval(intervalId);
//   }, []);

//   const handleApply = async (scholarshipId) => {
//     try {
//       const scholarship = state.scholarships.find(
//         (scholarship) => scholarship.Scholarship_ID === scholarshipId
//       );

//       if (!scholarship) {
//         throw new Error('Scholarship not found');
//       }

//       // Display a message based on the scholarship type
//       const typeMessages = {
//         CNR: 'You are applying for a CNR scholarship!',
//         MRD: 'You are applying for an MRD scholarship!',
//         DISTINCTION: 'You are applying for a Distinction scholarship!',
//       };

//       alert(typeMessages[scholarship.Type] || 'You are applying for a generic scholarship.');

//       // Submit the application
//       await applicationService.submitApplication(scholarshipId);
//       alert('Application submitted successfully!');
//       navigate('/applicationForm');
//     } catch (error) {
//       console.error('Error submitting application:', error);
//       dispatch({ type: 'SUBMIT_ERROR', error: 'Failed to submit application.' });
//     }
//   };

//   const { scholarships, notifications, loading, error } = state;

//   if (loading) return <LoadingSkeleton />;

//   if (error) return <div className="alert alert-danger">{error}</div>;

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center mb-4">Welcome to your Dashboard</h2>

//       <div className="row">
//         {/* Scholarship List Section */}
//         <div className="col-md-6">
//           <div className="card">
//             <div className="card-header bg-primary text-white">
//               <h5>Available Scholarships</h5>
//             </div>
//             <div className="card-body">
//               <ScholarshipList scholarships={scholarships} onApply={handleApply} />
//             </div>
//           </div>
//         </div>

//         {/* Notification Section */}
//         <div className="col-md-6">
//           <div className="card">
//             <div className="card-header bg-info text-white">
//               <h5>Notifications</h5>
//             </div>
//             <div className="card-body">
//               <NotificationList notifications={notifications} />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Scholarships List Component
// const ScholarshipList = ({ scholarships, onApply }) => {
//   if (scholarships.length === 0) {
//     return <p>No scholarships available at the moment.</p>;
//   }

//   return (
//     <ul className="list-group">
//       {scholarships.map((scholarship) => (
//         <li key={scholarship.Scholarship_ID} className="list-group-item">
//           {/* Convert the scholarship name to uppercase */}
//           <h4>{scholarship.Type.toUpperCase()}</h4>
//           <p>{scholarship.Description}</p>
//           <button
//             className="btn btn-success"
//             onClick={() => onApply(scholarship.Scholarship_ID)}
//           >
//             Apply
//           </button>
//         </li>
//       ))}
//     </ul>
//   );
// };

// // Notifications List Component
// const NotificationList = ({ notifications }) => {
//   if (notifications.length === 0) {
//     return <p>No new notifications.</p>;
//   }

//   return (
//     <ul className="list-group">
//       {notifications.map((notification) => (
//         <li key={notification.Notification_ID} className="list-group-item">
//           <h5>Notification ID: {notification.Notification_ID}</h5>
//           <p><strong>Text:</strong> {notification.Notification_Text}</p>
//           <p><strong>Date:</strong> {notification.Notification_Date}</p>
//           <p><strong>Student ID:</strong> {notification.Student_ID}</p>
//           <p><strong>Application ID:</strong> {notification.Application_ID}</p>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate


const StudentDashboard = () => {
  const [scholarships, setScholarships] = useState([]); // List of scholarships
  const [scholarshipCounts, setScholarshipCounts] = useState([]); // Store procedure results
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form state for new scholarship
  const [newScholarship, setNewScholarship] = useState({
    Scholarship_Name: '',
    Criteria: '',
    Amount: ''
  });

  const navigate = useNavigate();  // Initialize navigate

  // Fetch scholarship count data (results from stored procedure)
  useEffect(() => {
    // Fetch scholarship count data (results from stored procedure)
    axios.get('http://localhost:5000/api/scholarships/count')
      .then(response => {
        setScholarshipCounts(response.data); // Store scholarship count data
      })
      .catch(error => {
        console.error('Error fetching scholarship counts:', error);
        setError('Failed to load scholarship counts. Please try again later.');
      });

    // Fetch existing scholarships
    axios.get('http://localhost:5000/api/student/scholarships')
      .then(response => {
        setScholarships(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching scholarships:', error);
        setError('Failed to load scholarships. Please try again later.');
        setIsLoading(false);
      });
  }, []);

  // Handle input change for the new scholarship form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewScholarship({ ...newScholarship, [name]: value });
  };

  // Handle scholarship name change and set default amount and criteria
  const handleScholarshipNameChange = (e) => {
    const selectedScholarship = e.target.value;

    let criteria = '';
    switch (selectedScholarship) {
      case 'MRD':
        criteria = 'CGPA > 9';
        break;
      case 'CNR':
        criteria = 'CGPA > 8.5';
        break;
      case 'DISTINCTION':
        criteria = 'CGPA > 7.75';
        break;
      default:
        criteria = '';
    }

    setNewScholarship({
      ...newScholarship,
      Scholarship_Name: selectedScholarship,
      Criteria: criteria,
      Amount: ''  // Allow the user to input the amount
    });
  };

  // Submit new scholarship and navigate to application form
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate input
    if (!newScholarship.Scholarship_Name || !newScholarship.Criteria || !newScholarship.Amount) {
      alert('Please fill out all fields');
      return;
    }

    // Make an Axios POST request to add the scholarship to the backend
    axios.post('http://localhost:5000/api/scholarships', newScholarship)
      .then(response => {
        setScholarships([...scholarships, response.data]);

        // Reset the form after successful submission
        setNewScholarship({
          Scholarship_Name: '',
          Criteria: '',
          Amount: ''
        });

        // Navigate to the application form page after adding the scholarship
        navigate('/applicationform');
      })
      .catch(error => {
        console.error('Error adding scholarship:', error);
        setError('Failed to add scholarship. Please try again.');
      });
  };

  // Show loading state if data is being fetched
  if (isLoading) {
    return <div className="loading-indicator">Loading...</div>;
  }

  // Show error message if there is an error fetching or submitting data
  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="container mt-5">
      <h1>Student Dashboard</h1>

      {/* Add New Scholarship Form */}
      <h2 className="mt-5">Scholarship</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="Scholarship_Name" className="form-label"></label>
          <select
            className="form-control"
            id="Scholarship_Name"
            name="Scholarship_Name"
            value={newScholarship.Scholarship_Name}
            onChange={handleScholarshipNameChange}
            required
          >
            <option value="">Select Scholarship</option>
            <option value="MRD">MRD</option>
            <option value="CNR">CNR</option>
            <option value="DISTINCTION">DISTINCTION</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="Criteria" className="form-label">Criteria</label>
          <textarea
            className="form-control"
            id="Criteria"
            name="Criteria"
            rows="3"
            value={newScholarship.Criteria}
            onChange={handleInputChange}
            required
            readOnly
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="Amount" className="form-label">Amount</label>
          <input
            type="number"
            className="form-control"
            id="Amount"
            name="Amount"
            value={newScholarship.Amount}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Scholarship</button>
      </form>

      {/* Display existing scholarships */}
      <h2 className="mt-5">Available Scholarships</h2>
      <ul>
        {scholarships.map((scholarship) => (
          <li key={scholarship.Scholarship_ID}>
            {scholarship.Scholarship_Name} - {scholarship.Amount} - {scholarship.Criteria}
          </li>
        ))}
      </ul>

      {/* Display scholarship count data */}
      <h2 className="mt-5">Scholarship Count by Criteria</h2>
      <table className="table">
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

export default StudentDashboard;
