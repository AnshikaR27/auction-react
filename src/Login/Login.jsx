import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss'; // Import your SCSS styling (create this file for styling)

const Login = () => {
  const navigate = useNavigate(); // To navigate to another page after login
  const [email, setEmail] = useState(''); // State for the email input
  const [password, setPassword] = useState(''); // State for the password input
  const [error, setError] = useState(''); // State to handle error messages

  // Handle the login logic
  const handleLogin = (e) => {
    e.preventDefault(); // Prevent page refresh on form submission

    const savedUser = JSON.parse(localStorage.getItem('user')); // Get stored user from localStorage

    // Check if the entered email and password match the saved ones
    if (savedUser && savedUser.email === email && savedUser.password === password) {
      localStorage.setItem('isLoggedIn', 'true'); // Save login status in localStorage
      navigate('/'); // Redirect to home page after successful login
    } else {
      setError('Invalid email or password'); // Show error if the login fails
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>} {/* Display error message if exists */}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update email state
          required
        /><br /><br />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update password state
          required
        /><br /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
