import React from 'react';
import { useLocation } from 'react-router-dom';

function Book() {
  const location = useLocation();
  const { answers } = location.state || { answers: {} };

  return (
    <div className="Book">
      <h1>Saved Information</h1>
      <p><strong>Name:</strong> {answers.name}</p>
      <p><strong>Gender:</strong> {answers.gender}</p>
      <p><strong>Interest:</strong> {answers.interest}</p>
    </div>
  );
}

export default Book;
