import React from 'react';
import '../assets/css/skeleton.css';

const LoadingSkeleton = () => {
  return (
    <div className="loading-skeleton">
      <div className="skeleton-header"></div>
      <div className="skeleton-list"></div>
      <div className="skeleton-list"></div>
      <div className="skeleton-list"></div>
    </div>
  );
};

export default LoadingSkeleton;
