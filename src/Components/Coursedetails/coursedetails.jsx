// src/Course.js
import React from 'react';

const Coursedetails = ({ course }) => {
  return (
    <div className="course">
      <h3>title</h3>
      <p>Instructor: </p>
      <p>Duration: </p>
      <p>Price</p>
      <button>Buy Now</button>
      <button>Download Syllabus</button>
    </div>
  );
};

export default Coursedetails;