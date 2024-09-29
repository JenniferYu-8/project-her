// Books.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Books() {
  const location = useLocation();
  const { answers } = location.state; // Get answers from location state
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Assuming the API can fetch user data based on name
        const response = await axios.get('http://127.0.0.1:5000/api/get-user-data', {
          params: {
            name: answers.name, // This should be valid if your API is set up accordingly
          },
        });
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // Fetch user data only if answers are present
    if (answers && answers.name) {
      fetchUserData();
    }
  }, [answers]);

  return (
    <div>
      <h1>User Information</h1>
      {/* <h1>{userData.name}</h1>
      <p>{answers.name}</p> */}
      <p>Name: {answers.name}</p>
      <p>Gender: {answers.gender}</p>
      <p>Interest: {answers.interest}</p>
    </div>
  );
}

export default Books;
