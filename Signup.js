
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/signup', {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        console.log('User registered successfully');
        // Redirect to login or perform any other actions
        navigate("/addinfo");
      } else {
        console.error('Failed to register user');
      }
    } catch (error) {
      console.error('Error:', error);

    }
  };

  return (
    <div className="App">
      <h1>Signup</h1>
      <form onSubmit={handleOnSubmit}>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Signup;
