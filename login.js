import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Initialize the navigate function

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Validate form inputs
  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError('Please fill out both fields.');
      return false;
    }
    return true;
  };

  // Handle the submit event
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');  // Reset the error message on each submit
  
    if (!validateForm()) return;  // If validation fails, stop here
  
    setIsLoading(true);  // Show loading spinner or text
  
    try {
      // Call the login service
      const response = await loginUser(formData);
      console.log('User logged in:', response.data);
  
      // Save the JWT token in local storage
      localStorage.setItem('token', response.data.token);
  
      // Navigate to the dashboard
      navigate('/dashboard');  // Navigate to the dashboard page after successful login
    } catch (err) {
      // Display the error message
      console.error('Login failed:', err.response ? err.response.data : err.message);
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);  // Hide loading state
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg p-4">
            <h2 className="text-center mb-4">Login</h2>

            {/* Display error if it exists */}
            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary btn-block" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <div className="d-flex justify-content-between mt-3">
              <div>
                <a href="/forgot-password">Forgot password?</a>
              </div>
              <div>
                Don't have an account? <a href="/register">Sign up</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
