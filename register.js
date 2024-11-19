// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

// const Register = () => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isLoading, setIsLoading] = useState(false); // Loading state
//   const navigate = useNavigate();  // Use navigate hook for programmatic navigation

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Reset error and set loading state
//     setError('');
//     setIsLoading(true);

//     // Simulating form validation
//     if (!username || !email || !password) {
//       setError('Please fill out all fields.');
//       setIsLoading(false);
//       return;
//     }

//     // Here you would typically send a request to the backend to register the user.
//     // Simulating a successful registration response.
//     setTimeout(() => {
//       alert('Registration Successful!');
//       setIsLoading(false);
//       navigate('/dashboard'); // Navigate to the dashboard after registration
//     }, 2000);
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <div className="card shadow-lg p-4">
//             <h2 className="text-center mb-4">Register</h2>

//             {error && <div className="alert alert-danger">{error}</div>}

//             <form onSubmit={handleSubmit}>
//               <div className="form-group">
//                 <label htmlFor="username">Username</label>
//                 <input
//                   type="text"
//                   id="username"
//                   className="form-control"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   placeholder="Enter your username"
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="email">Email</label>
//                 <input
//                   type="email"
//                   id="email"
//                   className="form-control"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   placeholder="Enter your email"
//                   required
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="password">Password</label>
//                 <input
//                   type="password"
//                   id="password"
//                   className="form-control"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   placeholder="Enter your password"
//                   required
//                 />
//               </div>

//               <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
//                 {isLoading ? 'Registering...' : 'Register'}
//               </button>
//             </form>

//             <div className="text-center mt-3">
//               Already have an account? <a href="/login">Login</a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register; 
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cgpa, setCgpa] = useState('');
  const [sgpa, setSgpa] = useState('');
  const [phoneNumber, setPhoneNumber] = useState(''); // New state for phone number
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
  
    // Validation check
    if (!username || !email || !password || !cgpa || !sgpa || !phoneNumber) {
      setError('Please fill out all fields.');
      setIsLoading(false);
      return;
    }
  
    // Check GPA conditions
    if (parseFloat(cgpa) < 7.75) {
      setError('CGPA should be above 7.75 to apply for scholarships.');
      setIsLoading(false);
      return;
    }
  
    // Log the request payload for debugging
    console.log({
      username,
      email,
      password,
      cgpa,
      sgpa,
      phoneNumber,
    });
  
    // Send data to backend
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password, cgpa, sgpa, phoneNumber }), // Include phone number
      });
  
      const data = await response.json();
      console.log(data); // Log the response data for debugging
  
      if (response.ok) {
        alert(data.message); // Show the success message
        setIsLoading(false);
        navigate('/dashboard'); // Navigate to dashboard on successful registration
      } else {
        setError(data.message || 'Registration failed. Please try again.');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again later.');
      setIsLoading(false);
    }
  };
  

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg p-4">
            <h2 className="text-center mb-4">Register</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} // Update state here
                  placeholder="Enter your username"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Update state here
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Update state here
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="cgpa">CGPA</label>
                <input
                  type="number"
                  id="cgpa"
                  className="form-control"
                  value={cgpa}
                  onChange={(e) => setCgpa(e.target.value)} // Update state here
                  placeholder="Enter your CGPA"
                  step="0.01"
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="sgpa">SGPA</label>
                <input
                  type="number"
                  id="sgpa"
                  className="form-control"
                  value={sgpa}
                  onChange={(e) => setSgpa(e.target.value)} // Update state here
                  placeholder="Enter your SGPA"
                  step="0.01"
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input
                  type="text"
                  id="phoneNumber"
                  className="form-control"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)} // Update state here
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
                {isLoading ? 'Registering...' : 'Register'}
              </button>
            </form>

            <div className="text-center mt-3">
              Already have an account? <a href="/login">Login</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
