import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Loginsignup.css";
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


const handleOnSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    

    const data = await response.json();

    if (data.error) {
      alert(data.error);
    } else {
      // Check if the email and password match admin credentials
      const isAdmin = email === 'admin@gmail.com' && password === 'admin999';

      if (isAdmin) {
        // Save user type to session or local storage
        const userType = 'admin';
        sessionStorage.setItem("userType", userType);
        localStorage.setItem("userType", userType);

        // Save user credentials
        sessionStorage.setItem("email", email);
        localStorage.setItem("email", email);
        sessionStorage.setItem("password", password);
        localStorage.setItem("password", password);

        setIsLoggedIn(true);
        alert("Login successful");

        // Redirect to the admin dashboard
        navigate("/admin");
      } else {
        // For regular employees
        // Save user type to session or local storage
        const userType = 'employee';
        sessionStorage.setItem("userType", userType);
        localStorage.setItem("userType", userType);

        // Save user credentials
        sessionStorage.setItem("email", email);
        localStorage.setItem("email", email);
        sessionStorage.setItem("password", password);
        localStorage.setItem("password", password);

        setIsLoggedIn(true);
        alert("Login successful");

        // Redirect to the employee dashboard
        navigate("/dashboard");
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
};


const setIsLoggedIn = () => {
  const type = password === 'password' ? 'text' : 'password';
  setPassword(type);
}

  return (
    <div className="form">
      <h1>Login</h1>
      <div className="form-body">
        <form onSubmit={handleOnSubmit}>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <label>Password:</label>

                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                <button type="submit">Submit</button>

                <p>If Email not register First<Link to="/signup">Signup</Link></p>

            </form>
      </div>
    </div>
  )
}

export default Login;