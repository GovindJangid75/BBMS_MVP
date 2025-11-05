import React from 'react';
import '../../styles/Spinner.css';

const Spinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner-border text-danger" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
