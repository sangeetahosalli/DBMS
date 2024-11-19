import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomePage.css'; // Custom CSS for additional styling
import logo from '../assets/image.png';

const HomePage = () => {
  return (
    <div className="hero-section container-fluid d-flex justify-content-center align-items-center">
      <div className="content-box text-center p-5 shadow-lg rounded">
        {/* Logo */}
        <img
          src={logo}
          alt="University Scholarship Management"
          className="logo mb-4"
        />

        <h1 className="display-4 font-weight-bold text-primary mb-3">
          Welcome to Scholarship Management
        </h1>
        <p className="lead text-secondary mb-5">
          Discover scholarships, apply online, and stay updated with important notifications.
        </p>

        <div className="button-group">
          <Link to="/login" className="btn btn-primary btn-lg mx-2">
            Login
          </Link>
          <Link to="/register" className="btn btn-outline-secondary btn-lg mx-2">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
