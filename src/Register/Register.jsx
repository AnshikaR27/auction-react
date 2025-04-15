import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.scss'; // Import your SCSS styling

const Register = () => {
  const navigate = useNavigate(); // Navigation function to go to login page
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input

  const handleRegister = (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    const user = { email, password }; // Store user credentials
    localStorage.setItem('user', JSON.stringify(user)); // Save to localStorage
    navigate('/login'); // Redirect to login page after successful registration
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Create an email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update email state
          required
        /><br /><br />
        <input
          type="password"
          placeholder="Create a password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update password state
          required
        /><br /><br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
