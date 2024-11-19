// // // src/components/ApplyForm.js
// import React, { useState } from 'react';

// const ApplyForm = () => {
//   const [applicationData, setApplicationData] = useState({
//     studentName: '',
//     scholarshipType: 'CNR', // Default scholarship type
//     bankDetails: {
//       accountNumber: '',
//       ifscCode: '',
//     },
//     applicationDate: '',
//   });

//   const [message, setMessage] = useState(null); // Success/Error message

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Basic validation
//     if (!applicationData.studentName || !applicationData.applicationDate || !applicationData.bankDetails.accountNumber || !applicationData.bankDetails.ifscCode) {
//       setMessage('Please fill in all fields.');
//       return;
//     }

//     // Sending the POST request with the application data
//     try {
//       const response = await fetch('http://localhost:5000/apply', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(applicationData),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setMessage('Application submitted successfully!');
//         console.log('Success:', data);
//       } else {
//         setMessage('Failed to submit the application. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setMessage('An error occurred. Please try again later.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} style={formStyle}>
//       <h2>Apply for Scholarship</h2>

//       {/* Student Name Field */}
//       <label style={labelStyle}>Student Name:</label>
//       <input
//         type="text"
//         placeholder="Student Name"
//         value={applicationData.studentName}
//         onChange={(e) =>
//           setApplicationData({
//             ...applicationData,
//             studentName: e.target.value,
//           })
//         }
//         style={inputStyle}
//         required
//       />

//       {/* Scholarship Type Field */}
//       <label style={labelStyle}>Scholarship Type:</label>
//       <select
//         value={applicationData.scholarshipType}
//         onChange={(e) =>
//           setApplicationData({
//             ...applicationData,
//             scholarshipType: e.target.value,
//           })
//         }
//         style={inputStyle}
//       >
//         <option value="CNR">CNR</option>
//         <option value="MRD">MRD</option>
//         <option value="DISTINCTION">Distinction</option>
//       </select>

//       {/* Bank Account Number Field */}
//       <label style={labelStyle}>Bank Account Number:</label>
//       <input
//         type="text"
//         placeholder="Account Number"
//         value={applicationData.bankDetails.accountNumber}
//         onChange={(e) =>
//           setApplicationData({
//             ...applicationData,
//             bankDetails: {
//               ...applicationData.bankDetails,
//               accountNumber: e.target.value,
//             },
//           })
//         }
//         style={inputStyle}
//         required
//       />

//       {/* IFSC Code Field */}
//       <label style={labelStyle}>IFSC Code:</label>
//       <input
//         type="text"
//         placeholder="IFSC Code"
//         value={applicationData.bankDetails.ifscCode}
//         onChange={(e) =>
//           setApplicationData({
//             ...applicationData,
//             bankDetails: {
//               ...applicationData.bankDetails,
//               ifscCode: e.target.value,
//             },
//           })
//         }
//         style={inputStyle}
//         required
//       />

//       {/* Application Date Field */}
//       <label style={labelStyle}>Application Date:</label>
//       <input
//         type="date"
//         value={applicationData.applicationDate}
//         onChange={(e) =>
//           setApplicationData({
//             ...applicationData,
//             applicationDate: e.target.value,
//           })
//         }
//         style={inputStyle}
//         required
//       />

//       {/* Submit Button */}
//       <button type="submit" style={buttonStyle}>Submit Application</button>

//       {/* Display Success or Error Message */}
//       {message && <p style={messageStyle}>{message}</p>}
//     </form>
//   );
// };

// // Basic styles for the form
// const formStyle = { display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: 'auto' };
// const labelStyle = { marginTop: '10px', fontWeight: 'bold' };
// const inputStyle = { marginTop: '5px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' };
// const buttonStyle = { marginTop: '15px', padding: '10px', borderRadius: '4px', backgroundColor: '#007BFF', color: 'white', cursor: 'pointer', border: 'none' };
// const messageStyle = { marginTop: '10px', color: 'green', fontWeight: 'bold' };

// export default ApplyForm;


// import React, { useState } from 'react';

// const ApplyForm = () => {
//   const [applicationData, setApplicationData] = useState({
//     studentName: '',
//     scholarshipType: 'CNR', // Default scholarship type
//     bankDetails: {
//       accountNumber: '',
//       ifscCode: '',
//     },
//     applicationDate: '',
//   });

//   const [message, setMessage] = useState(null); // Success/Error message

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Basic validation
//     if (!applicationData.studentName || !applicationData.applicationDate || !applicationData.bankDetails.accountNumber || !applicationData.bankDetails.ifscCode) {
//       setMessage('Please fill in all fields.');
//       return;
//     }

//     // Validate bank details first
//     try {
//       const bankValidationResponse = await fetch('http://localhost:5000/validate-bank', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(applicationData.bankDetails),
//       });

//       const bankValidationResult = await bankValidationResponse.json();
//       if (!bankValidationResult.isValid) {
//         setMessage('Invalid bank details. Please check your account number and IFSC code.');
//         return;
//       }
//     } catch (error) {
//       console.error('Error validating bank details:', error);
//       setMessage('Error validating bank details. Please try again later.');
//       return;
//     }

//     // Sending the POST request with the application data
//     try {
//       const response = await fetch('http://localhost:5000/apply', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(applicationData),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setMessage('Application submitted successfully!');
//         console.log('Success:', data);
//       } else {
//         setMessage('Failed to submit the application. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setMessage('An error occurred. Please try again later.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} style={formStyle}>
//       <h2>Apply for Scholarship</h2>

//       {/* Student Name Field */}
//       <label style={labelStyle}>Student Name:</label>
//       <input
//         type="text"
//         placeholder="Student Name"
//         value={applicationData.studentName}
//         onChange={(e) =>
//           setApplicationData({
//             ...applicationData,
//             studentName: e.target.value,
//           })
//         }
//         style={inputStyle}
//         required
//       />

//       {/* Scholarship Type Field */}
//       <label style={labelStyle}>Scholarship Type:</label>
//       <select
//         value={applicationData.scholarshipType}
//         onChange={(e) =>
//           setApplicationData({
//             ...applicationData,
//             scholarshipType: e.target.value,
//           })
//         }
//         style={inputStyle}
//       >
//         <option value="CNR">CNR</option>
//         <option value="MRD">MRD</option>
//         <option value="DISTINCTION">Distinction</option>
//       </select>

//       {/* Bank Account Number Field */}
//       <label style={labelStyle}>Bank Account Number:</label>
//       <input
//         type="text"
//         placeholder="Account Number"
//         value={applicationData.bankDetails.accountNumber}
//         onChange={(e) =>
//           setApplicationData({
//             ...applicationData,
//             bankDetails: {
//               ...applicationData.bankDetails,
//               accountNumber: e.target.value,
//             },
//           })
//         }
//         style={inputStyle}
//         required
//       />

//       {/* IFSC Code Field */}
//       <label style={labelStyle}>IFSC Code:</label>
//       <input
//         type="text"
//         placeholder="IFSC Code"
//         value={applicationData.bankDetails.ifscCode}
//         onChange={(e) =>
//           setApplicationData({
//             ...applicationData,
//             bankDetails: {
//               ...applicationData.bankDetails,
//               ifscCode: e.target.value,
//             },
//           })
//         }
//         style={inputStyle}
//         required
//       />

//       {/* Application Date Field */}
//       <label style={labelStyle}>Application Date:</label>
//       <input
//         type="date"
//         value={applicationData.applicationDate}
//         onChange={(e) =>
//           setApplicationData({
//             ...applicationData,
//             applicationDate: e.target.value,
//           })
//         }
//         style={inputStyle}
//         required
//       />

//       {/* Submit Button */}
//       <button type="submit" style={buttonStyle}>Submit Application</button>

//       {/* Display Success or Error Message */}
//       {message && <p style={messageStyle}>{message}</p>}
//     </form>
//   );
// };

// // Basic styles for the form
// const formStyle = { display: 'flex', flexDirection: 'column', maxWidth: '400px', margin: 'auto' };
// const labelStyle = { marginTop: '10px', fontWeight: 'bold' };
// const inputStyle = { marginTop: '5px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' };
// const buttonStyle = { marginTop: '15px', padding: '10px', borderRadius: '4px', backgroundColor: '#007BFF', color: 'white', cursor: 'pointer', border: 'none' };
// const messageStyle = { marginTop: '10px', color: 'green', fontWeight: 'bold' };

// export default ApplyForm;


// import Notification from './Notification'; // Adjust the path as needed


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';



const ApplyForm = () => {
  const [applicationData, setApplicationData] = useState({
    application_id: '', // Added application_id to the state
    application_date: '',
    status: 'pending',
    student_id: '',
    scholarship_id: '20',
    admin_id: '1'
  });

  const [message, setMessage] = useState(null);
  const navigate = useNavigate(); // Corrected this line

  // Generate a unique application ID (for example, using the current timestamp)
  const generateApplicationId = () => {
    return `APP-${Date.now()}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure all fields are filled
    if (!applicationData.student_id || !applicationData.scholarship_id || !applicationData.admin_id || 
        !applicationData.application_date || !applicationData.status) {
      setMessage('Please fill in all fields.');
      return;
    }

    // Generate application ID before submitting
    const applicationId = generateApplicationId();

    // Update the application data with the generated application ID
    const applicationDataPayload = {
      application_id: applicationId,
      application_date: applicationData.application_date,
      status: applicationData.status,
      student_id: applicationData.student_id,
      scholarship_id: applicationData.scholarship_id,
      admin_id: applicationData.admin_id,
    };

    try {
      // Send data to the backend
      const response = await fetch('http://localhost:5000/apply/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(applicationDataPayload),
      });

      // Handle the response from the server
      if (response.ok) {
        const data = await response.json();
        setMessage('Application submitted successfully!');
        console.log('Backend Response:', data);
        navigate('/bank'); // Redirect to the bank page
      } else {
        // Handle non-200 responses
        const errorData = await response.json();
        setMessage(`Failed to submit the application: ${errorData.message || 'Please try again.'}`);
      }
    } catch (error) {
      // Catch any unexpected errors during the fetch process
      console.error('Error:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2>Apply for Scholarship</h2>

      <label style={labelStyle}>Application ID:</label>
      <input
        type="text"
        value={applicationData.application_id || generateApplicationId()}  // Automatically set the application ID
        disabled
        style={inputStyle}
      />

      <label style={labelStyle}>Application Date:</label>
      <input
        type="date"
        value={applicationData.application_date}
        onChange={(e) =>
          setApplicationData({
            ...applicationData,
            application_date: e.target.value,
          })
        }
        style={inputStyle}
        required
      />

      <label style={labelStyle}>Status:</label>
      <input
        type="text"
        placeholder="Status"
        value={applicationData.status}
        onChange={(e) =>
          setApplicationData({
            ...applicationData,
            status: e.target.value,
          })
        }
        style={inputStyle}
        required
      />

      <label style={labelStyle}>Student ID:</label>
      <input
        type="text"
        placeholder="Student ID"
        value={applicationData.student_id}
        onChange={(e) =>
          setApplicationData({
            ...applicationData,
            student_id: e.target.value,
          })
        }
        style={inputStyle}
        required
      />

      <label style={labelStyle}>Scholarship ID:</label>
      <input
        type="text"
        placeholder="Scholarship ID"
        value={applicationData.scholarship_id}
        onChange={(e) =>
          setApplicationData({
            ...applicationData,
            scholarship_id: e.target.value,
          })
        }
        style={inputStyle}
        required
      />

      <label style={labelStyle}>Admin ID:</label>
      <input
        type="text"
        placeholder="Admin ID"
        value={applicationData.admin_id}
        onChange={(e) =>
          setApplicationData({
            ...applicationData,
            admin_id: e.target.value,
          })
        }
        style={inputStyle}
        required
      />

      <button type="submit" style={submitButtonStyle}>
        Fill Bank Details
      </button>

      {message && <p style={messageStyle}>{message}</p>}
    </form>
  );
};

// Styling (unchanged)
const formStyle = {
  width: '300px',
  margin: 'auto',
  padding: '20px',
  backgroundColor: '#f4f4f4',
  borderRadius: '5px',
};

const labelStyle = {
  display: 'block',
  marginBottom: '5px',
  fontWeight: 'bold',
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  marginBottom: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
};

const submitButtonStyle = {
  padding: '10px 20px',
  backgroundColor: '#4CAF50',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const messageStyle = {
  marginTop: '10px',
  fontWeight: 'bold',
  color: 'green',
};

export default ApplyForm;


