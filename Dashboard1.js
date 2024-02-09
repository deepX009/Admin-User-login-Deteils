import React, { useState, useEffect } from 'react';
import './Loginsignup.css';

const Dashboard1 = () => {
  const [userList, setUsers] = useState([]);
  const [updatedUserData, setUpdatedUserData] = useState({
    _id: '',
    email: '',
    name: '',
    age: '',
    mobile: '',
    address: '',
    workplace: '',
    moreDetails: '',
    Salary: '',  // Assuming Salary is part of user data
  });
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    // Fetch user data when the component mounts
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch('http://localhost:5000/show');
      if (response.ok) {
        const userData = await response.json();
        setUsers(userData);
      } else {
        console.error('Failed to fetch user data. Server responded with:', response.status);
      }
    } catch (error) {
      console.error('An error occurred while fetching user data:', error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUserData({
      ...updatedUserData,
      [name]: value,
    });
  };

  const handleUpdate = (user, index) => {
    setEditingIndex(index);
    setUpdatedUserData({
      _id: user._id,
      name: user.name,
      age: user.age,
      mobile: user.mobile,
      address: user.address,
      workplace: user.workplace,
      moreDetails: user.moreDetails,
      salary: user.salary || '',  // Assuming Salary is part of user data
    });
    setShowUpdateForm(true);
  };

  const handleUpdateSubmit = async () => {
    try {
      console.log('Updating user with data:', updatedUserData);

      const response = await fetch(`http://localhost:5000/update/${updatedUserData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUserData),
      });

      if (response.ok) {
        fetchUserData();
        setShowUpdateForm(false);
        setEditingIndex(null);
        setUpdatedUserData({
          _id: '',
          name: '',
          age: '',
          mobile: '',
          address: '',
          workplace: '',
          moreDetails: '',
          salary: '',
        });
        console.log('User updated successfully');
      } else {
        console.error('Failed to update user. Server responded with:', response.status);
      }
    } catch (error) {
      console.error('An error occurred while updating user:', error.message);
    }
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setShowUpdateForm(false);
    setUpdatedUserData({
      _id: '',
      name: '',
      age: '',
      mobile: '',
      address: '',
      workplace: '',
      moreDetails: '',
      salary: '',
    });
  };

  const handleDelete = async (userId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:5000/delete/${userId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchUserData();
          console.log('User deleted successfully');
        } else {
          console.error('Failed to delete user. Server responded with:', response.status);
        }
      } catch (error) {
        console.error('An error occurred while deleting user:', error.message);
      }
    }
  };

  return (
    <div className='user'>
      <h2>Employee Information</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Sr. No</th>
            <th>Email</th>
            <th>Name</th>
            <th>Age</th>
            <th>Mobile Number</th>
            <th>Address</th>
            <th>Workplace</th>
            <th>More Details</th>
            <th>Date</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userList.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.email}</td>
              <td>{editingIndex === index ? <input type="text" name="name" value={updatedUserData.name} onChange={handleChange} /> : user.name}</td>
              <td>{editingIndex === index ? <input type="text" name="age" value={updatedUserData.age} onChange={handleChange} /> : user.age}</td>
              <td>{editingIndex === index ? <input type="text" name="mobile" value={updatedUserData.mobile} onChange={handleChange} /> : user.mobile}</td>
              <td>{editingIndex === index ? <input type="text" name="address" value={updatedUserData.address} onChange={handleChange} /> : user.address}</td>
              <td>{editingIndex === index ? <input type="text" name="workplace" value={updatedUserData.workplace} onChange={handleChange} /> : user.workplace}</td>
              <td>{editingIndex === index ? <input type="text" name="moreDetails" value={updatedUserData.moreDetails} onChange={handleChange} /> : user.moreDetails}</td>
              <td>{user.date || new Date().toLocaleDateString()}</td>
              <td>{editingIndex === index ? <input type="text" name="salary" value={updatedUserData.Salary} onChange={handleChange} /> : user.salary}</td>
              <td>
                {editingIndex === index ? (
                  <>
                    <button onClick={handleUpdateSubmit}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleUpdate(user, index)}>Update</button>
                    <button onClick={() => handleDelete(user._id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard1;
