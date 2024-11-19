// import React, { useState } from 'react';

// const BankForm = () => {
//   const [bankDetails, setBankDetails] = useState({
//     Bank_Name: '',
//     Bank_Account_No: '',
//     IFSC_Code: '',
//     Student_ID: ''
//   });
//   const [message, setMessage] = useState('');

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setBankDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://localhost:5000/api/bank/add', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(bankDetails),
//       });

//       if (response.ok) {
//         setMessage('Bank details submitted successfully!');
//         setBankDetails({
//           Bank_Name: '',
//           Bank_Account_No: '',
//           IFSC_Code: '',
//           Student_ID: ''
//         });
//       } else {
//         const errorData = await response.json();
//         setMessage(`Failed to submit bank details: ${errorData.message}`);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setMessage('An error occurred. Please try again later.');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} style={formStyle}>
//       <h2>Bank Details Form</h2>

//       <label style={labelStyle}>Bank Name:</label>
//       <input
//         type="text"
//         name="Bank_Name"
//         value={bankDetails.Bank_Name}
//         onChange={handleChange}
//         style={inputStyle}
//         required
//       />

//       <label style={labelStyle}>Bank Account Number:</label>
//       <input
//         type="text"
//         name="Bank_Account_No"
//         value={bankDetails.Bank_Account_No}
//         onChange={handleChange}
//         style={inputStyle}
//         required
//       />

//       <label style={labelStyle}>IFSC Code:</label>
//       <input
//         type="text"
//         name="IFSC_Code"
//         value={bankDetails.IFSC_Code}
//         onChange={handleChange}
//         style={inputStyle}
//         required
//       />

//       <label style={labelStyle}>Student ID:</label>
//       <input
//         type="text"
//         name="Student_ID"
//         value={bankDetails.Student_ID}
//         onChange={handleChange}
//         style={inputStyle}
//         required
//       />

//       <button type="submit" style={submitButtonStyle}>Submit</button>
//       {message && <p style={messageStyle}>{message}</p>}
//     </form>
//   );
// };

// // Styling
// const formStyle = {
//   width: '300px',
//   margin: 'auto',
//   padding: '20px',
//   backgroundColor: '#f4f4f4',
//   borderRadius: '5px',
// };

// const labelStyle = {
//   display: 'block',
//   marginBottom: '5px',
//   fontWeight: 'bold',
// };

// const inputStyle = {
//   width: '100%',
//   padding: '8px',
//   marginBottom: '10px',
//   border: '1px solid #ccc',
//   borderRadius: '5px',
// };

// const submitButtonStyle = {
//   padding: '10px 20px',
//   backgroundColor: '#4CAF50',
//   color: '#fff',
//   border: 'none',
//   borderRadius: '5px',
//   cursor: 'pointer',
// };

// const messageStyle = {
//   marginTop: '10px',
//   fontWeight: 'bold',
//   color: 'green',
// };

// export default BankForm;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

const BankForm = () => {
  const [bankDetails, setBankDetails] = useState({
    Bank_Name: '',
    Bank_Account_No: '',
    IFSC_Code: '',
    Student_ID: ''
  });
  const [message, setMessage] = useState('');

  const navigate = useNavigate(); // Initialize the navigate function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBankDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/bank/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bankDetails),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(data.message); // Set the success message from the backend
        setBankDetails({
          Bank_Name: '',
          Bank_Account_No: '',
          IFSC_Code: '',
          Student_ID: ''
        });
        
        // Navigate to the admin page after form submission
        navigate('/admin'); // Adjust this based on your routing setup
      } else {
        const errorData = await response.json();
        setMessage(`Failed to submit bank details: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <h2>Bank Details Form</h2>

      <label style={labelStyle}>Bank Name:</label>
      <input
        type="text"
        name="Bank_Name"
        value={bankDetails.Bank_Name}
        onChange={handleChange}
        style={inputStyle}
        required
      />

      <label style={labelStyle}>Bank Account Number:</label>
      <input
        type="text"
        name="Bank_Account_No"
        value={bankDetails.Bank_Account_No}
        onChange={handleChange}
        style={inputStyle}
        required
      />

      <label style={labelStyle}>IFSC Code:</label>
      <input
        type="text"
        name="IFSC_Code"
        value={bankDetails.IFSC_Code}
        onChange={handleChange}
        style={inputStyle}
        required
      />

      <label style={labelStyle}>Student ID:</label>
      <input
        type="text"
        name="Student_ID"
        value={bankDetails.Student_ID}
        onChange={handleChange}
        style={inputStyle}
        required
      />

      <button type="submit" style={submitButtonStyle}>Submit</button>
      {message && <p style={messageStyle}>{message}</p>}
    </form>
  );
};

// Styling
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

export default BankForm;
