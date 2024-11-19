import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('Admin');
  const [message, setMessage] = useState(null);

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    if (!name || !email) {
      setMessage('Name and Email are required');
      return;
    }

    const newAdmin = { Name: name, Email: email, Role: role };

    try {
      const response = await axios.post('http://localhost:5000/addAdmin', newAdmin);
      setMessage(response.data.message);
      setName('');
      setEmail('');
      setRole('Admin');
    } catch (error) {
      console.error('There was an error adding the admin:', error);
      setMessage(error.response?.data?.message || 'Failed to add admin');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Add New Admin</h2>

      {/* Success/Error Message */}
      {message && <div className="alert alert-info">{message}</div>}

      {/* Add Admin Form */}
      <form onSubmit={handleAddAdmin} className="mb-4">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <select
            className="form-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Admin">Admin</option>
            <option value="Super Admin">Super Admin</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Add Admin</button>
      </form>
    </div>
  );
};

export default App;
