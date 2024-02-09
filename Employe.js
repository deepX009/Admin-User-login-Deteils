import React, { useState, useEffect } from 'react';
import './Loginsignup.css';

const Employe = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch user data when the component mounts
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:5000/show'); // Replace with your actual API endpoint
      if (response.ok) {
        const userData = await response.json();
        setUsers(userData);
      } else {
        console.error("Failed to fetch user data. Server responded with:", );
      }
    } catch (error) {
      console.error("An error occurred while fetching user data:", error.message);
    }
  };

  return (
    <div className='user'>
      <h2>Employee Information</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Age</th>
            <th>Mobile Number</th>
            <th>Address</th>
            <th>Workplace</th>
            <th>More Details</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr >
             <td>{user.email ? user.email : 'N/A'}</td>
              <td>{user.name}</td>
              <td>{user.age}</td>
              <td>{user.mobile}</td>
              <td>{user.address}</td>
              <td>{user.workplace}</td>
              <td>{user.moreDetails}</td>
              <td>{user.date || new Date().toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employe;
